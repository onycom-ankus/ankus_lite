(function relatedKeyword(){
	var _firstLoad = false;	
	var _getGrid = function(page){
		var postData = $('#_rw_grid').jqGrid('getGridParam', 'postData');		
		var data = {};	
		data.prdt_strt_dt	= $('#_rw_prdt_strt_dt').val();		
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
			url			: '/relatedKeyword/list',
			data		: data,
			success		: function(res){
				console.log(res);
				var obj = res.map;
				obj.rows = res.list;
				
				for(var i=0 ; i < obj.rows.length ; i++){
					var ratio;
					if(obj.rows[i].confidence > 0){
						ratio = (obj.rows[i].confidence) * 100;
						obj.rows[i].confidence = ratio.toFixed(2);
					}
				}
				
				$('#_rw_grid').jqGrid('resetSelection');
				$('#_rw_grid').jqGrid('clearGridData');
				$('#_rw_grid')[0].addJSONData(obj);
				
			}
		});
	};
	
	// 그리드 설정
	var _setGrid = function(){	
		
		$('#_rw_grid').ankusGrid({
			datatype		: function(postData) {		
				if (_firstLoad) {
					_getGrid();
				} else {
					_firstLoad = true;
				}
			},
			jsonReader		: {
				repeatitems	: false,
				id			: 'prdt_strt_dt'
			},
			sortname		: 'prdt_strt_dt',
			sortorder		: 'asc',
	        multiselect		: false,
	        idPrefix		: '_rwGrid_',
	        ondblClickRow	: function(id){
	        //	_editAction($('#_rw_grid').getRowData(id), true);
	        },
	        refreshfunc		: function(){
	        },
	        rownumbers		: true,
	        pager			: '_rw_pager',
	        rowNum			: 5,
	        colModel		: [	        	    	
	        	{ name : 'prdt_strt_dt', hidden:true},
	        	{ name : 'left_rule', label : '연관규칙 조건', width : 600, align : 'center'},
	        	{ name : 'right_rule', label : '연관규칙 결론',  width : 300, align : 'center'},	        	
	        	{ name : 'support', label : '전체 분석 데이터 중<br>관련 데이터의 빈도', width : 150, align : 'center'},
	        	{ name : 'confidence', label : '연관규칙<br>정확도(%)', width : 200, align : 'center'}	        
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
			url			: '/relatedKeyword/yearList',
			data		: {},
			type		: 'GET',
			success		: function(res){
				$('#_rw_years').empty();
				$('<option>').val('').text('년도 선택').appendTo($('#_rw_years'));
				$.each(res.list, function(i, v) {
					$('<option>').val(v.str_year).text(v.str_year).appendTo($('#_rw_years'));
				});
			},
			error : function(xhr, status, error) {
	//	        	alert("에러발생");
	        }
		});
	}	
	
	var _getTermsList = function(e){
		var item = $('#_rw_years').val();
		//console.log(item);
		ANKUS_API.ajax({
			url			: '/relatedKeyword/termList',
			data		: {
				item:item
			},
			type		: 'GET',
			success		: function(res){
				console.log(res);
				$('#_rw_terms').empty();
				$('<option>').val('').text('기간 선택').appendTo($('#_rw_terms'));
				$.each(res.list, function(i, v) {
					$('<option>').val(v.prdt_strt_dt).text(v.str_term).appendTo($('#_rw_terms'));
				});
			},
			error : function(xhr, status, error) {
	//	        	alert("에러발생");
	        }
		});
	}
	
	var _setTerms = function(e){
		var strt = $('#_rw_terms').val();
		$('#_rw_prdt_strt_dt').val(strt);	
	}
	
	/*
	var _editAction = function(row, isAdd){
		
		$('#_rw_Modal input, #_rw_Modal textarea').prop('disabled', true).val('');
		$('#_rw_doc_sj').val(row.org_doc_sj);
		$('#_rw_kwrd').val(row.kwrd);
		$('#_rw_kwrd_sj').val(row.kwrd_sj);
		$('#_rw_blog_wrter').val(row.blog_wrter);
		$('#_rw_doc_cret_dt').val(row.doc_cret_dt);
		$('#_rw_doc_cn').val(row.org_doc_cn);
		$('#_rw_http_addr').val(row.http_addr);		
		
		$('#_rw_Modal').ankusModal('show');
	};	
	
	var _cancelAction = function(){
		$('#_rw_Modal').ankusModal('hide');
	};
	*/
	$('#_rw_years').on('change', _getTermsList);
	$('#_rw_terms').on('change', _setTerms);
	
	$('#_rw_btnSearch').on('click', function() {
		_getGrid(true);
	});	

	//$('#_rw_btnCancel').on('click', _cancelAction);
		
	(function init(){
		_setGrid();
		_getYearList();		
	})();		
})();