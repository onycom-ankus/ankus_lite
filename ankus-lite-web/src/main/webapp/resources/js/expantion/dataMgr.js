$(function() {
	$("#_tabDataMgr").on("click", function() {
		_dataStoreSelect();
	});	
	
//	$("#_dm_data_nm").on("change", function() {
	$("#_dm_btnSearch").on("click", function() {
		var data = {};
		data.data_id = $("#_dm_data_nm").val();
		
		if(data.data_id === '') {
			ANKUS_API.util.alert("데이터 저장소를 선택하세요.");
			return;
		}
		
		ANKUS_API.ajax({
			url : "/dataMgr/ajax/searchTitle",
			data : data,
			success : function(res) {
				var colModel = [];
				for(var i=0; i<res.title.length; i++) {
					colModel.push({ name : res.title[i].title, label : res.title[i].title, align : 'center'});
				}
				_setDmGrid(colModel);
				_getDmGrid();
			}
		});
	});
	
	/* 데이터 삭제 */
	$("#_dm_btnDel").on("click", function() {
		var data_id = $("#_dm_data_nm").val();
		var data_nm = $("#_dm_data_nm option:selected").text();
		
		if(data_id == '') {
			ANKUS_API.util.alert("데이터 저장소를 선택하세요.");
			return;
		}
			
		var param = {};
		param.data_id = data_id;
		
		ANKUS_API.util.confirm({
			description	: data_nm + ' (을)를 삭제하시겠습니까?',
			callback : function(sel){
				if(sel){
					ANKUS_API.ajax({
						url : "/dataMgr/ajax/remove",
						data : param,
						success : function(msg) {
							if(msg === 'success') {
								_dataStoreSelect();
								_getDmGrid();
							} else {
								ANKUS_API.util.alert(msg);
							}
						}
					});
				}
			}
		});
	});
});

function _dataStoreSelect() {
	/*데이터 저장소 셀렉트 박스 설정*/ 
	ANKUS_API.ajax({
		url : "/dataMgr/ajax/getDataNmList",
		success : function(res) {
			var html = "<option value=''>선택하세요.</option>";
			for(var i=0; i<res.length; i++) {
				html += "<option value='"+ res[i].data_id +"'>"+ res[i].data_nm +"</option>"
			}
			
			$("#_dm_data_nm").html(html);
		}
	});
}

function _setDmGrid(colModel) {
	$('#_dm_grid').jqGrid('GridUnload');
	var _firstLoad = false;
	
	$('#_dm_grid').ankusGrid({
		datatype		: function(postData) {
			if (_firstLoad) {
				_getDmGrid();
			} else {
				_firstLoad = true;
			}
		},
		jsonReader		: {
			repeatitems	: false,
			id			: 'id'
		},
		sortname		: 'name',
		sortorder		: 'desc',
        multiselect		: false,
        idPrefix		: '_infoGrid_',
        multiboxonly	: true,
//        ondblClickRow	: function(id){
//        	_detailView($('#_pd_grid').getRowData(id), true);
//        },
        refreshfunc		: function(){
        },
//        pager			: true,
//        rowNum			: -1,
        pager			: '_dm_pager',
        rowNum			: 10,
        autowidth		:true,
        rownumbers 		:true,
        shrinkToFit		:false,
      //  scrollerbar		:true,
      //  height			:'150px',
        colModel		: colModel
    });
}

function _getDmGrid() {
	var postData = $('#_dm_grid').jqGrid('getGridParam', 'postData');
	var data = {};
	data.data_id = $("#_dm_data_nm").val();

	data.paging	= true;
	if (postData) {
		data.page		= postData.page;
		data.rows		= postData.rows;
		data.sidx		= postData.sidx;
		data.sord		= postData.sord;
	}
	
	ANKUS_API.ajax({
		url : "/dataMgr/ajax/searchData",
		data : data,
		success : function(res) {
			console.log(res);
			var obj = res.map;
			obj.rows = res.list;
			$('#_dm_grid').jqGrid('resetSelection');
			$('#_dm_grid').jqGrid('clearGridData');
			$('#_dm_grid')[0].addJSONData(obj);
		}
	});
}