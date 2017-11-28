package com.ankus.web.lite.innerDataDemand;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Assign Domain Object.
 *
 * @author 
 * @since 0.1
 */
public class InnerDataDemand implements Serializable {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    private String date;
    private String prdt_cd;
    private String prdt_nm;    
    private String imp_prdt_stat;
    private String brand;
    private String item;
    private String std;
    private String pack;
    private String ddc;
    private String sale_type;
    private Integer sale_cnt;
    private Integer supply_cnt;
    private Integer sale_on_mkt_cnt;
    private Integer sale_on_home_cnt;
    private Integer sale_on_bmkt_cnt;
    private Integer sale_on_dpt_cnt;
    private Integer sale_on_mall_cnt;
    private Integer sale_on_etc_cnt;
    private Integer sale_off_mkt_cnt;
    private Integer sale_off_24mkt_cnt;
    private Integer sale_off_rmkt_cnt;
    private Integer sale_off_md_cnt;
    private Integer sale_off_bmkt_cnt;
    private Integer sale_off_rt_cnt;
    private Integer sale_off_dpt_cnt;
    private Integer sale_off_etc_cnt;
    private Integer sale_etc_emp_cnt;
    private Integer sale_etc_agcy_cnt;
    private Integer sale_etc_deal_cnt;
    private Integer sale_etc_imp_cnt;
    
    private String from;
    private String to;
    
    /* paging 처리용*/
    private boolean paging = false;
    private Integer page = 1;
    private Integer rows = 20;
    private String sidx;
    private String sord;
    private Integer startRow;
    private Integer endRow;
    
