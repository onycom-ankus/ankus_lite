<%@ page contentType="text/html; charset=UTF-8" language="java" trimDirectiveWhitespaces="true" pageEncoding="UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title><spring:message code="LOGIN_MODAL_MODEL_MGR"/></title>
	<link rel="shortcut icon" href="/resources/images/favicon.ico"><!-- 파비콘 이미지 -->
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

    html, body{ height:100%; margin:0px; }
    
    </style>
</head>
<body>
<input type="hidden" id="_main_script_language" value="${script_language }" />
<table style="height:100%; width:100%;">
<tr valign=middle><th>
<center><image onclick='bodyclick();' src='/resources/images/favicon.ico'/></center>
</th></tr>
</table>
	<div id="_loginModal" class="modal fade" role="dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<!-- <button type="button" class="close" data-dismiss="modal">&times;</button>-->
					<h4 class="modal-title"><img width=32 src="/resources/images/favicon.ico"/> Big Data Analytics Platform </span></span></h4>
				</div>
				<div class="modal-body">
					<div class="form-horizontal">
						<div class="form-group">
							<center><img src="/resources/images/about/logo.png"></center>
						</div>
						<div class="form-group">
							<label for="_account" class="col-sm-2 control-label"><spring:message code="LOGIN_MODAL_TITLE_ID"/></label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="_account"/>
							</div>
						</div>
						<div class="form-group">
							<label for="_password" class="col-sm-2 control-label"><spring:message code="LOGIN_MODAL_TITLE_PW"/></label>
							<div class="col-sm-10">
								<input type="password" class="form-control" id="_password"/>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn" id="_btnRegist"><spring:message code="LOGIN_MODAL_BTN_SIGN_UP"/></button>
					<button class="btn btn-default" id="_btnLogin"><spring:message code="LOGIN_MODAL_BTN_LOGIN"/></button>
					<button class="btn" id="_btnFindpassword"><spring:message code="LOGIN_MODAL_BTN_FIND"/></button>
				</div>
			</div>
		</div>
	</div>
	
	<div id="_registModal" class="modal fade" role="dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title"><spring:message code="LOGIN_MODAL_BTN_SIGN_UP"/></h4>
				</div>
				<div class="modal-body">
					<div class="form-horizontal">
						<div class="form-group">
							<label for="_account" class="col-sm-2 control-label"><spring:message code="LOGIN_MODAL_TITLE_ID"/></label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="_reg_account"/>
							</div>
						</div>
						
						<div class="form-group">
							<label for="_account" class="col-sm-2 control-label"><spring:message code="LOGIN_MODAL_TITLE_EMAIL"/></label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="_reg_email"/>
							</div>
						</div>

						<div class="form-group">
							<label for="_password" class="col-sm-2 control-label"><spring:message code="LOGIN_MODAL_TITLE_PW"/></label>
							<div class="col-sm-10">
								<input type="password" class="form-control" id="_reg_password"/>
							</div>
						</div>
						
						<div class="form-group">
							<label for="_password" class="col-sm-2 control-label"><spring:message code="LOGIN_MODAL_TITLE_PW_CONFIRM"/></label>
							<div class="col-sm-10">
								<input type="password" class="form-control" id="_reg_password2"/>
							</div>
						</div>

						<div class="form-group">
							<label for="_password" class="col-sm-2 control-label"><spring:message code="LOGIN_MODAL_TITLE_SIGN_UP_STEP"/></label>
							<div class="col-sm-10">
								<spring:message code="LOGIN_MODAL_SIGN_UP_STEP"/>
							</div>
						</div>
					
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn btn-default" id="_btn_registok"><spring:message code="COMMON_CONFIRM"/></button>
					<button class="btn btn-default" id="_btn_registcancel"><spring:message code="COMMON_CANCEL"/></button>
				</div>
			</div>
		</div>
	</div>	
	
	<div id="_findpwdModal" class="modal fade" role="dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title"><spring:message code="LOGIN_MODAL_BTN_FIND"/></h4>
				</div>
				<div class="modal-body">
					<div class="form-horizontal">
						<div class="form-group">
							<label for="_account" class="col-sm-2 control-label"><spring:message code="LOGIN_MODAL_TITLE_ID"/></label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="_find_account"/>
							</div>
						</div>
						<div class="form-group">
							<label for="_password" class="col-sm-2 control-label"><spring:message code="LOGIN_MODAL_TITLE_EMAIL"/></label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="_find_email"/>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn btn-default" id="_btn_findok"><spring:message code="COMMON_CONFIRM"/></button>
					<button class="btn btn-default" id="_btn_findcancel"><spring:message code="COMMON_CANCEL"/></button>
				</div>
			</div>
		</div>
	</div>		

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
		
	<script src="/resources/lib/main/bootstrap/js/bootstrap.min.js"></script>
	<script src="/resources/lib/main/datepicker/js/bootstrap-datepicker.js"></script>
	<script src="/resources/lib/main/nvd3/js/nv.d3.min.js"></script>
	
	<script src="/resources/js/main/ankusApi.js"></script>
	<script src="/resources/js/main/language.js"></script>

	<script>
	
	function emailcheck(strValue) 
	{
		var regExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
		if(strValue.length == 0) {return false;}
		//이메일 형식에 맞지않으면
		if (!regExp.test(strValue)) {return false;}
		return true;
	} 
	
	function vaildationCheck(strValue) 
	{
		var regExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
		if(strValue.length == 0) {return false;}
		if (!regExp.test(strValue)) {return false;}
		return true;
	} 
	
	// 회원가입 다이얼로그
	function regist()
	{
		$('#_reg_account,#_reg_email,#_reg_password,#_reg_password2').val('');
		$('#_btn_registcancel').on('click', function() {$('#_registModal').ankusModal('hide');});
		$('#_btn_registok').on('click', registok );
		$('#_registModal').ankusModal('show');
	}
	
	// 회원가입실행...
	function registok()
	{
		var data = {};
		data.username	= $('#_reg_account').val();
		data.email		= $('#_reg_email').val();
		data.password	= $('#_reg_password').val();
		data.language 	= "ko";

		//if($('#_reg_account').val().length==0)
		//{
		//	ANKUS_API.util.alert(i18nP('JS_LOGIN_SIGN_UP_CHECK', i18nP('LOGIN_MODAL_TITLE_ID')));
		//	return;
		//}
		
		//if($('#_reg_password').val().length==0)
		//{
		//	ANKUS_API.util.alert(i18nP('JS_LOGIN_SIGN_UP_CHECK', i18nP('LOGIN_MODAL_TITLE_PW')));
		//	return;
		//}
		
		if(!vaildationCheck($('#_reg_account').val())){
			ANKUS_API.util.alert('아이디는 영문자+숫자+특수문자로  8~15 자리  입력하시기 바랍니다.');
			return;
		}
		
		if(!vaildationCheck($('#_reg_password').val())){
			ANKUS_API.util.alert('비밀번호는 영문자+숫자+특수문자로  8~15 자리  입력하시기 바랍니다.');
			return;
		}
		
		if($('#_reg_password').val()!=$('#_reg_password2').val())
		{
			ANKUS_API.util.alert(i18nP('JS_LOGIN_SIGN_UP_NOT_MATCH_PW'));
			return;
		}
		
		if(!emailcheck($('#_reg_email').val()))
		{
			ANKUS_API.util.alert(i18nP('JS_LOGIN_SIGN_UP_CHECK_EMAIL'));
			return;
		}
		
		
		ANKUS_API.ajax({
			url			: '/signup',
			type		: 'POST',
			data		: JSON.stringify(data),
			success		: function(res){
				console.log(res);
				var obj = res.map;

				if(obj.code==0)
				{
					ANKUS_API.util.alert(i18nP('JS_LOGIN_SIGN_UP_SUCCESS'));
					$('#_registModal').ankusModal('hide');
				}
				else
				{
					ANKUS_API.util.alert(obj.message);
				}
			}
		});
		
	}

	// 로그인 실행...
	function login()
	{
		var data = {};
		data.username	= $('#_account').val();
		data.password	= $('#_password').val();
		
		ANKUS_API.ajax({
			url			: '/authenticate',
			type		: 'POST',
			data		: JSON.stringify(data),
			success		: function(res){
				console.log(res);
				var obj = res.map;

				if(obj.code==0)
				{
					$(location).attr('href',"/main");
				}
				else
				{
					ANKUS_API.util.alert(obj.message);
				}
			}
		});
	}
	
	// 비밀번호 찾기다이얼로그 ..	
	function findpassword()
	{
		$('#_btn_findcancel').on('click', function() {$('#_findpwdModal').ankusModal('hide');});
		$('#_btn_findok').on('click', findok );
		$('#_findpwdModal').ankusModal('show');
	}
	
	// 비밀번호 찾기실행..
	function findok()
	{
		var data = {};
		data.username	= $('#_find_account').val();
		data.email	= $('#_find_email').val();
		
		ANKUS_API.ajax({
			url			: '/findpass',
			type		: 'POST',
			data		: JSON.stringify(data),
			success		: function(res){
				console.log(res);
				var obj = res.map;

				if(obj.code==0)
				{
					ANKUS_API.util.alert(i18nP('JS_LOGIN_FIND_TMP_PW', res.object));
				}
				else
				{
					ANKUS_API.util.alert(obj.message);
				}
			}
		});
		
	}
	
	function bodyclick()
	{
		$('#_loginModal').ankusModal('show');
		
		setTimeout(function() { $('#_account').focus();} , 500);
	}
	
	$(document).ready(function () {
		bodyclick();
		
		$('#_btnRegist').on('click', regist);
		$('#_btnLogin').on('click', login);
		$('#_btnFindpassword').on('click', findpassword);
		
		$('#_password').on('keypress', function(e) { if (e.which == 13) { login(); }});		
		$('#_account').on('keypress', function(e) { if (e.which == 13) { $('#_password').focus(); }});		
	});
	</script>	

</body>
</html>