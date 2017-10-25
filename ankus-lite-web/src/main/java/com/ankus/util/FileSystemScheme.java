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

/**
 * File System Scheme Enumeration.
 *
 * @author Edward KIM
 * @since 0.2
 */
public enum FileSystemScheme {

    LOCAL("file:"), HDFS("hdfs://");

    /**
     * Scheme
     */
    private String scheme;

    /**
     * 기본 생성자.
     *
     * @param scheme Scheme
     */
    private FileSystemScheme(String scheme) {
        this.scheme = scheme;
    }

    /**
     * Scheme을 반환한다.
     *
     * @return Scheme
     */
    public String getScheme() {
        return scheme;
    }
}
