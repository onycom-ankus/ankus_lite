<%@ page contentType="text/html; charset=UTF-8" language="java" trimDirectiveWhitespaces="true" pageEncoding="UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<div class="ui-layout-center">
	<div class="form-inline" style="margin-bottom:10px;">
		<div class="forms">
			<label class="form_label"><spring:message code="USERMGR_USER_NAME"/> : </label>
			<input type="text" id="_user_findname" class="form-control" />
			<label class="form_label" style="padding-left:20px;"><spring:message code="USERMGR_EMAIL"/> : </label>
			<input type="text" id="_user_findemail" class="form-control" />
			<label class="form_label" style="padding-left:20px;"><spring:message code="USERMGR_ACTIVATION"/> : </label>
			<select id="_user_findenabled" class="form-control">
				<option value=""><spring:message code="COMMON_TOTAL"/></option>
				<option value="true">true</option>
				<option value="false">false</option>
			</select>
			<label class="form_label" style="padding-left:20px;"><spring:message code="USERMGR_AUTH"/> : </label>
			<select id="_user_findauthority" class="form-control">
				<option value=""><spring:message code="COMMON_TOTAL"/></option>
				<option value="ROLE_USER">ROLE_USER</option>
				<option value="ROLE_ADMIN">ROLE_ADMIN</option>
			</select>
			<label class="form_label" style="padding-left:20px;"><spring:message code="USERMGR_CREATE_DAY"/> : </label>
			<input type="text" id="_user_findcreate_dt" class="form-control" />

			<button class="btn btn-default" id="_user_btnSearch"><spring:message code="COMMON_SEARCH"/></button>
		</div>
	</div>
	<!-- 
	<button id="_user_btnCreate" class="btn btn-info btn-xs browser_button">추가</button>
	<button id="_user_btnDelete" class="btn btn-info btn-xs browser_button">삭제</button> -->
	<table id="_user_grid"></table>
	<div id="_user_pager"></div>
</div>

<div id="_user_createModal" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title"><spring:message code="USERMGR_USER_CREATE"/></h4>
			</div>
			<div class="modal-body">
			<div class="form-horizontal">
				<input type="hidden" id="_user_id"/>
				<div class="form-group">
					<label class="col-sm-2 control-label" style="font-size: 0.9em;"><spring:message code="USERMGR_USER_NAME"/></label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="_user_username" readonly/>
					</div>
				</div>
				<div class="form-group">
					<label for="_sc_stype" class="col-sm-2 control-label" style="font-size: 0.9em;"><spring:message code="USERMGR_EMAIL"/></label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="_user_email"/>
					</div>
				</div>
				<!-- 
				<div class="form-group">
					<label for="_sc_stype" class="col-sm-2 control-label" style="font-size: 0.9em;">비밀번호</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="_user_passwd"/>
					</div>
				</div>
				 -->
				<div class="form-group">
					<label for="_user_enabled" class="col-sm-2 control-label" style="font-size: 0.9em;"><spring:message code="USERMGR_ACTIVATION"/></label>
					<div class="col-sm-10">
						<select class="form-control" id="_user_enabled">
							<option value="true">true</option>
							<option value="false">false</option>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label for="_user_authority" class="col-sm-2 control-label" style="font-size: 0.9em;"><spring:message code="USERMGR_AUTH"/></label>
					<div class="col-sm-10">
						<select class="form-control" id="_user_authority">
							<option value="ROLE_USER">ROLE_USER</option>
							<option value="ROLE_ADMIN">ROLE_ADMIN</option>
						</select>
					</div>
				</div>
				
			</div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" id="_user_btnDelete"><spring:message code="COMMON_DELETE"/></button>
				<button class="btn btn-default" id="_user_btnSave"><spring:message code="COMMON_CREATE"/></button>
				<button class="btn btn-default" id="_user_btnCancel"><spring:message code="COMMON_CANCEL"/></button>
			</div>
		</div>
	</div>
</div>
