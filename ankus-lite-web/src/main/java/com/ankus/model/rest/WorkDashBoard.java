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
public class WorkDashBoard implements Serializable {

    
    private String workname;

    private String workid;
    
    private String dbname;

    private String tablename;

    private String query;

    private String hdfs;
    
    private String start_time;
    
    private String end_time;
    
    private String user;
    
    private String DATABASE_TYPE;
    
    private String DATABASE_ADDRESS;
    
    private String DATABASE_ID;
    
    private String DATABASE_PASSWORD;
    

	private String DATABASE_PORT;
    
    private String ID;
    
    private String PASSWORD;
    
    private String status;    

	private long progress;

   

	public String getWorkname() {
		return workname;
	}



	public void setWorkname(String workname) {
		this.workname = workname;
	}

	public String getWorkid() {
		return workid;
	}


	public void setWorkid(String workid) {
		this.workid = workid;
	}


	public String getDbname() {
		return dbname;
	}



	public void setDbname(String dbname) {
		this.dbname = dbname;
	}



	public String getTablename() {
		return tablename;
	}



	public void setTablename(String tablename) {
		this.tablename = tablename;
	}



	public String getQuery() {
		return query;
	}



	public void setQuery(String query) {
		this.query = query;
	}



	public String getHdfs() {
		return hdfs;
	}



	public void setHdfs(String hdfs) {
		this.hdfs = hdfs;
	}



	public String getStart_time() {
		return start_time;
	}



	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}



	public String getEnd_time() {
		return end_time;
	}



	public void setEnd_time(String end_time) {
		this.end_time = end_time;
	}



	public String getUser() {
		return user;
	}



	public void setUser(String user) {
		this.user = user;
	}



	public String getDATABASE_TYPE() {
		return DATABASE_TYPE;
	}



	public void setDATABASE_TYPE(String dATABASE_TYPE) {
		DATABASE_TYPE = dATABASE_TYPE;
	}



	public String getDATABASE_ADDRESS() {
		return DATABASE_ADDRESS;
	}



	public void setDATABASE_ADDRESS(String dATABASE_ADDRESS) {
		DATABASE_ADDRESS = dATABASE_ADDRESS;
	}



	public String getDATABASE_ID() {
		return DATABASE_ID;
	}



	public void setDATABASE_ID(String dATABASE_ID) {
		DATABASE_ID = dATABASE_ID;
	}



	public String getDATABASE_PASSWORD() {
		return DATABASE_PASSWORD;
	}



	public void setDATABASE_PASSWORD(String dATABASE_PASSWORD) {
		DATABASE_PASSWORD = dATABASE_PASSWORD;
	}



	public String getDATABASE_PORT() {
		return DATABASE_PORT;
	}



	public void setDATABASE_PORT(String dATABASE_PORT) {
		DATABASE_PORT = dATABASE_PORT;
	}



	public String getID() {
		return ID;
	}



	public void setID(String iD) {
		ID = iD;
	}



	public String getPASSWORD() {
		return PASSWORD;
	}



	public void setPASSWORD(String pASSWORD) {
		PASSWORD = pASSWORD;
	}



	public String getStatus() {
		return status;
	}



	public void setStatus(String status) {
		this.status = status;
	}



	public long getProgress() {
		return progress;
	}



	public void setProgress(long progress) {
		this.progress = progress;
	}



	@Override
	public String toString() {
		return "WorkDashBoard [workname=" + workname + ", workid=" + workid
				+ ", dbname=" + dbname + ", tablename=" + tablename
				+ ", query=" + query + ", hdfs=" + hdfs + ", start_time="
				+ start_time + ", end_time=" + end_time + ", user=" + user
				+ ", DATABASE_TYPE=" + DATABASE_TYPE + ", DATABASE_ADDRESS="
				+ DATABASE_ADDRESS + ", DATABASE_ID=" + DATABASE_ID
				+ ", DATABASE_PASSWORD=" + DATABASE_PASSWORD
				+ ", DATABASE_PORT=" + DATABASE_PORT + ", ID=" + ID
				+ ", PASSWORD=" + PASSWORD + ", status=" + status
				+ ", progress=" + progress + "]";
	}




}