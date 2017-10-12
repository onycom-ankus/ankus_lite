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
package com.ankus.web.dashboard;

import static org.slf4j.helpers.MessageFormatter.format;

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import com.ankus.model.rest.ActionHistory;
import com.ankus.model.rest.Engine;
import com.ankus.model.rest.Response;
import com.ankus.model.rest.WorkflowHistory;
import com.ankus.provider.engine.HistoryService;
import com.ankus.util.ExceptionUtils;
import com.ankus.util.StringUtils;
import com.ankus.web.core.LocaleSupport;
import com.ankus.web.engine.EngineService;
import com.ankus.web.member.Member;
import com.ankus.web.member.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.remoting.httpinvoker.HttpComponentsHttpInvokerRequestExecutor;
import org.springframework.remoting.httpinvoker.HttpInvokerProxyFactoryBean;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Dashboard REST Controller.
 *
 * @author Edward KIM
 * @since 0.4
 */
@Controller
@RequestMapping("/dashboard")
public class DashboardController extends LocaleSupport {

    /**
     * ankus Engine Management Remote Service
     */
	
    @Autowired
    private EngineService engineService;
    
    @Autowired
    private MemberService memberService;
    
    /*
	 * db config 정보
	 *  2016.01.06
	 *
	 *  by shm7255@onycom.com
	 */
	@Value("${jdbc.driver}")
	public String jdbc_driver;

	@Value("${jdbc.url}")
	public String jdbc_url;

	@Value("${jdbc.username}")
	public String jdbc_username;

	@Value("${jdbc.password}")
	public String jdbc_password;   

