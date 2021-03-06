package com.ankus.web.lite.demandList;

import java.io.Serializable;

/**
 * Assign Domain Object.
 *
 * @author Jaesung Ahn
 * @since 0.1
 */
public class DemandList implements Serializable {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    private String prdt_strt_dt;
    private String prdt_term_dt;
    private String item_cd;		
    private String item_nm;		
    private Double prdt_est;
    
    private String str_year;
    private String str_term;
    private String item;
    
    private String prdt_dt;
    private String train_strt_dt;
    private String train_term_dt;
    private Integer train_num_data;
    private Integer prdt_rmse;
    private Integer prdt_rrse;
    
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
	public String getItem_cd() {
		return item_cd;
	}
	public void setItem_cd (String item_cd) {
		this.item_cd = item_cd;
	}
	public String getItem_nm() {
		return item_nm;
	}
	public void setItem_nm(String item_nm) {
		this.item_nm = item_nm;
	}
	public Double getPrdt_est() {
		return prdt_est;
	}
	public void setPrdt_est(Double prdt_est) {
		this.prdt_est = prdt_est;
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
	
	public String getPrdt_dt() {
		return prdt_dt;
	}
	public void setPrdt_dt(String prdt_dt) {
		this.prdt_dt = prdt_dt;
	}
	public String getTrain_strt_dt() {
		return train_strt_dt;
	}
	public void setTrain_strt_dt(String train_strt_dt) {
		this.train_strt_dt = train_strt_dt;
	}
	public String getTrain_term_dt() {
		return train_term_dt;
	}
	public void setTrain_term_dt(String train_term_dt) {
		this.train_term_dt = train_term_dt;
	}
	public Integer getTrain_num_data() {
		return train_num_data;
	}
	public void setTrain_num_data(Integer train_num_data) {
		this.train_num_data = train_num_data;
	}
	public Integer getPrdt_rmse() {
		return prdt_rmse;
	}
	public void setPrdt_rmse(Integer prdt_rmse) {
		this.prdt_rmse = prdt_rmse;
	}
	public Integer getPrdt_rrse() {
		return prdt_rrse;
	}
	public void setPrdt_rrse(Integer prdt_rrse) {
		this.prdt_rrse = prdt_rrse;
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
		result = prime * result + ((item_cd == null) ? 0 : item_cd.hashCode());
		result = prime * result + ((item_nm == null) ? 0 : item_nm.hashCode());
		result = prime * result + ((prdt_est == null) ? 0 : prdt_est.hashCode());
		result = prime * result + ((str_year == null) ? 0 : str_year.hashCode());
		result = prime * result + ((str_term == null) ? 0 : str_term.hashCode());
		result = prime * result + ((prdt_dt == null) ? 0 : prdt_dt.hashCode());
		result = prime * result + ((train_strt_dt == null) ? 0 : train_strt_dt.hashCode());
		result = prime * result + ((train_term_dt == null) ? 0 : train_term_dt.hashCode());
		result = prime * result + ((train_num_data == null) ? 0 : train_num_data.hashCode());
		result = prime * result + ((prdt_rmse == null) ? 0 : prdt_rmse.hashCode());
		result = prime * result + ((prdt_rrse == null) ? 0 : prdt_rrse.hashCode());
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
		DemandList other = (DemandList) obj;
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
		if (item_cd == null) {
			if (other.item_cd != null)
				return false;
		} else if (!item_cd.equals(other.item_cd))
			return false;
		if (item_nm == null) {
			if (other.item_nm != null)
				return false;
		} else if (!item_nm.equals(other.item_nm))
			return false;
		if (prdt_est == null) {
			if (other.prdt_est != null)
				return false;
		} else if (!prdt_est.equals(other.prdt_est))
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
		
		if (prdt_dt == null) {
			if (other.prdt_dt != null)
				return false;
		} else if (!prdt_dt.equals(other.prdt_dt))
			return false;
		if (train_strt_dt == null) {
			if (other.train_strt_dt != null)
				return false;
		} else if (!train_strt_dt.equals(other.train_strt_dt))
			return false;
		if (train_term_dt == null) {
			if (other.train_term_dt != null)
				return false;
		} else if (!train_term_dt.equals(other.train_term_dt))
			return false;
		if (train_num_data == null) {
			if (other.train_num_data != null)
				return false;
		} else if (!train_num_data.equals(other.train_num_data))
			return false;
		if (prdt_rmse == null) {
			if (other.prdt_rmse != null)
				return false;
		} else if (!prdt_rmse.equals(other.prdt_rmse))
			return false;
		if (prdt_rrse == null) {
			if (other.prdt_rrse != null)
				return false;
		} else if (!prdt_rrse.equals(other.prdt_rrse))
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
		return ""
				+ "DemandList [prdt_strt_dt=" + prdt_strt_dt + ", prdt_term_dt=" + prdt_term_dt + ", item_cd=" + item_cd + ", item_nm=" + item_nm 
				+ ", prdt_est=" + prdt_est 	+ ", str_year=" + str_year + ", str_term=" + str_term + ", item=" + item + ", prdt_dt=" + prdt_dt
				+ ", train_strt_dt=" + train_strt_dt + ", train_term_dt=" + train_term_dt + ", train_num_data=" + train_num_data + ", prdt_rmse=" + prdt_rmse + ", prdt_rrse=" + prdt_rrse
				+ ", paging=" + paging + ", page=" + page + ", rows=" + rows + ", sidx=" + sidx + ", sord=" + sord + ", startRow=" + startRow + ", endRow=" + endRow + "]";
	}
}