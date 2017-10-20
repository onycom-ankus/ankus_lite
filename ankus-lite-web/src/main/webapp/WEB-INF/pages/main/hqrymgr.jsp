<%@ page contentType="text/html; charset=UTF-8" language="java" trimDirectiveWhitespaces="true" pageEncoding="UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<div class="ui-layout-center">
	<div class="form-inline" style="margin-bottom:10px;">
		<div class="forms">
			<label class="form_label" style="width:100px;"><spring:message code="HQMGR_HADOOP_CLUSTER"/> : </label>
			<select class="form-control input-sm" id="_tq_clusterName"  style="width:13%;"></select>
			<div hidden="hidden">
				<select class="form-control input-sm" id="_tq_hadoopId"></select>
			</div>
			<label for="_tq_port" class="form_label" style="width:100px; padding-left:20px;"><spring:message code="HQMGR_TAJO_PORT"/>: </label>
			<input type="text" class="form-control" id="_tq_port" value="26002"/>								
		</div>	
	</div>
	<div class="form-inline" style="margin-bottom:10px;">
		<div class="forms">
			<label for="_tq_DB" class="form_label" style="width:100px;"><spring:message code="HQMGR_DATABASE"/>: </label>	
			<select id="_tq_DB" class="form-control" style="width:13%;"></select>
			<label for="_tq_DBTable" class="form_label" style="width:100px; padding-left:20px;"><spring:message code="HQMGR_TABLE"/>: </label>	
			<select id="_tq_DBTable" class="form-control" style="width:13%;"></select>	
			<label for="_tq_rows" class="form_label" style="padding-left:20px; width:100px;"><spring:message code="HQMGR_MAX_ROW_COUNT"/>: </label>				
			<input type="text" class="form-control" id="_tq_rows" value="100" style="width:13%; padding-left:20px; "/>							
		</div>	
	</div>
	
	<div class="forms" style="margin-bottom:10px;">
		<textarea  class="form-control" id="_tq_query" rows="5" style="width:60%;"></textarea>	
	</div>		
	
	<div class="forms" style="margin-bottom:10px;">
		<button class="btn btn-default" id="_tq_btnQueryAction" style="width:60%;"><spring:message code="HQMGR_QUERY_EXECUTION"/></button>	
	</div>	
	<table id="_tq_queryGrid"></table>
	
</div>

<div id="_tq_template" class="display_none">
	<select>
		<option class="_tq_tmpOption"></option>
	</select>
</div>