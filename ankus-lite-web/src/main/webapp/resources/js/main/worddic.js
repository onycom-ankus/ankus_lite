(function worddic(){	
	var _firstLoad = false;
	var _getGrid = function(page){
		var postData = $('#_wd_grid').jqGrid('getGridParam', 'postData');
		var data = {};
		data.word		= $('#_wd_searchWord').val();	
		data.wtype		= $('#_wd_searchWtype').val();
		data.paging		= true;
		if (postData) {
			data.page		= page ? 1 : postData.page;
			data.rows		= postData.rows;
			data.sidx		= postData.sidx;
			data.sord		= postData.sord;
		}
		
		ANKUS_API.ajax({
			url			: '/worddic/list',
			data		: data,
			success		: function(res){			
				var obj = res.map;
				obj.rows = res.list;
				$('#_wd_grid').jqGrid('resetSelection');
				$('#_wd_grid').jqGrid('clearGridData');
				$('#_wd_grid')[0].addJSONData(obj);
			}
		});
	};
	// 그리드 설정
	var _setGrid = function(){
		$('#_wd_grid').ankusGrid({
			datatype		: function(postData) {
				if (_firstLoad) {
					_getGrid();
				} else {
					_firstLoad = true;
				}
			},
			jsonReader		: {
				repeatitems	: false,
				id			: 'wid'
			},
			sortname		: 'word',
			sortorder		: 'asc',
	        multiselect		: true,
	        idPrefix		: '_wdGrid_',
	        ondblClickRow	: function(id){
	        	_editAction($('#_wd_grid').getRowData(id));
	        },
	        refreshfunc		: function(){
	        },
	        pager			: '_wd_pager',
	        rowNum			: 20,
	        colModel		: [
	        	{ name : 'wid', hidden : true},
	        	{ name : 'word', label : '대표어',  width : 590, align : 'center'},	        	
	        	{ name : 'wtype', label : '종류',  width : 590, align : 'center'}	        	
	        ]
	    });
	};
	
	function _getItems(){
		
		var item = $('#_wd_popSearchWord').val();
		if (!item) {
			ANKUS_API.util.alert('대표어를 입력해 주세요.');
			return;
		}
		
		var data = {};
		data.word = item;
		
		ANKUS_API.ajax({
			url			: '/worddic/exist',
			data		: JSON.stringify(data),
			type		: 'POST',
			success		: function(res){
				if(res.total > 0){
					ANKUS_API.util.alert('대표어가 중복됩니다.');
					return;
				}else{
					var str_item = $('#_wd_popSearchWord').val();
					$('#_wd_word').val(str_item);
				}
			},
			error : function(xhr, status, error) {
//	        	alert("에러발생");
	        }
		});
	};
	
	var _createAction = function(){
		$('#_wd_wid').val('');
		$('#_wd_popSearchWord').val('');
		$('#_wd_word').val('');
		$('#_wd_wtype').val('');
		
		$('#_wd_btnSave').text('생성');
		$('#_wd_createModal .modal-title').text('단어 생성');
		
		$('#_wd_createModal').ankusModal('show');
	};
	
	var _editAction = function(row){		
		$('#_wd_wid').val(row.wid);			
		$('#_wd_popSearchWord').val('');			
		$('#_wd_word').val(row.word);				
		$('#_wd_wtype').val(row.wtype);			
		$('#_wd_btnSave').text('수정');
		$('#_wd_createModal .modal-title').text('단어 수정');
		
		$('#_wd_createModal').ankusModal('show');		
	};
	var _saveAction = function(){
		var url;
		var text;
		
		if ($('#_wd_wid').val()) {
			url = '/worddic/update';
			text = '수정';
		} else {
			url = '/worddic/insert';
			text = '추가';
		}
			
		var data = _getFormParam();
		
		if (!data.word){
			ANKUS_API.util.alert('대표어를 입력하고 중복체크를 클릭하여 주세요.');
			return;
		}
		
		ANKUS_API.util.confirm({
			description	: '단어를 '+text+' 하시겠습니까?',
			callback : function(sel){
				if(sel){

					ANKUS_API.ajax({
						url			: url,
						type		: 'POST',
						data		: JSON.stringify(data),
						success		: function(res){
							if(res.success){
								ANKUS_API.util.alert('단어를 정상적으로 '+text+'하였습니다.');
								_getGrid();
							}
							else{
								ANKUS_API.util.alert(res.error.message);
							}
						}
					});
					$('#_wd_createModal').ankusModal('hide');
				}
			}
		});
	};
	
	var _cancelAction = function(){
		$('#_wd_createModal').ankusModal('hide');
	};

	var _btnDeleteAction = function(){
		var selArr = $('#_wd_grid').getGridParam('selarrrow');
		var length = selArr.length;
		
		var rows = [];
		$.each(selArr, function(i, v) {
			rows.push($('#_wd_grid').getRowData(v).wid);
		});
		
		if(0 === length){
			ANKUS_API.util.alert('삭제할 항목을 선택하십시오.');
			return;
		}
		ANKUS_API.util.confirm({
			description	: length + '개의 항목을 삭제하시겠습니까?',
			callback : function(sel){
				if(sel){
					ANKUS_API.ajax({
						url			: '/worddic/deleteItems',
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
		param.wid = $('#_wd_wid').val();
		param.word = $('#_wd_word').val();
		param.wtype = $('#_wd_wtype').val();				
		
		return param;
	};
	
	$('#_wd_btnSearch').on('click', function() { 
		_getGrid(true);
	});
	
	$('#_wd_searchDtype').change(function(e){		
		$('#_wd_btnSearch').trigger('click');
	});
	
	$('#_wd_popSearchBtn').on('click', _getItems);
	$('#_wd_popSearchWord').keypress(function(e){
		if(13 === e.which){
			$('#_wd_popSearchBtn').trigger('click');
		}
	});

	$('#_wd_btnCreate').on('click', _createAction);
	$('#_wd_btnSave').on('click', _saveAction);
	$('#_wd_btnCancel').on('click', _cancelAction);
	
	$('#_wd_btnDelete').on('click', _btnDeleteAction);
	
	$('#_tabWorddic').on('click', function() {
		_getGrid();
	});
	
	(function init(){
		_setGrid();
	})();		
})();