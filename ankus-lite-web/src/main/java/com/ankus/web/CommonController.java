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
package com.ankus.web;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.CharBuffer;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ankus.model.rest.Authority;
import com.ankus.model.rest.Context;
import com.ankus.model.rest.Engine;
import com.ankus.model.rest.Error;
import com.ankus.model.rest.FileInfo;
import com.ankus.model.rest.FileSystemCommand;
import com.ankus.model.rest.HadoopCluster;
import com.ankus.model.rest.Response;
import com.ankus.model.rest.SecurityLevel;
import com.ankus.provider.fs.FileSystemService;
import com.ankus.util.ExceptionUtils;
import com.ankus.web.admin.HadoopClusterAdminService;
import com.ankus.web.configuration.ConfigurationManager;
import com.ankus.web.core.ConfigurationHelper;
import com.ankus.web.core.LocaleSupport;
import com.ankus.web.core.RemoteService;
import com.ankus.web.designer.DesignerService;
import com.ankus.web.engine.EngineService;
import com.ankus.web.fs.HdfsBrowserController;
import com.ankus.web.member.Member;
import com.ankus.web.member.MemberService;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.helpers.MessageFormatter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.ankus.web.common.util.Util_tajo_n_shell;
import com.sshtools.j2ssh.SftpClient;
import com.sshtools.j2ssh.SshClient;
import com.sshtools.j2ssh.authentication.AuthenticationProtocolState;
import com.sshtools.j2ssh.authentication.PasswordAuthenticationClient;
import com.sshtools.j2ssh.connection.ChannelOutputStream;
import com.sshtools.j2ssh.session.SessionChannelClient;
import com.sshtools.j2ssh.transport.IgnoreHostKeyVerification;

/**
 * 인덱스 페이지 및 기본적인 페이지 이동 기능을 제공하는 컨트롤러.
 */

@Controller
@RequestMapping("/")
public class CommonController extends LocaleSupport {
    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(CommonController.class);


    @Autowired
     private MemberService memberService;
    
    /**
     * Workflow Engine 정보를 얻기 위한 Engine Service.
     */
    @Autowired
    private EngineService engineService;
    
    /**
     * Remote Service Lookup Service.
     */
    @Autowired
    private RemoteService lookupService;
    
    /**
     * Designer Service
     */
    @Autowired
    private DesignerService designerService;
    
    /**
     * Hadoop Cluster 정보를 얻기 위한 Hadoop Cluster Admin Service.
     */
    @Autowired
    private HadoopClusterAdminService hadoopClusterAdminService;
    
    @Autowired
    private MessageSource pMSG;
    
    
	final String expr_result_file = "result.csv";    // 각항(워크플로)의 결과 파일
	final String expr_result_path = "/expression"; // 산정식 결과  저장 경로
    
    
    /*
	 * db config 정보
	 *  2016.01.06
	 *
	 *  by shm7255@onycom.com

	@Value("${jdbc.driver}")
	public String jdbc_driver;

	@Value("${jdbc.url}")
	public String jdbc_url;

	@Value("${jdbc.username}")
	public String jdbc_username;

	@Value("${jdbc.password}")
	public String jdbc_password;    
	 */

	@Value("${main.scheduler_exec}")
	public String main_scheduler_exec;    
	
    /**
     * 인덱스 페이지로 이동한다.
     *
     * @return Model And View
     */
 /*   @RequestMapping(method = RequestMethod.GET)
    public ModelAndView index() {
        ModelAndView mav = new ModelAndView("/index");
        mav.addObject("locale", ConfigurationHelper.getHelper().get("application.locale", "English"));
        mav.addObject("mode", ConfigurationHelper.getHelper().get("application.mode", "development"));

        mav.addObject("version", ConfigurationHelper.getHelper().get("version"));
        mav.addObject("timestamp", ConfigurationHelper.getHelper().get("build.timestamp"));
        mav.addObject("buildNumber", ConfigurationHelper.getHelper().get("build.number"));
        mav.addObject("revision", ConfigurationHelper.getHelper().get("revision.number"));
        mav.addObject("buildKey", ConfigurationHelper.getHelper().get("build.key"));
        return mav;
    }
 */ 
	@RequestMapping(value = "user_info/get", method = RequestMethod.GET)
//    @ResponseStatus(HttpStatus.OK)
//    @ResponseBody
    public void get_userinfo(HttpServletRequest req, HttpServletResponse resp
    		, @RequestParam(value = "method", required=true) String method
    		, @RequestParam(value = "username", required=true) String username
    		) throws Exception {
    	// key와 value로 구성되어있는 HashMap 생성.
		
//		System.out.printf("============>get_userinfo\n");
		
    	PrintWriter out = null;
		out = resp.getWriter();
		
    	String sreq_username  = username;
    	String str_method = method;
//    	str_method = req.getParameter("method");
//    	sreq_username = req.getParameter("username");
    	
    	try{
	    	JSONObject userinfo = new JSONObject();
			JSONObject data = new JSONObject();
			
	    	if(str_method.equals("get"))
	    	{
	    		ArrayList<HashMap<String, Object>> rs = memberService.select_sql("SELECT * FROM [USER] WHERE USERNAME='" + sreq_username +"'");
	    		
		        if (rs.size()>0)
		        {
			        data.put("USERNAME", (String)rs.get(0).get("username"));
			        data.put("PASSWD", (String)rs.get(0).get("passwd"));
			        data.put("NAME", (String)rs.get(0).get("name"));
			        data.put("EMAIL", (String)rs.get(0).get("email"));	
		        }	      
		        userinfo.put("success", "true");
		        userinfo.put("data", data);
		        
	    	}
	    	else
	    	{
	    		String str_name = "", str_passwd="", str_email= "";
	    		str_name = req.getParameter("name");
	    		str_passwd = req.getParameter("passwd");
	    		str_email = req.getParameter("email");
	        	
	    		String update_query="";
				update_query = "UPDATE [USER] SET PASSWD='" + str_passwd + "',";
				//update_query += "NAME='" + str_name + "',";
				update_query += "EMAIL='" + str_email + "' ";
				update_query += "WHERE USERNAME = '" + sreq_username + "'";
				System.out.println(update_query);
				int rtn = memberService.update_sql(update_query);
				
				if(rtn >= 0)
				{
					userinfo.put("success", "true");
				}
				else
				{
					userinfo.put("success", "fail");
				}
	    	}	        
	      	out.print(userinfo);
	        //req.setAttribute("jsonStr", userinfo);
//	        System.out.println(userinfo);
	      	        
	    }
    	catch(Exception e)
    	{                                                    // 예외가 발생하면 예외 상황을 처리한다.
	    	System.out.println(e.toString());
    	}
    }
	
	@RequestMapping(value = "admin/hadoop/update_a_cluster", method = RequestMethod.GET)
	public void update_a_cluster(HttpServletRequest req, HttpServletResponse resp
  		, @RequestParam(value = "id", required=true) String p_id
  		, @RequestParam(value = "name", required=true) String p_name
  		, @RequestParam(value = "namenodeProtocol", required=true) String p_namenodeProtocol
  		, @RequestParam(value = "namenodeIP", required=true) String p_namenodeIP
  		, @RequestParam(value = "namenodePort", required=true) String p_namenodePort
  		, @RequestParam(value = "jobTrackerIP", required=true) String p_jobTrackerIP
  		, @RequestParam(value = "jobTrackerPort", required=true) String p_jobTrackerPort
  		, @RequestParam(value = "namenodeConsole", required=true) String p_namenodeConsole
  		, @RequestParam(value = "jobTrackerConsole", required=true) String p_jobTrackerConsole
  		, @RequestParam(value = "namenodeMonitoringPort", required=true) String p_namenodeMonitoringPort
  		, @RequestParam(value = "jobTrackerMonitoringPort", required=true) String p_jobTrackerMonitoringPort
  		) throws Exception {
  	// key와 value로 구성되어있는 HashMap 생성.
		
//		System.out.printf("============>update_a_cluster\n");
		
    	PrintWriter out = resp.getWriter();
    	
    	Connection conn = null;                                        // null로 초기화 한다.
    	String target_id  = "";
    	String name = "";
    	String protocol = "", namenode_ip = "", namenode_port="",
    			jobtrackerIP= "", jobtrackerPORT= "", namenodeConsole="",
    			jobtrackerConsole="", namenodeMonitorPort="",jobtrackerMonitorPort="";
    			
    	try
    	{
	    	// 사용자 계정의 패스워드
	    	target_id = p_id;
	    	
	    	name = p_name;
	    	protocol = p_namenodeProtocol;
	    	
	    	namenode_ip = p_namenodeIP;
	    	namenode_port = p_namenodePort;
	    	
	    	jobtrackerIP = p_jobTrackerIP;
	    	jobtrackerPORT = p_jobTrackerPort;
	    	
	    	namenodeConsole = p_namenodeConsole;
	    	jobtrackerConsole = p_jobTrackerConsole;
	    
	    	namenodeMonitorPort = p_namenodeMonitoringPort;
	    	jobtrackerMonitorPort = p_jobTrackerMonitoringPort;
	    	
			String update_query="";
			update_query = "UPDATE ADMIN_HADOOP_CLUSTER SET name='" + name + "',";
			update_query += "NN_PROTOCOL='" + protocol + "',";
			update_query += "NN_IP='" + namenode_ip + "',";
			update_query += "NN_PORT=" + Integer.parseInt(namenode_port) + ",";
			
			//update_query += "HDFS_URL='" + protocol + "://" + namenode_ip +":" + namenode_port+ "',";
			update_query += "HDFS_URL='" + protocol  + namenode_ip +":" + namenode_port+ "',";
			
			update_query += "JT_IP='" + jobtrackerIP + "',";
			update_query += "JT_PORT=" + Integer.parseInt(jobtrackerPORT) + ",";
			
			update_query += "NN_CONSOLE='" + namenodeConsole + "',";
			update_query += "JT_CONSOLE='" + jobtrackerConsole + "',";
			
			update_query += "JT_MONITORING_PORT=" + Integer.parseInt(jobtrackerMonitorPort) + ",";
			update_query += "NN_MONITORING_PORT=" + Integer.parseInt(namenodeMonitorPort) + "";
			update_query += " WHERE ID = " + target_id;
			
//			System.out.println(update_query);
			
			int rtn = memberService.update_sql(update_query);
			JSONObject data = new JSONObject();
			if(rtn >= 0)
			{
				data.put("success", "true");
		        out.print(data);
			}
			else
			{
				data.put("success", "failed");
				req.setAttribute("jsonStr", data);
		        out.print(data);
			}
	    }
    	catch(Exception e)
    	{                                                    // 예외가 발생하면 예외 상황을 처리한다.
	    	System.out.println(e.toString());
    	}
    }

	@RequestMapping(value = "admin/hadoop/check_enginewithCluster", method = RequestMethod.GET)
	public void check_enginewithCluster(HttpServletRequest req, HttpServletResponse resp
  		, @RequestParam(value = "id", required=true) String p_id
  		) throws Exception {
		
//		System.out.printf("============>check_enginewithCluster\n");
		
    	PrintWriter out = resp.getWriter();
    	
    	String sReqid  = "";
    	
    	try{
	    	sReqid = p_id;
	    	
	    	ArrayList<HashMap<String, Object>> rs = memberService.select_sql("SELECT COUNT(*) AS RC , MAX(NAME) AS NAME FROM ENGINE WHERE CLUSTER_ID = " + sReqid);
	
			JSONObject data = new JSONObject();
	        if(rs.size()>0)
	        {
		        data.put("rc", (String)rs.get(0).get("RC"));
		        data.put("eng_name", (String)rs.get(0).get("NAME"));
	        }
	        //JSONObject spec = new JSONObject();
	        //spec.put("data", data);
	        
	        JSONObject match_result = new JSONObject();
	        match_result.put("success", "true");
	        match_result.put("data", data);
	        
	        req.setAttribute("jsonStr", match_result);
	        System.out.println(match_result);
	        out.print(match_result);	
	    }
    	catch(Exception e)
    	{                                                    // 예외가 발생하면 예외 상황을 처리한다.
	    	System.out.println(e.toString());
    	}
	}

