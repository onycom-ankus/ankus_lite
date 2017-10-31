package com.ankus.web.lite.relatedKeyword;

import java.io.Serializable;

/**
 * Assign Domain Object.
 *
 * @author Jaesung Ahn
 * @since 0.1
 */
public class RelatedKeyword implements Serializable {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    private String prdt_strt_dt;
    private String prdt_term_dt;
    private String left_rule;		
    private String right_rule;   
    private Double confidence;
    private Double support;
    private String anal_dt;
    
    private String str_year;
    private String str_term;
    private String item;
    
    /* paging 처리용*/
    private boolean paging = false;
    private Integer page = 1;
    private Integer rows = 20;
    private String sidx;
    private String sord;
    private Integer startRow;
    private Integer endRow;
    
	public String getPrdt_strt_dt() {
		return prdt_strt_dt;
	}
	public void setPrdt_strt_dt(String prdt_strt_dt) {
		this.prdt_strt_dt = prdt_strt_dt;
	}
	public String getPrdt_term_dt() {
		return prdt_term_dt;
	}
	public void setPrdt_term_dt(String prdt_term_dt) {
		this.prdt_term_dt = prdt_term_dt;
	}
	public String getleft_rule() {
		return left_rule;
	}
	public void setleft_rule (String left_rule) {
		this.left_rule = left_rule;
	}
	public String getright_rule() {
		return right_rule;
	}
	public void setright_rule(String right_rule) {
		this.right_rule = right_rule;
	}	
	public Double getconfidence() {
		return confidence;
	}
	public void setconfidence(Double confidence) {
		this.confidence = confidence;
	}
	public Double getSupport() {
		return support;
	}
	public void setSupport(Double support) {
		this.support = support;
	}
	public String getAnal_dt() {
		return anal_dt;
	}
	public void setAnal_dt(String anal_dt) {
		this.anal_dt = anal_dt;
	}
	
	public String getStr_year() {
		return str_year;
	}
	public void setStr_year(String str_year) {
		this.str_year = str_year;
	}
	public String getStr_term() {
		return str_term;
	}
	public void setStr_term(String str_term) {
		this.str_term = str_term;
	}
	public String getItem() {
		return item;
	}
	public void setItem(String item) {
		this.item = item;
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
		result = prime * result + ((prdt_strt_dt == null) ? 0 : prdt_strt_dt.hashCode());
		result = prime * result + ((prdt_term_dt == null) ? 0 : prdt_term_dt.hashCode());
		result = prime * result + ((left_rule == null) ? 0 : left_rule.hashCode());
		result = prime * result + ((right_rule == null) ? 0 : right_rule.hashCode());				
		result = prime * result + ((confidence == null) ? 0 : confidence.hashCode());
		result = prime * result + ((support == null) ? 0 : support.hashCode());
		result = prime * result + ((anal_dt == null) ? 0 : anal_dt.hashCode());		
		result = prime * result + ((str_year == null) ? 0 : str_year.hashCode());
		result = prime * result + ((str_term == null) ? 0 : str_term.hashCode());
		result = prime * result + ((item == null) ? 0 : item.hashCode());
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
		RelatedKeyword other = (RelatedKeyword) obj;
		if (prdt_strt_dt == null) {
			if (other.prdt_strt_dt != null)
				return false;
		} else if (!prdt_strt_dt.equals(other.prdt_strt_dt))
			return false;
		if (prdt_term_dt == null) {
			if (other.prdt_term_dt != null)
				return false;
		} else if (!prdt_term_dt.equals(other.prdt_term_dt))
			return false;
		if (left_rule == null) {
			if (other.left_rule != null)
				return false;
		} else if (!left_rule.equals(other.left_rule))
			return false;
		if (right_rule == null) {
			if (other.right_rule != null)
				return false;
		} else if (!right_rule.equals(other.right_rule))
			return false;		
		if (confidence == null) {
			if (other.confidence != null)
				return false;
		} else if (!confidence.equals(other.confidence))
			return false;
		if (support == null) {
			if (other.support != null)
				return false;
		} else if (!support.equals(other.support))
			return false;
		if (anal_dt == null) {
			if (other.anal_dt != null)
				return false;
		} else if (!anal_dt.equals(other.anal_dt))
			return false;
		if (str_year == null) {
			if (other.str_year != null)
				return false;
		} else if (!str_year.equals(other.str_year))
			return false;
		if (str_term == null) {
			if (other.str_term != null)
				return false;
		} else if (!str_term.equals(other.str_term))
			return false;
		if (item == null) {
			if (other.item != null)
				return false;
		} else if (!item.equals(other.item))
			return false;
		if (endRow == null) {
			if (other.endRow != null)
				return false;
		} else if (!endRow.equals(other.endRow))
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
		return true;
	}
	@Override
	public String toString() {
		return  "relatedKeyword [prdt_strt_dt=" + prdt_strt_dt + ", prdt_term_dt=" + prdt_term_dt + ", left_rule=" + left_rule + ", right_rule=" + right_rule 
				+ ", confidence=" + confidence + ", support=" + support + ", anal_dt=" + anal_dt + ", str_year=" + str_year + ", str_term=" + str_term + ", item=" + item
				+ ", paging=" + paging + ", page=" + page + ", rows=" + rows + ", sidx=" + sidx + ", sord=" + sord + ", startRow=" + startRow + ", endRow=" + endRow + "]";
	}
}