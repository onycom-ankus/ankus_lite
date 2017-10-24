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
package com.ankus.web.engine;

import org.json.simple.JSONObject;
import com.ankus.model.rest.Engine;
import com.ankus.model.rest.FileInfo;
import com.ankus.model.rest.HadoopCluster;
import com.ankus.model.rest.HiveServer;
import com.ankus.model.rest.Response;
import com.ankus.provider.engine.AdminService;
import com.ankus.provider.engine.WorkflowEngineService;
import com.ankus.web.admin.HadoopClusterAdminService;
import com.ankus.web.admin.HiveAdminService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.remoting.httpinvoker.HttpComponentsHttpInvokerRequestExecutor;
import org.springframework.remoting.httpinvoker.HttpInvokerProxyFactoryBean;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import com.ankus.web.core.LocaleSupport;
import com.ankus.web.member.Member;
import com.ankus.web.member.MemberService;

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static org.slf4j.helpers.MessageFormatter.format;

@Controller
@RequestMapping("/admin/engine")
public class EngineController {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(EngineController.class);

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
    
    @Autowired
    private EngineService engineService;

    @Autowired
    private HadoopClusterAdminService hadoopClusterAdminService;

    @Autowired
    private HiveAdminService hiveAdminService;

    @Autowired
    private RestTemplate restTemplate;
    
    @Autowired
    private MemberService memberService;

