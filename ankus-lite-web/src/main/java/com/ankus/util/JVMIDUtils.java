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

import org.apache.commons.lang.math.JVMRandom;

/**
 * JVM에 따라 임의의 값을 생성하는 UUID Generator.
 *
 * @author Edward KIM
 * @since 0.1
 */
public class JVMIDUtils {

    /**
     * JVM Random 값을 생성하는 JVMRandom
     */
    protected static JVMRandom random = new JVMRandom();

    /**
     * 고유한 JVM UUID를 생성한다.
     *
     * @return 생성된 JVM UUID
     */
    public static String generateUUID() {
        return String.valueOf(random.nextInt(999999999));
    }
}