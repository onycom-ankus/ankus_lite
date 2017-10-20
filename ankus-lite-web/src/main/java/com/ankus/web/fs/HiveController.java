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

import com.ankus.model.rest.Engine;
import com.ankus.model.rest.HiveServer;
import com.ankus.model.rest.Response;
import com.ankus.util.ExceptionUtils;
import com.ankus.web.admin.HadoopClusterAdminService;
import com.ankus.web.admin.HiveAdminService;
import com.ankus.web.core.LocaleSupport;
import com.ankus.web.engine.EngineService;
import com.ankus.web.hive.HiveService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Hive REST Controller for HDFS Browser.
 *
 * @author Edward KIM
 * @since 1.0
 */
@Controller
@RequestMapping("/fs/hive")
public class HiveController extends LocaleSupport {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(HiveController.class);

    /**
     * Hadoop Cluster 정보를 얻기 위한 Hadoop Cluster Admin Service.
     */
    @Autowired
    private HadoopClusterAdminService hadoopClusterAdminService;

    @Autowired
    private HiveAdminService hiveAdminService;

    /**
     * Workflow Engine 정보를 얻기 위한 Engine Service.
     */
    @Autowired
    private EngineService engineService;

    /**
     * Hive Service
     */
    @Autowired
    private HiveService hiveService;

    /**
     * 디렉토리를 생성한다.
     *
     * @param params 클라이언트에서 전송한 파라마터(path, engineId)
     * @return REST Response JAXB Object
     */
    @RequestMapping(value = "db", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response createHiveDB(@RequestBody Map<String, String> params) {
        Response response = new Response();
        try {
            String comment = params.get("comment");
            String location = params.get("location");
            String database = params.get("database");

            Engine engine = engineService.getEngine(Long.parseLong(params.get("engineId")));
            HiveServer hiveServer = hiveAdminService.getHiveServer(engine.getHiveServerId());
            boolean created = hiveService.createDatabase(engine, hiveServer, database, location, comment);
            response.setSuccess(created);
            return response;
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            return response;
        }
    }
}