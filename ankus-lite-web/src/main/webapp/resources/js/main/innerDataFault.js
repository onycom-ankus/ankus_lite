(function innerDataFault(){
	var _firstLoad = false;
	var _getGrid = function(page){
		var postData = $('#_idf_grid').jqGrid('getGridParam', 'postData');
		var data = {};
		data.from	= $('#_idf_searchFrom').val();
		data.to		= $('#_idf_searchTo').val();		
		var type	= $('#_idf_searchType').val();
		
		if(type == '제품명'){
			data.prdt_nm = $('#_idf_searchItem').val(); 
		}else{
			data.prdt_cd = $('#_idf_searchItem').val();
		}
		data.paging		= true;
		
		if (postData) {
			var sidx 		= postData.sidx;
			sidx = sidx.indexOf('[');
			data.page		= page ? 1 : postData.page;			
			data.rows		= postData.rows;
			if(sidx == '-1'){
				data.sidx		= '[' + postData.sidx + ']';
			}else{
				data.sidx		= postData.sidx;
			}
			data.sord		= postData.sord;
		}
	
		
		ANKUS_API.ajax({
			url			: '/innerDataFault/list',
			data		: data,
			success		: function(res){
				//console.log(res);
				var obj = res.map;
				obj.rows = res.list;
				
				$('#_idf_grid').jqGrid('resetSelection');
				$('#_idf_grid').jqGrid('clearGridData');
				$('#_idf_grid')[0].addJSONData(obj);
			}
		});
	};
	// 그리드 설정
	var _setGrid = function(){
		$('#_idf_grid').ankusGrid({
			datatype		: function(postData) {
				if (_firstLoad) {
					_getGrid();
				} else {
					_firstLoad = true;
				}
			},
			jsonReader		: {
				repeatitems	: false,
				id			: '[DATE]'
			},
			sortname		: '[DATE]',
			sortorder		: 'asc',
	        multiselect		: true,
	        idPrefix		: '_idfGrid_',
	        ondblClickRow	: function(id){
	        	_editAction($('#_idf_grid').getRowData(id));
	        },
	        refreshfunc		: function(){
	        },
	        pager			: '_idf_pager',
	        rowNum			: 20,	        
	        colModel		: [
	        	{ name : 'date', label : '일자', width : 100, align : 'center'},	        	
	        	{ name : 'prdt_cd', label : '제품코드', width : 100, align : 'center'},
	        	{ name : 'prdt_nm', label : '제품명', width : 100, align : 'center'},	        	
	        	{ name : 'imp_prdt_stat', label : '수입제품여부', width : 100, align : 'center'},
	        	{ name : 'brand', label : '브랜드', width : 100, align : 'center'},	        	
	        	{ name : 'item', label : '품목', width : 100, align : 'center'},
	        	{ name : 'std', label : '규격', width : 100, align : 'center'},	        	
	        	{ name : 'pack', label : '포장', width : 100, align : 'center'},
	        	{ name : 'ddc', label : '지정유통처', width : 100, align : 'center'},	        	
	        	{ name : 'sale_type', label : '판매형태', width : 100, align : 'center'},
	        	{ name : 'dpsl_cnt', label : '폐기수량', width : 100, align : 'center'},
	        	{ name : 'ocrc', hidden : true },
	        	{ name : 'bad_item', label : '불량항목', width : 100, align : 'center'},
	        	{ name : 'bad_kwrd', label : '불량키워드', width : 100, align : 'center'},
	        	{ name : 'bad_ctnt', hidden : true },
	        	{ name : 'seq', hidden : true }	        	
	        ]
	    });

	};
	
	var _createAction = function(){
		$('#_idf_seq').val('');
		$('#_idf_date').val(ANKUS_API.util.getDiffDate(0));		
		$('#_idf_prdt_cd').val('');
		$('#_idf_prdt_nm').val('');
		$('#_idf_imp_prdt_stat').val('');
		$('#_idf_brand').val('');
		$('#_idf_item').val('');
		$('#_idf_std').val('');
		$('#_idf_pack').val('');
		$('#_idf_ddc').val('');
		$('#_idf_sale_type').val('');
		$('#_idf_dpsl_cnt').val(0);
		$('#_idf_ocrc').val('');
		$('#_idf_bad_item').val('');
		$('#_idf_bad_kwrd').val('');
		$('#_idf_bad_ctnt').val('');
		
		$('#_idf_btnSave').text('등록');
		$('#_idf_createModal .modal-title').text('내부데이터 불량원인 등록');
		
		$('#_idf_createModal').ankusModal('show');
	};
	var _editAction = function(row){		
		$('#_idf_seq').val(row.seq);
		$('#_idf_date').val(row.date);		
		$('#_idf_prdt_cd').val(row.prdt_cd);
		$('#_idf_prdt_nm').val(row.prdt_nm);
		$('#_idf_imp_prdt_stat').val(row.imp_prdt_stat);
		$('#_idf_brand').val(row.brand);
		$('#_idf_item').val(row.item);
		$('#_idf_std').val(row.std);
		$('#_idf_pack').val(row.pack);
		$('#_idf_ddc').val(row.ddc);
		$('#_idf_sale_type').val(row.sale_type);
		$('#_idf_dpsl_cnt').val(row.dpsl_cnt);
		$('#_idf_ocrc').val(row.ocrc);
		$('#_idf_bad_item').val(row.bad_item);
		$('#_idf_bad_kwrd').val(row.bad_kwrd);
		$('#_idf_bad_ctnt').val(row.bad_ctnt);
		
		$('#_idf_btnSave').text('수정');
		$('#_idf_createModal .modal-title').text('내부데이터 불량원인 수정');
		
		$('#_idf_createModal').ankusModal('show');
	};
	var _saveAction = function(){
		var url;
		var text;
		
		if ('수정' == $('#_idf_btnSave').text()) {
			url = '/innerDataFault/update';
			text = '수정';
		} else {
			url = '/innerDataFault/insert';
			text = '추가';
		}
		
		var data = _getFormParam();
		
		//console.log(data);
		ANKUS_API.util.confirm({
			description	: '내부데이터 불량원인을 '+text+' 하시겠습니까?',
			callback : function(sel){
				if(sel){
					
					ANKUS_API.ajax({
						url			: url,
						type		: 'POST',
						data		: JSON.stringify(data),
						success		: function(res){
							if(res.success){
								ANKUS_API.util.alert('내부데이터 불량원인을  정상적으로 '+text+'하였습니다.');
								_getGrid();
							}
							else{
								ANKUS_API.util.alert(res.error.message);
							}
						}
					});
					$('#_idf_createModal').ankusModal('hide');
				}
			}
		});
	};
	
	var _cancelAction = function(){
		$('#_idf_createModal').ankusModal('hide');
	};

	var _btnDeleteAction = function(){
		var selArr = $('#_idf_grid').getGridParam('selarrrow');
		var length = selArr.length;
		
		var rows = [];
		$.each(selArr, function(i, v) {
			rows.push($('#_idf_grid').getRowData(v).seq);
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
						url			: '/innerDataFault/deleteItems',
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
		param.seq = $('#_idf_seq').val();
		param.date = $('#_idf_date').val();
		param.prdt_cd = $('#_idf_prdt_cd').val();
		param.prdt_nm = $('#_idf_prdt_nm').val();
		param.imp_prdt_stat = $('#_idf_imp_prdt_stat').val();
		param.brand = $('#_idf_brand').val();
		param.item = $('#_idf_item').val();
		param.std = $('#_idf_std').val();
		param.pack = $('#_idf_pack').val();
		param.ddc = $('#_idf_ddc').val();
		param.sale_type = $('#_idf_sale_type').val();
		param.dpsl_cnt = $('#_idf_dpsl_cnt').val();
		param.ocrc = $('#_idf_ocrc').val();
		param.bad_item = $('#_idf_bad_item').val();
		param.bad_kwrd = $('#_idf_bad_kwrd').val();
		param.bad_ctnt = $('#_idf_bad_ctnt').val();
		
		param.paging = true;
		
		return param;
	};
	
	var _FindFile = function(){
		event.preventDefault();
		$("#_idf_file").click();
	}

	var _excelSaveAction = function(fevent){
		
		var file = document.getElementById("_idf_file").files[0];
		
		if(typeof file == 'undefined') {
			event.preventDefault();
			ANKUS_API.util.alert("데이터 파일을 선택하세요.");
			return;
		}
		
		var ext = file.name.substring(file.name.lastIndexOf(".")+1, file.name.length);
		ext = ext.toLowerCase();
		
		if(ext != 'csv' ) {
			event.preventDefault();
			ANKUS_API.util.alert("CSV 파일만 등록 가능합니다."); 
			return;
		}
		$("#_idf_form").on("submit", function(fevent) {
			fevent.preventDefault();
			var fdata = new FormData($(this)[0]);
			ANKUS_API.util.confirm({
				description	: file.name + '를 업로드 하시겠습니까?',
				callback : function(sel){
					if(sel){
						$.ajax({
							url			: '/innerDataFault/excelImport',
							type		: 'POST',
							data		: fdata,
							dataType 	: 'json',
							contentType : false,
							processData : false,
							beforeSend : function(){
								$('#_ajaxLoading').show();
					        },
					        complete		: function(msg){
								$('#_ajaxLoading').hide();
							},					        
							success		: function(res){
								console.log(res);
								if(res.success){
									ANKUS_API.util.alert('내부데이터 불량원인을 '+ res.total +'건 업로드 하였습니다.');
									//$('#_idf_btnSearch').click();
								}else{
									ANKUS_API.util.alert(res.error.message);
								}
							}
						});
						$('#_idf_excelModal').ankusModal('hide');
					}
				}
			});
		});
	};
	
	
	$("#_idf_btnCancel").on("click", function() {
		$("#_id_createModal").ankusModal('hide');
	});
	
	$('#_idf_btnSearch').on('click', function() {
		_getGrid(true);
	});
	
	$('#_idf_searchItem').keypress(function(e){
		if(13 === e.which){
			$('#_idf_btnSearch').trigger('click');
		}
	});	

	$('#_idf_btnCreate').on('click', _createAction);
	$('#_idf_btnSave').on('click', _saveAction);
	$('#_idf_btnCancel').on('click', _cancelAction);
	$("#_idf_btnExcelSave").on("click", _excelSaveAction);	
	$("#_idf_btnFindFile").on("click", _FindFile);
	
	$("#_idf_btnExcel").on("click", function() {
		$('#_idf_fileView').val('');
		$('#_idf_file').val('');
		$('#_idf_excelModal').ankusModal('show');
	});	
	
	$("#_idf_btnExcelCancel").on("click", function() {
		$('#_idf_form').replaceWith($('#_idf_form').clone(true));
		$("#_idf_excelModal").ankusModal('hide');
	});
	
	$("#_idf_file").on("change", function() {
		var file = document.getElementById("_idf_file").files[0];	
		$("#_idf_fileView").val(file.name);	
	});
	
	$('#_idf_btnDelete').on('click', _btnDeleteAction);
	$('#_idf_searchFrom').val(ANKUS_API.util.getDiffDate(0));
	$('#_idf_searchTo').val(ANKUS_API.util.getDiffDate(0));
	
	function ymdfmt(d)
	{
		var mm = "00"+(d.getMonth()+1);
		var dd = "00"+d.getDate();

		return (1900+d.getYear())+"-"+mm.substring(mm.length-2)+"-"+dd.substring(dd.length-2);
	}
	
	
	(function init(){
		_setGrid();
		
		var d = new Date();
		d.setTime(new Date().getTime() - (1 * 24 * 60 * 60 * 1000)); //1일전 
		
		$('#_idf_searchTo').ankusDate();
		$('#_idf_searchFrom').val(ymdfmt(d));
		$('#_idf_searchFrom').ankusDate();
		$('#_idf_date').ankusDate();
		
	})();		
})();