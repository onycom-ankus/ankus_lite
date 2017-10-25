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
package com.ankus.web.core;

import com.ankus.model.rest.Engine;

/**
 * Remote Service Interface.
 *
 * @author Edward KIM
 * @since 0.5
 */
public interface RemoteService {

    public static final String HIVE = "hive";

    public static final String JOB = "job";

    public static final String HDFS = "hdfs";

    public static final String AUDIT = "audit";
    
    public static final String MONITORING = "monitoring";

    /**
     * 지정한 워크플로우 엔진의 서비스를 반환한다.
     *
     * @param serviceName 서비스명
     * @param engine      워크플로우 엔진
     * @return 리모트 서비스
     */
    Object getService(String serviceName, Engine engine);

}