    @RequestMapping(value = "regist", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response registCollectionJob(@RequestParam Long serverId, @RequestBody String xml) {
        Response response = new Response();
        if (serverId == null || StringUtils.isEmpty(xml)) {
            response.setSuccess(false);
            return response;
        }

        logger.debug("로그 수집 요청을 처리합니다. 처리할 로그 수집 요청은 다음과 같습니다.\n{}", xml);

        try {
            Engine engine = engineService.getEngine(serverId);
            WorkflowEngineService workflowEngineService = getRemoteWorkflowEngineService(engine);
            response.setSuccess(workflowEngineService.registCollectionJob(xml));
        } catch (Exception ex) {
            String message = "Log Collector에 로그 수집 요청을 할 수 없습니다.";
            response.setSuccess(false);
            response.getError().setMessage(message);
            response.getError().setCause(ex.getMessage());

            logger.warn(message, ex);
        }
        return response;
    }

    /**
     * 엔진 정보 가져오기
     * @param type 엔진종류(ALL,HADOOP,HIVE)
     * @param username 사용자명
     * @param from list=목록조회, else=콤보목록
     * @return
     */
    @RequestMapping(value = "engines", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getEngines(HttpServletRequest req, HttpServletResponse resp,
    		@RequestParam(defaultValue = "ALL") String type,
    		@RequestParam(defaultValue = "") String username) {
        Response response = new Response();
        
        String from = req.getParameter("from");

        try {
            response.setSuccess(true);
            Member member = memberService.getMemberByUser(username);
            List<Engine> engines = engineService.getEngines(member);
            
            logger.info(">>> {}의 Engine의  정보: {}", member, engines);
            
            if (engines != null) {
                List<Engine> filters = new ArrayList<Engine>();
                for (Engine engine : engines) {
                	
                    if ("HADOOP".equals(type) && engine.getHadoopClusterId() > 0) {
                        filters.add(engine);
                    } else if ("HIVE".equals(type) && engine.getHiveServerId() > 0) {
                        filters.add(engine);
                    } else if ("ALL".equals(type)) {
                        filters.add(engine);
                    }
                }

                for (Engine engine : filters) {
                    Map param = new HashMap();

                    param.put("id", engine.getId());
                    param.put("instanceName", engine.getName());
                    param.put("serverUrl", getWorkflowEngineUrl(engine));
                    param.put("ip", engine.getIp());
                    param.put("port", engine.getPort());
                    param.put("permission", engine.getPermission());
                    
                    System.out.println("------->" + type);

                    if (("ALL".equals(type) || "HADOOP".equals(type))) {
                        param.put("hadoopClusterId", engine.getHadoopClusterId());
                        param.put("hadoopClusterName", hadoopClusterAdminService.getHadoopCluster(engine.getHadoopClusterId()).getName());
                    }

//                    HiveServer hiveServer = hiveAdminService.getHiveServer(engine.getHiveServerId());
//                    if ("ALL".equals(type) || ("HIVE".equals(type) && hiveServer != null)) {
//                        param.put("hiveServerId", engine.getHiveServerId());
//                        param.put("hiveServerName", hiveServer.getName());
//                    }

                    try {
                        WorkflowEngineService workflowEngineService = getRemoteWorkflowEngineService(engine);
                        
                        Map status = workflowEngineService.getStatus();

                        param.put("schedulerName", status.get("schedulerName"));
                        param.put("schedulerId", status.get("schedulerId"));
                        param.put("hostAddress", status.get("hostAddress"));
                        param.put("hostName", status.get("hostName"));
                        param.put("runningJob", status.get("runningJob"));

                        param.put("status", "RUNNING");
                    } catch (Exception ex) {
                        logger.info("Engine({})의 상태 조회실패: {}", ex);
                        param.put("status", "FAIL");
                    }
                    if("list".equals(from) || "RUNNING".equals(param.get("status"))) {
                    	response.getList().add(param);
                    }
                }
                response.setTotal(response.getList().size());
            } else {
                response.setTotal(0);
            }
        } catch (Exception ex) {
            String msg = "Workflow Engine 정보를 확인할 수 없습니다.";
            response.setSuccess(false);
            response.getError().setMessage(msg);
            response.getError().setCause(ex.getMessage());

            logger.warn(msg, ex);
        }
        return response;
    }

    @RequestMapping(value = "delete", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response delete(@RequestBody Engine engine) {
        Response response = new Response();
        try {
            response.setSuccess(engineService.removeEngine(engine.getId()));
        } catch (Exception ex) {
            String message = "Workflow Engine를 삭제할 수 없습니다.";
            response.setSuccess(false);
            response.getError().setMessage(message);
            response.getError().setCause(ex.getMessage());

            logger.warn(message, ex);
        }
        return response;
    }

    @RequestMapping(value = "envs", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getEnvs(@RequestParam(defaultValue = "") String serverUrl,
                            @RequestParam int start, @RequestParam int page, @RequestParam int limit) {

        Response response = new Response();

        if (StringUtils.isEmpty(serverUrl)) {
            response.setSuccess(true);
            return response;
        }

        try {
            response.setSuccess(true);
            WorkflowEngineService workflowEngineService = this.getRemoteWorkflowEngineService(serverUrl);
            List<Map> systemProperties = workflowEngineService.getEnvironments();
            response.getList().addAll(systemProperties);
        } catch (Exception ex) {
            String message = "Workflow Engine의 환경 변수 정보를 확인할 수 없습니다.";
            response.setSuccess(false);
            response.getError().setMessage(message);
            response.getError().setCause(ex.getMessage());

            logger.warn(message, ex);
        }
        return response;
    }

    @RequestMapping(value = "props", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getPros(@RequestParam(defaultValue = "") String serverUrl,
                            @RequestParam int start, @RequestParam int page, @RequestParam int limit) {

        Response response = new Response();
        if (StringUtils.isEmpty(serverUrl)) {
            response.setSuccess(true);
            return response;
        }

        try {
            response.setSuccess(true);
            WorkflowEngineService workflowEngineService = this.getRemoteWorkflowEngineService(serverUrl);
            List<Map> systemProperties = workflowEngineService.getSystemProperties();
            response.getList().addAll(systemProperties);
        } catch (Exception ex) {
            String message = "Workflow Engine의 시스템 속성 정보를 확인할 수 없습니다.";
            response.setSuccess(false);
            response.getError().setMessage(message);
            response.getError().setCause(ex.getMessage());

            logger.warn(message, ex);
        }
        return response;
    }

    @RequestMapping(value = "triggers", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getTriggers(@RequestParam(defaultValue = "") String serverUrl,
                                @RequestParam int start, @RequestParam int page, @RequestParam int limit) {

        Response response = new Response();
        if (StringUtils.isEmpty(serverUrl)) {
            response.setSuccess(true);
            return response;
        }

        try {
            response.setSuccess(true);
            WorkflowEngineService workflowEngineService = this.getRemoteWorkflowEngineService(serverUrl);
            List<Map> systemProperties = workflowEngineService.getTriggers();
            response.getList().addAll(systemProperties);
        } catch (Exception ex) {
            String message = "Workflow Engine의 시스템 속성 정보를 확인할 수 없습니다.";
            response.setSuccess(false);
            response.getError().setMessage(message);
            response.getError().setCause(ex.getMessage());

            logger.warn(message, ex);
        }
        return response;
    }

    @RequestMapping(value = "running", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getRunningJobs(@RequestParam(defaultValue = "") String serverUrl,
                                   @RequestParam int start, @RequestParam int page, @RequestParam int limit) {

        Response response = new Response();
        if (StringUtils.isEmpty(serverUrl)) {
            response.setSuccess(true);
            return response;
        }

        try {
            response.setSuccess(true);
            WorkflowEngineService workflowEngineService = this.getRemoteWorkflowEngineService(serverUrl);
            List<Map> systemProperties = workflowEngineService.getRunningJob();
            response.getList().addAll(systemProperties);
        } catch (Exception ex) {
            String message = "Workflow Engine의 실행중인 작업 정보를 확인할 수 없습니다.";
            response.setSuccess(false);
            response.getError().setMessage(message);
            response.getError().setCause(ex.getMessage());

            logger.warn(message, ex);
        }
        return response;
    }

    @RequestMapping(value = "job", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getJob(@RequestParam(defaultValue = "") String serverUrl,
                           @RequestParam(defaultValue = "") String jobName,
                           @RequestParam(defaultValue = "") String jobGroup,
                           @RequestParam int start, @RequestParam int page, @RequestParam int limit) {

        Response response = new Response();
        if (StringUtils.isEmpty(serverUrl)) {
            response.setSuccess(true);
            return response;
        }

        try {
            response.setSuccess(true);
            WorkflowEngineService workflowEngineService = this.getRemoteWorkflowEngineService(serverUrl);
            List<Map> jobInfos = workflowEngineService.getJobInfos(jobName, jobGroup);
            response.getList().addAll(jobInfos);
        } catch (Exception ex) {
            String message = "Workflow Engine의 실행중인 작업 정보를 확인할 수 없습니다.";
            response.setSuccess(false);
            response.getError().setMessage(message);
            response.getError().setCause(ex.getMessage());

            logger.warn(message, ex);
        }
        return response;
    }
	/*
	2015.01.30
	whitepoo@onycom.com
	*/
	@RequestMapping(value = "name_exist", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response exist_byname(@RequestBody Engine engine) {
        Response response = new Response();
        Connection conn = null;        
        if (StringUtils.isEmpty(engine.getName())) {
            response.setSuccess(false);
            return response;
        }

        try {
	    	String url = jdbc_url; //"jdbc:mysql://localhost:3306/";        // 사용하려는 데이터베이스명을 포함한 URL 기술
	    	String id = jdbc_username; //"root";                                                    // 사용자 계정
	    	String pw = jdbc_password; //"";                                                // 사용자 계정의 패스워드
	
	    	Class.forName(jdbc_driver/*"com.mysql.jdbc.Driver"*/);                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
	    	conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
	    	
	    	System.out.println("제대로 연결되었습니다.");                            // 커넥션이 제대로 연결되면 수행된다.
	    	
	    	java.sql.Statement st = null;
			ResultSet rs = null;
			st = conn.createStatement();
			rs = st.executeQuery("SELECT COUNT(*) AS RC FROM ENGINE WHERE NAME ='" + engine.getName()+"'");
			if(rs.next())
	        {
		       int irc = Integer.parseInt(rs.getString("RC"));
		       if(irc > 0)
		       {
		    	   response.setSuccess(true);
		    	   response.setObject(irc);
		       }
	        }
            
        } catch (Exception ex) {
            response.setSuccess(false);
            String message = "There is a engine which has same name";
            response.getError().setMessage(message);
            response.getError().setCause(ex.getMessage());
        }
        return response;
    }
    @RequestMapping(value = "add", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response add(@RequestBody Engine engine) {
        logger.debug("Workflow Engine을 추가합니다. 추가할 정보: {}", engine);

        Response response = new Response();
        try {
            response.setSuccess(engineService.addEngine(engine));
            response.setObject(engine);
        } catch (Exception ex) {
            String message = "Workflow Engine을 추가할 수 없습니다.";
            response.setSuccess(false);
            response.getError().setMessage(message);
            response.getError().setCause(ex.getMessage());

            logger.warn(message, ex);
        }
        return response;
    }

    @RequestMapping(value = "history", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getHistories(@RequestParam(defaultValue = "") String serverUrl,
                                 @RequestParam int start, @RequestParam int page, @RequestParam int limit) {

        Response response = new Response();
        if (StringUtils.isEmpty(serverUrl)) {
            response.setSuccess(true);
            return response;
        }

        try {
            response.setSuccess(true);
            HttpHeaders headers = new HttpHeaders();
            headers.setAccept(this.getJsonMediaType());

            ResponseEntity<Response> responseEntity = restTemplate.exchange(StringUtils.replace(serverUrl, "status", "histories")
                    + "?start=" + start + "&page=" + page + "&limit=" + limit,
                    HttpMethod.GET,
                    new HttpEntity<Response>(headers),
                    Response.class);

            response.getList().addAll(responseEntity.getBody().getList());
            response.setTotal(responseEntity.getBody().getTotal());
        } catch (Exception ex) {
            String message = "Workflow Engine의 시스템 속성 정보를 확인할 수 없습니다.";
            response.setSuccess(false);
            response.getError().setMessage(message);
            response.getError().setCause(ex.getMessage());

            logger.warn(message, ex);
        }
        return response;
    }

    @RequestMapping(value = "directory", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getDirectory(@RequestParam(defaultValue = "") String serverUrl,
                                 @RequestParam String node) {
        Response response = new Response();
        if (StringUtils.isEmpty(serverUrl)) {
            response.setSuccess(true);
            return response;
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setAccept(this.getJsonMediaType());

            MultiValueMap param = new LinkedMultiValueMap();
            param.add("node", node);

            HttpEntity<?> httpEntity = new HttpEntity<Object>(param, headers);

            System.out.println("------------serverUrl-------------");
            System.out.println("serverUrl : " + serverUrl);

            ResponseEntity<Response> responseEntity = restTemplate.exchange(StringUtils.replace(serverUrl, "status", "directory"),
                    HttpMethod.POST, httpEntity, Response.class);

            response.getList().addAll(responseEntity.getBody().getList());
            response.setTotal(responseEntity.getBody().getTotal());
            response.setSuccess(true);
        } catch (Exception ex) {
            String message = " 요청한 경로(" + node + ")에 접근할 수 없습니다.";
            response.setSuccess(false);
            response.getError().setMessage(message);
            response.getError().setCause(ex.getMessage());

            logger.warn(message, ex);
        }
        return response;
    }

    @RequestMapping(value = "aio", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getDirectoryAndFile(@RequestParam(defaultValue = "0") Long engineId,
                                        @RequestParam(defaultValue = "/") String node) {

        Response response = new Response();
        if (engineId == 0) {
            response.setSuccess(true);
            return response;
        }

        try {
            Engine engine = engineService.getEngine(engineId);
            AdminService adminService = getAdminService(getAdminServiceUrl(engine));
            List<FileInfo> fileinfo = adminService.getDirectoryAndFiles(node);

            response.getList().addAll(fileinfo);
            response.setTotal(fileinfo.size());
            response.setSuccess(true);
        } catch (Exception ex) {
            String message = " 요청한 경로(" + node + ")에 접근할 수 없습니다.";
            response.setSuccess(false);
            response.getError().setMessage(message);
            response.getError().setCause(ex.getMessage());

            logger.warn(message, ex);
        }
        return response;
    }

    @RequestMapping(value = "file", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getFiles(
            @RequestParam(defaultValue = "") String serverUrl, @RequestParam String node,
            @RequestParam int start, @RequestParam int page, @RequestParam int limit) {

        Response response = new Response();
        if (StringUtils.isEmpty(serverUrl)) {
            response.setSuccess(true);
            return response;
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setAccept(this.getJsonMediaType());

            MultiValueMap param = new LinkedMultiValueMap();
            param.add("node", node);

            HttpEntity<?> httpEntity = new HttpEntity<Object>(param, headers);

            ResponseEntity<Response> responseEntity = restTemplate.exchange(StringUtils.replace(serverUrl, "status", "file"),
                    HttpMethod.POST, httpEntity, Response.class);

            response.getList().addAll(responseEntity.getBody().getList());
            response.setTotal(responseEntity.getBody().getTotal());
            response.setSuccess(true);
        } catch (Exception ex) {
            response.setSuccess(false);
            String message = " 요청한 경로(" + node + ")에 접근할 수 없습니다.";
            response.getError().setMessage(message);
            response.getError().setCause(ex.getMessage());

            logger.warn(message, ex);
        }
        return response;
    }

    private List<MediaType> getJsonMediaType() {
        List<MediaType> mediaTypes = new ArrayList<MediaType>();
        mediaTypes.add(MediaType.APPLICATION_JSON);
        return mediaTypes;
    }

    /**
     * Remote Workflow Engine Service를 가져온다.
     *
     * @return Remote Workflow Engine Service
     */
    private WorkflowEngineService getRemoteWorkflowEngineService(String url) {
        HttpInvokerProxyFactoryBean factoryBean = new HttpInvokerProxyFactoryBean();
        factoryBean.setServiceUrl(url);
        factoryBean.setServiceInterface(WorkflowEngineService.class);
        HttpComponentsHttpInvokerRequestExecutor httpInvokerRequestExecutor = new HttpComponentsHttpInvokerRequestExecutor();
        httpInvokerRequestExecutor.setConnectTimeout(3000);
        factoryBean.setHttpInvokerRequestExecutor(httpInvokerRequestExecutor);
        factoryBean.afterPropertiesSet();
        return (WorkflowEngineService) factoryBean.getObject();
    }

    /**
     * Remote Workflow Engine Service를 가져온다.
     *
     * @return Remote Workflow Engine Service
     */
    private WorkflowEngineService getRemoteWorkflowEngineService(Engine engine) {
        return getRemoteWorkflowEngineService(getWorkflowEngineUrl(engine));
    }

    /**
     * Remote Workflow Engine URL을 구성한다.
     *
     * @param engine Workflow Engine
     * @return Remote Workflow Engine의 URL
     */
    private String getWorkflowEngineUrl(Engine engine) {
        return format("http://{}:{}/remote/engine", engine.getIp(), engine.getPort()).getMessage();
    }

    /**
     * Remote Workflow Engine Service를 가져온다.
     *
     * @param ip   Workflow Engine의 IP
     * @param port Workflow Engine의 Port
     * @return Remote Workflow Engine Service
     */
    private AdminService getHistoryService(String ip, String port) {
        Engine engine = new Engine();
        engine.setIp(ip);
        engine.setPort(port);
        return getAdminService(getAdminServiceUrl(engine));
    }

    /**
     * Remote Workflow Engine Service를 가져온다.
     *
     * @return Remote Workflow Engine Service
     */
    private AdminService getAdminService(String url) {
        HttpInvokerProxyFactoryBean factoryBean = new HttpInvokerProxyFactoryBean();
        factoryBean.setServiceUrl(url);
        factoryBean.setServiceInterface(AdminService.class);
        HttpComponentsHttpInvokerRequestExecutor httpInvokerRequestExecutor = new HttpComponentsHttpInvokerRequestExecutor();
        factoryBean.setHttpInvokerRequestExecutor(httpInvokerRequestExecutor);
        factoryBean.afterPropertiesSet();
        return (AdminService) factoryBean.getObject();
    }

    /**
     * Remote Workflow Engine URL을 구성한다.
     *
     * @param engine Workflow Engine
     * @return Remote Workflow Engine의 URL
     */
    private String getAdminServiceUrl(Engine engine) {
        return format("http://{}:{}/remote/admin", engine.getIp(), engine.getPort()).getMessage();
    }
    
    @RequestMapping(value = "load_engineinfo", method = RequestMethod.GET)
    @ResponseBody
	public HashMap<String, Object> load_engineinfo(
			@RequestParam(value = "id", required=true) long p_id) {
    	System.out.printf("============>load_engineinfo\n");
    	
    	HashMap result = new HashMap<String, Object>();
    	
    	try {
    		Engine engine = engineService.getEngine(p_id);
    		
    		HashMap<String, Object> data = new HashMap<>();
    		data.put("ID", engine.getId());
    		data.put("NAME", engine.getName());
    		data.put("IP", engine.getIp());
    		data.put("PORT", engine.getPort());
    		data.put("CLUSTER_ID", engine.getHadoopClusterId());
    		data.put("CLUSTER_NAME", hadoopClusterAdminService.getHadoopCluster(engine.getHadoopClusterId()).getName());
    		data.put("PERMISSION", engine.getPermission());
    		data.put("ISPUBLIC", engine.getIsPublic());
    		result.put("data", data);
    		
    		result.put("success", "true");
		} catch (Exception e) {
			e.getStackTrace();
			result.put("success", "failed");
		}
    	return result;
	}

	@RequestMapping(value = "update_engineinfo", method = RequestMethod.GET)
	@ResponseBody
	public HashMap<String, Object> update_engineinfo(HttpServletRequest req, HttpServletResponse resp
  		, @RequestParam(value = "id", required=true) long p_id
  		, @RequestParam(value = "name", required=true) String p_name
  		, @RequestParam(value = "engineIP", required=true) String p_engineIP
  		, @RequestParam(value = "enginePort", required=true) String p_enginePort
  		, @RequestParam(value = "hadoopClusterId", required=true) long p_hadoopClusterId
  		, @RequestParam(value = "isPublic", required=true) long p_isPublic
  		, @RequestParam(value = "permission", required=true) String p_permission
  		) throws Exception {
		System.out.printf("============>update_engineinfo\n");
		
		HashMap result = new HashMap<String, Object>();
		
		try {
			Engine reqEngine = new Engine();
			reqEngine.setId(p_id);
			reqEngine.setName(p_name);
			reqEngine.setIp(p_engineIP);
			reqEngine.setPort(p_enginePort);
			reqEngine.setHadoopClusterId(p_hadoopClusterId);
			reqEngine.setIsPublic(p_isPublic);
			reqEngine.setPermission(p_permission);
			
			if(engineService.updateEngine(reqEngine) == true){
				result.put("success", "true");
			}
		} catch (Exception e) {
			e.getStackTrace();
			result.put("success", "failed");
		}
		return result;
	}
}