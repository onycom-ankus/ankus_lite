(function srvmgr(){
	var _firstLoad1 = false;
	var _firstLoad2 = false;
	var _getInfoGrid = function(page){
		var postData = $('#_ei_infoGrid').jqGrid('getGridParam', 'postData');
		var data = {};
		
		data.paging	= true;
		if (postData) {
			data.page		= page ? 1 : postData.page;
			data.rows		= postData.rows;
			data.sidx		= postData.sidx;
			data.sord		= postData.sord;
		}
		ANKUS_API.ajax({
			url			: '/admin/engine/engines',
			data		: data,
			success		: function(res){
				//console.log(res);
				var obj = res.map;
				obj.rows = res.list;
				$('#_ei_infoGrid').jqGrid('resetSelection');
				$('#_ei_infoGrid').jqGrid('clearGridData');
				$('#_ei_infoGrid')[0].addJSONData(obj);
			}
		});
	};
	
	var _getSubGrid = function(row){
		
		var data = {};
		data.serverUrl = row.serverUrl;
		data.start = 0;
		data.page = 1;
		data.limit = 25;
		
		ANKUS_API.ajax({
			url			: '/admin/engine/envs',
			type		: 'GET',			
			data		: data,
			success		: function(res){				
				//console.log(res);
				var obj = res.map;
				obj.rows = res.list;
				$('#_ei_envsGrid').jqGrid('resetSelection');
				$('#_ei_envsGrid').jqGrid('clearGridData');
				$('#_ei_envsGrid')[0].addJSONData(obj);
				
			}
		});
		
		ANKUS_API.ajax({
			url			: '/admin/engine/props',
			type		: 'GET',			
			data		: data,
			success		: function(res){				
				//console.log(res);
				var obj = res.map;
				obj.rows = res.list;
				$('#_ei_propGrid').jqGrid('resetSelection');
				$('#_ei_propGrid').jqGrid('clearGridData');
				$('#_ei_propGrid')[0].addJSONData(obj);
				
			}
		});
	};
	
	var _getTriggerGrid = function(row){
		var data = {};
		data.serverUrl = row.serverUrl;
		data.start = 0;
		data.page = 1;
		data.limit = 25;
		
		ANKUS_API.ajax({
			url			: '/admin/engine/triggers',
			type		: 'GET',			
			data		: data,
			success		: function(res){				
				console.log(res);
				if(res.success){
					var obj = res.map;
					obj.rows = res.list;
					$('#_ei_triggersGrid').jqGrid('resetSelection');
					$('#_ei_triggersGrid').jqGrid('clearGridData');
					$('#_ei_triggersGrid')[0].addJSONData(obj);
				}
			}
		});		
	}
	
	var _getRunningGrid = function(row){
		var data = {};
		data.serverUrl = row.serverUrl;
		data.start = 0;
		data.page = 1;
		data.limit = 25;
		
		ANKUS_API.ajax({
			url			: '/admin/engine/running',
			type		: 'GET',			
			data		: data,
			success		: function(res){				
				//console.log(res);
				var obj = res.map;
				obj.rows = res.list;
				$('#_ei_runningGrid').jqGrid('resetSelection');
				$('#_ei_runningGrid').jqGrid('clearGridData');
				$('#_ei_runningGrid')[0].addJSONData(obj);
				
			}
		});		
	}
		
	// 그리드 설정
	var _setGrid = function(){
		$('#_ei_infoGrid').ankusGrid({
			datatype		: function(postData) {
				if (_firstLoad1) {
					_getInfoGrid();
				} else {
					_firstLoad1 = true;
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
	        onSelectRow	: function(id){		        	
	    		_getSubGrid($('#_ei_infoGrid').getRowData(id));	   
	    		_getTriggerGrid($('#_ei_infoGrid').getRowData(id));
	    		_getRunningGrid($('#_ei_infoGrid').getRowData(id));
	        },
	        ondblClickRow	: function(id){
	        	_editAction($('#_ei_infoGrid').getRowData(id), true);
	        },
	        refreshfunc		: function(){
	        },
	        pager			: false,
	        rowNum			: -1,
	        autowidth		:true,
	       // scrollerbar		:true,
	       // height			:'150px',
	        colModel		: [
	        	{ name : 'id', hidden : true },
	        	{ name : 'instanceName', label : i18nP('JS_SRVMGR_GRID_SERVER_NAME'), width : 150, align : 'center'},	        	
	        	{ name : 'status', label : i18nP('JS_SRVMGR_GRID_STATUS'), width : 100, align : 'center' },
	        	{ name : 'hadoopClusterName', label : i18nP('JS_SRVMGR_GRID_HADOOP_CLUSTER'), width : 120, align : 'center'},
	        	{ name : 'hadoopClusterId', hidden : true },
	        	{ name : 'hiveServerName', label : i18nP('JS_SRVMGR_GRID_HIVE_SERVER'), width : 120, align : 'center' },
	        	{ name : 'serverUrl', label : i18nP('JS_SRVMGR_GRID_SERVER_ADDR'), width : 280, align : 'center' },
	        	{ name : 'schedulerName', label : i18nP('JS_SRVMGR_GRID_SCHEDULER'), width : 100, align : 'center' },
	        	{ name : 'schedulerId', hidden : true },
	        	{ name : 'hostAddress', label : i18nP('JS_SRVMGR_GRID_IP_ADDR'), width : 120, align : 'center' },
	        	{ name : 'hostName', hidden : true },
	        	{ name : 'port', hidden : true },
	        	{ name : 'runningJob', label : i18nP('JS_SRVMGR_GRID_RUNNING_STATUS'), width : 80, align : 'center' },
	        	{ name : 'permission', label : i18nP('JS_SRVMGR_GRID_ACCESS_AUTH'), width : 120, align : 'center' }
	        ]
	    });	
		
		$('#_ei_envsGrid').ankusGrid({
			datatype		: function(postData) {
				if (_firstLoad2) {
					_getSubGrid();
				} else {
					_firstLoad2 = true;
				}
			},
			jsonReader		: {
				repeatitems	: false,
				id			: 'name'
			},
			refreshfunc		: function(){
	        },
			sortname		: 'name',
			sortorder		: 'desc',
			multiselect		: false,
			multiboxonly	: true,
			idPrefix		: '_envsGrid_',
			pager			: false,
	        rowNum			: -1,
	        autowidth		:true,
	        scrollerbar		:true,
	        height			:'150px',
			colModel		: [				
	        	{ name : 'name', label : i18nP('JS_SRVMGR_GRID_PARAM'), width : 400},	        	
	        	{ name : 'value', label : i18nP('JS_SRVMGR_GRID_VALUE'), width : 800}	
			]
		});	

		$('#_ei_propGrid').ankusGrid({
			datatype		: function(postData) {
				if (_firstLoad2) {
				//	_getSubGrid();
				} else {
					_firstLoad2 = true;
				}
			},
			jsonReader		: {
				repeatitems	: false,
				id			: 'name'
			},
			refreshfunc		: function(){
	        },
			sortname		: 'name',
			sortorder		: 'desc',
			multiselect		: false,
			multiboxonly	: true,
			idPrefix		: '_propGrid_',
			pager			: false,
	        rowNum			: -1,
	        autowidth		:true,
	        scrollerbar		:true,
	        height			:'150px',
			colModel		: [				
	        	{ name : 'name', label : i18nP('JS_SRVMGR_GRID_ATTR'), width : 400},	        	
	        	{ name : 'value', label : i18nP('JS_SRVMGR_GRID_VALUE'), width : 800}	
			]			
		});
		
		$('#_ei_triggersGrid').ankusGrid({
			datatype		: function(postData) {
				if (_firstLoad2) {
				//	_getSubGrid();
				} else {
					_firstLoad2 = true;
				}
			},
			jsonReader		: {
				repeatitems	: false,
				id			: 'name'
			},
			refreshfunc		: function(){
	        },
			sortname		: 'name',
			sortorder		: 'desc',
			multiselect		: false,
			multiboxonly	: true,
			idPrefix		: '_triggersGrid_',
			pager			: false,
	        rowNum			: -1,
	        autowidth		:true,
	        scrollerbar		:true,
	        height			:'150px',
			colModel		: [				
	        	{ name : 'group', label : i18nP('JS_SRVMGR_GRID_GROUP'), width : 150, align: 'center'},	        	
	        	{ name : 'name', label : i18nP('JS_SRVMGR_GRID_WORK_NAME'), width : 250, align: 'center'},
	        	{ name : 'startTime', label : i18nP('JS_SRVMGR_GRID_START_DTTM'), width : 160, align: 'center' },
	        	{ name : 'previousFireTime', label : i18nP('JS_SRVMGR_GRID_EARLYER_EXECUTION_DAY'), width : 160, align: 'center' },
	        	{ name : 'nextFireTime', label : i18nP('JS_SRVMGR_GRID_AFTER_EXECUTION_DAY'), width : 160, align: 'center' },
	        	{ name : 'endTime', label : i18nP('JS_SRVMGR_GRID_QUIT_DAY'), width : 160, align: 'center' },
	        	{ name : 'finalFireTime', label : i18nP('JS_SRVMGR_GRID_LAST_QUIT_DAY'), width : 160, align: 'center' }
			]			
		});
		
		$('#_ei_runningGrid').ankusGrid({
			datatype		: function(postData) {
				if (_firstLoad2) {
				//	_getSubGrid();
				} else {
					_firstLoad2 = true;
				}
			},
			jsonReader		: {
				repeatitems	: false,
				id			: 'name'
			},
			refreshfunc		: function(){
	        },
			sortname		: 'name',
			sortorder		: 'desc',
			multiselect		: false,
			multiboxonly	: true,
			idPrefix		: '_runningGrid_',
			pager			: false,
	        rowNum			: -1,
	        autowidth		:true,
	        scrollerbar		:true,
	        height			:'150px',
			colModel		: [				
	        	{ name : 'group', label : i18nP('JS_SRVMGR_GRID_GROUP'), width : 80, align: 'center'},	        	
	        	{ name : 'name', label : i18nP('JS_SRVMGR_GRID_WORK_NAME'), width : 150, align: 'center'},
	        	{ name : 'startTime', label : i18nP('JS_SRVMGR_GRID_START_DTTM'), width : 150, align: 'center' },	        	
	        	{ name : 'nextFireTime', label : i18nP('JS_SRVMGR_GRID_AFTER_EXECUTION_DAY'), width : 150, align: 'center' },
	        	{ name : 'fireTime', label : i18nP('JS_SRVMGR_GRID_EXECUTION_DAY'), width : 150, align: 'center' },
	        	{ name : 'scheduledFireTime', label : i18nP('JS_SRVMGR_GRID_SCHEDULED_EXECUTION_DAY'), width : 150, align : 'center' },
	        	{ name : 'endTime', label : i18nP('JS_SRVMGR_GRID_QUIT_DAY'), width : 150, align : 'center' },
	        	{ name : 'refireCount', label : i18nP('JS_SRVMGR_GRID_REDO'), width : 80, align: 'center' },
	        	{ name : 'finalFireTime', label : i18nP('JS_SRVMGR_GRID_LAST_QUIT_DAY'), width : 150, align : 'center' }

			]			
		});
		
		$('#_ei_envs_table').toggle(false);	
		$('#_ei_prop_table').toggle(false);	
		$('#_ei_triggers_table').toggle(false);	
		$('#_ei_running_table').toggle(false);
		
	};
	
	var _editAction = function(row){	
		
		$('#_ei_engineId').val(row.id);
		$('#_ei_engineName').val(row.instanceName);
		$('#_ei_engineIp').val(row.hostAddress);
		$('#_ei_enginePort').val(row.port);		
		_getHadoopCuster();
		$('#_ei_hadoop').val(row.hadoopClusterId);		
		_getAdminPermission();
		
		$('#_ei_btnSave').text(i18nP('COMMON_UPDATE'));
		$('#_ei_Modal .modal-title').text(i18nP('JS_SRVMGR_SERVER_UPDATE'));
				
		$('#_ei_Modal').ankusModal('show');
	};
	
	var _getHadoopCuster = function(callback){
		ANKUS_API.ajax({
			url			: '/admin/hadoop/clusters',	
			type		: 'GET',
			success		: function(res){
				if(res.success){
					$('#_ei_hadoop').empty();
					$.each(res.list, function(i, v) {
						$('<option>').val(v.id).text(v.name).appendTo($('#_ei_hadoop'));
					});
					$('<option>').val('localhost').text('Local').appendTo($('#_ei_hadoop'));
				}else{
					$('<option>').val('localhost').text('Local').appendTo($('#_ei_hadoop'));
				}
								
				//callback(res);
			},
			error : function(xhr, status, error) {
//	        	alert("에러발생");
			}
		});
	};
	
	var _getAdminPermission = function(callback){
		ANKUS_API.ajax({
			url			: '/admin/user/servers',	
			type		: 'GET',
			success		: function(res){
				//console.log(res);
				$('#_ei_permission').empty();
				$.each(res.list, function(i, v) {
					$('<option>').val('').text('').appendTo($('#_ei_permission'));
					$('<option>').val(v.username).text(v.username).appendTo($('#_ei_permission'));
				});				
				//callback(res);
			},
			error : function(xhr, status, error) {
				//alert("에러발생");
			}
		});
	};
	
	var _newAction = function(){		
		$('#_ei_engineName').val('');
		$('#_ei_engineIp').val('');
		$('#_ei_enginePort').val('');		
		_getHadoopCuster();
		_getAdminPermission();
		
		$('#_ei_btnSave').text(i18nP('COMMON_ADD'));
		$('#_ei_Modal .modal-title').text(i18nP('JS_SRVMGR_SERVER_ADD'));
		
		$('#_ei_Modal').ankusModal('show');
	};
	
	var _saveAction = function(){
		
		var url;
		var str_type;
		var text;
		var data;
		
		if (i18nP('COMMON_UPDATE') == $('#_ei_btnSave').text()) {
			url = '/admin/engine/update_engineinfo';
			type = 'GET';
			text = i18nP('COMMON_UPDATE');
			data = _getEditFormParam();
		} else {
			url = '/admin/engine/add';
			type = 'POST';
			text = i18nP('COMMON_ADD');
			data = _getAddFormParam();
		}
				
		if(!data.name){
			ANKUS_API.util.alert({
				description : i18nP('JS_SRVMGR_INPUT_CHECK', 'SRVMGR_ENGINE_NAME'),
				callback : function() { $('#_ei_engineName').focus(); }
			});
			return;
		}
		if(text == i18nP('COMMON_UPDATE')){
			if(!data.engineIP){
				ANKUS_API.util.alert({
					description : i18nP('JS_SRVMGR_INPUT_CHECK', 'SRVMGR_ENGINE_IP'),
					callback : function() { $('#_ei_engineIp').focus(); }
				});
				return;
			}
			
			if(!data.enginePort){
				ANKUS_API.util.alert({
					description : i18nP('JS_SRVMGR_INPUT_CHECK', 'SRVMGR_ENGINE_PORT'),
					callback : function() { $('#_ei_enginePort').focus(); }
				});
				return;
			}
			
		}else{			
			if(!data.ip){
				ANKUS_API.util.alert({
					description : i18nP('JS_SRVMGR_INPUT_CHECK', 'SRVMGR_ENGINE_IP'),
					callback : function() { $('#_ei_engineIp').focus(); }
				});
				return;
			}
			
			if(!data.port){
				ANKUS_API.util.alert({
					description : i18nP('JS_SRVMGR_INPUT_CHECK', 'SRVMGR_ENGINE_PORT'),
					callback : function() { $('#_ei_enginePort').focus(); }
				});
				return;
			}			
		}
		
		
		if(!data.hadoopClusterId){
			ANKUS_API.util.alert({
				description : i18nP('JS_SRVMGR_SELECT_CHECK', 'SRVMGR_HADOOP_CLUSTER'),
				callback : function() { $('#_ei_hadoop').focus(); }
			});
			return;
		}
					
		ANKUS_API.util.confirm({
			description	: i18nP('JS_SRVMGR_EDIT_CHECK', 'SRVMGR_ENGINE', text),
			callback : function(sel){
				if(sel){
					var cnt;
					if(text == i18nP('COMMON_ADD')){
						ANKUS_API.ajax({
							url			: '/admin/engine/name_exist',
							type		: 'POST',
							data		: JSON.stringify(data),
							success		: function(res){	
								//console.log(res);
								if(res.success){									
									cnt = res.object;											
								}else{
									ANKUS_API.util.alert(res.error.message);
								}
							}
						});
						
						_setSave(url, type, data, text, cnt);
						
					}else{
						_setSave(url, type, data, text, cnt);
					}
					
					_getInfoGrid();
					$('#_ei_Modal').ankusModal('hide');
					
				}
			}
		});
		
		
	};
	
	var _setSave = function(url, type, data, text, cnt){	
		
		var str_data;
		
		if(cnt > 0){
			ANKUS_API.util.alert(i18nP('JS_SRVMGR_ALREADY_EXIST', 'SRVMGR_ENGINE_NAME'));
			return;
		}
		
		if(type=='POST'){
			str_data = JSON.stringify(data)
		}else{
			str_data = data
		}
		
		ANKUS_API.ajax({
			url			: url,
			type		: type,
			data		: str_data,
			success		: function(res){
				//console.log(res);
				if(res.success){
					ANKUS_API.util.alert(i18nP('JS_SRVMGR_SUCCESS_EDIT', 'SRVMGR_ENGINE', text));									
				}
				else{
					ANKUS_API.util.alert(res.error.message);
				}
			}
		});
	};

	var _cancelAction = function(){
		$('#_ei_Modal').ankusModal('hide');
	};
	
	var _deleteAction = function(){
		
		var str_id;
		str_id = $('#_ei_engineId').val();
		//console.log(str_id);
		ANKUS_API.util.confirm({
			description	: i18nP('JS_SRVMGR_REMOVE_CHECK'),
			callback : function(sel){
				if(sel){
					ANKUS_API.ajax({
						url			: '/admin/engine/delete',
						type		: 'POST',
						data		: JSON.stringify({'id':str_id}), 
						success		: function(res){
							if(res.success){
								ANKUS_API.util.alert(i18nP('JS_SRVMGR_SUCCESS_REMOVE'));
								_getInfoGrid();								
							}
							else{
								ANKUS_API.util.alert(res.error.message);
							}
						}
					});	
					$('#_ei_Modal').ankusModal('hide');
				}
			}
		});
	};	
	
	var _getAddFormParam = function(isNew) {
		var param = {};
		param.name 				= $('#_ei_engineName').val();
		param.ip				= $('#_ei_engineIp').val();
		param.port				= $('#_ei_enginePort').val();
		param.hadoopClusterId 	= $('#_ei_hadoop').val();
		
		if($('#_ei_public').prop("checked") == true){
			param.isPublic = 1;
		}else{
			param.isPublic = 0;
		}
		
		if($('#_ei_permission').val() == ''){
			param.permission = $('#_main_userId').val();
		}else{
			param.permission = $('#_ei_permission').val() + ',' + $('#_main_userId').val();
		}
		param.hiveServerId = 0;
		return param;
	}
	
	var _getEditFormParam = function(isNew) {
		var param = {};
		param.id				= $('#_ei_engineId').val();
		param.name 				= $('#_ei_engineName').val();
		param.engineIP			= $('#_ei_engineIp').val();
		param.enginePort		= $('#_ei_enginePort').val();
		param.hadoopClusterId 	= $('#_ei_hadoop').val();
		
		if($('#_ei_public').prop("checked") == true){
			param.isPublic = 1;
		}else{
			param.isPublic = 0;
		}
		
		if($('#_ei_permission').val() == ''){
			param.permission = $('#_main_userId').val();
		}else{
			param.permission = $('#_ei_permission').val() + ',' + $('#_main_userId').val();
		}
		param.hiveServerId = 0;
		return param;
	}
	
	$('#_ei_public').on('click', function() {
		if($('#_ei_public').prop("checked") == true){
			$('#_ei_permission').prop("disabled", true);	
		}else{
			$('#_ei_permission').prop("disabled", false);
		}	
		
	});
	
	$('#_ei_btnSearch').on('click', function() {
		_setGrid();
		_getInfoGrid(true);		
		
	});
	
	$('#_ei_btnEnvs').on('click', function() {		
		$('#_ei_envs_table').toggle(true);	
		$('#_ei_prop_table').toggle(false);	
		$('#_ei_triggers_table').toggle(false);	
		$('#_ei_running_table').toggle(false);	
	});
	
	$('#_ei_btnProp').on('click', function() {
		$('#_ei_envs_table').toggle(false);	
		$('#_ei_prop_table').toggle(true);	
		$('#_ei_triggers_table').toggle(false);	
		$('#_ei_running_table').toggle(false);	
	});
	
	$('#_ei_btnTriggers').on('click', function() {
		$('#_ei_envs_table').toggle(false);	
		$('#_ei_prop_table').toggle(false);	
		$('#_ei_triggers_table').toggle(true);	
		$('#_ei_running_table').toggle(false);	
	});
	
	$('#_ei_btnRunning').on('click', function() {
		$('#_ei_envs_table').toggle(false);	
		$('#_ei_prop_table').toggle(false);	
		$('#_ei_triggers_table').toggle(false);	
		$('#_ei_running_table').toggle(true);	
	});
	
	$('#_ei_btnNew').on('click', _newAction);
	$('#_ei_btnSave').on('click', _saveAction);	
	$('#_ei_btnCancel').on('click', _cancelAction);	
	$('#_ei_btnDelete').on('click', _deleteAction);

	(function init(){
		_setGrid();		
		_getInfoGrid();		
	})();		
})();