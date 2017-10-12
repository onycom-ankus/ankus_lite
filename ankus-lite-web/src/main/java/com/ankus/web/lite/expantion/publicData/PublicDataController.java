package com.ankus.web.lite.expantion.publicData;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ankus.web.lite.expantion.util.DataMap;


@Controller
@RequestMapping("/publicData")
public class PublicDataController {

	private Logger logger = LoggerFactory.getLogger(PublicDataController.class);
	
	@Autowired
	private PublicDataService service;
	
	@RequestMapping("/ajax/pdGrid")
	@ResponseBody
	public List<DataMap> pdGrid(HttpServletRequest request) {
		
		List<DataMap> list = service.getPublicDataList(request);
		
		return list;
	}
	
	@RequestMapping("/ajax/regist")
	@ResponseBody
	public DataMap regist(HttpServletRequest request) {
		
		DataMap result = service.regist(request);
		
		return result;
	}
	
	@RequestMapping("/ajax/detail")
	@ResponseBody
	public DataMap pdDetailGrid(HttpServletRequest request) {
		
		DataMap result = service.pdDetailGrid(request);
		
		return result;
	}
	
	@RequestMapping("/ajax/remove")
	@ResponseBody
	public boolean remove(HttpServletRequest request) {
		
		boolean result = service.remove(request);
		
		return result;
	}
	
	@RequestMapping("/excelExport")
	public void excelExport(HttpServletRequest request, HttpServletResponse response) {
		service.excelExport(request, response);
	}
}
