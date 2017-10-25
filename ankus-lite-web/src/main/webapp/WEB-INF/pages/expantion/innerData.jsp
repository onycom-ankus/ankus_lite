<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<style type="text/css">
	._id_modal_width {
		width: 500px;
	}
</style>

<div id="_id_createModal" class="modal fade" role="dialog">
	<div class="modal-dialog _id_modal_width">
		<div class="modal-content">
			<form id="_id_form" enctype="multipart/form-data">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title">내부 데이터 등록</h4>
				</div>
				<div class="modal-body">
					<div class="form-horizontal">
						<input type="hidden" id="_id_id"/>
						<div class="form-group">
							<label class="col-sm-3 control-label" style="font-size: 0.9em;">데이터 저장소명</label>
							<div class="col-sm-7">
								<input type="text" class="form-control" name="_id_data_nm" id="_id_data_nm"/>
							</div>
						</div>
						<div class="form-group _stype _stypeR">
							<label for="_mi_curPwd" class="col-sm-3 control-label" style="font-size: 0.9em;">파일선택</label>
							<div class="col-sm-7">
								<input type="file" class="form-control" name="file" id="_id_file" style="display: none;"/>
								<input type="text" class="form-control" id="_id_fileView" readonly="readonly"/>
							</div>
							<div class="col-sm-1" style="margin-left: -25px;">
								<button class="btn btn-default" id="_id_btnFindFile">찾기</button>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn btn-default" id="_id_btnSave">저장</button>
					<button class="btn btn-default" id="_id_btnCancel">취소</button>
				</div>
			</form>
		</div>
	</div>
</div>