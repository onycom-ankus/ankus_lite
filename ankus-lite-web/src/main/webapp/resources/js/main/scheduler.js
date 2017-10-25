function func_sc_run(id)
{
	ANKUS_API.util.confirm({
		description	: i18nP('JS_SCHE_IS_EXECUTE_SCHE'),
		callback : function(sel){
			if(sel){
				ANKUS_API.ajax({
					url			: '/main/runscheduler',
					type		: 'GET',
					data		: {schid:id},
					success		: function(res){
						if(res.success){
							ANKUS_API.util.alert(i18nP('JS_SCHE_EXECUTE_SCHE'));
							$('#_sc_btnSearch').trigger('click');
							
						}
						else{
							ANKUS_API.util.alert(res.error.message);
						}
					}
				});			
			}
		}
	});	
}

(function scheduler(){
//	var _stype = {'W':'workflow','R':'원격실행','L':'로컬실행'};
	var _stype = {'W':'workflow','L':i18nP('JS_SCHE_EXECUTE_SCHE_LOCAL')};
	var _firstLoad = false;
	var _getGrid = function(page){
		var postData = $('#_sc_grid').jqGrid('getGridParam', 'postData');
		var data = {};
		data.name			= $('#_sc_findname').val();
		data.workflowName	= $('#_sc_workflowName').val();
		data.stype			= $('#_sc_searchStype').val();
		data.enable			= $('#_sc_searchEnable').val();
		data.paging			= true;
		if (postData) {
			data.page		= page ? 1 : postData.page;
			data.rows		= postData.rows;
			data.sidx		= postData.sidx;
			data.sord		= postData.sord;
		}
		ANKUS_API.ajax({
			url			: '/main/scheduler/list',
			data		: data,
			success		: function(res){
				var obj = res.map;
				obj.rows = res.list;
				$('#_sc_grid').jqGrid('resetSelection');
				$('#_sc_grid').jqGrid('clearGridData');
				$('#_sc_grid')[0].addJSONData(obj);
			}
		});
	};
	
	// 그리드 설정
	var _setGrid = function(){
		$('#_sc_grid').ankusGrid({
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
			sortname		: 'S.ID',
			sortorder		: 'asc',
	        multiselect		: true,
	        idPrefix		: '_scGrid_',
	        ondblClickRow	: function(id){
	        	_updateAction($('#_sc_grid').getRowData(id));
	        },
	        refreshfunc		: function(){
	        },
	        pager			: '_sc_pager',
	        rowNum			: 20,
	        colModel		: [
	        	{ name : 'id', hidden : true },
	        	{ name : 'workflowId', hidden : true },
	        	{ name : 'name', index : 'W.[NAME]', label : i18nP('JS_SCHE_NAME')},
	        	{ name : 'stype', label : i18nP('JS_SCHE_KINDS'), formatter : 'select', editable : true, edittype : 'select', editoptions : {value:_stype}, align : 'center', width : 100 },
	        	{ name : 'schedule', label : i18nP('JS_SCHE'), sortable : false, width : 200},
	        	{ name : 'month', index : '[MONTH]', label : i18nP('COMMON_MONTH'), formatter : _monthFormat, unformat : _unformat, width : 80 },
	        	{ name : 'week', label : i18nP('COMMON_WEEK'), formatter : _weekFormat, unformat : _weekUnformat, width : 80 },
	        	{ name : 'day', index : '[DAY]', label : i18nP('COMMON_DAY'), formatter : _dayFormat, unformat : _unformat, width : 80 },
	        	{ name : 'hour', index : '[HOUR]', label : i18nP('COMMON_HOUR'), formatter : _hourFormat, unformat : _unformat, width : 80 },
	        	{ name : 'min', index : '[MIN]', label : i18nP('COMMON_MINUTE'), formatter : _minFormat, unformat : _unformat, width : 80 },
	        	{ name : 'state', label : i18nP('COMMON_STATUS'), align : 'center', width : 70 },
	        	{ name : 'runtime', label : i18nP('COMMON_OPERATING_TIME'), formatter: formattimestamp, width : 140 },
	        	{ name : 'endtime', label : i18nP('COMMON_QUIT_TIME'), formatter: formattimestamp, width : 140 },
	        	{ name : 'duration', label : i18nP('COMMON_RUNNING_TIME'), formatter: _durfmt, width : 80 },
	        	{ name : 'enable', label : i18nP('COMMON_IS_USE'), align : 'center', width : 70 },
	        	{ name : 'workflowName', hidden : true},
	        	{ name : 'sshIp', hidden : true},
	        	{ name : 'sshPort', hidden : true},
	        	{ name : 'sshId', hidden : true},
	        	{ name : 'sshPwd', hidden : true},
	        	{ name : 'sshCmd', hidden : true},
	        	{ label : i18nP('JS_SCHE_MANUAL_EXECUTION'), align : 'center', width : 70, formatter:m_execution },
	        ]
	    });
	};
	
	function m_execution(cellvalue, options, rowObject){
		
		if(rowObject.state=="RUNNING" || rowObject.state=="PREPARING") return "";
		 return '<button onclick="func_sc_run('+rowObject.id+');">▶</button>'; 
	}
	
	function _getWorkflow(){
		ANKUS_API.ajax({
			url			: '/designer/tree/get',
			data		: {
				_dc : new Date().getTime(),
				type : 'WORKFLOW',
				username : $('#_main_userId').val(),
				node : '/'
			},
			type		: 'GET',
			success		: function(res){
				$('#_sc_workflow').empty();
				$('<option>').val('').text('').appendTo($('#_sc_workflow'));
				$.each(res.list, function(i, v) {
					$('<option>').val(v.workflowId).text(v.text).appendTo($('#_sc_workflow'));
				});
			},
			error : function(xhr, status, error) {
//	        	alert("에러발생");
			}
		});
	}
	
	function _setStype(){
		$('#_sc_searchStype, #_sc_stype').empty();
		$('<option>').val('').text(i18nP('COMMON_TOTAL')).appendTo($('#_sc_searchStype'));
		$.each(_stype, function(k, v) {
			$('<option>').val(k).text(v).appendTo($('#_sc_searchStype, #_sc_stype'));
		});
	} 
	
	var _createAction = function(){
		_getWorkflow();		
		$('#_sc_id').val('');
		$('#_sc_name').val('');
		$('#_sc_stype').val('W').trigger('change');
		$('#_sc_workflow').val('');
		$('#_sc_sshIp').val('');
		$('#_sc_sshPort').val('');
		$('#_sc_sshID').val('');
		$('#_sc_sshPwd').val('');
		$('#_sc_sshCmd').val('');
		$('._sc_month').prop('checked', false);
		$('#_sc_month_all').prop('checked', true);
		$('._sc_week').prop('checked', false);
		$('#_sc_week_all').prop('checked', true);
		$('#_sc_day').val('');
		$('#_sc_hour').val('1');
		$('#_sc_min').val('0');
		$('#_sc_enable').val('Y');

		$('#_sc_btnSave').text(i18nP('COMMON_CREATE'));
		$('#_sc_createModal .modal-title').text(i18nP('SCHE_SCHEDULE_CREATE'));
		
		$('#_sc_createModal').ankusModal('show');
	};
	var _updateAction = function(row){
		$('#_sc_id').val(row.id);
		$('#_sc_name').val(row.name);
		$('#_sc_stype').val(row.stype).trigger('change');
		$('#_sc_workflow').val(row.workflowId);
		$('#_sc_sshIp').val(row.sshIp);
		$('#_sc_sshPort').val(row.sshPort);
		$('#_sc_sshId').val(row.sshId);
		$('#_sc_sshPwd').val(row.sshPwd);
		$('#_sc_sshCmd').val(row.sshCmd);
		
		$('#_sc_month_all').prop('checked', false);
		$('._sc_month').prop('checked', false);
		if (row.month) {
			$.each(row.month.split(','), function(i, v) {
				$('#_sc_month_'+v).prop('checked', true);
			});
		} else {
			$('#_sc_month_all').prop('checked', true);
		}
		
		$('#_sc_week_all').prop('checked', false);
		$('._sc_week').prop('checked', false);
		if (row.week) {
			$.each(row.week.split(','), function(i, v) {
				$('#_sc_week_'+v).prop('checked', true);
			});
		} else {
			$('#_sc_week_all').prop('checked', true);
		}
		
		$('#_sc_day').val(row.day);
		$('#_sc_hour').val(row.hour);
		$('#_sc_min').val(row.min);
		$('#_sc_enable').val(row.enable);
		
		$('._sc_month').trigger('change');
		$('._sc_week').trigger('change');
		
		$('#_sc_btnSave').text(i18nP('COMMON_UPDATE'));
		$('#_sc_createModal .modal-title').text(i18nP('JS_SCHE_UPDATE'));
		
		$('#_sc_createModal').ankusModal('show');
	};
	var _createSubmitAction = function(){
		var url;
		var text;
		
		if ($('#_sc_id').val()) {
			url = '/main/scheduler/update';
			text = i18nP('COMMON_UPDATE');
		} else {
			url = '/main/scheduler/insert';
			text = i18nP('COMMON_CREATE');
		}
		
		var data = _getFormParam();
		if (!data.stype) {
			ANKUS_API.util.alert({
				description : i18nP('JS_SHCE_REQUIRE_CHECK', 'JS_SCHE_KINDS'),
				callback : function() { $('#_sc_stype').focus(); }
			});
			return;
		} else  if (data.stype == 'W') {
			if (!data.workflowId) {
				ANKUS_API.util.alert({
					description : i18nP('JS_SHCE_REQUIRE_CHECK', 'SCHE_WORKFLOW'),
					callback : function() { $('#_sc_workflow').focus(); }
				});
				return;
			}
		} else  if (data.stype == 'R') {
			if (!data.sshIp) {
				ANKUS_API.util.alert({
					description : i18nP('JS_SHCE_REQUIRE_CHECK', 'SCHE_REMOTE_IP'),
					callback : function() { $('#_sc_sshIp').focus(); }
				});
				return;
			}
			if (!data.sshPort) {
				ANKUS_API.util.alert({
					description : i18nP('JS_SHCE_REQUIRE_CHECK', 'SCHE_REMOTE_PORT'),
					callback : function() { $('#_sc_sshPort').focus(); }
				});
				return;
			}
			if (!data.sshId) {
				ANKUS_API.util.alert({
					description : i18nP('JS_SHCE_REQUIRE_CHECK', 'SCHE_REMOTE_ID'),
					callback : function() { $('#_sc_sshId').focus(); }
				});
				return;
			}
			if (!data.sshPwd) {
				ANKUS_API.util.alert({
					description : i18nP('JS_SHCE_REQUIRE_CHECK', 'SCHE_REMOTE_PW'),
					callback : function() { $('#_sc_sshPwd').focus(); }
				});
				return;
			}
			if (!data.sshCmd) {
				ANKUS_API.util.alert({
					description : i18nP('JS_SHCE_REQUIRE_CHECK', 'SCHE_REMOTE_COMMAND'),
					callback : function() { $('#_sc_sshCmd').focus(); }
				});
				return;
			}
		} else  if (data.stype == 'R') {
			if (!data.sshCmd) {
				ANKUS_API.util.alert({
					description : i18nP('JS_SHCE_REQUIRE_CHECK', 'SCHE_REMOTE_COMMAND'),
					callback : function() { $('#_sc_sshCmd').focus(); }
				});
				return;
			}
		} 
		
		if (/[^(\d|,)]/.test(data.day)) {
			ANKUS_API.util.alert({
				description : i18nP('JS_SHCE_NUMBER_COMMA_CHECK'),
				callback : function() { $('#_sc_day').focus(); }
			});
			return;
		}
		if (/[^(\d|,)]/.test(data.hour)) {
			ANKUS_API.util.alert({
				description : i18nP('JS_SHCE_NUMBER_COMMA_CHECK'),
				callback : function() { $('#_sc_hour').focus(); }
			});
			return;
		}
		if (/[^(\d|,)]/.test(data.min)) {
			ANKUS_API.util.alert({
				description : i18nP('JS_SHCE_NUMBER_COMMA_CHECK'),
				callback : function() { $('#_sc_min').focus(); }
			});
			return;
		}
		var valid = true;
		$.each(data.day.split(','), function(i, v) {
			if (v > 31) { valid = false; }
		});
		if (!valid) {
			ANKUS_API.util.alert({
				description : i18nP('JS_SHCE_1_to_31_CHECK'),
				callback : function() { $('#_sc_day').focus(); }
			});
			return;
		}
		$.each(data.hour.split(','), function(i, v) {
			if (v > 23) { valid = false; }
		});
		if (!valid) {
			ANKUS_API.util.alert({
				description : i18nP('JS_SHCE_2_to_23_CHECK'),
				callback : function() { $('#_sc_hour').focus(); }
			});
			return;
		}
		$.each(data.min.split(','), function(i, v) {
			if (v > 59) { valid = false; }
		});
		if (!valid) {
			ANKUS_API.util.alert({
				description : i18nP('JS_SHCE_0_to_59_CHECK'),
				callback : function() { $('#_sc_min').focus(); }
			});
			return;
		}
		if (!data.enable) {
			ANKUS_API.util.alert({
				description : i18nP('JS_SHCE_REQUIRE_CHECK', 'SCHE_IS_USE'),
				callback : function() { $('#_sc_enable').focus(); }
			});
			return;
		}
		
		ANKUS_API.util.confirm({
			description	: i18nP('JS_SHCE_IS_EDIT', text),
			callback : function(sel){
				if(sel){
					ANKUS_API.ajax({
						url			: url,
						type		: 'GET',
						data		: data,
						success		: function(res){
							if(res.success){
								ANKUS_API.util.alert(i18nP('JS_SHCE_SUCCESS_EDIT', text));
								_getGrid();
							}
							else{
								ANKUS_API.util.alert(res.error.message);
							}
						}
					});
					$('#_sc_createModal').ankusModal('hide');
				}
			}
		});
	};
	var _cancelAction = function(){
		$('#_sc_createModal').ankusModal('hide');
	};

	var _deleteAction = function(){
		var selArr = $('#_sc_grid').getGridParam('selarrrow');
		var length = selArr.length;
		
		var rows = [];
		$.each(selArr, function(i, v) {
			rows.push($('#_sc_grid').getRowData(v).id);
		});
		
		if(0 === length){
			ANKUS_API.util.alert(i18nP('JS_SHCE_SELECT_REMOVE_ITEM'));
			return;
		}
		ANKUS_API.util.confirm({
			description	: i18nP('JS_SHCE_REMOVE_CHECK', length),
			callback : function(sel){
				if(sel){
					ANKUS_API.ajax({
						url			: '/main/scheduler/deleteSchedulers',
						type		: 'POST',
						data		: JSON.stringify(rows),
						success		: function(res){
							if(res.success){
								ANKUS_API.util.alert(i18nP('JS_SHCE_SUCCESS_CHECK', res.map.cnt, res.map.delCnt));
								_getGrid();
							}
							else{
								ANKUS_API.util.alert(res.error.message);
							}
						}
					});			
				}
			}
		});
	};
	
	var _getFormParam = function() {
		var param = {};
		param.id = $('#_sc_id').val();
		param.name = $('#_sc_name').val();
		param.stype = $('#_sc_stype').val();
		param.workflowId = $('#_sc_workflow').val();
		param.sshIp = $('#_sc_sshIp').val();
		param.sshPort = $('#_sc_sshPort').val();
		param.sshId = $('#_sc_sshId').val();
		param.sshPwd = $('#_sc_sshPwd').val();
		param.sshCmd = $('#_sc_sshCmd').val();
		
		if ($('#_sc_month_all').prop('checked')) {
			param.month = '';
		} else {
			var month = [];
			$('._sc_month:checked').each(function(i, el) {
				month.push($(el).val());
			});
			param.month = month.join(',');
		}
		
		if ($('#_sc_week_all').prop('checked')) {
			param.week = '';
		} else {
			var week = [];
			$('._sc_week:checked').each(function(i, el) {
				week.push($(el).val());
			});
			param.week = week.join(',');
		}
		
		param.day = $('#_sc_day').val();
		param.hour = $('#_sc_hour').val();
		param.min = $('#_sc_min').val();
		param.enable = $('#_sc_enable').val();
		return param;
	}
	
	var _monthFormat = function(cellvalue, options, rowObject) {
		if (cellvalue) return cellvalue;					
		else return i18nP('COMMON_ALL_MONTH');
	}
	var _weekFormat = function(cellvalue, options, rowObject) {
		if (cellvalue)
			return cellvalue.replace(/0/g, i18nP('COMMON_SUNDAY')).replace(/1/g, i18nP('COMMON_MONDAY')).replace(/2/g, i18nP('COMMON_THUSDAY')).replace(/3/g, i18nP('COMMON_WENDSDAY')).replace(/4/g, i18nP('COMMON_THURTHDAY')).replace(/5/g, i18nP('COMMON_FRIDAY')).replace(/6/g, i18nP('COMMON_SATURDAY'));					
		else
			return i18nP('COMMON_ALL_WEEK');
	}
	var _weekUnformat = function(cellvalue, options, rowObject) {
		
		return (cellvalue === i18nP('COMMON_ALL_MONTH') ||
				cellvalue === i18nP('COMMON_SUNDAY') ||
				cellvalue === i18nP('COMMON_MONDAY') ||
				cellvalue === i18nP('COMMON_THUSDAY') ||
				cellvalue === i18nP('COMMON_WENDSDAY') ||
				cellvalue === i18nP('COMMON_THURTHDAY') ||
				cellvalue === i18nP('COMMON_FRIDAY') ||
				cellvalue === i18nP('COMMON_SATURDAY')) ? '' : cellvalue;
		
//		return cellvalue.replace(/매주/g, '').replace(/일/g, '0').replace(/월/g, '1').replace(/화/g, '2').replace(/수/g, '3').replace(/목/g, '4').replace(/금/g, '5').replace(/토/g, '6');					
	}
	var _dayFormat = function(cellvalue, options, rowObject) {
		if (cellvalue) return cellvalue;					
		else return i18nP('COMMON_ALL_DAY');
	}
	var _hourFormat = function(cellvalue, options, rowObject) {
		if (cellvalue) return cellvalue;					
		else return i18nP('COMMON_ALL_HOUR');
	}
	var _minFormat = function(cellvalue, options, rowObject) {
		if (cellvalue) return cellvalue;					
		else return i18nP('COMMON_ALL_MINUTE');
	}
	var _durfmt = function(cellvalue, options, rowObject) {
		if (cellvalue==null) return ""; 
		return Math.floor(cellvalue/60) +":"+(cellvalue%60);					
//		else return '';
	} 
	
	var _unformat = function(cellvalue, options, rowObject) {
		
		return (cellvalue === i18nP('COMMON_ALL_MONTH') ||
				cellvalue === i18nP('COMMON_ALL_DAY') ||
				cellvalue === i18nP('COMMON_ALL_HOUR') ||
				cellvalue === i18nP('COMMON_ALL_MINUTE')) ? '' : cellvalue;
		
//		return cellvalue.replace(/매월/g, '').replace(/매일/g, '').replace(/매시/g, '').replace(/매분/g, '');					
	}
	
	function formattimestamp(cellvalue, options, rowObject)
	{
		if(cellvalue==null) return "";
		var d = new Date(cellvalue);
		return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " +  d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
	}
	
	$('#_sc_btnSearch').on('click', function() {
		_getGrid(true);
	});
	$('#_sc_workflowName').keypress(function(e){
		if(13 === e.which){
			$('#_sc_btnSearch').trigger('click');
		}
	});
	$('#_sc_searchStype').on('change', function() {
		$('#_sc_btnSearch').trigger('click');
	});
	
	$('#_sc_btnCreate').on('click', _createAction);
	$('#_sc_btnSave').on('click', _createSubmitAction);
	$('#_sc_btnCancel').on('click', _cancelAction);
	
	$('#_sc_btnDelete').on('click', _deleteAction);
	
	$('#_sc_stype').on('change', function() {
		var value = $(this).val();
		$('#_sc_createModal ._stype').hide();
		$('#_sc_createModal ._stype').hide();
		if (value == 'W') {
			$('#_sc_createModal ._stypeW').show();
			$('#_sc_createModal ._stype:not(._stypeW)').find('select, input').val('');
		} else if (value == 'R') {
			$('#_sc_createModal ._stypeR').show();
			$('#_sc_createModal ._stype:not(._stypeR)').find('select, input').val('');
		} else if (value == 'L') {
			$('#_sc_createModal ._stypeL').show();
			$('#_sc_createModal ._stype:not(._stypeL)').find('select, input').val('');
		} else {
			
		}
	});
	
	$('#_sc_month_all').on('change', function() {
		if ($(this).prop('checked')) {
			$('._sc_month').prop('checked', false);
		} else {
			var checked = false;
			$('._sc_month').each(function(i, el) {
				if ($(el).prop('checked')) checked = true;
			});
			if (!checked) {
				$('#_sc_month_all').prop('checked', true);
			}
		}
	});
	$('._sc_month').on('change', function() {
		var checked = false;
		var unChecked = false;
		$('._sc_month').each(function(i, el) {
			if ($(el).prop('checked')) checked = true;
			else unChecked = true;
		});
		if (checked) {
			$('#_sc_month_all').prop('checked', false);
		}
		if (!unChecked) {
			$('#_sc_month_all').prop('checked', true);
			$('._sc_month').prop('checked', false);
		}
	});
	$('#_sc_week_all').on('change', function() {
		if ($(this).prop('checked')) {
			$('._sc_week').prop('checked', false);
		} else {
			var checked = false;
			$('._sc_week').each(function(i, el) {
				if ($(el).prop('checked')) checked = true;
			});
			if (!checked) {
				$('#_sc_week_all').prop('checked', true);
			}
		}
	});
	$('._sc_week').on('change', function() {
		var checked = false;
		var unChecked = false;
		$('._sc_week').each(function(i, el) {
			if ($(el).prop('checked')) checked = true;
			else unChecked = true;
		});
		if (checked) {
			$('#_sc_week_all').prop('checked', false);
		}
		if (!unChecked) {
			$('#_sc_week_all').prop('checked', true);
			$('._sc_week').prop('checked', false);
		}
	});
	
	$('#_tabScheduler').on('click', function() {
		_getWorkflow();
		_getGrid();
	});
	(function init(){
		_setGrid();
		_setStype();
		_getWorkflow();
	})();		
})();