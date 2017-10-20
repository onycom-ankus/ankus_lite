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
package com.ankus.web.hive;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import com.ankus.core.exception.SystemException;
import com.ankus.model.rest.Engine;
import com.ankus.model.rest.Hive;
import com.ankus.model.rest.HiveHistory;
import com.ankus.model.rest.Response;
import com.ankus.util.ExceptionUtils;
import com.ankus.web.core.LocaleSupport;
import com.ankus.web.designer.OpenGraphMarshaller;
import com.ankus.web.engine.EngineService;
import com.ankus.web.security.SessionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.helpers.MessageFormatter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/hive/editor")
public class HiveQueryEditorController extends LocaleSupport {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(HiveQueryEditorController.class);

    /**
     * Hive Service
     */
    @Autowired
    private HiveService hiveService;

    /**
     * Workflow Engine Service
     */
    @Autowired
    private EngineService engineService;

    /**
     * JSON Object Mapper
     */
    @Autowired
    private ObjectMapper objectMapper;

    /**
     * 지정한 사용자의 Hive Query를 실행한다.
     *
     * @return HTTP REST Response
     */
    @RequestMapping(value = "execute", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response executeQuery(@RequestBody Map<String, Object> params) throws Exception {
        Response response = new Response();

        long engineId = Long.valueOf(String.valueOf(params.get("engineId")));
        Engine engine = engineService.getEngine(engineId);

        Hive hive = objectMapper.readValue((String) params.get("hive"), new TypeReference<Hive>() {
        });
        hive.setScript(OpenGraphMarshaller.unescape(hive.getScript()));

        try {
            logger.debug("{}", message("S_HIVE", "HIVE_QUERY_TO_RUN", hive.getScript()));
            String message = hiveService.executeQuery(engine, (String) params.get("database"), hive);
            response.setSuccess(true);
            response.getMap().put("executionId", hive.getId());
            response.getMap().put("validation", OpenGraphMarshaller.escape(message));
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }

        return response;
    }

    /**
     * 지정한 사용자의 Hive Query를 실행한다.
     *
     * @return HTTP REST Response
     */
    @RequestMapping(value = "validate", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response validateQuery(@RequestBody Map<String, Object> params) throws Exception {
        Response response = new Response();

        long engineId = Long.valueOf(String.valueOf(params.get("engineId")));
        Engine engine = engineService.getEngine(engineId);

        Hive hive = objectMapper.readValue((String) params.get("hive"), new TypeReference<Hive>() {
        });
        hive.setScript(OpenGraphMarshaller.unescape(hive.getScript()));

        try {
            logger.debug("{}", message("S_HIVE", "HIVE_QUERY_TO_RUN", hive.getScript()));
            String message = hiveService.validateQuery(engine, (String) params.get("database"), hive);
            response.setSuccess(true);
            response.setObject(OpenGraphMarshaller.escape(message));
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }

        return response;
    }

    /**
     * 지정한 사용자의 Hive Query 실행 이력을 반환한다.
     *
     * @return HTTP REST Response
     */
    @RequestMapping(value = "history", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getHistories(@RequestParam(defaultValue = "") String startDate,
                                 @RequestParam(defaultValue = "") String endDate,
                                 @RequestParam(defaultValue = "") String queryName,
                                 @RequestParam(defaultValue = "") String engineId,
                                 @RequestParam(value = "username") String user_name,//2014.01.30 whitepoo@onycom.com
                                 @RequestParam(defaultValue = "") String status,
                                 @RequestParam(defaultValue = "ID") String sort,
                                 @RequestParam(defaultValue = "DESC") String dir,
                                 @RequestParam(defaultValue = "0") int start,
                                 @RequestParam(defaultValue = "16") int limit) {
    	
    	SessionUtils.setUsername(user_name);//2014.01.30 whitepoo@onycom.com
    	
        Response response = new Response();
        try {
            Engine engine = engineService.getEngine(Long.parseLong(engineId));
            List<HiveHistory> list = hiveService.listHistoriesByCondition(engine, startDate, endDate, queryName, status, start, limit, sort, dir, SessionUtils.getUsername());
            int total = hiveService.getTotalCountOfHistoriesByCondition(engine, startDate, endDate, queryName, status, SessionUtils.getUsername());

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
     * 쿼리를 가져온다.
     *
     * @param engineId    Workflow Engien ID
     * @param executionId Execution ID
     * @return HTTP REST Response
     */
    @RequestMapping(value = "query", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getQuery(@RequestParam String engineId, @RequestParam String executionId) {
        Response response = new Response();

        try {
            Engine engine = engineService.getEngine(Long.parseLong(engineId));
            String query = hiveService.getQuery(engine, executionId);
            response.getMap().put("query", OpenGraphMarshaller.escape(query));
            response.setSuccess(true);
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }

        return response;
    }

    @RequestMapping(value = "results", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response results(@RequestParam String engineId,
                            @RequestParam String executionId,
                            @RequestParam int start,
                            @RequestParam int limit) {
        Response response = new Response();

        try {
            Engine engine = engineService.getEngine(Long.parseLong(engineId));
            List<Map<String, String>> results = hiveService.getResults(engine, executionId, start + 1, start + limit);
            int totalCount = hiveService.getCounts(engine, executionId);

            response.setSuccess(true);
            response.setTotal(totalCount);
            response.getList().addAll(results);
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }

        return response;
    }

    /**
     * Hive Database 목록을 반환한다.
     *
     * @param engineId Workflow Engien ID
     * @return HTTP REST Response
     */
    @RequestMapping(value = "databases", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getDatabases(@RequestParam String engineId,
                                 @RequestParam int page,
                                 @RequestParam int start,
                                 @RequestParam int limit) {
        Response response = new Response();

        try {
            Engine engine = engineService.getEngine(Long.parseLong(engineId));
            List<String> databases = hiveService.getDatabases(engine);
            if (databases == null || databases.size() == 0) {
                throw new SystemException(message("S_HIVE", "NOT_EXIST_HIVE_DB"));
            }
            for (String database : databases) {
                Map<String, String> map = new HashMap();
                map.put("name", database);
                response.getList().add(map);
            }
            response.setSuccess(true);
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }

        return response;
    }


    /**
     * 지정한 사용자의 Hive Query를 실행한다.
     *
     * @return HTTP REST Response
     */
    @RequestMapping(value = "size", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response checkSize(@RequestBody Map<String, Object> params) throws Exception {
        Response response = new Response();

        long engineId = Long.valueOf(String.valueOf(params.get("engineId")));
        Engine engine = engineService.getEngine(engineId);

        String executionId = (String) params.get("executionId");
        long maxSize = Long.parseLong((String) params.get("maxSize"));

        try {
            hiveService.checkSize(maxSize, executionId, engine);
            response.setSuccess(true);
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }

        return response;
    }

    /**
     * 파일을 다운로드한다.
     *
     * @return REST Response JAXB Object
     */
    @RequestMapping(value = "download", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity download(HttpServletResponse res, @RequestParam String executionId,
                                   @RequestParam(defaultValue = "") String engineId) {
        HttpHeaders headers = new HttpHeaders();
        try {
            Engine engine = engineService.getEngine(Long.parseLong(engineId));
            byte[] bytes = hiveService.load(executionId, engine);

            res.setHeader("Content-Length", "" + bytes.length);
            res.setHeader("Content-Type", MediaType.APPLICATION_OCTET_STREAM_VALUE);
            res.setHeader("Content-Disposition", MessageFormatter.format("form-data; name={}; filename={}", executionId, executionId + ".log").getMessage());
            res.setStatus(200);
            FileCopyUtils.copy(bytes, res.getOutputStream());
            res.flushBuffer();
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception ex) {
            String message = message("S_HIVE", "CANNOT_GET_RESULT_FILE", executionId, ex.getMessage());
            logger.warn("{}", message, ex);
            headers.set("message", ex.getMessage());
            if (ex.getCause() != null) headers.set("cause", ex.getCause().getMessage());
            return new ResponseEntity(headers, HttpStatus.BAD_REQUEST);
        }
    }

}
