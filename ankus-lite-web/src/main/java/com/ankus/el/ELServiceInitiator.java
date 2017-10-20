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
package com.ankus.el;

import com.google.common.base.Joiner;
import org.slf4j.helpers.MessageFormatter;

import java.util.*;

/**
 * EL Service를 Standalone Application에서 사용하기 위한 초기화
 *
 * @author Edward KIM
 * @since 0.2
 */
public class ELServiceInitiator {

    /**
     * EL Service를 초기화한다.
     *
     * @param constants 상수가 Key, 값이 Value
     * @param functions 함수가 Key, 값이 Value
     * @return EL Service
     * @throws Exception EL Service를 초기화할 수 없는 경우
     */
    public static ELServiceImpl getELService(Map<String, String> constants, Map<String, String> functions) throws Exception {
        ELServiceImpl service = new ELServiceImpl();
        service.setDefinitions(getDefinitions(constants, functions));
        service.afterPropertiesSet();
        return service;
    }

    /**
     * EL Service의 함수 및 상수를 담고 있는 map을 반환한다.
     *
     * @param constants 상수가 Key, 값이 Value
     * @param functions 함수가 Key, 값이 Value
     * @return 함수와 상수를 포함하는 Map
     */
    private static Map<String, String> getDefinitions(Map<String, String> constants, Map<String, String> functions) {
        Map<String, String> definitions = new HashMap<String, String>();
        definitions.put(ELServiceImpl.CONF_CONSTANTS, getDefinitions(constants));
        definitions.put(ELServiceImpl.CONF_FUNCTIONS, getDefinitions(functions));
        return definitions;
    }

    /**
     * EL Service의 Comma Separated EL 정의 문자열을 반환한다.
     *
     * @param keyValue 함수 또는 상수가 Key, 값이 Value
     * @return EL Service의 Comma Separated EL 정의 문자열
     */
    private static String getDefinitions(Map<String, String> keyValue) {
        Set<String> keys = keyValue.keySet();
        List<String> list = new ArrayList<String>();
        for (String key : keys) {
            String value = keyValue.get(key);
            list.add(MessageFormatter.format("{}={}", key, value).getMessage());
        }
        return Joiner.on(",").join(list);
    }
}
