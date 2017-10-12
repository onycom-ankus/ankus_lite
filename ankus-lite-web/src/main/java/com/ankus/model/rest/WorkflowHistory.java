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
 * Workflow Execution History Domain Object.
 *
 * @author Edward KIM
 * @since 0.1
 */
public class WorkflowHistory implements Serializable {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    private long id;

    private String workflowId;

    private long jobId;

    private String jobStringId;

    private String workflowName;

    private String workflowXml;

    private String currentAction;

    private String jobName;

    private String variables;

    private Date startDate;

    private Date endDate;

    private long elapsed;

    private String cause;

    private int currentStep;

    private int totalStep;

    private String exception;

    private State status;

    private String username;

    private String jobType;

    private String logPath;

    public WorkflowHistory() {
    }

    public WorkflowHistory(long id) {
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
    
    public long getJobId() {
        return jobId;
    }

    public void setJobId(long jobId) {
        this.jobId = jobId;
    }

    public String getJobStringId() {
        return jobStringId;
    }

    public void setJobStringId(String jobStringId) {
        this.jobStringId = jobStringId;
    }

    public String getWorkflowName() {
        return workflowName;
    }

    public void setWorkflowName(String workflowName) {
        this.workflowName = workflowName;
    }

    public String getWorkflowXml() {
        return workflowXml;
    }

    public void setWorkflowXml(String workflowXml) {
        this.workflowXml = workflowXml;
    }

    public String getCurrentAction() {
        return currentAction;
    }

    public void setCurrentAction(String currentAction) {
        this.currentAction = currentAction;
    }

    public String getJobName() {
        return jobName;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public String getVariables() {
        return variables;
    }

    public void setVariables(String variables) {
        this.variables = variables;
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

    public int getCurrentStep() {
        return currentStep;
    }

    public void setCurrentStep(int currentStep) {
        this.currentStep = currentStep;
    }

    public int getTotalStep() {
        return totalStep;
    }

    public void setTotalStep(int totalStep) {
        this.totalStep = totalStep;
    }

    public String getException() {
        return exception;
    }

    public void setException(String exception) {
        this.exception = exception;
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

    public String getJobType() {
        return jobType;
    }

    public void setJobType(String jobType) {
        this.jobType = jobType;
    }

    public String getLogPath() {
        return logPath;
    }

    public void setLogPath(String logPath) {
        this.logPath = logPath;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        WorkflowHistory that = (WorkflowHistory) o;

        if (id != that.id) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return (int) (id ^ (id >>> 32));
    }

    @Override
    public String toString() {
        return "WorkflowHistory{" +
                "id=" + id +
                ", workflowId='" + workflowId + '\'' +
                ", jobId=" + jobId +
                ", jobStringId='" + jobStringId + '\'' +
                ", workflowName='" + workflowName + '\'' +
                ", workflowXml='" + workflowXml + '\'' +
                ", currentAction='" + currentAction + '\'' +
                ", jobName='" + jobName + '\'' +
                ", variables='" + variables + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", elapsed=" + elapsed +
                ", cause='" + cause + '\'' +
                ", currentStep=" + currentStep +
                ", totalStep=" + totalStep +
                ", exception='" + exception + '\'' +
                ", status=" + status +
                ", username='" + username + '\'' +
                
                ", jobType='" + jobType + '\'' +
                ", logPath='" + logPath + '\'' +
                '}';
    }
}