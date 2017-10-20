/**
 * Copyright (C) 2011  ankus Framework (http://www.openankus.org).
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

package com.ankus.web.admin;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;


public class Check_EngineWithCluster extends HttpServlet {
	// 대부분의 Servlet은 doGet 또는 doPost만 작성하며,
    // 컨테이너가 생성한 Request와 Response 객체를 전달 받는다.
	
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
    	
    	Connection conn = null;                                        // null로 초기화 한다.
    	String sReqid  = "";
    	
    	
    	try{
	    	String url = jdbc_url; //"jdbc:mysql://localhost:3306/";        // 사용하려는 데이터베이스명을 포함한 URL 기술
	    	String id = jdbc_username; //"root";                                                    // 사용자 계정
	    	String pw = jdbc_password; //"";                                                // 사용자 계정의 패스워드
	    	
	    	sReqid = req.getParameter("id");
	    	
	    	Class.forName(jdbc_driver/*"com.mysql.jdbc.Driver"*/);                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
	    	conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
	    	
	    	System.out.println("MYSQL DB CONNECTED.");                            // 커넥션이 제대로 연결되면 수행된다.
	    	
	    	java.sql.Statement st = null;
			ResultSet rs = null;
			st = conn.createStatement();
			
			rs = st.executeQuery("SELECT COUNT(*) AS RC , NAME FROM ENGINE WHERE CLUSTER_ID =" + sReqid);
	
			JSONObject data = new JSONObject();
	        if(rs.next())
	        {
		        data.put("rc", rs.getString("RC"));
		        data.put("eng_name", rs.getString("NAME"));
	        }
	        //JSONObject spec = new JSONObject();
	        //spec.put("data", data);
	        
	        rs.close();
	        st.close();
	        conn.close();
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

}
