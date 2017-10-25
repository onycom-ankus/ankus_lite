package com.ankus.web.lite.expantion.InnerData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Controller
@RequestMapping("/innerData")
public class InnerDataController {
	
	@Autowired
	private InnerDataService service;
	
	@RequestMapping("/ajax/regist")
	@ResponseBody
	public String regist(MultipartHttpServletRequest request) { 
		
		String msg = service.regist(request);
		
		return msg;
	}
}
