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
package com.ankus.fs.hdfs;

import org.apache.hadoop.fs.Path;
import org.apache.hadoop.fs.PathFilter;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.PathMatcher;

/**
 * Hadoop HDFS의 Apache Ant Path Pattern을 이용한 경로 필터.
 *
 * @author Byoung Gon, Kim
 * @since 0.3
 */
public class HdfsAntPatternPathFilter implements PathFilter {

    /**
     * Apache Ant Path Pattern
     */
    private String antPattern;

    /**
     * Apache Ant Path Pattern Matcher
     */
    private PathMatcher antPathMatcher;

    /**
     * 기본 생성자.
     *
     * @param antPattern Apache Ant Path Pattern
     */
    public HdfsAntPatternPathFilter(String antPattern) {
        this.antPattern = antPattern;
        this.antPathMatcher = new AntPathMatcher();
    }

    @Override
    public boolean accept(Path path) {
        return antPathMatcher.match(antPattern, path.toUri().getPath());
    }

}