	@RequestMapping(value = "mrjar/get", method = RequestMethod.GET)
	public void get_mrjar(HttpServletRequest req, HttpServletResponse resp
  		, @RequestParam(value = "method", required=true) String method
  		, @RequestParam(value = "group", required=false) String p_group
  		, @RequestParam(value = "artifact", required=false) String p_artifact
  		, @RequestParam(value = "version", required=false) String p_version
  		, @RequestParam(value = "code", required=false) String p_code
  		, @RequestParam(value = "state", required=false) String p_state
  		) throws Exception {
		
//		System.out.printf("============>mrjar/get\n");		
		
    	PrintWriter out = resp.getWriter();
           
    	String str_group  = "A01";    	
    	String str_method = "";
    	str_method = method;    	
    	
    	try{
	    	JSONObject JARversion = new JSONObject();
						 
			System.out.println("--------->" + str_method);			 
			 
			if("get".equals(str_method))
	    	{
				ArrayList<HashMap<String, Object>> rs = memberService.select_sql("SELECT  CODE, CODENAME,  VERCHECK  FROM  ANKUS_CODE WHERE CODE <> 0 AND CODEGROUP ='" + str_group +"'");	
		        JSONArray arr = new JSONArray();
		      
//		        while (rs.size()>0)
		        for(HashMap<String, Object> m : rs)
		        {		        
		        	String code = (String)m.get("CODE");
		        	String codename = (String)m.get("CODENAME");
		        	String state = (String)m.get("VERCHECK");
//		        	String code = (String)rs.get(0).get("CODE");
//		        	String codename = (String)rs.get(0).get("CODENAME");
//		        	String state = (String)rs.get(0).get("VERCHECK");
		        	
		        	String [] array = codename.split(":");		        	
		        	String group = array[0];
			        String artifact = array[1];
			        String version = array[2];	
			        		        			        
		        	 JSONObject data = new JSONObject();
		        	 
			        data.put("CODE", code);
			        data.put("CODENAME", codename);		
			        data.put("GROUP", group);		
			        data.put("ARTIFACT", artifact);		
			        data.put("VERSION", version);	
			        data.put("STATE", state);
			        
			        if(data != null){
			        arr.add(data);
			        }
		        }	      
		        JARversion.put("success", "true");
		        JARversion.put("data", arr);		        
	    	}	    	
	    	else if("update".equals(str_method))
	    	{
	    		String str_code = p_code;	    	
	    		String str_state = p_state;    	
	        	
	    		String before_query = "";
	    		before_query = "UPDATE ANKUS_CODE SET VERCHECK='N'";
	    		before_query  += "WHERE CODEGROUP ='" + str_group +"'";
	    		memberService.update_sql(before_query);    		
	    		
	    		String update_query="";
				update_query = "UPDATE ANKUS_CODE SET VERCHECK='" + str_state + "'";				
				update_query += "WHERE CODEGROUP ='" + str_group +"'";
				update_query += "AND CODE ='" + str_code +"'";
				System.out.println(update_query);
				int rtn = memberService.update_sql(update_query);
				
				if(rtn >= 0)
				{
					JARversion.put("success", "true");
				}
				else
				{
					JARversion.put("success", "fail");
				}
	    	}else if("gubun".equals(str_method)){
	    		
	    		String selectQuery = "";
	    		
	    		selectQuery = "SELECT  CODENAME  FROM  ANKUS_CODE ";
	    		selectQuery  += "WHERE CODEGROUP ='" + str_group +"'";
	    		selectQuery  += " AND VERCHECK ='Y'";
	    		
	    		ArrayList<HashMap<String, Object>> rs = memberService.select_sql(selectQuery);	
	    		JSONObject data = new JSONObject();	
	    		
		        if (rs.size()>0)
		        {		            
		        	String codename = (String)rs.get(0).get("CODENAME");		        				        
			        data.put("CODENAME_VAR", codename);		
		        }
		        
		        JARversion.put("success", "true");		       
		        JARversion.put("data", data);
		        
	    	}else if("add".equals(str_method))
	    	{	    		
	    		String group = p_group;	
	    		String artifact = p_artifact;	
	    		String version = p_version;
	    		String str_codename = group + ":" + artifact + ":" + version;	    
	        		    		
	    		String add_query="";
	    		add_query = "INSERT INTO ANKUS_CODE (SEQ, CODEGROUP, GROUPNAME, CODE, CODENAME, DESCRIPTION, VERCHECK, CREATE_DT, MODIFY_DT)";			
	    		add_query += " VALUES ( (SELECT IFNULL(MAX(SEQ),0)+1 FROM ANKUS_CODE AS TMB_ANKUS),'A01','JAR',(SELECT IFNULL(MAX(CODE),0)+1 FROM ANKUS_CODE AS TMB_ANKUS WHERE CODEGROUP='A01'),'" + str_codename + " ','','N',DATE_FORMAT(CURRENT_DATE(),'%Y%m%d'),'')";	    
				System.out.println(add_query);
				int rtn = memberService.insert_sql(add_query);
				
				if(rtn >= 0)
				{
					JARversion.put("success", "true");
				}
				else
				{
					JARversion.put("success", "fail");
				}
	    	}else if("edit".equals(str_method)){
	    		String str_code = p_code;
	    		String group = p_group;	
	    		String artifact = p_artifact;	
	    		String version = p_version;
	    		String str_codename = group + ":" + artifact + ":" + version;	       	
	        		    			    		
	    		String update_query="";
				update_query = "UPDATE ANKUS_CODE SET CODENAME='" + str_codename + "'";				
				update_query += "WHERE CODEGROUP ='" + str_group +"'";
				update_query += "AND CODE ='" + str_code +"'";
				System.out.println(update_query);
				int rtn = memberService.update_sql(update_query);
				
				if(rtn >= 0)
				{
					JARversion.put("success", "true");
				}
				else
				{
					JARversion.put("success", "fail");
				}
	    	}else if("delete".equals(str_method)){
	    		String str_code = p_code;
	    			        		    			    		
	    		String update_query="";
				update_query = "DELETE FROM ANKUS_CODE WHERE CODE='" + str_code + "' AND CODEGROUP='A01'";				
				System.out.println(update_query);
				int rtn = memberService.delete_sql(update_query);
				
				if(rtn >= 0)
				{
					JARversion.put("success", "true");
				}
				else
				{
					JARversion.put("success", "fail");
				}
	    	}
	      	out.print(JARversion);
	        System.out.println(JARversion);
	      	        
	    }
    	catch(Exception e)
    	{                                                    // 예외가 발생하면 예외 상황을 처리한다.
	    	System.out.println(e.toString());
    	}
	}

	/*
	 * removed 2017-06-11
	@RequestMapping(value = "wfimport/get", method = RequestMethod.GET)
	public void get_wfimport(HttpServletRequest req, HttpServletResponse resp
  		, @RequestParam(value = "name", required=true) String name
  		) throws Exception {
		
//		System.out.printf("============>wfimport/get\n");
		
    	PrintWriter out = resp.getWriter();
    	
    	String str_name = name; 
    	
    	String str_tree_id = "";	
    	String str_wf_id = "";	
    	String str_wfxml = "";
		String str_dsxml = "";
    	
    	try{
	    	JSONObject JARversion = new JSONObject();
						
			Configuration conf = new Configuration();				
			//conf.set("fs.default.name", "hdfs://localhost:9000");
			conf.set("fs.default.name", "hdfs://server:9000");
			FileSystem dfs = FileSystem.get(conf);			
			Path filenamePath = new Path("/temp/"+str_name);			
			StringBuilder sb=new StringBuilder();
			BufferedReader bfr=new BufferedReader(new InputStreamReader(dfs.open(filenamePath)));  
			String str = null;
			
			 while ((str = bfr.readLine())!= null) {
				 sb.append(str);
				 sb.append("\n");				 
  	         }		
			 String [] str_xml = sb.toString().split("xx_srt_workflow_xx");
			 str_wfxml = str_xml[0];	
			 str_dsxml = str_xml[1];	
			 
			 ArrayList<HashMap<String, Object>> rs = memberService.select_sql("SELECT MAX(ID) AS [ID] FROM TREE");
			 
			 if(rs.size()>0){
				 str_tree_id = (String)rs.get(0).get("ID");					
			 }
			 
			 PreparedStatement pstmt = memberService.prepareStatement("INSERT INTO TREE ( [ID], NAME, TREE, NODE, ROOT, USERNAME, PARENT_ID ) VALUES ( ?, ?, 'WORKFLOW','ITEM', 0, 'admin', 1 )" );
			 pstmt.setString(1, str_tree_id);
			 pstmt.setString(2, str_name);
			 pstmt.executeUpdate();
			 
			 rs = memberService.select_sql("SELECT MAX(ID) AS [ID] FROM WORKFLOW");
			 
			 if (rs.size()>0){
				 str_wf_id = (String)rs.get(0).get("ID");					
			 }
			 
			 pstmt = memberService.prepareStatement("INSERT INTO WORKFLOW ( [ID], WORKFLOW_ID, NAME, DESCRIPTION, VARIABLE, WORKFLOW_XML, DESIGNER_XML, CREATE_DT, STATUS, TREE_ID, USERNAME ) VALUES ( ?, CONCAT('WF_',DATE_FORMAT(CURRENT_DATE(),'%Y%m%d'),'_',FLOOR(RAND()*1000000000)), ?,'',NULL, ?, ?, NOW(), 'REGISTERED',?, 'admin' )" );
			 pstmt.setString(1, str_wf_id);
			 pstmt.setString(2, str_name);
			 pstmt.setString(3, str_wfxml);
			 pstmt.setString(4, str_dsxml);
			 pstmt.setString(5, str_tree_id);
			 pstmt.executeUpdate();
			 
			 dfs.delete(filenamePath, true);
			 
	    }
    	catch(Exception e)
    	{                                                    // 예외가 발생하면 예외 상황을 처리한다.
	    	System.out.println(e.toString());
    	}
	}
	*/
	
	// 2016-03-08 hadoop append api 
	@RequestMapping(value = "/addline", method = RequestMethod.POST)
	public void addline(HttpServletRequest req, HttpServletResponse resp
	  	, @RequestParam(value = "hadoopurl", required=true) String hadoopurl
	  	, @RequestParam(value = "file", required=true) String file
	  	, @RequestParam(value = "data", required=true) String data
	  	, @RequestParam(value = "account", required=false) String account
  		) throws Exception {
		
//		System.out.printf("============>addline\n");
		
		Date ct = new Date();
		
		String year = String.format("%04d", ct.getYear()+1900);
		String month = String.format("%02d", ct.getMonth()+1);
		String day = String.format("%02d", ct.getDate());
		String hour = String.format("%02d", ct.getHours());
		String minute = String.format("%02d", ct.getMinutes());
		String second = String.format("%02d", ct.getSeconds());

		file = file.replaceAll("\\{year\\}", year).replaceAll("\\{month\\}", month).replaceAll("\\{day\\}", day).replaceAll("\\{hour\\}", hour).replaceAll("\\{minute\\}", minute).replaceAll("\\{second\\}", second);
		data = data.replaceAll("\\{year\\}", year).replaceAll("\\{month\\}", month).replaceAll("\\{day\\}", day).replaceAll("\\{hour\\}", hour).replaceAll("\\{minute\\}", minute).replaceAll("\\{second\\}", second).replaceAll("\\\\r", "\r").replaceAll("\\\\n", "\n").replaceAll("\\\\t", "\t");
		
		try {
			Configuration conf = new Configuration();
			
			conf.set("fs.hdfs.impl", org.apache.hadoop.hdfs.DistributedFileSystem.class.getName());
			conf.set("fs.file.impl", org.apache.hadoop.fs.LocalFileSystem.class.getName());			  
//			conf.set("fs.default.name", hadoopurl, account);
//			FileSystem dfs = FileSystem.get(conf);
			FileSystem dfs = null;
			if(account==null) dfs = FileSystem.get(new URI(hadoopurl), conf);
			else dfs = FileSystem.get(new URI(hadoopurl), conf, account);
			
			Path filePath = new Path(file);
			if(dfs.exists(filePath)) { // append
				FSDataOutputStream out = dfs.append(filePath);
				out.writeBytes(data);
				out.close();
			}
			else
			{
				  FSDataOutputStream out = dfs.create(filePath);
				  out.writeBytes(data);
				  out.close();
			}

			PrintWriter out = resp.getWriter();
			out.write(data);
			
		} catch (Exception e) {
		
			System.out.print(e.getMessage());
		}
	}
	
