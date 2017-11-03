(function faultCauseList(){
	var _firstLoad = false;	
	var _getGrid = function(page){
		var postData = $('#_fc_grid').jqGrid('getGridParam', 'postData');		
		var data = {};	
		data.prdt_strt_dt	= $('#_fc_prdt_strt_dt').val();		
		data.paging	= true;
		if (postData) {
			data.page		= page ? 1 : postData.page;
			data.rows		= postData.rows;
			data.sidx		= postData.sidx;
			data.sord		= postData.sord;
		}

		if(data.prdt_strt_dt == ''){
			ANKUS_API.util.alert('기간을 선택하여 주세요.');
			return;
		}
		
		ANKUS_API.ajax({
			url			: '/faultCauseList/list',
			data		: data,
			success		: function(res){
				console.log(res);
				var obj = res.map;
				obj.rows = res.list;
				
				for(var i=0 ; i < obj.rows.length ; i++){
					var ratio;
					if(obj.rows[i].tot_num_data > 0 && obj.rows[i].num_data > 0){
						ratio = (obj.rows[i].num_data / obj.rows[i].tot_num_data) * 100;
						obj.rows[i].ratio = ratio.toFixed(2);
					}else{
						ratio = 0;
						obj.rows[i].ratio = ratio.toFixed(2);
					}
				}
				
				$('#_fc_grid').jqGrid('resetSelection');
				$('#_fc_grid').jqGrid('clearGridData');
				$('#_fc_grid')[0].addJSONData(obj);
				
			}
		});
	};
	
	// 그리드 설정
	var _setGrid = function(){	
		
		$('#_fc_grid').ankusGrid({
			datatype		: function(postData) {		
				if (_firstLoad) {
					_getGrid();
				} else {
					_firstLoad = true;
				}
			},
			jsonReader		: {
				repeatitems	: false,
				id			: 'cause_ptrn'
			},
			sortname		: 'tot_num_data',
			sortorder		: 'desc',
	        multiselect		: false,
	        idPrefix		: '_fcGrid_',
	        ondblClickRow	: function(id){
	        //	_editAction($('#_fc_grid').getRowData(id), true);
	        },
	        refreshfunc		: function(){
	        },
	        rownumbers		: true,
	        pager			: '_fc_pager',
	        rowNum			: 20,
	        colModel		: [	        	    	
	        	{ name : 'prdt_strt_dt', hidden:true},
	        	{ name : 'cause_ptrn', label : '불량발생 조건(원인)', width : 600, align : 'center'},
	        	{ name : 'fault_ty_freq', label : '관련 불량항목(비율%)',  width : 300, align : 'center'},	        	
	        	{ name : 'tot_num_data', label : '관련 분석 데이터 개수', width : 150, align : 'center'},
	        	{ name : 'ratio', label : '전체 분석 데이터 내 비중(%)', width : 200, align : 'center'}	        
	        ]
	    });
		/*
		function changeLength(cellvalue, options, rowObject){
			
			var lang = cellvalue.length;			
			cellvalue = cellvalue.replace(/\r/g, '').replace(/\n/g, '');	
			if(lang > 30){
				cellvalue = cellvalue.substring(0, 40) + "..."
			}
			
			return cellvalue;
		}
		*/
	};
	
	var _getYearList = function(){
		ANKUS_API.ajax({
			url			: '/faultCauseList/yearList',
			data		: {},
			type		: 'GET',
			success		: function(res){
				$('#_fc_years').empty();
				$('<option>').val('').text('년도 선택').appendTo($('#_fc_years'));
				$.each(res.list, function(i, v) {
					$('<option>').val(v.str_year).text(v.str_year).appendTo($('#_fc_years'));
				});
			},
			error : function(xhr, status, error) {
	//	        	alert("에러발생");
	        }
		});
	}	
	
	var _getTermsList = function(e){
		var item = $('#_fc_years').val();
		//console.log(item);
		ANKUS_API.ajax({
			url			: '/faultCauseList/termList',
			data		: {
				item:item
			},
			type		: 'GET',
			success		: function(res){
				console.log(res);
				$('#_fc_terms').empty();
				$('<option>').val('').text('기간 선택').appendTo($('#_fc_terms'));
				$.each(res.list, function(i, v) {
					$('<option>').val(v.prdt_strt_dt).text(v.str_term).appendTo($('#_fc_terms'));
				});
			},
			error : function(xhr, status, error) {
	//	        	alert("에러발생");
	        }
		});
	}
	
	var _setTerms = function(e){
		var strt = $('#_fc_terms').val();
		$('#_fc_prdt_strt_dt').val(strt);	
	}
	
	/*
	var _editAction = function(row, isAdd){
		
		$('#_fc_Modal input, #_fc_Modal textarea').prop('disabled', true).val('');
		$('#_fc_doc_sj').val(row.org_doc_sj);
		$('#_fc_kwrd').val(row.kwrd);
		$('#_fc_kwrd_sj').val(row.kwrd_sj);
		$('#_fc_blog_wrter').val(row.blog_wrter);
		$('#_fc_doc_cret_dt').val(row.doc_cret_dt);
		$('#_fc_doc_cn').val(row.org_doc_cn);
		$('#_fc_http_addr').val(row.http_addr);		
		
		$('#_fc_Modal').ankusModal('show');
	};	
	
	var _cancelAction = function(){
		$('#_fc_Modal').ankusModal('hide');
	};
	*/
	$('#_fc_years').on('change', _getTermsList);
	$('#_fc_terms').on('change', _setTerms);
	
	$('#_fc_btnSearch').on('click', function() {
		_getGrid(true);
	});	

	//$('#_fc_btnCancel').on('click', _cancelAction);
		
	(function init(){
		_setGrid();
		_getYearList();		
	})();		
})();