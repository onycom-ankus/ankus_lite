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
import java.util.HashMap;

public class FileSystemCommand implements Serializable {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    /**
     * Key Value를 저장하기 위한 Map
     */
    private HashMap map = new HashMap();

    /**
     * 지정한 Key에 대해서 값을 꺼내온다.
     *
     * @param key 값을 꺼내올 Key
     * @return 값
     */
    public String getString(String key) {
        return (String) map.get(key);
    }

    /**
     * 지정한 Key에 대해서 값을 꺼내온다.
     *
     * @param key 값을 꺼내올 Key
     * @return 값
     */
    public Object getObject(String key) {
        return map.get(key);
    }

    /**
     * 지정한 Key로 값을 추가한다.
     *
     * @param key   값을 넣을 Key
     * @param value 값
     */
    public void putString(String key, String value) {
        map.put(key, value);
    }

    /**
     * 지정한 Key로 값을 추가한다.
     *
     * @param key   값을 넣을 Key
     * @param value 값
     */
    public void putObject(String key, Object value) {
        map.put(key, value);
    }

    /**
     *
     * @param key
     * @return
     */
    public Boolean getBoolean(String key) {
        return (Boolean) map.get(key);
    }

    public void putBoolean(String key, boolean value) {
        map.put(key, value);
    }
}
