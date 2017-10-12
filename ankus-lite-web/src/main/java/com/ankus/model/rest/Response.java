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

import org.codehaus.jackson.annotate.JsonAutoDetect;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
        "success",
        "total",
        "start",
        "limit",
        "error",
        "map",
        "list",
        "object"
})
@XmlRootElement(name = "response")
@JsonAutoDetect(
        getterVisibility = JsonAutoDetect.Visibility.ANY,
        fieldVisibility = JsonAutoDetect.Visibility.NONE,
        setterVisibility = JsonAutoDetect.Visibility.ANY
)
public class Response implements Serializable {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    /**
     * 성공여부. 이 값이 false인 경우 ExtJS에서는
     * 해당 요청에 대해서 실패로 인지한다. 따라서 모든 작업에 있어서
     * 해당 작업을 서버측에서 처리할 수 없는 경우 항상 이 값은 false가 되어야 한다.
     */
    protected boolean success = false;

    /**
     * 응답의 결과가 하나 이상의 아이템으로 구성되어 있는 경우 사용하는 아이템 목록의 총 개수
     */
    protected int total;

    /**
     * ExtJS의 Grid 처리시 하나의 페이지에서 보여줄 아이템의 개수
     */
    protected int limit;

    /**
     * ExtJS의 Grid 처리시 페이지에서 보여줄 데이터의 시작 위치
     */
    protected int start;

    /**
     * 에러 메시지
     */
    protected Error error;

    /**
     * Key Value 형식의 데이터를 전달할 때 사용하는 노드
     */
    protected Map<String, Object> map;

    /**
     * 목록을 전달할 때 사용하는 노드
     */
    protected List<Object> list;

    /**
     * 단일 항목을 전달할 때 사용하는 노드
     */
    protected Object object;

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getStart() {
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public Error getError() {
        if (error == null) {
            error = new Error();
        }
        return error;
    }

    public void setError(Error error) {
        this.error = error;
    }

    public Map<String, Object> getMap() {
        if (map == null) {
            map = new HashMap<String, Object>();
        }
        return map;
    }

    public void setMap(Map<String, Object> map) {
        this.map = map;
    }

    public List<Object> getList() {
        if (list == null) {
            list = new ArrayList<Object>();
        }
        return list;
    }

    public void setList(List<Object> list) {
        this.list = list;
    }

    public Object getObject() {
        return object;
    }

    public void setObject(Object object) {
        this.object = object;
    }

    @Override
    public String toString() {
        return "Response{" +
                "success=" + success +
                ", total=" + total +
                ", limit=" + limit +
                ", start=" + start +
                ", error=" + error +
                ", map=" + map +
                ", list=" + list +
                ", object=" + object +
                '}';
    }
}
