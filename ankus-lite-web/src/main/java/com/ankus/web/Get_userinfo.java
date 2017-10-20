package com.ankus.web;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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

public class Get_userinfo extends HttpServlet {

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
   	                           
    	String sreq_username  = "";
    	String str_method = "";
    	str_method = req.getParameter("method");
    	sreq_username = req.getParameter("username");
    	
    	Connection conn = null;  
    	try{
	    	String url = jdbc_url; //"jdbc:mysql://localhost:3306/";        // 사용하려는 데이터베이스명을 포함한 URL 기술
	    	String id = jdbc_username; //"root";                                                    // 사용자 계정
	    	String pw = jdbc_password; //"";                                                // 사용자 계정의 패스워드
	
	    	Class.forName(jdbc_driver/*"com.mysql.jdbc.Driver"*/);                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
	    	conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
	    	JSONObject userinfo = new JSONObject();
	    	java.sql.Statement st = null;
	    	ResultSet rs = null;
			st = conn.createStatement();
			JSONObject data = new JSONObject();
	    	if(str_method.equals("get"))
	    	{
		    	//SELECT BLOCK
				
				rs = st.executeQuery("SELECT * FROM USER WHERE USERNAME='" + sreq_username +"'");	
		        
		        if (rs.next ())
		        {
			        data.put("USERNAME", rs.getString("USERNAME"));
			        data.put("PASSWD", rs.getString("PASSWD"));
			        data.put("NAME", rs.getString("NAME"));
			        data.put("EMAIL", rs.getString("EMAIL"));		         
		        }	      
		        rs.close();		        
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
				update_query = "UPDATE USER SET PASSWD='" + str_passwd + "',";
				//update_query += "NAME='" + str_name + "',";
				update_query += "EMAIL='" + str_email + "' ";
				update_query += "WHERE USERNAME = '" + sreq_username + "'";
				System.out.println(update_query);
				int rtn = st.executeUpdate(update_query);
				
				if(rtn >= 0)
				{
					userinfo.put("success", "true");
				}
				else
				{
					userinfo.put("success", "fail");
				}
	    	}	        
	        st.close();
	        conn.close();        
	      	out.print(userinfo);
	        //req.setAttribute("jsonStr", userinfo);
	        System.out.println(userinfo);
	      	        
	    }
    	catch(Exception e)
    	{                                                    // 예외가 발생하면 예외 상황을 처리한다.
	    	System.out.println(e.toString());
    	}
    }
    
}