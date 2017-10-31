package com.ankus.web.lite.relatedKeyword;

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
@RequestMapping("/relatedKeyword")
public class RelatedKeywordController extends LocaleSupport {

    @Autowired
    private RelatedKeywordService relatedKeywordService;
    
    @RequestMapping(value = "list")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response list(RelatedKeyword relatedKeyword) {
        Response response = new Response();
        try {
        	if (relatedKeyword.isPaging()) {
        		relatedKeyword.setStartRow((relatedKeyword.getPage() - 1) * relatedKeyword.getRows() + 1); 
        		relatedKeyword.setEndRow(relatedKeyword.getPage() * relatedKeyword.getRows());
        		int records = relatedKeywordService.selectByConditionCnt(relatedKeyword);
        		
        		response.getMap().put("page", relatedKeyword.getPage());
        		response.getMap().put("records", records);
        		response.getMap().put("total", Math.ceil((double)records / (double)relatedKeyword.getRows()));
        	}
        	
        	List<RelatedKeyword> list = relatedKeywordService.selectByCondition(relatedKeyword);
        	
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
    public Response yearList(RelatedKeyword relatedKeyword) {
    	Response response = new Response();
    	try {
    		
    		List<RelatedKeyword> list = relatedKeywordService.selectByYearList(relatedKeyword);
    		
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
    public Response termList(RelatedKeyword relatedKeyword) {
    	Response response = new Response();
    	try {
    		
    		List<RelatedKeyword> list = relatedKeywordService.selectByTermList(relatedKeyword);
    		
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