	// 2016-03-08 hadoop append api 
	@RequestMapping(value = "/addlineget", method = RequestMethod.GET)
	public void addlineget(HttpServletRequest req, HttpServletResponse resp
	  	, @RequestParam(value = "hadoopurl", required=true) String hadoopurl
	  	, @RequestParam(value = "file", required=true) String file
	  	, @RequestParam(value = "data", required=true) String data
	  	, @RequestParam(value = "account", required=false) String account
  		) throws Exception {
		
//		System.out.printf("============>addline\n");

		Date ct = new Date();
		
		String year = String.format("%04d", ct.getYear()+1900);
		String month = String.format("%02d", ct.getMonth()+1);
		String day = String.format("%02d", ct.getDate());
		String hour = String.format("%02d", ct.getHours());
		String minute = String.format("%02d", ct.getMinutes());
		String second = String.format("%02d", ct.getSeconds());

		file = file.replaceAll("\\{year\\}", year).replaceAll("\\{month\\}", month).replaceAll("\\{day\\}", day).replaceAll("\\{hour\\}", hour).replaceAll("\\{minute\\}", minute).replaceAll("\\{second\\}", second);
		data = data.replaceAll("\\{year\\}", year).replaceAll("\\{month\\}", month).replaceAll("\\{day\\}", day).replaceAll("\\{hour\\}", hour).replaceAll("\\{minute\\}", minute).replaceAll("\\{second\\}", second).replaceAll("\\\\r", "\r").replaceAll("\\\\n", "\n").replaceAll("\\\\t", "\t");
		
		try {
			Configuration conf = new Configuration();
			conf.set("fs.hdfs.impl", org.apache.hadoop.hdfs.DistributedFileSystem.class.getName());
			conf.set("fs.file.impl", org.apache.hadoop.fs.LocalFileSystem.class.getName());			  
//			conf.set("fs.default.name", hadoopurl, account);
//			FileSystem dfs = FileSystem.get(conf);
			FileSystem dfs = null;
			if(account==null) dfs = FileSystem.get(new URI(hadoopurl), conf);
			else dfs = FileSystem.get(new URI(hadoopurl), conf, account);
			
			Path filePath = new Path(file);
			if(dfs.exists(filePath)) { // append
				FSDataOutputStream out = dfs.append(filePath);
				out.writeBytes(data);
				out.close();
			}
			else
			{
				  FSDataOutputStream out = dfs.create(filePath);
				  out.writeBytes(data);
				  out.close();
			}

			PrintWriter out = resp.getWriter();
			out.write(data);
			
		} catch (Exception e) {
		
			System.out.print(e.getMessage());
		}
	}
	
	// 2016-04-20 Tajo REST 관련 API 
	@RequestMapping(value = "/get_tajotables") //(ip,port,database)
	@ResponseBody
	public HashMap<String, Object> get_tajotables(HttpServletRequest req, HttpServletResponse resp
					, @RequestParam(value = "ip", required=true) String ip
					, @RequestParam(value = "port", required=false, defaultValue="26002") Long port
					, @RequestParam(value = "database", required=true) String database
			  		) {
		
		HashMap<String, Object> mv = new HashMap<String, Object>();
		
		try {
			mv.put("code",0);
			mv.put("data",Util_tajo_n_shell.tajo_getTables(ip, port, database));
			mv.put("message","success");
		} catch(Exception e) {
			mv.put("code",500);
			mv.put("message",e.getMessage());
			
		}
		
		return mv;
	}
	
	@RequestMapping(value = "/get_tajodatabases") //(ip,port)
	@ResponseBody
	public HashMap<String, Object> get_tajodatabases(HttpServletRequest req, HttpServletResponse resp
					, @RequestParam(value = "ip", required=true) String ip
					, @RequestParam(value = "port", required=false, defaultValue="26002") Long port
			  		) {
		
		HashMap<String, Object> mv = new HashMap<String, Object>();
		
		try{
			mv.put("code",0);
			mv.put("data",Util_tajo_n_shell.tajo_getDatabases(ip, port));
			mv.put("message","success");
		}
		catch(Exception e) {
			mv.put("code",500);
			mv.put("message",e.getMessage());
		}
		
		return mv;
	}
	@RequestMapping(value = "/run_tajoQuery")//(ip,port,database,sql)
	@ResponseBody
	public HashMap<String, Object> run_tajoQuery(HttpServletRequest req, HttpServletResponse resp
					, @RequestParam(value = "ip", required=true) String ip
					, @RequestParam(value = "port", required=false, defaultValue="26002") Long port
					, @RequestParam(value = "database", required=true) String database
					, @RequestParam(value = "sql", required=true) String sql
			  		) {
		
		HashMap<String, Object> mv = new HashMap<String, Object>();
		
		Connection conn = null;

		try {
			conn = Util_tajo_n_shell.tajo_connect(ip, port, database);
		} catch(Exception e)
		{
			mv.put("code",500);
			mv.put("message",e.getMessage());
			return mv;
		}
		
		try {
			ResultSet rs = Util_tajo_n_shell.tajo_query(conn, sql);
	
			ArrayList<Object> datas = new ArrayList<Object>();
			boolean bfirst = true;
			int fcnt = 0;
			while(rs.next())
			{
				if(bfirst)
				{
					ArrayList<String> flds = new ArrayList<String>();
					
					ResultSetMetaData meta = rs.getMetaData();
					
//					System.out.printf("sql=%s, cnt=%d\n", sql, meta.getColumnCount());
					for(int i=1; i<=meta.getColumnCount(); i++)
					{
						String n = meta.getColumnName(i);
//						System.out.printf("field=%s, idx=%d\n", n, i);
	
						flds.add(meta.getColumnName(i));
					}
					mv.put("fields", flds);
					fcnt = meta.getColumnCount();
				}
	
				ArrayList<Object> cols = new ArrayList<Object>();
				for(int i=1; i<=fcnt; i++)
				{
					cols.add(rs.getObject(i));
				}
				datas.add(cols);
	
			}
			rs.close();
			conn.close();
			mv.put("code",0);
			mv.put("data",datas);
			mv.put("message","success");
		}
		catch(Exception e) {
			mv.put("code",500);
			mv.put("message",e.getMessage());
		}
		
		return mv;
	}

	@RequestMapping(value = "/create_tajoDatabase")//(ip,port,database)
	@ResponseBody
	public HashMap<String, Object> create_tajoDatabase(HttpServletRequest req, HttpServletResponse resp
					, @RequestParam(value = "ip", required=true) String ip
					, @RequestParam(value = "port", required=false, defaultValue="26002") Long port
					, @RequestParam(value = "database", required=true) String database
			  		) {
		
		HashMap<String, Object> mv = new HashMap<String, Object>();
		
		try {
			boolean issuccess = Util_tajo_n_shell.tajo_createDatabase(ip, port, database);
			
			if(issuccess)
			{
				mv.put("code",0);
				mv.put("message","success");
			}
			else
			{
				mv.put("code",500);
				mv.put("message","fail");
			}
		}
		catch(Exception e) 
		{
			mv.put("code",500);
			mv.put("message", e.getMessage());
		}
		
		return mv;
	}

	@RequestMapping(value = "/create_tajoTable") //(ip,port,database,createSql)
	@ResponseBody
	public HashMap<String, Object> create_tajoTable(HttpServletRequest req, HttpServletResponse resp
					, @RequestParam(value = "ip", required=true) String ip
					, @RequestParam(value = "port", required=false, defaultValue="26002") Long port
					, @RequestParam(value = "database", required=true) String database
					, @RequestParam(value = "createSql", required=true) String createSql
			  		) {
		
		HashMap<String, Object> mv = new HashMap<String, Object>();
		
		try {
			boolean issuccess = Util_tajo_n_shell.tajo_createTable(ip, port, database, createSql);
			
			if(issuccess)
			{
				mv.put("code",0);
				mv.put("message","success");
			}
			else
			{
				mv.put("code",500);
				mv.put("message","fail");
			}
		} catch(Exception e){
			mv.put("code",500);
			mv.put("message",e.getMessage());
		}
		
		return mv;
	}
	
	@RequestMapping(value = "/del_tajoTable") //(ip,port,database,table)
	@ResponseBody
	public HashMap<String, Object> del_tajoTable(HttpServletRequest req, HttpServletResponse resp
					, @RequestParam(value = "ip", required=true) String ip
					, @RequestParam(value = "port", required=false, defaultValue="26002") Long port
					, @RequestParam(value = "database", required=true) String database
					, @RequestParam(value = "table", required=true) String table
			  		) {
		
		HashMap<String, Object> mv = new HashMap<String, Object>();
		
		try {
			boolean issuccess = Util_tajo_n_shell.tajo_dropTable(ip, port, database, table);
			
			if(issuccess)
			{
				mv.put("code",0);
				mv.put("message","success");
			}
			else
			{
				mv.put("code",500);
				mv.put("message","fail");
			}
		} catch(Exception e){
			mv.put("code",500);
			mv.put("message",e.getMessage());
		}
		
		return mv;
	}
	
	
	@RequestMapping(value = "/del_tajoDatabase") //(ip,port,database)
	@ResponseBody
	public HashMap<String, Object> del_tajoDatabase(HttpServletRequest req, HttpServletResponse resp
					, @RequestParam(value = "ip", required=true) String ip
					, @RequestParam(value = "port", required=false, defaultValue="26002") Long port
					, @RequestParam(value = "database", required=true) String database
			  		) {
		
		HashMap<String, Object> mv = new HashMap<String, Object>();
		
		try {
			boolean issuccess = Util_tajo_n_shell.tajo_dropdatabase(ip, port, database);
			
			if(issuccess)
			{
				mv.put("code",0);
				mv.put("message","success");
			}
			else
			{
				mv.put("code",500);
				mv.put("message","fail");
			}
		} catch(Exception e){
			mv.put("code",500);
			mv.put("message",e.getMessage());
		}
		
		return mv;
	}
	
	ArrayList<HashMap<String, Object>> metainfos = null; // 2016-07-14 : preloading... 
	
	HashMap<String, byte[]> meta_resources = null; // 2016-07-19 : preloading... resource cacheing
	
	// 2016-03-08 algorithm meta info load from jar file 
	@RequestMapping(value = "getmoduleinfos", method = RequestMethod.POST)
	public void getmoduleinfos(HttpServletRequest req, HttpServletResponse resp
	  	, @RequestParam(value = "path", required=false) String path
  		) throws Exception {
		
//		System.out.printf("============>getmoduleinfos\n");
		
		if(path==null) path = ConfigurationHelper.getHelper().get("artifact.cache.path", "/tmp/cache");
		
		if(metainfos==null) metainfos = readmetainfos(path);
		
    	PrintWriter out = null;
		out = resp.getWriter();
		
        ObjectMapper mapper = new ObjectMapper();
        
        out.write(mapper.writeValueAsString(metainfos));
	}	

	// 2016-03-08 get resource from jar file 
	@RequestMapping(value = "getmoduleresource", method = RequestMethod.GET)
	public void getmoduleresource(HttpServletRequest req, HttpServletResponse resp
		, @RequestParam(value = "jarfile", required=true) String jarfile
		, @RequestParam(value = "resource", required=true) String resource
  		) throws Exception {
		
		byte[] data = null;
		
    	int idx = jarfile.lastIndexOf("/");
    	if(idx<0) idx = jarfile.lastIndexOf("\\");
    	jarfile = (idx >= 0 ? jarfile.substring(idx + 1) : jarfile);

//        System.out.printf("============>getmoduleresource(%s:%s)\n", jarfile, resource);
    	
		if(meta_resources!=null) data = meta_resources.get(jarfile+resource);
		
		if(data==null) {
			
	    	String cachePath = ConfigurationHelper.getHelper().get("artifact.cache.path", "/tmp/cache");
			data = readfile(cachePath + "/"+jarfile, resource);
			if(data!=null) {
				if(meta_resources==null) meta_resources = new HashMap<String, byte[]>();
				meta_resources.put(jarfile+resource, data);
			}
		}
        
        if(data==null || data.length<1) return;

//        System.out.printf("============>getmoduleresource(%s:%d)\n", resource, data.length);
        
        BufferedOutputStream output = new BufferedOutputStream(resp.getOutputStream());   
        
        output.write(data);
        output.close();
		
	}	
	
