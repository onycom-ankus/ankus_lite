<%@ page contentType="text/html; charset=UTF-8" language="java" trimDirectiveWhitespaces="true" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<div class="ui-layout-west display_none">
	<div>
		<h5><spring:message code="VISUAL_CHART_PARAM"/></h5>
		<button id="_vs_btnNew" class="btn btn-info btn-xs browser_button"><spring:message code="COMMON_NEW"/></button>
		<button id="_vs_btnRun" class="btn btn-info btn-xs browser_button"><spring:message code="COMMON_EXCUTION"/></button>
		<button id="_vs_btnHistory" class="btn btn-info btn-xs browser_button"><spring:message code="COMMON_HISTORY"/></button>
		<button id="_vs_btnDownload" class="btn btn-info btn-xs browser_button"><spring:message code="COMMON_DOWNLOAD"/></button>
		<button id="_vs_btnUpload" class="btn btn-info btn-xs browser_button"><spring:message code="COMMON_UPLOAD"/></button> <input type="file" id="_vs_btnUploadReal" style="display: none !important;" />
	</div>
	<div class="form-inline">
		<label class="form_label"><spring:message code="VISUAL_CLUSTER_NAME"/> : </label>
		<select class="form-control input-sm" id="_vs_clusterName">
		</select>
	</div>
	<div>
		<h5><spring:message code="VISUAL_CHART_LIST"/></h5>
		<img src="/resources/images/visualization/chart/v_pdf.png" data-type="PDFGraph" alt="PDF Graph" data-option="_vs_pdfGraph" class="img-thumbnail _vs_chartIcon" style="cursor: pointer;">
		<img src="/resources/images/visualization/chart/v_box.png" data-type="BoxPlots" alt="Box Plot" data-option="_vs_boxPlot" class="img-thumbnail _vs_chartIcon" style="cursor: pointer;">
		<img src="/resources/images/visualization/chart/v_bar.png" data-type="BarChart" alt="Bar Chart" data-option="_vs_barChart" class="img-thumbnail _vs_chartIcon" style="cursor: pointer;">
		<img src="/resources/images/visualization/chart/v_pie.png" data-type="PieChart" alt="Pie Chart" data-option="_vs_pieChart" class="img-thumbnail _vs_chartIcon" style="cursor: pointer;">
		<img src="/resources/images/visualization/chart/v_scatter.png" data-type="ScatterPlot" alt="Scatter Plot" data-option="_vs_scatterPlot" class="img-thumbnail _vs_chartIcon" style="cursor: pointer;">
		<!-- <img src="/resources/images/visualization/chart/v_tree.png" data-type="TreePlot" alt="Tree Plot" data-option="_vs_treePlot" class="img-thumbnail _vs_chartIcon" style="cursor:pointer;"> -->
		<!-- <img src="/resources/images/visualization/chart/v_graph.png" data-type="ConnectedGraph" alt="Connected Graph" data-option="_vs_connectedGraph" class="img-thumbnail _vs_chartIcon" style="cursor:pointer;"> -->
	</div>
	<div class="form-inline">
		<label class="form_label"><spring:message code="VISUAL_INPUT_PATH"/></label>
		<button id="_vs_btnAddDir" class="btn btn-info btn-xs browser_button"><spring:message code="COMMON_ADD"/></button>
		<button id="_vs_btnRemoveDir" class="btn btn-info btn-xs browser_button"><spring:message code="COMMON_DELETE"/></button>
		<button id="_vs_btnRemoveAllDir" class="btn btn-info btn-xs browser_button"><spring:message code="COMMON_ALL_DELETE"/></button>
	</div>
	<div>
		<h5><spring:message code="VISUAL_FILE_PATH"/></h5>
		<ul id="_vs_paths"></ul>
	</div>
	<div>
		<label class="form_label"><spring:message code="VISUAL_USE_FIRST_RECORD"/></label> <label class="radio-inline"><input type="radio" name="_vs_useFirstRecord" value="true">True</label> <label class="radio-inline"><input type="radio" name="_vs_useFirstRecord" value="false" checked>False</label>
	</div>
	<div class="form-inline">
		<label class="form_label"><spring:message code="VISUAL_SEPER_COLUNM"/>:</label>
		<select class="form-control input-sm" id="_vs_columnDivSel">
			<option value="::"><spring:message code="VISUAL_DOBLE_COLONE"/></option>
			<option value=","><spring:message code="VISUAL_COMMA"/></option>
			<option value="\t"><spring:message code="VISUAL_TAB"/></option>
			<option value="\s"><spring:message code="VISUAL_BLANK"/></option>
			<option value=""><spring:message code="VISUAL_USER_SETTING"/></option>
		</select>
		<input type="text" class="form-control input-sm" id="_vs_columnDivTxt" disabled />
	</div>
	<div class="form-inline">
		<label class="form_label" for="_vs_chartTitle"><spring:message code="VISUAL_CHART_TITLE"/>:</label> <input class="form-control input-sm" id="_vs_chartTitle" type="text" />
	</div>
	<div class="_vs_chartOption" id="_vs_pdfGraph">
		<h5><spring:message code="VISUAL_CHART_PARAM"/><spring:message code="VISUAL_PDF_GRAPH"/></h5>
		<div class="form-inline">
			<label class="form_label"><spring:message code="VISUAL_TARGET_ID_LIST"/>:</label>
			<select class="form-control input-sm" id="_vs_pdfGraph_targetIdListSel">
				<option value="all">all</option>
				<option value="none">none</option>
				<option value=""><spring:message code="VISUAL_USER_SETTING"/></option>
			</select>
			<input class="form-control input-sm" data-selectVal="_vs_pdfGraph_targetIdListSel" id="_vs_pdfGraph_targetIdListTxt" type="text" width="50" disabled value="all" />
		</div>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_pdfGraph_ioi"><spring:message code="VISUAL_INDEX_OF_ID"/>:</label> <input type="text" class="form-control input-sm" id="_vs_pdfGraph_ioi" />
			</div>
			<button id="_vs_pdfGraph_btnIoi" class="btn btn-default _vs_btnOpenFilePreview" data-title="idIndex" data-txt="_vs_pdfGraph_ioi" data-single="true">+</button>
		</div>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_pdfGraph_ioa"><spring:message code="VISUAL_INDEX_OF_AVG"/>:</label> <input type="text" class="form-control input-sm" id="_vs_pdfGraph_ioa" />
			</div>
			<button id="_vs_pdfGraph_btnIoi" class="btn btn-default _vs_btnOpenFilePreview" data-title="avgIndex" data-txt="_vs_pdfGraph_ioa" data-single="true">+</button>
		</div>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_pdfGraph_ios"><spring:message code="VISUAL_INDEX_OF_STD"/> Dev:</label> <input type="text" class="form-control input-sm" id="_vs_pdfGraph_ios" />
			</div>
			<button id="_vs_pdfGraph_btnIos" class="btn btn-default _vs_btnOpenFilePreview" data-title="stddevIndex" data-txt="_vs_pdfGraph_ios" data-single="true">+</button>
		</div>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_pdfGraph_nox"><spring:message code="VISUAL_X_AXIS_NAME"/>:</label> <input type="text" class="form-control input-sm" id="_vs_pdfGraph_nox" />
			</div>
		</div>
	</div>
	<div class="_vs_chartOption display_none" id="_vs_boxPlot">
		<h5><spring:message code="VISUAL_BOX_PLOT"/></h5>
		<div class="form-inline">
			<label class="form_label"><spring:message code="VISUAL_TARGET_ID_LIST"/>:</label>
			<select class="form-control input-sm" id="_vs_boxPlot_targetIdListSel">
				<option value="all">all</option>
				<option value="none">none</option>
				<option value=""><spring:message code="VISUAL_USER_SETTING"/></option>
			</select>
			<input class="form-control input-sm" data-selectVal="_vs_boxPlot_targetIdListSel" id="_vs_boxPlot_targetIdListTxt" type="text" width="50" disabled value="all" />
		</div>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_boxPlot_ioi"><spring:message code="VISUAL_INDEX_OF_ID"/>:</label> <input type="text" class="form-control input-sm" id="_vs_boxPlot_ioi" />
			</div>
			<button id="_vs_boxPlot_btnIoi" class="btn btn-default _vs_btnOpenFilePreview" data-title="idIndex" data-txt="_vs_boxPlot_ioi" data-single="true">+</button>
		</div>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_boxPlot_io0"><spring:message code="VISUAL_INDEX_OF_0Q"/>(Min.):</label> <input type="text" class="form-control input-sm" id="_vs_boxPlot_io0" />
			</div>
			<button id="_vs_boxPlot_btnIo0" class="btn btn-default _vs_btnOpenFilePreview" data-title="minIndex" data-txt="_vs_boxPlot_io0" data-single="true">+</button>
		</div>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_boxPlot_io1"><spring:message code="VISUAL_INDEX_OF_1Q"/>:</label> <input type="text" class="form-control input-sm" id="_vs_boxPlot_io1" />
			</div>
			<button id="_vs_boxPlot_btnIo1" class="btn btn-default _vs_btnOpenFilePreview" data-title="1QIndex" data-txt="_vs_boxPlot_io1" data-single="true">+</button>
		</div>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_boxPlot_io2"><spring:message code="VISUAL_INDEX_OF_2Q"/>(Med.):</label> <input type="text" class="form-control input-sm" id="_vs_boxPlot_io2" />
			</div>
			<button id="_vs_boxPlot_btnIo2" class="btn btn-default _vs_btnOpenFilePreview" data-title="2QIndex" data-txt="_vs_boxPlot_io2" data-single="true">+</button>
		</div>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_boxPlot_io3"><spring:message code="VISUAL_INDEX_OF_3Q"/>:</label> <input type="text" class="form-control input-sm" id="_vs_boxPlot_io3" />
			</div>
			<button id="_vs_boxPlot_btnIo3" class="btn btn-default _vs_btnOpenFilePreview" data-title="3QIndex" data-txt="_vs_boxPlot_io3" data-single="true">+</button>
		</div>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_boxPlot_io4"><spring:message code="VISUAL_INDEX_OF_4Q"/>(Max.):</label> <input type="text" class="form-control input-sm" id="_vs_boxPlot_io4" />
			</div>
			<button id="_vs_boxPlot_btnIo4" class="btn btn-default _vs_btnOpenFilePreview" data-title="maxIndex" data-txt="_vs_boxPlot_io4" data-single="true">+</button>
		</div>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_boxPlot_noy"><spring:message code="VISUAL_Y_AXIS_NAME"/>:</label> <input type="text" class="form-control input-sm" id="_vs_boxPlot_noy" />
			</div>
		</div>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_boxPlot_mvoy"><spring:message code="VISUAL_Y_AXIS_MAX_VAL"/>:</label> <input type="text" class="form-control input-sm" id="_vs_boxPlot_mvoy" />
			</div>
		</div>
	</div>
	<div class="_vs_chartOption display_none" id="_vs_barChart">
		<h5>Bar Chart</h5>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_barChart_ioi"><spring:message code="VISUAL_INDEX_OF_ID"/>:</label> <input type="text" class="form-control input-sm" id="_vs_barChart_ioi" />
			</div>
			<button id="_vs_barChart_btnIoi" class="btn btn-default _vs_btnOpenFilePreview" data-title="xIndex" data-txt="_vs_barChart_ioi" data-single="true">+</button>
		</div>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_barChart_ilov"><spring:message code="VISUAL_INDEX_LIST_OF_VAL"/>:</label> <input type="text" class="form-control input-sm" id="_vs_barChart_ilov" />
			</div>
			<button id="_vs_barChart_btnIlov" class="btn btn-default _vs_btnOpenFilePreview" data-title="yIndexList" data-txt="_vs_barChart_ilov">+</button>
		</div>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_barChart_nox"><spring:message code="VISUAL_X_AXIS_NAME"/>:</label> <input type="text" class="form-control input-sm" id="_vs_barChart_nox" />
			</div>
		</div>
		<div class="form-inline">
			<label class="form_label"><spring:message code="VISUAL_PRINT_VALUE_IN_CHART"/></label> <label class="radio-inline"><input type="radio" name="_vs_barChart_pvic" value="true">True</label> <label class="radio-inline"><input type="radio" name="_vs_barChart_pvic" value="false" checked>False</label>
		</div>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_barChart_mvoy"><spring:message code="VISUAL_Y_AXIS_MAX_VAL"/>:</label> <input type="text" class="form-control input-sm" id="_vs_barChart_mvoy" />
			</div>
		</div>
	</div>
	<div class="_vs_chartOption display_none" id="_vs_pieChart">
		<h5>VISUAL_PIE_CHART Pie Chart</h5>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_pieChart_ioi"><spring:message code="VISUAL_INDEX_OF_ID"/>:</label> <input type="text" class="form-control input-sm" id="_vs_pieChart_ioi" />
			</div>
			<button id="_vs_pieChart_btnIoi" class="btn btn-default _vs_btnOpenFilePreview" data-title="categoryIndex" data-txt="_vs_pieChart_ioi" data-single="true">+</button>
		</div>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_pieGraph_ioi"><spring:message code="VISUAL_INDEX_OF_VAL"/>:</label> <input type="text" class="form-control input-sm" id="_vs_pieChart_iov" />
			</div>
			<button id="_vs_pieChart_btnIov" class="btn btn-default _vs_btnOpenFilePreview" data-title="valueIndex" data-txt="_vs_pieChart_iov" data-single="true">+</button>
		</div>
	</div>
	<div class="_vs_chartOption display_none" id="_vs_scatterPlot">
		<h5><spring:message code="VISUAL_SCATTER_PLOT"/></h5>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_scatterPlot_iox"><spring:message code="VISUAL_X_AXIS_INDEX"/>:</label> <input type="text" class="form-control input-sm" id="_vs_scatterPlot_iox" />
			</div>
			<button id="_vs_scatterPlot_btnIox" class="btn btn-default _vs_btnOpenFilePreview" data-title="xIndex" data-txt="_vs_scatterPlot_iox" data-single="true">+</button>
		</div>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_scatterPlot_nox"><spring:message code="VISUAL_X_AXIS_NAME"/>:</label> <input type="text" class="form-control input-sm" id="_vs_scatterPlot_nox" />
			</div>
		</div>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_scatterPlot_ioy"><spring:message code="VISUAL_Y_AXIS_INDEX"/>:</label> <input type="text" class="form-control input-sm" id="_vs_scatterPlot_ioy" />
			</div>
			<button id="_vs_scatterPlot_btnIoy" class="btn btn-default _vs_btnOpenFilePreview" data-title="yIndex" data-txt="_vs_scatterPlot_ioy" data-single="true">+</button>
		</div>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_scatterPlot_noy"><spring:message code="VISUAL_Y_AXIS_NAME"/>:</label> <input type="text" class="form-control input-sm" id="_vs_scatterPlot_noy" />
			</div>
		</div>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_scatterPlot_ioca"><spring:message code="VISUAL_CLASS_ATTR_INDEX"/>:</label> <input type="text" class="form-control input-sm" id="_vs_scatterPlot_ioca" />
			</div>
			<button id="_vs_scatterPlot_btnIoca" class="btn btn-default _vs_btnOpenFilePreview" data-title="classIndex" data-txt="_vs_scatterPlot_ioca" data-single="true">+</button>
		</div>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_scatterPlot_iods"><spring:message code="VISUAL_DOT_SIZE_INDEX"/>:</label> <input type="text" class="form-control input-sm" id="_vs_scatterPlot_iods" />
			</div>
			<button id="_vs_scatterPlot_btnIods" class="btn btn-default _vs_btnOpenFilePreview" data-title="sizeIndex" data-txt="_vs_scatterPlot_iods" data-single="true">+</button>
		</div>
	</div>
	<div class="_vs_chartOption display_none" id="_vs_treePlot">
		<h5><spring:message code="VISUAL_TREE_PLOT"/></h5> <spring:message code="VISUAL_TREE_PLOT_MSG"/>
	</div>
	<div class="_vs_chartOption display_none" id="_vs_connectedGraph">
		<h5><spring:message code="VISUAL_CONNECTED_GRAPH"/></h5>
		<div class="form-inline">
			<label class="form_label"><spring:message code="VISUAL_GRAPH_TYPE"/>:</label> <label class="radio-inline"><input type="radio" name="_vs_connectedGraph_gt" value="true">Directed</label> <label class="radio-inline"><input type="radio" name="_vs_connectedGraph_gt" value="false" checked>Undirected</label>
		</div>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_connectedGraph_iosn"><spring:message code="VISUAL_START_NODE_INDEX"/>:</label> <input type="text" class="form-control input-sm" id="_vs_connectedGraph_iosn" />
			</div>
			<button id="_vs_connectedGraph_btnIosn" class="btn btn-default _vs_btnOpenFilePreview" data-title="startNodeIndex" data-txt="_vs_connectedGraph_iosn" data-single="true">+</button>
		</div>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_connectedGraph_iosns"><spring:message code="VISUAL_START_NODE_SIZE_INDEX"/>:</label> <input type="text" class="form-control input-sm" id="_vs_connectedGraph_iosns" />
			</div>
			<button id="_vs_connectedGraph_btnIosns" class="btn btn-default _vs_btnOpenFilePreview" data-title="startNodeSize" data-txt="_vs_connectedGraph_iosns" data-single="true">+</button>
		</div>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_connectedGraph_ioen"><spring:message code="VISUAL_END_NODE_INDEX"/>:</label> <input type="text" class="form-control input-sm" id="_vs_connectedGraph_ioen" />
			</div>
			<button id="_vs_connectedGraph_btnIoen" class="btn btn-default _vs_btnOpenFilePreview" data-title="startNodeSize" data-txt="_vs_connectedGraph_iosns" data-single="true">+</button>
		</div>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_connectedGraph_ioens"><spring:message code="VISUAL_END_NODE_SIZE_INDEX"/>:</label> <input type="text" class="form-control input-sm" id="_vs_connectedGraph_ioens" />
			</div>
			<button id="_vs_connectedGraph_btnIoens" class="btn btn-default _vs_btnOpenFilePreview" data-title="endNodeSize" data-txt="_vs_connectedGraph_ioens" data-single="true">+</button>
		</div>
		<div class="form-inline">
			<div class="form-group">
				<label for="_vs_connectedGraph_ioev"><spring:message code="VISUAL_EDGE_VAL_INDEX"/>:</label> <input type="text" class="form-control input-sm" id="_vs_connectedGraph_ioev" />
			</div>
			<button id="_vs_connectedGraph_btnIoev" class="btn btn-default _vs_btnOpenFilePreview" data-title="edgeIndex" data-txt="_vs_connectedGraph_ioev" data-single="true">+</button>
		</div>
		<div class="form-inline">
			<label class="form_label"><spring:message code="VISUAL_EDGE_SIZE_APPLY"/>:</label> <label class="radio-inline"><input type="radio" name="_vs_connectedGraph_aes" value="true">True</label> <label class="radio-inline"><input type="radio" name="_vs_connectedGraph_aes" value="false" checked>False</label>
		</div>
		<div class="form-inline">
			<label class="form_label"><spring:message code="VISUAL_PRINT_NODE_LABLE"/>:</label> <label class="radio-inline"><input type="radio" name="_vs_connectedGraph_pnl" value="true">True</label> <label class="radio-inline"><input type="radio" name="_vs_connectedGraph_pnl" value="false" checked>False</label>
		</div>
		<div class="form-inline">
			<label class="form_label"><spring:message code="VISUAL_EDGE_VAL_PRINT"/>:</label> <label class="radio-inline"><input type="radio" name="_vs_connectedGraph_pev" value="true">True</label> <label class="radio-inline"><input type="radio" name="_vs_connectedGraph_pev" value="false" checked>False</label>
		</div>
	</div>
