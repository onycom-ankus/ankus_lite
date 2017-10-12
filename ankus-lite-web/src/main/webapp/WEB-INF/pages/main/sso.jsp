﻿<%@page import="java.util.Date"%>
<%@ page contentType="text/html; charset=UTF-8" language="java" trimDirectiveWhitespaces="true" pageEncoding="UTF-8" %>
<%!
	public java.sql.ResultSet getRs(java.sql.Connection conn, String sql)
	{
		java.sql.Statement stmt = null;
		try{
			stmt = conn.createStatement(java.sql.ResultSet.TYPE_SCROLL_INSENSITIVE,java.sql.ResultSet.CONCUR_READ_ONLY);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			System.out.println("createStatement Error:"+e.getMessage());
//			JspWrite("createStatement Error:"+e.getMessage());
			return null;
		}

		try{
			return stmt.executeQuery(sql);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			System.out.println(sql+" State Exec Error:"+e.getMessage());
//			JspWrite(sql+" State Exec Error:"+e.getMessage());
			return null;
		}
	}
	public int update_sql(java.sql.Connection conn, String sql)
	{
		try {

			if(conn==null) return -1;
			java.sql.Statement stmt = conn.createStatement();
			int ret =  stmt.executeUpdate(sql);
	//		conn.close();
			return ret;
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
		return -1;
	}
%>
<%
request.setCharacterEncoding("utf-8");

org.springframework.web.context.WebApplicationContext wac = org.springframework.web.context.support.WebApplicationContextUtils.getWebApplicationContext(((HttpServletRequest) request).getSession().getServletContext());

com.zaxxer.hikari.HikariDataSource pool = (com.zaxxer.hikari.HikariDataSource)wac.getBean("pooledDataSource");

java.sql.Connection con = pool.getConnection();


java.sql.ResultSet rs = getRs(con, "select 1");

if(request.getParameter("help")!=null)
{
	%>
	<pre>
	chgtime : 스케쥴러시간 설정(yyyy-mm-dd hh:mm:ss)
	delres : 산정식 결과 삭제(yyyy-mm-dd)
	reset_chgtime : 스케쥴러시간 초기화
	reset_schedule : 스케쥴러상태 초기화
	time : 현재의 웹서버 시간조회
	word : 단어사전 작업
	key : api key로 바로 로그인
	</pre>
	<%
	con.close();
	return;
}
if(request.getParameter("myip")!=null)
{
	%>
	Remote Addr: <%=request.getRemoteAddr() %>
	<%
	con.close();
	return;
}
if(request.getParameter("reset_schedule")!=null)
{
	String sql = String.format("UPDATE SCHEDULER SET STATE='', ENDTIME=RUNTIME WHERE STATE IN ('RUNNING','PREPARING')");
	update_sql(con, sql);
	%>
	<%=sql%>
	<%
	con.close();
	return;
}
if(request.getParameter("reset_chgtime")!=null)
{
	update_sql(con, "DELETE FROM config WHERE item='now'");			
	%>
	DELETE FROM config WHERE item='now'
	<%
	con.close();
	return;
}
if(request.getParameter("time")!=null)
{
	java.text.SimpleDateFormat df = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm");
	String runtime = df.format(new java.util.Date());
	%>
	<%=runtime%>
	<%
	con.close();
	return;
}

con.close();

String uid = "admin";
String role = "ROLE_ADMIN";
if(!(request.getParameter("uid")==null))
{
	uid = (String)request.getParameter("uid");
	role = (String)request.getParameter("role");
}

System.out.printf("uid=%s\n",uid);

com.ankus.web.member.Member member = new com.ankus.web.member.Member();//commonController.memberService.getMemberByUser(uid);

member.setUsername(uid);
member.setAuthority(role);

if(member==null) {
	response.sendRedirect("about:blank");
	return;
}
else
{
	HttpSession _session = request.getSession(true);
	javax.servlet.http.Cookie c = new javax.servlet.http.Cookie("authenticate", member.getUsername()+"/"+member.getAuthority());
	response.addCookie(c);
	_session.setAttribute("user", member);
	response.sendRedirect("/main");
	return;
}
%>