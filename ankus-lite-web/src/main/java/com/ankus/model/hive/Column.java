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
package com.ankus.model.hive;

import java.io.Serializable;

/**
 * HCatalog의 컬럼 정보를 JSON으로 주고 받기 위한 컬럼 모델.
 *
 * @author Byoung Gon, Kim
 * @version 0.3
 */
public class Column implements Serializable {

    /**
     * 컬럼명
     */
    private String name;

    /**
     * 컬럼의 유형
     */
    private String type;

    /**
     * 컬럼의 커멘트.
     */
    private String comment;

    /**
     * 카테고리.
     */
    private String category;

    public Column() {
    }

    public Column(String name, String type) {
        this.name = name;
        this.type = type;
    }

    public Column(String name, String type, String comment) {
        this.name = name;
        this.type = type;
        this.comment = comment;
    }

    public Column(String name, String comment, String type, String category) {
        this.name = name;
        this.comment = comment;
        this.type = type;
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "Column{" +
                "name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", comment='" + comment + '\'' +
                ", category='" + category + '\'' +
                '}';
    }
}
