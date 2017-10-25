package com.ankus.web.lite.expantion.dataMgr;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ankus.web.lite.expantion.util.DataMap;

@Controller
@RequestMapping("/dataMgr")
public class DataMgrController {

	@Autowired
	private DataMgrService service;
	
	@RequestMapping("/ajax/getDataNmList")
	@ResponseBody
	public List<DataMap> getDataNmList(HttpServletRequest request) {
		
		List<DataMap> dataNmList = service.getDataNmList(request); 
		
		return dataNmList;
	}
	
	@RequestMapping("/ajax/searchData")
	@ResponseBody
	public DataMap searchData(HttpServletRequest request) {
		
		DataMap data = service.searchData(request); 
		
		return data;
	}
	
	@RequestMapping("/ajax/remove")
	@ResponseBody
	public String remove(HttpServletRequest request) {
		
		String msg = service.remove(request);
		
		return msg;
	}
}