	// --------------------- jar func ....
	// 2016-03-08 meta정보 load 기초함수..
    private ArrayList<HashMap<String, Object>> readmetainfos(String folder)
    {
    
		File path  = new File(folder);
        ObjectMapper mapper = new ObjectMapper();
		ArrayList<HashMap<String, Object>> algorithms = new ArrayList<HashMap<String, Object>>(); 
		
		File[] files = path.isDirectory() ? path.listFiles(): new File[]{path};
		for(File f:files)
		{
			if(f.isFile())
			{
				String fname = f.getAbsolutePath();
				String ext = "";
				int p = fname.lastIndexOf(".");
				if(p>=0) ext = fname.substring(p+1);

				if(ext.equalsIgnoreCase("jar"))
				{
					try {
						byte[] meta = readfile(fname, "res/appinfo.json");
						if(meta==null || meta.length<1) continue; // 2016-06-28 : meta file 없는 jar 파일일 경우 무시.
	                    HashMap<String, Object> metainfo = mapper.readValue(new String(meta), new HashMap<String, Object>().getClass());
	                    
	                    for(HashMap<String, Object> ainfo:(ArrayList<HashMap<String, Object>>)metainfo.get("applist"))
	                    {
	                    	ainfo.put("path", fname);
	                    	ainfo.put("author", metainfo.get("author"));
	                    	ainfo.put("create", metainfo.get("create"));
	                    	ainfo.put("packagename", metainfo.get("packagename"));
	                    	algorithms.add(ainfo);
	                    }

					} catch (IOException e1) {
						// TODO Auto-generated catch block
						e1.printStackTrace();
					}
				}				
			}
		}

		return algorithms;
    }    
    private byte[] readfile(String zipFilePath, String fname) throws IOException {
        ZipInputStream zipIn = new ZipInputStream(new FileInputStream(zipFilePath));
        ZipEntry entry = zipIn.getNextEntry();
        // iterates over entries in the zip file
        
        byte[] read = null;
        
        if(fname.startsWith("/")) fname = fname.substring(1);
        
        while (entry != null) {
            if (!entry.isDirectory()) {
                // if the entry is a file, extracts it
            	if(entry.getName().equals(fname))
            	{
            		read = extractFileRead(zipIn);
            		break;
            	}
            }
            zipIn.closeEntry();
            entry = zipIn.getNextEntry();
        }
        zipIn.close();
        return read;
    	
    }
    
    private byte[] extractFileRead(ZipInputStream zipIn) throws IOException {
    	ByteArrayOutputStream bs = new ByteArrayOutputStream();
        
        byte[] bytesIn = new byte[8192];
        int read = 0;
        while ((read = zipIn.read(bytesIn)) != -1) {
        	bs.write(bytesIn, 0, read);
        }
        return bs.toByteArray();
    }
    
    // 2016-6-20 : scheduled, => repository caching
    
    String lastruntime = "";
    
    @Scheduled(fixedRate=10000)
    public void main_timer() {
    	SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm");
    	
    	ArrayList<HashMap<String, Object>> now = memberService.select_sql("SELECT NVL(MAX([value]),TO_CHAR(now(),'yyyy-mm-dd hh24:mi')) [now] FROM config WHERE LCASE(item)='now'");
    	
    	String ct = df.format(new Date());
    	if (now!=null) ct = (String)now.get(0).get("now");
    	
    	final String runtime = ct;
//		System.out.printf("======> main_timer (%s:%s)\n", runtime, main_scheduler_exec);
    	if(runtime.equals(lastruntime)) return; // 분단위 update... 	
    
    	try {
   		repository_update_exec(runtime);
   		if(Boolean.parseBoolean(main_scheduler_exec)) schedule_check(runtime);
   		
   		lastruntime = runtime;
    	} catch(Exception e)
    	{
    		e.printStackTrace();
    	}
    }
    
    private String getArtifactPath(String groupId, String artifactId, String version) {
        return "/" + StringUtils.replace(groupId, ".", "/") + "/" + artifactId + "/" + version + "/" + artifactId + "-" + version + ".jar";
    }
    
    @Async
    void repository_update_exec(String time)  throws Exception {

//		System.out.printf("======> repository_update_exec start\n", time);
    	
    	
    	try{
	    	String cachePath = ConfigurationHelper.getHelper().get("artifact.cache.path", "/tmp/cache");
	       /*
	    	String workingpath = ConfigurationHelper.getHelper().get("working.path", "/tmp");
	        boolean isCaching = ConfigurationHelper.getHelper().getBoolean("artifact.caching", true);
	        String mavenUrl = ConfigurationHelper.getHelper().get("maven.repository.url", "");
	        if(mavenUrl.isEmpty() || workingpath.isEmpty()) return;

    	String str_group  = "A01";    	
	    	
	        ArrayList<HashMap<String, Object>> rs = memberService.select_sql("SELECT  CODE, CODENAME,  VERCHECK  FROM  ANKUS_CODE WHERE CODE <> 0 AND CODEGROUP ='" + str_group +"'");
	        
	        for (HashMap<String, Object> r : rs)
	        {		        
	        	String code = (String)r.get("CODE");
	        	String codename = (String)r.get("CODENAME");
	        	String state = (String)r.get("VERCHECK");
	        	
	        	String [] array = codename.split(":");		        	
	        	String group = array[0];
		        String artifact = array[1];
		        String version = array[2];
		        
		        if(array.length<2) continue;

		        String filename = workingpath + "/" + artifact + "-" + version + ".jar";
		        String cachedFilename = cachePath + "/" + artifact + "-" + version + ".jar";
		        String artifactPath = null;

		        if (isCaching) {
		            artifactPath = cachedFilename;
		        } else {
		            artifactPath = filename;
		        }
		        
		        if (!new File(artifactPath).exists()) {
		            String artifactUrl = mavenUrl + getArtifactPath(group.trim(), artifact.trim(), version.trim());
		            HttpClient httpClient = new HttpClient();
		            GetMethod method = new GetMethod(artifactUrl);
		            method.getParams().setParameter(HttpMethodParams.RETRY_HANDLER, new DefaultHttpMethodRetryHandler(1000, false));
		            int statusCode = 0;
		            try {
//		                logger.debug("Artifact [{}]을 다운로드합니다.", artifactUrl);
		                statusCode = httpClient.executeMethod(method);
		            } catch (IOException e) {
		            	e.printStackTrace();
		            	continue;
//		                throw new WorkflowException(ExceptionUtils.getMessage("Artifact '{}'을 다운로드할 수 없습니다.", artifactUrl), e);
		            }

		            if (statusCode != HttpStatus.SC_OK) {
		            	continue;
//		                throw new WorkflowException(ExceptionUtils.getMessage("Artifact '{}'을 다운로드하였으나 정상적으로 다운로드하지 못헀습니다. HTTP 상태 코드는 '{}' 상태 메시지 '{}'", artifactUrl, statusCode, HttpStatusCodeResolver.resolve(statusCode)));
		            }

		            // 다운로드한 파일을 저장하기 위해한 fully qualified file name을 구성한다.
		            FileSystemUtils.testCreateDir(new Path(FileSystemUtils.correctPath(cachePath)));
		            try {
		                InputStream is = method.getResponseBodyAsStream();
		                File outputFile = new File(artifactPath);
		                FileOutputStream fos = new FileOutputStream(outputFile);
		                org.springframework.util.FileCopyUtils.copy(is, fos);
		                logger.info("Artifact [{}]을 다운로드하여 [{}] 파일로 저장하였습니다.", artifactUrl, artifactPath);
//		                return artifactPath;
		            } catch (IOException e) {
		            	continue;
//		                throw new WorkflowException(ExceptionUtils.getMessage("다운로드한 Artifact를 '{}' 파일로 저장할 수 없습니다.", artifactPath), e);
		            }
		        } else {
//		            logger.info("캐쉬에 있는 Artifact [{}]을 사용합니다.", artifactPath);
//		            return artifactPath;
		        }
	        }*/	      
    	
			metainfos = readmetainfos(cachePath); // 2016-07-14 : preloading...
		    
    	} catch (Exception e)
    	{
    		e.printStackTrace();
    	}
    	
//		System.out.printf("======> repository_update_exec end (%s)\n", time);
    }
    
    @Async
    void schedule_check(String time)  throws Exception {
//		System.out.printf("======> schedule_check (%s)\n", time);
		
		// 즉시 실행 스케쥴(config 테이블의  immediate_exec item의  있는 값  
		ArrayList<HashMap<String, Object>> sch = memberService.select_sql("SELECT [id], '' [month], '' [week], '' [day], '' [hour], '' [min], stype, workflow_id, ssh_ip, ssh_port, ssh_id, ssh_pwd, ssh_cmd, state, runtime,'I' enable, (SELECT max([id]) FROM [engine]) engineid, NOW() ct FROM scheduler WHERE id IN (select [value] FROM config WHERE item='immediate_exec')");
		// 스케쥴러
    	ArrayList<HashMap<String, Object>> isch = memberService.select_sql("SELECT *, (SELECT max([id]) FROM [engine]) engineid, NOW() as ct  FROM [SCHEDULER]");

    	sch.addAll(isch); // 스케쥴 합치기.
    	
    	ArrayList<HashMap<String, Object>> runworkflows = new ArrayList<HashMap<String, Object>>(); 
    	
    	//match 되는 schedule 
    	for(HashMap<String, Object> s: sch)
    	{
    		String id  = (String)s.get("id");
    		String month = (String)s.get("month");
    		String week = (String)s.get("week");
    		String day = (String)s.get("day");
    		String hour = (String)s.get("hour");
    		String min = (String)s.get("min");
    		String stype = (String)s.get("stype");
    		String worlflow_id  = (String)s.get("workflow_id");
    		String sship = (String)s.get("ssh_ip");
    		String sshport = (String)s.get("ssh_port");
    		String sshid = (String)s.get("ssh_id");
    		String sshpwd = (String)s.get("ssh_pwd");
    		String sshcmd = (String)s.get("ssh_cmd");
    		String enable = (String)s.get("enable");
    		
//    		System.out.printf("[%s]%s:%s:%s:%s:%s:%s\n", id, month, week, day, hour, min, worlflow_id, enable);
    		
    		Date t = null;
    		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm");
        	try {
    			t = formatter.parse(time);
        	} catch (Exception e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		}
        	
        	// 스케쥴 실핸은 enable 이 Y Or 1 이고 즉시 실행은 I
        	if(!"Y".equalsIgnoreCase(enable) && !"1".equalsIgnoreCase(enable) && !"I".equalsIgnoreCase(enable)) continue; 
        	
        	if(month.length()!=0 && (","+month+",").indexOf(","+(t.getMonth()+1)+",")<0) continue;
        	if(week.length()!=0 && (","+week+",").indexOf(","+t.getDay()+",")<0) continue;
        	if(day.length()!=0 && (","+day+",").indexOf(","+t.getDate()+",")<0) continue;
        	if(hour.length()!=0 && (","+hour+",").indexOf(","+t.getHours()+",")<0) continue;
        	if(min.length()!=0 && (","+min+",").indexOf(","+t.getMinutes()+",")<0) continue;
        	
    		// 스케쥴 조건이 맞으면 추가...
    		runworkflows.add(s);
    	}
    	
    	
    	String ct="", eid="";
    	String workflow_ids = ""; // 실행할 워크 플로우를 모아서 일괄 수행.
    	String workflow_enables = ""; // 실행할 워크 플로우를 모아서 일괄 수행 enable값.
    	String sch_ids = ""; // 실행할스케쥴 
    	
    	for(HashMap<String, Object> w:runworkflows)
    	{
    		// workflow 실행 thread... 생성 및 실행
    		if("W".equalsIgnoreCase((String)w.get("stype")))
    		{
    			eid = (String)w.get("engineid");
    			ct = (String)w.get("ct");
    			// 실행할 워크 플로우 id 추가
    			if(!sch_ids.isEmpty()) sch_ids += ",";
    			sch_ids += (String)w.get("id");
    			
    			String wid = (String)w.get("workflow_id");
    			
    			if((","+workflow_ids+",").indexOf(","+wid+"'")<0)
    			{
    				// 실행할 워크 플로우 id 추가 중복 제거
    				if(!workflow_ids.isEmpty()) workflow_ids += ",";
    				workflow_ids += wid;
    				
    				// 즉시실행, 스케쥴 실행 구분 위해 필요
    				if(!workflow_enables.isEmpty()) workflow_enables += ",";
    				workflow_enables += (String)w.get("enable");
    				
    			}
    		}
    		// Remote 실행...
    		else if("R".equalsIgnoreCase((String)w.get("stype")))
    		{
	       		String sship = (String)w.get("ssh_ip");
	    		String sshport = (String)w.get("ssh_port");
	    		String sshid = (String)w.get("ssh_id");
	    		String sshpwd = (String)w.get("ssh_pwd");
	    		String sshcmd = (String)w.get("ssh_cmd");
    			
//	    		System.out.printf("remote shell exec [%s@%s:%s - [%s]\n", sshid, sship, sshport, sshcmd);
	    		
	    		remoteshell_thread workinfo = new remoteshell_thread((String)w.get("id"), sshid, sshpwd, sship, Integer.parseInt(sshport), sshcmd, (String)w.get("enable")); 
	
	    		Thread work_thread =new Thread(workinfo);
	    		work_thread.start();
    		}
    	}
    	
    	if(!workflow_ids.isEmpty())
    	{
//    		System.out.printf("schedule exec sch_ids[%s], workids=%s\n", sch_ids, workflow_ids);
		
    		workflow_thread workinfo = new workflow_thread(sch_ids, workflow_ids, Long.parseLong(eid), ct, workflow_enables, time+":00");
//    		workflow_thread workinfo = new workflow_thread(sch_ids, workflow_ids, Long.parseLong(eid), ct, workflow_enables, time);
    		
    		Thread work_thread = new Thread(workinfo);
    		work_thread.start();
    		
    	}
    	
    }
   
