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

import com.ankus.model.rest.Workflow;

import java.util.List;

/**
 * Pig Editor의 각종 기능을 제공하는 서비스 인터페이스.
 *
 * @author Byoung Gon, Kim
 * @since 0.5
 */
public interface PigService {

    /**
     * Pig Latin Script를 저장한다.
     *
     * @param scriptId   Pig Latin Script의 식별자 ID (최초 저장인 경우 0, 그렇지 않은 경우 > 0)
     * @param scriptName 사용자가 입력한 스크립트명
     * @param script     사용자가 입력한 스크립트 내용
     * @return Pig Script를 저장후 식별자 ID를 포함한 저장 정보
     */
    Pig save(Long scriptId, String scriptName, String script);

    /**
     * Pig Latin Script를 삭제한다.
     *
     * @param scriptId Pig Latin Script의 식별자 ID (최초 저장인 경우 0, 그렇지 않은 경우 > 0)
     * @return 삭제한 Pig Script
     */
    Pig delete(Long scriptId);

    /**
     * Pig Script를 실행한다.
     *
     * @param engineId Workflow Engine의 식별자
     * @param pig      Pig Script
     * @return 워크플로우
     */
    Workflow run(long engineId, com.ankus.model.rest.Pig pig);

    /**
     * Pig Script를 실행한 로그를 반환한다.
     *
     * @param engineId Workflow Engine의 식별자
     * @param path     Action Log Path
     * @return 워크플로우
     */
    String getLog(long engineId, String path);

    /**
     * 지정한 조건으로 Pig Latin Script 목록을 조회한다.
     *
     * @param startDate  시작일
     * @param endDate    종료일
     * @param scriptName 스크립트명
     * @param start      페이지 처리를 위한 시작
     * @param limit      페이지 처리를 위한 페이지당 개수
     * @param orderBy    정렬 기준 컬럼명
     * @param dir        정렬 방법(ASC, DESC)
     * @param username   사용자명
     * @return 저장한 Pig Latin Script 목록
     */
    List<Pig> listByCondition(String startDate, String endDate, String scriptName, int start, int limit, String orderBy, String dir, String username);

    /**
     * 지정한 Pig Latin Script 목록의 총 건수를 반환한다.
     *
     * @param startDate  시작일
     * @param endDate    종료일
     * @param scriptName 스크립트명
     * @param username   사용자명
     * @return 총 건수
     */
    int getTotalCountByCondition(String startDate, String endDate, String scriptName, String username);
}
