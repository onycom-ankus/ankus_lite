package com.ankus.web.lite.worddic;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.math.NumberUtils;
import org.apache.commons.math3.util.MathUtils;
import com.ankus.model.rest.Response;
import com.ankus.util.ExceptionUtils;
import com.ankus.web.core.LocaleSupport;
import com.ankus.web.member.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Worddic REST Controller.
 *
 * @author Jaesung Ahn
 * @since 1.0
 */
@Controller
@RequestMapping("/worddic")
public class WorddicController extends LocaleSupport {

    @Autowired
    private WorddicService worddicService;
    
    @Autowired
    private MemberService memberService;
    
    
    @RequestMapping(value = "list")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response list(Worddic worddic) {
        Response response = new Response();
        try {
        	if (worddic.isPaging()) {
        		worddic.setStartRow((worddic.getPage() - 1) * worddic.getRows() + 1); 
        		worddic.setEndRow(worddic.getPage() * worddic.getRows());
        		int records = worddicService.selectByConditionCnt(worddic);
        		
        		response.getMap().put("page", worddic.getPage());
        		response.getMap().put("records", records);
        		response.getMap().put("total", Math.ceil((double)records / (double)worddic.getRows()));
        	}
        	
        	List<Worddic> list = worddicService.selectByCondition(worddic);
        	
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
    
    @RequestMapping(value = "exist", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response exist(@RequestBody Worddic worddic) throws Exception {
    	Response response = new Response();
    	try {
			
    		int cnt = worddicService.exist(worddic);			
			response.setTotal(cnt);
			response.setSuccess(true);
    		
    	} catch (Exception ex) {
    		response.setSuccess(false);
    		response.getError().setMessage(ex.getMessage());
    		if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
    		response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
    	}
    	return response;
    }
    
    @RequestMapping(value = "insert", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response insert(@RequestBody Worddic worddic) throws Exception {
    	Response response = new Response();
    	try {
			
    		int cnt = worddicService.insert(worddic);
    		if (cnt == 1) {
    			response.setSuccess(true);
    		} else {
    			response.setSuccess(false);
    			response.getError().setMessage("[" + worddic.getWord() + "] 항목이 정상적으로 등록되지 않았습니다.");
    		}
    	} catch (Exception ex) {
    		response.setSuccess(false);
    		response.getError().setMessage(ex.getMessage());
    		if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
    		response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
    	}
    	return response;
    }
    
    @RequestMapping(value = "update", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response update(@RequestBody Worddic worddic) throws Exception {
    	Response response = new Response();
    	try {
    		int cnt = worddicService.update(worddic);
   			worddic = worddicService.select(worddic.getWid());
    		response.setSuccess(true);
    	} catch (Exception ex) {
    		response.setSuccess(false);
    		response.getError().setMessage(ex.getMessage());
    		if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
    		response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
    	}
    	return response;
    }
    
	@RequestMapping(value = "deleteItems", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public Response delete(@RequestBody Integer[] ids) throws Exception {
		Response response = new Response();
		try {
			int cnt = worddicService.deleteList(ids);
			response.setSuccess(true);
			response.getMap().put("cnt", ids.length);
			response.getMap().put("delCnt", cnt);
		} catch (Exception ex) {
			response.setSuccess(false);
			response.getError().setMessage(ex.getMessage());
			if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
			response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
	    }
	    return response;
	}


}
