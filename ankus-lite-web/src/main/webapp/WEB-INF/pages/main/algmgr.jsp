<%@ page contentType="text/html; charset=UTF-8" language="java" trimDirectiveWhitespaces="true" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<style type="text/css">
._am_width400 {
	width: 400px;
}
</style>
<div class="ui-layout-center">
	<div class="form-inline" style="margin-bottom: 10px;">
		<div class="forms">
			<button class="btn btn-default" id="_am_btnUpload"><spring:message code="ALGMGR_BTN_ALG_UPLOAD" /></button>
			<button class="btn btn-default" id="_am_btnDelete"><spring:message code="COMMON_DELETE" /></button>
			<button class="btn btn-default" id="_am_btnRefresh"><spring:message code="COMMON_REFRESH" /></button>
		</div>
	</div>
	<table id="_am_grid"></table>
</div>

<div id="_am_uploadModal" class="modal fade" role="dialog" style="width: 1000px;">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title"><spring:message code="ALGMGR_BTN_ALG_UPLOAD" /></h4>
			</div>
			<div class="modal-body" style="height: 450px; overflow-y: scroll;">
				<div>
					<button id="_am_btnUploadAction" class="btn btn-info btn-xs browser_button"><spring:message code="COMMON_UPLOAD" /></button>
					<button id="_am_btnStopAction" class="btn btn-info btn-xs browser_button"><spring:message code="COMMON_STOP" /></button>
					<button id="_am_btnCancelAction" class="btn btn-info btn-xs browser_button"><spring:message code="COMMON_CANCEL" /></button>
					<button id="_am_btnResetAction" class="btn btn-info btn-xs browser_button"><spring:message code="COMMON_RESET" /></button>
				</div>
				<div id="_am_fileUploader">
					<spring:message code="COMMON_UPLOAD" />
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" id="_am_fileUploadClose"><spring:message code="COMMON_CLOSE" /></button>
			</div>
		</div>
	</div>
</div>
