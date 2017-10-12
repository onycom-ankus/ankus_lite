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

import com.ankus.locale.ResourceBundleHelper;
import com.ankus.web.configuration.ConfigurationManager;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
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
import java.util.Locale;
import java.util.Map;

/**
 * ExtJS의 UI Component에서 I18N을 적용하기 위해서 리소스 번들을 로딩하여
 * 리소스 번들의 Key와 Value를 자바스크립트로 생성하는 리소스 번들 컨트롤러.
 *
 * @author Edward KIM
 * @since 0.1
 */
@Controller
@RequestMapping("/message")
public class ResourceBundleController implements InitializingBean {

    /**
     * JavaScript Variable Prefix
     */
    private final static String JS_PREFIX = "var MSG = ";

    /**
     * JavaScript End Postfix
     */
    private final static String JS_POSTFIX = ";";

    /**
     * JavaScript Content Type
     */
    private final static String CONTENT_TYPE = "application/x-javascript; charset=UTF-8";

    /**
     * Resource Bundle JSON
     */
    private String json;

    @Autowired
    private ConfigurationManager configurationManager;

    @Autowired
    private ResourceBundleHelper resourceBundleHelper;

    @Override
    public void afterPropertiesSet() throws Exception {
        String applicationLocale = configurationManager.get("application.locale", "English");
        Map bundles = (Map) resourceBundleHelper.getLocaleMap().get(applicationLocale);
        json = com.ankus.util.JsonUtils.format(bundles);
    }

    @RequestMapping(value = "bundle", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public ResponseEntity<String> getResourceBundle(final HttpServletRequest request, final HttpServletResponse response, final Locale locale) throws IOException {
        MultiValueMap headers = new HttpHeaders();
        headers.set("Content-Type", CONTENT_TYPE);
        return new ResponseEntity(JS_PREFIX + json + JS_POSTFIX, headers, HttpStatus.OK);
    }
}
