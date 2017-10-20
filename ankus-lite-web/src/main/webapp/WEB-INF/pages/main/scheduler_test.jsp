<%@ page contentType="text/html; charset=UTF-8" language="java" trimDirectiveWhitespaces="true" pageEncoding="UTF-8" %>
<%
/*
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
	Cookie c = new Cookie("authenticate", "admin"+"/"+"ROLE_ADMIN");
	response.addCookie(c);
}

*/
%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>scheduler</title>
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
    #_main_alert {
    	z-index : 99999;
    }    
    </style>
</head>
<body>	

<h2>스케쥴러 관리자</h2>
<div style='border:2px solid red'>
워크플로우:<select><option>workflow</option></select><br>
월 : 전체<input type=checkbox> 1<input type=checkbox> 2<input type=checkbox> 3<input type=checkbox> 4<input type=checkbox><br>
주 : 전체<input type=checkbox> 1<input type=checkbox> 2<input type=checkbox> 3<input type=checkbox> 4<input type=checkbox><br>
일 : <input type=text>* 실행일을 , 구분자로 입력하여 주세요<br>
시 : <input type=text>* 실행시간을 , 구분자로 입력하여 주세요<br>
분 : <input type=text>* 실행분을 , 구분자로 입력하여 주세요<br>
<button>저장</button>
</div>
<br>
<table border=1>
<tr><th>워크플로우</th><th>실행주기</th><th>상태</th><th>실행시간</th></tr>
<tr><td>work1</td><td>---</td><td>실행중</td><td>2016-12-12 00:00:00</td></tr>
<tr><td>work1</td><td>---</td><td>실행중</td><td>2016-12-12 00:00:00</td></tr>
<tr><td>work1</td><td>---</td><td>실행중</td><td>2016-12-12 00:00:00</td></tr>
</table>

<hr>
<h2>산정식 관리자</h2>
<div style='border:2px solid red'>
산정식명 :<select><option>산정식 선택...</option></select><br>
초기값:<input/><br>
보정값:<input/><br>
<button>산정식 추가</button><button>산정식 삭제</button>
<button>항추가</button>
<button>항삭제</button>
</div>
<br>
<table border=1>
<tr><th>산정식명</th><th>초기값</th><th>오류값</th></tr>
<tr><td>지정식품위해도1</th><td>5.0</th><td>5.0</th></tr>
<tr><td>지정식품위해도2</th><td>5.0</th><td>5.0</th></tr>
<tr><td>비지정식품위해도1</th><td>5.0</th><td>5.0</th></tr>
<tr><td>비지정식품위해도2</th><td>5.0</th><td>5.0</th></tr>
</table>
<br><br>
산정식선택 :<select><option>산정식명</option></select><br>

<div style='border:2px solid red'>
가중치:<input/><br>
워크플로우 :<select><option>워크플로우</option></select><br>
<button>항추가</button>
<button>항삭제</button>
</div>
<table border=1>
<tr><th>가중치</th><th>워크플로우</th></tr>
<tr><td>0.5</th><td>식중독 발병</th></tr>
<tr><td>0.9</th><td>기온</th></tr>
</table>


* 산정식 = sum(가중치1X워크플로1, 가중치2X워크플로2 , .. , 가중치nX워크플로n) + 보정값<br>
* 초기값은 각 항의 값이 missing value 일때의  값 
</body>
</html>
