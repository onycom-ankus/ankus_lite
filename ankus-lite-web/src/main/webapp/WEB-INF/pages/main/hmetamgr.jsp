<%@ page contentType="text/html; charset=UTF-8" language="java" trimDirectiveWhitespaces="true" pageEncoding="UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<div class="ui-layout-west display_none" id="inner_west">
	<div class="ui-layout-north">
		<div class="form-inline">
			<label class="form_label"><spring:message code="HMMGR_HADOOP_CLUSTER"/> : </label>
			<select class="form-control input-sm" id="_tm_clusterName">			
			</select>
			<div  hidden="hidden">
			<select class="form-control input-sm" id="_tm_hadoopId">			
			</select>
			</div>
			<button id="_tm_btnRefresh" class="btn btn-primary btn-sm"><spring:message code="COMMON_REFRESH"/></button>
		</div>	
		<div class="forms" id="_tm_jstreeAjax"></div>
	</div>
	<div class="ui-layout-center">
		<table id="_tm_grid"></table>
	</div>
</div>
<div class="ui-layout-center display_none" id="inner_center">	
	<div class="ui-layout-north">
		<div class="form-inline" style="margin-bottom:10px;">
			<div class="forms">
				<label for="_tm_port" class="form_label" style="width:100px;"><spring:message code="HMMGR_TAJO_PORT"/>: </label>
				<input type="text" class="form-control" id="_tm_port" value="26002" style="width:18%;"/>				
				<label for="_tm_rows" class="form_label" style="padding-left:20px; width:140px;"><spring:message code="HMMGR_MAX_ROW_COUNT"/>: </label>				
				<input type="text" class="form-control" id="_tm_rows" value="100" style="width:19%; padding-right:20px; "/>
				<button class="btn btn-default" id="_tm_btnPreview"><spring:message code="HMMGR_PREVIEW_FILE_HDFS"/></button>
			</div>	
		</div>
		<div class="form-inline" style="margin-bottom:10px;">
			<div class="forms">
				<label for="_tm_DB" class="form_label" style="width:100px;"><spring:message code="HMMGR_DATABASE"/>: </label>	
				<select id="_tm_DB" class="form-control" style="width:13%;"></select>
				<button class="btn btn-default" id="_tm_btnDBDelete"><spring:message code="COMMON_DELETE"/></button>
				<label for="_tm_DBName" class="form_label" style="padding-left:20px; width:140px;"><spring:message code="HMMGR_DATABASE_NAME"/>: </label>	
				<input type="text" class="form-control" id="_tm_DBName" class="form-control" style="width:19%;">
				<button class="btn btn-default" id="_tm_btnDBCreate"><spring:message code="COMMON_CREATE"/></button>
			</div>
		</div>
		<div class="form-inline" style="margin-bottom:10px;">
			<div class="forms" style="width:100%">
				<label for="_tm_DBTable" class="form_label" style="width:100px;"><spring:message code="HMMGR_TABLE"/>: </label>	
				<select id="_tm_DBTable" class="form-control" style="width:13%;"></select>
				<button class="btn btn-default" id="_tm_btnDBTableDelete"><spring:message code="COMMON_DELETE"/></button>
				<label for="_tm_delimiter" class="form_label" style="padding-left:20px; width:140px;"><spring:message code="HMMGR_SEPER_CHAR"/>: </label>	
				<select id="_tm_delimiter" class="form-control"  >
					<option value="::"><spring:message code="HMMGR_DOBLE_COLONE"/></option>
					<option value="," selected="selected"><spring:message code="HMMGR_COMMA"/></option>
					<option value="\\t"><spring:message code="HMMGR_TAB"/></option>
					<option value="\\s"><spring:message code="HMMGR_BLANK"/></option>
					<option value="CUSTOM"><spring:message code="HMMGR_USER_SETTING"/></option>		
				</select>
				<input type="text" class="form-control" id="_tm_DelimiterText" value="," disabled="disabled" style="width:100px;"/>
				<label for="_tm_firstLine" class="form_label" style="padding-left:20px;"><spring:message code="HMMGR_IS_FIRST_COLUMN"/>: </label>	
				<input type="checkbox" id="_tm_firstLine">
			</div>
		</div>
		<div class="form-inline">
			<div class="forms">
				<button class="btn btn-default" id="_tm_btnTableCreate" style="width:100%"><spring:message code="HMMGR_CREATE_TABLE"/></button>	
			</div>
		</div>
	</div>

	<div class="ui-layout-center">
		<table id="_tm_tajoGrid"></table>
	</div>
</div>

<div id="_tm_Modal" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title"><spring:message code="HMMGR_CREATE_TABLE"/></h4>
			</div>
			<div class="modal-body">
				<div class="form-horizontal">
					<div class="form-group">					
						<label for="_tm_DBTableName" class="col-sm-2 control-label"><spring:message code="HMMGR_TABLE_NAME"/></label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="_tm_DBTableName"/>
						</div>			
					</div>				
				</div>
				<div class="form-horizontal" id="_tm_TableHeader"></div>
			</div>
			
			<div class="modal-footer">						
				<button class="btn btn-default" id="_tm_btnSave"><spring:message code="COMMON_CONFIRM"/></button>
				<button class="btn btn-default" id="_tm_btnCencel"><spring:message code="COMMON_CANCEL"/></button>
			</div>
		</div>
	</div>
</div>

<div id="_tm_template" class="display_none">
	<select>
		<option class="_tm_tmpOption"></option>
	</select>
	
	<img src="/resources/images/common-folder.png" alt="folder" height="16px" class="_tm_folderImage" />
	<img src="/resources/images/common-file.png" alt="file" height="16px" class="_tm_fileImage" />
</div>