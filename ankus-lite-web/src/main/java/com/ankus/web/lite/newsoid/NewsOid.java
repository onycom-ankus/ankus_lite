package com.ankus.web.lite.newsoid;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Assign Domain Object.
 *
 * @author 
 * @since 0.1
 */
public class NewsOid implements Serializable {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    private String nsite;
    private String id;
    private String enable;    
    
    /* paging 처리용*/
    private boolean paging = false;
    private Integer page = 1;
    private Integer rows = 20;
    private String sidx;
    private String sord;
    
    public String getNsite() {
		return nsite;
	}
	public void setNsite(String nsite) {
		this.nsite = nsite;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getEnable() {
		return enable;
	}
	public void setEnable(String enable) {
		this.enable = enable;
	}
	
	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	private Integer startRow;
    private Integer endRow;
    

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
	@Override
	public String toString() {
		return "NewsOid [nsite=" + nsite + ", id=" + id + ", enable=" + enable 
				+ ", paging=" + paging + ", page=" + page + ", rows=" + rows + ", sidx=" + sidx
				+ ", sord=" + sord + ", startRow=" + startRow + ", endRow=" + endRow + "]";
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((nsite == null) ? 0 : nsite.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((enable == null) ? 0 : enable.hashCode());		
		result = prime * result + ((page == null) ? 0 : page.hashCode());
		result = prime * result + (paging ? 1231 : 1237);
		result = prime * result + ((rows == null) ? 0 : rows.hashCode());
		result = prime * result + ((sidx == null) ? 0 : sidx.hashCode());
		result = prime * result + ((sord == null) ? 0 : sord.hashCode());
		result = prime * result + ((startRow == null) ? 0 : startRow.hashCode());
		result = prime * result + ((endRow == null) ? 0 : endRow.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		NewsOid other = (NewsOid) obj;
		if (nsite == null) {
			if (other.nsite != null)
				return false;
		} else if (!nsite.equals(other.nsite))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (enable == null) {
			if (other.enable != null)
				return false;
		} else if (!enable.equals(other.enable))
			return false;		
		if (page == null) {
			if (other.page != null)
				return false;
		} else if (!page.equals(other.page))
			return false;
		if (paging != other.paging)
			return false;
		if (rows == null) {
			if (other.rows != null)
				return false;
		} else if (!rows.equals(other.rows))
			return false;
		if (sidx == null) {
			if (other.sidx != null)
				return false;
		} else if (!sidx.equals(other.sidx))
			return false;
		if (sord == null) {
			if (other.sord != null)
				return false;
		} else if (!sord.equals(other.sord))
			return false;
		if (startRow == null) {
			if (other.startRow != null)
				return false;
		} else if (!startRow.equals(other.startRow))
			return false;
		if (endRow == null) {
			if (other.endRow != null)
				return false;
		} else if (!endRow.equals(other.endRow))
			return false;
		return true;
	}
	
	
    


}