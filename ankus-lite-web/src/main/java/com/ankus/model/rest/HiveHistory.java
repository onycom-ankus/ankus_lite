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
import java.util.Date;

/**
 * Hive Editor Execution History Domain Object.
 *
 * @author Byoung Gon, Kim
 * @since 0.5
 */
public class HiveHistory implements Serializable {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    private long id;

    private String executionId;

    private String databaseName;

    private String queryName;

    private String logPath;

    private String hiveJson;

    private String query;

    private Date startDate;

    private Date endDate;

    private long elapsed;

    private String cause;

    private State status;

    private String username;

    /**
     * 로그 파일의 크기
     */
    private long length;

    public HiveHistory() {
    }

    public HiveHistory(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getExecutionId() {
        return executionId;
    }

    public void setExecutionId(String executionId) {
        this.executionId = executionId;
    }

    public String getQueryName() {
        return queryName;
    }

    public void setQueryName(String queryName) {
        this.queryName = queryName;
    }

    public String getLogPath() {
        return logPath;
    }

    public void setLogPath(String logPath) {
        this.logPath = logPath;
    }

    public String getHiveJson() {
        return hiveJson;
    }

    public void setHiveJson(String hiveJson) {
        this.hiveJson = hiveJson;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public long getElapsed() {
        return elapsed;
    }

    public void setElapsed(long elapsed) {
        this.elapsed = elapsed;
    }

    public String getCause() {
        return cause;
    }

    public void setCause(String cause) {
        this.cause = cause;
    }

    public State getStatus() {
        return status;
    }

    public void setStatus(State status) {
        this.status = status;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public long getLength() {
        return length;
    }

    public void setLength(long length) {
        this.length = length;
    }

    public String getDatabaseName() {
        return databaseName;
    }

    public void setDatabaseName(String databaseName) {
        this.databaseName = databaseName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        HiveHistory that = (HiveHistory) o;

        if (id != that.id) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return (int) (id ^ (id >>> 32));
    }

    @Override
    public String toString() {
        return "HiveHistory{" +
                "id=" + id +
                ", executionId='" + executionId + '\'' +
                ", databaseName='" + databaseName + '\'' +
                ", queryName='" + queryName + '\'' +
                ", logPath='" + logPath + '\'' +
                ", hiveJson='" + hiveJson + '\'' +
                ", query='" + query + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", elapsed=" + elapsed +
                ", cause='" + cause + '\'' +
                ", status=" + status +
                ", username='" + username + '\'' +
                ", length=" + length +
                '}';
    }
}