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
package com.ankus.web.monitoring;

import java.io.File;
import java.lang.management.ManagementFactory;
import java.lang.management.OperatingSystemMXBean;
import java.lang.reflect.Method;
import java.util.ArrayList;

import com.ankus.model.monitoring.DiskInfo;
import com.ankus.model.monitoring.HealthInfo;
import com.ankus.model.rest.Engine;
import com.ankus.provider.engine.MonitoringEngineService;
import com.ankus.web.core.RemoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MonitoringServiceImpl implements MonitoringService {
	
	/**
     * Remote Service Lookup Service.
     */
    @Autowired
    private RemoteService lookupService;
    
    OperatingSystemMXBean systeminfo;
    
	@Override
	public HealthInfo getStatus(String hadoopurl, Engine engine) {
		MonitoringEngineService monitoringEngineService = (MonitoringEngineService) lookupService.getService(RemoteService.MONITORING, engine);
		
		HealthInfo stat = new HealthInfo();
		if(systeminfo==null) systeminfo = ManagementFactory.getOperatingSystemMXBean();
		
		// grep -c processor /proc/cpuinfo
		stat.corecnt = Runtime.getRuntime().availableProcessors();
		stat.cpuload = (Double)getsystemvalue("getSystemCpuLoad");
		stat.totalmemory = (Long)getsystemvalue("getTotalPhysicalMemorySize");
		stat.freememory = (Long)getsystemvalue("getFreePhysicalMemorySize");
		
		File[] roots = File.listRoots();
		stat.disks = new ArrayList<DiskInfo>();
		for (File root : roots)
		{
			DiskInfo d = new DiskInfo();
			d.path = root.getAbsolutePath();
			d.size = root.getTotalSpace();
			d.free = root.getFreeSpace();
			stat.disks.add(d);
		}
		
    	HealthInfo engineHealthInfo = monitoringEngineService.getStatus(hadoopurl);
    	if(engineHealthInfo != null){
    		stat.hadoopclusterinfo = engineHealthInfo.hadoopclusterinfo; 
    	}
		return stat;
	}

	private Object getsystemvalue(String func)
	{
		try {
			if(systeminfo==null) return null;
			Method method = systeminfo.getClass().getDeclaredMethod(func);
			if(method==null) return null;
			method.setAccessible(true);
			return method.invoke(systeminfo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
}

