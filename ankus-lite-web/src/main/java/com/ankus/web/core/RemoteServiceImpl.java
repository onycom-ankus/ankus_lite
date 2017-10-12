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

import com.ankus.core.exception.SystemException;
import com.ankus.model.rest.Engine;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.remoting.httpinvoker.HttpComponentsHttpInvokerRequestExecutor;
import org.springframework.remoting.httpinvoker.HttpInvokerProxyFactoryBean;

import java.util.Map;

import static org.slf4j.helpers.MessageFormatter.arrayFormat;

/**
 * Remote Service Implementation.
 *
 * @author Edward KIM
 * @since 0.5
 */
public class RemoteServiceImpl extends LocaleSupport implements RemoteService {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(RemoteServiceImpl.class);

    /**
     * Remote Service Mapping.
     */
    private Map<String, Class> serviceMap;

    @Override
    public Object getService(String serviceName, Engine engine) {
        try {
            System.out.printf("getService_name====>[%s_%s:%s]\n", serviceName, engine.getIp(), engine.getPort());
            String remoteServiceUrl = getRemoteServiceUrl(engine, serviceName);
            
            System.out.printf("getService====>[%s]\n", remoteServiceUrl);
            
            return getRemoteService(remoteServiceUrl, serviceMap.get(serviceName));
        } catch (Exception ex) {
            String message = message("S_REMOTE", "CANNOT_GET_REMOTE_SERVICE", serviceName);
            logger.warn(message, ex);
            throw new SystemException(message, ex);
        }
    }

    private Object getRemoteService(String url, Class clazz) {
        HttpInvokerProxyFactoryBean factoryBean = new HttpInvokerProxyFactoryBean();
        factoryBean.setServiceUrl(url);
        factoryBean.setServiceInterface(clazz);
        HttpComponentsHttpInvokerRequestExecutor httpInvokerRequestExecutor = new HttpComponentsHttpInvokerRequestExecutor();
        factoryBean.setHttpInvokerRequestExecutor(httpInvokerRequestExecutor);
        factoryBean.afterPropertiesSet();
        return factoryBean.getObject();
    }

    private String getRemoteServiceUrl(Engine engine, String serviceName) {
        return arrayFormat("http://{}:{}/remote/{}", new Object[]{
                engine.getIp(), engine.getPort(), serviceName
        }).getMessage();
    }

    /////////////////////////////////////////
    // Spring Framework Setter Injection
    /////////////////////////////////////////

    public void setServiceMap(Map<String, Class> serviceMap) {
        this.serviceMap = serviceMap;
    }

}