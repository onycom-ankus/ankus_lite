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

import org.apache.commons.lang.StringUtils;
import com.ankus.el.ELUtils;
import com.ankus.model.site.Configuration;
import com.ankus.model.site.Property;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

/**
 * ankus Site XML의 Property Key Value 값을 관리하는 Configuration Manager.
 *
 * @author Edward KIM
 * @since 0.1
 */
@Component
public class ConfigurationManager implements InitializingBean {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(ConfigurationManager.class);

    /**
     * Singleton Instance
     */
    private static ConfigurationManager configurationManager;

    /**
     * ankus Site XML의 JAXB Configuration Object
     */
    @Autowired
    private Configuration configuration;

    /**
     * ankus Site XML의 Property Key Value를 담고 있는 map
     */
    private Map<String, String> map;

    /**
     * ankus Site XML의 Property Key Value를 담고 있는 properties.
     */
    private Properties props;

    /**
     * ankus Site XML의 Property Key를 기준으로 Property를 담고 있는 Map
     */
    private Map<String, Property> propertyMap = new TreeMap<String, Property>();

    @Override
    public void afterPropertiesSet() throws Exception {
        this.map = getConfiguratioMap(configuration);
        this.props = ConfigurationUtils.mapToProperties(map);
        this.configurationManager = this;
    }

    /**
     * Configuration Manager의 Singleton Instance를 반환한다.
     *
     * @return Configuration Manager의 Singleton Instance
     */
    public static ConfigurationManager getConfigurationManager() {
        return configurationManager;
    }

    /**
     * ankus Site XML 파일의 설정 정보를 Key Value Map으로 변환한다.
     *
     * @param configuration {@link com.ankus.model.site.Configuration}
     * @return Key Value Map
     */
    public Map getConfiguratioMap(Configuration configuration) {
        List<Property> properties = configuration.getProperty();
        Map<String, String> map = new TreeMap<String, String>();
        for (Property property : properties) {
            if (!StringUtils.isEmpty(property.getName())) {
                String name = property.getName();
                String value = property.getValue();
                propertyMap.put(name, property);

                if (StringUtils.isEmpty(value)) {
                    String defautlVaule = property.getDefautlVaule();
                    if (!StringUtils.isEmpty(defautlVaule)) {
                        map.put(name, defautlVaule);
                    }
                } else {
                    map.put(name, value);
                }
            }
        }

        return map;
    }

    /**
     * ankus Site XML의 Property Key Value를 담고 있는 properties을 반환한다.
     *
     * @return ankus Site XML의 Property Key Value를 담고 있는 properties
     */
    public Properties getProperties() {
        return this.props;
    }

    /**
     * 설정 정보의 크기를 반환한다.
     *
     * @return 크기
     */
    public int size() {
        return map.size();
    }

    /**
     * 입력 문자열의 EL을 평가한다.
     *
     * @param value 입력 문자열
     * @return EL을 포함한 문자열을 평가한 문자열
     */
    public String evaluate(String value) {
        return ELUtils.resolve(props, value);
    }

    /**
     * 지정한 Key의 Value를 평가한다.
     *
     * @param key Key
     * @return Key의 Value에 대해서 평가한 문자열
     */
    public String get(String key) {
        String value = map.get(key);
        if (StringUtils.isEmpty(value)) {
            return value;
        }
        return ELUtils.resolve(props, value);
    }

    /**
     * 지정한 Key의 Value를 평가한다.
     *
     * @param key          Key
     * @param defaultValue 기본값
     * @return Key의 Value에 대해서 평가한 문자열
     */
    public String get(String key, String defaultValue) {
        String value = map.get(key);
        if (!StringUtils.isEmpty(value)) {
            return ELUtils.resolve(props, value);
        }
        return defaultValue;
    }

    /**
     * 지정한 Key가 존재하는지 확인한다.
     *
     * @param key 존재 여부를 확인할 Key
     * @return 존재하지 않는다면 <tt>false</tt>
     */
    public boolean containsKey(String key) {
        return map.containsKey(key);
    }

    /**
     * 지정한 Key에 대해서 Long Value를 반환한다.
     *
     * @param key Key
     * @return Key에 대한 Long Value
     */
    public long getLong(String key) {
        return Long.parseLong(get(key));
    }

    /**
     * 지정한 Key에 대해서 Boolean Value를 반환한다.
     *
     * @param key Key
     * @return Key에 대한 Boolean Value
     */
    public boolean getBoolean(String key) {
        try {
            return Boolean.parseBoolean(get(key));
        } catch (Exception ex) {
            return false;
        }
    }

    /**
     * 지정한 Key에 대해서 Boolean Value를 반환한다.
     *
     * @param key          Key
     * @param defaultValue 기본값
     * @return Key에 대한 Boolean Value
     */
    public boolean getBoolean(String key, boolean defaultValue) {
        if (containsKey(key)) {
            return Boolean.parseBoolean(get(key));
        } else {
            return defaultValue;
        }
    }

    /**
     * 지정한 Key에 대해서 Long Value를 반환한다. 값이 없다면 기본값을 반환한다.
     *
     * @param key          Key
     * @param defaultValue 기본값
     * @return Key에 대한 Long Value
     */
    public long getLong(String key, long defaultValue) {
        if (containsKey(key)) {
            return Long.parseLong(get(key));
        } else {
            return defaultValue;
        }
    }

    /**
     * EL이 Resolved된 Key를 포함하는 Property List로 반환한다.
     *
     * @return Resolved Key의 Property List
     */
    public List<Property> resolvedProperties() {
        List<Property> properties = new ArrayList<Property>();
        Set<String> keys = map.keySet();
        for (String key : keys) {
            String value = map.get(key);
            logger.debug("Key '{}' :: Value '{}' ==> Resovled Value '{}'", new String[]{
                    key, value, get(key)
            });
            if (propertyMap.get(key).isExpose()) {
                properties.add(new Property(key, get(key), propertyMap.get(key).isExpose()));
            }
        }
        return properties;
    }

    ////////////////////////////////////////////////////
    // Spring Framework Setter Injection
    ////////////////////////////////////////////////////

    /**
     * {@link com.ankus.model.site.Configuration}을 설정한다.
     *
     * @param configuration {@link com.ankus.model.site.Configuration}
     */
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;
    }
}
