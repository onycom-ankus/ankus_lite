package com.ankus.web.lite.expantion.publicData;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ankus.web.lite.expantion.util.DataMap;

public interface PublicDataService {

	DataMap getPublicDataList(HttpServletRequest request);

	DataMap regist(HttpServletRequest request);

	DataMap pdDetailGridTitle(HttpServletRequest request);

	boolean remove(HttpServletRequest request);

	void excelExport(HttpServletRequest request, HttpServletResponse response);

	DataMap pdDetailGrid(HttpServletRequest request);

	DataMap pdDetailExecel(HttpServletRequest request);

}
