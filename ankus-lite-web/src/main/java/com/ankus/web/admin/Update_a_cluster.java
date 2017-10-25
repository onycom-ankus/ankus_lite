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

public class Update_a_cluster extends HttpServlet {
	
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
    	String target_id  = "";
    	String name = "";
    	String protocol = "", namenode_ip = "", namenode_port="",
    			jobtrackerIP= "", jobtrackerPORT= "", namenodeConsole="",
    			jobtrackerConsole="", namenodeMonitorPort="",jobtrackerMonitorPort="";
    			
    	try
    	{
    		
	    	String url = jdbc_url; //"jdbc:mysql://localhost:3306/";        // 사용하려는 데이터베이스명을 포함한 URL 기술
	    	String id = jdbc_username; //"root";                                                    // 사용자 계정
	    	String pw = jdbc_password; //"";                                                // 사용자 계정의 패스워드
	    	// 사용자 계정의 패스워드
	    	target_id = req.getParameter("id");
	    	
	    	name = req.getParameter("name");
	    	protocol = req.getParameter("namenodeProtocol");
	    	
	    	namenode_ip = req.getParameter("namenodeIP");
	    	namenode_port = req.getParameter("namenodePort");
	    	
	    	jobtrackerIP = req.getParameter("jobTrackerIP");
	    	jobtrackerPORT = req.getParameter("jobTrackerPort");
	    	
	    	namenodeConsole = req.getParameter("namenodeConsole");
	    	jobtrackerConsole = req.getParameter("jobTrackerConsole");
	    
	    	namenodeMonitorPort = req.getParameter("namenodeMonitoringPort");
	    	jobtrackerMonitorPort = req.getParameter("jobTrackerMonitoringPort");
	    	
	    	Class.forName(jdbc_driver/*"com.mysql.jdbc.Driver"*/);                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
	    	conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
	    	
	    	System.out.println("제대로 연결되었습니다.");                            // 커넥션이 제대로 연결되면 수행된다.
	    	
	    	//동일한 클러스터 명이 있는지 조사하여 있으면 등록 거부함.-삭제.
	    	
	    	java.sql.Statement st = null;
		
					
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
			
			System.out.println(update_query);
			
			st = conn.createStatement();
			int rtn = st.executeUpdate(update_query);
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
	        st.close();
	        conn.close();
	        
	        	
	    }
    	catch(Exception e)
    	{                                                    // 예외가 발생하면 예외 상황을 처리한다.
	    	System.out.println(e.toString());
    	}
    }
}
