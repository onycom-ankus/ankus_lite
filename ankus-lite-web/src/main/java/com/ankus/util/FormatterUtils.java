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

import org.w3c.dom.Document;
import org.xml.sax.InputSource;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.StringReader;
import java.util.Iterator;
import java.util.List;

/**
 * Formatting Utilty.
 *
 * @author Edward KIM
 * @since 0.2
 */
public class FormatterUtils {

    /**
     * 지정한 헤더명과 헤더명에 해당하는 값들을 기준으로 문자열을 구성한다.
     *
     * @param headers 헤더명 리스트
     * @param entries 헤더명에 해당하는 값의 배열 리스트
     * @return 테이블 형태의 문자열
     */
    public static String formatResultSet(String[] headers, List<Object[]> entries) {
        // 기본 길이는 모두 헤더값으로 설정한다.
        int[] sizes = new int[headers.length];
        for (int i = 0; i < headers.length; i++) {
            sizes[i] = headers[i].getBytes().length;
        }

        // 각 컬럼을 순회하며 자료형을 파악하고 그 자료형에 맞춰서 크기를 조정한다.
        Iterator<Object[]> iterator = entries.iterator();
        while (iterator.hasNext()) {
            Object[] values = iterator.next();
            for (int i = 0; i < values.length; i++) {
                Object value = values[i];
                if (value == null) {
                    if (sizes[i] < 4) {
                        sizes[i] = 4;
                    }
                } else if (value instanceof String) {
                    if (sizes[i] < ((String) value).getBytes().length) {
                        sizes[i] = ((String) value).getBytes().length;
                    }
                } else if (value instanceof Long) {
                    sizes[i] = 20;
                } else if (value instanceof Integer) {
                    sizes[i] = 11;
                } else if (value instanceof Boolean) {
                    if (sizes[i] < 4) {
                        sizes[i] = 4;
                    }
                } else {
                    if (sizes[i] < 10) {
                        sizes[i] = 10;
                    }
                }
            }
        }

        // 최종 출력 문자열을 구성한다.
        StringBuilder builder = new StringBuilder();
        buildSeparator(sizes, builder);
        builder.append("\n");
        buildHeaders(headers, sizes, builder);
        builder.append("\n");
        buildSeparator(sizes, builder);
        builder.append("\n");
        Iterator<Object[]> it = entries.iterator();
        while (it.hasNext()) {
            Object[] v = it.next();
            buildValues(v, sizes, builder);
            builder.append("\n");
        }
        buildSeparator(sizes, builder);
        return builder.toString();
    }

    /**
     * ROW 간 구분 문자열을 구성한다.
     *
     * @param sizes   각 컬럼의 최대 길이
     * @param builder String Builder
     */
    private static void buildSeparator(int[] sizes, StringBuilder builder) {
        builder.append("+");
        for (int size : sizes) {
            builder.append(getDash(size + 2));
            builder.append("+");
        }
    }

    /**
     * 컬럼의 헤더명을 최대 길이를 기준으로 텍스트 그리드의 ROW 문자열로 구성한다.
     *
     * @param headers 하나의 행을 구성하는 컬럼명
     * @param sizes   각 컬럼의 최대 길이
     * @param builder String Builder
     */
    private static void buildHeaders(String[] headers, int[] sizes, StringBuilder builder) {
        builder.append("|");
        for (int i = 0; i < sizes.length; i++) {
            int size = sizes[i];
            if (headers[i].getBytes().length == size) {
                builder.append(" ").append(headers[i]).append(" |");
            } else {
                int diff = size - headers[i].getBytes().length;
                builder.append(" ").append(headers[i]).append(getCharacter(diff, " ")).append(" |");
            }
        }
    }

    /**
     * 컬럼 목록을 컬럼의 최대 길이를 기준으로 텍스트 그리드의 ROW 문자열로 구성한다.
     *
     * @param values  하나의 행을 구성하는 컬럼의 배열
     * @param sizes   각 컬럼의 최대 길이
     * @param builder String Builder
     */
    private static void buildValues(Object[] values, int[] sizes, StringBuilder builder) {
        builder.append("|");
        for (int i = 0; i < sizes.length; i++) {
            int size = sizes[i];
            String value = null;
            if (values[i] == null) {
                value = "    ";
            } else if (values[i] instanceof Long) {
                value = String.valueOf(((Long) values[i]));
            } else if (values[i] instanceof Integer) {
                value = String.valueOf(((Integer) values[i]));
            } else if (values[i] instanceof Boolean) {
                value = String.valueOf(((Boolean) values[i]));
            } else if (values[i] instanceof String) {
                value = (String) values[i];
            } else {
                value = "          ";
            }

            if (value.getBytes().length == size) {
                builder.append(" ").append(value).append(" |");
            } else {
                int diff = size - value.getBytes().length;
                builder.append(" ").append(value).append(getCharacter(diff, " ")).append(" |");
            }
        }
    }

    /**
     * 지정한 개수만큼 대쉬를 하나의 문자열로 구성한다.
     *
     * @param size 대수의 개수
     * @return 대수로 구성된 문자열
     */
    private static String getDash(int size) {
        return getCharacter(size, "-");
    }

    /**
     * 지정한 크기 만큼 문자열을 구성한다.
     *
     * @param size      문자열을 구성할 반복수
     * @param character 문자열을 구성하기 위한 단위 문자열. 반복수만큼 생성된다.
     * @return 문자열
     */
    private static String getCharacter(int size, String character) {
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < size; i++) {
            builder.append(character);
        }
        return builder.toString();
    }

    /**
     * XML 문자열을 파싱한다.
     *
     * @param xml XML 문자열
     * @return Document
     */
    private static Document parseXmlFile(String xml) {
        try {
            DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();
            InputSource inputSource = new InputSource(new StringReader(xml));
            return documentBuilder.parse(inputSource);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
