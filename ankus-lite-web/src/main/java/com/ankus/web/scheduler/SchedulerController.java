package com.ankus.web.scheduler;

import java.util.List;
import java.util.Locale;

import com.ankus.model.rest.Response;
import com.ankus.util.ExceptionUtils;
import com.ankus.web.core.LocaleSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Scheduler REST Controller.
 *
 * @author Jaesung Ahn
 * @since 1.0
 */
@Controller
@RequestMapping("/main/scheduler")
public class SchedulerController extends LocaleSupport {

    @Autowired
    private SchedulerService schedulerService;
    
    @Autowired
    private MessageSource pMSG;
    
    @RequestMapping(value = "list")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response list(Scheduler scheduler) {
        Response response = new Response();
        try {
        	if (scheduler.isPaging()) {
        		scheduler.setStartRow((scheduler.getPage() - 1) * scheduler.getRows() + 1); 
        		scheduler.setEndRow(scheduler.getPage() * scheduler.getRows());
        		int records = schedulerService.selectByConditionCnt(scheduler);
        		
        		response.getMap().put("page", scheduler.getPage());
        		response.getMap().put("records", records);
        		response.getMap().put("total", Math.ceil((double)records / (double)scheduler.getRows()));
        	}
        	List<Scheduler> list = schedulerService.selectByCondition(scheduler);
        	
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
    public Response insert(Scheduler scheduler, Locale locale) throws Exception {
    	Response response = new Response();
    	try {
    		int cnt = schedulerService.insert(scheduler);
    		if (cnt == 1) {
    			response.setSuccess(true);
    		} else {
    			response.setSuccess(false);
    			response.getError().setMessage(pMSG.getMessage("JAVA_SCHE_CONTR_EDIT_ERROR", new String[]{
    					pMSG.getMessage("COMMON_REGIST", null, locale)
    			}, locale));
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
    public Response update(Scheduler scheduler, Locale locale) throws Exception {
    	Response response = new Response();
    	try {
    		int cnt = schedulerService.update(scheduler);
    		if (cnt == 1) {
    			response.setSuccess(true);
    		} else {
    			response.setSuccess(false);
    			response.getError().setMessage(pMSG.getMessage("JAVA_SCHE_CONTR_EDIT_ERROR", new String[]{
    					pMSG.getMessage("COMMON_UPDATE", null, locale)
    			}, locale));
    		}
    	} catch (Exception ex) {
    		response.setSuccess(false);
    		response.getError().setMessage(ex.getMessage());
    		if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
    		response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
    	}
    	return response;
    }
    
	@RequestMapping(value = "deleteSchedulers", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public Response delete(@RequestBody Integer[] ids) throws Exception {
		Response response = new Response();
		try {
			int cnt = schedulerService.deleteList(ids);
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
