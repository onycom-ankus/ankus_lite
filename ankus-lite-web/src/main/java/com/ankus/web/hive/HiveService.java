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

import java.util.List;
import java.util.Map;

public interface HiveService {

    /**
     * Hive Query를 저장한다.
     *
     * @param hive Hive Query
     * @return Hive Object
     */
    Hive saveQuery(Engine engine, Hive hive);

    /**
     * Hive Query를 실행한다.
     *
     * @param engine   Workflow Engine
     * @param database Database
     * @param hive     Hive Object
     * @return Hive Object
     */
    String executeQuery(Engine engine, String database, Hive hive);

    /**
     * @param engine
     * @param hiveServer
     * @param database
     * @param location
     * @param comment
     * @return
     */
    boolean createDatabase(Engine engine, HiveServer hiveServer, String database, String location, String comment);

    /**
     * Hive Query를 검증한다.
     *
     * @param engine   Workflow Engine
     * @param database Database
     * @param hive     Hive Object
     * @return Hive Object
     */
    String validateQuery(Engine engine, String database, Hive hive);

    /**
     * 지정한 조건으로 Hive Query 목록을 조회한다.
     *
     * @param engine     Workflow Engine
     * @param startDate  시작일
     * @param endDate    종료일
     * @param scriptName 스크립트명
     * @param status     상태코드
     * @param start      페이지 처리를 위한 시작
     * @param limit      페이지 처리를 위한 페이지당 개수
     * @param orderBy    정렬 기준 컬럼명
     * @param dir        정렬 방법(ASC, DESC)
     * @param username   사용자명
     * @return 저장한 Hive Query 목록
     */
    List<HiveHistory> listHistoriesByCondition(Engine engine, String startDate, String endDate, String scriptName, String status, int start, int limit, String orderBy, String dir, String username);

    /**
     * Workflow Engine 정보와 Execution ID를 통해 HiveHistory 정보를 얻어온다.
     *
     * @param engine      Workflow Engine
     * @param executionId Execution ID
     * @return HiveHistory 객체
     */
    HiveHistory getHistory(Engine engine, String executionId);

    /**
     * Hive Query 수행 결과의 건수를 조회한다.
     *
     * @param engine      Hive Query를 수행한 Workflow Engine
     * @param executionId Hive Query Execution ID
     * @return 해당 Hive Query 수행 결과 건수
     */
    int getCounts(Engine engine, String executionId);

    /**
     * 지정한 조건으로 Hive Query의 건수를 조회한다.
     *
     * @param engine     Workflow Engine
     * @param startDate  시작일
     * @param endDate    종료일
     * @param scriptName 스크립트명
     * @param status     상태코드
     * @param username   사용자명
     * @return 건수
     */
    int getTotalCountOfHistoriesByCondition(Engine engine, String startDate, String endDate, String scriptName, String status, String username);

    /**
     * 지정한 실행 이력에 대한 Hive Query를 반환한다.
     *
     * @param engine      Hive Query를 수행한 Workflow Engine
     * @param executionId Hive Query Execution ID
     * @return Hive Query
     */
    String getQuery(Engine engine, String executionId);

    /**
     * Hive Query가 수행된 결과를 가져온다.
     *
     * @param engine      Hive Query를 수행한 Workflow Engine
     * @param executionId Hive Query Execution ID
     * @param start       페이지 처리를 위한 시작
     * @param end         페이지 처리를 위한 끝
     * @return Query 수행 결과 목록
     */
    List<Map<String, String>> getResults(Engine engine, String executionId, int start, int end);

    /**
     * Hive Database 목록을 반환한다.
     *
     * @param engine Hive Query를 수행한 Workflow Engine
     * @return Hive Database 목록
     */
    List<String> getDatabases(Engine engine);

    /**
     * 지정한 Hive Query 실행 이력의 파일의 크기를 확인한다.
     *
     * @param maxSize     최대 크기
     * @param executionId Hive Query Execution ID
     * @param engine      Hive Query를 수행한 Workflow Engine
     */
    void checkSize(Long maxSize, String executionId, Engine engine);

    /**
     * 파일을 로딩한다.
     *
     * @param executionId Hive Query Execution ID
     * @param engine      Hive Query를 수행한 Workflow Engine
     * @return 파일의 내용
     */
    byte[] load(String executionId, Engine engine);

    /**
     * 현재 시간을 반환한다.
     *
     * @param engine Hive Query를 수행한 Workflow Engine
     * @return 현재 시간
     */
    long getCurrentDate(Engine engine);

}