</div>
<div class="ui-layout-center display_none">
	<div>
		<button id="_vs_btnSaveToImage" class="btn btn-info btn-xs browser_button" disabled><spring:message code="VISUAL_SAVE_IMAGE"/></button>
		<!-- button id="_vs_btnSaveToHtml" class="btn btn-info btn-xs browser_button" disabled>Save to html</button-->
	</div>
	<div>
		<!-- <iframe id="_vs_chart" width=800 height=500></iframe> -->
		<!-- <iframe id="_vs_chart" width=800 height=500 src="/chartFrame"></iframe> -->
		<iframe id="_vs_chart" width=800 height=500 src="about:blank"></iframe>
	</div>
</div>
<div id="_vs_historyModal" class="modal fade" role="dialog">
	<div class="modal-dialog" style="width: 1100px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h5 class="modal-title">Visualization <spring:message code="COMMON_HISTORY"/></h5>
			</div>
			<div class="modal-body" style="height: 450px; overflow-y: scroll;">
				<div class="form-inline" style="margin-bottom: 5px;">
					<div class="form-group">
						<label for="_vs_historyEngine"><spring:message code="VISUAL_ENGINE"/></label>
						<select class="form-control input-sm" id="_vs_historyEngine">
							<option value=""></option>
						</select>
						<label class="form_label" for="_vs_historyStart"><spring:message code="COMMON_START_DTTM"/></label> <input type="text" class="form-control input-sm" id="_vs_historyStart" /> <label class="form_label" for="_vs_historyEnd"><spring:message code="COMMON_END_DTTM"/></label> <input type="text" class="form-control input-sm" id="_vs_historyEnd" /> <label for="_vs_historyStatus"><spring:message code="COMMON_STATUS"/></label>
						<select class="form-control input-sm" id="_vs_historyStatus">
							<option value="ALL"><spring:message code="COMMON_ALL"/></option>
							<option value="RUNNING"><spring:message code="COMMON_RUNNING"/></option>
							<option value="SUCCESS"><spring:message code="COMMON_SUCCESS"/></option>
							<option value="FAIL"><spring:message code="COMMON_FAIL"/></option>
							<option value="KILL"><spring:message code="COMMON_FORCE_QUIT"/></option>
						</select>
						<label class="form_label" for="_vs_historyName"><spring:message code="VISUAL_CHART_TITLE"/></label> <input type="text" class="form-control input-sm" id="_vs_historyName" />
						<button class="btn btn-primary btn-sm" id="_vs_historySearch"><spring:message code="COMMON_SEARCH"/></button>
						<button class="btn btn-primary btn-sm" id="_vs_historyInit"><spring:message code="COMMON_RESET"/></button>
					</div>
				</div>
				<table id="_vs_historyGrid"></table>
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" data-dismiss="modal"><spring:message code="COMMON_CLOSE"/></button>
			</div>
		</div>
	</div>
