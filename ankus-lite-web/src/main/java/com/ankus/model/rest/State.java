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
 * Workflow와 Action의 상태정보 Enumeration.
 *
 * @author Edward KIM
 * @since 0.2
 */
public enum State implements Serializable {

    PREPARE("prepare"), RUNNING("running"), SUCCESS("success"), FAIL("fail"), KILL("kill"), INVALID("invalid");

    /**
     * 상태 코드
     */
    public final String value;

    /**
     * 기본 생성자.
     *
     * @param value 상태 코드
     */
    State(String value) {
        this.value = value;
    }
}