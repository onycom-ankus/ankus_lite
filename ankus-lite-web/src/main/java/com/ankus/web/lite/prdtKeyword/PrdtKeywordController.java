package com.ankus.web.lite.prdtKeyword;

import java.security.*;
import java.util.List;

import com.ankus.model.rest.Response;
import com.ankus.util.ExceptionUtils;
import com.ankus.web.core.LocaleSupport;
import com.ankus.web.lite.demandList.DemandList;

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
@RequestMapping("/prdtKeyword")
public class PrdtKeywordController extends LocaleSupport {

    @Autowired
    private PrdtKeywordService prdtKeywordService;
    
    @RequestMapping(value = "list")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response list(PrdtKeyword prdtKeyword) {
        Response response = new Response();
        try {
        	if (prdtKeyword.isPaging()) {
        		prdtKeyword.setStartRow((prdtKeyword.getPage() - 1) * prdtKeyword.getRows() + 1); 
        		prdtKeyword.setEndRow(prdtKeyword.getPage() * prdtKeyword.getRows());
        		int records = prdtKeywordService.selectByConditionCnt(prdtKeyword);
        		
        		response.getMap().put("page", prdtKeyword.getPage());
        		response.getMap().put("records", records);
        		response.getMap().put("total", Math.ceil((double)records / (double)prdtKeyword.getRows()));
        	}
        	
        	List<PrdtKeyword> list = prdtKeywordService.selectByCondition(prdtKeyword);
        	
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
    public Response yearList(PrdtKeyword prdtKeyword) {
    	Response response = new Response();
    	try {
    		
    		List<PrdtKeyword> list = prdtKeywordService.selectByYearList(prdtKeyword);
    		
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
    public Response termList(PrdtKeyword prdtKeyword) {
    	Response response = new Response();
    	try {
    		
    		List<PrdtKeyword> list = prdtKeywordService.selectByTermList(prdtKeyword);
    		
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
    public Response chartList(PrdtKeyword prdtKeyword) {
    	Response response = new Response();
    	try {
    		
    		List<PrdtKeyword> list = prdtKeywordService.selectByChartList(prdtKeyword);
    		
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
