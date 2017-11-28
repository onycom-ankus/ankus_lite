(function mallList(){
	var _firstLoad1 = true;
	
	var _getGrid = function(page){
		var postData = $('#_ml_grid').jqGrid('getGridParam', 'postData');
		var data = {};
		data.from	= $('#_ml_searchFrom').val();
		data.to		= $('#_ml_searchTo').val();
		var type = $('#_ml_searchType').val();
		
		if(type == 'brand'){
			data.brand = $('#_ml_searchItem').val();	
		}else if(type == 'goods_nm'){
			data.goods_nm = $('#_ml_searchItem').val();	
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
			url			: '/mallList/list',
			data		: data,
			success		: function(res){
				console.log(res);
				var obj = res.map;
				obj.rows = res.list;
				
				if(obj.records > 0){
					for(i = 0; i < obj.records; i++){
						if(i < obj.rows.length){
							obj.rows[i].org_goods_nm = obj.rows[i].goods_nm;
						}
					}
				}
				
				if(obj.records > 0){
					for(i = 0; i < obj.records; i++){
						if(i < obj.rows.length){
							obj.rows[i].org_goods_review = obj.rows[i].goods_review;
						}
					}
				}				
					
				$('#_ml_grid').jqGrid('resetSelection');
				$('#_ml_grid').jqGrid('clearGridData');
				$('#_ml_grid')[0].addJSONData(obj);
				
			}
		});
	};
	
	// 그리드 설정
	var _setGrid = function(){	
		
		$('#_ml_grid').ankusGrid({
			datatype		: function(postData) {
				if (_firstLoad1) {
					_getGrid();
				} else {
					_firstLoad1 = true;
				}
			
			},
			jsonReader		: {
				repeatitems	: false,
				id			: 'goods_no'
			},
			sortname		: 'A.BRAND, A.GOODS_NM',
			sortorder		: 'desc',
	        multiselect		: false,
	        idPrefix		: '_grid_',
	        multiboxonly	: true,
	        onSelectRow	: function(id){
	        },
	        ondblClickRow	: function(id){
	        	_editAction($('#_ml_grid').getRowData(id), true);
	        },
	        refreshfunc		: function(){
	        },
	        pager			: '_ml_pager',
	        rowNum			: 20,
	        colModel		: [
	        	{ name : 'goods_no', hidden : true },	        	
	        	{ name : 'goods_url', hidden : true },	        	        
	        	{ name : 'shopng_knd', label : '구분', width : 100, align : 'center'},
	        	{ name : 'brand', label : '브랜드', width : 100, align : 'center'},
	        	{ name : 'item', label : '아이템', width : 100, align : 'center'},
	        	{ name : 'goods_nm', label : '상품명', width : 200, formatter:changeLength},
	        	{ name : 'goods_review', label : '구매평', width : 300, formatter:changeReviewLength},
	        	{ name : 'recommand', label : '추천', width : 100, align : 'center'},
	        	{ name : 'delivery', label : '배송', width : 100, align : 'center'},
	        	{ name : 'org_goods_nm', hidden : true },
	        	{ name : 'org_goods_review', hidden : true }	        	
	        ]
	    });
				
		function changeLength(cellvalue, options, rowObject){
			
			var lang = cellvalue.length;			
			cellvalue = cellvalue.replace(/\r/g, '').replace(/\n/g, '');	
			if(lang > 17){
				cellvalue = cellvalue.substring(0, 17) + "..."
			}
			
			return cellvalue;
		}
		
		function changeReviewLength(cellvalue, options, rowObject){
			
			var lang = cellvalue.length;			
			cellvalue = cellvalue.replace(/\r/g, '').replace(/\n/g, '');	
			if(lang > 28){
				cellvalue = cellvalue.substring(0, 28) + "..."
			}
			
			return cellvalue;
		}
			
	};
	
	var _editAction = function(row, isAdd){
		
		$('#_ml_Modal input, #_ml_Modal textarea').prop('disabled', true).val('');
		$('#_ml_shopng_knd').val(row.shopng_knd);
		$('#_ml_brand').val(row.brand);
		$('#_ml_item').val(row.item);
		$('#_ml_goods_nm').val(row.org_goods_nm);
		$('#_ml_goods_review').val(row.org_goods_review);
		$('#_ml_goods_url').val(row.goods_url);
		$('#_ml_recommand').val(row.recommand);
		$('#_ml_delivery').val(row.delivery);
		
		$('#_ml_Modal').ankusModal('show');
	};	
	
	var _cancelAction = function(){
		$('#_ml_Modal').ankusModal('hide');
	};
	
	$('#_ml_btnSearch').on('click', function() {
		_getGrid(true);
	});	

	$('#_ml_btnCancel').on('click', _cancelAction);
	$('#_ml_searchFrom').val(ANKUS_API.util.getDiffDate(0));
	$('#_ml_searchTo').val(ANKUS_API.util.getDiffDate(0));
	
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
		
		$('#_ml_searchTo').ankusDate();
		$('#_ml_searchFrom').val(ymdfmt(d));		
		$('#_ml_searchFrom').ankusDate();		
	})();		
})();