<%@ page contentType="text/html; charset=UTF-8" language="java" trimDirectiveWhitespaces="true" pageEncoding="UTF-8" %>
<div class="ui-layout-center">
	<div class="form-inline" style="margin-bottom:10px;">
		<div class="forms">
			<label class="form_label">대표어 : </label>
			<input type="text" id="_wd_searchWord" class="form-control" style="width:150px;"/>			
			<label class="form_label" style="padding-left:10px;">단어구분 : </label>
			<select id="_wd_searchDtype" class="form-control" >
				<option value="">전체</option>
				<option value="관심">관심</option>
				<option value="수요(긍정)">수요(긍정)</option>
				<option value="수요(부정)">수요(부정)</option>
				<option value="불량">불량</option>
			</select>
			<button class="btn btn-default" id="_wd_btnSearch">조회</button>
		</div>
	</div>
	<button id="_wd_btnCreate" class="btn btn-info btn-xs browser_button">생성</button>
	<button id="_wd_btnDelete" class="btn btn-info btn-xs browser_button">삭제</button>	
	<table id="_wd_grid"></table>
	<div id="_wd_pager"></div>
</div>

<div id="_wd_createModal" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">단어 생성</h4>
			</div>
			<div class="modal-body">
				<div class="form-horizontal">
					<input type="hidden" id="_wd_wid" />					
					<div class="form-group">
						<label for="_wd_word" class="col-sm-2 control-label">대표어</label>
						<div class="col-sm-5">
							<div class="input-group">							
								<input type="text" class="form-control" id="_wd_popSearchWord"/>
								<span class="input-group-btn">
									<button type="button" id="_wd_popSearchBtn" class="btn btn-default" >중복체크</button>
								</span>
							</div>
						</div>						  
						<div class="col-sm-5">
							<input type="text" class="form-control" id="_wd_word" disabled="disabled"/>	
						</div>						
					</div>
					<div class="form-group">
						<label for="_wd_wtype" class="col-sm-2 control-label">단어구분</label>
						<div class="col-sm-10">
							<select class="form-control" id="_wd_wtype">
								<option value="관심">관심</option>
								<option value="수요(긍정)">수요(긍정)</option>
								<option value="수요(부정)">수요(부정)</option>
								<option value="불량">불량</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" id="_wd_btnSave">생성</button>
				<button class="btn btn-default" id="_wd_btnCancel">취소</button>
			</div>
		</div>
	</div>
</div>