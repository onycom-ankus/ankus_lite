/**
 * This file is part of ankus.
 *
 * ankus is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ankus is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with ankus.  If not, see <http://www.gnu.org/licenses/>.
 */
package com.ankus.web.pig;

import org.codehaus.jackson.map.ObjectMapper;
import com.ankus.model.rest.Response;
import com.ankus.model.rest.Workflow;
import com.ankus.util.ExceptionUtils;
import com.ankus.web.core.LocaleSupport;
import com.ankus.web.designer.OpenGraphMarshaller;
import com.ankus.web.security.SessionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("/pig")
public class PigController extends LocaleSupport {

    /**
     * Pig Script Service
     */
    @Autowired
    private PigService pigService;

    /**
     * JSON Object Mapper
     */
    @Autowired
    private ObjectMapper objectMapper;

    /**
     * Pig Script를 실행한다.
     *
     * @param engineId Workflow Engine의 식별자
     * @param body     Request Body
     * @return HTTP REST Response
     */
    @RequestMapping(value = "run", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response run(@RequestParam(defaultValue = "0") Long engineId,
                        @RequestBody String body) throws IOException {

        // Convert JSON to Pig
        com.ankus.model.rest.Pig pig = objectMapper.readValue(body, new org.codehaus.jackson.type.TypeReference<com.ankus.model.rest.Pig>() {
        });

        // Unescape Pig Latin Script
        pig.setScript(OpenGraphMarshaller.unescape(pig.getScript()));

        Response response = new Response();

        // 사용자가 Workflow Engine을 선택하고 스크립트를 입력하지 않고 실행하는 경우 engineId가 넘어오지 않고
        // engineId가 script로 들어온다. 따라서 다음 조건을 만족하는 케이스는 Workflow Engine을 선택하지 않거나
        // 스크립트를 입력하지 않은 경우이다.
        if (engineId == 0 || engineId < 0) {
            response.setSuccess(false);
            response.getError().setMessage(message("S_PIG", "SELECT_ENGINE_AND_INPUT_SCRIPT"));
            response.getError().setCause(message("S_PIG", "INVALID_WORKFLOW_ENGINE"));
            return response;
        }

        try {
            Workflow workflow = pigService.run(engineId, pig);
            response.getMap().put("id", workflow.getId());
            response.getMap().put("workflowId", workflow.getWorkflowId());
            response.setSuccess(true);
            return response;
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        return response;
    }

    @RequestMapping(value = "log", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public ResponseEntity<String> getLog(@RequestParam(defaultValue = "0") long engineId,
                                         @RequestParam String path) {
        MultiValueMap headers = new HttpHeaders();
        try {
            String log = pigService.getLog(engineId, path);

            headers.set("Content-Type", "text/plain;chartset=UTF-8");
            ResponseEntity responseEntity = new ResponseEntity(log, headers, HttpStatus.OK);
            return responseEntity;
        } catch (Exception ex) {
            headers.set("message", ex.getMessage());
            if (ex.getCause() != null) headers.set("cause", ex.getCause().getMessage());
            return new ResponseEntity(headers, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "list", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response list(@RequestParam(defaultValue = "") String startDate,
                         @RequestParam(defaultValue = "") String endDate,
                         @RequestParam(defaultValue = "") String scriptName,
                         @RequestParam(defaultValue = "ID") String sort,
                         @RequestParam(defaultValue = "DESC") String dir,
                         @RequestParam(defaultValue = "0") int start,
                         @RequestParam(defaultValue = "16") int limit) {

        Response response = new Response();
        try {
            List<Pig> list = pigService.listByCondition(startDate, endDate, scriptName, start, limit, sort, dir, SessionUtils.getUsername());
            int total = pigService.getTotalCountByCondition(startDate, endDate, scriptName, SessionUtils.getUsername());
            response.setSuccess(true);
            response.getList().addAll(list);
            response.setTotal(total);
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        return response;
    }

    /**
     * Pig Script를 저장한다.
     *
     * @param body Request Body
     * @return HTTP REST Response
     */
    @RequestMapping(value = "save", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response save(@RequestBody String body) throws IOException {
        // ID, Script Name을 꺼내기 위해서 JSON을 인코딩한다.
        com.ankus.model.rest.Pig pig = objectMapper.readValue(body, new org.codehaus.jackson.type.TypeReference<com.ankus.model.rest.Pig>() {
        });

        Response response = new Response();

        try {
            Pig saved = pigService.save(pig.getId(), pig.getName(), body);
            response.setSuccess(true);
            response.getMap().put("scriptId", saved.getScriptId()); // 저장한 PK를 반환한다.
            response.getMap().put("scriptName", saved.getScriptName()); // 저장한 ScriptName을 반환한다.
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        return response;
    }

    /**
     * Pig Script를 삭제한다.
     *
     * @param scriptId Request Body
     * @return HTTP REST Response
     */
    @RequestMapping(value = "delete", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response deleteScript(@RequestBody Long scriptId) throws IOException {
        Response response = new Response();
        try {
            pigService.delete(scriptId);
            response.setSuccess(true);
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        return response;
    }
}
