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
 * Audit Log Type Enumeration.
 *
 * @author Byoung Gon, Kim
 * @since 0.3
 */
public enum AuditType implements Serializable {

    /**
     * 디렉토리 또는 파일 생성
     */
    CREATE("create"),

    /**
     * 디렉토리 또는 파일 삭제
     */
    DELETE("delete"),

    /**
     * 디렉토리 또는 파일 이동
     */
    MOVE("move"),

    /**
     * 디렉토리 또는 파일의 이름 변경
     */
    RENAME("rename"),

    /**
     * 디렉토리 또는 파일의 복사
     */
    COPY("copy"),

    /**
     * 디렉토리 또는 파일의 정보 변경
     */
    MODIFY("modify"),

    /**
     * 디렉토리 또는 파일의 정보 확인
     */
    PROPERTY("property"),

    /**
     * 파일 저장
     */
    WRITE("write"),

    /**
     * 파일 읽기
     */
    READ("read"),

    /**
     * 파일 다운로드
     */
    DOWNLOAD("download"),

    /**
     * 파일 업로드
     */
    UPLOAD("upload");

    /**
     * 문자열 값
     */
    public final String value;

    /**
     * 기본 생성자.
     *
     * @param value Enumeration 문자열 값
     */
    AuditType(String value) {
        this.value = value;
    }
}