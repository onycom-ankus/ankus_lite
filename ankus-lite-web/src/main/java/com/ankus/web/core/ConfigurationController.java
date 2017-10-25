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

import com.ankus.model.site.Configuration;
import com.ankus.model.site.Property;
import com.ankus.util.JsonUtils;
import com.ankus.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

/**
 * ExtJS의 UI Component에서 환경 설정 정보를 사용하기 위해서 환경 설정 정보를
 * Key Value 형식의 JSON으로 구성하고 자바 스크립트를 생성하는 컨트롤러.
 *
 * @author Edward KIM
 * @since 0.1
 */
@Controller
@RequestMapping("/message")
public class ConfigurationController implements InitializingBean {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(ConfigurationController.class);

    /**
     * JavaScript Variable Prefix
     */
    private final static String JS_PREFIX = "var config = ";

    /**
     * JavaScript End Postfix
     */
    private final static String JS_POSTFIX = ";";

    /**
     * JavaScript Content Type
     */
    private final static String CONTENT_TYPE = "application/x-javascript; charset=UTF-8";

    /**
     * ankus Site XML 파일
     */
    @Autowired
    private Configuration configuration;

    @Autowired
    @Qualifier("version")
    private Properties version;

    /**
     * Configuration JSON
     */
    private String configJson;

    @Override
    public void afterPropertiesSet() throws Exception {
        Map params = new HashMap();
        List<Property> properties = configuration.getProperty();
        for (Property property : properties) {
            if (property.isExpose()) {
                params.put(StringUtils.replace(property.getName(), ".", "_"), StringUtils.isEmpty(property.getValue()) ? property.getDefautlVaule() : property.getValue());
            }
        }

        Set<Object> keys = version.keySet();
        for (Object key : keys) {
            String value = (String) version.get(key);
            params.put(StringUtils.replace((String) key, ".", "_"), value);
        }

        configJson = JsonUtils.format(params);

        logger.info("Converted ankus-site.xml to JSON for Web.\n{}", configJson);
    }

    @RequestMapping(value = "config", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public ResponseEntity<String> getResourceBundle(final HttpServletRequest request, final HttpServletResponse response, final Locale locale) throws IOException {
        MultiValueMap headers = new HttpHeaders();
        headers.set("Content-Type", CONTENT_TYPE);
        return new ResponseEntity(JS_PREFIX + configJson + JS_POSTFIX, headers, HttpStatus.OK);
    }

}
