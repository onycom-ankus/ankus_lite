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
import java.util.List;
import java.util.Map;

/**
 * Pig JAXB Object.
 *
 * @author Edward KIM
 * @since 0.4
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
        "id",
        "username",
        "name",
        "script",
        "variable",
        "configuration",
        "external"
})
@XmlRootElement(name = "pig")
@JsonAutoDetect(
        getterVisibility = JsonAutoDetect.Visibility.ANY,
        fieldVisibility = JsonAutoDetect.Visibility.NONE,
        setterVisibility = JsonAutoDetect.Visibility.ANY
)
public class Pig implements Serializable {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    Long id;

    public String username;

    public String name;

    String script;

    Map variable;

    Map configuration;

    List external;

    public Pig() {
    }

    public Pig(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getScript() {
        return script;
    }

    public void setScript(String script) {
        this.script = script;
    }

    public Map getVariable() {
        return variable;
    }

    public void setVariable(Map variable) {
        this.variable = variable;
    }

    public Map getConfiguration() {
        return configuration;
    }

    public void setConfiguration(Map configuration) {
        this.configuration = configuration;
    }

    public List getExternal() {
        return external;
    }

    public void setExternal(List external) {
        this.external = external;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Pig pig = (Pig) o;

        if (id != null ? !id.equals(pig.id) : pig.id != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "Pig{" +
                "id=" + id +
                ", script='" + script + '\'' +
                ", variable=" + variable +
                ", configuration=" + configuration +
                ", external=" + external +
                '}';
    }
}
