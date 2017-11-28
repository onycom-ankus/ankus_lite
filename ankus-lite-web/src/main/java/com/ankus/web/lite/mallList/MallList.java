package com.ankus.web.lite.mallList;

import java.io.Serializable;

/**
 * Assign Domain Object.
 *
 * @author Jaesung Ahn
 * @since 0.1
 */
public class MallList implements Serializable {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    private String goods_no;		
    private String goods_url;		
    private String goods_nm;		
    private String shopng_knd;		
    private String brand;			
    private String item;	
    private String goods_review;	
    private String recommand;
    private String delivery;		
    
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
    

	public String getGoods_no() {
		return goods_no;
	}
	public void setGoods_no(String goods_no) {
		this.goods_no = goods_no;
	}
	public String getGoods_url() {
		return goods_url;
	}
	public void setGoods_url(String goods_url) {
		this.goods_url = goods_url;
	}
	public String getGoods_nm() {
		return goods_nm;
	}
	public void setGoods_nm(String goods_nm) {
		this.goods_nm = goods_nm;
	}
	public String getShopng_knd() {
		return shopng_knd;
	}
	public void setShopng_knd(String shopng_knd) {
		this.shopng_knd = shopng_knd;
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
	public String getGoods_review() {
		return goods_review;
	}
	public void setGoods_review(String goods_review) {
		this.goods_review = goods_review;
	}
	public String getRecommand() {
		return recommand;
	}
	public void setRecommand(String recommand) {
		this.recommand = recommand;
	}	
	public String getDelivery() {
		return delivery;
	}
	public void setDelivery(String delivery) {
		this.delivery = delivery;
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

		result = prime * result + ((goods_no == null) ? 0 : goods_no.hashCode());
		result = prime * result + ((goods_url == null) ? 0 : goods_url.hashCode());
		result = prime * result + ((goods_nm == null) ? 0 : goods_nm.hashCode());
		result = prime * result + ((shopng_knd == null) ? 0 : shopng_knd.hashCode());
		result = prime * result + ((brand == null) ? 0 : brand.hashCode());
		result = prime * result + ((item == null) ? 0 : item.hashCode());
		result = prime * result + ((goods_review == null) ? 0 : goods_review.hashCode());
		result = prime * result + ((recommand == null) ? 0 : recommand.hashCode());
		result = prime * result + ((delivery == null) ? 0 : delivery.hashCode());
		result = prime * result + ((to == null) ? 0 : to.hashCode());
		result = prime * result + ((from == null) ? 0 : from.hashCode());
		result = prime * result + ((endRow == null) ? 0 : endRow.hashCode());		
		result = prime * result + ((page == null) ? 0 : page.hashCode());
		result = prime * result + (paging ? 1231 : 1237);
		result = prime * result + ((rows == null) ? 0 : rows.hashCode());
		result = prime * result + ((sidx == null) ? 0 : sidx.hashCode());
		result = prime * result + ((sord == null) ? 0 : sord.hashCode());
		result = prime * result + ((startRow == null) ? 0 : startRow.hashCode());
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
		MallList other = (MallList) obj;
		if (goods_no == null) {
			if (other.goods_no != null)
				return false;
		} else if (!goods_no.equals(other.goods_no))
			return false;
		if (goods_url == null) {
			if (other.goods_url != null)
				return false;
		} else if (!goods_url.equals(other.goods_url))
			return false;
		if (goods_nm == null) {
			if (other.goods_nm != null)
				return false;
		} else if (!goods_nm.equals(other.goods_nm))
			return false;
		if (shopng_knd == null) {
			if (other.shopng_knd != null)
				return false;
		} else if (!shopng_knd.equals(other.shopng_knd))
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
		if (goods_review == null) {
			if (other.goods_review != null)
				return false;
		} else if (!goods_review.equals(other.goods_review))
			return false;
		if (recommand == null) {
			if (other.recommand != null)
				return false;
		} else if (!recommand.equals(other.recommand))
			return false;
		if (delivery == null) {
			if (other.delivery != null)
				return false;
		} else if (!delivery.equals(other.delivery))
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
		return "MallList [goods_no=" + goods_no + ", goods_url=" + goods_url + ", goods_nm=" + goods_nm + 
				", shopng_knd=" + shopng_knd + ", brand=" + brand + ", item=" + item + ", recommand=" + recommand +
				", goods_review=" + goods_review + ", delivery=" + delivery +", from=" + from + ", to=" + to + ", paging=" + paging + ", page=" + page + 
				", rows=" + rows + ", sidx=" + sidx + ", sord=" + sord + ", startRow=" + startRow + ", endRow=" + endRow + "]";
	}
    
    


}