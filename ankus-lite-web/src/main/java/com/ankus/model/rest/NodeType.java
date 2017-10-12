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
 * Tree를 구성하는 개별 노드의 유형을 표현하는 Type Enumeration.
 *
 * @author Edward KIM
 * @since 0.1
 */
public enum NodeType implements Serializable {

    FOLDER("folder"), ITEM("item");

    /**
     * 노드 유형의 문자열 값
     */
    public final String value;

    /**
     * 기본 생성자.
     *
     * @param value 노드 유형의 문자열 값
     */
    NodeType(String value) {
        this.value = value;
    }
}