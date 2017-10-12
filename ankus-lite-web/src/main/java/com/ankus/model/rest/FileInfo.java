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
package com.ankus.model.rest;

import java.io.Serializable;

/**
 * File Information.
 * 파일 시스템에 따라서 파일 정보를 표현하는 방법과 정보의 수가 다르므로 파일 시스템별로 별도 구현하여 제공하도록 한다.
 *
 * @author Edward KIM
 * @since 0.3
 */
public interface FileInfo extends Serializable {

    /**
     * 파일명을 반환한다.
     *
     * @return 파일명
     */
    String getFilename();

    /**
     * 파일의 fully qualified path를 반환한다.
     *
     * @return fully qualified path
     */
    String getFullyQualifiedPath();

    /**
     * 파일의 크기를 반환한다.
     *
     * @return 파일의 크기
     */
    long getLength();

    /**
     * 파일의 경로를 반환한다.
     *
     * @return 파일의 경로
     */
    String getPath();

    /**
     * 파일 여부를 반환한다.
     *
     * @return 파일인 경우 <tt>true</tt>
     */
    boolean isFile();

    /**
     * 디렉토리 여부를 반환한다.
     *
     * @return 디렉토리인 경우 <tt>true</tt>
     */
    boolean isDirectory();

    /**
     * 소유자 정보를 반환한다.
     *
     * @return 소유자 정보
     */
    String getOwner();

    /**
     * 그룹 정보를 반환한다.
     *
     * @return 그룹자 정보
     */
    String getGroup();

    /**
     * 파일의 블록 크기를 반환한다.
     *
     * @return 블록 크기
     */
    long getBlockSize();

    /**
     * 파일의 복제 개수를 반환한다.
     *
     * @return 복제 개수
     */
    int getReplication();

    /**
     * 파일의 변경 날짜를 반환한다.
     *
     * @return 변경 날짜
     */
    long getModificationTime();

    /**
     * 파일의 접근 날짜를 반환한다.
     *
     * @return 접근 날짜
     */
    long getAccessTime();
    /**
     * 파일의 접근 퍼미션를 반환한다.
     *
     * @return 접근 퍼미션
     */
    String getPermission();
    
}
