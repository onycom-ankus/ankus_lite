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
package com.ankus.web.fs;

import com.ankus.model.rest.AuditHistory;
import com.ankus.model.rest.Engine;
import com.ankus.model.rest.Response;
import com.ankus.provider.fs.FileSystemAuditService;
import com.ankus.util.ExceptionUtils;
import com.ankus.web.core.RemoteService;
import com.ankus.web.engine.EngineService;
import com.ankus.web.security.SessionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * File System Audit REST Controller.
 *
 * @author Byoung Gon, Kim
 * @since 1.0
 */
@Controller
@RequestMapping("/fs/audit")
public class AuditController {

    /**
     * Workflow Engine 정보를 얻기 위한 Engine Service.
     */
    @Autowired
    private EngineService engineService;

    /**
     * Remote Service Lookup Service.
     */
    @Autowired
    private RemoteService lookupService;

    /**
     * 지정한 조건의 파일 처리 이력을 조회한다.
     *
     * @param startDate 시작 날짜
     * @param endDate   종료 날짜
     * @param path      조회할 경로
     * @param engineId  워크플로우 엔진
     * @param type      파일 처리 유형
     * @param start     시작 페이지
     * @param limit     페이지당 건수
     * @return 파일 처리 목록
     */
    @RequestMapping(value = "list", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getAuditHistories(@RequestParam(defaultValue = "") String startDate,
                                      @RequestParam(defaultValue = "") String endDate,
                                      @RequestParam(defaultValue = "") String path,
                                      @RequestParam(value = "username") String user_name,//2014.01.30 whitepoo@onycom.com
                                      @RequestParam(defaultValue = "0") long engineId,
                                      @RequestParam(defaultValue = "ALL") String type,
                                      @RequestParam(defaultValue = "0") int start,
                                      @RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "16") int limit) {

    	SessionUtils.setUsername(user_name);//2014.01.30 whitepoo@onycom.com
        Response response = new Response();
        try {
            Engine engine = engineService.getEngine(engineId);
            FileSystemAuditService auditService = (FileSystemAuditService) lookupService.getService(RemoteService.AUDIT, engine);

            response.setSuccess(true);
            List<AuditHistory> auditHistories = auditService.getAuditHistories(startDate, endDate, path, SessionUtils.getUsername(), type, "WORK_DATE", "DESC", start, limit);
            response.getList().addAll(auditHistories);
            response.setTotal(auditService.getTotalCountOfAuditHistories(startDate, endDate, path, type, SessionUtils.getUsername()));
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        return response;
    }
}
