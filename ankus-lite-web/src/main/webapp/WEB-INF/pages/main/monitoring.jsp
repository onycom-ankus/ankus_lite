<%@ page contentType="text/html; charset=UTF-8" language="java" trimDirectiveWhitespaces="true" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<style>
#gbox__mo_gridHadoopInfo .ui-jqgrid-hdiv{
	display:none !important;
}

.monitoring-chart{
	width : 280px;
	height: 150px;
}
</style>
<div class="ui-layout-west display_none">
	<!-- 클러스터 선택 -->
	<div>
		<label class="form_label"><spring:message code="MONIT_HADOOP_CLUSTER"/> : </label>
		<select class="input-sm" id="_mo_clusterName">				
		</select>
		<button id="_mo_btnRefresh" class="btn btn-primary btn-sm"><spring:message code="COMMON_REFRESH"/></button>
	</div>
	<!-- 새로고침 간격 -->
	<div>
		<label class="form_label"><spring:message code="MONIT_RELOAD_SPACE"/> : </label>
		<select class="input-sm" id="_mo_time">
			<option value="5">5<spring:message code="COMMON_SECOND"/></option>
			<option value="30">30<spring:message code="COMMON_SECOND"/></option>
			<option value="60">1<spring:message code="COMMON_MINUTE"/></option>
			<option value="300">5<spring:message code="COMMON_MINUTE"/></option>
			<option value="600">10<spring:message code="COMMON_MINUTE"/></option>
		</select>
	</div>
	
	<!-- 하둡 정보 -->
	<div>
		<label><spring:message code="MONIT_HADOOP_INFO"/></label>
		<table id="_mo_gridHadoopInfo"></table>
	</div>
	<!-- 하둡 용량 -->
	<div class="container" style="width:250px; height:150px;">
		<div id="_mo_d3HadoopCapacity" class="monitoring-chart"></div>
	</div>
</div>

<div class="ui-layout-center">
	<div class="container" style="height:200px; text-align:center;">
		<!-- 웹서버 CPU -->
		<div style="width:280px; float:left;">
			<label><spring:message code="MONIT_WEB_SERVER_CPU"/></label>
			<div id="_mo_d3WebCPU" class="monitoring-chart"></div>
		</div>
		<!-- 웹서버 메모리 -->
		<div style="width:280px; float:left;">
			<label><spring:message code="MONIT_WEB_SERVER_MEMORY"/></label>
			<div id="_mo_d3WebMemory" class="monitoring-chart"></div>
		</div>
		<!-- 웹서버 디스크 -->
		<div style="width:260px; float:left;">
			<label><spring:message code="MONIT_WEB_SERVER_DISK"/></label>
			<div id="_mo_d3WebDisk" class="monitoring-chart"></div>
		</div>
	</div>
	
	<div class="container" style="height:200px; text-align:center;">
		<!-- 마스트노드 CPU -->
		<div style="width:280px; float:left;">
			<label><spring:message code="MONIT_MAST_NODE_CPU"/></label>
			<div id="_mo_d3MasterCPU" class="monitoring-chart"></div>
		</div>
		<!-- 마스터노드 메모리-->
		<div style="width:280px; float:left;">
			<label><spring:message code="MONIT_MAST_NODE_MEMORY"/></label>
			<div id="_mo_d3MasterMemory" class="monitoring-chart"></div>
		</div>
		<!-- 마스터노드 디스크 -->
		<div style="width:280px; float:left;"> 
			<label><spring:message code="MONIT_MAST_NODE_DISK"/></label>
			<div id="_mo_d3MasterDisk" class="monitoring-chart"></div>
		</div>
	</div>
</div>


<div class="ui-layout-south display_none">
	<div class="container" style="height:200px; text-align:center;">
		<!-- 데이터노드 목록 -->
		<div style="width:300px; float:left;" >
			<label><spring:message code="MONIT_SERVER_LIST"/></label>
			<table id="_mo_gridDataNode"></table>
		</div>
		<!-- 데이터노드 CPU -->
		<div style="width:280px; float:left;">
			<label><spring:message code="MONIT_SERVER_CPU"/></label>
			<div id="_mo_d3DataNodeCPU" class="monitoring-chart"></div>
		</div>
		<!-- 데이터노드 메모리 -->
		<div style="width:280px; float:left;">
			<label><spring:message code="MONIT_SERVER_MOMORY"/></label>
			<div id="_mo_d3DataNodeMemory" class="monitoring-chart"></div>
		</div>
		<!-- 데이터노드 디스크 -->
		<div style="width:280px; float:left;">
			<label><spring:message code="MONIT_SERVER_DISK"/></label>
			<div id="_mo_d3DataNodeDisk" class="monitoring-chart"></div>
		</div>
	</div>
</div>

<!-- 
	<div class="form-inline">
	  <div class="form-group" style="width:100px;height:100px;border:2px solid red;">
	    <label>Email address</label>
	  </div>
	  <div class="form-group" style="width:100px;height:200px;border:2px solid red;">
	    <label>Password</label>
	  </div>
	</div>
 -->
 
<!-- 엔진 선택 Template -->
<div id="_mo_template_engine" class="display_none">
	<select>
		<option class="_mo_tmpOption"></option>
	</select>
	<img src="/resources/images/common-folder.png" alt="folder" height="16px" class="_mo_folderImage" />
	<img src="/resources/images/common-file.png" alt="folder" height="16px" class="_mo_fileImage" />
</div>