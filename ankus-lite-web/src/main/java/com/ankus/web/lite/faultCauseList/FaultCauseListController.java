package com.ankus.web.lite.faultCauseList;

import java.security.*;
import java.util.List;

import com.ankus.model.rest.Response;
import com.ankus.util.ExceptionUtils;
import com.ankus.web.core.LocaleSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Assign REST Controller.
 *
 * @author Jaesung Ahn
 * @since 1.0
 */
@Controller
@RequestMapping("/faultCauseList")
public class FaultCauseListController extends LocaleSupport {

    @Autowired
    private FaultCauseListService faultCauseListService;
    
    @RequestMapping(value = "list")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response list(FaultCauseList faultCauseList) {
        Response response = new Response();
        try {
        	if (faultCauseList.isPaging()) {
        		faultCauseList.setStartRow((faultCauseList.getPage() - 1) * faultCauseList.getRows() + 1); 
        		faultCauseList.setEndRow(faultCauseList.getPage() * faultCauseList.getRows());
        		int records = faultCauseListService.selectByConditionCnt(faultCauseList);
        		
        		response.getMap().put("page", faultCauseList.getPage());
        		response.getMap().put("records", records);
        		response.getMap().put("total", Math.ceil((double)records / (double)faultCauseList.getRows()));
        	}
        	
        	List<FaultCauseList> list = faultCauseListService.selectByCondition(faultCauseList);
        	
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
    
    @RequestMapping(value = "yearList")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response yearList(FaultCauseList faultCauseList) {
    	Response response = new Response();
    	try {
    		
    		List<FaultCauseList> list = faultCauseListService.selectByYearList(faultCauseList);
    		
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
    
    @RequestMapping(value = "termList")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response termList(FaultCauseList faultCauseList) {
    	Response response = new Response();
    	try {
    		
    		List<FaultCauseList> list = faultCauseListService.selectByTermList(faultCauseList);
    		
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
    
}
