(function hadoopmgr(){

	var _firstLoad = false;
	var _getGrid = function(page){
		var postData = $('#_hm_grid').jqGrid('getGridParam', 'postData');
		var data = {};
		
		data.paging	= true;
		if (postData) {
			data.page		= page ? 1 : postData.page;
			data.rows		= postData.rows;
			data.sidx		= postData.sidx;
			data.sord		= postData.sord;
		}
		ANKUS_API.ajax({
			url			: '/admin/hadoop/clusters',
			data		: data,
			success		: function(res){
				var list = res.list;
				
				for(var i in list) {
					list[i].namenodeIpAndPort = list[i].namenodeProtocol + list[i].namenodeIP + ":" + list[i].namenodePort;
					list[i].jobTrackerIpAndPort = list[i].jobTrackerIP + ":" + list[i].jobTrackerPort;
					list[i].namenodeConsoleLink = "<a href='"+ list[i].namenodeConsole +"'/>" + list[i].namenodeConsole;
					list[i].jobTrackerConsoleLink = "<a href='"+ list[i].jobTrackerConsole +"'/>" + list[i].jobTrackerConsole;
				}
				
				$('#_hm_grid').jqGrid('resetSelection');
				$('#_hm_grid').jqGrid('clearGridData');
				$('#_hm_grid')[0].addJSONData(list);
			}
		});
	};
		
	/* 그리드 설정 */
	var _setGrid = function(){
		$('#_hm_grid').ankusGrid({
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
			sortname		: 'name',
			sortorder		: 'desc',
	        multiselect		: false,
	        idPrefix		: '_infoGrid_',
	        multiboxonly	: true,
	        ondblClickRow	: function(id){
	        	_addAndUpadateView($('#_hm_grid').getRowData(id), i18nP('COMMON_UPDATE'), true);
	        },
	        refreshfunc		: function(){
	        },
	        pager			: false,
	        rowNum			: -1,
	        autowidth		:true,
	      //  scrollerbar		:true,
	      //  height			:'150px',
	        colModel		: [
	        	{ name : 'id', hidden : true },
	        	{ name : 'name', label : i18nP('HADOOPMGR_GRID_TITLE_CLUSTER_NAME'), width : 150, align : 'center'},	        	
	        	{ name : 'namenodeIpAndPort', label : i18nP('HADOOPMGR_GRID_TITLE_NAMENODE'), width : 180, align : 'center'},
	        	{ name : 'namenodeProtocol', hidden : true, label : 'File System Scheme', width : 150, align : 'center'},
	        	{ name : 'namenodeIP', hidden : true, label : '네임노드ip', width : 150, align : 'center'},
	        	{ name : 'namenodePort', hidden : true, label : '네임노드port', width : 150, align : 'center'},
	        	{ name : 'jobTrackerIpAndPort', label : i18nP('HADOOPMGR_GRID_TITLE_RESOURCE_MANAGER'), width : 180, align : 'center'},
	        	{ name : 'jobTrackerIP', hidden : true, label : '리소스 매니저ip', width : 150, align : 'center'},
	        	{ name : 'jobTrackerPort', hidden : true, label : '리소스 매니저port', width : 150, align : 'center'},
	        	{ name : 'namenodeConsole', hidden : true, label : '네임노드 콘솔', width : 250, align : 'center'},
	        	{ name : 'namenodeConsoleLink', label : i18nP('HADOOPMGR_GRID_TITLE_NAMENODE_CONSOLE_LINK'), width : 250, align : 'center'},
	        	{ name : 'jobTrackerConsole', hidden : true, label : '리소스 매니저 콘솔', width : 250, align : 'center'},
	        	{ name : 'jobTrackerConsoleLink', label : i18nP('HADOOPMGR_GRID_TITLE_RESOURCE_MANAGER_CONSOLE_LINK'), width : 250, align : 'center'},
	        ]
	    });	
	};
	
	/* Load */
	(function init(){
		_setGrid();		
		_getGrid();		
	})();
	
	var _saveAction = function(url, method, param) {
		ANKUS_API.ajax({
			url : url,
			type : method,
			data : param,
			success : function() {
				$('#_hm_addModal').ankusModal('hide');
				_setGrid();		
				_getGrid();
			}
		});
	};
	
	var _submitAction = function() {
		var role = $('#_hm_btnSubmit').text();
		
		if(role === i18nP('COMMON_ADD')) {
			var url = "/admin/hadoop/add";
		} else {
			var url = "/admin/hadoop/update_a_cluster";
		}
		
		var cluster_name = $("#_hm_clustername").val();
		
		if(cluster_name.length < 1) {
			ANKUS_API.util.alert(i18nP('JS_ALERT_REQUIRED_VALUE', 'HADOOPMGR_MODAL_CLUSTER_NAME'));
			return;
		}
		
		ANKUS_API.util.confirm({
			description	: i18nP('JS_ALERT_HADOOP_CLUSTER_EDIT_STATUS', role),
			callback : function(sel){
				if(sel){
					var param = {};
					
					param.id = $("#_hm_id").val();
					param.name = $("#_hm_clustername").val();
					param.namenodeProtocol = $("#_hm_fss").val();
					param.namenodeIP = $("#_hm_namenodeIP").val();
					param.namenodePort = $("#_hm_namenodePort").val();
					param.jobTrackerIP = $("#_hm_jobTrackerIP").val();
					param.jobTrackerPort = $("#_hm_jobTrackerPort").val();
					param.namenodeConsole = $("#_hm_namenodeConsole").val();
					param.jobTrackerConsole = $("#_hm_jobTrackerConsole").val();
					param.namenodeMonitoringPort = $("#_hm_namenodeMonitoringPort").val();
					param.jobTrackerMonitoringPort = $("#_hm_jobTrackerMonitoringPorte").val();
					
					if(role === i18nP('COMMON_ADD')) {
						/* 클러스터 존재여부 확인 */
						ANKUS_API.ajax({
							url : "/admin/hadoop/name_exist",
							type : "POST",
							data : JSON.stringify(param),
							success : function(res) {
//								console.log(res);
								if(!res.success){
									_saveAction(url, "POST", JSON.stringify(param));
									
								}else{
									ANKUS_API.util.alert(i18nP('JS_ALERT_ALREADY_EXIST', param.name));
								}
							}
						});
						
					} else {
						_saveAction(url, "GET", param);
					}
				}
			}
		});
	};
	
	var _addAndUpadateView = function(selrowObj, role) {
		$("#_hm_fss option").removeAttr("selected");
		
		if(role === i18nP('COMMON_UPDATE')) {
			$('#_hm_id').val(selrowObj.id);
			$('#_hm_clustername').val(selrowObj.name);
			$("#_hm_fss").val(selrowObj.namenodeProtocol).attr("selected", "selected");
			$('#_hm_namenodeIP').val(selrowObj.namenodeIP);
			$('#_hm_namenodePort').val(selrowObj.namenodePort);
			$('#_hm_jobTrackerIP').val(selrowObj.jobTrackerIP);
			$('#_hm_jobTrackerPort').val(selrowObj.jobTrackerPort);
			$('#_hm_namenodeConsole').val(selrowObj.namenodeConsole);
			$('#_hm_jobTrackerConsole').val(selrowObj.jobTrackerConsole);
			
			$("#_hm_btnSubmit").text(i18nP('COMMON_UPDATE'));
			$("#_hm_btnDelete").removeAttr("style");
			
		} else {
			$('#_hm_id').val("");
			$('#_hm_clustername').val("");
			$("#_hm_fss option:eq(0)").attr("selected", "selected");
			$('#_hm_namenodeIP').val("127.0.0.1");
			$('#_hm_namenodePort').val("9000");
			$('#_hm_jobTrackerIP').val("127.0.0.1");
			$('#_hm_jobTrackerPort').val("9001");
			$('#_hm_namenodeConsole').val("http://127.0.0.1:50070");
			$('#_hm_jobTrackerConsole').val("http://127.0.0.1:8055");
			
			$("#_hm_btnSubmit").text(i18nP('COMMON_ADD'));
			$("#_hm_btnDelete").css("display", "none");
		}
		
		$('#_hm_addModal').ankusModal('show');
	};
	
	var _delAction = function(param) {
		ANKUS_API.ajax({
			url : "/admin/hadoop/delete",
			type : "POST",
			data : JSON.stringify(param),
			success : function(res) {
				_setGrid();		
				_getGrid();
				$('#_hm_addModal').ankusModal('hide');
			}
		});
	}
	
	var _delCheck = function() {
		var id = $("#_hm_id").val();
		var param = {"id" : id};
		
		ANKUS_API.ajax({
			url : "/admin/hadoop/check_enginewithCluster",
			type : "GET",
			data : param,
			success : function(res) {
				if(Number(res.data.rc) > 0) {
					ANKUS_API.util.confirm({
						description	: i18nP('JS_ALERT_ENGINE_LINKED', res.data.eng_name) + " " + i18nP('JS_ALERT_HADOOP_CLUSTER_EDIT_STATUS', 'COMMON_DELETE'),
						callback : function(sel){
							if(sel){
								_delAction(param);
							} 
						}
					});
				} else {
					_delAction(param);
				}
			}
		});
	};
	
	var _refreshAction = function() {
		_setGrid();		
		_getGrid();
	};
	
	var _cancelAction = function() {
		$('#_hm_addModal').ankusModal('hide');
	}
	
	$("#_hm_btn").on("click", _addAndUpadateView);
	$("#_hm_btnRefresh").on("click", _refreshAction);
	$("#_hm_btnSubmit").on("click", _submitAction);
	$("#_hm_btnDelete").on("click", _delCheck);
	$("#_hm_btnCancel").on("click", _cancelAction);
	
})();
