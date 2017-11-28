(function innerDataDemand(){
	var _firstLoad = true;
	var _getGrid = function(page){
		var postData = $('#_idd_grid').jqGrid('getGridParam', 'postData');
		var data = {};
		data.from	= $('#_idd_searchFrom').val();
		data.to		= $('#_idd_searchTo').val();		
		var type	= $('#_idd_searchType').val();
		
		if(type == '제품명'){
			data.prdt_nm = $('#_idd_searchItem').val(); 
		}else{
			data.prdt_cd = $('#_idd_searchItem').val();
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
			url			: '/innerDataDemand/list',
			data		: data,
			success		: function(res){
				//console.log(res);
				var obj = res.map;
				obj.rows = res.list;
				
//				if(obj.records > 0){
//					for(i = 0; i < obj.records; i++){
//						if(i < obj.rows.length){
//							obj.rows[i].org_prdt_nm = obj.rows[i].prdt_nm;
//							obj.rows[i].org_item = obj.rows[i].item;
//						}
//					}
//				}
				
				$('#_idd_grid').jqGrid('resetSelection');
				$('#_idd_grid').jqGrid('clearGridData');
				$('#_idd_grid')[0].addJSONData(obj);
			}
		});
	};
	// 그리드 설정
	var _setGrid = function(){
		$('#_idd_grid').ankusGrid({
			datatype		: function(postData) {
				if (_firstLoad) {
					_getGrid();
				} else {
					_firstLoad = true;
				}
			},
			jsonReader		: {
				repeatitems	: false,
				id			: '[date]'
			},
			sortname		: '[date]',
			sortorder		: 'asc',
	        multiselect		: true,
	        idPrefix		: '_nsGrid_',
	        ondblClickRow	: function(id){
	        	_editAction($('#_idd_grid').getRowData(id));
	        },
	        refreshfunc		: function(){
	        },
	        pager			: '_idd_pager',
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
	        	{ name : 'sale_cnt', label : '판매수량', width : 100, align : 'center'},	        	
	        	{ name : 'supply_cnt', label : '공급수량', width : 100, align : 'center'},	
	        	{ name : 'sale_on_mkt_cnt', hidden : true },
	        	{ name : 'sale_on_home_cnt', hidden : true },
	        	{ name : 'sale_on_bmkt_cnt', hidden : true },
	        	{ name : 'sale_on_dpt_cnt', hidden : true },
	        	{ name : 'sale_on_mall_cnt', hidden : true },
	        	{ name : 'sale_on_etc_cnt', hidden : true },
	        	{ name : 'sale_off_mkt_cnt', hidden : true },
	        	{ name : 'sale_off_24mkt_cnt', hidden : true },
	        	{ name : 'sale_off_rmkt_cnt', hidden : true },
	        	{ name : 'sale_off_md_cnt', hidden : true },
	        	{ name : 'sale_off_bmkt_cnt', hidden : true },
	        	{ name : 'sale_off_rt_cnt', hidden : true },
	        	{ name : 'sale_off_dpt_cnt', hidden : true },
	        	{ name : 'sale_off_etc_cnt', hidden : true },
	        	{ name : 'sale_etc_emp_cnt', hidden : true },
	        	{ name : 'sale_etc_agcy_cnt', hidden : true },
	        	{ name : 'sale_etc_deal_cnt', hidden : true },
	        	{ name : 'sale_etc_imp_cnt', hidden : true }
	        ]
	    });
		
//		function changeLength(cellvalue, options, rowObject){
//			var lang;
//			console.log(cellvalue);
//			if(cellvalue.length > 0){
//				lang = cellvalue.length;			
//				cellvalue = cellvalue.replace(/\r/g, '').replace(/\n/g, '');	
//				if(lang > 30){
//					cellvalue = cellvalue.substring(0, 15) + "..."
//				}
//			}
//			
//			return cellvalue;
//		}
	};
	
	var _createAction = function(){
		$('#_idd_date').val(ANKUS_API.util.getDiffDate(0));
		$('#_idd_date').prop('disabled', false);
		$('#_idd_prdt_cd').prop('disabled', false);
		$('#_idd_prdt_cd').val('');
		$('#_idd_prdt_nm').val('');
		$('#_idd_imp_prdt_stat').val('');
		$('#_idd_brand').val('');
		$('#_idd_item').val('');
		$('#_idd_std').val('');
		$('#_idd_pack').val('');
		$('#_idd_ddc').val('');
		$('#_idd_sale_type').val('');
		$('#_idd_sale_cnt').val(0);
		$('#_idd_supply_cnt').val(0);
		$('#_idd_sale_on_mkt_cnt').val(0);
		$('#_idd_sale_on_home_cnt').val(0);
		$('#_idd_sale_on_bmkt_cnt').val(0);
		$('#_idd_sale_on_dpt_cnt').val(0);		
		$('#_idd_sale_on_mall_cnt').val(0);
		$('#_idd_sale_on_etc_cnt').val(0);
		$('#_idd_sale_off_mkt_cnt').val(0);
		$('#_idd_sale_off_24mkt_cnt').val(0);
		$('#_idd_sale_off_rmkt_cnt').val(0);
		$('#_idd_sale_off_md_cnt').val(0);
		$('#_idd_sale_off_bmkt_cnt').val(0);
		$('#_idd_sale_off_rt_cnt').val(0);
		$('#_idd_sale_off_dpt_cnt').val(0);
		$('#_idd_sale_off_etc_cnt').val(0);
		$('#_idd_sale_etc_emp_cnt').val(0);
		$('#_idd_sale_etc_agcy_cnt').val(0);
		$('#_idd_sale_etc_deal_cnt').val(0);
		$('#_idd_sale_etc_imp_cnt').val(0);
		
		$('#_idd_btnSave').text('등록');
		$('#_idd_createModal .modal-title').text('내부데이터 수요예측 등록');
		
		$('#_idd_createModal').ankusModal('show');
	};
	var _editAction = function(row){
		
		$('#_idd_date').prop('disabled', true);
		$('#_idd_prdt_cd').prop('disabled', true);
		$('#_idd_date').val(row.date);		
		$('#_idd_prdt_cd').val(row.prdt_cd);
		$('#_idd_prdt_nm').val(row.prdt_nm);
		$('#_idd_imp_prdt_stat').val(row.imp_prdt_stat);
		$('#_idd_brand').val(row.brand);
		$('#_idd_item').val(row.item);
		$('#_idd_std').val(row.std);
		$('#_idd_pack').val(row.pack);
		$('#_idd_ddc').val(row.ddc);
		$('#_idd_sale_type').val(row.sale_type);
		$('#_idd_sale_cnt').val(row.sale_cnt);
		$('#_idd_supply_cnt').val(row.supply_cnt);
		$('#_idd_sale_on_mkt_cnt').val(row.sale_on_mkt_cnt);
		$('#_idd_sale_on_home_cnt').val(row.sale_on_home_cnt);
		$('#_idd_sale_on_bmkt_cnt').val(row.sale_on_bmkt_cnt);
		$('#_idd_sale_on_dpt_cnt').val(row.sale_on_dpt_cnt);
		$('#_idd_sale_on_mall_cnt').val(row.sale_on_mall_cnt);
		$('#_idd_sale_on_etc_cnt').val(row.sale_on_etc_cnt);		
		$('#_idd_sale_off_mkt_cnt').val(row.sale_off_mkt_cnt);
		$('#_idd_sale_off_24mkt_cnt').val(row.sale_off_24mkt_cnt);
		$('#_idd_sale_off_rmkt_cnt').val(row.sale_off_rmkt_cnt);
		$('#_idd_sale_off_md_cnt').val(row.sale_off_md_cnt);
		$('#_idd_sale_off_bmkt_cnt').val(row.sale_off_bmkt_cnt);
		$('#_idd_sale_off_rt_cnt').val(row.sale_off_rt_cnt);
		$('#_idd_sale_off_dpt_cnt').val(row.sale_off_dpt_cnt);
		$('#_idd_sale_off_etc_cnt').val(row.sale_off_etc_cnt);
		$('#_idd_sale_etc_emp_cnt').val(row.sale_etc_emp_cnt);
		$('#_idd_sale_etc_agcy_cnt').val(row.sale_etc_agcy_cnt);
		$('#_idd_sale_etc_deal_cnt').val(row.sale_etc_deal_cnt);
		$('#_idd_sale_etc_imp_cnt').val(row.sale_etc_imp_cnt);
		
		$('#_idd_btnSave').text('수정');
		$('#_idd_createModal .modal-title').text('내부데이터 수요예측 수정');
		
		$('#_idd_createModal').ankusModal('show');
	};
	var _saveAction = function(){
		var url;
		var text;
		
		if ('수정' == $('#_idd_btnSave').text()) {
			url = '/innerDataDemand/update';
			text = '수정';
		} else {
			url = '/innerDataDemand/insert';
			text = '추가';
		}
		
		var data = _getFormParam();
		
		if (!data.date){
			ANKUS_API.util.alert('날짜를 입력해 주세요.');
			return;
		}
		
		if (!data.prdt_cd){
			ANKUS_API.util.alert('제품 코드를 입력해 주세요.');
			return;
		}
		//console.log(data);
		ANKUS_API.util.confirm({
			description	: '내부데이터 수요예측을 '+text+' 하시겠습니까?',
			callback : function(sel){
				if(sel){
					
					ANKUS_API.ajax({
						url			: url,
						type		: 'POST',
						data		: JSON.stringify(data),
						success		: function(res){
							if(res.success){
								ANKUS_API.util.alert('내부데이터 수요예측을  정상적으로 '+text+'하였습니다.');
								_getGrid();
							}
							else{
								ANKUS_API.util.alert(res.error.message);
							}
						}
					});
					$('#_idd_createModal').ankusModal('hide');
				}
			}
		});
	};

	var _btnDeleteAction = function(){
		var selArr = $('#_idd_grid').getGridParam('selarrrow');
		var length = selArr.length;
		
		var rows = [];
		$.each(selArr, function(i, v) {
			rows.push($('#_idd_grid').getRowData(v).date+'!'+$('#_idd_grid').getRowData(v).prdt_cd);
		});
		//console.log(rows);
		
		if(0 === length){
			ANKUS_API.util.alert('삭제할 항목을 선택하십시오.');
			return;
		}
		ANKUS_API.util.confirm({
			description	: length + '개의 항목을 삭제하시겠습니까?',
			callback : function(sel){
				if(sel){
					ANKUS_API.ajax({
						url			: '/innerDataDemand/deleteItems',
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
		param.date = $('#_idd_date').val();
		param.prdt_cd = $('#_idd_prdt_cd').val();
		param.prdt_nm = $('#_idd_prdt_nm').val();
		param.imp_prdt_stat = $('#_idd_imp_prdt_stat').val();
		param.brand = $('#_idd_brand').val();
		param.item = $('#_idd_item').val();
		param.std = $('#_idd_std').val();
		param.pack = $('#_idd_pack').val();
		param.ddc = $('#_idd_ddc').val();
		param.sale_type = $('#_idd_sale_type').val();
		param.sale_cnt = $('#_idd_sale_cnt').val();
		param.supply_cnt = $('#_idd_supply_cnt').val();
		param.sale_on_mkt_cnt = $('#_idd_sale_on_mkt_cnt').val();
		param.sale_on_home_cnt = $('#_idd_sale_on_home_cnt').val();
		param.sale_on_bmkt_cnt = $('#_idd_sale_on_bmkt_cnt').val();
		param.sale_on_dpt_cnt = $('#_idd_sale_on_dpt_cnt').val();
		param.sale_on_mall_cnt = $('#_idd_sale_on_mall_cnt').val();
		param.sale_on_etc_cnt = $('#_idd_sale_on_etc_cnt').val();
		param.sale_off_mkt_cnt = $('#_idd_sale_off_mkt_cnt').val();
		param.sale_off_24mkt_cnt = $('#_idd_sale_off_24mkt_cnt').val();
		param.sale_off_rmkt_cnt = $('#_idd_sale_off_rmkt_cnt').val();
		param.sale_off_md_cnt = $('#_idd_sale_off_md_cnt').val();
		param.sale_off_bmkt_cnt = $('#_idd_sale_off_bmkt_cnt').val();
		param.sale_off_rt_cnt = $('#_idd_sale_off_rt_cnt').val();
		param.sale_off_dpt_cnt = $('#_idd_sale_off_dpt_cnt').val();
		param.sale_off_etc_cnt = $('#_idd_sale_off_etc_cnt').val();
		param.sale_etc_emp_cnt = $('#_idd_sale_etc_emp_cnt').val();
		param.sale_etc_agcy_cnt = $('#_idd_sale_etc_agcy_cnt').val();
		param.sale_etc_deal_cnt = $('#_idd_sale_etc_deal_cnt').val();
		param.sale_etc_imp_cnt = $('#_idd_sale_etc_imp_cnt').val();
		
		param.paging = true;
		
		return param;
	};
	
	var _FindFile = function(){
		event.preventDefault();
		$("#_idd_file").click();
	}
	
var _excelSaveAction = function(fevent){
		
		var file = document.getElementById("_idd_file").files[0];
		
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
		$("#_idd_form").on("submit", function(fevent) {
			fevent.preventDefault();
			var fdata = new FormData($(this)[0]);
			ANKUS_API.util.confirm({
				description	: file.name + '를 업로드 하시겠습니까?',
				callback : function(sel){
					if(sel){
						$.ajax({
							url			: '/innerDataDemand/excelImport',
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
									ANKUS_API.util.alert('내부데이터 수요예측 업로드 데이터 ' + res.total + '건 [성공] / ' + res.limit + '건 [실패] 하였습니다.');
									$('#_idd_btnSearch').click();
								}else{
									ANKUS_API.util.alert(res.error.message);
								}
							}
						});
						$('#_idd_excelModal').ankusModal('hide');
					}
				}
			});
		});
	};
	
	var _cancelAction = function(){
		$('#_idd_createModal').ankusModal('hide');
	};
	
	$('#_idd_btnSearch').on('click', function() {
		_getGrid(true);
	});
	
	$('#_idd_searchItem').keypress(function(e){
		if(13 === e.which){
			$('#_idd_btnSearch').trigger('click');
		}
	});	

	$('#_idd_btnCreate').on('click', _createAction);
	$('#_idd_btnSave').on('click', _saveAction);
	$('#_idd_btnCancel').on('click', _cancelAction);
	$("#_idd_btnExcelSave").on("click", _excelSaveAction);	
	$("#_idd_btnFindFile").on("click", _FindFile);
	
	$("#_idd_btnExcel").on("click", function() {
		$('#_idd_fileView').val('');
		$('#_idd_file').val('');
		$('#_idd_excelModal').ankusModal('show');
	});
	
	$("#_idd_btnExcelCancel").on("click", function() {
		$('#_idd_form').replaceWith($('#_idd_form').clone(true));
		$("#_idd_excelModal").ankusModal('hide');
	});
	
	$("#_idd_file").on("change", function() {
		var file = document.getElementById("_idd_file").files[0];	
		$("#_idd_fileView").val(file.name);	
	});
	
	$('#_idd_btnDelete').on('click', _btnDeleteAction);
	$('#_idd_searchFrom').val(ANKUS_API.util.getDiffDate(0));
	$('#_idd_searchTo').val(ANKUS_API.util.getDiffDate(0));
	
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
		
		$('#_idd_searchTo').ankusDate();
		$('#_idd_searchFrom').val(ymdfmt(d));
		$('#_idd_searchFrom').ankusDate();
		$('#_idd_date').ankusDate();
		
	})();		
})();