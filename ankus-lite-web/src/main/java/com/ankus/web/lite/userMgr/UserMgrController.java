/**
 * This file is part of ankus.
 *
 * ankus is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ankus is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with ankus.  If not, see <http://www.gnu.org/licenses/>.
 */
package com.ankus.web.lite.userMgr;

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

@Controller
@RequestMapping("/userMgr")
public class UserMgrController extends LocaleSupport {
	
    @Autowired
    private UserMgrService userMgrService;

    @RequestMapping(value = "list")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response list(UserMgr userMgr){
        Response response = new Response();   
        
        try {
        	if (userMgr.isPaging()) {
        		userMgr.setStartRow((userMgr.getPage() - 1) * userMgr.getRows() + 1); 
        		userMgr.setEndRow(userMgr.getPage() * userMgr.getRows());
        		int records = userMgrService.selectByConditionCnt(userMgr);
        		
        		response.getMap().put("page", userMgr.getPage());
        		response.getMap().put("records", records);
        		response.getMap().put("total", Math.ceil((double)records / (double)userMgr.getRows()));
        	}

        	List<UserMgr> list = userMgrService.selectByCondition(userMgr);
            
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

    /**
     * User 의 enabeld와 authority를 수정한다.
     *
     * @param user
     * @return HTTP REST Response (성공적으로 추가한 경우 {@link com.ankus.model.rest.Response#isSuccess()}가 <tt>true</tt>
     */
    @RequestMapping(value = "update", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response update(@RequestBody UserMgr userMgr) throws Exception {
        Response response = new Response();
        try {
        	
        	if("true".equals(userMgr.getEnabled())){
        		userMgr.setChg_enabled(true);
        	}else if("false".equals(userMgr.getEnabled())){
        		userMgr.setChg_enabled(false);
        	}
        	
        	int cnt = userMgrService.update(userMgr);

        	if (cnt == 1) {
    			response.setSuccess(true);
    		} else {
    			response.setSuccess(false);
    			response.getError().setMessage("[" + userMgr.getUsername() + "] 항목이 정상적으로 수정되지 않았습니다.");
    		}
        	
        } catch (Exception ex) {
            response.setSuccess(false);
//            response.getError().setMessage(message("S_ADMIN", "CANNOT_UPDATE_USER"));
            response.getError().setCause(ex.getMessage());
        }
        return response;
    }
    
    @RequestMapping(value = "delete", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public Response delete(@RequestBody UserMgr userMgr) throws Exception {
		Response response = new Response();
		try {			
			int cnt = userMgrService.delete(userMgr);
			
			if (cnt == 1) {
    			response.setSuccess(true);
    		} else {
    			response.setSuccess(false);
    			response.getError().setMessage("정상적으로 삭제되지 않았습니다.");
    		}			
		} catch (Exception ex) {
			response.setSuccess(false);
			response.getError().setMessage(ex.getMessage());
			if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
			response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
	    }
	    return response;
	}
    
}