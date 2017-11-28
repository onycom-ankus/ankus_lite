package com.ankus.web.lite.modelCfg;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import com.ankus.model.rest.Response;
import com.ankus.util.ExceptionUtils;
import com.ankus.web.core.LocaleSupport;
import com.ankus.web.member.MemberService;

import org.json.simple.JSONObject;
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
@RequestMapping("/ModelCfg")
public class ModelCfgController extends LocaleSupport {

    @Autowired
    private MemberService memberService;
    
    @RequestMapping(value = "list")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response list() {
        Response response = new Response();
        try {
        	JSONObject data = new JSONObject();
        	
        	ArrayList<HashMap<String, Object>> rs = memberService.select_sql("SELECT * FROM config WHERE item LIKE 'cfg_%'");
        	
        	for(int i=0 ; i < rs.size() ; i++){
        		 data.put(rs.get(i).get("item"), rs.get(i).get("value"));
        	}
        	        		        
	        response.getList().add(data);
            response.setTotal(data.size());
            response.setSuccess(true);
        	
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        return response;
    }
    
      
    @RequestMapping(value = "update", method=RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response update(@RequestBody Map<String, Object> data) throws Exception {    
    	
    	Response response = new Response();
    	
    	try {
    		    		
    		Iterator iterator = data.entrySet().iterator();
    		
    		while (iterator.hasNext()) {
			Entry entry = (Entry)iterator.next(); 
			memberService.update_sql("UPDATE config SET [value] = '" + entry.getValue() + "' WHERE item = '"+ entry.getKey() +"'");  
    		}
    		
    		response.setSuccess(true);
    		
    	} catch (Exception ex) {
    		response.setSuccess(false);
    		response.getError().setMessage("정상적으로 수정되지 않았습니다.");
    	}
    return response;
    }

}
