﻿<%@ page contentType="text/html; charset=UTF-8" language="java" trimDirectiveWhitespaces="true" pageEncoding="UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@page import="com.ankus.web.member.Member"%>
<%
Member member = (Member)session.getAttribute("user");
String userId = "admin";
if(null != member){
	userId = member.getUsername();
}

Cookie[] cookies = request.getCookies();
boolean isLogin = false;
if(cookies != null){
	for(int i=0; i<cookies.length; i++){
		String name = cookies[i].getName();
		if(name != null){
			if(name.equals("authenticate")){
				isLogin = true;
				break;
			}
		}
	}
}

if(isLogin == false){
	return;
//	Cookie c = new Cookie("authenticate", "admin"+"/"+"ROLE_ADMIN");
//	response.addCookie(c);
}


%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title><spring:message code="MAIN_TITLE"/></title>
	<link rel="shortcut icon" href="../resources/images/favicon.ico"><!-- 파비콘 이미지 -->
    <link type="text/css" rel="stylesheet" href="/resources/lib/main/jquery-layout/layout-default-latest.css"/>
	<link type="text/css" rel="stylesheet" href="/resources/lib/main/jquery-ui/jquery-ui.structure.min.css">
	<link type="text/css" rel="stylesheet" href="/resources/lib/main/jquery-ui/jquery-ui.theme.min.css">
	<link type="text/css" rel="stylesheet" href="/resources/lib/main/jquery-contextMenu/jquery.contextMenu.min.css">
    <link type="text/css" rel="stylesheet" href="/resources/lib/main/jquery-uploadfile/uploadfile.css">
    <link type="text/css" rel="stylesheet" href="/resources/lib/main/jsTree/style.min.css"/>
    <link type="text/css" rel="stylesheet" href="/resources/lib/main/jqgrid/css/ui.jqgrid.min.css"/>
    <link type="text/css" rel="stylesheet" href="/resources/lib/main/jqgrid/css/font-awesome.min.css"/>
    <link type="text/css" rel="stylesheet" href="/resources/lib/main/codemirror/lib/codemirror.css"/>
    <link type="text/css" rel="stylesheet" href="/resources/lib/main/codemirror/addon/hint/show-hint.css">
    <link type="text/css" rel="stylesheet" href="/resources/lib/main/bootstrap/css/bootstrap.min.css"/>
    <link type="text/css" rel="stylesheet" href="/resources/lib/main/bootstrap/css/bootstrap-theme.min.css"/>
    <link type="text/css" rel="stylesheet" href="/resources/lib/main/datepicker/css/datepicker.css"/>
    <link type="text/css" rel="stylesheet" href="/resources/lib/main/nvd3/css/nv.d3.min.css"/>
    
    <style>
    .display_none {
    	display : none;
    }
    .browser_button {
    	margin : 3px;
    }
    #_main_alert,#_main_confirm {
    	z-index : 99999;
    }
    #_main_tabmenu {
    	z-index: 3 !important;
    	overflow: initial !important;
   	} 
        
    </style>
    <script>
	    function autoResize(i)
		{
			var iframeHeight=
		    (i).contentWindow.document.body.scrollHeight;
		    (i).height=iframeHeight+20;
		}
    </script>
