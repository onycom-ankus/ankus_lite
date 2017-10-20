<%@ page contentType="text/html; charset=UTF-8" language="java" trimDirectiveWhitespaces="true" pageEncoding="UTF-8" %>
<div class="ui-layout-center">
	<div class="form-inline" style="margin-bottom:10px;">
		<div class="forms">
			<label class="form_label">언론사명 : </label>
			<input type="text" id="_ns_searchItem" class="form-control" />			
			<label class="form_label" style="padding-left:20px;">수집여부 : </label>
			<select id="_ns_searchEnable" class="form-control">
				<option value="">전체</option>
				<option value="Y">Y</option>
				<option value="N">N</option>
			</select>

			<button class="btn btn-default" id="_ns_btnSearch">조회</button>
		</div>
	</div>
	<button id="_ns_btnCreate" class="btn btn-info btn-xs browser_button">등록</button>
	<button id="_ns_btnDelete" class="btn btn-info btn-xs browser_button">삭제</button>
	<table id="_ns_grid"></table>
	<div id="_ns_pager"></div>
</div>

<div id="_ns_createModal" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title" id="_ns_title">언론사 생성</h4>
			</div>
			<div class="modal-body">
				<div class="form-horizontal">
					<div class="form-group">
						<label for="_ns_nsite" class="col-sm-2 control-label">언론사</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_ns_nsite"/>
						</div>
						
					</div>
					<div class="form-group">
						<label for="_ns_id" class="col-sm-2 control-label">ID</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_ns_id"/>
						</div>
					</div>					
					<div class="form-group">
						<label for="_ns_enable" class="col-sm-2 control-label" style="font-size: 0.9em;">수집여부</label>
						<div class="col-sm-10">
							<select class="form-control" id="_ns_enable">
								<option value="Y">Y</option>
								<option value="N">N</option>
							</select>
						</div>
					</div>

				</div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" id="_ns_btnSave">등록</button>
				<button class="btn btn-default" id="_ns_btnCancel">취소</button>
			</div>
		</div>
	</div>
</div>
