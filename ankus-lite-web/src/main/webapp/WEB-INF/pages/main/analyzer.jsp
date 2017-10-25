<%@ page contentType="text/html; charset=UTF-8" language="java" trimDirectiveWhitespaces="true"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>

<div class="ui-layout-north display_none" id="_an_tabs">
	<!-- 알고리즘 탭 항목들 -->
	<ul class="nav nav-tabs" data-selectId="ALL">
		<li class="active">
			<a data-toggle="tab" data-type="ALL"><spring:message code="ANALYZER_TAB_TITLE_TOTAL" /></a>
		</li>
		<li>
			<a data-toggle="tab" data-type="STATISTICS"><spring:message code="ANALYZER_TAB_TITLE_STATISTICAL_ANALYSIS" /></a>
		</li>
		<li>
			<a data-toggle="tab" data-type="PREPROCESSING"><spring:message code="ANALYZER_TAB_TITLE_PRETREATMENT" /></a>
		</li>
		<li><a data-toggle="tab" data-type="CORRELATION"><spring:message code="ANALYZER_TAB_TITLE_CORRELATION_ANALYSIS"/></a></li>
		<li>
			<a data-toggle="tab" data-type="ASSOCIATION"><spring:message code="ANALYZER_TAB_TITLE_ANALYSIS_OF_ASSOCIATION_RULES" /></a>
		</li>
		<li>
			<a data-toggle="tab" data-type="CLASSIFICATION"><spring:message code="ANALYZER_TAB_TITLE_CLASSIFICATION" /></a>
		</li>
		<li>
			<a data-toggle="tab" data-type="CLUSTERING"><spring:message code="ANALYZER_TAB_TITLE_ASSOCIATION" /></a>
		</li>
		<li><a data-toggle="tab" data-type="RECOMMENDATION"><spring:message code="ANALYZER_TAB_TITLE_RECOMMENDATION"/></a></li>
		<li>
			<a data-toggle="tab" data-type="ETC"><spring:message code="ANALYZER_TAB_TITLE_ETC" /></a>
		</li>
	</ul>

	<!-- 알고리즘 목록 -->
	<div class="tab-content">
		<div id="_an_tab" class="row row-horizon"></div>
	</div>
</div>

<div class="ui-layout-west display_none" id="_an_workflowList_screen" style="width: 250px;">
	<div class="well well-sm"><spring:message code="ANALYZER_WORKFLOW"/></div>
	<!-- 워크 XML 파일 내보내기 버튼 -->
	<img src="/resources/images/fs/hdfs/file-download.png" id="_an_btn_xmlExport" title='<spring:message code="ANALYZER_XML_FILE_EXPORT"/>' />
	<!-- 워크 XML 파일 가져오기  버튼-->
	<img src="/resources/images/fs/hdfs/file-upload.png" id="_an_btn_xmlImport" title='<spring:message code="ANALYZER_XML_FILE_IMPORT"/>' />
	<input type="file" id="_an_xmlImport" style="display: none !important;" />
	<!-- 워크 삭제 버튼 -->
	<img src="/resources/images/fs/hdfs/file-delete.png" id="_an_btn_workflowDelete" title='<spring:message code="COMMON_DELETE"/>' />
	<!-- 워크 새로고침 버튼 -->
	<img src="/resources/images/common-refresh.png" id="_an_btn_workflowRefresh" title='<spring:message code="COMMON_RELOAD"/>' />

	<div class="list-group" id="_an_workflowList" style="width: 250px;">
		<!-- <a href="#" class="list-group-item">First item</a> -->
	</div>
</div>