</head>
<body>
	<input type="hidden" id="_main_userId" value="<%=userId%>" />
	<input type="hidden" id="_main_script_language" value="${script_language }" />
	<div class="ui-layout-north" id="_main_tabmenu">
		<nav class="navbar navbar-default" style="margin-bottom:0px;">
			<div class="container-fluid">				
				<ul class="nav navbar-nav" style="line-height:0px;">
				
					<li id="_tabDemandForecast" data-body="_conDemandForecast" class="active"><a href="#">수요량예측</a></li>
					<li id="_tabCauseBad" data-body="_conCauseBad"><a href="#">수요및불량원인분석</a></li>
					<li id="_tabPredictionBad" data-body="_conPredictionBad"><a href="#">불량예측및원인분석</a></li>
					
					<li class="dropdown">
						<a href = "#" class = "dropdown-toggle" data-toggle = "dropdown">외부데이터관리<span class="caret"></span></a>
						<ul class="dropdown-menu">
							<li id="_tabWorddic" data-body="_conWorddic"><a href="#">단어사전관리</a></li>
							<li id="_tabNewsOid" data-body="_conNewsOid"><a href="#">뉴스관리</a></li>	
							<li id="_tabBlogList" data-body="_conBlogList"><a href="#">블로그관리</a></li>
							<li id="_tabDataMgr" data-body="_conDataMgr"><a href="#">데이터 관리</a></li>
						</ul>
					</li>
					<li class="dropdown">
						<a href = "#" class = "dropdown-toggle" data-toggle = "dropdown">외부데이터조회<span class="caret"></span></a>
						<ul class="dropdown-menu">
							<li id="_tabFoodRisk" data-body="_conFoodRisk"><a href="#">뉴스조회</a></li>
							<li id="_tabBlogInfoList" data-body="_conBlogInfoList"><a href="#">블로그자료조회</a></li>
							<li id="_tabMallList" data-body="_conMallList"><a href="#">쇼핑몰자료조회</a></li>	
							<li id="_tabPublicData" data-body="_conPublicData"><a href="#">공공데이터조회</a></li>
						</ul>
					</li>
					<li id="_tabInnerData" data-body="_conInnerData"><a href="#">내부데이터등록</a></li>
					<li class="dropdown">
						<a href = "#" class = "dropdown-toggle" data-toggle = "dropdown">분석도구<span class="caret"></span></a>
						<ul class="dropdown-menu">
							<li id="_tabAnalyzer" data-body="_conAnalyzer"><a href="#"><spring:message code="MENU_WORKFLOW"/></a></li>
							<li id="_tabDashboard" data-body="_conDashboard"><a href="#"><spring:message code="MENU_FLOWMANAGE"/></a></li> 
							<!-- li id="_tabFileSystem" data-body="_conFileSystem"><a href="#"><spring:message code="MENU_HDFS_BROWSER"/></a></li-->
							<li id="_tabVisual" data-body="_conVisual"><a href="#"><spring:message code="MENU_CHART_TOOL"/></a></li>
						</ul>
					</li>
					<li id="_tabMyInfo" data-body="_conMyInfo"><a href="#"><spring:message code="MENU_MY_INFO"/></a></li>	
					<li class="dropdown">
						<a href = "#" class = "dropdown-toggle" data-toggle = "dropdown"><spring:message code="MENU_ADMIN_TOOLS"/><span class="caret"></span></a> 
						<ul class="dropdown-menu">
							<li id="_tabScheduler" data-body="_conSchduler"><a href="#"><spring:message code="MENU_SCHEDULER"/></a></li>
							<li id="_tabUserMgr" data-body="_conUserMgr"><a href="#"><spring:message code="MENU_USER_MANAGE"/></a></li>	
			            	<li id="_tabAlgMgr" data-body="_conAlgMgr"><a href="#"><spring:message code="MENU_ALGORITHM_MANAGE"/></a></li>	
			            	<li id="_tabLanguage" data-body="_conLanguage"><a href="#"><spring:message code="MENU_LANGUAGE_SETTING"/></a></li>	
						</ul>
					</li>
					<li id="_tabLogout"><a href="javascript:logout();"><spring:message code="MENU_LOGOUT"/></a></li>
				</ul>
			</div>
		</nav>
	</div>
	<div class="ui-layout-center">
		<div class="_body container" id="_conAnalyzer"><jsp:include page="../main/analyzer.jsp"/></div>
		<div class="_body" id="_conSchduler" style="display:none"><jsp:include page="../main/scheduler.jsp"/></div>
		<div class="_body" id="_conDashboard" style="display:none"><jsp:include page="../main/dashboard.jsp"/></div>
		<div class="_body" id="_conFileSystem" style="display:none"><jsp:include page="../main/filesystem.jsp"/></div>
		<div class="_body" id="_conVisual" style="display:none"><jsp:include page="../main/visual.jsp"/></div>
		<div class="_body" id="_conAlgMgr" style="display:none"><jsp:include page="../main/algmgr.jsp"/></div>		
		<div class="_body" id="_conUserMgr" style="display:none"><jsp:include page="../main/usermgr.jsp"/></div>		
		<div class="_body" id="_conMyInfo" style="display:none"><jsp:include page="../main/myinfo.jsp"/></div>
		<div class="_body" id="_conLanguage" style="display:none"><jsp:include page="../main/language.jsp"/></div>	
			
		<div class="_body" id="_conPublicData" style="display:none"><jsp:include page="../expantion/publicData.jsp"/></div>		
		<div class="_body" id="_conInnerData" style="display:none"><jsp:include page="../expantion/innerData.jsp"/></div>		
		<div class="_body" id="_conDataMgr" style="display:none"><jsp:include page="../expantion/dataMgr.jsp"/></div>
		
		<div class="_body" id="_conDemandForecast" style="display:none"></div>	
		<div class="_body" id="_conCauseBad" style="display:none"></div>
		<div class="_body" id="_conPredictionBad" style="display:none"></div>			
	</div>
	<style>
	.wrap-loading{
		position : fixed;
		left : 0;
		right : 0;
		top : 0;
		bottom :0;
		background : rgba(0,0,0,0.2);
		filter : progid:DXImageTransform.Microsoft.Gradient(startColorstr='#20000000', endColorstr='#20000000');
		z-index:99999;
	}
	.wrap-loading div{
		position : fixed;
		top : 50%;
		left : 50%;
		margin-left : -21px;
		margin-top : -21px;
	}
	
	</style>	
	<script src="/resources/lib/main/jquery/jquery.js"></script>
	<script src="/resources/lib/main/jquery-ui/jquery-ui.min.js"></script>	
	<script src="/resources/lib/main/jquery-contextMenu/jquery.contextMenu.min.js"></script>		
	<script src="/resources/lib/main/jquery-render/jsrender.min.js"></script>	
	<script src="/resources/lib/main/jquery-layout/jquery.layout-latest.js"></script>
	<script src="/resources/lib/main/jsTree/jstree.min.js"></script>
	<script src="/resources/lib/main/jqgrid/i18n/grid.locale-kr.min.js"></script>
	<script src="/resources/lib/jquery/jquery.i18n.properties.js"></script>
	<script src="/resources/lib/main/jqgrid/jquery.jqgrid.min.js"></script>
	<script src="/resources/lib/main/jqgrid/modules/jqdnr.js"></script>
	<script src="/resources/lib/main/jqgrid/modules/jqmodal.js"></script>
	<script src="/resources/lib/main/jqgrid/modules/grid.formedit.js"></script>
	<script src="/resources/lib/main/jqgrid/modules/grid.common.js"></script>
	<script src="/resources/lib/main/d3/js/d3.v3.min.js"></script>
	
	<script src="/resources/lib/main/opengraph/OpenGraph-0.1-SNAPSHOT.js"></script>
	<script src="/resources/lib/main/codemirror/lib/codemirror.js"></script>
	<script src="/resources/lib/main/codemirror/addon/hint/show-hint.js"></script>
	<script src="/resources/lib/main/codemirror/addon/hint/xml-hint.js"></script>
	<script src="/resources/lib/main/codemirror/mode/xml/xml.js"></script>
	<script src="/resources/lib/main/bootstrap/js/bootstrap.min.js"></script>
	<script src="/resources/lib/main/datepicker/js/bootstrap-datepicker.js"></script>
	<script src="/resources/lib/main/jquery-uploadfile/jquery.uploadfile.min.js"></script>
	<script src="/resources/lib/main/saveSvgAsPng/saveSvgAsPng.js"></script>
	<script src="/resources/lib/main/nvd3/js/nv.d3.min.js"></script>
	
	<script src="/resources/js/main/ankusApi.js"></script>
	<script src="/resources/js/main/language.js"></script>
	<script src="/resources/js/main/main.js"></script>
	<script src="/resources/js/main/analyzer.js"></script>
	<script src="/resources/js/main/scheduler.js"></script>
	<script src="/resources/js/main/dashboard.js"></script>
	<script src="/resources/js/main/filesystem.js"></script> 
	
	<script src="/resources/js/main/visual.js"></script>
	<script src="/resources/js/main/myinfo.js"></script>
	<script src="/resources/js/main/usermgr.js"></script>
	<script src="/resources/js/main/algmgr.js"></script>
	
	<script src="/resources/js/expantion/innerData.js"></script>
	<script src="/resources/js/expantion/publicData.js"></script>
	<script src="/resources/js/expantion/dataMgr.js"></script>
	<!--  
	<script src="/resources/js/main/monitoring.js"></script>
	<script src="/resources/js/main/hadoopmgr.js"></script>
	<script src="/resources/js/main/srvmgr.js"></script>
	<script src="/resources/js/main/hmetamgr.js"></script>
	<script src="/resources/js/main/hqrymgr.js"></script>
	-->

	<script>
	$(document).ready(function () {
		$('#_tabDemandForecast').trigger('click'); 
	});
	</script>
</body>
</html>
