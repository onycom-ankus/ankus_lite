/*
 *	SimpleImageInfo.java
 *
 *	@version 0.1
 *	@author  Jaimon Mathew <http://www.jaimon.co.uk>
 *
 *	A Java class to determine image width, height and MIME types for a number of image file formats without loading the whole image data.
 *
 *	Revision history
 *	0.1 - 29/Jan/2011 - Initial version created
 *
 *  -------------------------------------------------------------------------------
 
 	This code is licensed under the Apache License, Version 2.0 (the "License"); 
 	You may not use this file except in compliance with the License. 

 	You may obtain a copy of the License at 

 	http://www.apache.org/licenses/LICENSE-2.0 

	Unless required by applicable law or agreed to in writing, software 
	distributed under the License is distributed on an "AS IS" BASIS, 
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
	See the License for the specific language governing permissions and 
	limitations under the License.
	
 *  -------------------------------------------------------------------------------
 */

package com.ankus.web.common.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

import com.sshtools.j2ssh.SshClient;
import com.sshtools.j2ssh.authentication.AuthenticationProtocolState;
import com.sshtools.j2ssh.authentication.PasswordAuthenticationClient;
import com.sshtools.j2ssh.connection.ChannelInputStream;
import com.sshtools.j2ssh.connection.ChannelOutputStream;
import com.sshtools.j2ssh.session.SessionChannelClient;
import com.sshtools.j2ssh.transport.IgnoreHostKeyVerification;

public class Util_tajo_n_shell {
	
	// tajo & shell func...
	
	static public ArrayList<String> tajo_getDatabases(String ip, long port) throws Exception
	{
//		try {
			Connection conn = tajo_connect(ip, port, "information_schema");
			
			String sql = String.format("select db_name from databases");
			ResultSet rs = tajo_query(conn, sql);
			
			ArrayList<String> dbs = new ArrayList<String>();
			while(rs.next())
			{
				dbs.add(rs.getString("db_name"));
			}
			rs.close();
			conn.close();
			return dbs;
//		}
//		catch (Exception e) {
//			e.printStackTrace();
//			return null;
//		}
	}

	static public ArrayList<String> tajo_getTables(String ip, long port, String database) throws Exception
	{
		if(database.isEmpty()) return null;
//		try {
			Connection conn = tajo_connect(ip, port, "information_schema");
			
			String sql = String.format("select db_id from databases where db_name='%s'", database);
			ResultSet rs = tajo_query(conn, sql);
			
			String db_id="";
			if(rs.next())
			{
				db_id = rs.getString("db_id");
			}
			rs.close();
			if(db_id.isEmpty())
			{
				conn.close();
				return null;
			}
			
			sql = String.format("select table_name from tables where db_id=%s", db_id);
			rs = tajo_query(conn, sql);
			
			ArrayList<String> tbls = new ArrayList<String>();
			while(rs.next())
			{
				tbls.add(rs.getString("table_name"));
			}
			rs.close();
			conn.close();
			return tbls;
//		}
//		catch (Exception e) {
//			e.printStackTrace();
//			return null;
//		}
	}

	static public boolean tajo_createDatabase(String ip, long port, String database) throws Exception
	{
		if(database.isEmpty()) return false;
//		try {
			Connection conn = tajo_connect(ip, port, "default");
			if(conn==null) return false;
			String sql = String.format("CREATE DATABASE IF NOT EXISTS %s", database);
			boolean ret = tajo_execsql(conn, sql);
			conn.close();
			return ret;
//			}
//		catch (Exception e) {
//			e.printStackTrace();
//			return false;
//		}
	}

	static public boolean tajo_createTable(String ip, long port, String database, String createsql) throws Exception
	{
		if(database.isEmpty()) return false;
//		try {
			Connection conn = tajo_connect(ip, port, database);
			if(conn==null) return false;
			boolean ret = tajo_execsql(conn, createsql);
			conn.close();
			return ret;
//		}
//		catch (Exception e) {
//			e.printStackTrace();
//			return false;
//		}
	}

	static public boolean tajo_dropTable(String ip, long port, String database, String table) throws Exception
	{
		if(database.isEmpty() || table.isEmpty()) return false;
//		try {
			Connection conn = tajo_connect(ip, port, database);
			if(conn==null) return false;
			String sql = String.format("DROP TABLE IF EXISTS %s", table);
			boolean ret = tajo_execsql(conn, sql);
			conn.close();
			return ret;
//		}
//		catch (Exception e) {
//			e.printStackTrace();
//			return false;
//		}
	}

	static public boolean tajo_dropdatabase(String ip, long port, String database) throws Exception
	{
		if(database.isEmpty()) return false;
//		try {
			Connection conn = tajo_connect(ip, port, "default");
			if(conn==null) return false;
			String sql = String.format("DROP DATABASE IF EXISTS %s", database);
			boolean ret = tajo_execsql(conn, sql);
			conn.close();
			return ret;
//		}
//		catch (Exception e) {
//			e.printStackTrace();
//			return false;
//		}
	}
	
	static public Connection tajo_connect(String ip, long port, String database) throws Exception
	{
//		try {
			 Class.forName("org.apache.tajo.jdbc.TajoDriver").newInstance();
			 Connection conn = DriverManager.getConnection(String.format("jdbc:tajo://%s:%d/%s", ip, port, database));
			 return conn;
//		} catch (Exception e)
//		{
//			e.printStackTrace();
//		}
//		return null;
	}

	static public ResultSet tajo_query(Connection conn, String sql) throws Exception
	{
//        try {
        	Statement stmt = conn.createStatement();
        	return stmt.executeQuery(sql);
//		} catch (Exception e)
//		{
//			e.printStackTrace();
//		}
//		return null;
	}

	static public boolean tajo_execsql(Connection conn, String sql) throws Exception
	{
//        try {
        	Statement stmt = conn.createStatement();
        	return stmt.execute(sql);
//		} catch (Exception e)
//		{
//			e.printStackTrace();
//		}
//		return false;
	}
	
	static public SessionChannelClient connect_ssh(String host, int port, String uid, String pwd)
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
		   // SSH 터미널 커맨드 실행용
		   SessionChannelClient session = client.openSessionChannel();
		   session.requestPseudoTerminal("terminal", 80, 25, 0, 0 , "");
		   session.startShell();
		   return session;
		}
		catch (Exception e) {
		   	System.out.println("Exception:"+e.getMessage());
		}
    	return null;
	}
	
	static public String execcmd(SessionChannelClient session, String cmd, String prompt)
	{
		   ChannelInputStream is = session.getInputStream();
		   ChannelOutputStream os = session.getOutputStream();
		   StringBuffer buff = new StringBuffer();
		   byte[] b = new byte[4096];

		   try {
			   if(!cmd.isEmpty()) os.write(cmd.getBytes());
			   while(true)
			   {
				   int cnt = is.read(b);
				   buff.append(new String(b, 0, cnt));
				   
				   if(buff.toString().endsWith(prompt)) break;
			   }
		   } catch (Exception e) {
			   System.out.printf("execcmd(%s):%s\n", cmd, e.getMessage());
			   return buff.toString();
		   }
		
		return buff.toString();
	}	
}