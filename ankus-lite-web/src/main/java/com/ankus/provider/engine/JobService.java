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

import com.ankus.model.rest.HadoopCluster;
import com.ankus.model.rest.Workflow;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface JobService extends PigSupport, HiveSupport, VisualizationSupport {

    /**
     * 워크플로우를 실행한다.
     *
     * @param workflow      Workflow
     * @param hadoopCluster Hadoop Cluster
     * @return Job ID
     */
    String run(Workflow workflow, HadoopCluster hadoopCluster, String authority);

    /**
     * 지정한 Job을 강제 종료한다.
     *
     * @param jobId Job ID
     */
    void kill(long jobId);

    /**
     * Job을 등록한다.
     *
     * @param jobId          Job ID
     * @param jobName        Job Name
     * @param workflow       Workflow
     * @param cronExpression Cron Expression
     * @param hashMap        Job Variables
     * @param hadoopCluster  Hadoop Cluster
     * @return Job ID
     */
    String regist(long jobId, String jobName, Workflow workflow, String cronExpression, HashMap hashMap, HadoopCluster hadoopCluster);

    /**
     * 스케줄러의 등록되어 있는 모든 작업을 반환한다.
     *
     * @return 작업 목록
     */
    List<Map> getJobs();

    /**
     * 현재 시간을 반환한다.
     *
     * @return 현재 시간
     */
    long getCurrentDate();
    
	String cacheClear(long engineId);
	
    public void ankus_cache_put(String filename, byte[] data);
    
    public HashMap<String, Object> ankus_cache_list();
	
	String getModuleInfos(String path);
	
	byte[] readfile(String zipFilePath, String fname) throws IOException;
	
}