    // 식약처 전용 개발... 2016-11-22
   
    public double cvtdbl(String v)
    {
    	double dv = 0.0;
    	
    	try {
    		dv = Double.parseDouble(v);
    	}
    	catch(Exception e) {}
    	
    	return dv;
    	
    }
    
	class remoteshell_thread implements Runnable
	{
	    String id;
	    String sshid; 
	    String sshpwd;
	    String sship;
	    int sshport;
	    String sshcmd;
	    String enable;
	    
	    remoteshell_thread(String id, String sshid, String sshpwd, String sship, int sshport, String sshcmd, String enable){
	        this.id=id;
	        this.sshid = sshid;
	        this.sship = sship;
	        this.sshport = sshport;
	        this.sshpwd = sshpwd;
	        this.sshcmd = sshcmd;
	        this.enable = enable;
	    }
	    
		private static final int BUFFER_SIZE = 4096;
    	
	    
/*		int findPatternEndPos(String patt, String log)
		{
			java.util.regex.Matcher m = null;
			try {
			    Pattern pattern = Pattern.compile(patt); 
			    m = pattern.matcher(log);
			    if(m.find()) return m.end();
			    else return -1;
			} catch(Exception e) {
				System.out.println(e.getMessage());
				return -1;
			}
		}

		int findPatternStartPos(String patt, String log)
		{
			java.util.regex.Matcher m = null;
			try {
			    Pattern pattern = Pattern.compile(patt); 
			    m = pattern.matcher(log);
			    if(m.find()) return m.start();
			    else return -1;
			} catch(Exception e) {
				System.out.println(e.getMessage());
				return -1;
			}
		}
*/	   
		
		public SessionChannelClient connect_ssh(String host, int port, String uid, String pwd)
		{
			PasswordAuthenticationClient auth = null;

			try {
				  
			   SshClient client = new SshClient();
			   client.setSocketTimeout(70000);
			   client.connect(host, port, new IgnoreHostKeyVerification());
			   auth = new PasswordAuthenticationClient();
			   auth.setUsername(uid);
			   auth.setPassword(pwd);
			   int result = client.authenticate(auth);
			   
			   if (result != AuthenticationProtocolState.COMPLETE) {
				   
				   	System.out.print("login.fail===\n");
			    	return null;
			   }
			   // SSH 
			   SessionChannelClient session = client.openSessionChannel();
			   session.requestPseudoTerminal("vt100", 80, 25, 0, 0 , "");
			   session.startShell();
			   
			   return session;
			}
			catch (Exception e) {
			   	System.out.println("Exception:"+e.getMessage());
			}
	    	return null;
		}

		public SshClient connect_sshclient(String host, int port, String uid, String pwd)
		{
			PasswordAuthenticationClient auth = null;
			SshClient client = null;

			try {
			   client = new SshClient();
			   client.setSocketTimeout(70000);
			   client.connect(host, port, new IgnoreHostKeyVerification());
			   auth = new PasswordAuthenticationClient();
			   auth.setUsername(uid);
			   auth.setPassword(pwd);
			   int result = client.authenticate(auth);
			   
			   if (result != AuthenticationProtocolState.COMPLETE) {
				   
				   	System.out.print("login.fail===\n");
			    	return null;
			   }
			   
			   return client;
			}
			catch (Exception e) {
			   	System.out.println("Exception:"+e.getMessage());
			}
		   	return null;
		}
		
		public SessionChannelClient getshell(SshClient client)
		{
			try {
				// SSH 채널생성
				SessionChannelClient session = client.openSessionChannel();
				session.requestPseudoTerminal("vt100", 80, 25, 0, 0 , "");
				session.startShell();
				return session;
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return null;
		}

		public SftpClient get_sftp(SshClient client)
		{
			try {
				SftpClient session = client.openSftpClient();
				return session;
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}		return null;
		}
		
		public  String execcmd(SessionChannelClient session, String cmd, String prompt)
		{
			   ChannelOutputStream os = session.getOutputStream();
			   
			   StringBuffer buff = new StringBuffer();
			   byte[] b = new byte[BUFFER_SIZE];

			   try {
				   
				   BufferedReader is = new BufferedReader(new InputStreamReader(session.getInputStream(), "UTF-8"));
				   
				   if(!cmd.isEmpty()) os.write(cmd.getBytes());
				   while(true)
				   {
//					   int cnt = is.read(b);
//					   buff.append(new String(b, 0, cnt));
					   
					   CharBuffer cb = CharBuffer.allocate(BUFFER_SIZE);
					   is.read(cb);
					   cb.flip();
					   
					   buff.append(cb.toString());
					   
					   if(buff.toString().endsWith(prompt)) break;
				   }
			   } catch (Exception e) {
//				   System.out.printf("execcmd(%s):%s\n", cmd, e.getMessage());
				   return buff.toString();
			   }
			return buff.toString();
		}
	    
	    public void run(){
//	    	String sql = String.format("UPDATE SCHEDULER SET STATE='RUNNING',[RUNTIME]=NOW()  WHERE [ID] = %s", id);
	    	String sql = String.format("UPDATE SCHEDULER SET STATE='RUNNING',[RUNTIME]=(SELECT NVL(MAX(CAST([value] AS TIMESTAMP)),NOW()) FROM config WHERE LCASE(item)='now'),ENDTIME=NULL WHERE [ID] = %s", id);
			memberService.update_sql(sql);
			
        	if("I".equalsIgnoreCase(enable))
        	{
				sql = String.format("DELETE FROM CONFIG WHERE item='immediate_exec' AND [value]='%s'", id);
            	memberService.delete_sql(sql);
        	}

			// remote shell 명령 처리...zz
			
			String prompt = " ~]$ ";
			
			if("root".equals(sshid)) prompt = " ~]# ";

			SshClient rclient = connect_sshclient(sship, sshport, sshid, sshpwd);
			
			SessionChannelClient rsession = getshell(rclient);
			
			String result = "FAIL";
			if(rsession!=null)
			{
				String rmsg = execcmd(rsession, "", prompt); // login...
				
				rmsg = execcmd(rsession, sshcmd+"\n", prompt);
				
				try {
				rsession.close();
				} catch(Exception e) {}
				
				rclient.disconnect();
				
//				System.out.printf("log=[%s]\n", rmsg);
				result = "SUCCESS";
			}
//	    	sql = String.format("UPDATE SCHEDULER SET STATE='%s',[RUNTIME]=NOW()  WHERE [ID] = %s", result, id);
	    	sql = String.format("UPDATE SCHEDULER SET STATE='%s',ENDTIME=(SELECT NVL(MAX(CAST([value] AS TIMESTAMP)),NOW()) FROM config WHERE LCASE(item)='now') WHERE [ID] = %s", result, id);
			memberService.update_sql(sql);
	    }	    
	}    
    
	class workflow_thread implements Runnable
	{
	    String sids, ct, wids, enables, wt;
	    Long engineId;
	    workflow_thread(String ids, String wids, Long engineId, String ct, String enables, String wt){
	        this.sids = ids;
	        this.wids = wids;
	        this.engineId = engineId;
	        this.ct = ct;
	        this.enables = enables;
	        this.wt = wt; // 기록 시간..
	    }
	    
	    public void run(){

	    	String success_wids = "";
            Engine engine = engineService.getEngine(engineId);
            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);

            Context context = getContext(engine, "admin");

            FileSystemCommand command = new FileSystemCommand();
            command.putString("path", expr_result_path);
            
            FileInfo finfo = fileSystemService.getFileInfo(context, command);
            
            if(finfo==null || !finfo.isDirectory()) {
            	
//            	System.out.printf("create path=[%s]\n", expr_result_path);
            	fileSystemService.createDirectory(context, command);
            }
            
            String[] sis = sids.split(",");
            String[] ens = enables.split(",");
            String[] wks = wids.split(",");

