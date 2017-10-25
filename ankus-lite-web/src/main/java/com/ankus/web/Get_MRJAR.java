package com.ankus.web;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import com.ankus.model.rest.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;





import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;

public class Get_MRJAR extends HttpServlet {

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
	
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
    	// key와 value로 구성되어있는 HashMap 생성.
    	PrintWriter out = resp.getWriter();
   	                           
    	String str_group  = "A01";    	
    	String str_method = "";
    	str_method = req.getParameter("method");    	
    	
    	Connection conn = null;  
    	try{
	    	String url = jdbc_url; //"jdbc:mysql://localhost:3306/";        // 사용하려는 데이터베이스명을 포함한 URL 기술
	    	String id = jdbc_username; //"root";                                                    // 사용자 계정
	    	String pw = jdbc_password; //"";                                                // 사용자 계정의 패스워드
	
	    	Class.forName(jdbc_driver/*"com.mysql.jdbc.Driver"*/);                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
	    	conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
	    	JSONObject JARversion = new JSONObject();
	    	java.sql.Statement st = null;
	    	ResultSet rs = null;
			st = conn.createStatement();	
						 
			 System.out.println("--------->" + str_method);
			if("get".equals(str_method))
	    	{
		    	//SELECT BLOCK
				
				rs = st.executeQuery("SELECT  CODE, CODENAME,  VERCHECK  FROM  ANKUS_CODE WHERE CODE <> 0 AND CODEGROUP ='" + str_group +"'");	
		        JSONArray arr = new JSONArray();
		      
		        while (rs.next ())
		        {		        
		        	String code = rs.getString("CODE");
		        	String codename = rs.getString("CODENAME");
		        	String state = rs.getString("VERCHECK");
		        	
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
		        rs.close();			        
		        JARversion.put("success", "true");
		        JARversion.put("data", arr);		        
	    	}	    	
	    	else if("update".equals(str_method))
	    	{
	    		String str_code = req.getParameter("code");	    	
	    		String str_state = req.getParameter("state");    	
	        	
	    		String before_query = "";
	    		before_query = "UPDATE ANKUS_CODE SET VERCHECK='N'";
	    		before_query  += "WHERE CODEGROUP ='" + str_group +"'";
	    		st.executeUpdate(before_query);    		
	    		
	    		String update_query="";
				update_query = "UPDATE ANKUS_CODE SET VERCHECK='" + str_state + "'";				
				update_query += "WHERE CODEGROUP ='" + str_group +"'";
				update_query += "AND CODE ='" + str_code +"'";
				System.out.println(update_query);
				int rtn = st.executeUpdate(update_query);
				
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
	    		
	    		rs = st.executeQuery(selectQuery);	
	    		JSONObject data = new JSONObject();	
	    		
		        if (rs.next ())
		        {		            
		        	String codename = rs.getString("CODENAME");		        				        
			        data.put("CODENAME_VAR", codename);		
		        }
		        
		        rs.close();		        
		        JARversion.put("success", "true");		       
		        JARversion.put("data", data);
		        
	    	}else if("add".equals(str_method))
	    	{	    		
	    		String group = req.getParameter("group");	
	    		String artifact = req.getParameter("artifact");	
	    		String version = req.getParameter("version");
	    		String str_codename = group + ":" + artifact + ":" + version;	    
	        		    		
	    		String add_query="";
	    		add_query = "INSERT INTO ANKUS_CODE (SEQ, CODEGROUP, GROUPNAME, CODE, CODENAME, DESCRIPTION, VERCHECK, CREATE_DT, MODIFY_DT)";			
	    		add_query += " VALUES ( (SELECT MAX(SEQ)+1 FROM ANKUS_CODE AS TMB_ANKUS),'A01','JAR',(SELECT MAX(CODE)+1 FROM ANKUS_CODE AS TMB_ANKUS WHERE CODEGROUP='A01'),'" + str_codename + " ','','N',current_date()+0,'')";	    
				System.out.println(add_query);
				int rtn = st.executeUpdate(add_query);
				
				if(rtn >= 0)
				{
					JARversion.put("success", "true");
				}
				else
				{
					JARversion.put("success", "fail");
				}
	    	}else if("edit".equals(str_method)){
	    		String str_code = req.getParameter("code");
	    		String group = req.getParameter("group");	
	    		String artifact = req.getParameter("artifact");	
	    		String version = req.getParameter("version");
	    		String str_codename = group + ":" + artifact + ":" + version;	       	
	        		    			    		
	    		String update_query="";
				update_query = "UPDATE ANKUS_CODE SET CODENAME='" + str_codename + "'";				
				update_query += "WHERE CODEGROUP ='" + str_group +"'";
				update_query += "AND CODE ='" + str_code +"'";
				System.out.println(update_query);
				int rtn = st.executeUpdate(update_query);
				
				if(rtn >= 0)
				{
					JARversion.put("success", "true");
				}
				else
				{
					JARversion.put("success", "fail");
				}
	    	}else if("delete".equals(str_method)){
	    		String str_code = req.getParameter("code");
	    			        		    			    		
	    		String update_query="";
				update_query = "DELETE FROM ANKUS_CODE WHERE CODE='" + str_code + "' AND CODEGROUP='A01'";				
				System.out.println(update_query);
				int rtn = st.executeUpdate(update_query);
				
				if(rtn >= 0)
				{
					JARversion.put("success", "true");
				}
				else
				{
					JARversion.put("success", "fail");
				}
	    	}
	        st.close();
	        conn.close();        
	      	out.print(JARversion);
	        System.out.println(JARversion);
	      	        
	    }
    	catch(Exception e)
    	{                                                    // 예외가 발생하면 예외 상황을 처리한다.
	    	System.out.println(e.toString());
    	}
    }
    
}
	    	