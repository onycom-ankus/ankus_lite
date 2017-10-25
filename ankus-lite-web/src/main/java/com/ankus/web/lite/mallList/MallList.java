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

    private String mng_no;			//관리_번호(mstr)
    private String kwrd;			//식품(mstr)
    private String goods_no;		//상품_번호(dtls)
    private String goods_url;		//상품URL(dtls)
    private String goods_nm;		//상품명(dtls)
    private String shopng_knd;		//쇼핑구분(dtls)
    private String seler;			//판매자(dtls)
    private String tel_no;			//연락처(dtls)
    private Integer review_no;		//리뷰번호
    private String purch_de;		//구매일자
    private String goods_review;	//구매평
    private String score;			//점수
    
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
    
	public String getMng_no() {
		return mng_no;
	}
	public void setMng_no(String mng_no) {
		this.mng_no = mng_no;
	}
	public String getKwrd() {
		return kwrd;
	}
	public void setKwrd(String kwrd) {
		this.kwrd = kwrd;
	}
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
	public String getSeler() {
		return seler;
	}
	public void setSeler(String seler) {
		this.seler = seler;
	}
	public String getTel_no() {
		return tel_no;
	}
	public void setTel_no(String tel_no) {
		this.tel_no = tel_no;
	}
	public Integer getReview_no() {
		return review_no;
	}
	public void setReview_no(Integer review_no) {
		this.review_no = review_no;
	}
	public String getPurch_de() {
		return purch_de;
	}
	public void setPurch_de(String purch_de) {
		this.purch_de = purch_de;
	}
	public String getGoods_review() {
		return goods_review;
	}
	public void setGoods_review(String goods_review) {
		this.goods_review = goods_review;
	}
	public String getScore() {
		return score;
	}
	public void setScore(String score) {
		this.score = score;
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
		result = prime * result + ((mng_no == null) ? 0 : mng_no.hashCode());
		result = prime * result + ((kwrd == null) ? 0 : kwrd.hashCode());
		result = prime * result + ((goods_no == null) ? 0 : goods_no.hashCode());
		result = prime * result + ((goods_url == null) ? 0 : goods_url.hashCode());
		result = prime * result + ((goods_nm == null) ? 0 : goods_nm.hashCode());
		result = prime * result + ((shopng_knd == null) ? 0 : shopng_knd.hashCode());
		result = prime * result + ((seler == null) ? 0 : seler.hashCode());
		result = prime * result + ((tel_no == null) ? 0 : tel_no.hashCode());
		result = prime * result + ((review_no == null) ? 0 : review_no.hashCode());
		result = prime * result + ((purch_de == null) ? 0 : purch_de.hashCode());
		result = prime * result + ((goods_review == null) ? 0 : goods_review.hashCode());
		result = prime * result + ((score == null) ? 0 : score.hashCode());
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
		if (mng_no == null) {
			if (other.mng_no != null)
				return false;
		} else if (!mng_no.equals(other.mng_no))
			return false;
		if (kwrd == null) {
			if (other.kwrd != null)
				return false;
		} else if (!kwrd.equals(other.kwrd))
			return false;
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
		if (seler == null) {
			if (other.seler != null)
				return false;
		} else if (!seler.equals(other.seler))
			return false;	
		if (tel_no == null) {
			if (other.tel_no != null)
				return false;
		} else if (!tel_no.equals(other.tel_no))
			return false;
		if (review_no == null) {
			if (other.review_no != null)
				return false;
		} else if (!review_no.equals(other.review_no))
			return false;
		if (purch_de == null) {
			if (other.purch_de != null)
				return false;
		} else if (!purch_de.equals(other.purch_de))
			return false;
		if (goods_review == null) {
			if (other.goods_review != null)
				return false;
		} else if (!goods_review.equals(other.goods_review))
			return false;
		if (score == null) {
			if (other.score != null)
				return false;
		} else if (!score.equals(other.score))
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
		return "MallList [mng_no=" + mng_no + ", kwrd=" + kwrd + ", goods_no=" + goods_no + ", goods_url=" + goods_url + ", goods_nm=" + goods_nm + 
				", shopng_knd=" + shopng_knd + ", seler=" + seler + ", tel_no=" + tel_no + ", review_no=" + review_no + ", purch_de=" + purch_de +
				", goods_review=" + goods_review + ", score=" + score +", from=" + from + ", to=" + to + ", paging=" + paging + ", page=" + page + 
				", rows=" + rows + ", sidx=" + sidx + ", sord=" + sord + ", startRow=" + startRow + ", endRow=" + endRow + "]";
	}
    
    


}