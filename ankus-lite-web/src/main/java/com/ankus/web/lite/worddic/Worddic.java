package com.ankus.web.lite.worddic;

import java.io.Serializable;

/**
 * Worddic Domain Object.
 *
 * @author Jaesung Ahn
 * @since 0.1
 */
public class Worddic implements Serializable {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    private Integer wid;
    private String word;
    private String wtype;
       
    
    /* paging 처리용*/
    private boolean paging = false;
    private Integer page = 1;
    private Integer rows = 20;
    private String sidx;
    private String sord;
    private Integer startRow;
    private Integer endRow;
    
	public Integer getWid() {
		return wid;
	}
	public void setWid(Integer wid) {
		this.wid = wid;
	}
	public String getWord() {
		return word;
	}
	public void setWord(String word) {
		this.word = word;
	}
	public String getWtype() {
		return wtype;
	}
	public void setWtype(String wtype) {
		this.wtype = wtype;
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
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((wid == null) ? 0 : wid.hashCode());
		result = prime * result + ((word == null) ? 0 : word.hashCode());
		result = prime * result + ((wtype == null) ? 0 : wtype.hashCode());
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
		Worddic other = (Worddic) obj;		
		if (wid == null) {
			if (other.wid != null)
				return false;
		} else if (!wid.equals(other.wid))
			return false;
		if (word == null) {
			if (other.word != null)
				return false;
		} else if (!word.equals(other.word))
			return false;
		if (wtype == null) {
			if (other.wtype != null)
				return false;
		} else if (!wtype.equals(other.wtype))
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
	@Override
	public String toString() {
		return "Worddic [wid=" + wid + ", word=" + word + ", wtype=" + wtype 
				+ ", paging=" + paging + ", page=" + page + ", rows=" + rows + ", sidx=" + sidx
				+ ", sord=" + sord + ", startRow=" + startRow + ", endRow=" + endRow + "]";
	}
	   
    
}