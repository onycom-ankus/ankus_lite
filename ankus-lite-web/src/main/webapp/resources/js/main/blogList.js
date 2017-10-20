(function blogList(){
	var _firstLoad1 = true;
	var _getGrid = function(page){
		var postData = $('#_bl_grid').jqGrid('getGridParam', 'postData');
		var data = {};
		data.from	= $('#_bl_searchFrom').val();
		data.to		= $('#_bl_searchTo').val();	
		
		var type = $('#_bl_searchType').val();
		
		if(type == '제목'){
			data.doc_sj = $('#_bl_searchItem').val();	
		}else{
			data.srch_kwrd = $('#_bl_searchItem').val();
		}	
		
		data.paging	= true;
		if (postData) {
			data.page		= page ? 1 : postData.page;
			data.rows		= postData.rows;
			data.sidx		= postData.sidx;
			data.sord		= postData.sord;
		}
		console.log(data);
		ANKUS_API.ajax({
			url			: '/blogList/list',
			data		: data,
			success		: function(res){
				console.log(res);
				var obj = res.map;
				obj.rows = res.list;
				
				if(obj.records > 0){
					for(i = 0; i < obj.records; i++){
						if(i < obj.rows.length){
							obj.rows[i].org_doc_sj = obj.rows[i].doc_sj;
							obj.rows[i].org_doc_cn = obj.rows[i].doc_cn;
						}
					}
				}
								
				$('#_bl_grid').jqGrid('resetSelection');
				$('#_bl_grid').jqGrid('clearGridData');
				$('#_bl_grid')[0].addJSONData(obj);
				
			}
		});
	};
	
	// 그리드 설정
	var _setGrid = function(){	
		
		$('#_bl_grid').ankusGrid({
			datatype		: function(postData) {
				if (_firstLoad1) {
					_getGrid();
				} else {
					_firstLoad1 = true;
				}
			
			},
			jsonReader		: {
				repeatitems	: false,
				id			: 'sn'
			},
			sortname		: 'DOC_CRET_DT, SRCH_KWRD',
			sortorder		: 'desc',
	        multiselect		: false,
	        idPrefix		: '_grid_',
	        multiboxonly	: true,
	        onSelectRow	: function(id){
	        },
	        ondblClickRow	: function(id){
	        	_editAction($('#_bl_grid').getRowData(id), true);
	        },
	        refreshfunc		: function(){
	        },
	        pager			: '_bl_pager',
	        rowNum			: 20,
	        colModel		: [
	        	{ name : 'sn', hidden : true },	        	
	        	{ name : 'doc_cret_dt', label : '일자', width : 100, align : 'center'},
	        	{ name : 'srch_kwrd', label : '검색단어', width : 300, align : 'center'},
	        	{ name : 'doc_sj', label : '제목',  width : 430, formatter:changeLength},	        	
	        	{ name : 'doc_cn', label : '내용', width : 450, formatter:changeLength},
	        	{ name : 'org_doc_sj', hidden : true },
	        	{ name : 'org_doc_cn', hidden : true },
	        	{ name : 'kwrd', hidden : true },
	        	{ name : 'kwrd_sj', hidden : true },
	        	{ name : 'blog_wrter', hidden : true },
	        	{ name : 'http_addr', hidden : true }
	        ]
	    });
		
		function changeLength(cellvalue, options, rowObject){
			
			var lang = cellvalue.length;			
			cellvalue = cellvalue.replace(/\r/g, '').replace(/\n/g, '');	
			if(lang > 30){
				cellvalue = cellvalue.substring(0, 40) + "..."
			}
			
			return cellvalue;
		}
		
	};
	
	var _editAction = function(row, isAdd){
		
		$('#_bl_Modal input, #_bl_Modal textarea').prop('disabled', true).val('');
		$('#_bl_doc_sj').val(row.org_doc_sj);
		$('#_bl_kwrd').val(row.kwrd);
		$('#_bl_kwrd_sj').val(row.kwrd_sj);
		$('#_bl_blog_wrter').val(row.blog_wrter);
		$('#_bl_doc_cret_dt').val(row.doc_cret_dt);
		$('#_bl_doc_cn').val(row.org_doc_cn);
		$('#_bl_http_addr').val(row.http_addr);		
		
		$('#_bl_Modal').ankusModal('show');
	};	
	
	var _cancelAction = function(){
		$('#_bl_Modal').ankusModal('hide');
	};
	
	$('#_bl_btnSearch').on('click', function() {
		_getGrid(true);
	});	

	$('#_bl_btnCancel').on('click', _cancelAction);
	$('#_bl_searchFrom').val(ANKUS_API.util.getDiffDate(0));
	$('#_bl_searchTo').val(ANKUS_API.util.getDiffDate(0));
	
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
		
		$('#_bl_searchTo').ankusDate();
		$('#_bl_searchFrom').val(ymdfmt(d));
		$('#_bl_searchFrom').ankusDate();
	})();		
})();