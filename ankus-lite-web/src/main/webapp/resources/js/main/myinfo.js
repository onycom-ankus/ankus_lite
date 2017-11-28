(function myinfo(){
	
	var session_userId = $("#_main_userId").val();
	
	/* 나의 정보 탭 */
	$("#_tabMyInfo").on("click", function() {
		
		$('#_mi_createModal').ankusModal('show');
		
		/* 유저정보 조회(아이디, 이메일) */
		ANKUS_API.ajax({
			url : "/user_info/get",
			data : {"username" : session_userId, "method" : "get"},
			success : function(result){
				var username = result.data.USERNAME;
				var email = result.data.EMAIL;
				var name = result.data.NAME;
				
				$("#_mi_username").val(username);
				$("#_mi_email").val(email);
				$("#_mi_name").val(name);
				
				$("#_mi_curPwd, #_mi_newPwd1, #_mi_newPwd2").val("");
				$("#_mi_newPwd1, #_mi_newPwd2, #_mi_email").attr("readonly", "readonly");
			}
		});
		
		/* 현재 비밀번호 입력 확인 */
		$("#_mi_btnPwd").on("click", _confirmPassWord);
		
		/* 나의 정보 변경 적용 */
		$("#_mi_btnSubmit").on("click", _submitAction);
		
		/* 나의 정보 변경 취소 */
		$("#_mi_btnCancel").on("click", _cancelAction);
	});
	
	var _confirmPassWord = function() {
		var curPwd = $('#_mi_curPwd').val();
		var length = curPwd.length;
		
		if(length == 0){
			ANKUS_API.util.alert(i18nP('JS_MYINFO_INPUT_CHECK_CUR_PW'));
			return;
			
		} else {
			ANKUS_API.ajax({
				url : "/edit_authenticate",
				data : {"id" : session_userId, "passwd" : curPwd},
				success : function(data) {
					var code = data.map.code;
					var msg = data.map.message;
					
					if(code != 0) {
						ANKUS_API.util.alert(msg);
						
					} else {
						$("#_mi_newPwd1").removeAttr("readonly");
						$("#_mi_newPwd2").removeAttr("readonly");
						$("#_mi_email").removeAttr("readonly");
						$("#_mi_btnSubmit").removeAttr("disabled");
						
						$("#_mi_newPwd1").focus();
					}
				}
			});
		}
	};
	
	var _cancelAction = function(){
		$('#_mi_createModal').ankusModal('hide');
	};
	
	var _submitAction = function() {
		var newPwd1 = $("#_mi_newPwd1").val();
		var newPwd2 = $("#_mi_newPwd2").val();
		var email = $("#_mi_email").val();
		var name = $("#_mi_name").val();
		
		if(newPwd1.length < 1) {
			ANKUS_API.util.alert(i18nP('JS_MYINFO_INPUT_CHECK_NEW_PW'));
			return;
		}
		
		if(!vaildationCheck(newPwd1)) {
			ANKUS_API.util.alert('비밀번호는 영문자+숫자+특수문자로  8~15 자리  입력하시기 바랍니다.');
			return;
		}
		
		if(email.length < 1){
			ANKUS_API.util.alert(i18nP('JS_MYINFO_INPUT_CHECK_EMAIL'));
    		return;
    	}
		
    	if(validateEmail(email) == false){
    		ANKUS_API.util.alert(i18nP('JS_MYINFO_INPUT_CHECK_EMAIL_TYPE'));
         	return;
    	}
		
		if(newPwd1 != newPwd2) {
			ANKUS_API.util.alert(i18nP('JS_MYINFO_NOT_MATCH_PW'));
			return;
		}
		
		ANKUS_API.ajax({
			url : "/user_info/get",
			data : {"username" : session_userId, "name" : name, "passwd" : newPwd1, "email" : email, "method" : "update"},
			success : function(result){
				console.log(result);
				ANKUS_API.util.alert(i18nP('JS_MYINFO_SUCCESS_UPDATE'));
				$('#_mi_createModal').ankusModal('hide');
			}
		});
	}
	
	function vaildationCheck(strValue) 
	{
		var regExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
		if(strValue.length == 0) {return false;}
		if (!regExp.test(strValue)) {return false;}
		return true;
	} 
	
	/* 이메일 유효성 체크 */
    function validateEmail(text) {
    	var isEmail = false;
    	var emailPattern = /^((([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z\s?]{2,5}){1,25})*(\s*?;\s*?)*)*$/;
    	if(emailPattern.test(text) == true){
    		isEmail = true;
    	}
    	return isEmail;
    }
})();