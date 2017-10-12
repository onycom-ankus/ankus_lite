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

import com.ankus.util.StringUtils;

import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Expression Language 유틸리티.
 *
 * @author Edward KIMF
 * @since 0.2
 */
public class ELUtils {

    /**
     * <pre>${var}</pre> 형식의 변수를 찾을 때 사용하는 Regular Expression
     */
    private static Pattern variableRegex = Pattern.compile("\\$\\{[^\\}\\$\u0020]+\\}");

    /**
     * EL을 포함하는 문자열에서 EL을 추출하여 변환한다.
     *
     * @param props Key Value 형식의 값
     * @param value EL을 포함하는 문자열
     * @return EL을 해석한 문자열
     */
    public static String resolve(Properties props, String value) {
        if (StringUtils.isEmpty(value.trim())) {
            throw new IllegalArgumentException("Required string to evaluate. '" + value + "'");
        }
        Matcher matcher = variableRegex.matcher(value);
        String resolvedString = value.toString();
        while (matcher.find()) {
            String var = matcher.group();
            String eliminated = var.substring(2, var.length() - 1); // ${ .. } 제거
            String property = props.getProperty(eliminated);
            String finalValue = null;
            /* 변수값이 Properties에 존재하지 않는 경우 System Properties를 찾아나간다. */
            if (property == null) {
                String systemValue = System.getProperty(eliminated);
                if (!StringUtils.isEmpty(systemValue)) {
                    finalValue = systemValue;
                } else {
                    /* System Properties에도 존재하지 않는다면 변수명을 다시 복원한다. */
                    finalValue = var;
                }
            } else {
                finalValue = resolve(props, property);
            }
            resolvedString = org.apache.commons.lang.StringUtils.replace(resolvedString, var, finalValue);
        }
        return resolvedString;
    }

    /**
     * EL을 포함하는 문자열에서 EL을 추출하여 변환한다. EL을 해석할 때에는
     * 가장 먼저 사용자가 제공한 Key Value 속성값, 그리고 시스템 속성 그리고 Function 및 Constant 순서로 해석한다.
     *
     * @param evaluator EL Service의 evaluator
     * @param props     Key Value 형식의 값
     * @param value     EL을 포함하는 문자열
     * @return EL을 해석한 문자열
     */
    public static String evaluate(ELEvaluator evaluator, Properties props, String value) throws Exception {
        String resolved = resolve(props, value);
        return evaluator.evaluate(resolved, String.class);
    }
}
