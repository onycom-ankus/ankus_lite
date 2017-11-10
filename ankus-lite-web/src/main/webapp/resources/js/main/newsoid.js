(function newsoid(){
	var _firstLoad = false;
	var _getGrid = function(page){
		var postData = $('#_ns_grid').jqGrid('getGridParam', 'postData');
		var data = {};
		data.nsite	= $('#_ns_searchItem').val();	
		data.enable	= $('#_ns_searchEnable').val();
		data.paging		= true;
		if (postData) {
			data.page		= page ? 1 : postData.page;
			data.rows		= postData.rows;
			data.sidx		= postData.sidx;
			data.sord		= postData.sord;
		}
		
		ANKUS_API.ajax({
			url			: '/newsoid/list',
			data		: data,
			success		: function(res){
				console.log(res);
				var obj = res.map;
				obj.rows = res.list;
				$('#_ns_grid').jqGrid('resetSelection');
				$('#_ns_grid').jqGrid('clearGridData');
				$('#_ns_grid')[0].addJSONData(obj);
			}
		});
	};
	// 그리드 설정
	var _setGrid = function(){
		$('#_ns_grid').ankusGrid({
			datatype		: function(postData) {
				if (_firstLoad) {
					_getGrid();
				} else {
					_firstLoad = true;
				}
			},
			jsonReader		: {
				repeatitems	: false,
				id			: 'nsite'
			},
			sortname		: 'nsite',
			sortorder		: 'asc',
	        multiselect		: true,
	        idPrefix		: '_nsGrid_',
	        ondblClickRow	: function(id){
	        	_editAction($('#_ns_grid').getRowData(id));
	        },
	        refreshfunc		: function(){
	        },
	        pager			: '_ns_pager',
	        rowNum			: 20,
	        colModel		: [
	        	{ name : 'nsite', label : '언론사', width : 550, align : 'center'},	        	
	        	{ name : 'enable', label : '수집여부', width : 550, align : 'center'},
	        	{ name : 'id', hidden : true }
	        ]
	    });
	};
	
	var _createAction = function(){
			
		$('#_ns_id').val('');
		$('#_ns_id').prop('disabled', false);
		$('#_ns_nsite').val('');
		
		$('#_ns_btnSave').text('등록');
		$('#_ns_createModal .modal-title').text('뉴스  등록');
		
		$('#_ns_createModal').ankusModal('show');
	};
	var _editAction = function(row){
		
		$('#_ns_id').val(row.id);
		$('#_ns_id').prop('disabled', true);
		$('#_ns_nsite').val(row.nsite);		
		$('#_ns_enable').val(row.enable);
		
		$('#_ns_btnSave').text('수정');
		$('#_ns_createModal .modal-title').text('뉴스  수정');
		
		$('#_ns_createModal').ankusModal('show');
	};
	var _saveAction = function(){
		var url;
		var text;
		
		if ('수정' == $('#_ns_btnSave').text()) {
			url = '/newsoid/update';
			text = '수정';
		} else {
			url = '/newsoid/insert';
			text = '추가';
		}
		
		var data = _getFormParam();
		
		if (!data.nsite){
			ANKUS_API.util.alert('언론사명을 입력해 주세요.');
			return;
		}
		
		ANKUS_API.util.confirm({
			description	: '지정항목을 '+text+' 하시겠습니까?',
			callback : function(sel){
				if(sel){
					
					ANKUS_API.ajax({
						url			: url,
						type		: 'POST',
						data		: JSON.stringify(data),
						success		: function(res){
							if(res.success){
								ANKUS_API.util.alert('지정항목을 정상적으로 '+text+'하였습니다.');
								_getGrid();
							}
							else{
								ANKUS_API.util.alert(res.error.message);
							}
						}
					});
					$('#_ns_createModal').ankusModal('hide');
				}
			}
		});
	};
	
	var _cancelAction = function(){
		$('#_ns_createModal').ankusModal('hide');
	};

	var _btnDeleteAction = function(){
		var selArr = $('#_ns_grid').getGridParam('selarrrow');
		var length = selArr.length;
		
		var rows = [];
		$.each(selArr, function(i, v) {
			rows.push($('#_ns_grid').getRowData(v).id);
		});
		console.log(rows);
		
		if(0 === length){
			ANKUS_API.util.alert('삭제할 항목을 선택하십시오.');
			return;
		}
		ANKUS_API.util.confirm({
			description	: length + '개의 항목을 삭제하시겠습니까?',
			callback : function(sel){
				if(sel){
					ANKUS_API.ajax({
						url			: '/newsoid/deleteItems',
						type		: 'POST',
						data		: JSON.stringify(rows),
						success		: function(res){
							if(res.success){
								ANKUS_API.util.alert(res.map.cnt + '개 항목 중 ' + res.map.delCnt + '개 항목을 정상적으로 삭제하였습니다.');
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
		param.nsite = $('#_ns_nsite').val();
		param.id = $('#_ns_id').val();		
		param.enable = $('#_ns_enable').val();
		param.paging = true;
		
		return param;
	};
	
	$('#_ns_btnSearch').on('click', function() {
		_getGrid(true);
	});
	
	$('#_ns_searchItem').keypress(function(e){
		if(13 === e.which){
			$('#_ns_btnSearch').trigger('click');
		}
	});	

	$('#_ns_btnCreate').on('click', _createAction);
	$('#_ns_btnSave').on('click', _saveAction);
	$('#_ns_btnCancel').on('click', _cancelAction);
	
	$('#_ns_btnDelete').on('click', _btnDeleteAction);
	
	$('#_tabNewsOid').on('click', function() {
		_getGrid();
	});
	
	(function init(){
		_setGrid();
	})();		
})();