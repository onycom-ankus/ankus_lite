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
package com.ankus.provider.hive;

import com.ankus.model.rest.Hive;
import com.ankus.model.rest.HiveHistory;
import com.ankus.model.rest.HiveServer;

import java.util.List;
import java.util.Map;

/**
 * Remote Hive Service Interface.
 *
 * @author Edward KIM
 * @since 0.5
 */
public interface HiveService {

    /**
     * 페이지당 화면에 표시할 조회 결과의 개수
     */
    public final static int COUNT_PER_PAGE = 100;

    /**
     * Hive Query를 저장할 사용자별 경로.
     */
    public final static String USER_PATH_DATE = "/${dateFormat('yyyy')}/${dateFormat('MM')}/${dateFormat('dd')}";

    public final static String USER_PATH_USERNAME = "/${username}";

    public final static String USER_PATH = USER_PATH_DATE + USER_PATH_USERNAME + "/${executionId}";

    /**
     * 지정한 조건으로 Hive Query 실행 이력 목록을 조회한다.
     *
     * @param startDate  시작일
     * @param endDate    종료일
     * @param scriptName 스크립트명
     * @param status     상태코드
     * @param start      페이지 처리를 위한 시작
     * @param limit      페이지 처리를 위한 페이지당 개수
     * @param orderBy    정렬 기준 컬럼명
     * @param dir        정렬 방법(ASC, DESC)
     * @param username   사용자명
     * @return 저장한 Hive Query 실행 이력 목록
     */
    List<HiveHistory> listHistoriesByCondition(String startDate, String endDate, String scriptName, String status, int start, int limit, String orderBy, String dir, String username);

    /**
     * 지정한 조건으로 Hive Query 실행 이력 건수를 조회한다.
     *
     * @param startDate  시작일
     * @param endDate    종료일
     * @param scriptName 스크립트명
     * @param status     상태코드
     * @param username   사용자명
     * @return 저장한 Hive Query 실행 이력 건수
     */
    int getTotalCountOfHistoriesByCondition(String startDate, String endDate, String scriptName, String status, String username);

    /**
     * Execution ID를 통해 HiveHistory 정보를 얻어온다.
     *
     * @param executionId Execution ID
     * @return HiveHistory 객체
     */
    HiveHistory getHistory(String executionId);

    /**
     * Hive Query가 수행된 결과를 가져온다.
     *
     * @param executionId Hive Query Execution ID
     * @param start       페이지 처리를 위한 시작
     * @param end         페이지 처리를 위한 끝
     * @return Query 수행 결과 목록
     */
    List<Map<String, String>> getResults(String executionId, int start, int end);

    /**
     * Hive Query 수행 결과의 건수를 조회한다.
     * 로그 파일이 존재하지 않는 경우 0을 반환한다.
     *
     * @param executionId Hive Query Execution ID
     * @return 해당 Hive Query 수행 결과 건수
     */
    int getCounts(String executionId);

    /**
     * Hive Query를 검증한다.
     *
     * @param hiveServer Hive Server
     * @param hive       Hive 쿼리 정보
     * @param username   사용자명
     * @return Hive Query의 검증 결과
     */
    String validateQuery(HiveServer hiveServer, String database, Hive hive, String username);

    /**
     * Hive Query를 실행한다.
     *
     * @param hiveServer Hive Server
     * @param database   Database
     * @param hive       Hive 쿼리 정보
     * @param username   사용자명
     * @return 메시지
     */
    String executeQuery(HiveServer hiveServer, String database, Hive hive, String username);

    /**
     * 지정한 실행 이력에 대한 Hive Query를 반환한다.
     *
     * @param executionId Hive Query Execution ID
     * @param username    사용자명
     * @return Hive Query
     */
    String getQuery(String executionId, String username);

    /**
     * Hive Database 목록을 반환한다.
     *
     * @param hiveServer Hive Server
     * @return Hive Database 목록
     */
    List<String> getDatabases(HiveServer hiveServer);

    /**
     * 지정한 Hive Query 실행 이력의 파일의 크기를 확인한다.
     *
     * @param maxSize     최대 크기
     * @param executionId Hive Query Execution ID
     * @param username    사용자명
     */
    void checkSize(Long maxSize, String executionId, String username);

    /**
     * 파일을 로딩한다.
     *
     * @param executionId Hive Query Execution ID
     * @param username    사용자명
     * @return 파일의 내용
     */
    byte[] load(String executionId, String username);

    /**
     * 현재 시간을 반환한다.
     *
     * @return 현재 시간
     */
    long getCurrentDate();

    /**
     * Hive 데이터베이스를 생성한다.
     *
     * @param hiveServer Hive Server
     * @param database   생성할 데이터베이스명
     * @param location   데이터베이스의 위치
     * @param comment    데이터베이스의 코멘트
     * @return <tt>true</tt>면 생성 성공
     */
    boolean createDatabase(HiveServer hiveServer, String database, String location, String comment);
}
