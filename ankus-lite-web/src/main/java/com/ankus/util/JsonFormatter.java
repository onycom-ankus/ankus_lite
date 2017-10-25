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
package com.ankus.util;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializationConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * JSON을 들여쓰기를 이용하여 포맷팅하는 Formatter.
 *
 * @author Edward KIM
 * @since 0.1
 */
public class JsonFormatter {

    /**
     * SLF4J Logging
     */
    private static Logger logger = LoggerFactory.getLogger(JsonFormatter.class);

    /**
     * 지정한 JSON을 포맷팅한다. 이 메소드는 디버그 용도로만 사용해야 한다.
     *
     * @param json JSON
     * @return Formatted JSON
     */
    public static String format(String json) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(SerializationConfig.Feature.INDENT_OUTPUT, true);
            JsonNode tree = objectMapper.readTree(json);
            return objectMapper.writeValueAsString(tree);
        } catch (Exception ex) {
            logger.warn("Cannot format JSON. JSON is \n{}", json, ex);
            return json;
        }
    }
}
