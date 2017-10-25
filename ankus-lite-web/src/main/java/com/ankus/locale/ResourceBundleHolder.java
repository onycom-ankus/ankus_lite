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

import com.ankus.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.MessageFormat;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * <code>ResourceBundleHolder</code> provides a means to produce concatenated
 * messages in a language-neutral way. Use this to construct messages
 * displayed for end users.
 *
 * @author Byoung Gon, Kim
 * @since 1.0
 */
public class ResourceBundleHolder {

    /**
     * SLF4J Logging
     */
    private static Logger logger = LoggerFactory.getLogger(ResourceBundleHolder.class);

    private static Pattern variableRegex = Pattern.compile("\\{[^\\}\\$\u0020]+\\}");

    private static Map<String, Map> resourceBundleMap = new HashMap<String, Map>();

    private static Map<String, String> jsonMap = new HashMap<String, String>();

    public static String getMessage(String pattern, Object... args) {
        try {
            String finalMessage = "" + pattern;
            Matcher matcher = variableRegex.matcher(pattern);
            while (matcher.find()) {
                String var = matcher.group();
                String number = var.substring(1, var.length() - 1);
                if (!StringUtils.isEmpty(number)) {
                    int no = Integer.parseInt(number);
                    finalMessage = org.apache.commons.lang.StringUtils.replace(finalMessage, var, String.valueOf(args[no]));
                }
            }
            return finalMessage;
        } catch (Exception ex) {
            return pattern;
        }
    }

    public static String getLocaleMessage(String pattern, Object... args) {
        return getMessage(Locale.getDefault(), pattern, args);
    }

    public static String getMessage(Locale locale, String pattern, Object... args) {
        String localeKey = getLocaleKey(locale.getLanguage(), locale.getCountry());
        Map map = resourceBundleMap.get(localeKey);
        return MessageFormat.format((String) map.get(pattern), args);
    }

    public static String getDefaultLocale() {
        Locale defaultLocale = Locale.getDefault();
        return getLocaleKey(defaultLocale.getLanguage(), defaultLocale.getCountry());
    }

    public static String getLocaleKey(String language, String country) {
        return language + "_" + country;
    }

    public static String formatMessage(String pattern, String... args) {
        return MessageFormat.format(pattern, args);
    }

    public static void addResourceBundleMap(String locale, Map<String, String> resoucebundle) {
        if (!resourceBundleMap.containsKey(locale)) resourceBundleMap.put(locale, resoucebundle);
    }

    public static void addJsonMap(String locale, String json) {
        if (!jsonMap.containsKey(locale)) jsonMap.put(locale, json);
    }
}