    public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getPrdt_nm() {
		return prdt_nm;
	}
	public void setPrdt_nm(String prdt_nm) {
		this.prdt_nm = prdt_nm;
	}	
	public String getPrdt_cd() {
		return prdt_cd;
	}
	public void setPrdt_cd(String prdt_cd) {
		this.prdt_cd = prdt_cd;
	}	
	public String getImp_prdt_stat() {
		return imp_prdt_stat;
	}
	public void setImp_prdt_stat(String imp_prdt_stat) {
		this.imp_prdt_stat = imp_prdt_stat;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public String getItem() {
		return item;
	}
	public void setItem(String item) {
		this.item = item;
	}
	public String getStd() {
		return std;
	}
	public void setStd(String std) {
		this.std = std;
	}
	public String getPack() {
		return pack;
	}
	public void setPack(String pack) {
		this.pack = pack;
	}
	public String getDdc() {
		return ddc;
	}
	public void setDdc(String ddc) {
		this.ddc = ddc;
	}
	public String getSale_type() {
		return sale_type;
	}
	public void setSale_type(String sale_type) {
		this.sale_type = sale_type;
	}	
	public Integer getSale_cnt() {
		return sale_cnt;
	}
	public void setSale_cnt(Integer sale_cnt) {
		this.sale_cnt = sale_cnt;
	}	
	public Integer getSupply_cnt() {
		return supply_cnt;
	}
	public void setSupply_cnt(Integer supply_cnt) {
		this.supply_cnt = supply_cnt;
	}	
	public Integer getSale_on_mkt_cnt() {
		return sale_on_mkt_cnt;
	}
	public void setSale_on_mkt_cnt(Integer sale_on_mkt_cnt) {
		this.sale_on_mkt_cnt = sale_on_mkt_cnt;
	}	
	public Integer getSale_on_home_cnt() {
		return sale_on_home_cnt;
	}
	public void setSale_on_home_cnt(Integer sale_on_home_cnt) {
		this.sale_on_home_cnt = sale_on_home_cnt;
	}	
	public Integer getSale_on_bmkt_cnt() {
		return sale_on_bmkt_cnt;
	}
	public void setSale_on_bmkt_cnt(Integer sale_on_bmkt_cnt) {
		this.sale_on_bmkt_cnt = sale_on_bmkt_cnt;
	}	
	public Integer getSale_on_dpt_cnt() {
		return sale_on_dpt_cnt;
	}
	public void setSale_on_dpt_cnt(Integer sale_on_dpt_cnt) {
		this.sale_on_dpt_cnt = sale_on_dpt_cnt;
	}	
	public Integer getSale_on_mall_cnt() {
		return sale_on_mall_cnt;
	}
	public void setSale_on_mall_cnt(Integer sale_on_mall_cnt) {
		this.sale_on_mall_cnt = sale_on_mall_cnt;
	}	
	public Integer getSale_on_etc_cnt() {
		return sale_on_etc_cnt;
	}
	public void setSale_on_etc_cnt(Integer sale_on_etc_cnt) {
		this.sale_on_etc_cnt = sale_on_etc_cnt;
	}	
	public Integer getSale_off_mkt_cnt() {
		return sale_off_mkt_cnt;
	}
	public void setSale_off_mkt_cnt(Integer sale_off_mkt_cnt) {
		this.sale_off_mkt_cnt = sale_off_mkt_cnt;
	}	
	public Integer getSale_off_24mkt_cnt() {
		return sale_off_24mkt_cnt;
	}
	public void setSale_off_24mkt_cnt(Integer sale_off_24mkt_cnt) {
		this.sale_off_24mkt_cnt = sale_off_24mkt_cnt;
	}	
	public Integer getSale_off_rmkt_cnt() {
		return sale_off_rmkt_cnt;
	}
	public void setSale_off_rmkt_cnt(Integer sale_off_rmkt_cnt) {
		this.sale_off_rmkt_cnt = sale_off_rmkt_cnt;
	}	
	public Integer getSale_off_md_cnt() {
		return sale_off_md_cnt;
	}
	public void setSale_off_md_cnt(Integer sale_off_md_cnt) {
		this.sale_off_md_cnt = sale_off_md_cnt;
	}	
	public Integer getSale_off_bmkt_cnt() {
		return sale_off_bmkt_cnt;
	}
	public void setSale_off_bmkt_cnt(Integer sale_off_bmkt_cnt) {
		this.sale_off_bmkt_cnt = sale_off_bmkt_cnt;
	}	
	public Integer getSale_off_rt_cnt() {
		return sale_off_rt_cnt;
	}
	public void setSale_off_rt_cnt(Integer sale_off_rt_cnt) {
		this.sale_off_rt_cnt = sale_off_rt_cnt;
	}	
	public Integer getSale_off_dpt_cnt() {
		return sale_off_dpt_cnt;
	}
	public void setSale_off_dpt_cnt(Integer sale_off_dpt_cnt) {
		this.sale_off_dpt_cnt = sale_off_dpt_cnt;
	}	
	public Integer getSale_off_etc_cnt() {
		return sale_off_etc_cnt;
	}
	public void setSale_off_etc_cnt(Integer sale_off_etc_cnt) {
		this.sale_off_etc_cnt = sale_off_etc_cnt;
	}	
	public Integer getSale_etc_emp_cnt() {
		return sale_etc_emp_cnt;
	}
	public void setSale_etc_emp_cnt(Integer sale_etc_emp_cnt) {
		this.sale_etc_emp_cnt = sale_etc_emp_cnt;
	}	
	public Integer getSale_etc_agcy_cnt() {
		return sale_etc_agcy_cnt;
	}
	public void setSale_etc_agcy_cnt(Integer sale_etc_agcy_cnt) {
		this.sale_etc_agcy_cnt = sale_etc_agcy_cnt;
	}	
	public Integer getSale_etc_deal_cnt() {
		return sale_etc_deal_cnt;
	}
	public void setSale_etc_deal_cnt(Integer sale_etc_deal_cnt) {
		this.sale_etc_deal_cnt = sale_etc_deal_cnt;
	}	
	public Integer getSale_etc_imp_cnt() {
		return sale_etc_imp_cnt;
	}
	public void setSale_etc_imp_cnt(Integer sale_etc_imp_cnt) {
		this.sale_etc_imp_cnt = sale_etc_imp_cnt;
	}
	public String getFrom() {
		return from;
	}
	public void setFrom(String from) {
		this.from = from;
	}
	public String getTo() {
		return to;
	}
	public void setTo(String to) {
		this.to = to;
	}
	
	public static long getSerialversionuid() {
		return serialVersionUID;
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
	public String toString() {
		return "InnerDataDemand [date=" + date + ", prdt_cd=" + prdt_cd + ", prdt_nm=" + prdt_nm + ", imp_prdt_stat=" + imp_prdt_stat + ", brand=" + brand
				+ ", item=" + item + ", std=" + std + ", pack=" + pack + ", ddc=" + ddc + ", sale_type=" + sale_type
				+ ", sale_cnt=" + sale_cnt + ", supply_cnt=" + supply_cnt + ", sale_on_mkt_cnt=" + sale_on_mkt_cnt + ", sale_on_home_cnt=" + sale_on_home_cnt + ", sale_on_bmkt_cnt=" + sale_on_bmkt_cnt
				+ ", sale_on_dpt_cnt=" + sale_on_dpt_cnt + ", sale_on_mall_cnt=" + sale_on_mall_cnt + ", sale_on_etc_cnt=" + sale_on_etc_cnt + ", sale_off_mkt_cnt=" + sale_off_mkt_cnt + ", sale_off_24mkt_cnt=" + sale_off_24mkt_cnt
				+ ", sale_off_rmkt_cnt=" + sale_off_rmkt_cnt + ", sale_off_md_cnt=" + sale_off_md_cnt + ", sale_off_bmkt_cnt=" + sale_off_bmkt_cnt + ", sale_off_rt_cnt=" + sale_off_rt_cnt + ", sale_off_dpt_cnt=" + sale_off_dpt_cnt
				+ ", sale_off_etc_cnt=" + sale_off_etc_cnt + ", sale_etc_emp_cnt=" + sale_etc_emp_cnt + ", sale_etc_agcy_cnt=" + sale_etc_agcy_cnt + ", sale_etc_deal_cnt=" + sale_etc_deal_cnt + ", sale_etc_imp_cnt=" + sale_etc_imp_cnt				
				+ ", paging=" + paging + ", page=" + page + ", rows=" + rows + ", sidx=" + sidx
				+ ", sord=" + sord + ", startRow=" + startRow + ", endRow=" + endRow + "]";
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((date == null) ? 0 : date.hashCode()); 
		result = prime * result + ((prdt_cd == null) ? 0 : prdt_cd.hashCode()); 
		result = prime * result + ((prdt_nm == null) ? 0 : prdt_nm.hashCode()); 
		result = prime * result + ((imp_prdt_stat == null) ? 0 : imp_prdt_stat.hashCode()); 
		result = prime * result + ((brand == null) ? 0 : brand.hashCode()); 
		result = prime * result + ((item == null) ? 0 : item.hashCode()); 
		result = prime * result + ((std == null) ? 0 : std.hashCode()); 
		result = prime * result + ((pack == null) ? 0 : pack.hashCode()); 
		result = prime * result + ((ddc == null) ? 0 : ddc.hashCode()); 
		result = prime * result + ((sale_type == null) ? 0 : sale_type.hashCode()); 
		result = prime * result + ((sale_cnt == null) ? 0 : sale_cnt.hashCode()); 
		result = prime * result + ((supply_cnt == null) ? 0 : supply_cnt.hashCode()); 
		result = prime * result + ((sale_on_mkt_cnt == null) ? 0 : sale_on_mkt_cnt.hashCode()); 
		result = prime * result + ((sale_on_home_cnt == null) ? 0 : sale_on_home_cnt.hashCode()); 
		result = prime * result + ((sale_on_bmkt_cnt == null) ? 0 : sale_on_bmkt_cnt.hashCode()); 
		result = prime * result + ((sale_on_dpt_cnt == null) ? 0 : sale_on_dpt_cnt.hashCode()); 
		result = prime * result + ((sale_on_mall_cnt == null) ? 0 : sale_on_mall_cnt.hashCode()); 
		result = prime * result + ((sale_on_etc_cnt == null) ? 0 : sale_on_etc_cnt.hashCode()); 
		result = prime * result + ((sale_off_mkt_cnt == null) ? 0 : sale_off_mkt_cnt.hashCode()); 
		result = prime * result + ((sale_off_24mkt_cnt == null) ? 0 : sale_off_24mkt_cnt.hashCode()); 
		result = prime * result + ((sale_off_rmkt_cnt == null) ? 0 : sale_off_rmkt_cnt.hashCode()); 
		result = prime * result + ((sale_off_md_cnt == null) ? 0 : sale_off_md_cnt.hashCode()); 
		result = prime * result + ((sale_off_bmkt_cnt == null) ? 0 : sale_off_bmkt_cnt.hashCode()); 
		result = prime * result + ((sale_off_rt_cnt == null) ? 0 : sale_off_rt_cnt.hashCode()); 
		result = prime * result + ((sale_off_dpt_cnt == null) ? 0 : sale_off_dpt_cnt.hashCode()); 
		result = prime * result + ((sale_off_etc_cnt == null) ? 0 : sale_off_etc_cnt.hashCode()); 
		result = prime * result + ((sale_etc_emp_cnt == null) ? 0 : sale_etc_emp_cnt.hashCode()); 
		result = prime * result + ((sale_etc_agcy_cnt == null) ? 0 : sale_etc_agcy_cnt.hashCode()); 
		result = prime * result + ((sale_etc_deal_cnt == null) ? 0 : sale_etc_deal_cnt.hashCode()); 
		result = prime * result + ((sale_etc_imp_cnt == null) ? 0 : sale_etc_imp_cnt.hashCode()); 
		result = prime * result + ((to == null) ? 0 : to.hashCode());
		result = prime * result + ((from == null) ? 0 : from.hashCode());
		
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
		InnerDataDemand other = (InnerDataDemand) obj;
		if (date == null) {
			if (other.date != null)
				return false;
		} else if (!date.equals(other.date))
			return false;
		if (prdt_cd == null) {
			if (other.prdt_cd != null)
				return false;
		} else if (!prdt_cd.equals(other.prdt_cd))
			return false;
		if (prdt_nm == null) {
			if (other.prdt_nm != null)
				return false;
		} else if (!prdt_nm.equals(other.prdt_nm))
			return false;
		if (prdt_nm == null) {
			if (other.prdt_nm != null)
				return false;
		} else if (!prdt_nm.equals(other.prdt_nm))
			return false;
		if (brand == null) {
			if (other.brand != null)
				return false;
		} else if (!brand.equals(other.brand))
			return false;	
		if (item == null) {
			if (other.item != null)
				return false;
		} else if (!item.equals(other.item))
			return false;
		if (std == null) {
			if (other.std != null)
				return false;
		} else if (!std.equals(other.std))
			return false;
		if (pack == null) {
			if (other.pack != null)
				return false;
		} else if (!pack.equals(other.pack))
			return false;
		if (ddc == null) {
			if (other.ddc != null)
				return false;
		} else if (!ddc.equals(other.ddc))
			return false;
		if (sale_type == null) {
			if (other.sale_type != null)
				return false;
		} else if (!sale_type.equals(other.sale_type))
			return false;
		if (sale_cnt == null) {
			if (other.sale_cnt != null)
				return false;
		} else if (!sale_cnt.equals(other.sale_cnt))
			return false;
		if (supply_cnt == null) {
			if (other.supply_cnt != null)
				return false;
		} else if (!supply_cnt.equals(other.supply_cnt))
			return false;
		if (sale_on_mkt_cnt == null) {
			if (other.sale_on_mkt_cnt != null)
				return false;
		} else if (!sale_on_mkt_cnt.equals(other.sale_on_mkt_cnt))
			return false;
		if (sale_on_home_cnt == null) {
			if (other.sale_on_home_cnt != null)
				return false;
		} else if (!sale_on_home_cnt.equals(other.sale_on_home_cnt))
			return false;
		if (sale_on_bmkt_cnt == null) {
			if (other.sale_on_bmkt_cnt != null)
				return false;
		} else if (!sale_on_bmkt_cnt.equals(other.sale_on_bmkt_cnt))
			return false;			
		if (sale_on_dpt_cnt == null) {
			if (other.sale_on_dpt_cnt != null)
				return false;
		} else if (!sale_on_dpt_cnt.equals(other.sale_on_dpt_cnt))
			return false;
		if (sale_on_mall_cnt == null) {
			if (other.sale_on_mall_cnt != null)
				return false;
		} else if (!sale_on_mall_cnt.equals(other.sale_on_mall_cnt))
			return false;
		if (sale_on_etc_cnt == null) {
			if (other.sale_on_etc_cnt != null)
				return false;
		} else if (!sale_on_etc_cnt.equals(other.sale_on_etc_cnt))
			return false;
		if (sale_off_mkt_cnt == null) {
			if (other.sale_off_mkt_cnt != null)
				return false;
		} else if (!sale_off_mkt_cnt.equals(other.sale_off_mkt_cnt))
			return false;
		if (sale_off_24mkt_cnt == null) {
			if (other.sale_off_24mkt_cnt != null)
				return false;
		} else if (!sale_off_24mkt_cnt.equals(other.sale_off_24mkt_cnt))
			return false;
		if (sale_off_rmkt_cnt == null) {
			if (other.sale_off_rmkt_cnt != null)
				return false;
		} else if (!sale_off_rmkt_cnt.equals(other.sale_off_rmkt_cnt))
			return false;
		if (sale_off_md_cnt == null) {
			if (other.sale_off_md_cnt != null)
				return false;
		} else if (!sale_off_md_cnt.equals(other.sale_off_md_cnt))
			return false;
		if (sale_off_bmkt_cnt == null) {
			if (other.sale_off_bmkt_cnt != null)
				return false;
		} else if (!sale_off_bmkt_cnt.equals(other.sale_off_bmkt_cnt))
			return false;
		if (sale_off_rt_cnt == null) {
			if (other.sale_off_rt_cnt != null)
				return false;
		} else if (!sale_off_rt_cnt.equals(other.sale_off_rt_cnt))
			return false;
		if (sale_off_dpt_cnt == null) {
			if (other.sale_off_dpt_cnt != null)
				return false;
		} else if (!sale_off_dpt_cnt.equals(other.sale_off_dpt_cnt))
			return false;	
		if (sale_off_etc_cnt == null) {
			if (other.sale_off_etc_cnt != null)
				return false;
		} else if (!sale_off_etc_cnt.equals(other.sale_off_etc_cnt))
			return false;
		if (sale_etc_emp_cnt == null) {
			if (other.sale_etc_emp_cnt != null)
				return false;
		} else if (!sale_etc_emp_cnt.equals(other.sale_etc_emp_cnt))
			return false;
		if (sale_etc_agcy_cnt == null) {
			if (other.sale_etc_agcy_cnt != null)
				return false;
		} else if (!sale_etc_agcy_cnt.equals(other.sale_etc_agcy_cnt))
			return false;
		if (sale_etc_deal_cnt == null) {
			if (other.sale_etc_deal_cnt != null)
				return false;
		} else if (!sale_etc_deal_cnt.equals(other.sale_etc_deal_cnt))
			return false;
		if (sale_etc_imp_cnt == null) {
			if (other.sale_etc_imp_cnt != null)
				return false;
		} else if (!sale_etc_imp_cnt.equals(other.sale_etc_imp_cnt))
			return false;
		if (to == null) {
			if (other.to != null)
				return false;
		} else if (!to.equals(other.to))
			return false;
		if (from == null) {
			if (other.from != null)
				return false;
		} else if (!from.equals(other.from))
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