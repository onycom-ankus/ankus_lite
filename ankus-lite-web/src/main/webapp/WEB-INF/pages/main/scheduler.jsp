<%@ page contentType="text/html; charset=UTF-8" language="java" trimDirectiveWhitespaces="true" pageEncoding="UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<div class="ui-layout-center">
	<div class="form-inline" style="margin-bottom:10px;">
		<div class="forms">
			<label class="form_label"><spring:message code="SCHE_SCHEDULE_KINDS"/> : </label>
			<select id="_sc_searchStype" class="form-control"></select>
			<label class="form_label" style="padding-left:20px;"><spring:message code="SCHE_SCHEDULE_NAME"/> : </label>
			<input type="text" id="_sc_findname" class="form-control" />
			<label class="form_label" style="padding-left:20px;"><spring:message code="SCHE_WORKFLOW_NAME"/> : </label>
			<input type="text" id="_sc_workflowName" class="form-control" />
			<label class="form_label" style="padding-left:20px;"><spring:message code="SCHE_IS_USE"/> : </label>
			<select id="_sc_searchEnable" class="form-control">
				<option value=""><spring:message code="COMMON_TOTAL"/></option>
				<option value="Y">Y</option>
				<option value="N">N</option>
			</select>

			<button class="btn btn-default" id="_sc_btnSearch"><spring:message code="COMMON_SEARCH"/></button>
		</div>
	</div>
	<button id="_sc_btnCreate" class="btn btn-info btn-xs browser_button"><spring:message code="COMMON_CREATE"/></button>
	<button id="_sc_btnDelete" class="btn btn-info btn-xs browser_button"><spring:message code="COMMON_DELETE"/></button>
	<table id="_sc_grid"></table>
	<div id="_sc_pager"></div>
</div>

