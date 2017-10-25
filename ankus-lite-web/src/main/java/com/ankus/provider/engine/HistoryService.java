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
package com.ankus.provider.engine;

import java.util.List;

import com.ankus.model.rest.ActionHistory;
import com.ankus.model.rest.VisualizationHistory;
import com.ankus.model.rest.WorkflowHistory;

/**
 * 워크플로우 실행과 관련된 각종 이력 서비스를 제공하는 Provider Interface.
 *
 * @author Byoung Gon, Kim
 * @version 0.4
 */
public interface HistoryService {

    /**
     * 지정한 액션의 식별자 ID에 대한 액션 실행 이력을 반환한다.
     *
     * @param actionId 워크플로우를 구성하는 Action의 식별자 ID
     * @return 액션 실행 이력
     */
    ActionHistory getActionHistory(long actionId);

    /**
     * 지정한 사용자의 워크플로우 실행 이력의 개수룰 반환한다.
     *
     * @param startDate    시작날짜
     * @param endDate      종료 날짜
     * @param workflowName 워크플로우명
     * @param jobType      Job 유형
     * @param status       상태코드
     * @param username     사용자명
     * @return 워크플로우 실행 이력의 개수
     */
    int getTotalCountOfWorkflowHistories(String startDate, String endDate, String workflowName, String jobType, String status, String username);

    /**
     * 지정한 조건의 워크플로우 실행 이력을 조회한다.
     *
     * @param startDate    시작날짜
     * @param endDate      종료 날짜
     * @param workflowName 워크플로우명
     * @param jobType      Job 유형
     * @param username     사용자명
     * @param status       상태코드
     * @param orderBy      정렬할 컬럼명
     * @param desc         정렬 방식(ASC, DESC)
     * @param start        시작 페이지
     * @param limit        페이지당 건수
     * @return 워크플로우 실행 이력 목록
     */
    List<WorkflowHistory> getWorkflowHistories(String startDate, String endDate, String workflowName, String jobType, String username, String status, String orderBy, String desc, int start, int limit);

    /**
     * 지정한 조건의 워크플로우 실행 이력을 조회한다.
     *
     * @param username 사용자명
     * @param status   상태코드
     * @param orderBy  정렬할 컬럼명
     * @param desc     정렬 방식(ASC, DESC)
     * @return 워크플로우 실행 이력 목록
     */
    List<ActionHistory> getRunningActionHistories(String username, String status, String orderBy, String desc);

    /**
     * 지정한 Job ID로 실행한 워크플로우를 구성하는 액션 목록을 조회한다.
     *
     * @param jobId Job ID (e.g. <tt>1231123</tt>)
     * @return 액션 목록
     */
    List<ActionHistory> getActionHistories(String jobId);

    /**
     * 지정한 Action의 로그 파일을 반환한다.
     *
     * @param actionId Action ID
     * @return 로그 파일
     */
    String getActionLog(long actionId);
    
    /**
     * Action Log Path로 Action의 로그 파일을 반환한다.
     *
     * @param path Action Log Path
     * @return 로그 파일
     */
    String getActionLogByPath(String path);
    
    List<VisualizationHistory> getVisualizationHistoryByJobStringId(String jobStringId);
    List<WorkflowHistory> getWorkflowHistoryByJobStringId(String jobStringId);
}
