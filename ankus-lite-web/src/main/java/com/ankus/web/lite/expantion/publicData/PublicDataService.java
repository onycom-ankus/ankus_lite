package com.ankus.web.lite.expantion.publicData;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ankus.web.lite.expantion.util.DataMap;

public interface PublicDataService {

	List<DataMap> getPublicDataList(HttpServletRequest request);

	DataMap regist(HttpServletRequest request);

	DataMap pdDetailGrid(HttpServletRequest request);

	boolean remove(HttpServletRequest request);

	void excelExport(HttpServletRequest request, HttpServletResponse response);

}
