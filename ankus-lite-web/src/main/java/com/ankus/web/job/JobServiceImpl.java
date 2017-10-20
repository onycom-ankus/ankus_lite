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
import com.ankus.model.rest.HadoopCluster;
import com.ankus.model.rest.Workflow;
import com.ankus.web.admin.HadoopClusterAdminService;
import com.ankus.web.designer.DesignerService;
import com.ankus.web.engine.EngineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.remoting.httpinvoker.HttpComponentsHttpInvokerRequestExecutor;
import org.springframework.remoting.httpinvoker.HttpInvokerProxyFactoryBean;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.slf4j.helpers.MessageFormatter.format;

@Service
public class JobServiceImpl implements com.ankus.web.job.JobService {

    @Autowired
    private EngineService engineService;

    @Autowired
    private DesignerService designerService;

    @Autowired
    private HadoopClusterAdminService hadoopClusterAdminService;

    @Override
    public String regist(long engineId, String jobName, long workflowId, String cronExpression, HashMap vars) {
        Engine engine = engineService.getEngine(engineId);
        com.ankus.provider.engine.JobService jobService = getJobService(engine);
        Workflow workflow = designerService.getWorkflow(workflowId);
        HadoopCluster hadoopCluster = hadoopClusterAdminService.getHadoopCluster(engine.getHadoopClusterId());
        return jobService.regist(1, jobName, workflow, cronExpression, vars, hadoopCluster);
    }

    @Override
    public List<Map> getJobs(Engine engine) {
        com.ankus.provider.engine.JobService jobService = getJobService(engine);
        return jobService.getJobs();
    }

    @Override
    public long getCurrentDate(Engine engine) {
        com.ankus.provider.engine.JobService jobService = getJobService(engine);
        return jobService.getCurrentDate();
    }

    /**
     * Remote Workflow Engine Service를 가져온다.
     *
     * @return Remote Workflow Engine Service
     */
    private com.ankus.provider.engine.JobService getJobService(String url) {
        HttpInvokerProxyFactoryBean factoryBean = new HttpInvokerProxyFactoryBean();
        factoryBean.setServiceUrl(url);
        factoryBean.setServiceInterface(com.ankus.provider.engine.JobService.class);
        HttpComponentsHttpInvokerRequestExecutor httpInvokerRequestExecutor = new HttpComponentsHttpInvokerRequestExecutor();
        factoryBean.setHttpInvokerRequestExecutor(httpInvokerRequestExecutor);
        factoryBean.afterPropertiesSet();
        return (com.ankus.provider.engine.JobService) factoryBean.getObject();
    }

    /**
     * Remote Workflow Engine Service를 가져온다.
     *
     * @return Remote Workflow Engine Service
     */
    private com.ankus.provider.engine.JobService getJobService(Engine engine) {
        return getJobService(getJobServiceUrl(engine));
    }

    /**
     * Remote Workflow Engine URL을 구성한다.
     *
     * @param engine Workflow Engine
     * @return Remote Workflow Engine의 URL
     */
    private String getJobServiceUrl(Engine engine) {
        return format("http://{}:{}/remote/job", engine.getIp(), engine.getPort()).getMessage();
    }
}
