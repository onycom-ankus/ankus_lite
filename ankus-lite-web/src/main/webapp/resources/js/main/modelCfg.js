(function modelCfg(){
	
	//var session_userId = $("#_main_userId").val();
	
	/* 나의 정보 탭 */
	$("#_tabModelCfg").on("click", function() {
		
		$('#_mc_createModal').ankusModal('show');
		
		/* 유저정보 조회(아이디, 이메일) */
		ANKUS_API.ajax({
			url : "/ModelCfg/list",
			data : {},
			success : function(res){
				//console.log(res.list);	
			
				if(res.success){
					if(res.list[0] != null){
						$('#_mc_model').empty();
						$.each(res.list[0], function(i, v){
							var str_label = i.replace("cfg_","");
							
							var c_tag = "<div class='form-group'>" +
										"<label class='col-sm-3 control-label' style='font-size: 0.9em;'>" + str_label + "</label>" +
										"<div class='col-sm-7'>" + 
										"<input type='text' class='form-control' id='"+ i + "' value='" + v + "'/></div></div>";
							$('#_mc_model').append(c_tag);
						});
					}
				}				
			}
		});	
	});
	
	var _cancelAction = function(){
		$('#_mc_createModal').ankusModal('hide');
	};
	
	var _submitAction = function() {
		
		var size = $('#_mc_model')[0].childNodes.length;
		var data = {};
		
		for(var i=0 ; i < size ; i++){
			var str_text = $('#_mc_model')[0].childNodes[i].innerText;
			var str_id = "cfg_" + str_text;
			var str_value = $("#"+str_id).val();
			
			if(str_value.length < 1){
				ANKUS_API.util.alert(str_text + '입력하여 주세요.');
				return;
			}
			data[str_id] = str_value;
		}
		
		console.log(data);
		
		ANKUS_API.ajax({
			url : "/ModelCfg/update",
			dataType:'json',			
			data : JSON.stringify(data),
			type:'POST',
			success : function(res){
				ANKUS_API.util.alert(i18nP('JS_MYINFO_SUCCESS_UPDATE'));
				$('#_mc_createModal').ankusModal('hide');
				
			}
		});
	}
	
	$('#_mc_btnSubmit').on('click', _submitAction);
	$('#_mc_btnCancel').on('click', _cancelAction);
	
})();