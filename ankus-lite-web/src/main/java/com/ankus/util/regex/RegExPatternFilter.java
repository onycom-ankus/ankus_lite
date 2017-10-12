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
package com.ankus.util.regex;

import java.util.List;

/**
 * Regular Expression Pattern 기반 문자열 패턴 필터.
 *
 * @author Edward KIM
 * @version 0.3
 */
public interface RegExPatternFilter {

    /**
     * 주어진 문자열을 Regular Expression을 기반으로 필터링한다.
     *
     * @param message Regular Expression으로 필터링할 문자열
     * @return 필터링한 문자열
     */
    List<String> filter(String message);

}