<div class="ui-layout-center display_none" id="_an_workflowUI">
	<div id="_an_workflow_menu">
		<div class="form-inline">
			<!-- 하둡 엔진 선택 영역 -->
			<label class="form_label"><spring:message code="ANALYZER_HADOOP_CLUSTER" /> : </label>
			<select class="form-control input-sm" id="_an_clusterName" />

			<!-- 워크플로우 이름 입력 -->
			<label><spring:message code="ANALYZER_WORKFLOW_NAME" /> : </label>
			<input type="text" class="form-control input-sm" name="username" id="_an_workflowName" style="width: 200px">
			<br>

			<!-- 워크플로우 ID -->
			<input type="hidden" id="_an_workflowId" name="workflowId" value="">
			<!-- 워크플로우 트리 ID -->
			<input type="hidden" id="_an_treeId" name="treeId" value="">
			<!-- 워크플로우 상세설명 -->
			<input type="hidden" id="_an_description" name="description" value="">
		</div>
		<!-- 상세설명 버튼 -->
		<button type="button" id="_an_btn_desc" class="btn btn-info btn-xs browser_button"><spring:message code="COMMON_DETAIL_EXPLAIN" /></button>
		<!-- 신규 버튼 -->
		<button type="button" id="_an_btn_create" class="btn btn-info btn-xs browser_button"><spring:message code="COMMON_NEW" /></button>
		<!-- 저장 버튼 -->
		<button type="button" id="_an_btn_save" class="btn btn-info btn-xs browser_button"><spring:message code="COMMON_SAVE" /></button>
		<!-- 실행 버튼 -->
		<button type="button" id="_an_btn_run" class="btn btn-info btn-xs browser_button" disabled><spring:message code="COMMON_EXCUTION" /></button>
		<!-- XML보기 버튼 -->
		<button type="button" id="_an_btn_xml" class="btn btn-info btn-xs browser_button" disabled><spring:message code="ANALYZER_XML_VIEW" /></button>
	</div>
	<div id="_an_canvas"></div>
</div>

<!-- 알고리즘 정보 입력 팝업 -->
<div id="_an_workModal" class="modal fade" role="dialog" style="overflow-y: scroll;">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title"><spring:message code="COMMON_DETAIL" /></h4>
			</div>
			<div class="modal-body">
				<!-- 파일 입력 부분 -->
				<div class="form-inline">
					<label>입력경로:</label>
					<button type="button" id="_an_workModal_inAdd" class="btn btn-default"><spring:message code="COMMON_FIND" /></button>
					<!-- 추가 -->
					<button type="button" id="_an_workModal_inText" class="btn btn-default"><spring:message code="COMMON_DIRECT_INPUT" /></button>
					<!-- 직접입력 -->
					<button type="button" id="_an_workModal_inDel" class="btn btn-default"><spring:message code="COMMON_DELETE" /></button>
					<!-- 삭제-->
					<button type="button" id="_an_workModal_inClear" class="btn btn-default"><spring:message code="COMMON_RESET" /></button>
					<!-- 초기화 -->
					<button type="button" id="_an_workModal_inImport" class="btn btn-default"><spring:message code="COMMON_SYNC" /></button>
					<!-- 연결된 노드에서 출력경로 가져와서 입력경로 설정 -->
				</div>
				<!-- 입력 파일 목록 -->
				<div id="_an_workModal_input" class="list-group" id="_an_workModal_input" style="height: 125px; max-height: 125px; overflow-y: auto">
					<!-- <a href="#" class="list-group-item">/</a> -->
				</div>

				<hr />

				<!-- 컬럼 구분자 선택 부분 -->
				<!-- combo 박스 -->
				<div class="form-inline">
					<label class="form_label"><spring:message code="ANALYZER_COLUMN_SEPARATOR" />:</label>
					<select class="form-control input-sm" id="_an_workModal_delimiter">
						<option value="::"><spring:message code="ANALYZER_DOBLE_COLONE" /></option>
						<option value=","><spring:message code="ANALYZER_COMMA" /></option>
						<option value="\t" data-default="true"><spring:message code="ANALYZER_TAB" /></option>
						<option value="\s"><spring:message code="ANALYZER_BLANK" /></option>
						<option value="CUSTOM"><spring:message code="ANALYZER_USER_SETTING" /></option>
					</select>
					<input type="text" class="form-control input-sm" name="delimiterValue" id="_an_workModal_delimiterValue" style="width: 200px">
					<br>
				</div>

				<!-- 파일 미리보기 -->
				<button type="button" id="_an_workModal_preViewBtn" class="btn btn-default" style="width: 100%"><spring:message code="ANALYZER_USER_SETTING" /></button>
				<!-- 파일 미리보기 List -->
				<div style="overflow-x: scroll; overflow-y: scroll; width: 100%; height: 170px; margin-top: 5px">
					<table id="_an_workModal_preViewList" style="width: 100%; height: 100%"></table>
				</div>

				<!-- 출력경로 입력 부분 -->
				<label><spring:message code="ANALYZER_OUTPUT_PATH" /></label>
				<div class="form-inline">
					<input type="text" class="form-control input-sm" name="output" id="_an_workModal_outPath" style="width: 450px">
					<button type="button" id="_an_workModal_outAdd" class="btn btn-default"><spring:message code="COMMON_FIND" /></button>
				</div>
				<hr />

				<label><spring:message code="ANALYZER_PARAMETER_OPTION" /></label>
				<div id="_an_parameter" data-driver="" data-jar="" data-nodeId="">
					<!-- index 멀티 선택  -->
					<!-- index 싱글 선택  -->
					<!-- 텍스트 입력 -->
					<!-- boolean 선택 -->
					<!-- subinput 파일 선택  -->
					<!-- combo 박스 -->
					<!-- delimeter -->
				</div>

			</div>
			<div class="modal-footer">
				<button class="btn btn-default" id="_an_workModal_ok"><spring:message code="COMMON_CONFIRM" /></button>
				<button class="btn btn-default" data-dismiss="modal"><spring:message code="COMMON_CANCEL" /></button>
			</div>
		</div>
	</div>
