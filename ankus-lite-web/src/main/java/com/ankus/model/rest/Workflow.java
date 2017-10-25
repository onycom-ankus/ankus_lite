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
import java.sql.Timestamp;

/**
 * Workflow Domain Object.
 *
 * @author Edward KIM
 * @since 0.1
 */
public class Workflow implements Serializable {

    private long id;

    private String workflowId;

    private String workflowName;

    private String description;

    private String variables;

    private String workflowXml;

    private String designerXml;

    private Timestamp create;

    private String username;

    private WorkflowStatusType status;

    private long workflowTreeId;

    public Workflow() {
    }

    public Workflow(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getWorkflowId() {
        return workflowId;
    }

    public void setWorkflowId(String workflowId) {
        this.workflowId = workflowId;
    }

    public String getWorkflowName() {
        return workflowName;
    }

    public void setWorkflowName(String workflowName) {
        this.workflowName = workflowName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getVariables() {
        return variables;
    }

    public void setVariables(String variables) {
        this.variables = variables;
    }

    public Timestamp getCreate() {
        return create;
    }

    public void setCreate(Timestamp create) {
        this.create = create;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getWorkflowXml() {
        return workflowXml;
    }

    public void setWorkflowXml(String workflowXml) {
        this.workflowXml = workflowXml;
    }

    public WorkflowStatusType getStatus() {
        return status;
    }

    public void setStatus(WorkflowStatusType status) {
        this.status = status;
    }

    public long getWorkflowTreeId() {
        return workflowTreeId;
    }

    public void setWorkflowTreeId(long workflowTreeId) {
        this.workflowTreeId = workflowTreeId;
    }

    public String getDesignerXml() {
        return designerXml;
    }

    public void setDesignerXml(String designerXml) {
        this.designerXml = designerXml;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Workflow workflow = (Workflow) o;

        if (id != workflow.id) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return (int) (id ^ (id >>> 32));
    }

    @Override
    public String toString() {
        return "Workflow{" +
                "id=" + id +
                ", workflowId='" + workflowId + '\'' +
                ", workflowName='" + workflowName + '\'' +
                ", description='" + description + '\'' +
                ", variables='" + variables + '\'' +
                ", workflowXml='" + workflowXml + '\'' +
                ", designerXml='" + designerXml + '\'' +
                ", create=" + create +
                ", username='" + username + '\'' +
                ", status=" + status +
                ", workflowTreeId=" + workflowTreeId +
                '}';
    }
}