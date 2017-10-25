<%@ page contentType="text/html; charset=UTF-8" language="java" trimDirectiveWhitespaces="true" pageEncoding="UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<style type="text/css">
#_mi_createModal .form-group label {
	width: 127px;
}
</style>
<div id="_mi_createModal" class="modal fade" role="dialog">
	<div class="modal-dialog" style="width:471px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title"><spring:message code="MYINFO_TITLE_MYINFO"/></h4>
			</div>
			<div class="modal-body">
				<div class="form-horizontal">
					<input type="hidden" id="_mi_id"/>
					<input type="hidden" id="_mi_name"/>
					<div class="form-group">
						<label for="_mi_username" class="col-sm-3 control-label" style="font-size: 0.9em;"><spring:message code="MYINFO_TITLE_ID"/></label>
						<div class="col-sm-7">
							<input type="text" class="form-control" id="_mi_username" readonly="readonly"/>
						</div>
					</div>
					<div class="form-group _stype _stypeR">
						<label for="_mi_curPwd" class="col-sm-3 control-label" style="font-size: 0.9em;"><spring:message code="MYINFO_TITLE_CURRENT_PW"/></label>
						<div class="col-sm-7">
							<input type="password" class="form-control" id="_mi_curPwd"/>
						</div>
						<div class="col-sm-1" style="margin-left: -25px;">
							<button class="btn btn-default" id="_mi_btnPwd"><spring:message code="COMMON_CONFIRM"/></button>
						</div>
					</div>
					<div class="form-group _stype _stypeR">
						<label for="_mi_newPwd1" class="col-sm-3 control-label" style="font-size: 0.9em;"><spring:message code="MYINFO_TITLE_NEW_PW"/></label>
						<div class="col-sm-7">
							<input type="password" class="form-control" id="_mi_newPwd1" readonly="readonly"/>
						</div>
					</div>
					<div class="form-group _stype _stypeR">
						<label for="_mi_newPwd2" class="col-sm-3 control-label" style="font-size: 0.9em;"><spring:message code="MYINFO_TITLE_NEW_PW_CONFIRM"/></label>
						<div class="col-sm-7">
							<input type="password" class="form-control" id="_mi_newPwd2" readonly="readonly"/>
						</div>
					</div>
					<div class="form-group _stype _stypeR">
						<label for="_mi_email" class="col-sm-3 control-label" style="font-size: 0.9em;"><spring:message code="MYINFO_TITLE_EMAIL"/></label>
						<div class="col-sm-7">
							<input type="text" class="form-control" id="_mi_email" readonly="readonly"/>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn btn-default" id="_mi_btnSubmit" disabled="disabled"><spring:message code="COMMON_APPLY"/></button>
					<button class="btn btn-default" id="_mi_btnCancel"><spring:message code="COMMON_CANCEL"/></button>
				</div>
			</div>
		</div>
	</div>
</div>