    /**
     * 지정한 조건의 워크플로우 실행 이력을 조회한다.
     *
     * @param startDate    시작날짜
     * @param endDate      종료 날짜
     * @param workflowName 워크플로우명
     * @param jobType      Job 유형
     * @param status       상태코드
     * @param sort         정렬할 컬럼명
     * @param dir          정렬 방식(ASC, DESC)
     * @param start        시작 페이지
     * @param limit        페이지당 건수
     * @return 워크플로우 실행 이력 목록
     */
    @RequestMapping(value = "workflows", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getWorkflows(
    							@RequestParam(defaultValue = "") String startDate, 
    							@RequestParam(defaultValue = "") String endDate,
                                @RequestParam(defaultValue = "") String workflowName,
                                @RequestParam(defaultValue = "") String username,
                                @RequestParam(defaultValue = "WORKFLOW") String jobType,
                                @RequestParam(defaultValue = "0") long engineId,
                                @RequestParam(defaultValue = "ALL") String status,
                                @RequestParam(defaultValue = "ID") String sort,
                                @RequestParam(defaultValue = "DESC") String dir,
                                @RequestParam(defaultValue = "0") int start, 
                                @RequestParam(defaultValue = "16") int limit) {

        Response response = new Response();
        try {
            Engine engine = engineService.getEngine(engineId);
            HistoryService historyService = getHistoryService(engine.getIp(), engine.getPort());
            
            // 권한에 따른 전체,개인별 목록을 가져오기 위한 권한 체크
            if(StringUtils.isEmpty(username) == false){
            	Member member = memberService.getMemberByUser(username);
            	if(member.getAuthority().equals("ROLE_ADMIN")){ // 사용자가 전체 권한인 경우
            		username = "";
            	}
            }
            List<WorkflowHistory> workflowHistories = historyService.getWorkflowHistories(startDate, 
																		            		endDate, 
																		            		workflowName, 
																		            		jobType,
																		            		username, 
																		            		status, 
																		            		sort, 
																		            		dir, 
																		            		start,
																		            		limit); 
            
            response.getList().addAll(workflowHistories);
            response.setTotal(historyService.getTotalCountOfWorkflowHistories(startDate, endDate, workflowName, jobType, status, username));
            response.setLimit(limit);
            response.setStart(start);
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
     * 지정한 조건의 워크플로우 실행 이력을 조회한다.
     *
     * @param status 상태코드
     * @param sort   정렬할 컬럼명
     * @param dir    정렬 방식(ASC, DESC)
     * @param start  시작 페이지
     * @param limit  페이지당 건수
     * @return 워크플로우 실행 이력 목록
     */
    @RequestMapping(value = "actions", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getActions(@RequestParam(defaultValue = "0") long engineId,
                               @RequestParam(defaultValue = "ALL") String status,
                               @RequestParam(defaultValue = "") String username,
                               @RequestParam(defaultValue = "ID") String sort,
                               @RequestParam(defaultValue = "DESC") String dir,
                               @RequestParam(defaultValue = "") String jobId,
                               @RequestParam(defaultValue = "0") int start,
                               @RequestParam(defaultValue = "16") int limit) {

        Response response = new Response();
        try {
            Engine engine = engineService.getEngine(engineId);
            HistoryService historyService = getHistoryService(engine.getIp(), engine.getPort());
            
            // 권한에 따른 전체,개인별 목록을 가져오기 위한 권한 체크
            if(StringUtils.isEmpty(username) == false){
            	Member member = memberService.getMemberByUser(username);
            	if(member.getAuthority().equals("ROLE_ADMIN")){ // 사용자가 전체 권한인 경우
            		username = "";
            	}
            }
            if (StringUtils.isEmpty(jobId)) {
                List<ActionHistory> actionHistories = historyService.getRunningActionHistories(username, status, sort, dir);
                response.getList().addAll(actionHistories);
            } else {
                List<ActionHistory> actionHistories = historyService.getActionHistories(jobId);
                response.getList().addAll(actionHistories);
            }
            response.setSuccess(true);
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        return response;
    }

    @RequestMapping(value = "log", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public ResponseEntity<String> getLog(@RequestParam(defaultValue = "0") long engineId, @RequestParam(defaultValue = "0") long actionId) {
        Engine engine = engineService.getEngine(engineId);
        if (engine == null) {
            ResponseEntity responseEntity = new ResponseEntity(HttpStatus.BAD_REQUEST);
            return responseEntity;
        } else {
            HistoryService historyService = getHistoryService(engine.getIp(), engine.getPort());
            String log = historyService.getActionLog(actionId);

            MultiValueMap headers = new HttpHeaders();
            headers.set("Content-Type", "text/plain;chartset=UTF-8");
            ResponseEntity responseEntity = new ResponseEntity(log, headers, HttpStatus.OK);
            return responseEntity;
        }
    }

    @RequestMapping(value = "script", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public ResponseEntity<String> getScript(@RequestParam(defaultValue = "0") long engineId, @RequestParam(defaultValue = "0") long actionId) {
        Engine engine = engineService.getEngine(engineId);
        if (engine == null) {
            ResponseEntity responseEntity = new ResponseEntity(HttpStatus.BAD_REQUEST);
            return responseEntity;
        } else {
            HistoryService historyService = getHistoryService(engine.getIp(), engine.getPort());
            ActionHistory actionHistory = historyService.getActionHistory(actionId);
            String script = actionHistory.getScript();

            MultiValueMap headers = new HttpHeaders();
            headers.set("Content-Type", "text/plain;chartset=UTF-8");
            ResponseEntity responseEntity = new ResponseEntity(StringUtils.isEmpty(script) ? "" : script, headers, HttpStatus.OK);
            return responseEntity;
        }
    }
    
	@RequestMapping(value = "delete", method = RequestMethod.GET)
	public void get_mrjar(HttpServletRequest req, HttpServletResponse resp
  		, @RequestParam(value = "jobStringId", required=true) String jobStringId  		
  		) throws Exception {
		
		System.out.printf("============>dashboard/delete\n");	
		
    	try{    		

	    	JSONObject historyDelete = new JSONObject();	    	    			        		    			    		
    		
    		int action_rtn = memberService.delete_sql("DELETE FROM ACTION_HISTORY WHERE JOB_ID_STRING='" + jobStringId + "'"); 
    		
    		if(action_rtn >=0){    			
        		int workflow_rtn = memberService.delete_sql("DELETE FROM WORKFLOW_HISTORY WHERE JOB_ID_STRING='" + jobStringId + "'");
        		if(workflow_rtn >= 0)
    			{
        			historyDelete.put("success", "true");
    			}
    			else
    			{
    				historyDelete.put("success", "fail");
    			}
    		}else{
    			historyDelete.put("success", "fail");
    		}
	      	        
	    }
    	catch(Exception e)
    	{                                                    // 예외가 발생하면 예외 상황을 처리한다.
	    	System.out.println(e.toString());
    	}
	}

    /**
     * Remote Workflow Engine Service를 가져온다.
     *
     * @param ip   Workflow Engine의 IP
     * @param port Workflow Engine의 Port
     * @return Remote Workflow Engine Service
     */
    private HistoryService getHistoryService(String ip, String port) {
        Engine engine = new Engine();
        engine.setIp(ip);
        engine.setPort(port);
        return getHistoryService(getHistoryServiceUrl(engine));
    }


	/**
     * Remote Workflow Engine Service를 가져온다.
     *
     * @return Remote Workflow Engine Service
     */
    private HistoryService getHistoryService(String url) {
        HttpInvokerProxyFactoryBean factoryBean = new HttpInvokerProxyFactoryBean();
        factoryBean.setServiceUrl(url);
        factoryBean.setServiceInterface(HistoryService.class);
        HttpComponentsHttpInvokerRequestExecutor httpInvokerRequestExecutor = new HttpComponentsHttpInvokerRequestExecutor();
        factoryBean.setHttpInvokerRequestExecutor(httpInvokerRequestExecutor);
        factoryBean.afterPropertiesSet();
        return (HistoryService) factoryBean.getObject();
    }

    /**
     * Remote Workflow Engine URL을 구성한다.
     *
     * @param engine Workflow Engine
     * @return Remote Workflow Engine의 URL
     */
    private String getHistoryServiceUrl(Engine engine) {
        return format("http://{}:{}/remote/history", engine.getIp(), engine.getPort()).getMessage();
    }

}
