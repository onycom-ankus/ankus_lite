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
package com.ankus.web.job;

import com.ankus.model.rest.Engine;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface JobService {

    /**
     * Job을 등록한다.
     *
     * @param engineId       Engine ID
     * @param jobName        Job Name
     * @param workflowId     Workflow ID
     * @param cronExpression Cron Expression
     * @param hashMap        Job Variables
     * @return Job ID
     */
    String regist(long engineId, String jobName, long workflowId, String cronExpression, HashMap hashMap);

    /**
     * 지정한 워크플로우 엔진에 등록되어 있는 모든 작업을 반환한다.
     *
     * @param engine Workflow Engine
     * @return 작업 목록
     */
    List<Map> getJobs(Engine engine);

    /**
     * 현재 시간을 반환한다.
     *
     * @param engine Workflow Engine
     * @return 현재 시간
     */
    long getCurrentDate(Engine engine);
}
