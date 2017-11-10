package com.ankus.web.lite.demandList;

import java.security.*;
import java.util.List;

import com.ankus.model.rest.Response;
import com.ankus.util.ExceptionUtils;
import com.ankus.web.core.LocaleSupport;
import com.ankus.web.lite.faultCauseList.FaultCauseList;

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
@RequestMapping("/demandList")
public class DemandListController extends LocaleSupport {

    @Autowired
    private DemandListService demandListService;
    
    @RequestMapping(value = "list")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response list(DemandList demandList) {
        Response response = new Response();
        try {
        	if (demandList.isPaging()) {
        		demandList.setStartRow((demandList.getPage() - 1) * demandList.getRows() + 1); 
        		demandList.setEndRow(demandList.getPage() * demandList.getRows());
        		int records = demandListService.selectByConditionCnt(demandList);
        		
        		response.getMap().put("page", demandList.getPage());
        		response.getMap().put("records", records);
        		response.getMap().put("total", Math.ceil((double)records / (double)demandList.getRows()));
        	}
        	
        	List<DemandList> list = demandListService.selectByCondition(demandList);
        	
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
    public Response yearList(DemandList demandList) {
    	Response response = new Response();
    	try {
    		
    		List<DemandList> list = demandListService.selectByYearList(demandList);
    		
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
    public Response termList(DemandList demandList) {
    	Response response = new Response();
    	try {
    		
    		List<DemandList> list = demandListService.selectByTermList(demandList);
    		
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
    
    @RequestMapping(value = "modelList")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response modelList(DemandList demandList) {
    	Response response = new Response();
    	try {
    		
    		List<DemandList> list = demandListService.selectByModelList(demandList);
    		
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
    
    @RequestMapping(value = "chartList")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response chartList(DemandList demandList) {
    	Response response = new Response();
    	try {
    		
    		List<DemandList> list = demandListService.selectByChartList(demandList);
    		
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
