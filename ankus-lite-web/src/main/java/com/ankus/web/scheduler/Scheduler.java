package com.ankus.web.scheduler;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Scheduler Domain Object.
 *
 * @author Jaesung Ahn
 * @since 0.1
 */
/**
 * @author 
 *
 */
public class Scheduler implements Serializable {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    private Integer id;
    private String name;
    private String month;
    private String week;
    private String day;
    private String hour;
    private String min;
    private String stype;
    private Integer workflowId;
    private String sshIp;
    private Integer sshPort;
    private String sshId;
    private String sshPwd;
    private String sshCmd;
    private String state;
    private Timestamp runtime;
    private Timestamp endtime;
    private Integer duration;
    public Integer getDuration() {
		return duration;
	}
	public void setDuration(Integer duration) {
		this.duration = duration;
	}
	private String enable;

    private String schedule;
    private String workflowName;
   
    /* paging 처리용*/
    private boolean paging = false;
    private Integer page = 1;
    private Integer rows = 20;
    private String sidx;
    private String sord;
    private Integer startRow;
    private Integer endRow;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	public String getWeek() {
		return week;
	}
	public void setWeek(String week) {
		this.week = week;
	}
	public String getDay() {
		return day;
	}
	public void setDay(String day) {
		this.day = day;
	}
	public String getHour() {
		return hour;
	}
	public void setHour(String hour) {
		this.hour = hour;
	}
	public String getMin() {
		return min;
	}
	public void setMin(String min) {
		this.min = min;
	}
	public String getStype() {
		return stype;
	}
	public void setStype(String stype) {
		this.stype = stype;
	}
	public Integer getWorkflowId() {
		return workflowId;
	}
	public void setWorkflowId(Integer workflowId) {
		this.workflowId = workflowId;
	}
	public String getSshIp() {
		return sshIp;
	}
	public void setSshIp(String sshIp) {
		this.sshIp = sshIp;
	}
	public Integer getSshPort() {
		return sshPort;
	}
	public void setSshPort(Integer sshPort) {
		this.sshPort = sshPort;
	}
	public String getSshId() {
		return sshId;
	}
	public void setSshId(String sshId) {
		this.sshId = sshId;
	}
	public String getSshPwd() {
		return sshPwd;
	}
	public void setSshPwd(String sshPwd) {
		this.sshPwd = sshPwd;
	}
	public String getSshCmd() {
		return sshCmd;
	}
	public void setSshCmd(String sshCmd) {
		this.sshCmd = sshCmd;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public Timestamp getRuntime() {
		return runtime;
	}
	public void setRuntime(Timestamp runtime) {
		this.runtime = runtime;
	}
	public Timestamp getEndtime() {
		return endtime;
	}
	public void setEndtime(Timestamp endtime) {
		this.endtime = endtime;
	}
	public String getEnable() {
		return enable;
	}
	public void setEnable(String enable) {
		this.enable = enable;
	}
	public String getSchedule() {
		return schedule;
	}
	public void setSchedule(String schedule) {
		this.schedule = schedule;
	}
	public String getWorkflowName() {
		return workflowName;
	}
	public void setWorkflowName(String workflowName) {
		this.workflowName = workflowName;
	}
	public boolean isPaging() {
		return paging;
	}
	public void setPaging(boolean paging) {
		this.paging = paging;
	}
	public Integer getPage() {
		return page;
	}
	public void setPage(Integer page) {
		this.page = page;
	}
	public Integer getRows() {
		return rows;
	}
	public void setRows(Integer rows) {
		this.rows = rows;
	}
	public String getSidx() {
		return sidx;
	}
	public void setSidx(String sidx) {
		this.sidx = sidx;
	}
	public String getSord() {
		return sord;
	}
	public void setSord(String sord) {
		this.sord = sord;
	}
	public Integer getStartRow() {
		return startRow;
	}
	public void setStartRow(Integer startRow) {
		this.startRow = startRow;
	}
	public Integer getEndRow() {
		return endRow;
	}
	public void setEndRow(Integer endRow) {
		this.endRow = endRow;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	@Override
	public String toString() {
		return "Scheduler [id=" + id + ", name=" + name + ", month=" + month + ", week=" + week + ", day=" + day
				+ ", hour=" + hour + ", min=" + min + ", stype=" + stype + ", workflowId=" + workflowId + ", sshIp="
				+ sshIp + ", sshPort=" + sshPort + ", sshId=" + sshId + ", sshPwd=" + sshPwd + ", sshCmd=" + sshCmd
				+ ", state=" + state + ", runtime=" + runtime + ", endtime=" + endtime + ", duration=" + duration
				+ ", enable=" + enable + ", schedule=" + schedule + ", workflowName=" + workflowName + ", paging="
				+ paging + ", page=" + page + ", rows=" + rows + ", sidx=" + sidx + ", sord=" + sord + ", startRow="
				+ startRow + ", endRow=" + endRow + "]";
	}

}