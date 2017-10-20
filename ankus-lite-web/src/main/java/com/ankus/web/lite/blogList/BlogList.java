package com.ankus.web.lite.blogList;

import java.io.Serializable;

/**
 * Assign Domain Object.
 *
 * @author Jaesung Ahn
 * @since 0.1
 */
public class BlogList implements Serializable {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    private Integer sn;				//ID
    private String blog_wrter;		//블로그_작성자
    private String doc_cret_dt;		//문서_생성_일시
    private String doc_sj;			//문서_제목
    private String doc_cn;			//문서_내용
    private String kwrd;			//키워드
    private String http_addr;		//HTTP_주소
    private String file_stre_addr;	//파일_저장_주소
    private String srch_kwrd;		//검색_키워드
    private String caution;			//주의
    private String rtype;			//
    private String riskpo;			//
    private String kwrd_sj;			//제목키워드
    
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
    
	public Integer getSn() {
		return sn;
	}
	public void setSn(Integer sn) {
		this.sn = sn;
	}
	public String getBlog_wrter() {
		return blog_wrter;
	}
	public void setBlog_wrter(String blog_wrter) {
		this.blog_wrter = blog_wrter;
	}
	public String getDoc_cret_dt() {
		return doc_cret_dt;
	}
	public void setDoc_cret_dt(String doc_cret_dt) {
		this.doc_cret_dt = doc_cret_dt;
	}
	public String getDoc_sj() {
		return doc_sj;
	}
	public void setDoc_sj(String doc_sj) {
		this.doc_sj = doc_sj;
	}
	public String getDoc_cn() {
		return doc_cn;
	}
	public void setDoc_cn(String doc_cn) {
		this.doc_cn = doc_cn;
	}
	public String getKwrd() {
		return kwrd;
	}
	public void setKwrd(String kwrd) {
		this.kwrd = kwrd;
	}
	public String getKwrd_sj() {
		return kwrd_sj;
	}
	public void setKwrd_sj(String kwrd_sj) {
		this.kwrd_sj = kwrd_sj;
	}
	public String getHttp_addr() {
		return http_addr;
	}
	public void setHttp_addr(String http_addr) {
		this.http_addr = http_addr;
	}
	public String getFile_stre_addr() {
		return file_stre_addr;
	}
	public void setFile_stre_addr(String file_stre_addr) {
		this.file_stre_addr = file_stre_addr;
	}
	public String getSrch_kwrd() {
		return srch_kwrd;
	}
	public void setSrch_kwrd(String srch_kwrd) {
		this.srch_kwrd = srch_kwrd;
	}
	public String getCaution() {
		return caution;
	}
	public void setCaution(String caution) {
		this.caution = caution;
	}
	public String getRtype() {
		return rtype;
	}
	public void setRtype(String rtype) {
		this.rtype = rtype;
	}
	public String getRiskpo() {
		return riskpo;
	}
	public void setRiskpo(String riskpo) {
		this.riskpo = riskpo;
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
		result = prime * result + ((sn == null) ? 0 : sn.hashCode());
		result = prime * result + ((blog_wrter == null) ? 0 : blog_wrter.hashCode());
		result = prime * result + ((doc_cret_dt == null) ? 0 : doc_cret_dt.hashCode());
		result = prime * result + ((doc_sj == null) ? 0 : doc_sj.hashCode());
		result = prime * result + ((doc_cn == null) ? 0 : doc_cn.hashCode());
		result = prime * result + ((kwrd == null) ? 0 : kwrd.hashCode());
		result = prime * result + ((kwrd_sj == null) ? 0 : kwrd_sj.hashCode());
		result = prime * result + ((http_addr == null) ? 0 : http_addr.hashCode());
		result = prime * result + ((file_stre_addr == null) ? 0 : file_stre_addr.hashCode());
		result = prime * result + ((srch_kwrd == null) ? 0 : srch_kwrd.hashCode());
		result = prime * result + ((caution == null) ? 0 : caution.hashCode());
		result = prime * result + ((rtype == null) ? 0 : rtype.hashCode());
		result = prime * result + ((riskpo == null) ? 0 : riskpo.hashCode());
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
		BlogList other = (BlogList) obj;
		if (sn == null) {
			if (other.sn != null)
				return false;
		} else if (!sn.equals(other.sn))
			return false;
		if (blog_wrter == null) {
			if (other.blog_wrter != null)
				return false;
		} else if (!blog_wrter.equals(other.blog_wrter))
			return false;
		if (doc_cret_dt == null) {
			if (other.doc_cret_dt != null)
				return false;
		} else if (!doc_cret_dt.equals(other.doc_cret_dt))
			return false;
		if (doc_sj == null) {
			if (other.doc_sj != null)
				return false;
		} else if (!doc_sj.equals(other.doc_sj))
			return false;
		if (doc_cn == null) {
			if (other.doc_cn != null)
				return false;
		} else if (!doc_cn.equals(other.doc_cn))
			return false;
		if (kwrd == null) {
			if (other.kwrd != null)
				return false;
		} else if (!kwrd.equals(other.kwrd))
			return false;
		if (kwrd_sj == null) {
			if (other.kwrd_sj != null)
				return false;
		} else if (!kwrd_sj.equals(other.kwrd_sj))
			return false;
		if (http_addr == null) {
			if (other.http_addr != null)
				return false;
		} else if (!http_addr.equals(other.http_addr))
			return false;	
		if (file_stre_addr == null) {
			if (other.file_stre_addr != null)
				return false;
		} else if (!file_stre_addr.equals(other.file_stre_addr))
			return false;
		if (srch_kwrd == null) {
			if (other.srch_kwrd != null)
				return false;
		} else if (!srch_kwrd.equals(other.srch_kwrd))
			return false;
		if (caution == null) {
			if (other.caution != null)
				return false;
		} else if (!caution.equals(other.caution))
			return false;
		if (rtype == null) {
			if (other.rtype != null)
				return false;
		} else if (!rtype.equals(other.rtype))
			return false;
		if (riskpo == null) {
			if (other.riskpo != null)
				return false;
		} else if (!riskpo.equals(other.riskpo))
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
		return "CafeInfo [sn=" + sn + ", blog_wrter=" + blog_wrter + ", doc_cret_dt=" + doc_cret_dt + ", doc_sj=" + doc_sj + ", doc_cn=" + doc_cn + 
				", kwrd=" + kwrd + ", kwrd_sj=" + kwrd_sj + ", http_addr=" + http_addr + ", file_stre_addr=" + file_stre_addr + ", srch_kwrd=" + srch_kwrd + ", caution=" + caution +
				", rtype=" + rtype + ", riskpo=" + riskpo +", from=" + from + ", to=" + to + ", paging=" + paging + ", page=" + page + 
				", rows=" + rows + ", sidx=" + sidx + ", sord=" + sord + ", startRow=" + startRow + ", endRow=" + endRow + "]";
	}
    
    


}