			for(int i=0; i<wks.length; i++)
			{
				String workflow = wks[i];
				String enable = ens[i];
				String sql = String.format("UPDATE SCHEDULER SET STATE='RUNNING',[RUNTIME]=(SELECT NVL(MAX(CAST([value] AS TIMESTAMP)),NOW()) FROM config WHERE LCASE(item)='now'),ENDTIME=NULL WHERE [ID] IN (%s) AND WORKFLOW_ID = %s", sids, workflow);
            	memberService.update_sql(sql);

//            	System.out.printf("schedule update query=[%s]\n", sql);
            	
            	if("I".equalsIgnoreCase(enable))
            	{
    				sql = String.format("DELETE FROM CONFIG WHERE item='immediate_exec' AND [value] IN (%s)", sids);

 //               	System.out.printf("schedule delete query=[%s]\n", sql);
    				memberService.delete_sql(sql);
            	}
				
				designerService.run(Long.parseLong(workflow), engineId);
				
				HashMap<String, Object> jobid = null;
				ArrayList<HashMap<String, Object>> results;
				
				// start & Result check...
	            for(int j=0; j<300; j++)
	            {
	            	if(jobid==null)
	            		sql = String.format("SELECT job_id,status FROM WORKFLOW_HISTORY WHERE WORKFLOW_ID=(SELECT WORKFLOW_ID FROM WORKFLOW WHERE [ID]=%s) AND START_DATE>CAST('%s' AS DATETIME)", workflow, ct);
	            	else
	        	       	sql = String.format("SELECT job_id,status FROM WORKFLOW_HISTORY WHERE JOB_ID='%s'", (String)jobid.get("job_id"));
	            	
	            	results = memberService.select_sql(sql);
	            	if(results.size()>0) {
	            		jobid = results.get(0);
//	            		System.out.printf("jobid===>%s:%s\n", (String)jobid.get("job_id"), (String)jobid.get("status"));
	            		
	            		if("FAIL".equals(jobid.get("status")) || "SUCCESS".equals(jobid.get("status"))) break;
	            	}
	            	try {
						Thread.sleep(3000);
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
	            }
	            
	            if(jobid!=null)
	            {
	            	sql = String.format("UPDATE SCHEDULER SET STATE='%s',ENDTIME=(SELECT NVL(MAX(CAST([value] AS TIMESTAMP)),NOW()) FROM config WHERE LCASE(item)='now') WHERE [ID] in (%s) AND WORKFLOW_ID = %s", (String)jobid.get("status"), sids, workflow);	            	
	            	memberService.update_sql(sql);
	            	
	            	if("SUCCESS".equals(jobid.get("status")))
	            	{
	            		success_wids = wids;
	            		
	        			if(!success_wids.isEmpty()) success_wids += ",";
	        			success_wids += workflow;
	            	}
	            }
				
			}
			/* 결과 저장 process는  커스트 마이징  영역...
			// 재계산 완료 워크플로우 포함 산정식 재계산.
			if(!success_wids.isEmpty())
			{
            	String sql = String.format("SELECT * FROM EXPRESSION WHERE [ID] IN (SELECT [EXPRESSION_ID] FROM EXPR_ITEM WHERE WORKFLOW_ID in (%s))", success_wids);
            	ArrayList<HashMap<String, Object>> results = memberService.select_sql(sql);
            	
            	// 영향 받는 산정식 리스트..
            	for(HashMap<String, Object> r:results)
            	{
                	double total_offset = 0.; // 대표지역 보정값
            		
            		String expr_str = "";
            		sql = String.format("INSERT [expr_res_history] ([EXPR_ID], [TIME]) VALUES (%s, '%s');", (String)r.get("id"), wt);
            		int resid = memberService.insert_sql(sql);
            		
            		// expr_res_history 
            		
                	HashMap<String, Double> res = new HashMap<String, Double>(); 
                	
            		// 산정식  재계산...
//            		System.out.printf("Recalc [%s], resid=[%d]\n", (String)r.get("id"), resid);
            		
                	sql = String.format("SELECT I.*,W.workflow_xml,W.[name] FROM EXPR_ITEM I, WORKFLOW W WHERE I.WORKFLOW_ID=W.[ID] AND I.[EXPRESSION_ID]=%s", (String)r.get("id"));
                	ArrayList<HashMap<String, Object>> eitems = memberService.select_sql(sql);

                	// 각 항 누적...
                	for(HashMap<String, Object> ei:eitems)
                	{
                		String name = (String)ei.get("name");
                		String xml = (String)ei.get("workflow_xml");
                		double weight = cvtdbl((String)ei.get("weight"));

                		if(!expr_str.isEmpty()) expr_str += "+";
                		expr_str += String.format("%s*%f", name, weight);
                		
                		int op = xml.lastIndexOf("-output");
                		int sp = xml.indexOf("<value>", op+7);
                		int ep = xml.indexOf("</value>", sp+5);
                		
                		String output = xml.substring(sp+7, ep);
                		
//                		System.out.printf("output [%s]=[%s]*%f\n", ei.get("workflow_id"), output, weight);
                		
                		try {
                			String path = output+"/"+expr_result_file;
                			if(output.endsWith("/"+expr_result_file)) path = output;
                			
//                        	System.out.printf("path=%s\n", path);
                			
                            command = new FileSystemCommand();
                            command.putObject("path", path);
                            command.putObject("filename", expr_result_file);
                        	byte[] readed = fileSystemService.load(context, command);
                        	
                        	BufferedReader br = new BufferedReader(new InputStreamReader(new ByteArrayInputStream(readed), "UTF-8"));
                        	
                        	double oneoffset = 0; // 대표지역 보정값
                        	
                        	String line;
                        	while ((line = br.readLine()) != null) {
                        		if(line.startsWith("#")) continue;
                        		String[] kv = line.trim().split(",");
                        		if(kv.length==2) {
                        			// 독립변수 결과 db 기록
                            		sql = String.format("INSERT [expr_indvar_res] ([RES_ID],[WORKFLOW_ID],[KEY],[VALUE]) VALUES (%d, %s, '%s', '%s');", resid, (String)ei.get("workflow_id"), kv[0], kv[1]);
                            		memberService.insert_sql(sql);
                        			double wv = cvtdbl(kv[1])*weight;
                        			Double v = res.get(kv[0]);
                        			if(v==null) v = wv;
                        			else v += wv;
                        			
                        			if(".".equals(kv[0].trim())) { // 대표지역 보정값
                        				oneoffset = cvtdbl(kv[1])*weight;
                        				total_offset += oneoffset;
                        			}
                       				v -= oneoffset;
                        			
                        			res.put(kv[0], v);
                        		}
                        	}
                        	br.close();
                        } catch (Exception ex) {
                        	ex.printStackTrace();
                        }		
                	}
                	// 항 누적 완료..
              		double correction = cvtdbl((String) r.get("correction"));
              		expr_str += String.format("+%f", correction);
              		
            		sql = String.format("UPDATE [expr_res_history] SET EXPR_STR='%s' WHERE ID=%d;", expr_str, resid);
            		memberService.update_sql(sql);
              		
 //             		System.out.printf("+correction [%f]\n", correction);
              		
              		StringBuffer sb = new StringBuffer(); 
              		for(Entry<String, Double> entry : res.entrySet()) {
              		    String k = entry.getKey();
              		    Double v = entry.getValue();
              		    // 종속변수 결과 db 기록
              		  
              		    double lv = v + correction + total_offset;
              		    lv = 1.0 / (1.0 + (Math.exp(-1*lv)) );
              		    
                		sql = String.format("INSERT [expr_depvar_res] ([RES_ID],[KEY],[VALUE]) VALUES (%d, '%s', '%f');", resid, k, lv);
                		memberService.insert_sql(sql);
              		    sb.append(String.format("%s,%f\n", k, lv));
              		}
   //           		System.out.printf("save result[%s]=[%s] totaloffset=[%f]\n", (String)r.get("id"), sb.toString(), total_offset);
              		
              		try {
                        command = new FileSystemCommand();
                        
                        String outf = String.format("%s/%s.csv", expr_result_path, (String)r.get("id"));

                        command.putString("path", outf);
                        finfo = fileSystemService.getFileInfo(context, command);
                        if(finfo!=null)
                        {
                        	command.putObject("path", Arrays.asList(outf));
                        	fileSystemService.deleteFiles(context, command);
	                        command.putString("path", outf);
                        }
                        command.putObject("isfirst", true);
                        command.putObject("content", sb.toString().getBytes());
                        fileSystemService.save(context, command);
                        
                        outf = String.format("%s/%s.time", expr_result_path, (String)r.get("id"));

                        command.putString("path", outf);
                        finfo = fileSystemService.getFileInfo(context, command);
                        if(finfo!=null)
                        {
                        	command.putObject("path", Arrays.asList(outf));
                        	fileSystemService.deleteFiles(context, command);
	                        command.putString("path", outf);
                        }
                        command.putObject("isfirst", true);
                        command.putObject("content", ct.getBytes());
                        fileSystemService.save(context, command);
              		}
              		catch (Exception e)
              		{
              			e.printStackTrace();
                    	System.out.println("error=>"+e.getMessage());
              		}
              		// 산정식 계산 완료.. 결과 저장
            	}
   			
			}*/
			               
	    }
	}	
    
    
	// 2016-06-28 workflow run REST API 
	@RequestMapping(value = "runWorkflow", method = RequestMethod.POST)
	@ResponseBody
	public Response runWorkflow(HttpServletRequest req, HttpServletResponse resp
	  	, @RequestParam(value = "account", required=true) String account
	  	, @RequestParam(value = "workflowname", required=true) String workflowname
	  	, @RequestParam(value = "enginename", required=true) String enginename
  		) throws Exception {

		Long id = 0l;
		Long engineId = 0l;
		String workflowid = "";
		String ct = "";
		Response response = new Response();
		
		String sql = String.format("SELECT [ID],WORKFLOW_ID FROM WORKFLOW WHERE NAME='%s' AND USERNAME='%s'", workflowname, account);
		ArrayList<HashMap<String, Object>> workflow = memberService.select_sql(sql);
		if(workflow.size()<1)
		{
			response.setSuccess(false);
			response.setError(new Error("404", "workflow not found"));
			return response;
		}
		id = Long.parseLong((String)workflow.get(0).get("ID"));
		workflowid = (String)workflow.get(0).get("WORKFLOW_ID");
		
		sql = String.format("SELECT ID,NOW() as ct FROM ENGINE WHERE NAME='%s'", enginename);
		ArrayList<HashMap<String, Object>> engine = memberService.select_sql(sql);
		
		if(engine.size()<1)
		{
			response.setSuccess(false);
			response.setError(new Error("404", "engine not found"));
			return response;
		}
		engineId = Long.parseLong((String)engine.get(0).get("ID"));
		ct = (String)engine.get(0).get("ct"); // db 현재시간 측정
		
        try {
 //           System.out.printf("cache update...\n");

        	// cache...
        	HashMap<String, Object>  cached = designerService.ankus_cache_list(engineId);
        	
        	String cachePath = ConfigurationHelper.getHelper().get("artifact.cache.path", "/tmp/cache");
            
        	File f = new File(cachePath);
        	
        	if(f.exists() && f.isDirectory())
        	{
        		for(File fi:f.listFiles())
        		{
 //                   System.out.printf("update check===%s\n", fi.getName());
        			Long sz = (Long)cached.get(fi.getName());
        			if(sz==null || sz!=fi.length())
        			{
 //                       System.out.printf("update put===%s:%d\n", fi.getName(), sz);
        	    		FileInputStream fis = new FileInputStream(fi);
        	    		byte[] data = new byte[(int) fi.length()];
        	    		fis.read(data);
        				
        				designerService.ankus_cache_put(engineId, fi.getName(), data);
        			}
        		}
        	}
    		
            designerService.run(id, engineId);
            
            ArrayList<HashMap<String, Object>> job = null;
            HashMap<String, Object> jobid = null;
        	sql = String.format("SELECT JOB_ID,STATUS FROM WORKFLOW_HISTORY WHERE WORKFLOW_ID='%s' AND USERNAME='%s' AND START_DATE>CAST('%s' AS DATETIME)", workflowid, account, ct);
            for(int i=0; i<30; i++)
            {
            	job = memberService.select_sql(sql);
            	if(job.size()>0) {
            		jobid = job.get(0);
            		break;
            	}
            	Thread.sleep(1000);
            }
            
            if(jobid!=null)
            {
	            response.setSuccess(true);
	            response.setMap(jobid);
            }
            else {
            	response.setSuccess(false);
            	response.setError(new Error("500"," workflow start timeout"));
            }
        } catch (Exception ex) {
            String message = message("S_DESIGNER", "CANNOT_RUN_WORKFLOW", id, ex.getMessage());
            logger.warn("{}", message, ex);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            response.setSuccess(false);
        }
	
		return response;
	}

	// 2016-06-28 workflow status REST API 
	@RequestMapping(value = "statusWorkflow", method = RequestMethod.POST)
	@ResponseBody
	public Response statusWorkflow(HttpServletRequest req, HttpServletResponse resp
	  	, @RequestParam(value = "account", required=true) String account
	  	, @RequestParam(value = "jobid", required=true) Long jobid
  		) throws Exception {

		Response response = new Response();
		
		String sql = String.format("SELECT * FROM WORKFLOW_HISTORY WHERE JOB_ID=%d AND USERNAME='%s'", jobid, account);
		ArrayList<HashMap<String, Object>> job = memberService.select_sql(sql);

/*
		List<Object> list = new ArrayList<Object>(); 
		for(HashMap<String, Object> i:job) {
			String xml = (String) i.get("WORKFLOW_XML");
			String exc = (String) i.get("EXCEPTION");
			i.put("WORKFLOW_XML", Hex.decodeHex(xml.toCharArray()));
			i.put("EXCEPTION", Hex.decodeHex(exc.toCharArray()));
			list.add(i);
		}
*/
		if(job.size()>0)
		{
			response.setSuccess(true);
			response.setMap(job.get(0));
		}
		else
		{
           	response.setError(new Error("404","workflow not found"));
			response.setSuccess(false);
		}
		
		return response;
		
	}

    private Context getContext(Engine engine, String account) {
        HadoopCluster hadoopCluster = hadoopClusterAdminService.getHadoopCluster(engine.getHadoopClusterId());
        Context context = new Context();
        
		Member m = memberService.getMemberByUser(account);
        
        String username = m.getUsername();
        String authority = m.getAuthority();
        
        context.putObject(Context.AUTORITY, new Authority(username, authority.equals("ROLE_ADMIN")? SecurityLevel.SUPER : SecurityLevel.LEVEL1));
        context.putObject(Context.HADOOP_CLUSTER, new HadoopCluster(hadoopCluster.getHdfsUrl()));
        context.putString("username", username);
        
        String forbiddenPaths = ConfigurationManager.getConfigurationManager().get("hdfs.delete.forbidden.paths", "/tmp,/tmp/**/*,/user,/user/hive/**/*");
        context.putString("hdfs.delete.forbidden.paths", forbiddenPaths);
        
        return context;
    }  

