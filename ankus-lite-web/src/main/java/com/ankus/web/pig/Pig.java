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
package com.ankus.web.pig;

import java.io.Serializable;
import java.sql.Timestamp;

public class Pig implements Serializable {

    public Long scriptId;

    public String username;

    public String scriptName;

    public String script;

    private Timestamp createDate;

    public Pig() {
    }

    public Long getScriptId() {
        return scriptId;
    }

    public void setScriptId(Long scriptId) {
        this.scriptId = scriptId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getScriptName() {
        return scriptName;
    }

    public void setScriptName(String scriptName) {
        this.scriptName = scriptName;
    }

    public String getScript() {
        return script;
    }

    public void setScript(String script) {
        this.script = script;
    }

    public Timestamp getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Timestamp createDate) {
        this.createDate = createDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Pig pig = (Pig) o;

        if (scriptId != null ? !scriptId.equals(pig.scriptId) : pig.scriptId != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return scriptId != null ? scriptId.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "Pig{" +
                "scriptId=" + scriptId +
                ", username='" + username + '\'' +
                ", scriptName='" + scriptName + '\'' +
                ", script='" + script + '\'' +
                ", createDate=" + createDate +
                '}';
    }
}