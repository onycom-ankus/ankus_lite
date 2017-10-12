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
package com.ankus.web.jar;

import static org.slf4j.helpers.MessageFormatter.format;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ankus.provider.engine.HistoryService;
import com.ankus.provider.engine.JobService;
import com.ankus.web.admin.HadoopClusterAdminService;
import com.ankus.web.core.LocaleSupport;
import com.ankus.web.engine.EngineService;
import com.ankus.web.security.SessionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.remoting.httpinvoker.HttpComponentsHttpInvokerRequestExecutor;
import org.springframework.remoting.httpinvoker.HttpInvokerProxyFactoryBean;
import org.springframework.stereotype.Service;
import com.ankus.model.rest.Engine;
import com.ankus.provider.engine.JobService;

@Service
public class JarServiceImpl extends LocaleSupport implements JarService {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(JarServiceImpl.class);

    @Autowired
    private EngineService engineService;
    
    @Override
	public String getModuleInfos(Long engineId, String path){
    //public ArrayList<HashMap<String, Object>> readmetainfos(Long engineId, String folder){	
		String moduleinfo = "";
		try
    	{				
			Engine engine = engineService.getEngine(engineId);		
			if (engine == null) {
		            throw new IllegalArgumentException(message("S_DESIGNER", "NOT_VALID_WORKFLOW_ENG"));
		    } 			
			JobService job = getModuleService(engine.getIp(), engine.getPort());		
			moduleinfo = job.getModuleInfos(path);
			
    	}
    	catch(Exception e)
    	{
    		System.out.println(e.toString());
    	}
		return moduleinfo;
	}
    
    @Override
	public byte[] getReadfile(Long engineId, String zipFilePath, String fname){
   
    	byte[] readfile = null;
		try
    	{	
			
			Engine engine = engineService.getEngine(engineId);
			
			if (engine == null) {
		            throw new IllegalArgumentException(message("S_DESIGNER", "NOT_VALID_WORKFLOW_ENG"));
		    } 
			
			JobService job = getModuleService(engine.getIp(), engine.getPort());
			
			readfile = job.readfile(zipFilePath, fname);
		             	
    	}
    	catch(Exception e)
    	{
    		System.out.println(e.toString());
    	}
		return readfile;
	}
   
    private JobService getModuleService(String url) {
        HttpInvokerProxyFactoryBean factoryBean = new HttpInvokerProxyFactoryBean();
        factoryBean.setServiceUrl(url);
        factoryBean.setServiceInterface(JobService.class);
        HttpComponentsHttpInvokerRequestExecutor httpInvokerRequestExecutor = new HttpComponentsHttpInvokerRequestExecutor();
        factoryBean.setHttpInvokerRequestExecutor(httpInvokerRequestExecutor);
        factoryBean.afterPropertiesSet();
        return (JobService) factoryBean.getObject();
    }
   
    private JobService getModuleService(String ip, String port) {
    	Engine engine = new Engine();
        engine.setIp(ip);
        engine.setPort(port);
        return getModuleService(getModuleServiceUrl(engine));
    }
   
    private String getModuleServiceUrl(Engine engine) {
        return format("http://{}:{}/remote/module", engine.getIp(), engine.getPort()).getMessage();
    }  
	
}
