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

import com.ankus.model.rest.Engine;
import com.ankus.model.rest.Hive;
import com.ankus.model.rest.HiveHistory;
import com.ankus.model.rest.HiveServer;
import com.ankus.web.admin.HiveAdminService;
import com.ankus.web.core.RemoteService;
import com.ankus.web.security.SessionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Hive Query Editor에서 제공하는 Query 실행, History 관련 기능을 제공하는 서비스 구현체.
 *
 * @author Byoung Gon, Kim
 * @version 0.4
 */
@Service
public class HiveServiceImpl implements HiveService {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(HiveServiceImpl.class);

    /**
     * Hive Server 정보를 취득하기 위한 Hive Administration Service.
     */
    @Autowired
    private HiveAdminService hiveAdminService;

    /**
     * 원격 호출을 위한 Remote Service
     */
    @Autowired
    private RemoteService remoteService;

    @Override
    public String executeQuery(Engine engine, String database, Hive hive) {
        com.ankus.provider.hive.HiveService hiveService = (com.ankus.provider.hive.HiveService) remoteService.getService(RemoteService.HIVE, engine);
        HiveServer hiveServer = hiveAdminService.getHiveServer(engine.getHiveServerId());
        return hiveService.executeQuery(hiveServer, database, hive, SessionUtils.getUsername());
    }

    @Override
    public boolean createDatabase(Engine engine, HiveServer hiveServer, String database, String location, String comment) {
        com.ankus.provider.hive.HiveService hiveService = (com.ankus.provider.hive.HiveService) remoteService.getService(RemoteService.HIVE, engine);
        return hiveService.createDatabase(hiveServer, database, location, comment);
    }

    @Override
    public String validateQuery(Engine engine, String database, Hive hive) {
        com.ankus.provider.hive.HiveService hiveService = (com.ankus.provider.hive.HiveService) remoteService.getService(RemoteService.HIVE, engine);
        HiveServer hiveServer = hiveAdminService.getHiveServer(engine.getHiveServerId());
        return hiveService.validateQuery(hiveServer, database, hive, SessionUtils.getUsername());
    }

    @Override
    public Hive saveQuery(Engine engine, Hive hive) {
        return hive;
    }

    @Override
    public int getTotalCountOfHistoriesByCondition(Engine engine, String startDate, String endDate, String scriptName, String status, String username) {
        com.ankus.provider.hive.HiveService hiveService = (com.ankus.provider.hive.HiveService) remoteService.getService(RemoteService.HIVE, engine);
        return hiveService.getTotalCountOfHistoriesByCondition(startDate, endDate, scriptName, status, username);
    }

    @Override
    public List<HiveHistory> listHistoriesByCondition(Engine engine, String startDate, String endDate, String scriptName, String status, int start, int limit, String orderBy, String dir, String username) {
        com.ankus.provider.hive.HiveService hiveService = (com.ankus.provider.hive.HiveService) remoteService.getService(RemoteService.HIVE, engine);
        return hiveService.listHistoriesByCondition(startDate, endDate, scriptName, status, start, limit, orderBy, dir, username);
    }

    @Override
    public HiveHistory getHistory(Engine engine, String executionId) {
        com.ankus.provider.hive.HiveService hiveService = (com.ankus.provider.hive.HiveService) remoteService.getService(RemoteService.HIVE, engine);
        return hiveService.getHistory(executionId);
    }

    @Override
    public String getQuery(Engine engine, String executionId) {
        com.ankus.provider.hive.HiveService hiveService = (com.ankus.provider.hive.HiveService) remoteService.getService(RemoteService.HIVE, engine);
        return hiveService.getQuery(executionId, SessionUtils.getUsername());
    }

    @Override
    public int getCounts(Engine engine, String executionId) {
        com.ankus.provider.hive.HiveService hiveService = (com.ankus.provider.hive.HiveService) remoteService.getService(RemoteService.HIVE, engine);
        return hiveService.getCounts(executionId);
    }

    @Override
    public List<Map<String, String>> getResults(Engine engine, String executionId, int start, int end) {
        com.ankus.provider.hive.HiveService hiveService = (com.ankus.provider.hive.HiveService) remoteService.getService(RemoteService.HIVE, engine);
        return hiveService.getResults(executionId, start, end);
    }

    @Override
    public List<String> getDatabases(Engine engine) {
        HiveServer hiveServer = hiveAdminService.getHiveServer(engine.getHiveServerId());
        com.ankus.provider.hive.HiveService hiveService = (com.ankus.provider.hive.HiveService) remoteService.getService(RemoteService.HIVE, engine);
        return hiveService.getDatabases(hiveServer);
    }

    @Override
    public void checkSize(Long maxSize, String executionId, Engine engine) {
        com.ankus.provider.hive.HiveService hiveService = (com.ankus.provider.hive.HiveService) remoteService.getService(RemoteService.HIVE, engine);
        hiveService.checkSize(maxSize, executionId, SessionUtils.getUsername());
    }

    @Override
    public byte[] load(String executionId, Engine engine) {
        com.ankus.provider.hive.HiveService hiveService = (com.ankus.provider.hive.HiveService) remoteService.getService(RemoteService.HIVE, engine);
        return hiveService.load(executionId, SessionUtils.getUsername());
    }

    @Override
    public long getCurrentDate(Engine engine) {
        com.ankus.provider.hive.HiveService hiveService = (com.ankus.provider.hive.HiveService) remoteService.getService(RemoteService.HIVE, engine);
        return hiveService.getCurrentDate();
    }
}
