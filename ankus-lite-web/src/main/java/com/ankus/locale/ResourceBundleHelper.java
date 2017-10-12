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
package com.ankus.locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * ResourceBundleHelper를 Singleton Instance로 접근하기 위한 Helper.
 *
 * @author Byoung Gon, Kim
 * @since 1.0
 */
@Component
public class ResourceBundleHelper implements InitializingBean {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(ResourceBundleHolder.class);

    /**
     * ResourceBundleHelper의 Singleton Instance
     */
    private static ResourceBundleHelper helper;

    /**
     * ankus Site XML의 Configuration Manager
     */
    @Autowired
    private LocaleService localeService;

    /**
     * 메시지 번들과 로케일을 매핑하여 캐슁하는 메시지 번들 캐쉬.
     */
    private Map localeMap;

    /**
     * Default constructor.
     */
    public ResourceBundleHelper() {
        this.localeMap = new HashMap();
    }

    /**
     * ResourceBundleHelper의 Singleton Instance를 반환한다.
     *
     * @return ResourceBundleHelper의 Singleton Instance
     */
    public static ResourceBundleHelper getHelper() {
        return helper;
    }

    /**
     * 메시지 번들 캐쉬를 반환한다.
     *
     * @return 메시지 번들 캐쉬
     */
    public Map getLocaleMap() {
        return localeMap;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
    	/* 다국어 i18n 사용으로 사용안함. DB->리소스화
        helper = this;
        List<Locale> locales = localeService.getLocales();
        for (Locale locale : locales) {
            Map<String, Map> message = localeService.getMessage(locale);
            localeMap.put(locale.getName(), message);
            logger.info("Loaded {} bundles for '{}'.", locale.getName(), message.size());
        }
        */
    }
}