</div>

<!-- 알고리즘 상세 팝업에서 컬럼 선택 팝업 -->
<div id="_an_filePreviewModal" class="modal fade" role="dialog">
	<div class="modal-dialog" style="width: 280px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button> <small id="_an_filePreviewSubTitle"></small>
			</div>
			<div class="modal-body">
				<div style="width: 250px; height: 400px; overflow: scroll;">
					<table id="_an_filePreviewColumn"></table>
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" id="_an_filePreviewOk"><spring:message code="COMMON_CONFIRM" /></button>
				<button class="btn btn-default" data-dismiss="modal"><spring:message code="COMMON_CANCEL" /></button>
			</div>
		</div>
	</div>
</div>


<!-- 알고리즘 상세 팝업에서 컬럼 선택 팝업 -->
<div id="_an_DBPreviewModal" class="modal fade" role="dialog">
	<div class="modal-dialog" style="width: 280px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title"><spring:message code="ANALYZER_DB_PREVIEW" /> : <small id="_an_DBPreviewSubTitle"></small></h4>
			</div>
			<div class="modal-body">
				<div style="width: 250px; height: 400px; overflow: scroll;">
					<table id="_an_DBPreviewColumn"></table>
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" id="_an_DBPreviewOk"><spring:message code="COMMON_CONFIRM" /></button>
				<button class="btn btn-default" data-dismiss="modal"><spring:message code="COMMON_CANCEL" /></button>
			</div>
		</div>
	</div>
</div>

<!-- 알고리즘 상세 팝업에서 입력경로 직접 입력 팝업 -->
<div id="_an_textInputModal" class="modal fade" role="dialog">
	<div class="modal-dialog" style="width: 300px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title"><spring:message code="ANALYZER_INPUT_PATH_INPUT" /></h4>
			</div>
			<div class="modal-body">
				<div style="width: 270px; height: 40px;">
					<input type="text" class="form-control input-sm" id="_an_modal_textInput">
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" id="_an_textInputOk"><spring:message code="COMMON_CONFIRM" /></button>
				<button class="btn btn-default" data-dismiss="modal"><spring:message code="COMMON_CANCEL" /></button>
			</div>
		</div>
	</div>
</div>

<!-- 워크플로우 설명 입력 팝업 -->
<div id="_an_descriptionInputModal" class="modal fade" role="dialog">
	<div class="modal-dialog" style="width: 300px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title"><spring:message code="ANALYZER_WORKFLOW_EXPLAIN" /></h4>
			</div>
			<div class="modal-body">
				<textarea id="_an_modal_description" style="width: 250px; height: 200px;"></textarea>
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" id="_an_descriptionInputOk"><spring:message code="COMMON_CONFIRM" /></button>
				<button class="btn btn-default" data-dismiss="modal"><spring:message code="COMMON_CANCEL" /></button>
			</div>
		</div>
	</div>
</div>

<!-- 워크플로우 XML 보기 -->
<div id="_an_showXML" class="modal fade" role="dialog">
	<div class="modal-dialog" style="width: 700px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title"><spring:message code="ANALYZER_WORKFLOW_XML" /></h4>
			</div>
			<div class="modal-body">
				<div id="_an_codeXML"></div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" data-dismiss="modal"><spring:message code="COMMON_CONFIRM" /></button>
			</div>
		</div>
	</div>
