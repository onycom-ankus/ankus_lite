/* i18n 최대 2개의 파라미터를 포함한 프로퍼티를 가져올수 있는 function */
function i18nP(key, param1, param2) {
	var pattern = /\[.+\]/g;
	
	if(typeof param1 != 'undefined' && typeof param2 == 'undefined') {
		var p1 = $.i18n.prop(param1);
		
		return $.i18n.prop(key, p1.match(pattern) != null ? param1 : $.i18n.prop(param1));
	}
	
	if(typeof param2 != 'undefined') {
		var p1 = $.i18n.prop(param1);
		var p2 = $.i18n.prop(param2);
		
		return $.i18n.prop(key, p1.match(pattern) != null ? param1 : $.i18n.prop(param1),
								p2.match(pattern) != null ? param2 : $.i18n.prop(param2));
	}
	
	return $.i18n.prop(key);
}

(function language(){
	$.ajax({
		url : "/lang/getLanguage",
		type:"post",
		dataType:"json",
		async:false,
		success : function(res) {
			$.i18n.properties({
			    name:'messages', 
			    path:'/resources/language/', 
			    mode:'both',
			    language:res, 
			    callback: function() {
			    	console.log("Script Language : " + res);
//			        jQuery.i18n.prop('HEADER_MENU.WORKFLOW');
//			        jQuery.i18n.prop('msg_complex', 'John');
			    }
			});
			
			$("#_lang_selLang").val(res);
		}
	});
	
	var href = location.href;
	var origin = location.origin;
	var pathname = location.pathname;
	var search = location.search;
	var url = origin + pathname;
	
	$("#_tabLanguage").on("click", function() {
		$("#_lang_Modal").ankusModal('show');
		
		$("#_lang_btnCancel").on("click", function(e) {
			e.preventDefault();
			$("#_lang_Modal").ankusModal('hide');
		});
		
		$("#_lang_btnSubmit").on("click", _lang_btnSubmit);
	});
	
	var _lang_btnSubmit = function() {
		
		var lang = $("#_lang_selLang").val();
		
		switch (lang) {
		case "ko":
			alertProp = "JS_LANGUAGE_KOREAN";
			break;
		case "en":
			alertProp = "JS_LANGUAGE_ENGLISH";
			break;
		case "ja":
			alertProp = "JS_LANGUAGE_JAPANESE";
			break;
		default:
			alertProp = "JS_LANGUAGE_KOREAN";
			break;
		}
		
		ANKUS_API.util.confirm({
			description	: i18nP('JS_MENU_LANGUAGE_SETTING_CHANGE', alertProp),
			callback : function(sel){
				
				if(!sel) {
					return;
				}
				
		/*		
				http://localhost:18080/main?lang=ko 일경우
				http://localhost:18080/main?test=test&lang=ko
				http://localhost:18080/main?lang=ko&test=test
				http://localhost:18080/main?test=test
				http://localhost:18080/main?test=test&lang=ko&
				
				위의 url 패턴 체크 후 lang=ko, en, jp 만 바꾸어줌.
				
				if(search != "") {
					var pattern = /\lang=.+\&/g;	// pattern = lang=**&
					
					if(search.match(pattern) != null) {	
						search = search.replace(pattern, "lang=" + lang + "&");
						
					} else {	
						pattern = /\lang=.+/g;	// pattern = lang=**
						search = search.replace(pattern, "lang=" + lang);
					}
					
					url += search;
					
				} else {
					url += "?lang=" + lang;
				}
		*/
				location.href = "/lang/changeLanguage?lang=" + lang;
			}	
		});
	};
})();