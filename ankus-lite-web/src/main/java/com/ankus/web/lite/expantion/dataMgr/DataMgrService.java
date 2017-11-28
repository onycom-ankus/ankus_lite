package com.ankus.web.lite.expantion.dataMgr;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.ankus.web.lite.expantion.util.DataMap;

public interface DataMgrService {

	List<DataMap> getDataNmList(HttpServletRequest request);

	DataMap searchData(HttpServletRequest request);

	String remove(HttpServletRequest request);

	DataMap searchTitle(HttpServletRequest request);
}