</div>
<div id="_vs_filePreviewModal" class="modal fade" role="dialog">
	<div class="modal-dialog" style="width: 1000px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title"><spring:message code="VISUAL_FILE_PREVIEW"/> : <small id="_vs_filePreviewSubTitle"></small></h4>
			</div>
			<div class="modal-body">
				<div style="width: 800px; height: 400px; overflow: scroll; float: left;">
					<table id="_vs_filePreviewData"></table>
				</div>
				<div style="width: 150px; height: 400px; overflow: scroll;">
					<table id="_vs_filePreviewColumn"></table>
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" id="_vs_filePreviewOk"><spring:message code="COMMON_CONFIRM"/></button>
				<button class="btn btn-default" data-dismiss="modal"><spring:message code="COMMON_CANCEL"/></button>
			</div>
		</div>
	</div>
</div>
<div id="_vs_historyDetailModal" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<span id="_vs_workPopupTitle"></span>
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title"></h4>
			</div>
			<div class="ui-layout-center">
				<div class="ui-layout-north">
					<ul class="nav nav-tabs" data-selectId="ALL">
						<li id="_vs_workTabHigh_work" class="active">
							<a data-toggle="tab" data-type="_vs_popupWorkFlowHistory_workTab" class="_vs_tab"><spring:message code="VISUAL_WORK"/></a>
						</li>
						<li id="_vs_workTabHigh_action">
							<a data-toggle="tab" data-type="_vs_popupWorkFlowHistory_actionTab" class="_vs_tab"><spring:message code="VISUAL_ACTION"/></a>
						</li>
					</ul>
				</div>
			</div>
			<div id="_vs_popupWorkFlowHistory_workDiv">
				<h4 class="modal-title"><spring:message code="VISUAL_WORK_INFO"/></h4>
				<div class="modal-body">
					<div style="overflow: scroll; height: 300px;">
						<dl class="dl-horizontal">
							<dt><spring:message code="VISUAL_WORK"/> ID:</dt>
							<dd id="_vs_popupWorkTabWorkId"></dd>
							<dt><spring:message code="COMMON_START_DTTM"/>:</dt>
							<dd id="_vs_popupWorkTabStartDate"></dd>
						</dl>
						<hr />
						<dl class="dl-horizontal">
							<dt><spring:message code="VISUAL_WORKFLOW"/> ID:</dt>
							<dd id="_vs_popupWorkTabWorkflowId"></dd>
							<dt><spring:message code="COMMON_END_DTTM"/>:</dt>
							<dd id="_vs_popupWorkTabEndDate"></dd>
						</dl>
						<hr />
						<dl class="dl-horizontal">
							<dt><spring:message code="VISUAL_WORKFLOW_NAME"/>:</dt>
							<dd id="_vs_popupWorkTabWorkflowName"></dd>
							<dt><spring:message code="COMMON_RUNNING_TIME"/>:</dt>
							<dd id="_vs_popupWorkTabElapsed"></dd>
						</dl>
						<hr />
						<dl class="dl-horizontal">
							<dt><spring:message code="COMMON_STATUS"/>:</dt>
							<dd id="_vs_popupWorkTabStatus"></dd>
							<dt><spring:message code="COMMON_PROGRESS_RATE"/>:</dt>
							<dd id="_vs_popupWorkTabCurrentStep"></dd>
						</dl>
						<hr />
						<dl class="dl-horizontal">
							<dt><spring:message code="VISUAL_FINAL_ACTION"/>:</dt>
							<dd id="_vs_popupWorkTabCurrentAction"></dd>
							<dt><spring:message code="VISUASER_USER_NAME"/>:</dt>
							<dd id="_vs_popupWorkTabUsername"></dd>
						</dl>
						<hr />
					</div>
				</div>
				<div class="ui-layout-center">
					<div id="_vs_popupWorkFlowHistoryLow">
						<div class="ui-layout-north">
							<ul class="nav nav-tabs" data-selectId="ALL">
								<li id="_vs_workTabLow_workflowXml" class="active">
									<a data-toggle="tab" data-type="_vs_popupWorkFlowHistory_workXmlTab" class="_vs_tab"><spring:message code="VISUAL_WORKFLOW"/> XML</a>
								</li>
								<li id="_vs_workTabLow_errorLog">
									<a data-toggle="tab" data-type="_vs_popupWorkFlowHistory_errorLogTab" class="_vs_tab"><spring:message code="COMMON_ERROR_LOG"/></a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div id="_vs_popupWorkFlowHistory_workflowXmlDiv">
					<div id="_vs_popupWorkFlowHistory_workflowXmlValue"></div>
				</div>
				<div id="_vs_popupWorkFlowHistory_errorLogDiv" class="display_none">
					<div id="_vs_popupWorkFlowHistory_errorLogCause"></div>
					<div id="_vs_popupWorkFlowHistory_errorLogValue"></div>
				</div>
			</div>
			<div id="_vs_popupWorkFlowHistory_actionDiv" class="display_none">
				<div class="forms">
					<button id="_vs_popupWorkFlowHistory_actionUpdateBtn" class="btn btn-default"><spring:message code="COMMON_REFRESH"/></button>
				</div>
				<table id="_vs_popupWorkFlowHistoryActionTabGrid"></table>
				<h4 class="modal-title"><spring:message code="VISUAL_ACTION_INFO"/></h4>
				<div class="modal-body">
					<div style="overflow: scroll; height: 300px;">
						<dl class="dl-horizontal">
							<dt><spring:message code="VISUAL_ACTION"/> ID:</dt>
							<dd id="_vs_popupActionTabActionId"></dd>
							<dt><spring:message code="COMMON_START_DTTM"/>:</dt>
							<dd id="_vs_popupActionTabStartTime"></dd>
							<dt><spring:message code="COMMON_RUNNING_TIME"/>:</dt>
							<dd id="_vs_popupActionTabEndTime"></dd>
						</dl>
						<hr />
						<dl class="dl-horizontal">
							<dt><spring:message code="VISUAL_WORK"/> ID:</dt>
							<dd id="_vs_popupActionTabworkId"></dd>
							<dt><spring:message code="COMMON_END_DTTM"/>:</dt>
							<dd id="_vs_popupActionTabEndDate"></dd>
							<dt><spring:message code="COMMON_STATUS"/>:</dt>
							<dd id="_vs_popupActionTabStatus"></dd>
						</dl>
						<hr />
						<dl class="dl-horizontal">
							<dt><spring:message code="VISUAL_WORKFLOW"/> ID:</dt>
							<dd id="_vs_popupActionTabworkFlowId"></dd>
							<dt><spring:message code="VISUAL_ACTION_NAME"/>:</dt>
							<dd id="_vs_popupActionTabActionName"></dd>
						</dl>
						<hr />
						<dl class="dl-horizontal">
							<dt><spring:message code="COMMON_LOG_PATH"/>:</dt>
							<dd id="_vs_popupActionTabLogPath"></dd>
						</dl>
						<hr />
					</div>
				</div>
				<div class="ui-layout-center">
					<div id="ds_popupWorkFlowHistoryActionLowTab">
						<div class="ui-layout-north">
							<ul class="nav nav-tabs" data-selectId="ALL">
								<li id="_vs_popupWorkFlowHistory_conmmandTabLi" class="active">
									<a data-toggle="tab" data-type="_vs_popupWorkFlowHistory_conmmandTab" class="_vs_tab"><spring:message code="VISUAL_COMMAND_LINE"/></a>
								</li>
								<li id="_vs_popupWorkFlowHistory_scriptTabLi">
									<a data-toggle="tab" data-type="_vs_popupWorkFlowHistory_scriptTab" class="_vs_tab"><spring:message code="VISUAL_SCRIPT_CONFIG_INFO"/></a>
								</li>
								<li id="_vs_popupWorkFlowHistory_runningLogTabLi">
									<a data-toggle="tab" data-type="_vs_popupWorkFlowHistory_runningLogTab" class="_vs_tab"><spring:message code="VISUAL_EXECUTION_LOG"/></a>
								</li>
								<li id="_vs_popupWorkFlowHistory_errorMessageTabLi">
									<a data-toggle="tab" data-type="_vs_popupWorkFlowHistory_errorMessageTab" class="_vs_tab"><spring:message code="VISUAL_ERROR_MSG"/></a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div id="_vs_popupWorkFlowHistory_conmmandTabDiv">
					<div id="_vs_popupWorkFlowHistory_conmmandTabValue"></div>
				</div>
				<div id="_vs_popupWorkFlowHistory_scriptTabDiv" class="display_none">
					<div id="_vs_popupWorkFlowHistory_scriptTabValue"></div>
				</div>
				<div id="_vs_popupWorkFlowHistory_runningLogTabDiv" class="display_none">
					<div id="_vs_popupWorkFlowHistory_runningLogTabValue"></div>
				</div>
				<div id="_vs_popupWorkFlowHistory_errorMessageTabDiv" class="display_none">
					<div id="_vs_popupWorkFlowHistory_errorMessageValue"></div>
				</div>
			</div>
		</div>
	</div>
</div>
<div id="_vs_template" class="display_none">
	<select>
		<option class="_vs_tmpOption"></option>
	</select>
	<ul>
		<li class="_vs_path" style="cursor: pointer;"></li>
	</ul>
	<img src="/resources/images/Circle_Blue.png" height="15" alt="<spring:message code='COMMON_SUCCESS'/>" class="_vs_historyGridSuccess" />
	<img src="/resources/images/Circle_Red.png" height="15" alt="<spring:message code='COMMON_FAIL'/>" class="_vs_historyGridFail" />
	<img src="/resources/images/Circle_Green.png" height="15" alt="<spring:message code='COMMON_RUNNING'/>" class="_vs_historyGridRunning" />
	<img src="/resources/images/Circle_Red.png" height="15" alt="<spring:message code='COMMON_FORCE_QUIT'/>" class="_vs_historyGridKill" />
</div>