</div>

<!-- 엔진 선택 Template -->
<div id="_an_template_engine" class="display_none">
	<select>
		<option class="_an_tmpOption"></option>
	</select>
	<img src="/resources/images/common-folder.png" alt="folder" height="16px" class="_an_folderImage" /> <img src="/resources/images/common-file.png" alt="folder" height="16px" class="_an_fileImage" />
</div>

<!-- 알고리즘 메뉴 아이콘 Template -->
<script id="_an_algorithm_menu_template" type="text/x-jsrender">
	<div class="col-xs-6" style="width:85px; font-size:9pt; text-align:center; ">
		<div class="thumb-wrap x-item-selected" id="{{:className}}" tabindex="-1" style="width:80px;">
			<div class="thumb">
				<img src="{{:icon}}" _title="{{:name}}" style="width:60px;height:60px" class="icon_shape" 
					_shape_type="IMAGE" _shape_id="ALG_ANKUS_COMMON_INPUT" _width="60" _height="60">
			</div>
			<span style="word-break:break-word;">{{:name}}</span>
		</div>
	</div>
</script>

<!-- 알고리즘 메뉴 아이콘 Template -->
<script id="_an_param_input_template" type="text/x-jsrender">
	<a href="#" class="list-group-item">{{:path}}</a>
</script>

<!-- 워크플로우 목록  Template -->
<script id="_an_workflow_list_template" type="text/x-jsrender">
	<a href="#" class="list-group-item" data-treeid={{:id}} data-workflowid={{:workflowId}}>{{:text}}</a>
</script>

<!-- 알고리즘 상세 모달에서 파라미터 columnindex Template -->
<script id="_an_param_columnindex_template" type="text/x-jsrender">
	<div class="form-inline" id="_div_{{:name}}" data-type="{{:type}}" data-required="{{:required}}" data-filter="{{:filter}}" data-description="{{:description}}" data-iotype="{{:iotype}}">
		<label style="width:240px">{{:description}}:</label>
		<input type="text" class="form-control input-sm" id="{{:name}}">
		<button id="_btn_{{:name}}" class="btn btn-default" data-single="false">+</button>
	</div>
</script>

<!-- 알고리즘 상세 모달에서 파라미터 columnselect Template -->
<script id="_an_param_columnselect_template" type="text/x-jsrender">
	<div class="form-inline" id="_div_{{:name}}" data-type="{{:type}}" data-required="{{:required}}" data-filter="{{:filter}}" data-description="{{:description}}" data-iotype="{{:iotype}}">
		<label style="width:240px">{{:description}}:</label>
		<input type="text" class="form-control input-sm" id="{{:name}}">
		<button id="_btn_{{:name}}" class="btn btn-default" data-single="true">+</button>
	</div>
</script>

<!-- 알고리즘 상세 모달에서 파라미터 text Template -->
<script id="_an_param_text_template" type="text/x-jsrender">
	<div class="form-inline" id="_div_{{:name}}" data-type="{{:type}}" data-required="{{:required}}" data-filter="{{:filter}}" data-description="{{:description}}" data-iotype="{{:iotype}}">
		<label style="width:240px">{{:description}}:</label>
		<input type="text" class="form-control input-sm" id="{{:name}}" value="{{:values}}">
	</div>
</script>

<!-- 알고리즘 상세 모달에서 파라미터 boolean Template -->
<script id="_an_param_boolean_template" type="text/x-jsrender">
	<div class="form-inline" id="_div_{{:name}}" data-type="{{:type}}" data-required="{{:required}}" data-filter="{{:filter}}" data-description="{{:description}}" data-iotype="{{:iotype}}">
		<label style="width:240px">{{:description}}:</label>
			<label class="radio-inline"><input type="radio" name="{{:name}}" value="{{:values[0].value}}">{{:values[0].option}}</label>
			<label class="radio-inline"><input type="radio" name="{{:name}}" value="{{:values[1].value}}" checked>{{:values[1].option}}</label>
	</div>
</script>

