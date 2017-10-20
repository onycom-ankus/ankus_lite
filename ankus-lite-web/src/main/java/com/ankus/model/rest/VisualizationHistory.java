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
import java.util.Date;

/**
 * Visualization Execution History Domain Object.
 *
 * @author Jaesung ahn
 */
public class VisualizationHistory implements Serializable {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    private long id;

    private String workflowId;

    private long jobId;

    private String jobStringId;

    private String visualizationHtml;

    private Timestamp create;
    
    public VisualizationHistory() {
    }

    public VisualizationHistory(long id) {
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
    
    
    public String getVisualizationHtml() {
    	return visualizationHtml;
    }
    
    public void setVisualizationHtml(String visualizationHtml) {
    	this.visualizationHtml = visualizationHtml;
    }
    
    public Timestamp getCreate() {
    	return create;
    }
    
    public void setCreate(Timestamp create) {
    	this.create = create;
    }
    
    @Override
    public boolean equals(Object o) {
    	if (this == o) return true;
    	if (o == null || getClass() != o.getClass()) return false;
    	
    	VisualizationHistory that = (VisualizationHistory) o;
    	
    	if (id != that.id) return false;
    	
    	return true;
    }
    
    @Override
    public int hashCode() {
    	return (int) (id ^ (id >>> 32));
    }

	@Override
	public String toString() {
		return "VisualizationHistory [id=" + id + ", workflowId=" + workflowId
				+ ", jobId=" + jobId + ", jobStringId=" + jobStringId
				+ ", visualizationHtml=" + visualizationHtml + ", create="
				+ create + "]";
	}

	

  
}