	// 2016-06-28 workflow getResult REST API 
	@RequestMapping(value = "getResult", method = RequestMethod.GET)
	public ResponseEntity getResult(HttpServletRequest req, HttpServletResponse resp
	  	, @RequestParam(value = "account", required=true) String account
	  	, @RequestParam(value = "enginename", required=true) String enginename
	  	, @RequestParam(value = "path", required=true) String path
	  	, @RequestParam(value = "filename", required=true) String filename
  		) throws Exception {

		String sql = String.format("SELECT ID,NOW() as ct FROM ENGINE WHERE NAME='%s'", enginename);
		ArrayList<HashMap<String, Object>> engineinfo = memberService.select_sql(sql);
		
        HttpHeaders headers = new HttpHeaders();
		
		if(engineinfo.size()<1)
		{
			return new ResponseEntity(headers, org.springframework.http.HttpStatus.BAD_REQUEST);
		}
		
		Long engineId = Long.parseLong((String)engineinfo.get(0).get("ID"));
				
		try {
            FileSystemCommand command = new FileSystemCommand();
            command.putObject("path", path);
            command.putObject("filename", filename);
            Engine engine = engineService.getEngine(engineId);
            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);

            Context context = getContext(engine, account);
            
            long fsize = fileSystemService.getSize(context, command);
        
//        	System.out.printf("getResult===========> size=%s/%d\n", path, fsize);
        
            resp.setHeader("Content-Length", "" + fsize);
            resp.setHeader("Content-Type", MediaType.APPLICATION_OCTET_STREAM_VALUE);
            resp.setHeader("Content-Disposition", MessageFormatter.format("form-data; name={}; filename={}", URLEncoder.encode(path, HdfsBrowserController.CHARSET), URLEncoder.encode(filename, HdfsBrowserController.CHARSET)).getMessage());
            resp.setStatus(200);
            
            long remain = fsize;
            long offset = 0;
            
            OutputStream os = resp.getOutputStream();
            while(remain>0)
            {
	            command.putObject("offset", offset);
	            command.putObject("len", (int)(remain<HdfsBrowserController.blocksize?remain:HdfsBrowserController.blocksize));
            	byte[] readed = fileSystemService.load(context, command);
            	
//	        	System.out.printf("getResult===========> read=%d\n", readed.length);
            	
            	if(readed!=null && readed.length>0)
            	{
//            		FileCopyUtils.copy(readed, resp.getOutputStream());
            		
            		os.write(readed);
            		offset += readed.length;
            		remain -= readed.length;
            	}
            }
            os.close();
            resp.flushBuffer();
            
            return new ResponseEntity(org.springframework.http.HttpStatus.OK);
        } catch (Exception ex) {

			ex.printStackTrace();        

            headers.set("message", ex.getMessage());
            if (ex.getCause() != null) headers.set("cause", ex.getCause().getMessage());
            return new ResponseEntity(headers, org.springframework.http.HttpStatus.BAD_REQUEST);
        }		
	}

