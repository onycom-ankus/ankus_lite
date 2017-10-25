<%@ page contentType="text/html; charset=UTF-8" language="java" trimDirectiveWhitespaces="true" pageEncoding="UTF-8" %>
<style>
.datepicker {
	z-index : 1100 !important;
}
</style>
<div class="ui-layout-center">
	<div class="form-inline" style="margin-bottom:10px;">
		<div class="forms">
			<label class="form_label">일자 : </label>
			<input type="text" id="_nl_searchFrom" class="form-control" />
			<input type="text" id="_nl_searchTo" class="form-control" />
			
			<select class="form-control" id="_nl_searchType">
				<option value="제목">제목</option>
				<option value="출처">출처</option>	
			</select>			
			<input type="text" id="_nl_searchItem" class="form-control" />
			
			<button class="btn btn-default" id="_nl_btnSearch">조회</button>
		</div>
	</div>	
	<table id="_nl_Grid"></table>
	<div id="_nl_Pager"></div>
</div>

<div id="_nl_detailModal" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">뉴스조회</h4>
			</div>
			<div class="modal-body">
				<div class="form-horizontal">
					<input type="hidden" id="_nl_nid"/>
					<div class="form-group" >
						<label for="_nl_rdate" class="col-sm-2 control-label">보고일자</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" id="_nl_rdate" disabled="disabled"/>
						</div>
						<label for="_nl_nsite" class="col-sm-2 control-label">출처</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" id="_nl_nsite" disabled="disabled"/>
						</div>
					</div>
					<div class="form-group">
						<label for="_nl_url" class="col-sm-2 control-label">URL</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_nl_url" disabled="disabled"/>
						</div>
					</div>
					<div class="form-group">
						<label for="_nl_title" class="col-sm-2 control-label">제목</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_nl_title" disabled="disabled"/>
						</div>
					</div>					
					<div class="form-group">
						<label for="_nl_content" class="col-sm-2 control-label">내용</label>
						<div class="col-sm-10">
							<textarea rows="" cols="" class="form-control" id="_nl_content" style="height:120px;" disabled="disabled"></textarea>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" id="_nl_btnCancel">확인</button>
			</div>
		</div>
	</div>
</div>

