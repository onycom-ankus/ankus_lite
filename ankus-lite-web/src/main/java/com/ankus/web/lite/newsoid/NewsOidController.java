package com.ankus.web.lite.newsoid;

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
 * @author 
 * @since 1.0
 */
@Controller
@RequestMapping("/newsoid")
public class NewsOidController extends LocaleSupport {

    @Autowired
    private NewsOidService newsoidService;
    
    @RequestMapping(value = "list")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response list(NewsOid newsoid) {
        Response response = new Response();
        try {
        	if (newsoid.isPaging()) {
        		newsoid.setStartRow((newsoid.getPage() - 1) * newsoid.getRows() + 1); 
        		newsoid.setEndRow(newsoid.getPage() * newsoid.getRows());
        		int records = newsoidService.selectByConditionCnt(newsoid);
        		
        		response.getMap().put("page", newsoid.getPage());
        		response.getMap().put("records", records);
        		response.getMap().put("total", Math.ceil((double)records / (double)newsoid.getRows()));
        	}
        	
        	List<NewsOid> list = newsoidService.selectByCondition(newsoid);
        	
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
    
    
    @RequestMapping(value = "insert")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response insert(@RequestBody NewsOid newsoid) throws Exception {
    	Response response = new Response();
    	try {
    		if (0 < newsoidService.exist(newsoid.getId())) {
    			response.setSuccess(false);
    			response.getError().setMessage("[" + newsoid.getId() + "] 항목은 이미 등록되었습니다.");
    			return response;
    		}
    		
    		int cnt = newsoidService.insert(newsoid);
    		if (cnt == 1) {
    			response.setSuccess(true);
    		} else {
    			response.setSuccess(false);
    			response.getError().setMessage("[" + newsoid.getId() + "] 항목이 정상적으로 등록되지 않았습니다.");
    		}
    	} catch (Exception ex) {
    		response.setSuccess(false);
    		response.getError().setMessage(ex.getMessage());
    		if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
    		response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
    	}
    	return response;
    }
    
    @RequestMapping(value = "update")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response update(@RequestBody NewsOid newsoid) throws Exception {
    	Response response = new Response();
    	
    	//System.out.printf("update=[%s]", newsoid.toString());
    	
    	try {
    		int cnt = newsoidService.update(newsoid);
    		if (cnt == 1) {
    			response.setSuccess(true);
    		} else {
    			response.setSuccess(false);
    			response.getError().setMessage("[" + newsoid.getId() + "] 항목이 정상적으로 수정되지 않았습니다.");
    		}
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
	public Response delete(@RequestBody String[] items) throws Exception {
		Response response = new Response();
		try {
			int cnt = newsoidService.deleteList(items);
			response.setSuccess(true);
			response.getMap().put("cnt", items.length);
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
