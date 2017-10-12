<%@ page contentType="text/html; charset=UTF-8" language="java" trimDirectiveWhitespaces="true" pageEncoding="UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<style>
.datepicker {
	z-index : 1100 !important;
}
</style>
<div class="ui-layout-center">
	<div class="form-inline" style="margin-bottom:10px;">
		<div class="forms">		
			<button class="btn btn-default" id="_ei_btnNew"><spring:message code="COMMON_ADD"/></button>						
			<button class="btn btn-default" id="_ei_btnSearch"><spring:message code="COMMON_REFRESH"/></button>
		</div>
	</div>	
	<table id="_ei_infoGrid"></table>		
	<div class="form-inline" style="margin-bottom:10px; margin-top:10px;">
		<div class="forms">		
			<button class="btn btn-default" id="_ei_btnEnvs"><spring:message code="SRVMGR_ENVIRO_VAL"/></button>
			<button class="btn btn-default" id="_ei_btnProp"><spring:message code="SRVMGR_SYS_ATTR"/></button>				
			<button class="btn btn-default" id="_ei_btnTriggers"><spring:message code="SRVMGR_TRIGER"/></button>
			<button class="btn btn-default" id="_ei_btnRunning"><spring:message code="SRVMGR_RUNNING_WORKFLOW"/></button>			
		</div>
	</div>		
	<div class="forms" id="_ei_envs_table">
		<table id="_ei_envsGrid"></table>
	</div>
	<div class="forms" id="_ei_prop_table">
		<table id="_ei_propGrid"></table>
	</div>
	<div class="forms" id="_ei_triggers_table">		
		<table id="_ei_triggersGrid"></table>
	</div>
	<div class="forms" id="_ei_running_table">		
		<table id="_ei_runningGrid"></table>
	</div>
</div>

<div id="_ei_Modal" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">	
				<h4 class="modal-title"><spring:message code="SRVMGR_REGIST_SERVER"/></h4>
			</div>
			<div class="modal-body">
				<div class="form-horizontal">	
					<input type=hidden id="_ei_engineId"/>				
					<div class="form-group" >
						<label for="_ei_engineName" class="col-sm-2 control-label"><spring:message code="SRVMGR_ENGINE_NAME"/></label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_ei_engineName"/>
						</div>
					</div>
					<div class="form-group" >
						<label for="_ei_engineIp" class="col-sm-2 control-label"><spring:message code="SRVMGR_ENGINE"/></label>
						<div class="col-sm-6">
							<input type="text" class="form-control" id="_ei_engineIp"/>
						</div>
						<div class="col-sm-4">
							<input type="text" class="form-control" id="_ei_enginePort"/>
						</div>
					</div>					
					<div class="form-group">
						<label for="_ei_hadoop" class="col-sm-2 control-label"><spring:message code="SRVMGR_HADOOP_CLUSTER"/></label>
						<div class="col-sm-10">
							<div class="input-group">
								<select id="_ei_hadoop" class="form-control" style="width:220px;"></select>	
							</div>
						</div>
					</div>	
					<div class="form-group">
						<label for="_ei_public" class="col-sm-2 control-label"><spring:message code="SRVMGR_PUBLIC"/></label>
						<div class="col-sm-10">	
							<input type="checkbox" value="" id="_ei_public" checked=true>
						</div>	
					</div>
					<div class="form-group">
						<label for="_ei_permission" class="col-sm-2 control-label"><spring:message code="SRVMGR_USER"/></label>
						<div class="col-sm-10">
							<div class="input-group">
								<select id="_ei_permission" class="form-control" style="width:220px;" disabled="disabled"></select>	
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button class="btn btn-default" id="_ei_btnSave"><spring:message code="COMMON_ADD"/></button>
						<button class="btn btn-default" id="_ei_btnDelete"><spring:message code="COMMON_DELETE"/></button>	
						<button class="btn btn-default" id="_ei_btnCancel"><spring:message code="COMMON_CANCEL"/></button>
					</div>					
				</div>
			</div>			
		</div>
	</div>
</div>
