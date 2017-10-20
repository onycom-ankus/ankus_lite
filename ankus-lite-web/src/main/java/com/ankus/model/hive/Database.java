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

import com.ankus.model.rest.ExtJSTreeNode;

import java.util.Map;

/**
 * HCatalog의 데이터베이스 정보를 JSON으로 주고 받기 위한 데이터베이스 모델.
 *
 * @author Byoung Gon, Kim
 * @version 0.3
 */
public class Database extends ExtJSTreeNode {

    /**
     * Database's name
     */
    private String name;

    /**
     * Database's comment
     */
    private String comment;

    /**
     * Database's location
     */
    private String location;

    /**
     * Database's properties
     */
    private Map<String, String> properties;

    public Database() {
    }

    public Database(String name) {
        this.name = name;
    }

    public Database(String name, String comment) {
        this.name = name;
        this.comment = comment;
    }

    public Database(String name, String comment, String location) {
        this.name = name;
        this.comment = comment;
        this.location = location;
    }

    /**
     * Default Constructore.
     *
     * @param name       Database's name
     * @param comment    Database's comment
     * @param location   Database's location
     * @param properties Database's properties
     */
    public Database(String name, String comment, String location, Map<String, String> properties) {
        this.name = name;
        this.comment = comment;
        this.location = location;
        this.properties = properties;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Map<String, String> getProperties() {
        return properties;
    }

    public void setProperties(Map<String, String> properties) {
        this.properties = properties;
    }

    @Override
    public String toString() {
        return "Database{" +
                "name='" + name + '\'' +
                ", comment='" + comment + '\'' +
                ", location='" + location + '\'' +
                ", properties=" + properties +
                '}';
    }
}
