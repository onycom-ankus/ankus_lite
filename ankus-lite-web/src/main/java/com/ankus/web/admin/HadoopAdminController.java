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
package com.ankus.web.admin;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.List;

import org.json.JSONObject;
import com.ankus.model.rest.HadoopCluster;
import com.ankus.model.rest.Response;
import com.ankus.web.core.LocaleSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
@Controller
@RequestMapping("/admin/hadoop")
public class HadoopAdminController extends LocaleSupport {

    private Logger logger = LoggerFactory.getLogger(HadoopAdminController.class);
    
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
    private HadoopClusterAdminService adminService;

    /*
     2015_02_05 whitepoo@onycom.com 
     API TEST : Getting a cluster info
     */    
    @RequestMapping(value = "cluster", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response a_cluster(@RequestParam(value = "id") String cluster_id) {

    	Connection conn = null;                                        // null로 초기화 한다.
    	String sReqid  = "";
    	sReqid = cluster_id;
    	Response response = new Response();
    	try{
	    	String url = jdbc_url; //"jdbc:mysql://localhost:3306/";        // 사용하려는 데이터베이스명을 포함한 URL 기술
	    	String id = jdbc_username; //"root";                                                    // 사용자 계정
	    	String pw = jdbc_password; //"";                                                // 사용자 계정의 패스워드
	
	    	Class.forName(jdbc_driver/*"com.mysql.jdbc.Driver"*/);                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
	    	conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
	    	
	    	System.out.println("제대로 연결되었습니다.");                            // 커넥션이 제대로 연결되면 수행된다.
	    	
	    	java.sql.Statement st = null;
			ResultSet rs = null;
			st = conn.createStatement();
			rs = st.executeQuery("SELECT * FROM ADMIN_HADOOP_CLUSTER WHERE id=" + sReqid);
	
			ResultSetMetaData rsmd = null;
			rsmd = rs.getMetaData();
	        int numberofColumn = rsmd.getColumnCount();
	        
	        
	       
	        JSONObject data = new JSONObject();
	        if (rs.next ())
	        {
		        response.getMap().put("id", rs.getString("id"));
	            response.getMap().put("name", rs.getString("name")); 
	            response.getMap().put("namenodeProtocol", rs.getString("nn_protocol"));
	            
	            response.getMap().put("namenodeIP", rs.getString("nn_ip"));
	            response.getMap().put("namenodePort", rs.getString("nn_port"));
	            
	            response.getMap().put("jobtrackerIP", rs.getString("JT_IP"));
	            response.getMap().put("jobtrackerPort", rs.getString("JT_PORT"));
	            
	            response.getMap().put("namenodeConsole", rs.getString("NN_CONSOLE"));
	            response.getMap().put("jobtrackerConsole", rs.getString("JT_CONSOLE"));
	            
	            response.getMap().put("jobtrackerMonitorPort", rs.getString("JT_MONITORING_PORT"));
	            response.getMap().put("namenodeMonitorPort", rs.getString("NN_MONITORING_PORT"));
	            
	            response.getMap().put("hdfs_url", rs.getString("hdfs_url"));
	            
	            response.setSuccess(true);
	            
	        }
	        
	        rs.close();
	        st.close();
	        conn.close();
	    }
    	catch(Exception e)
    	{                                                    // 예외가 발생하면 예외 상황을 처리한다.
	    	System.out.println(e.toString());
    	}
        return response;
    }
    
    
    @RequestMapping(value = "clusters", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getHadoopClusters() {
        Response response = new Response();

        try {
            response.setSuccess(true);
            List<HadoopCluster> servers = adminService.getHadoopClusters();
            if (servers != null) {
                response.getList().addAll(servers);
                response.setTotal(response.getList().size());
            } else {
                response.setTotal(0);
            }
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(message("S_ADMIN", "CANNOT_CHECK_HCLUSTER_INFO"));
            response.getError().setCause(ex.getMessage());
        }
        return response;
    }
    /*
	2010.01.30
	whitepoo@onycom.com 
	*/
    @RequestMapping(value = "add", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response add(@RequestBody HadoopCluster hadoopCluster)
    {
        Response response = new Response();
        if (StringUtils.isEmpty(hadoopCluster.getName().trim()))
        {
            response.setSuccess(false);
            return response;
        }
		
		//edit by whitepoo@onycom.com 
        try
        {
        	boolean bsucess = adminService.addHadoopCluster(hadoopCluster);
        	
            response.setSuccess(bsucess);
        }catch(Exception ex)
        {
            response.setSuccess(false);
            response.getError().setMessage(message("S_ADMIN", "CANNOT_ADD_HCLUSTER"));
            response.getError().setCause(ex.getMessage());
        }
        return response;
    }
   
	/*
	2015.01.28
	해당 클러스터가 이름이 존재하는지 검사한다.
	검사하면 그 갯수를 리턴한다.
	whitepoo@onycom.com
	*/
    @RequestMapping(value = "name_exist", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response exist_byname(@RequestBody HadoopCluster hadoopCluster) {
        Response response = new Response();
        Connection conn = null;        
        if (StringUtils.isEmpty(hadoopCluster.getName())) {
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
			rs = st.executeQuery("SELECT COUNT(*) AS RC FROM ADMIN_HADOOP_CLUSTER WHERE NAME ='" + hadoopCluster.getName()+"'");
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
            response.getError().setMessage(message("S_ADMIN", "CANNOT_CHECK_HCLUSTER"));
            response.getError().setCause(ex.getMessage());
        }
        return response;
    }
    
    @RequestMapping(value = "exist", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response exist(@RequestBody HadoopCluster hadoopCluster) {
        Response response = new Response();
        if (StringUtils.isEmpty(hadoopCluster.getName())) {
            response.setSuccess(false);
            return response;
        }

        try {
            response.setSuccess(adminService.exist(hadoopCluster));
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(message("S_ADMIN", "CANNOT_CHECK_HCLUSTER"));
            response.getError().setCause(ex.getMessage());
        }
        return response;
    }

    //2015.01.12 
    //클러스터 삭제 시 연결된 엔진 동시 삭제 추가함
    //whitepoo@onycom.com
    
    @RequestMapping(value = "delete", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response delete(@RequestBody HadoopCluster hadoopCluster) {
        Response response = new Response();
        //Cluster ID를 가지는 모든 ENGINE삭제.
        try
        {
        	Connection conn = null; 
        	String url = jdbc_url; //"jdbc:mysql://localhost:3306/";        // 사용하려는 데이터베이스명을 포함한 URL 기술
	    	String id = jdbc_username; //"root";                                                    // 사용자 계정
	    	String pw = jdbc_password; //"";                                                // 사용자 계정의 패스워드
	    	
	    	Class.forName(jdbc_driver/*"com.mysql.jdbc.Driver"*/);                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
	    	conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
	    	
	    	System.out.println("제대로 연결되었습니다.");                            // 커넥션이 제대로 연결되면 수행된다.
	    	java.sql.Statement st = null;

			st = conn.createStatement();
			
			String delete_query="";
			delete_query = "DELETE FROM ENGINE WHERE CLUSTER_ID = " + Long.toString(hadoopCluster.getId());
			System.out.println(delete_query);
			
			st.executeUpdate(delete_query);			
	        st.close();
	        conn.close();	        	
	    }
    	catch(Exception ex)
    	{                                                    
	    	System.out.println(ex.toString());
	    	response.setSuccess(false);
            response.getError().setMessage(message("S_ADMIN", "CANNOT_DELETE_LINKED_ENGINE"));
            response.getError().setCause(ex.getMessage());
    	}
        
        try
        {     	
        	//특정 id를 가지는 클러스터 row 삭제.
            response.setSuccess(adminService.deleteHadoopCluster(hadoopCluster.getId()));
            response.setSuccess(true);
        }
        catch (Exception ex)
        {
            response.setSuccess(false);
            response.getError().setMessage(message("S_ADMIN", "CANNOT_DELETE_HCLUSTER"));
            response.getError().setCause(ex.getMessage());
        }
        return response;
    }

}