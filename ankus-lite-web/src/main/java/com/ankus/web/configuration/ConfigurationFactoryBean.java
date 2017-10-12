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
package com.ankus.web.configuration;

import com.ankus.model.site.Configuration;
import com.ankus.util.JaxbUtils;
import com.ankus.util.ResourceUtils;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.core.io.Resource;

/**
 * ankus Site XML 파일을 로딩하여 JAXB Configuration Object를 생성하는 Factory Bean.
 *
 * @author Edward KIM
 * @since 0.1
 */
public class ConfigurationFactoryBean implements InitializingBean, FactoryBean<Configuration> {

    /**
     * ankus Site XML 파일
     */
    private Resource configurationFile;

    /**
     * ankus Site XML의 JAXB Configuration Object
     */
    private Configuration configuration;

    /**
     * ankus Site XML의 JAXB Object 패키지명
     */
    public static String JAXB_PACKAGE_NAME = "com.ankus.model.site";

    @Override
    public void afterPropertiesSet() throws Exception {
        String xml = ResourceUtils.getResourceTextContents(configurationFile);
        configuration = (Configuration) JaxbUtils.unmarshal(JAXB_PACKAGE_NAME, xml);
    }

    @Override
    public Configuration getObject() throws Exception {
        return configuration;
    }

    @Override
    public Class<?> getObjectType() {
        return Configuration.class;
    }

    @Override
    public boolean isSingleton() {
        return true;
    }

    ////////////////////////////////////////////////////
    // Spring Framework Setter Injection
    ////////////////////////////////////////////////////

    /**
     * ankus Site XML 파일을 설정한다.
     *
     * @param configurationFile ankus Site XML 파일
     */
    public void setConfigurationFile(Resource configurationFile) {
        this.configurationFile = configurationFile;
    }
}
