(function algmgr(){
	
	var uploadObj;	
	var _firstLoad = false;
	
	var _getGrid = function(page){
		var postData = $('#_am_grid').jqGrid('getGridParam', 'postData');
		
		ANKUS_API.ajax({
			url			: '/getmoduleinfos',
			type		: 'POST',
			success		: function(res){
				//console.log(res);
				var key = [];
				var cnt;
				cnt = res.length;				
				if(cnt > 0){
					var old_packagename;					
					for(var i = 0 ; i < cnt ; i++){
						if(res[i].packagename != old_packagename){
							key.push(res[i].packagename);
						}
						old_packagename = res[i].packagename;
					}
					
					var key_cnt = key.length;
					
					if(key_cnt > 0){
						var list = [];
						var obj = new Object();		
						for(var i = 0 ; i < key_cnt ; i++){
							obj = new Object();
							obj.appname = '';
							for(var j = 0 ; j < cnt ; j++){	
								if(key[i] == res[j].packagename){
									obj.packagename = res[j].packagename;
									obj.path = res[j].path;	
									obj.org_path = res[j].path;
									obj.appname += res[j].appname + ',';
								}								
							}
							obj.appname = obj.appname.substring(0, obj.appname.length-1); 
							var str_path = obj.path;
							var tmp = [];
							tmp = str_path.split('\\');
							obj.path = tmp[tmp.length-1];
							list.push(obj);
						}	
					}					
				}				
				
				$('#_am_grid').jqGrid('resetSelection');
				$('#_am_grid').jqGrid('clearGridData');
				$('#_am_grid')[0].addJSONData(list);
				
			},
			error : function(xhr, status, error) {
//	        	alert("에러발생");
	        }
		});
	};
	
	/* 그리드 설정 */
	var _setGrid = function(){
		$('#_am_grid').ankusGrid({
			datatype		: function(postData) {
				if (_firstLoad) {
					_getGrid();
				} else {
					_firstLoad = true;
				}
			},
			jsonReader		: {
				repeatitems	: false,
				id			: 'id'
			},
			sortname		: 'path',
			sortorder		: 'desc',
	        multiselect		: true,
	        idPrefix		: '_Grid_',
	        multiboxonly	: true,
	        ondblClickRow	: function(id){
	        },
	        refreshfunc		: function(){
	        },
	        pager			: false,
	        rowNum			: -1,
	        autowidth		:true,
	       // scrollerbar		:true,
	       // height			:'400px',ㅋ
	        colModel		: [
	        	{ name : 'path', label : i18nP('JS_ALGMGR_GRID_FILE_NAME'), width : 300},
	        	{ name : 'org_path', hidden : true},
	        	{ name : 'packagename', label : i18nP('JS_ALGMGR_GRID_FILE_NAME'), width : 250, align : 'center'},
	        	{ name : 'appname', label : i18nP('JS_ALGMGR_GRID_FILE_NAME'), width : 400}	        	
	        ]
	    });	
	};
		
	var _refreshAction = function() {
		_setGrid();		
		_getGrid();
	};
	
	var _cancelAction = function() {
		$('#_am_modal').ankusModal('hide');
	}
	
	var _deleteAction = function(){
		var selArr = $('#_am_grid').getGridParam('selarrrow');
		var length = selArr.length;
		
		var row = [];
		$.each(selArr, function(i, v) {
			row.push($('#_am_grid').getRowData(v).org_path);
		});
		
		if(0 === length){
			ANKUS_API.util.alert(i18nP('JS_ALGMGR_SELECT_DELETE_ITEM'));
			return;
		}
		
		var data = {'path':row};
		console.log(data);
		
		ANKUS_API.util.confirm({
			description	: i18nP('JS_ALGMGR_CHECK_DELETE_ITEM', length),
			callback : function(sel){
				if(sel){
					ANKUS_API.ajax({
						url			: '/main/algmgr/fileDelete',
						type		: 'POST',
						data		: JSON.stringify(row),
						success		: function(res){
							console.log(res);
							if(res.success){								
								ANKUS_API.util.alert(i18nP('JS_ALGMGR_SUCCESS_DELETE'));
								_refreshAction();
							}
							else{
								//ANKUS_API.util.alert(res.error.message);
							}
						}
					});			
				}
			}
		});
	};
	
	var _setUpload = function(){
		uploadObj = $('#_am_fileUploader').ankusUpload({
			url				: '/main/algmgr/fileUpload',
			fileName		: 'file',
			dynamicFormData	: function(){		
				return {					
				}
			},
			onSuccess		: function(files, data, xhr, pd){	
				var str_file = files;				
				var res = JSON.parse(data);
				if(res.success){
					ANKUS_API.util.alert(i18nP('JS_ALGMGR_SUCCESS_UPLOAD'));
					_refreshAction();
				}
				else{
					ANKUS_API.util.alert(res.error.message);
				}
			},
			onError			: function(){
				ANKUS_API.util.alert(i18nP('JS_ALGMGR_FAIL_UPLOAD'));
			}
		});
	};	
	
	var _uploadAction = function(obj){
		_fileResetAction();
		$('#_am_uploadModal').ankusModal('show');
	};
	// 파일 업로드 실행
	var _fileUploadAction = function(){
		var cnt;
		cnt = uploadObj.existingFileNames.length;
		if(cnt > 0){
			for(var i = 0;i < cnt;i++){
				var fileName = uploadObj.existingFileNames[i]; 
				console.log(fileName);
				fileName = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
				if(fileName != 'jar'){
					ANKUS_API.util.alert(i18nP('JS_ALGMGR_CHECK_JAR_UPLOAD'));
					return;
				}
			}
		}else{
			ANKUS_API.util.alert(i18nP('JS_ALGMGR_SELECT_FILE_CHECK'));
			return;
		}
		uploadObj.startUpload();		
	};
	// 파일 업로드 중지
	var _fileStopAction = function(){
		uploadObj.stopUpload();
	};
	// 파일 업로드 모두 취소
	var _fileCancelAction = function(){
		uploadObj.cancelAll();
	};
	// 파일 업로더 리셋
	var _fileResetAction = function(){
		uploadObj.reset();
	};
	// 파일 업로더 팝업 닫기
	var _closeUpload = function(){		
		$('#_am_uploadModal').ankusModal('hide');
	};
	
	$("#_am_btnDelete").on("click", _deleteAction);
	$("#_am_btnRefresh").on("click", _refreshAction);	
	
	$('#_am_btnUpload').on('click', _uploadAction);
	$('#_am_btnUploadAction').on('click', _fileUploadAction);
	$('#_am_btnStopAction').on('click', _fileStopAction);
	$('#_am_btnCancelAction').on('click', _fileCancelAction);
	$('#_am_btnResetAction').on('click', _fileResetAction);
	$('#_am_fileUploadClose').on('click', _closeUpload);
	
	/* Load */
	(function init(){
		_setGrid();		
		_getGrid();	
		_setUpload();
	})();
	
})();

