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

package com.ankus.web.designer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;


public class WorkflowImport extends HttpServlet {

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
    	
    	String str_name = "";
    	str_name = req.getParameter("name");   
    	
    	String str_wf_id = "";	
    	String str_wfxml = "";
		String str_dsxml = "";
    	
    	Connection conn = null;  
    	
    	try{
	    	String url = jdbc_url; //"jdbc:mysql://localhost:3306/";        // 사용하려는 데이터베이스명을 포함한 URL 기술
	    	String id = jdbc_username; //"root";                                                    // 사용자 계정
	    	String pw = jdbc_password; //"";                                                // 사용자 계정의 패스워드
	
	    	Class.forName(jdbc_driver/*"com.mysql.jdbc.Driver"*/);                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
	    	conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
	    	JSONObject JARversion = new JSONObject();
	    	java.sql.Statement st = null;
	    	PreparedStatement pstmt = null;
	    	ResultSet rs = null;
			st = conn.createStatement();					
		    //SELECT BLOCK
						
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
			
			 pstmt = conn.prepareStatement("INSERT INTO TREE ( ID, NAME, TREE, NODE, ROOT, USERNAME, PARENT_ID ) VALUES ( 0, ?, 'WORKFLOW','ITEM', 0, 'admin', 1 )" );
			 pstmt.setString(1, str_name);
			 pstmt.executeUpdate();
			 
			 rs = st.executeQuery("SELECT MAX(ID) AS ID FROM TREE");	
			 while (rs.next ()){
				 str_wf_id = rs.getString("ID");					
			}
			 
			 pstmt = conn.prepareStatement("INSERT INTO WORKFLOW ( ID, WORKFLOW_ID, NAME, DESCRIPTION, VARIABLE, WORKFLOW_XML, DESIGNER_XML, CREATE_DT, STATUS, TREE_ID, USERNAME ) VALUES ( 0, CONCAT('WF_',CURDATE()+0,'_',FLOOR(RAND()*1000000000)), ?,'',NULL, ?, ?, NOW(), 'REGISTERED',?, 'admin' )" );
			 pstmt.setString(1, str_name);
			 pstmt.setString(2, str_wfxml);
			 pstmt.setString(3, str_dsxml);
			 pstmt.setString(4, str_wf_id);
			 pstmt.executeUpdate();
			 
			 dfs.delete(filenamePath, true);
			 
	    }
    	catch(Exception e)
    	{                                                    // 예외가 발생하면 예외 상황을 처리한다.
	    	System.out.println(e.toString());
    	}
    }
    
}
	    	