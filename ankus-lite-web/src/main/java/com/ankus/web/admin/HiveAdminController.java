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
package com.ankus.web.admin;

import com.ankus.model.rest.HiveServer;
import com.ankus.model.rest.Response;
import com.ankus.web.core.LocaleSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/admin/hive")
public class HiveAdminController extends LocaleSupport {

    /**
     * SLF4J Logger
     */
    private Logger logger = LoggerFactory.getLogger(HiveAdminController.class);

    /**
     * Hive Admin Service
     */
    @Autowired
    private HiveAdminService adminService;

    /**
     * Hive Server 목록을 반환한다.
     *
     * @return HTTP REST Response (성공적으로 목록을 조회한 경우 {@link com.ankus.model.rest.Response#getList()} 를 통해 목록을 얻을 수 있다).
     */
    @RequestMapping(value = "servers", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getHiveServers() {
        Response response = new Response();

        try {
            response.setSuccess(true);
            List<HiveServer> servers = adminService.getHiveServers();
            if (servers != null) {
                response.getList().addAll(servers);
                response.setTotal(response.getList().size());
            } else {
                response.setTotal(0);
            }
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(message("S_ADMIN", "CANNOT_CHECK_HSERVER_INFO"));
            response.getError().setCause(ex.getMessage());
        }
        return response;
    }

    /**
     * Hive Server를 추가한다. Hive Server의 이름({@link com.ankus.model.rest.HiveServer#getName()}의 양쪽 끝에 공백 문자를 포함하는 경우
     * 자동으로 trim 처리한다.
     *
     * @param hiveServer 추가할 Hive Server
     * @return HTTP REST Response (성공적으로 추가한 경우 {@link com.ankus.model.rest.Response#isSuccess()}가 <tt>true</tt>
     */
    @RequestMapping(value = "add", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response add(@RequestBody HiveServer hiveServer) {
        Response response = new Response();
        if (StringUtils.isEmpty(hiveServer.getName().trim())) {
            response.setSuccess(false);
            return response;
        }

        try {
            hiveServer.setName(hiveServer.getName().trim());
            response.setSuccess(adminService.addHiveServer(hiveServer));
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(message("S_ADMIN", "CANNOT_ADD_HSERVER"));
            response.getError().setCause(ex.getMessage());
        }
        return response;
    }

    /**
     * Hive Server를 삭제한다. 삭제를 위해서 Hive Server의 식별자를 설정하는 {@link com.ankus.model.rest.HiveServer#setId(long)} 메소드를 이용하도록 한다.
     *
     * @param hiveServer 삭제할 Hive Server
     * @return HTTP REST Response (성공적으로 삭제한 경우 {@link com.ankus.model.rest.Response#isSuccess()}가 <tt>true</tt>
     */
    @RequestMapping(value = "delete", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response delete(@RequestBody HiveServer hiveServer) {
        Response response = new Response();
        try {
            response.setSuccess(adminService.deleteHiveServer(hiveServer));
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(message("S_ADMIN", "CANNOT_DELETE_HSERVER"));
            response.getError().setCause(ex.getMessage());
        }
        return response;
    }

}