<!-- 알고리즘 상세 모달에서 파라미터 subinput Template -->
<script id="_an_param_subinput_template" type="text/x-jsrender">
	<div class="form-inline" id="_div_{{:name}}" data-type="{{:type}}" data-required="{{:required}}" data-filter="{{:filter}}" data-description="{{:description}}" data-iotype="{{:iotype}}">
		<label style="width:240px">{{:description}}:</label>
		<input type="text" class="form-control input-sm" id="{{:name}}">
		<button id="_btn_{{:name}}" class="btn btn-default _an_btnOpenFilePreview" data-single="true"><spring:message code="COMMON_FIND"/></button>
	</div>
</script>

<!-- 알고리즘 상세 모달에서 파라미터 combo Template -->
<script id="_an_param_combo_template" type="text/x-jsrender">
	<div class="form-inline" id="_div_{{:name}}" data-type="{{:type}}" data-required="{{:required}}" data-filter="{{:filter}}" data-description="{{:description}}" data-iotype="{{:iotype}}">
		<label style="width:240px">{{:description}}:</label>
		<select class="form-control input-sm" id="{{:name}}">
			{{include values}}
				{{for}}
					<option value="{{:value}}">{{:option}}</option>
				{{/for}}
			{{/include}}
		</select>
	</div>
</script>

<!-- 알고리즘 상세 모달에서 파라미터 int Template -->
<script id="_an_param_int_template" type="text/x-jsrender">
	<div class="form-inline" id="_div_{{:name}}" data-type="{{:type}}" data-required="{{:required}}" data-filter="{{:filter}}" data-description="{{:description}}" data-iotype="{{:iotype}}">
		<label style="width:240px">{{:description}}:</label>
		<input type="text" class="form-control input-sm" id="{{:name}}" value="{{:values}}">
	</div>
</script>

<!-- 알고리즘 상세 모달에서 파라미터 xtext Template -->
<script id="_an_param_mtext_template" type="text/x-jsrender">
	<div class="form-inline" id="_div_{{:name}}" data-type="{{:type}}" data-required="{{:required}}" data-filter="{{:filter}}" data-description="{{:description}}" data-iotype="{{:iotype}}">
		<label style="width:240px">{{:description}}:</label>
		<div id="{{:name}}"></div>
	</div>
</script>

<!-- 알고리즘 상세 모달에서 파라미터 delimeter Template -->
<script id="_an_param_delimeter_template" type="text/x-jsrender">
	<div class="form-inline" id="_div_{{:name}}" data-type="{{:type}}" data-required="{{:required}}" data-filter="{{:filter}}" data-description="{{:description}}" data-iotype="{{:iotype}}">
		<label style="width:240px">{{:description}}:</label>
		<select class="form-control input-sm" id="{{:name}}">
			<option value="::"><spring:message code="ANALYZER_DOBLE_COLONE"/></option>
			<option value=","><spring:message code="ANALYZER_COMMA"/></option>
			<option value="\\t" data-default=true><spring:message code="ANALYZER_TAB"/></option>
			<option value="\\s"><spring:message code="ANALYZER_BLANK"/></option>
			<option value="CUSTOM"><spring:message code="ANALYZER_USER_SETTING"/></option>
		</select>
		<input type="text" class="form-control input-sm" id="{{:name}}Value"><br>		
	</div>
</script>

<!-- 알고리즘 상세 모달에서 파라미터 restselect Template -->
<script id="_an_param_restselect_template" type="text/x-jsrender">
	<div class="form-inline" id="_div_{{:name}}" data-type="{{:type}}" data-required="{{:required}}" data-filter="{{:filter}}" data-description="{{:description}}" data-iotype="{{:iotype}}">
		<label style="width:240px">{{:description}}:</label>
		<input type="text" class="form-control input-sm" id="{{:name}}">
		<button id="_btn_{{:name}}" class="btn btn-default" data-single="true">...</button>
	</div>
</script>

<!-- 알고리즘 상세 모달에서 파라미터 restmselect Template -->
<script id="_an_param_restmselect_template" type="text/x-jsrender">
	<div class="form-inline" id="_div_{{:name}}" data-type="{{:type}}" data-required="{{:required}}" data-filter="{{:filter}}" data-description="{{:description}}" data-iotype="{{:iotype}}">
		<label style="width:240px">{{:description}}:</label>
		<input type="text" class="form-control input-sm" id="{{:name}}">
		<button id="_btn_{{:name}}" class="btn btn-default" data-single="false">...</button>
	</div>
</script>