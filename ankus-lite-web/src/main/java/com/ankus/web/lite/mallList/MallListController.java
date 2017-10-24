package com.ankus.web.lite.mallList;

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

import com.ankus.web.lite.worddic.Worddic;

/**
 * Assign REST Controller.
 *
 * @author Jaesung Ahn
 * @since 1.0
 */
@Controller
@RequestMapping("/mallList")
public class MallListController extends LocaleSupport {

    @Autowired
    private MallListService mallListService;
    
    @RequestMapping(value = "list")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response list(MallList mallList) {
        Response response = new Response();
        try {
        	if (mallList.isPaging()) {
        		mallList.setStartRow((mallList.getPage() - 1) * mallList.getRows() + 1); 
        		mallList.setEndRow(mallList.getPage() * mallList.getRows());
        		int records = mallListService.selectByConditionCnt(mallList);
        		
        		response.getMap().put("page", mallList.getPage());
        		response.getMap().put("records", records);
        		response.getMap().put("total", Math.ceil((double)records / (double)mallList.getRows()));
        	}
        	
        	List<MallList> list = mallListService.selectByCondition(mallList);
        	
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
