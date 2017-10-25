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
 * File Type Enumeration.
 *
 * @author Byoung Gon, Kim
 * @since 1.0
 */
public enum FileType implements Serializable {

    /**
     * 디렉토리 또는 파일 생성
     */
    DIRECTORY("directory"),

    /**
     * 디렉토리 또는 파일 삭제
     */
    FILE("file");

    /**
     * 문자열 값
     */
    public final String value;

    /**
     * 기본 생성자.
     *
     * @param value Enumeration 문자열 값
     */
    FileType(String value) {
        this.value = value;
    }
}