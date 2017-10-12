/**
 * 
 */

$(function() {
	var _firstLoad = false;
	
	$('#_pd_grid').ankusGrid({
		datatype		: function(postData) {
			if (_firstLoad) {
				_getGrid();
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
        ondblClickRow	: function(id){
        	_detailView($('#_pd_grid').getRowData(id), true);
        },
        refreshfunc		: function(){
        },
//        pager			: true,
//        rowNum			: -1,
        pager			: '_pd_pager',
        rowNum			: 10,
        autowidth		:true,
        rownumbers 		:true,
      //  scrollerbar		:true,
      //  height			:'150px',
        colModel		: [
//        	{ name : 'id', hidden : true },
        	{ name : 'pid', label : "INDEX", hidden : true, width : 100, align : 'center'},	        	
        	{ name : 'data_id', label : "저장소 인덱스", width : 150, align : 'center', hidden : true},	        	
        	{ name : 'data_nm', label : "데이터 명", width : 300, align : 'center'},
        	{ name : 'reload_cycle', label : "갱신 주기", width : 80, align : 'center', formatter : reloadCycleFormatter},
        	{ name : 'name', label : "작성자", width : 150, align : 'center'},
        	{ name : 'reg_dttm', label : "등록일", width : 150, align : 'center', formatter : dateFormat},
        ]
    });
	
	/* 공공데이터 그리드 표시 */
	$("#_tabPublicData").on("click", function() {
		_getGrid();
	});
	
	/* 생성일시 datepicker */
	$('#_pd_startDatePicker').ankusDate({
		format:'yyyy-mm-dd'
	});
	
	/* 공공데이터 등록 다이얼로그 표시 */
	$("#_pd_btnAdd").on("click", function() {
		$("#_pd_createModal input").val("");
		$("#_pd_createModal option:eq(0)").prop("selected", "selected");
		
		$("#_pd_createModal").ankusModal('show');
	});
	
	/* 공공데이터 등록 다이얼로그 숨김 */
	$("#_pd_btnCancel1").on("click", function() {
		$("#_pd_createModal").ankusModal('hide');
	});
	
	/* 공공데이터 확인 다이얼로그 숨김 */
	$("#_pd_btnCancel2").on("click", function() {
		$("#_pd_detailModal").ankusModal('hide');
	});
	
	/* 공공데이터 확인 > 삭제 버튼 */
	$("#_pd_btnRemove").on("click", function() {
		
		var data_nm = $("#_pd_datailGridTitle").text();
		var data_id = $("#_pd_btnRemove").attr("data-data_id");
		var pid = $("#_pd_btnRemove").attr("data-data_pid");
		var data = {};
		data.data_nm = data_nm;
		data.data_id = data_id;
		data.pid = pid;
		
		ANKUS_API.util.confirm({
			description	: data_nm + ' (을)를 삭제하시겠습니까?',
			callback : function(sel){
				if(sel){
					ANKUS_API.ajax({
						url : "/publicData/ajax/remove",
						data : data,
						async : false,
						success : function(res) {
							if(res) {
								_getGrid();
								$("#_pd_detailModal").ankusModal('hide');
							} else {
								ANKUS_API.util.alert("삭제를 실패하였습니다. 관리자에게 문의하세요.");
							}
						}
					});
				}
			}
		});
		
	});
	
	/* 공공데이터 등록 */
	$("#_pd_btnSave").on("click", function() {
		var param = {};
		
//		param.data_nm = 'test';
//		param.url = 'http://opendata.busan.go.kr/openapi/service/EnvironmentalNoise/getNoiseInfoBylegal';
//		param.certKey = 'dgo8nbG2jg0iYdbWpb6qee8MrG9Elm8HGaqVp%2B3oSC1H2WIU930M7Zk5odRMwlfVAlKSc1%2BCEE5%2BBZk9nOuf2A%3D%3D';
//		param.requestValue = '';
//		param.reload_cycle = '1d';

		param.data_nm = $("#_pd_name").val();
		param.url = $("#_pd_url").val();
		param.certKey = $("#_pd_certKey").val();
		param.requestValue = $("#_pd_requestValue").val();
		param.reload_cycle = $("#_pd_reload_cycle").val();

		if(param.data_nm === '') {
			ANKUS_API.util.alert('데이터명을 입력하세요.');
			return;
		}
		
		if(param.url === '') {
			ANKUS_API.util.alert('OPEN API URL을 입력하세요.');
			return;
		}
		
		if(param.certKey === '') {
			ANKUS_API.util.alert('인증키를 입력하세요.');
			return;
		}
		
		if(param.reload_cycle === '') {
			ANKUS_API.util.alert('갱신 주기를 선택하세요.');
			return;
		}
		
		ANKUS_API.ajax({
			url : "/publicData/ajax/regist",
			data : param,
			success : function(res) {
				var statusMSG = res.statusMSG;
				
				if(statusMSG != '정상') {
					ANKUS_API.util.alert(res.statusMSG);
					
				} else {
					$("#_pd_createModal").ankusModal('hide');
					_getGrid();
				}
			}
		});
	});
	
	/* 검색조건으로 조회 */
	$("#_pd_btnSearch").on("click", function() {
		_getGrid();
	});
	
	/* 초기화 버튼 */
	$("#_pd_btnReset").on("click", function() {
		$("#_pd_findname").val("");
		$("#_pd_startDatePicker").val("");
	});
	
	/* 엑셀 다운로드 */
	$("#_pd_btnExcelExport").on("click", function() {
		var pid = $("#_pd_btnRemove").attr("data-data_pid");
		var data_id = $("#_pd_btnRemove").attr("data-data_id");
		
		location.href = "/publicData/excelExport?data_id=" + data_id;
	});

});

function _getGrid(page) {
	var postData = $('#_pd_grid').jqGrid('getGridParam', 'postData');
	var data = {};
	
	data.data_nm = $("#_pd_findname").val();
	data.reg_dttm = $("#_pd_startDatePicker").val();
	
	data.paging	= true;
	if (postData) {
		data.page		= page ? 1 : postData.page;
		data.rows		= postData.rows;
		data.sidx		= postData.sidx;
		data.sord		= postData.sord;
	}
	
	
	ANKUS_API.ajax({
		url			: '/publicData/ajax/pdGrid',
		data		: data,
		success		: function(res){
			$('#_pd_grid').jqGrid('resetSelection');
			$('#_pd_grid').jqGrid('clearGridData');
			$('#_pd_grid')[0].addJSONData(res);
		}
	});
}

function _detailView(selrowObj) {
	$('#_pd_datailGrid').jqGrid('GridUnload');
	
	var param = {};
	param.data_id = selrowObj.data_id;
	
	ANKUS_API.ajax({
		url : "/publicData/ajax/detail",
		data : param,
		success : function(res) {
			var colModel = [];
			
			for(var i=0; i<res.title.length; i++) {
				colModel.push({ name : res.title[i], label : res.title[i], align : 'center'});
			}
			
			var _firstLoad = false;
			
			$('#_pd_datailGrid').ankusGrid({
				datatype		: function(postData) {
					if (_firstLoad) {
//						_detailView();
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
		        refreshfunc		: function(){
		        },
		        pager			: false,
		        rowNum			: -1,
		        autowidth		:true,
		        shrinkToFit		:false,
		        scrollerbar		:true,
		        height			:'500px',
		        colModel		: colModel
		    });
			
			$("#_pd_btnRemove").attr("data-data_id", selrowObj.data_id);
			$("#_pd_btnRemove").attr("data-data_pid", selrowObj.pid);
			$("#_pd_btnExcelExport").attr("data-data_id", selrowObj.data_id);
			$("#_pd_btnExcelExport").attr("data-data_pid", selrowObj.pid);
			$("#_pd_datailGridTitle").text("[ " + selrowObj.data_nm + " ]");
			$("#_pd_datailGridCnt").text(res.dataList.length + ' 건');
			
			$('#_pd_datailGrid').jqGrid('setGridWidth', 765);
			$('#_pd_datailGrid').jqGrid('resetSelection');
			$('#_pd_datailGrid').jqGrid('clearGridData');
			$('#_pd_datailGrid')[0].addJSONData(res.dataList);
			
			$("#_pd_detailModal").ankusModal('show');
		}
	});
}

function dateFormat(cellValue, options, rowdata, action) {
	var date = new Date(cellValue);
	var year = date.getFullYear();
	var month = (date.getMonth()+1) < 10 ? "0" + (date.getMonth()+1) : (date.getMonth()+1);
	var date = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	
	return year + "-" + month + "-" + date;
}

function reloadCycleFormatter(cellValue, options, rowdata, action) {
	switch (cellValue) {
	case '1d':
		return 'Day';
		break;
	case '1w':
		return 'Week';
		break;
	case '1m':
		return 'Month';
		break;

	default:
		return '오류';
		break;
	}
}