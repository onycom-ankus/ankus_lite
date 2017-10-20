(function usermgr(){

	var _firstLoad = false;
	var _getGrid = function(page){
		var postData = $('#_user_grid').jqGrid('getGridParam', 'postData');
		var data = {};
		data.username	= $('#_user_findname').val();
		data.email		= $('#_user_findemail').val();
		data.authority	= $('#_user_findauthority').val();
		data.enabled			= $('#_user_findenabled').val();
		data.createDate			= $('#_user_findecreate_dt').val();
		data.paging			= true;
		if (postData) {
			data.page		= page ? 1 : postData.page;
			data.rows		= postData.rows;
			data.sidx		= postData.sidx;
			data.sord		= postData.sord;
		}
		ANKUS_API.ajax({
			url			: '/admin/user/servers',
			data		: data,
			success		: function(res){
//				console.log(res);
				var obj = res.map;
				obj.rows = res.list;
				$('#_user_grid').jqGrid('resetSelection');
				$('#_user_grid').jqGrid('clearGridData');
				$('#_user_grid')[0].addJSONData(obj);
			}
		});
	};
	
	function formattimestamp(cellvalue, options, rowObject)
	{
		if(cellvalue==null) return "";
		var d = new Date(cellvalue);
		return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " +  d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
	}
	
	// 그리드 설정
	var _setGrid = function(){
		$('#_user_grid').ankusGrid({
			datatype		: function(postData) {
				if (_firstLoad) {
					_getGrid();
				} else {
					_firstLoad = true;
				}
			},
			jsonReader		: {
				repeatitems	: false,
				id			: 'username'
			},
			sortname		: 'username',
			sortorder		: 'asc',
	        multiselect		: false,
	        idPrefix		: '_user_grid',
	        ondblClickRow	: function(id){
	        	_editAction($('#_user_grid').getRowData(id));
	        },
	        refreshfunc		: function(){
	        },
	        pager			: '_user_pager',
	        rowNum			: 20,
	        colModel		: [
//	        	{ name : 'passwd', hidden : true },
	        	{ name : 'username', index : 'username', label : i18nP('USERMGR_USER_NAME')},
	        	{ name : 'email', index : 'email', label : i18nP('USERMGR_EMAIL')},
	        	{ name : 'enabled', index : 'enabled', label : i18nP('USERMGR_ACTIVATION')},
	        	{ name : 'authority', index : 'authority', label : i18nP('USERMGR_AUTH')},
	        	{ name : 'lastlogin', index : 'lastlogin', formatter: formattimestamp, label : i18nP('USERMGR_LAST_CREATE_DAY')},
	        	{ name : 'createDate', index : 'createDate', formatter: formattimestamp, label : i18nP('USERMGR_CREATE_DAY')}
	        ]
	    });
	};	
	
	var _getFormParam = function() {
		var param = {};
		param.username = $('#_user_username').val();
		param.email = $('#_user_email').val();
//		param.passwd = $('#_user_passwd').val();
		param.enabled = ($('#_user_enabled').val()=="true");
		param.authority = $('#_user_authority').val();
		return param;
	}
	var _createAction = function(){
		$('#_user_username').val('');
		$('#_user_email').val('');
//		$('#_user_passwd').val('');
		$('#_user_enabled').val('');
		$('#_user_authority').val('');
		
		$('#_as_btnSave').text(i18nP('COMMON_CREATE'));
		$('#_as_createModal .modal-title').text(i18nP('USERMGR_CREATE_DAY'));
		
		$('#_user_createModal').ankusModal('show');
	};
	var _editAction = function(row){
		$('#_user_username').val(row.username);
		$('#_user_email').val(row.email);
//		$('#_user_passwd').val(row.passwd);
		$('#_user_enabled').val(row.enabled);
		$('#_user_authority').val(row.authority);
		
		$('#_user_btnSave').text(i18nP('COMMON_UPDATE'));
		$('#_user_createModal .modal-title').text(i18nP('USERMGR_USER_INFO_UPDATE'));
		
		$('#_user_createModal').ankusModal('show');
	};
	var _saveAction = function(){
		var url;
		var text;
		
		if (i18nP('COMMON_UPDATE') == $('#_user_btnSave').text()) {
			url = '/admin/user/update';
			text = i18nP('COMMON_UPDATE');
		} else {
			url = '/signup';
			text = i18nP('COMMON_ADD');
		}
		
		var data = _getFormParam();
		
		ANKUS_API.util.confirm({
			description	: i18nP('JS_USERMGR_USER_INFO_EDIT_CHECK', text),
			callback : function(sel){
				if(sel){
					ANKUS_API.ajax({
						url			: url,
						type		: 'POST',
						data		: JSON.stringify(data),
						success		: function(res){
							if(res.success){
								ANKUS_API.util.alert(i18nP('JS_USERMGR_USER_INFO_EDIT_SUCCESS', text));
								_getGrid();
							}
							else{
								ANKUS_API.util.alert(res.error.message);
							}
						}
					});
					$('#_user_createModal').ankusModal('hide');
				}
			}
		});
	};
	
	var _cancelAction = function(){
		$('#_user_createModal').ankusModal('hide');
	};

	var _deleteAction = function(){
		
		var data = {};
		data.usernames = $('#_user_username').val();
		ANKUS_API.util.confirm({
			description	: i18nP('JS_USERMGR_USER_EDIT_CHECK', $('#_user_username').val()),
			callback : function(sel){
				if(sel){
					ANKUS_API.ajax({
						url			: '/admin/user/delete',
						type		: 'GET',
						data		: data,
						success		: function(res){
							if(res.success){
								ANKUS_API.util.alert(i18nP('JS_USERMGR_USER_EDIT_SUCCESS', $('#_user_username').val()));
								_getGrid();
							}
							else{
								ANKUS_API.util.alert(res.error.message);
							}
							$('#_user_createModal').ankusModal('hide');
						}
					});			
				}
			}
		});
	};	
	
	$('#_user_btnCreate').on('click', _createAction);
	$('#_user_btnSave').on('click', _saveAction);
	$('#_user_btnCancel').on('click', _cancelAction);
	$('#_user_btnDelete').on('click', _deleteAction);
	
	$('#_user_btnSearch').on('click', function() {
		_getGrid(true);
	});
	
	(function init(){
		
		$('#_user_findcreate_dt').ankusDate();
		_setGrid();
		_getGrid();
	})();
			
})();