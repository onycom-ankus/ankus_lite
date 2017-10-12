<%@ page contentType="text/html; charset=UTF-8" language="java" trimDirectiveWhitespaces="true"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>

<div class="ui-layout-center">
	<div id="_ds_workFlowHistory" style="height: 550px; width: 1360px;">
		<div class="ui-layout-north">
			<ul class="nav nav-tabs" data-selectId="ALL">
				<li class="active">
					<a data-toggle="tab" data-type="_ds_workFlowHistory"><spring:message code="DASHBOARD_TITLE_WORKFLOW_RECODE" /></a>
				</li>
				<li>
					<a data-toggle="tab" data-type="_ds_runningWorkFlow"><spring:message code="DASHBOARD_TITLE_RUNNING_WORKFLOW" /></a>
				</li>
			</ul>

			<div id="_ds_historyDiv">
				<div style="margin: 10px;">
					<!-- <button id="_selected">선택된 행</button> -->
				</div>
				<div class="form-inline" style="margin-bottom: 10px;">
					<div class="forms">

						<label class="form_label"><spring:message code="DASHBOARD_TITLE_WORKFLOW_ENGINE" /> : </label>
						<select id="_ds_historyEngineSelect" class="form-control">
						</select>
						<label class="form_label"><spring:message code="COMMON_START_DTTM" /> : </label>
						<input class="form-control" id="_ds_startDatePicker" style="width: 100px;" />
						<label class="form_label"><spring:message code="COMMON_END_DTTM" /> : </label>
						<input class="form-control" id="_ds_endDatePicker" style="width: 100px;" />
						<label class="form_label"><spring:message code="COMMON_STATUS" /> : </label>
						<select id="_ds_status" class="form-control">
							<option value="0"><spring:message code="COMMON_ALL" /></option>
							<option value="1"><spring:message code="COMMON_RUNNING" /></option>
							<option value="2"><spring:message code="COMMON_SUCCESS" /></option>
							<option value="3"><spring:message code="COMMON_FAIL" /></option>
							<option value="4"><spring:message code="COMMON_FORCE_QUIT" /></option>
						</select>
						<label class="form_label"><spring:message code="DASHBOARD_TITLE_WORKFLOW_NAME" /> : </label>
						<input type="text" id="_ds_flowName" class="form-control" />

						<button class="btn btn-default" id="_ds_historySearchBtn"><spring:message code="COMMON_SEARCH" /></button>
						<button class="btn btn-default" id="_ds_historyClearBtn"><spring:message code="COMMON_RESET" /></button>
						<button class="btn btn-default" id="_ds_historyDeleteBtn"><spring:message code="COMMON_DELETE" /></button>
					</div>

				</div>

				<div id="_modal" class="modal fade" role="dialog">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<span id="_ds_workPopupTitle"></span>
								<button type="button" class="close" data-dismiss="modal">&times;</button>
								<h4 class="modal-title"></h4>
							</div>
							<div class="ui-layout-center">
								<div id="_ds_popupWorkFlowHistoryHigh">
									<div class="ui-layout-north">
										<ul class="nav nav-tabs" data-selectId="ALL">
											<li id="_ds_workTabHigh_work" class="active">
												<a data-toggle="tab" data-type="_ds_popupWorkFlowHistory_workTab"><spring:message code="DASHBOARD_WORK" /></a>
											</li>
											<li id="_ds_workTabHigh_action">
												<a data-toggle="tab" data-type="_ds_popupWorkFlowHistory_actionTab"><spring:message code="DASHBOARD_ACTION" /></a>
											</li>
										</ul>

									</div>
								</div>
							</div>
							<div id="_ds_popupWorkFlowHistory_workDiv">
								<h4 class="modal-title"><spring:message code="DASHBOARD_WORK_INFO" /></h4>
								<div class="modal-body">
									<div style="overflow: scroll; height: 300px;">
										<dl class="dl-horizontal">
											<dt><spring:message code="DASHBOARD_WORK" /> ID:</dt>
											<dd id="_ds_popupWorkTabWorkId"></dd>
											<dt><spring:message code="COMMON_START_DTTM" /> :</dt>
											<dd id="_ds_popupWorkTabStartDate"></dd>
										</dl>
										<hr />
										<dl class="dl-horizontal">
											<dt><spring:message code="DASHBOARD_WORKFLOW" /> ID:</dt>
											<dd id="_ds_popupWorkTabWorkflowId"></dd>
											<dt><spring:message code="COMMON_END_DTTM" /> :</dt>
											<dd id="_ds_popupWorkTabEndDate"></dd>
										</dl>
										<hr />
										<dl class="dl-horizontal">
											<dt><spring:message code="DASHBOARD_TITLE_WORKFLOW_NAME" /> :</dt>
											<dd id="_ds_popupWorkTabWorkflowName"></dd>
											<dt><spring:message code="COMMON_RUNNING_TIME" /> :</dt>
											<dd id="_ds_popupWorkTabElapsed"></dd>
										</dl>
										<hr />
										<dl class="dl-horizontal">
											<dt><spring:message code="COMMON_STATUS" /> :</dt>
											<dd id="_ds_popupWorkTabStatus"></dd>
											<dt><spring:message code="COMMON_PROGRESS_RATE" /> :</dt>
											<dd id="_ds_popupWorkTabCurrentStep"></dd>
										</dl>
										<hr />
										<dl class="dl-horizontal">
											<dt><spring:message code="DASHBOARD_FINAL_ACTION" /> :</dt>
											<dd id="_ds_popupWorkTabCurrentAction"></dd>
											<dt><spring:message code="COMMON_USER_NAME" /> :</dt>
											<dd id="_ds_popupWorkTabUsername"></dd>
										</dl>
										<hr />
									</div>
								</div>
								<div class="ui-layout-center">
									<div id="_ds_popupWorkFlowHistoryLow">
										<div class="ui-layout-north">
											<ul class="nav nav-tabs" data-selectId="ALL">
												<li id="_ds_workTabLow_workflowXml" class="active">
													<a data-toggle="tab" data-type="_ds_popupWorkFlowHistory_workXmlTab"><spring:message code="DASHBOARD_WORKFLOW" /> XML</a>
												</li>
												<li id="_ds_workTabLow_errorLog">
													<a data-toggle="tab" data-type="_ds_popupWorkFlowHistory_errorLogTab"><spring:message code="COMMON_ERROR_LOG" /></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div id="_ds_popupWorkFlowHistory_workflowXmlDiv">
									<div id="_ds_popupWorkFlowHistory_workflowXmlValue"></div>
								</div>
								<div id="_ds_popupWorkFlowHistory_errorLogDiv" class="display_none">
									<div id="_ds_popupWorkFlowHistory_errorLogCause"></div>
									<div id="_ds_popupWorkFlowHistory_errorLogValue"></div>
								</div>
							</div>
							<div id="_ds_popupWorkFlowHistory_actionDiv" class="display_none">
								<div class="forms">
									<button id="_ds_popupWorkFlowHistory_actionUpdateBtn" class="btn btn-default"><spring:message code="COMMON_REFRESH" /></button>
								</div>
								<table id="_ds_popupWorkFlowHistoryActionTabGrid"></table>
								<h4 class="modal-title"><spring:message code="DASHBOARD_ACTION_INFO" /></h4>
								<div class="modal-body">
									<div style="overflow: scroll; height: 300px;">
										<dl class="dl-horizontal">
											<dt><spring:message code="DASHBOARD_ACTION" /> ID:</dt>
											<dd id="_ds_popupActionTabActionId"></dd>
											<dt><spring:message code="COMMON_START_DTTM" />:</dt>
											<dd id="_ds_popupActionTabStartTime"></dd>
											<dt><spring:message code="COMMON_RUNNING_TIME" />:</dt>
											<dd id="_ds_popupActionTabEndTime"></dd>
										</dl>
										<hr />
										<dl class="dl-horizontal">
											<dt><spring:message code="DASHBOARD_WORK" /> ID:</dt>
											<dd id="_ds_popupActionTabworkId"></dd>
											<dt><spring:message code="COMMON_END_DTTM" />:</dt>
											<dd id="_ds_popupActionTabEndDate"></dd>
											<dt><spring:message code="COMMON_STATUS" />:</dt>
											<dd id="_ds_popupActionTabStatus"></dd>
										</dl>
										<hr />
										<dl class="dl-horizontal">
											<dt><spring:message code="DASHBOARD_WORKFLOW" /> ID:</dt>
											<dd id="_ds_popupActionTabworkFlowId"></dd>
											<dt><spring:message code="DASHBOARD_ACTION_NAME" />:</dt>
											<dd id="_ds_popupActionTabActionName"></dd>
										</dl>
										<hr />
										<dl class="dl-horizontal">
											<dt><spring:message code="COMMON_LOG_PATH" />:</dt>
											<dd id="_ds_popupActionTabLogPath"></dd>
										</dl>
										<hr />
									</div>
								</div>


								<div class="ui-layout-center">
									<div id="_ds_popupWorkFlowHistoryActionLowTab">
										<div class="ui-layout-north">
											<ul class="nav nav-tabs" data-selectId="ALL">
												<li id="_ds_popupWorkFlowHistory_conmmandTabLi" class="active">
													<a data-toggle="tab" data-type="_ds_popupWorkFlowHistory_conmmandTab"><spring:message code="DASHBOARD_COMMAND_LINE" /></a>
												</li>
												<li id="_ds_popupWorkFlowHistory_scriptTabLi">
													<a data-toggle="tab" data-type="_ds_popupWorkFlowHistory_scriptTab"><spring:message code="DASHBOARD_SCRIPT_CONFIG_INFO" /></a>
												</li>
												<li id="_ds_popupWorkFlowHistory_runningLogTabLi">
													<a data-toggle="tab" data-type="_ds_popupWorkFlowHistory_runningLogTab"><spring:message code="DASHBOARD_RUNNING_LOG" /></a>
												</li>
												<li id="_ds_popupWorkFlowHistory_errorMessageTabLi">
													<a data-toggle="tab" data-type="_ds_popupWorkFlowHistory_errorMessageTab"><spring:message code="DASHBOARD_ERROR_MESSAGE" /></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div id="_ds_popupWorkFlowHistory_conmmandTabDiv">
									<div id="_ds_popupWorkFlowHistory_conmmandTabValue"></div>
								</div>
								<div id="_ds_popupWorkFlowHistory_scriptTabDiv" class="display_none">
									<div id="_ds_popupWorkFlowHistory_scriptTabValue"></div>
								</div>
								<div id="_ds_popupWorkFlowHistory_runningLogTabDiv" class="display_none">
									<div id="_ds_popupWorkFlowHistory_runningLogTabValue"></div>
								</div>
								<div id="_ds_popupWorkFlowHistory_errorMessageTabDiv" class="display_none">
									<div id="_ds_popupWorkFlowHistory_errorMessageValue"></div>
								</div>

							</div>

						</div>
					</div>
				</div>

				<table id="_ds_historyGrid"></table>
			</div>

			<div id="_ds_runningWorkFlowDiv" class="display_none">
				<div class="form-inline">
					<div class="forms">
						<label class="form_label"><spring:message code="DASHBOARD_TITLE_WORKFLOW_ENGINE" /> : </label>
						<select id="_ds_runningWorkflowEngineOption" class="form-control">
							<option></option>
						</select>

						<button id="_ds_runningflowUpdateBtn" class="btn btn-default"><spring:message code="COMMON_REFRESH" /></button>
					</div>
				</div>

				<div>
					<table id="_ds_runningGrid"></table>
				</div>
			</div>
		</div>
	</div>

	<input type="hidden" id="_ds_engineId">

</div>

