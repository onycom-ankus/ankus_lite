package com.ankus.web.lite.blogList;

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
@RequestMapping("/blogList")
public class BlogListController extends LocaleSupport {

    @Autowired
    private BlogListService blogListService;
    
    @RequestMapping(value = "list")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response list(BlogList blogList) {
        Response response = new Response();
        try {
        	if (blogList.isPaging()) {
        		blogList.setStartRow((blogList.getPage() - 1) * blogList.getRows() + 1); 
        		blogList.setEndRow(blogList.getPage() * blogList.getRows());
        		int records = blogListService.selectByConditionCnt(blogList);
        		
        		response.getMap().put("page", blogList.getPage());
        		response.getMap().put("records", records);
        		response.getMap().put("total", Math.ceil((double)records / (double)blogList.getRows()));
        	}
        	
        	List<BlogList> list = blogListService.selectByCondition(blogList);
        	
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
