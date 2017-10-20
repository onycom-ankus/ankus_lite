(function newsList(){
	var _firstLoad1 = true;
	
	var _getGrid = function(page){
		var postData = $('#_nl_Grid').jqGrid('getGridParam', 'postData');
		var data = {};
		data.from	= $('#_nl_searchFrom').val();
		data.to		= $('#_nl_searchTo').val();
	
		var type = $('#_nl_searchType').val();
		if(type == '제목'){
			data.title = $('#_nl_searchItem').val();	
		}else if(type == '출처'){
			data.nsite = $('#_nl_searchItem').val();
		}
		
		data.paging	= true;
		if (postData) {
			data.page		= page ? 1 : postData.page;
			data.rows		= postData.rows;
			data.sidx		= postData.sidx;
			data.sord		= postData.sord;
		}
		//console.log(data);
		ANKUS_API.ajax({
			url			: '/newsList/list',
			data		: data,
			success		: function(res){
				//console.log(res);
				var obj = res.map;
				obj.rows = res.list;
				$('#_nl_Grid').jqGrid('resetSelection');
				$('#_nl_Grid').jqGrid('clearGridData');
				$('#_nl_Grid')[0].addJSONData(obj);
			}
		});
	};
	
	// 그리드 설정
	var _setGrid = function(){
		$('#_nl_Grid').ankusGrid({
			datatype		: function(postData) {
				if (_firstLoad1) {
					_getGrid();
				} else {
					_firstLoad1 = true;
				}
			},
			jsonReader		: {
				repeatitems	: false,
				id			: 'nid'
			},
			sortname		: 'NID',
			sortorder		: 'desc',
	        multiselect		: false,
	        idPnsiteix		: '_Grid_',
	        multiboxonly	: true,
	        onSelectRow	: function(id){
	        },
	        ondblClickRow	: function(id){
	        	_editAction($('#_nl_Grid').getRowData(id), true);
	        },	       
	        pager			: '_nl_Pager',
	        rowNum			: 20,
	        colModel		: [
	        	{ name : 'nid', hidden : true },
	        	{ name : 'rdate', label : '보고일자', width : 80, align : 'center'},	        	
	        	{ name : 'title', label : '제목', width : 280 },
	        	{ name : 'content', label : '내용', width : 250 },	        	
	        	{ name : 'nsite', index : '[nsite]', label : '출처', align : 'center', width : 260 },	        	
	        	{ name : 'url', label : 'URL', width : 200 }
	        ]
	    });		
	};
	
	var _editAction = function(row, isAdd){
		$('#_nl_detailModal input, #_nl_detailModal textarea').prop('disabled', true).val('');
		$('#_nl_nid').val(row.nid);
		$('#_nl_rdate').val(row.rdate);
		$('#_nl_title').val(row.title);
		$('#_nl_content').val(row.content);
		$('#_nl_nsite').val(row.nsite);
		$('#_nl_url').val(row.url);
		
		$('#_nl_detailModal').ankusModal('show');
	};

	var _cancelAction = function(){
		$('#_nl_detailModal').ankusModal('hide');
	};

	$('#_nl_btnSearch').on('click', function() {
		_getGrid(true);	
	});
	
	$('#_nl_btnCancel').on('click', _cancelAction);
	$('#_nl_searchFrom').val(ANKUS_API.util.getDiffDate(0));
	$('#_nl_searchTo').val(ANKUS_API.util.getDiffDate(0));

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
		
		$('#_nl_searchTo').ankusDate();
		$('#_nl_searchFrom').val(ymdfmt(d));		
		$('#_nl_searchFrom').ankusDate();
		
	})();		
})();