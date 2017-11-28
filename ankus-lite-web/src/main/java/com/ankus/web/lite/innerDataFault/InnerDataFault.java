package com.ankus.web.lite.innerDataFault;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Assign Domain Object.
 *
 * @author 
 * @since 0.1
 */
public class InnerDataFault implements Serializable {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    private Integer seq;
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
    private Integer dpsl_cnt;
    
    private String ocrc;
    private String bad_item;
    private String bad_kwrd;
    private String bad_ctnt;
    
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
    
    public Integer getSeq() {
		return seq;
	}
	public void setSeq(Integer seq) {
		this.seq = seq;
	}	
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
	public Integer getDpsl_cnt() {
		return dpsl_cnt;
	}
	public void setDpsl_cnt(Integer dpsl_cnt) {
		this.dpsl_cnt = dpsl_cnt;
	}	
	
	public String getOcrc() {
		return ocrc;
	}
	public void setOcrc(String ocrc) {
		this.ocrc = ocrc;
	}	
	public String getBad_item() {
		return bad_item;
	}
	public void setBad_item(String bad_item) {
		this.bad_item = bad_item;
	}	
	public String getBad_kwrd() {
		return bad_kwrd;
	}
	public void setBad_kwrd(String bad_kwrd) {
		this.bad_kwrd = bad_kwrd;
	}	
	public String getBad_ctnt() {
		return bad_ctnt;
	}
	public void setBad_ctnt(String bad_ctnt) {
		this.bad_ctnt = bad_ctnt;
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
		return "InnerDataDemand [seq=" + seq + ", date=" + date + ", prdt_cd=" + prdt_cd + ", prdt_nm=" + prdt_nm + ", imp_prdt_stat=" + imp_prdt_stat + ", brand=" + brand
				+ ", item=" + item + ", std=" + std + ", pack=" + pack + ", ddc=" + ddc + ", sale_type=" + sale_type
				+ ", dpsl_cnt=" + dpsl_cnt + ", ocrc=" + ocrc + ", bad_item=" + bad_item + ", bad_kwrd=" + bad_kwrd + ", bad_ctnt=" + bad_ctnt								
				+ ", paging=" + paging + ", page=" + page + ", rows=" + rows + ", sidx=" + sidx
				+ ", sord=" + sord + ", startRow=" + startRow + ", endRow=" + endRow + "]";
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((seq == null) ? 0 : seq.hashCode());
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
		result = prime * result + ((dpsl_cnt == null) ? 0 : dpsl_cnt.hashCode()); 
		result = prime * result + ((ocrc == null) ? 0 : ocrc.hashCode()); 
		result = prime * result + ((bad_item == null) ? 0 : bad_item.hashCode()); 
		result = prime * result + ((bad_kwrd == null) ? 0 : bad_kwrd.hashCode()); 
		result = prime * result + ((bad_ctnt == null) ? 0 : bad_ctnt.hashCode()); 
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
		InnerDataFault other = (InnerDataFault) obj;
		if (seq == null) {
			if (other.seq != null)
				return false;
		} else if (!seq.equals(other.seq))
			return false;
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
		if (dpsl_cnt == null) {
			if (other.dpsl_cnt != null)
				return false;
		} else if (!dpsl_cnt.equals(other.dpsl_cnt))
			return false;
		if (ocrc == null) {
			if (other.ocrc != null)
				return false;
		} else if (!ocrc.equals(other.ocrc))
			return false;
		if (bad_item == null) {
			if (other.bad_item != null)
				return false;
		} else if (!bad_item.equals(other.bad_item))
			return false;
		if (bad_kwrd == null) {
			if (other.bad_kwrd != null)
				return false;
		} else if (!bad_kwrd.equals(other.bad_kwrd))
			return false;
		if (bad_ctnt == null) {
			if (other.bad_ctnt != null)
				return false;
		} else if (!bad_ctnt.equals(other.bad_ctnt))
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