<div id="_sc_createModal" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title"><spring:message code="SCHE_SCHEDULE_CREATE"/></h4>
			</div>
			<div class="modal-body">
			<div class="form-horizontal">
				<input type="hidden" id="_sc_id"/>
				<div class="form-group">
					<label class="col-sm-2 control-label" style="font-size: 0.9em;"><spring:message code="SCHE_SCHEDULE_NAME"/></label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="_sc_name"/>
					</div>
				</div>
				<div class="form-group">
					<label for="_sc_stype" class="col-sm-2 control-label" style="font-size: 0.9em;"><spring:message code="SCHE_SCHEDULE_KINDS"/></label>
					<div class="col-sm-10">
						<select class="form-control" id="_sc_stype"></select>
					</div>
				</div>
				<div class="form-group _stype _stypeW">
					<label for="_sc_workflow" class="col-sm-2 control-label" style="font-size: 0.9em;"><spring:message code="SCHE_WORKFLOW"/></label>
					<div class="col-sm-10">
						<select class="form-control" id="_sc_workflow"></select>
					</div>
				</div>
				
				<div class="form-group _stype _stypeR">
					<label for="_sc_sshIp" class="col-sm-2 control-label" style="font-size: 0.9em;"><spring:message code="SCHE_REMOTE_IP"/></label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="_sc_sshIp"/>
					</div>
				</div>
				<div class="form-group _stype _stypeR">
					<label for="_sc_sshPort" class="col-sm-2 control-label" style="font-size: 0.9em;"><spring:message code="SCHE_REMOTE_PORT"/></label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="_sc_sshPort"/>
					</div>
				</div>
				<div class="form-group _stype _stypeR">
					<label for="_sc_sshId" class="col-sm-2 control-label" style="font-size: 0.9em;"><spring:message code="SCHE_REMOTE_ID"/></label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="_sc_sshId"/>
					</div>
				</div>
				<div class="form-group _stype _stypeR">
					<label for="_sc_sshPwd" class="col-sm-2 control-label" style="font-size: 0.9em;"><spring:message code="SCHE_REMOTE_PW"/></label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="_sc_sshPwd"/>
					</div>
				</div>
				<div class="form-group _stype _stypeR _stypeL">
					<label for="_sc_sshCmd" class="col-sm-2 control-label" style="font-size: 0.9em;"><spring:message code="SCHE_REMOTE_COMMAND"/></label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="_sc_sshCmd"/>
					</div>
				</div>
				
				<div class="form-group">
					<label class="col-sm-2 control-label"><spring:message code="COMMON_MONTH"/></label>
					<div class="col-sm-10">
						<label class="checkbox-inline">
						  <input type="checkbox" id="_sc_month_all" value=""><spring:message code="COMMON_ALL_MONTH"/>
						</label>
						<label class="checkbox-inline">
						  <input type="checkbox" id="_sc_month_1" class="_sc_month" value="1">1<spring:message code="COMMON_MONTH"/>
						</label>
						<label class="checkbox-inline">
						  <input type="checkbox" id="_sc_month_2" class="_sc_month" value="2">2<spring:message code="COMMON_MONTH"/>
						</label>
						<label class="checkbox-inline">
						  <input type="checkbox" id="_sc_month_3" class="_sc_month" value="3">3<spring:message code="COMMON_MONTH"/>
						</label>
						<label class="checkbox-inline">
						  <input type="checkbox" id="_sc_month_4" class="_sc_month" value="4">4<spring:message code="COMMON_MONTH"/>
						</label>
						<label class="checkbox-inline">
						  <input type="checkbox" id="_sc_month_5" class="_sc_month" value="5">5<spring:message code="COMMON_MONTH"/>
						</label>
						<label class="checkbox-inline">
						  <input type="checkbox" id="_sc_month_6" class="_sc_month" value="6">6<spring:message code="COMMON_MONTH"/>
						</label>
						<label class="checkbox-inline">
						  <input type="checkbox" id="_sc_month_7" class="_sc_month" value="7">7<spring:message code="COMMON_MONTH"/>
						</label>
						<label class="checkbox-inline">
						  <input type="checkbox" id="_sc_month_8" class="_sc_month" value="8">8<spring:message code="COMMON_MONTH"/>
						</label>
						<label class="checkbox-inline">
						  <input type="checkbox" id="_sc_month_9" class="_sc_month" value="9">9<spring:message code="COMMON_MONTH"/>
						</label>
						<label class="checkbox-inline">
						  <input type="checkbox" id="_sc_month_10" class="_sc_month" value="10">10<spring:message code="COMMON_MONTH"/>
						</label>
						<label class="checkbox-inline">
						  <input type="checkbox" id="_sc_month_11" class="_sc_month" value="11">11<spring:message code="COMMON_MONTH"/>
						</label>
						<label class="checkbox-inline">
						  <input type="checkbox" id="_sc_month_12" class="_sc_month" value="12">12<spring:message code="COMMON_MONTH"/>
						</label>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label"><spring:message code="COMMON_DAY_OF_WEEK"/></label>
					<div class="col-sm-10">
						<label class="checkbox-inline">
						  <input type="checkbox" id="_sc_week_all" value=""><spring:message code="COMMON_ALL_DAY"/>
						</label>
						<label class="checkbox-inline">
						  <input type="checkbox" id="_sc_week_0" class="_sc_week" value="0"><spring:message code="COMMON_SUNDAY"/>
						</label>
						<label class="checkbox-inline">
						  <input type="checkbox" id="_sc_week_1" class="_sc_week" value="1"><spring:message code="COMMON_MONDAY"/>
						</label>
						<label class="checkbox-inline">
						  <input type="checkbox" id="_sc_week_2" class="_sc_week" value="2"><spring:message code="COMMON_THUSDAY"/>
						</label>
						<label class="checkbox-inline">
						  <input type="checkbox" id="_sc_week_3" class="_sc_week" value="3"><spring:message code="COMMON_WENDSDAY"/>
						</label>
						<label class="checkbox-inline">
						  <input type="checkbox" id="_sc_week_4" class="_sc_week" value="4"><spring:message code="COMMON_THURTHDAY"/>
						</label>
						<label class="checkbox-inline">
						  <input type="checkbox" id="_sc_week_5" class="_sc_week" value="5"><spring:message code="COMMON_FRIDAY"/>
						</label>
						<label class="checkbox-inline">
						  <input type="checkbox" id="_sc_week_6" class="_sc_week" value="6"><spring:message code="COMMON_SATURDAY"/>
						</label>
					</div>
				</div>
				<div class="form-group">
					<label for="_sc_day" class="col-sm-2 control-label"><spring:message code="COMMON_DAY"/>(1~31)</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="_sc_day" placeholder="ex) 1,5,10,15,20,25,30 (empty is every)"/>
					</div>
				</div>
				<div class="form-group">
					<label for="_sc_hour" class="col-sm-2 control-label"><spring:message code="COMMON_HOUR"/>(0~23)</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="_sc_hour" placeholder="ex) 1,13 (empty is every)"/>
					</div>
				</div>
				<div class="form-group">
					<label for="_sc_min" class="col-sm-2 control-label"><spring:message code="COMMON_MINUTE"/>(0~59)</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="_sc_min" placeholder="ex) 3,33 (empty is every)"/>
					</div>
				</div>
				<div class="form-group">
					<label for="_sc_enable" class="col-sm-2 control-label" style="font-size: 0.9em;"><spring:message code="COMMON_IS_USE"/></label>
					<div class="col-sm-10">
						<select class="form-control" id="_sc_enable">
							<option value="Y">Y</option>
							<option value="N">N</option>
						</select>
					</div>
				</div>
			</div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" id="_sc_btnSave"><spring:message code="COMMON_CREATE"/></button>
				<button class="btn btn-default" id="_sc_btnCancel"><spring:message code="COMMON_CANCEL"/></button>
			</div>
		</div>
	</div>
</div>

