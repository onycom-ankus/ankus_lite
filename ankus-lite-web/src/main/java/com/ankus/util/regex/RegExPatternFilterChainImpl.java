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

/**
 * Regular Expression Pattern 기반 문자열 패턴 필터를 하나 이상 적용할 수 있는 필터 체인 기본 구현체.
 *
 * @author Edward KIM
 * @version 0.3
 */
public class RegExPatternFilterChainImpl implements RegExPatternFilterChain {

    List<RegExPatternFilter> filters;

    @Override
    public List<String> filter(String message) {
        List<String> filtered = new ArrayList<String>();
        for (RegExPatternFilter filter : filters) {
            filtered.addAll(filter.filter(message));
        }
        return filtered;
    }

    public void setFilters(List<RegExPatternFilter> filters) {
        this.filters = filters;
    }

    public List<RegExPatternFilter> getFilters() {
        if (filters == null) {
            filters = new ArrayList<RegExPatternFilter>();
        }
        return filters;
    }

}
