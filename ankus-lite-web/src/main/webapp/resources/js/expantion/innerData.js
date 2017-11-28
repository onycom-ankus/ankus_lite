/**
 * 
 */

$(function(){
	
	/* 내부데이터 메뉴 탭 */
	$("#_tabInnerData").on("click", function() {
		$("#_id_createModal input").val("");
		$("#_id_createModal input").attr("placeholder", "");
		$("#_id_createModal option:eq(0)").prop("selected", "selected");
		$("#_id_createModal").ankusModal('show');
		
		$("#_id_btnCancel").on("click", function(e) {
			e.preventDefault();
			$("#_id_createModal").ankusModal('hide');
		});
	});/**
	 * 
	 */

	$(function(){
		
		/* 내부데이터 메뉴 탭 */
		$("#_tabInnerData").on("click", function() {
			$("#_id_createModal input").val("");
			$("#_id_createModal input").attr("placeholder", "");
			$("#_id_createModal option:eq(0)").prop("selected", "selected");
			$("#_id_createModal").ankusModal('show');
			
			$("#_id_btnCancel").on("click", function(e) {
				e.preventDefault();
				$("#_id_createModal").ankusModal('hide');
			});
		});
		
		/* 파일등록 view */
		$("#_id_btnFindFile").on("click", function(event) {
			event.preventDefault();
//			$("#_id_file").click();
		});
		
		$("#_id_file").on("change", function() {
			var file = document.getElementById("_id_file").files[0];
			var fn = (typeof file == 'undefined') ? "" : file.name.substring(0, file.name.lastIndexOf("."));
			
			$("#_id_data_nm").attr("placeholder", fn);
			$("#_id_fileView").val((typeof file == 'undefined') ? "" : file.name);
			$("#_id_data_nm").focus();
		});
		
		/* 다이얼로그 취소 */
		$("#_id_btnCancel").on("click", function() {
			$("#_id_createModal").ankusModal('hide');
		});
		
		/* 저장 */
		$("#_id_btnSave").on("click", function(event) {
			var file = document.getElementById("_id_file").files[0];
			
			if(typeof file == 'undefined') {
				event.preventDefault();
				ANKUS_API.util.alert("데이터 파일을 선택하세요.");
				return;
			}
			
			var ext = file.name.substring(file.name.lastIndexOf(".")+1, file.name.length);
			
			if(ext != 'csv') {
				event.preventDefault();
				ANKUS_API.util.alert("CSV 파일만 등록 가능합니다.");
				return;
			}
			
			$("#_id_form").on("submit", function(fevent) {
				fevent.preventDefault();
				var fdata = new FormData($(this)[0]);
				
				ANKUS_API.util.confirm({
					description	: '내부 데이터를 저장하시겠습니까?',
					callback : function(sel){
						if(sel) {
							$.ajax({
								url : "/innerData/ajax/regist",
								type : "POST",
								data : fdata,
								dataType : "json",
								contentType : false,
								processData : false,
								success : function(msg) {
									if(msg === 'OK') {
//										$("#_id_createModal").ankusModal('hide');
										_dataStoreSelect();
										ANKUS_API.util.alert("저장이 완료되면 데이터 저장소에 추가됩니다.");
										$("#_id_createModal").ankusModal('hide');
									} else {
										ANKUS_API.util.alert(msg);
									}
								}
							});
						}
					}
				});
			});
		});
	});
	
	/* 파일등록 view */
	$("#_id_btnFindFile").on("click", function(event) {
		event.preventDefault();
		$("#_id_file").click();
	});
	
	$("#_id_file").on("change", function() {
		var file = document.getElementById("_id_file").files[0];
		var fn = (typeof file == 'undefined') ? "" : file.name.substring(0, file.name.lastIndexOf("."));
		
		$("#_id_data_nm").attr("placeholder", fn);
		$("#_id_fileView").val((typeof file == 'undefined') ? "" : file.name);
		$("#_id_data_nm").focus();
	});
	
	/* 다이얼로그 취소 */
	$("#_id_btnCancel").on("click", function() {
		$("#_id_createModal").ankusModal('hide');
	});
	
	/* 저장 */
	$("#_id_btnSave").on("click", function(event) {
		var file = document.getElementById("_id_file").files[0];
		
		if(typeof file == 'undefined') {
			event.preventDefault();
			ANKUS_API.util.alert("데이터 파일을 선택하세요.");
			return;
		}
		
		var ext = file.name.substring(file.name.lastIndexOf(".")+1, file.name.length);
		
		if(ext != 'csv') {
			event.preventDefault();
			ANKUS_API.util.alert("CSV 파일만 등록 가능합니다.");
			return;
		}
		
		$("#_id_form").on("submit", function(fevent) {
			fevent.preventDefault();
			var fdata = new FormData($(this)[0]);
			
			ANKUS_API.util.confirm({
				description	: '내부 데이터를 저장하시겠습니까?',
				callback : function(sel){
					if(sel) {
						$.ajax({
							url : "/innerData/ajax/regist",
							type : "POST",
							data : fdata,
							dataType : "json",
							contentType : false,
							processData : false,
							success : function(msg) {
								if(msg === 'OK') {
									$("#_id_createModal").ankusModal('hide');
									_dataStoreSelect();
								} else {
									ANKUS_API.util.alert(msg);
								}
							}
						});
					}
				}
			});
		});
	});
});