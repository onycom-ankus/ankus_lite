package com.ankus.web.lite.newsList;

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
 * news REST Controller.
 *
 * @author Jaesung Ahn
 * @since 1.0
 */
@Controller
@RequestMapping("/newsList")
public class NewsListController extends LocaleSupport {

    @Autowired
    private NewsListService newsListService;
    
    @RequestMapping(value = "list")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response list(NewsList newsList) {
        Response response = new Response();
        try {
        	if (newsList.isPaging()) {
        		newsList.setStartRow((newsList.getPage() - 1) * newsList.getRows() + 1); 
        		newsList.setEndRow(newsList.getPage() * newsList.getRows());
        		
        		int records = newsListService.selectByConditionCnt(newsList);
        		
        		response.getMap().put("page", newsList.getPage());
        		response.getMap().put("records", records);
        		response.getMap().put("total", Math.ceil((double)records / (double)newsList.getRows()));
        	}
        	List<NewsList> list = newsListService.selectByCondition(newsList);
        	
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
