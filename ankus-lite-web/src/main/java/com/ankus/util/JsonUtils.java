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

import org.codehaus.jackson.map.ObjectMapper;

import java.io.IOException;

/**
 * Jackson JSON Utility.
 *
 * @author Edward KIM
 * @since 0.1
 */
public class JsonUtils {

    /**
     * Jackson JSON Object Mapper
     */
    private static ObjectMapper objectMapper = new ObjectMapper();

    /**
     * 지정한 Object를 Jackson JSON Object Mapper를 이용하여 JSON으로 변환한다.
     *
     * @param obj JSON으로 변환할 Object
     * @return JSON String
     * @throws java.io.IOException JSON으로 변환할 수 없는 경우
     */
    public static String marshal(Object obj) throws IOException {
        return objectMapper.writeValueAsString(obj);
    }


    /**
     * 지정한 Object를 Jackson JSON Object Mapper를 이용하여 JSON으로 변환한다.
     *
     * @param obj JSON으로 변환할 Object
     * @return JSON String
     * @throws java.io.IOException JSON으로 변환할 수 없는 경우
     */
    public static String format(Object obj) throws IOException {
        return objectMapper.defaultPrettyPrintingWriter().writeValueAsString(obj);
    }

}
