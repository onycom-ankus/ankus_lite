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

import org.springframework.core.io.Resource;

/**
 * Java Classpath Utilty.
 *
 * @author Edward KIM
 * @since 0.1
 */
public class ClasspathUtils {

    /**
     * CLASSPATH 내에 지정한 경로의 리소스가 존재하는지 확인한다.
     *
     * @param name 경로를 포함한 리소스의 위치
     * @return 존재하는 경우 <tt>true</tt>
     */
    public static boolean isExist(String name) {
        Resource resource = ResourceUtils.getResource("classpath:" + name);
        return resource.isReadable();
    }

}
