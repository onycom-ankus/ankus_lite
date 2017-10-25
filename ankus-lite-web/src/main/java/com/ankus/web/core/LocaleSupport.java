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

import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;

/**
 * Locale 기반 Resource Bundle을 지원하는 최상위 객체.<br>
 * kangsy 2016.02.15 DB->소스 리소스화
 * @author Edward KIM
 * @since 1.0
 */
public class LocaleSupport {
	
    /**
     * SLF4J Logging
     */
    private static Logger logger = LoggerFactory.getLogger(LocaleSupport.class);
    
    /** 다국어 */
   	@Autowired
   	MessageSource mMsgSource;

    public String message(String mainKey, String subKey, Object... args) {
    	/* DB에서 가져와서 설정 구조
        String key = mainKey + "_" + subKey;
        try {
            String applicationLocale = ConfigurationHelper.getHelper().get("application.locale", "English");
            Map bundles = (Map) ResourceBundleHelper.getHelper().getLocaleMap().get(applicationLocale);
            String message = (String) bundles.get(key);
            return ResourceBundleHolder.getMessage(message, args);
        } catch (Exception e) {
            logger.warn("Invalid Resource Bundle : {}", key, e);
            return "Unknown";
        }
        */
    	
    	/* 메시지 properties를 사용한 리소스화 */
    	String key = mainKey + "_" + subKey;
    	try {
    		return mMsgSource.getMessage(key, args, Locale.getDefault());
		} catch (Exception e) {
			logger.warn("Invalid Resource Bundle : {}", key, e);
            return "Unknown";
		}
    }

}
