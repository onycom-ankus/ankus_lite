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
package com.ankus.fs.s3;

/**
 * Bucket의 이름을 필터링하는 필터.
 *
 * @author Byoung Gon, Kim
 * @version 0.3
 */
public interface BucketFilter {

    /**
     * 지정한 이름을 다른 형태의 이름으로 필터링한다.
     *
     * @param name 필터링할 이름
     * @return 필터링한 이름
     */
    String filter(String name);

}
