package com.ankus.provider.engine;

import com.ankus.model.monitoring.HealthInfo;

public interface MonitoringEngineService {

	public HealthInfo getStatus(String hadoopurl);
}
