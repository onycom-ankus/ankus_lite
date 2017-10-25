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
public class ProcessRate implements Serializable {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;


    private int Progress;
    private int Totalcount;
    private int Status;
    private String Log;
   
    public String getLog() {
		return Log;
	}
	public void setLog(String log) {
		this.Log = log;
	}
	public int getStatus() {
        return Status;
    }
    public int getProgress() {
        return Progress;
    }
    public int getTotalcount() {
        return Totalcount;
    }

    public void setProgress(int Progress) {
        this.Progress = Progress;
    }
    public void setTotalcount(int Totalcount) {
        this.Totalcount = Totalcount;
    }
    public void setStatus(int Status) {
        this.Status = Status;
    }
	@Override
	public String toString() {
		return "ProcessRate [Progress=" + Progress + ", Totalcount="
				+ Totalcount + ", Status=" + Status + ", log=" + Log + "]";
	}
	

}