	// 2016-06-28 workflow putData REST API 
	@RequestMapping(value = "putData", method = RequestMethod.POST)
	@ResponseBody
	public Response putData(HttpServletRequest req, HttpServletResponse resp
	  	, @RequestParam(value = "account", required=true) String account
	  	, @RequestParam(value = "enginename", required=true) String enginename
	  	, @RequestParam(value = "path", required=true) String path
	  	, @RequestParam(value = "uploadfile", required=true) MultipartFile uploadedFile
  		) throws Exception {

		String sql = String.format("SELECT ID,NOW() as ct FROM ENGINE WHERE NAME='%s'", enginename);
		ArrayList<HashMap<String, Object>> engineinfo = memberService.select_sql(sql);
		
		Response response = new Response();
		
		if(engineinfo.size()<1)
		{
           	response.setError(new Error("404","workflow not found"));
			response.setSuccess(false);
			return response;
		}
		
		Long engineId = Long.parseLong((String)engineinfo.get(0).get("ID"));
		
        InputStream inputStream = null;
        try {
            String pathToUpload = path;           
            String originalFilename = uploadedFile.getOriginalFilename();
            String fullyQualifiedPath = pathToUpload.equals("/") ? pathToUpload + originalFilename : pathToUpload + HdfsBrowserController.FILE_SEPARATOR + originalFilename;
            inputStream = uploadedFile.getInputStream();
            Engine engine = engineService.getEngine(engineId);
            
            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);

            Context context = getContext(engine, account);
            String forbiddenPaths = ConfigurationManager.getConfigurationManager().get("hdfs.delete.forbidden.paths", HdfsBrowserController.DEFAULT_FORBIDDEN_PATH);
            context.putString("hdfs.delete.forbidden.paths", forbiddenPaths);

            FileSystemCommand command = new FileSystemCommand();
            command.putString("path", fullyQualifiedPath);
            
            boolean isfirst = true;
            
            int blocksize = HdfsBrowserController.blocksize; // 64MB block...
            long uploadsize = uploadedFile.getSize();
            
//            System.out.printf("uploadfile size=========>%d\n", uploadsize);
            
            boolean file = true;
            while(uploadsize>0 && file)
            {
            	byte[] bytes = new byte[blocksize];
            	int read = inputStream.read(bytes);

            	byte[] rbytes = null;
            	if(read==blocksize) rbytes = bytes;
            	else if(read>0) rbytes = Arrays.copyOf(bytes, read);
            	else
            	{
 //           		System.out.println("error upload ... data read(" + read+")");
            		file = false;
            		break;
            	}
            	
            	uploadsize -= read; 
                command.putObject("isfirst", isfirst);
                command.putObject("content", rbytes);
                
  //              System.out.printf("uploadfile block save =========>%d\n", rbytes.length);
                
                file = fileSystemService.save(context, command);
                
  //              System.out.printf("uploadfile block result =========>%s\n", file);
                
                isfirst = false;
            }

            response.setSuccess(file);
            response.getMap().put("directory", pathToUpload);

			response.setSuccess(true);
            return response;
        } catch (Exception ex) {
        	
   //         System.out.printf("uploadfile error =========>%s\n", ex.getMessage());
        	
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
			return response;
        }
		
	}
   
	// 2016-07-11 workflow cleanResult REST API 
	@RequestMapping(value = "cleanResult", method = RequestMethod.POST)
	@ResponseBody
	public Response cleanResult(HttpServletRequest req, HttpServletResponse resp
		  	, @RequestParam(value = "account", required=true) String account
		  	, @RequestParam(value = "enginename", required=true) String enginename
		  	, @RequestParam(value = "path", required=true) String path
	  		) throws Exception {

			String sql = String.format("SELECT ID,NOW() as ct FROM ENGINE WHERE NAME='%s'", enginename);
			ArrayList<HashMap<String, Object>> engineinfo = memberService.select_sql(sql);
			
			Response response = new Response();
			
			if(engineinfo.size()<1)
			{
	           	response.setError(new Error("404","workflow not found"));
				response.setSuccess(false);
				return response;
			}
			
			Long engineId = Long.parseLong((String)engineinfo.get(0).get("ID"));
			
	        try {
	            Engine engine = engineService.getEngine(engineId);
	            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);

	            Context context = getContext(engine, account);
	            
	            
	            String forbiddenPaths = ConfigurationManager.getConfigurationManager().get("hdfs.delete.forbidden.paths", HdfsBrowserController.DEFAULT_FORBIDDEN_PATH);
	            context.putString("hdfs.delete.forbidden.paths", forbiddenPaths);
	            
	            FileSystemCommand command = new FileSystemCommand();
	            command.putString("path", path);
	            
            	fileSystemService.deleteDirectory(context, command);
            	/*
	            List<FileInfo> flist = fileSystemService.getFiles(context, command);
	            
	            ArrayList<String> paths = new ArrayList<String>();
	            for(FileInfo f:flist)
	            {
	            	paths.add(f.getFullyQualifiedPath());
	            }
	            if(paths.size()>0) {
	            	command.putObject("path", Arrays.asList(paths));
		            fileSystemService.deleteFiles(context, command);
	            }
	            */

				response.setSuccess(true);
	            return response;
	        } catch (Exception ex) {
	        	
//	            System.out.printf("deleteResult error =========>%s\n", ex.getMessage());
	        	
	            response.setSuccess(false);
	            response.getError().setMessage(ex.getMessage());
	            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
	            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
				return response;
	        }
			
	}	

	// 2016-07-11 workflow listResult REST API 
	@RequestMapping(value = "listResult", method = RequestMethod.POST)
	@ResponseBody
	public Response listResult(HttpServletRequest req, HttpServletResponse resp
		  	, @RequestParam(value = "account", required=true) String account
		  	, @RequestParam(value = "enginename", required=true) String enginename
		  	, @RequestParam(value = "path", required=true) String path
	  		) throws Exception {

			String sql = String.format("SELECT ID,NOW() as ct FROM ENGINE WHERE NAME='%s'", enginename);
			ArrayList<HashMap<String, Object>> engineinfo = memberService.select_sql(sql);
			
			Response response = new Response();
			
			if(engineinfo.size()<1)
			{
	           	response.setError(new Error("404","workflow not found"));
				response.setSuccess(false);
				return response;
			}
			
			Long engineId = Long.parseLong((String)engineinfo.get(0).get("ID"));
			
	        try {
	            Engine engine = engineService.getEngine(engineId);
	            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);

	            Context context = getContext(engine, account);
	            
	            
	            String forbiddenPaths = ConfigurationManager.getConfigurationManager().get("hdfs.delete.forbidden.paths", HdfsBrowserController.DEFAULT_FORBIDDEN_PATH);
	            context.putString("hdfs.delete.forbidden.paths", forbiddenPaths);
	            
	            FileSystemCommand command = new FileSystemCommand();
	            command.putString("path", path);
	            List<FileInfo> flist = fileSystemService.getFiles(context, command);

				List<Object> list = new ArrayList<Object>();
				for(FileInfo f:flist) if(f.isFile()) list.add(f.getFullyQualifiedPath());

				response.setList(list);
				response.setSuccess(true);
	            return response;
	        } catch (Exception ex) {
	        	
//	            System.out.printf("listResult error =========>%s\n", ex.getMessage());
	        	
	            response.setSuccess(false);
	            response.getError().setMessage(ex.getMessage());
	            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
	            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
				return response;
	        }
			
	}
	
	// 2016-12-05 dbinfo REST API 
	@RequestMapping(value = "dbinfo")
	@ResponseBody
	public String dbinfo(HttpServletRequest req, HttpServletResponse resp)
	{
		String tbl = (String)req.getParameter("tbl");
		
		ArrayList<HashMap<String, Object>> ret = new ArrayList<HashMap<String, Object>>();
		if(tbl!=null)
			ret = memberService.select_sql("SELECT attr_name [name],attr_name [value],attr_name [description] FROM db_attribute WHERE class_name='"+tbl+"' ORDER BY def_order");
		else
			ret = memberService.select_sql("SELECT class_name [name],class_name [value],class_name [description] FROM db_class WHERE is_system_class = 'NO'");
		
		ObjectMapper mapper = new ObjectMapper();

		String retstr = ""; 
		try {
			retstr = mapper.writeValueAsString(ret);
		} catch (JsonGenerationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return retstr;
	}
	
	// 2016-12-15 main_calcweight 
	@RequestMapping(value = "main_calcweight")
	public void main_calcweight(HttpServletRequest req, HttpServletResponse resp
		, @RequestParam(value = "expression_id", required=true) String expression_id, Locale locale 
  		) throws Exception {
		
//		System.out.printf("============>main_calcweight\n");

		HashMap<String, Object> result = new HashMap<String, Object>();
		
		String sql = String.format("SELECT now() ct, (SELECT [id] FROM [engine]) engineid, r1.[id], r1.[workflow_id], r2.[status] FROM workflow r1 LEFT JOIN workflow_history r2 ON  r1.workflow_id=r2.workflow_id WHERE [name] = (SELECT [name]+'_가중치' workflow FROM expression WHERE  id='%s')", expression_id);

		ArrayList<HashMap<String, Object>> stats = memberService.select_sql(sql);
		
		if (stats.size()==0)
		{
			result.put("status", "ERROR");
			result.put("result", pMSG.getMessage("JAVA_COMM_CONTR_NO_WORKFLOW_ERROR", null, locale));
		}
		else
		{
			String status = (String) stats.get(0).get("status");
			
			if("RUNNING".equalsIgnoreCase(status))
			{
				result.put("status", status);
				result.put("result", pMSG.getMessage("JAVA_COMM_CONTR_CALCUL_WEIGHT", null, locale));
			}
			else
			{
				Long engineId = Long.parseLong((String) stats.get(0).get("engineid"));
				String id = (String) stats.get(0).get("id");
				String workflow = (String) stats.get(0).get("workflow_id");
				
//				System.out.printf("...........workflowid=[%s]\n", workflow);
				
//	            Engine engine = engineService.getEngine(engineId);
	            
	            designerService.run(Long.parseLong(id), engineId);
	            
				String ct = (String) stats.get(0).get("ct");
				
	            for(int i=0; i<15; i++)
	            {
            		Thread.sleep(2000);
            		sql = String.format("SELECT job_id,status FROM WORKFLOW_HISTORY WHERE WORKFLOW_ID='%s' AND START_DATE>CAST('%s' AS DATETIME)", workflow, ct);
            		ArrayList<HashMap<String, Object>> results = memberService.select_sql(sql);
            		
            		if(results.size()>0) 
            		{
            			result.put("status", results.get(0).get("status"));
            			result.put("result", results.get(0).get("status"));
            			break;
            		}
	            }
			}
		}


    	PrintWriter out = null;
		out = resp.getWriter();
		
        ObjectMapper mapper = new ObjectMapper();
        
        out.write(mapper.writeValueAsString(result));

	}	

	// 2016-12-15 main_calcweight_result 
	@RequestMapping(value = "main_calcweight_result")
	public void main_calcweight_result(HttpServletRequest req, HttpServletResponse resp
	  	, @RequestParam(value = "expression_id", required=true) String expression_id, Locale locale
  		) throws Exception {
		
//		System.out.printf("============>main_calcweight_result\n");
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		String sql = String.format("SELECT now() ct, (SELECT [id] FROM [engine]) engineid, r1.[id], r1.workflow_id, r1.workflow_xml, r2.[status] FROM workflow r1 LEFT JOIN workflow_history r2 ON  r1.workflow_id=r2.workflow_id WHERE [name] = (SELECT [name]+'_가중치' workflow FROM expression WHERE  id='%s') ORDER BY r2.[id] DESC", expression_id);

		ArrayList<HashMap<String, Object>> stats = memberService.select_sql(sql);
		
		if (stats.size()==0)
		{
			result.put("status", "ERROR");
			result.put("result", pMSG.getMessage("JAVA_COMM_CONTR_NO_EXECU_LIST", null, locale));
		}
		else
		{
			String status = (String)stats.get(0).get("status");
			
			if("SUCCESS".equalsIgnoreCase(status))
			{
				String xml = (String)stats.get(0).get("workflow_xml");
	    		
	    		int op = xml.lastIndexOf("-output");
	    		int sp = xml.indexOf("<value>", op+7);
	    		int ep = xml.indexOf("</value>", sp+5);
	    		
	    		String output = xml.substring(sp+7, ep);
	    		
				Long engineId = Long.parseLong((String) stats.get(0).get("engineid"));
//				String workflow = (String) stats.get(0).get("workflow_id");
				
	            Engine engine = engineService.getEngine(engineId);
	            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
	
	            Context context = getContext(engine, "admin");
	    		
	            String path = output+"/"+expr_result_file;     
	            
	            FileSystemCommand command = new FileSystemCommand();
	            command.putObject("path", path);
	            command.putObject("filename", expr_result_file);
	        	byte[] readed = fileSystemService.load(context, command);

//				System.out.printf("path=[%s][%s]\n", path, new String(readed));
	        	
				/*
	        	BufferedReader br = new BufferedReader(new InputStreamReader(new ByteArrayInputStream(readed), "UTF-8"));
	        	
	        	HashMap<String, Double> res = new HashMap<String, Double>();
	
	        	String line;
	        	int lc = 0;
	        	
	        	while ((line = br.readLine()) != null) {
	        		if(line.startsWith("#")) continue;
	        		String[] kv = line.trim().split(",");
	        		if(kv.length==2) {
	        			double v = 0;
	        			try {
		        			v = cvtdbl(kv[1]);
	        			}
	        			catch(Exception e)
	        			{
	        				System.out.printf("value=[%s][%s]\n",kv[1], e.getMessage());
	        			}
	        			res.put(kv[0], v);
	        			
	        			lc++;
	        			if(lc>20) break;
	        		}
	        	}
	        	br.close();
	
				StringBuffer sb = new StringBuffer(); 
	      		for(Entry<String, Double> entry : res.entrySet()) {
	      		    String k = entry.getKey();
	      		    Double v = entry.getValue();
	      		    if(sb.length()>0) sb.append(",");
	      		    sb.append(String.format("%s:%.3f", k, v));
	      		}   
				result.put("status", status);
				result.put("result", sb.toString());
	      		*/     	
				result.put("status", status);
				result.put("result", new String(readed, "UTF-8"));
			}
			else
			{
				result.put("status", status);
				result.put("result", status);
			}
			
		}
		
    	PrintWriter out = null;
		out = resp.getWriter();
		
        ObjectMapper mapper = new ObjectMapper();
        
        out.write(mapper.writeValueAsString(result));
	}
	
	// 2016-02-17 hadoop text write api 
	@SuppressWarnings("deprecation")
	@RequestMapping(value = "/main/hdfswrite")
	public void hdfswrite(HttpServletRequest req, HttpServletResponse resp
	  	, @RequestParam(value = "file", required=true) String file
	  	, @RequestParam(value = "data", required=true) String data
	  	, @RequestParam(value = "account", required=false, defaultValue="admin") String account
  		) throws Exception {
		
//		System.out.printf("============>hdfswrite\n");

		if(file.indexOf("/")<0) file = "/user/"+file;
		
		String pathname = ""; 
		int lp = file.lastIndexOf("/");
		if(lp>=0) pathname = file.substring(0, lp-1);
		
		ArrayList<HashMap<String, Object>> hinfo = memberService.select_sql("SELECT h.hdfs_url, e.name, e.id FROM admin_hadoop_cluster h, engine e WHERE h.id=e.cluster_id");
		
   		String engineId = "";
		String hadoopurl = "";
		if(hinfo.size()>0) {
			hadoopurl = (String)hinfo.get(0).get("hdfs_url");
			engineId = (String)hinfo.get(0).get("id");
		}
		
        Engine engine = engineService.getEngine(Long.parseLong(engineId));
        
        FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);

        Context context = getContext(engine, account);
        String forbiddenPaths = ConfigurationManager.getConfigurationManager().get("hdfs.delete.forbidden.paths", HdfsBrowserController.DEFAULT_FORBIDDEN_PATH);
        context.putString("hdfs.delete.forbidden.paths", forbiddenPaths);

        FileSystemCommand command = new FileSystemCommand();
        command.putString("path", file);
        
        FileInfo finfo = fileSystemService.getFileInfo(context, command);
        
        if(finfo!=null)
        {
        	command.putObject("path", Arrays.asList(file));
        	fileSystemService.deleteFiles(context, command);
        }
        
        boolean isfirst = true;
        
        int blocksize = HdfsBrowserController.blocksize; // 64MB block...
        long uploadsize = data.length();
        
        command.putString("path", file);
        command.putObject("isfirst", isfirst);
        command.putObject("content", data.getBytes());
		
        boolean ret = fileSystemService.save(context, command);
		
        if(ret) {
        	PrintWriter outw = resp.getWriter();
			outw.write(data);
        }
	}
	
	@RequestMapping(value = "/main/runscheduler")
	@ResponseBody
    public Response runschedule(HttpServletRequest req, HttpServletResponse resp
	  	, @RequestParam(value = "schid", required=false) String schid
	  	, @RequestParam(value = "schcmd", required=false) String schcmd
	  	, @RequestParam(value = "schparam", required=false) String schparam
	  	, Locale locale
  		) throws Exception {

		Response response = new Response();
		
//		System.out.printf("runschedule====>schid=%s, schcmd=%s, param=%s\n",schid, schcmd, schparam);
		
		String sql = "SELECT MIN([id]) sid, COUNT(*) cnt FROM scheduler WHERE";
		
		if(schcmd==null && schid==null) sql += " 1=2 ";
		else sql += " 1=1 ";
		
		if(schid!=null) sql += " AND [id]="+schid;
		if(schcmd!=null) sql += " AND [ssh_cmd] LIKE '%"+schcmd+"%'";

		ArrayList<HashMap<String,Object>>  rs = memberService.select_sql(sql);

		
		String cnt = (String)rs.get(0).get("cnt");
		String sid = (String)rs.get(0).get("sid");

//		System.out.printf("runschedule====>cnt=%s, sid=%s, sql=[%s], param=[%s]\n",cnt, sid, sql, schparam);
		
		if(Integer.parseInt(cnt)>0)
		{
			
			sql = String.format("SELECT * FROM config WHERE item='immediate_exec' AND [value]='%s'", sid);
			
			rs = memberService.select_sql(sql);
			
			if(rs.size()>0)
			{
				response.setSuccess(false);
				response.getError().setMessage(pMSG.getMessage("JAVA_COMM_CONTR_READY_EXECU_JOB", null, locale));
			}
			else
			{
				sql = String.format("INSERT INTO config (item,[value]) VALUES ('immediate_exec','%s')", sid);
				memberService.insert_sql(sql);
				sql = String.format("UPDATE SCHEDULER SET [STATE]='PREPARING', runtime=NULL, endtime=NULL WHERE [ID]=%s", sid);
				memberService.update_sql(sql);
				
				if(schparam!=null && !schparam.isEmpty())
				{
					sql = String.format("INSERT INTO config (item,[value]) VALUES ('immediate_exec_param_%s','%s')", sid, schparam);
					memberService.insert_sql(sql);
				}
				response.setSuccess(true);			
			}
		}
		else
		{
			response.setSuccess(false);
			response.getError().setMessage(pMSG.getMessage("JAVA_COMM_CONTR_NOT_REGIST_SCHE", new String[]{schcmd}, locale));
		}
		return response;
	}	

	
	
/*	
	static public ArrayList<HashMap<String,Object>> getoraclers(String serverip, int port, String sid, String uid, String pwd, String query)
	{
	
		String url = String.format("jdbc:oracle:thin:@%s:%d:%s", serverip, port, sid);

	    Connection con = null;
	    Statement stmt = null;
	    ResultSet rs = null;
		
	    try {
	    	// 1. Driver를 로딩한다.
	    	Class.forName("oracle.jdbc.driver.OracleDriver");
	    	// 2. Connection 얻어오기(IP:포트:SID, 아이디, 비밀번호)
	    	con = DriverManager.getConnection(url, uid, pwd);
            // 3. Statement 얻기
            stmt = con.createStatement();
            // 4. 쿼리문 실행
            StringBuffer sb = new StringBuffer();
	    	
	    	stmt = con.createStatement();
	    	rs = stmt.executeQuery(query);

			ArrayList<HashMap<String,Object>> rows = new ArrayList<HashMap<String,Object>>();
			ResultSetMetaData meta = null;
			while(rs.next())
			{
				if(meta==null) meta = rs.getMetaData();
				
				HashMap<String,Object> row = new HashMap<String,Object>();
				for(int i=1; i<=meta.getColumnCount(); i++) row.put(meta.getColumnName(i), rs.getString(i));
				rows.add(row);
			}
			rs.close();
			con.close();
			return rows;
	    }
	    catch(Exception e)
	    {
	    	  e.printStackTrace();
	    }
		
		return null;
	}

	@RequestMapping(value = "/main/oraclequery")
	public void oraclequery(HttpServletRequest req, HttpServletResponse resp
	  	, @RequestParam(value = "server", required=true) String server
	  	, @RequestParam(value = "port", required=false, defaultValue="1521") String port
	  	, @RequestParam(value = "sid", required=true) String sid
	  	, @RequestParam(value = "uid", required=true) String uid
	  	, @RequestParam(value = "pwd", required=true) String pwd
	  	, @RequestParam(value = "query", required=true) String query
  		) throws Exception {

		System.out.printf("oraclequery====>\n");
		
		ArrayList<HashMap<String,Object>>  rs = getoraclers(server, Integer.parseInt(port),sid, uid, pwd, query);
		
    	PrintWriter out = null;
		out = resp.getWriter();
		
        ObjectMapper mapper = new ObjectMapper();
        
        out.write(mapper.writeValueAsString(rs));
		
	}	
	
*/	
}
