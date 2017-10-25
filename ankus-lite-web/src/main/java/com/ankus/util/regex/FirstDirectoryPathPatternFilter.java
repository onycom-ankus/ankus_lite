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

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Directory Path의 첫번째 Path Name을 Regular Expression Pattern을 이용하여 추출하는 필터.
 *
 * @author Edward KIM
 * @author Chiwan Park
 * @version 0.3
 */
public class FirstDirectoryPathPatternFilter implements RegExPatternFilter {

    private Pattern pattern = Pattern.compile("(?i)^/([-_0-9a-zA-Z]+)/.*");

    @Override
    public List<String> filter(String message) {
        List<String> filtered = new ArrayList<String>();
        Matcher matcher = pattern.matcher(message);

        while (matcher.find())
            filtered.add(matcher.group(1));

        return filtered;
    }

}
