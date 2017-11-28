package com.ankus.web.lite.expantion.dataMgr;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ankus.model.rest.Response;
import com.ankus.util.ExceptionUtils;
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
	
	@RequestMapping("/ajax/searchTitle")
	@ResponseBody
	public DataMap searchTitle(HttpServletRequest request) {
		
		DataMap data = service.searchTitle(request); 
		
		return data;
	}
	
/*	@RequestMapping("/ajax/searchData")
	@ResponseBody
	public DataMap searchData(HttpServletRequest request) {
		
		DataMap data = service.searchData(request); 
		
		return data;
	}*/
	
	@RequestMapping("/ajax/searchData")
    @ResponseBody
    public Response list(HttpServletRequest request) {
		DataMap data = service.searchData(request); 
		
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
	
	@RequestMapping("/ajax/remove")
	@ResponseBody
	public String remove(HttpServletRequest request) {
		
		String msg = service.remove(request);
		
		return msg;
	}
}
