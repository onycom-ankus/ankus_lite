<%@ page contentType="text/html; charset=UTF-8" language="java" trimDirectiveWhitespaces="true" pageEncoding="UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<style type="text/css">
#_hm_addModal .form-group label {
	width: 165px;
}

._hm_width550 {
	width: 550px;
}

._hm_border1 {
	border: 1px solid #ccc;
	margin-top: -22px;
    padding-top: 30px;
    z-index: 1
}

._hm_border2 {
	border: 1px solid #ccc;
	margin-top: -22px;
    padding-top: 30px;
    margin-bottom: 15px;
    z-index: 1
}

.greyRule { 
background: #CECECE; 
width: 1280px; 
height: 1px; 
padding: 0;
margin-bottom:10px;
} 
.greyRule hr { 
display: none; 
} 

</style>
<div class="ui-layout-center">
	<h4 class="title" style="border:1px;">하둡관리</h4>
	<div class="greyRule"><hr/></div>	
	<div class="form-inline" style="margin-bottom:10px;">
		<div class="forms">		
			<button class="btn btn-default" id="_hm_btn"><spring:message code="COMMON_ADD"/></button>						
			<button class="btn btn-default" id="_hm_btnRefresh"><spring:message code="COMMON_REFRESH"/></button>
		</div>
	</div>	
	<table id="_hm_grid"></table>		
</div>

<div id="_hm_addModal" class="modal fade" role="dialog">
	<div class="modal-dialog _hm_width550">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title"><spring:message code="HADOOPMGR_MODAL_TITLE"/></h4>
			</div>
			<div class="modal-body">
				<div class="form-horizontal">
					<input type="hidden" id="_hm_id"/>
					<div class="form-group">
						<label for="_hm_username" class="col-sm-3 control-label" style="font-size: 0.9em;"><spring:message code="HADOOPMGR_MODAL_CLUSTER_NAME"/></label>
						<div class="col-sm-8">
							<input type="text" class="form-control" id="_hm_clustername"/>
						</div>
					</div>
					<div class="form-group _stype _stypeR">
						<label class="col-sm-3 control-label" style="font-size: 0.8em; width: 211px; background-color: white; margin-left: 24px; padding-right: 21px;"><spring:message code="HADOOPMGR_MODAL_NAMENODE"/> & <spring:message code="HADOOPMGR_MODAL_RESOURCE_MANAGER"/></label>
					</div>
					<div class="_hm_border1">
						<div class="form-group _stype _stypeR">
							<label for="_hm_curPwd" class="col-sm-3 control-label" style="font-size: 0.9em;"><spring:message code="HADOOPMGR_MODAL_FILE_SYSTEM_SCHEME"/></label>
							<div class="col-sm-3">
								<select id="_hm_fss" class="form-control">
									<option value="hdfs://">HDFS</option>
									<option value="s3:/">S3</option>
									<option value="s3n:/">S3N</option>
									<option value="http://">HTTP</option>
								</select>
							</div>
						</div>
						<div class="form-group _stype _stypeR">
							<label for="_hm_newPwd1" class="col-sm-3 control-label" style="font-size: 0.9em;"><spring:message code="HADOOPMGR_MODAL_NAMENODE"/></label>
							<div class="col-sm-5">
								<input type="text" class="form-control" id="_hm_namenodeIP" value="127.0.0.1" placeholder="192.168.0.1"/>
							</div>
							<div class="col-sm-3">
								<input type="text" class="form-control" id="_hm_namenodePort" value="9000" placeholder="9000"/>
							</div>
						</div>
						<div class="form-group _stype _stypeR">
							<label for="_hm_newPwd2" class="col-sm-3 control-label" style="font-size: 0.9em;"><spring:message code="HADOOPMGR_MODAL_RESOURCE_MANAGER"/></label>
							<div class="col-sm-5">
								<input type="text" class="form-control" id="_hm_jobTrackerIP" value="127.0.0.1" placeholder="192.168.0.1"/>
							</div>
							<div class="col-sm-3">
								<input type="text" class="form-control" id="_hm_jobTrackerPort" value="9001" placeholder="9001"/>
							</div>
						</div>
					</div>
					<div class="form-group _stype _stypeR">
						<label class="col-sm-3 control-label" style="font-size: 0.8em; width: 160px; background-color: white; margin-left: 24px; padding-right: 21px; margin-top: 12px;"><spring:message code="HADOOPMGR_MODAL_HADOOP_WEB_CONSOLE"/></label>
					</div>
					<div class="_hm_border2">
						<div class="form-group _stype _stypeR">
							<label for="_hm_email" class="col-sm-3 control-label" style="font-size: 0.9em;"><spring:message code="HADOOPMGR_MODAL_NAMENODE_CONSOLE"/></label>
							<div class="col-sm-8">
								<input type="text" class="form-control" id="_hm_namenodeConsole" value="http://127.0.0.1:50070" placeholder="http://192.168.0.1:50070"/>
							</div>
						</div>
						<div class="form-group _stype _stypeR">
							<label for="_hm_email" class="col-sm-3 control-label" style="font-size: 0.9em;"><spring:message code="HADOOPMGR_MODAL_RESOURCE_MANAGER_CONSOLE"/></label>
							<div class="col-sm-8">
								<input type="text" class="form-control" id="_hm_jobTrackerConsole" value="http://127.0.0.1:8055" placeholder="http://192.168.0.1:8055"/>
							</div>
						</div>
					</div>
				</div>
				<input type="text" style="display: none;" id="_hm_namenodeMonitoringPort"  value="28080"/>
				<input type="text" style="display: none;" id="_hm_jobTrackerMonitoringPorte"  value="18080"/>
				<div class="modal-footer">
					<button class="btn btn-default" id="_hm_btnSubmit"><spring:message code="COMMON_CONFIRM"/></button>
					<button class="btn btn-default" id="_hm_btnDelete"><spring:message code="COMMON_DELETE"/></button>
					<button class="btn btn-default" id="_hm_btnCancel"><spring:message code="COMMON_CANCEL"/></button>
				</div>	
			</div>
		</div>
	</div>
</div>
