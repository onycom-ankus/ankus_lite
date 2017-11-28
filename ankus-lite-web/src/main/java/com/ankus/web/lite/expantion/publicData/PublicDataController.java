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

import com.ankus.model.rest.Response;
import com.ankus.util.ExceptionUtils;
import com.ankus.web.lite.expantion.util.DataMap;


@Controller
@RequestMapping("/publicData")
public class PublicDataController {

	private Logger logger = LoggerFactory.getLogger(PublicDataController.class);
	
	@Autowired
	private PublicDataService service;
	
	@RequestMapping("/ajax/pdGrid")
	@ResponseBody
	public Response pdGrid(HttpServletRequest request) {
		
		DataMap data = service.getPublicDataList(request);
		
        Response response = new Response();
        try {
        		response.getMap().put("page", data.getInt("page"));
        		response.getMap().put("records", data.getInt("records"));
        		response.getMap().put("total", data.getInt("total"));
        		
        	List<DataMap> list = (List<DataMap>) data.get("list");
        	
            response.getList().addAll(list);
            response.setTotal(list.size());
            response.setSuccess(true);
            
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        return response;
	}
	
	@RequestMapping("/ajax/regist")
	@ResponseBody
	public DataMap regist(HttpServletRequest request) {
		
		DataMap result = service.regist(request);
		
		return result;
	}
	
	@RequestMapping("/ajax/detail")
	@ResponseBody
	public Response pdDetailGrid(HttpServletRequest request) {
		
		DataMap data = service.pdDetailGrid(request);
		
        Response response = new Response();
        try {
        		response.getMap().put("page", data.getInt("page"));
        		response.getMap().put("records", data.getInt("records"));
        		response.getMap().put("total", data.getInt("total"));
        		
	        	List<DataMap> list = (List<DataMap>) data.get("list");
	        	
	            response.getList().addAll(list);
	            response.setTotal(list.size());
	            response.setSuccess(true);
            
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        
        return response;
	}
	
	@RequestMapping("/ajax/detailTitle")
	@ResponseBody
	public DataMap pdDetailGridTitle(HttpServletRequest request) {
		
		DataMap data = service.pdDetailGridTitle(request);
		
		return data;
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
