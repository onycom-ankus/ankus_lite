<%@ page contentType="text/html; charset=UTF-8" language="java" trimDirectiveWhitespaces="true" pageEncoding="UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<style type="text/css">
	._dialog_width_1000 {
		width: 800px;
	}
	
	#_pd_datailGridCnt {
	    float: right;
	    color: red;
	}

</style>
<div class="ui-layout-center">
	<div class="form-inline" style="margin-bottom:10px;">
		<div class="forms">		
			<button class="btn btn-default" id="_pd_btnAdd">등록</button>						
		</div>
	</div>
	<div class="form-inline" style="margin-bottom:10px;">
		<div class="forms">
			<label class="form_label">데이터 명 : </label>
			<input type="text" id="_pd_findname" class="form-control" />
			<label class="form_label" style="padding-left:20px;">등록일 : </label>
			<input class="form-control" id="_pd_startDatePicker" style="width: 100px;" readonly="readonly" />

			<button class="btn btn-default" id="_pd_btnSearch">조회</button>
			<button class="btn btn-default" id="_pd_btnReset">초기화</button>
		</div>
	</div>
	<table id="_pd_grid"></table>
	<div id="_pd_pager"></div>
</div>

<div id="_pd_createModal" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">공공 데이터 등록</h4>
			</div>
			<div class="modal-body">
			<div class="form-horizontal">
				<input type="hidden" id="_pd_id"/>
				<div class="form-group">
					<label class="col-sm-2 control-label" style="font-size: 0.9em;">데이터 명</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="_pd_name"/>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label" style="font-size: 0.9em;">URL</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="_pd_url"/>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label" style="font-size: 0.9em;">인증키</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="_pd_certKey"/>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label" style="font-size: 0.9em;">요청 변수</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="_pd_requestValue"/>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label" style="font-size: 0.9em;">갱신 주기</label>
					<div class="col-sm-3">
						<select id="_pd_reload_cycle" class="form-control">
							<option value="nr">No Renewal</option>
							<option value="d">Day</option>
							<option value="w">Week</option>
							<option value="m">Month</option>
						</select>
					</div>
				</div>
			</div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" id="_pd_btnSave">저장</button>
				<button class="btn btn-default" id="_pd_btnCancel1">취소</button>
			</div>
		</div>
	</div>
</div>

<div id="_pd_detailModal" class="modal fade" role="dialog">
	<div class="modal-dialog _dialog_width_1000">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">공공 데이터 확인</h4>
			</div>
			<div class="modal-body">
				<div class="form-inline">
					<label class="form_label" id="_pd_datailGridTitle"></label>
					<label class="form_label" id="_pd_datailGridCnt"></label>
				</div>
				<table id="_pd_datailGrid"></table>
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" id="_pd_btnExcelExport" data-data_id="" data-pid="">엑셀다운로드</button>
				<button class="btn btn-default" id="_pd_btnRemove" data-data_id="" data-pid="">삭제</button>
				<button class="btn btn-default" id="_pd_btnCancel2">취소</button>
			</div>
		</div>
	</div>
</div>
