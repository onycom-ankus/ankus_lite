(function analyzer(){
	var canvas = $("#_an_canvas"), opengraphJSON, ele1;
	var nodeData = undefined;
	var algorithmData = undefined;
	
	// 공통 탭 메뉴 이벤트
	$('#_tabAnalyzer').one('click', function(){
		$('#_conAnalyzer')
			.css({
				width : '100%',
				height : '100%'
			})
			.layout({
				north__size : 195,
				inset : {
					top : 10,
					bottom : 10,
					left : 10,
					right : 10
				}
			})
			.show()
		;
		_initCanvas();
		
		_getEngine();
		// 알고리즘 목록 표시
		_requestAlgorithmTap();
		_requestWorkflowList();
		
		_setDelimiter(); // 알고리즘 상세 모달에서 구분자 설정
	});
	
	
	
	// 알고리즘 메뉴 클릭 이벤트
	$('a[data-toggle="tab"]').click(function() {
		  var target = $(this).attr("data-type");
		  selectTab(target);
	});
	
	// 워크플로워 메뉴 버튼 클릭 이벤트
	$("#_an_btn_desc").click(function() { // 상세설명
		_showDescription();
	});
	$("#_an_btn_create").click(function() { // 신규
		ANKUS_API.util.confirm({
			description	: i18nP('JS_ANALYZER_BTN_CREATE'),
			okText : i18nP('JS_ANALYZER_YES'),
			cancelText : i18nP('JS_ANALYZER_NO'),
			callback : function(sel){
				if(sel){ // "예" 이벤트
					_initWorkflow();
				}
			}
		});
	});
	$("#_an_btn_save").click(function() { // 저장		
		_saveWorkflow();
	});
	$("#_an_btn_run").click(function() { // 실행
		_requestRun();
	});
	$("#_an_btn_xml").click(function() { // XML 보기
		_requestCodeXML();
	});
	// 워크플로워 목록에 있는 메뉴 버튼 클릭 이벤트
	$("#_an_btn_xmlExport").click(function() { // XML 내보내기
		_xmlExport();
	});
	$("#_an_btn_xmlImport").click(function() { // XML 가져오기
		$('#_an_xmlImport').trigger('click');
	});
	$('#_an_xmlImport').on('change', _xmlImport); // XML 가져오기 input file 이벤트
	
	$("#_an_btn_workflowDelete").click(function() { // 삭제
		_requestDelWorkflow();
	});
	$("#_an_btn_workflowRefresh").click(function() { // 새로고침
		_requestWorkflowList();
	});
	$("#_an_workflowList").on("click", "a", function(event) { // 워크플로워 목록 클릭 이벤트
		_clickWorkflow(this);
	});
	$("#_an_workflowList").on("dblclick", "a", function(event) { // 워크플로워 목록 더블클릭 이벤트
		_dblClickWorkflow(this);
	});
	
	
	// 알고리즘 상세 팝업 이벤트
	$("#_an_workModal_inAdd").click(function() { // 입력경로 추가
		_searchInputPath();
	});
	$("#_an_workModal_inDel").click(function() { // 입력경로 삭제
		$("#_an_workModal_input .active").remove();
	});
	$("#_an_workModal_inClear").click(function() { // 입력경로 초기화
		$("#_an_workModal_input").empty();
	});
	$("#_an_workModal_inImport").click(function() { // 입력경로 가져오기
		_importInputPath();
	});
	$("#_an_workModal_inText").click(function() { // 입력경로 직접입력
		_showInputTextModal();
	});
	$("#_an_workModal_input").on("click", "a", function(event) { // 입력경로 목록 클릭 이벤트
		$("#_an_workModal_input a").removeClass("active"); // 전체 선택 초기화
		$(this).addClass("active"); // 선택한 위치 활성화 표시
	});
	$("#_an_workModal_outAdd").click(function() { // 출력경로 찾기
		_addOutputPath();
	});
	$("#_an_workModal_delimiter").change(function(){ // 컬럼 구분자 선택 이벤트
		_setDelimiter();
	});
	$("#_an_workModal_preViewBtn").click(function() { // HDFS 미리보기 이벤트
		_requestHDFSPreview();
	});
	$("#_an_workModal_ok").click(function() { // 알고리즘 팝업 확인
		_saveWorkModal();
	});
	$("#_an_textInputOk").click(function() { // 알고리즘 팝업에서 입력경로 팝업 확인
		var text = $("#_an_modal_textInput").val();
		if(text.length > 0){
			_addInputPath(text);
		}
		$('#_an_textInputModal').ankusModal('hide'); // 모달 숨기기
	});
	$("#_an_descriptionInputOk").click(function() { // 상세설명 입력 팝업 확인
		var description = $("#_an_modal_description").val();
		$("#_an_description").val(description);
		$('#_an_descriptionInputModal').ankusModal('hide');
	});
	
	/**
	 * 워크플로워 초기화
	 */
	function _initWorkflow(){
		$("#_an_workflowList a").removeClass("active"); // 워크플로우 선택 활성화 제거
		
		$('#_an_clusterName').val(""); // 엔진ID 초기화
        $("#_an_workflowName").val(""); // 워크플로우 이름 초기화
        $("#_an_workflowId").val(""); // 워크플로우 ID 초기화 
        $("#_an_treeId").val(""); // 트리ID 초기화
        $("#_an_description").val(""); // 워크플로우 상세설명
		
		// 워크플로우 그래프 Clear
        canvas.graph.clear();

        // 디폴트 시작, 끝 노드 드로잉
        _drawDefaultNode();

        // 툴바 버튼 초기화
        $("#_an_btn_run").prop("disabled", true); // 실행 활성화
        $("#_an_btn_xml").prop("disabled", true); // XML보기 활성화
				
	}

	
	/**
	 * 구분자에 따른 텍스트 표시를 설정한다.
	 */
	function _setDelimiter(){
		var delimiter = $("#_an_workModal_delimiter option:selected").val();
		if(delimiter === "CUSTOM"){ // 사용자 지정
			$("#_an_workModal_delimiterValue").val("");
			$("#_an_workModal_delimiterValue").prop("disabled",false);
		}else{
			$("#_an_workModal_delimiterValue").val(delimiter);
			$("#_an_workModal_delimiterValue").prop("disabled",true);
		}
	}
	
	/**
	 * 알고리즘 목록 표시(탭형식)
	 */
	function _requestAlgorithmTap(){
		// 알고리즘 목록 가져오기
		ANKUS_API.ajax({
			url			: '/getmoduleinfos',
			type		: 'POST',
			success		: function(res){
				_resultAlgorithmData(res);
			},
			error : function(xhr, status, error) {
//	        	alert("에러발생");
	        }
		});
	} 

	/**
	 * 서버에서 받은 알고리즘 목록 정보
	 * @param responseData
	 */
	function _resultAlgorithmData(response_text){
		algorithmData = response_text;
		
		// 알고리즘 시작,끝을 위한 nodeData
		nodeData = [
	               {
	                   "type": "START",
	                   "identifier": "START",
	                   "name": "Start",
	                   "minPrevNodeCounts": 0,
	                   "maxPrevNodeCounts": 0,
	                   "minNextNodeCounts": 1,
	                   "maxNextNodeCounts": -1,
	                   "notAllowedPrevTypes": "",
	                   "notAllowedNextTypes": "END,IN,OUT",
	                   "notAllowedPrevNodes": "",
	                   "notAllowedNextNodes": "END",
	                   "className":"START"
	                   	
	               },
	               {
	                   "type": "END",
	                   "identifier": "END",
	                   "name": "End",
	                   "minPrevNodeCounts": 1,
	                   "maxPrevNodeCounts": -1,
	                   "minNextNodeCounts": 0,
	                   "maxNextNodeCounts": 0,
	                   "notAllowedPrevTypes": "START,IN,OUT",
	                   "notAllowedNextTypes": "",
	                   "notAllowedPrevNodes": "START",
	                   "notAllowedNextNodes": "",
	                   "className":"END"
	               },
	    ];
		
		
		for(i=0; i< response_text.length; i++){  
			nodeData.push({
	         	  "type": response_text[i].appgroup,        			  
	         	  "icon": "/getmoduleresource?jarfile=" + encodeURIComponent(response_text[i].path) + "&resource=" + response_text[i].appicon,
	         	  "jobType": "MAPREDUCE",
	         	  "identifier": "ALG_ANKUS_COMMON_INPUT",
	         	  "name": response_text[i].appname,
	         	  "qualifierLabel": response_text[i].classname,
	         	  "description": "ALG_ANKUS_COMMON_INPUT",
	         	  "isCheckColumns": false,
	         	  "fixedInputColumns": false,
	         	  "fixedOutputColumns": false,
	         	  "readOnlyOutputColumns": false,
	         	  "ignoreInput": true,
	         	  "ignoreOutput": true,
	         	  "minPrevNodeCounts": 1,
	         	  "maxPrevNodeCounts": 1,
	         	  "minNextNodeCounts": 1,
	         	  "maxNextNodeCounts": -1,
	         	  "notAlloedPrevTypes": "",
	         	  "notAllowedNextTypes": "",
	         	  "notAllowedPrevNodes": "",
	         	  "notAllowedNextNodes": "",
	         	  "className":response_text[i].classname
	       }); 
		}
		
		selectTab("ALL");
		
	    // 디폴트 시작, 끝 노드 드로잉
//	    setTimeout(function(){_drawDefaultNode(canvas);}, 1000);
	    _drawDefaultNode();
	}
	
	/**
	 * 워크플로우 목록 클릭 이벤트
	 */
	function _clickWorkflow(element){
		$("#_an_workflowList a").removeClass("active"); // 전체 선택 초기화
		$(element).addClass("active"); // 선택한 위치 활성화 표시
	}
	
	/**
	 * 워크플로우 목록 더블 클릭 이벤트
	 */
	function _dblClickWorkflow(element){
		var workflowName = $(element).text();
		var workflowId = $(element).data("workflowid");
		var treeId = $(element).data("treeid");
		ANKUS_API.util.confirm({
			description	: i18nP('JS_ANALYZER_IS_LOADING', workflowName),
			okText : i18nP('JS_ANALYZER_YES'),
			cancelText : i18nP('JS_ANALYZER_NO'),
			callback : function(sel){
				if(sel){ // "예" 이벤트
					_requestLoadWorkflow(workflowName, workflowId, treeId);
				}
			}
		});
	}
	
	/**
	 * 워크플로워 목록을 가져온다
	 */
	function _requestWorkflowList(){
		// 알고리즘 목록 가져오기
		ANKUS_API.ajax({
			url			: '/designer/tree/get',
			data		: {
				_dc : new Date().getTime(),
				type : 'WORKFLOW',
				username : $('#_main_userId').val(),
				node : '/'
			},
			type		: 'GET',
			success		: function(res){
				_resultWorkflowList(res);
			},
			error : function(xhr, status, error) {
//	        	alert("에러발생");
	        }
		});
	} 

	/**
	 * 서버에서 받은 워크플로워 목록 정보
	 * @param responseData
	 */
	function _resultWorkflowList(response_text){
		var resObj = response_text.list;
		if(resObj != undefined){
			var workflowListTemplate = $("#_an_workflow_list_template");
			var resultHtml = workflowListTemplate.render(resObj);
			
			$("#_an_workflowList").empty();
			$("#_an_workflowList").append(resultHtml);
		}
	}
	
	/**
	 * 워크플로워 삭제 요청
	 */
	function _requestDelWorkflow(){
		var selectWorkflow = $("#_an_workflowList > .active"); // 워크플로워 목록에서 선택된 항목
		if(selectWorkflow.length === 0){
			return;
		}
		
		var treeId = selectWorkflow.data("treeid") + "";
		var workflowId = selectWorkflow.data("workflowid") + "";
		var workflowName = selectWorkflow.text();
		
		var graphWorkflowId = $("#_an_workflowId").val();
		
		var isEqualWorkflow = false;
		if(workflowId === graphWorkflowId){ // 선택된 워크플로우와 그래프 쪽과 동일한지 여부 체크
			isEqualWorkflow = true;
		}
		
		ANKUS_API.util.confirm({
			description	: i18nP('JS_ANALYZER_IS_DELETE_WORKFLOW'),
			okText : i18nP('JS_ANALYZER_YES'),
			cancelText : i18nP('JS_ANALYZER_NO'),
			callback : function(sel){
				if(sel){ // "예" 이벤트
					ANKUS_API.ajax({
						url			: '/designer/delete',
						data		: JSON.stringify({
							id: treeId, 
							workflowId: workflowId,
							text: workflowName, 
							nodeType: "", 
							leaf: "false"
						}),
						type		: 'POST',
						success		: function(res){
							_resultDelWorkflow(res, isEqualWorkflow);
						},
						error : function(xhr, status, error) {
	//			        	alert("에러발생");
				        }
					});
				}
			}
		});
	} 

	/**
	 * 서버에서 받은 워크플로워 삭제정보
	 * @param responseData
	 * @param isEqualWorkflow 선택된 워크플로우와 그래프 쪽과 동일한지 여부 체크
	 */
	function _resultDelWorkflow(response, isEqualWorkflow){
		if(response.success === true){ // 삭제 성공
			if(isEqualWorkflow === true){ // 그래프에 있는 워크플로워와 동일하면 초기화
				_initWorkflow();
			}
			_requestWorkflowList();
		}
	}
	
	/**
	 * 워크플로워 정보를 가져온다.
	 * @param 워크플로우 이름
	 * @param 워크플로우 아이디
	 */
	function _requestLoadWorkflow(workflowName, workflowId, treeId){
		//console.log(workflowId);
		ANKUS_API.ajax({
			url			: '/designer/load',
			data		: {
				_dc : new Date().getTime(),
				id : workflowId
			},
			contentType:"text/plain;charset=UTF-8",
			success		: function(res){
				
				_resultLoadWorkflow(workflowName, res, workflowId, treeId);
			},
			error : function(xhr, status, error) {
//			        	alert("에러발생");
	        }
		});
	} 

	/**
	 * 서버에서 받은 워크플로워 정보
	 * @param responseData
	 */
	function _resultLoadWorkflow(workflowName, response, workflowId, treeId){
		//console.log(workflowId);
		var graphXML = response;
		if(graphXML !== undefined){
			 // XML 스트링을 JSON Object 로 변환하여 정보 획득
            var graphJSON = OG.Util.xmlToJson(OG.Util.parseXML(graphXML));
            
            $(graphJSON.opengraph.cell).each(function(i, obj){
            	// 기존 Extjs 호환을 위해 사용
            	if(graphJSON.opengraph.cell[i]["@shapeId"] === "ankus.view.designer.shape.ankus.ALG_ANKUS_COMMON_INPUT"){
            		graphJSON.opengraph.cell[i]["@shapeId"] = "OG.shape.ImageShape";
            	}
            });
            
            var workflowData = OG.JSON.decode(unescape(graphJSON.opengraph['@data']));

            var obj = workflowData.workflow;
           
            
            //var engineId = obj.engine_id;
            //var workflowId = obj.id;        
            //var workflowName = obj.name;           
            //var treeId = obj.tree_id;
            var description = obj.desc;           
            // 워크플로우 정보 로딩(클러스터, 워크플로우명, 설명, 워크플로우 식별자, 트리 식별자)
            //$('#_an_clusterName').val(engineId); // 엔진ID 설정
            $("#_an_workflowName").val(workflowName); // 워크플로우 이름 설정
            $("#_an_workflowId").val(workflowId); // 워크플로우 ID 설정
	        $("#_an_treeId").val(treeId); // 워크플로우 트리 ID 설정
	        $("#_an_description").val(description); // 워크플로우 상세설명
	        
	        $("#_an_btn_run").prop("disabled", false); // 실행 활성화
	        $("#_an_btn_xml").prop("disabled", false); // XML보기 활성화
	        
            // 워크플로우 그래프 Shape 로딩
            canvas.graph.loadJSON(graphJSON);
            
            // 이벤트 등록
            var elements = canvas.graph.getElementsByType();
			$.each(elements, function(i, element){
				var shape = $(element).attr("_shape");
				if(shape == "IMAGE"){ // IMAGE
					// node 더블클릭 이벤트
					$(element).dblclick(function() { 
	                	_showAlgorithmModal(this);
                	});
				}
			});
            
		}
	}
	
	/**
	 * HDFS 파일 로우 정보를 가져온다.
	 */
	function _requestHDFSPreview(){
		var inputPath = $("#_an_workModal_input .active").text();
		var engineId = $('#_an_clusterName').val();
		var delimiter = $("#_an_workModal_delimiterValue").val();
		
		ANKUS_API.ajax({
			url			: '/designer/previewHDFSFile_tab',
			data		: {
				_dc : new Date().getTime(),
				inputPath:inputPath,
				delimiter:delimiter,
				engineId:engineId,
				page:1,
				start:0,
				limit:25
			},
			type		: 'GET',
			success		: function(res){
				_resultHDFSPreview(res);
			},
			error : function(xhr, status, error) {
//	        	alert("에러발생");
	        }
		});
	} 

	/**
	 * 서버에서 받은 파일 로우 정보
	 * @param responseData
	 */
	function _resultHDFSPreview(response_text){
		_setPreview(response_text.list);
	}
	
	/**
	 * 알고리즘 종류에 따른 표시할 데이터 설정하기
	 */
	function getAlgorithmFilter(filter){
		var result = "";
    
    	var menu = []; // 화면에 표시할 메뉴 정보
		$(nodeData).each(function(index){
			var obj = this;
			var objType = obj.type; // 메뉴목록에서 종류를 가져온다.
			// START, END는 제거
			if(objType === "START" || objType === "END"){
				return true;
			}
			
			if(filter === "ALL"){
				if(objType != "CORRELATION" && objType != "RECOMMENDATION"){
					menu.push(obj);
				}				
			}else{
				if(filter === objType){
					menu.push(obj);
				}
			}
		});
		
		
		var tabTemplate = $("#_an_algorithm_menu_template");
		
		if(menu.length > 0 ){
			result = tabTemplate.render(menu);
		}
		
		return result;
    }
	
	/**
	 * ID에 해당하는 알고리즘 Object를 리턴한다.
	 */
	function getAlgorithm(title){
		var result = undefined;
    
		$(nodeData).each(function(index){
			var obj = this;
			
			if(obj.name === title){
				result = obj;
				return false;
			}
		});
		
		return result;
    }

	/**
	 * 알고리즘 탭 선택 이벤트
	 */
	function selectTab(type){
		$("#_an_tab").empty();
		if(type != undefined){
			$("#_an_tab").append(getAlgorithmFilter(type));
		}
		
		// 탭에 가로 사이즈를 지정한다.
		var tabList = $("#_an_tab > div");
		var tabCount = tabList.length;
		if(tabCount > 0){
			var tabWidth = tabList.eq(0).css("width");
			var tabAllWidth = tabWidth.replace("px", "") * tabCount;
			
			$("#_an_tab").css("width", tabAllWidth+"px"); // 전체 가로 사이즈를 설정한다.
			$("#_an_tab").css("height", "77px"); // 전체 가로 사이즈를 설정한다.
		}
		
		
		
		// Shape drag & drop
    	$(".icon_shape").draggable({
    		start   : function () {
    			$('#_an_canvas').data('DRAG_SHAPE', {
    				'_shape_type': $(this).attr('_shape_type'),
    				'_shape_id'  : $(this).attr('_shape_id'),
    				'_width'     : $(this).attr('_width'),
    				'_height'    : $(this).attr('_height'),
    				'_img'    : $(this).attr('src'),
    				'_title'    : $(this).attr('_title')
    			});
    			console.log($('#_an_canvas').data('DRAG_SHAPE'));
    		},
    		helper  : 'clone',
    		appendTo: "#_an_canvas"
    	});
	}

	/**
	 * 워크플로워 Canvas 초기설정
	 */
	function _initCanvas(){
	    var canvasWidth = $('#_an_workflowUI').width();
	    var canvasHeight = $('#_an_workflowUI').height() - $("#_an_workflow_menu").height(); // 워크플로우 높이에서 클러스터선택,메뉴부분 높이를 뺀다
	    
//	    console.log(canvasWidth);
//	    console.log(canvasHeight);
	    canvas.graph = new OG.Canvas('_an_canvas', [canvasWidth, canvasHeight], 'white', 'url(/resources/images/wallpapers/white.jpg)');
	 // OpenGraph 디폴트 스타일 설정
	    canvas.graph._CONFIG.DEFAULT_STYLE.EDGE = {
	        'stroke': 'blue',
	        'stroke-width': 1,
	        'stroke-opacity': 1,
	        'edge-type': 'bezier',
	        'edge-direction': 'c c',
	        'arrow-start': 'none',
	        'arrow-end': 'classic-wide-long',
	        'stroke-dasharray': '',
	        'label-position': 'center'
	    };

	    canvas.graph.initConfig({
	        selectable       : true,
	        dragSelectable   : false,
	        movable          : true,
	        resizable        : false,
	        connectable      : true,
	        selfConnectable  : false,
	        connectCloneable : false,
	        connectRequired  : true,
	        labelEditable    : false,
	        groupDropable    : false,
	        collapsible      : false,
	        enableHotKey     : true,
	        enableContextMenu: false
	    });
	    
	    $("#_an_canvas").droppable({
	        drop: function (event, ui) {
	        	
	            var shapeInfo = $('#_an_canvas').data('DRAG_SHAPE'), shape, element;
	            if (shapeInfo) {
	                shape = new OG.ImageShape(shapeInfo._img, shapeInfo._title);
//	            	console.log(shape);
//	            	console.log(shapeInfo);
	                
	                var navMenuWidth = $("#_main_tabmenu").width(); // 화면 메뉴 가로
	                var navMenuHeight = $("#_main_tabmenu")[0].offsetHeight // 화면 메뉴 세로
	                var algorithmHeight = $("#_an_tabs")[0].offsetHeight; // 알고리즘 메뉴 세로
	                var workflowMenuHeight = $("#_an_workflow_menu")[0].offsetHeight; // 워크플로워 메뉴 높이
	                var workflowListWidth = $("#_an_workflowList_screen").width(); // 워크플로워 목록 가로
	                var isWorkflowListVisible = $("#_an_workflowList_screen").is(':visible'); // 워크플로워 목록 표시 여부
	               
	                var offsetX = 0;
	                var offsetY = 0;
	                
	                offsetY = navMenuHeight + algorithmHeight + workflowMenuHeight;
	                if(isWorkflowListVisible === true){ // 워크플로우 목록 표시 여부
	                	offsetX = workflowListWidth;
	                }
	                
	                offsetX = offsetX + (shapeInfo._width/2);
	                offsetY = offsetY + (shapeInfo._height/2);
	                
	                shapeElement = canvas.graph.drawShape([
	                    //event.pageX - $('#_an_canvas')[0].offsetLeft + $('#_an_canvas')[0].scrollLeft,
	                    //event.pageY - $('#_an_canvas')[0].offsetTop + $('#_an_canvas')[0].scrollTop],
	                    event.pageX - offsetX,
	                    event.pageY - offsetY],
	                        shape, [parseInt(shapeInfo._width, 0), parseInt(shapeInfo._height, 0)]);
	                
	                // 노드 정보 셋팅
	                var nodeMeta = getAlgorithm(shapeInfo._title);
//	                console.log(nodeMeta);
	                canvas.graph.setCustomData(shapeElement, {
	                    metadata: nodeMeta,
	                    properties: nodeMeta.defaultProperties || {},
	                    isValidated: false
	                });
	                
	                $('#_an_canvas').removeData('DRAG_SHAPE');
	                
	                // node 더블클릭 이벤트
	                $(shapeElement).dblclick(function() {
//	                	console.log(shapeElement);
	                	_showAlgorithmModal(this);
                	});
	            }
	        },
	        activate: function(event, ui){ // 이동 시작
	        	$("#_an_workflowUI").css("overflow", "visible"); // 아이콘 드래그시 아이콘 숨겨져 보이는 현상 표시를 위한 코드
	        },
	        deactivate: function(event, ui){ // 이동 끝난 후
	        	$("#_an_workflowUI").css("overflow", "auto");  // 아이콘 드래그시 아이콘 숨겨져 보이는 현상 표시를 위한 코드
	        },
	    });
	    
	    // Shape 이 처음 Draw 되었을 때의 이벤트 리스너
	    canvas.graph.onDrawShape(function (event, shapeElement) {
		//console.log('onDrawShape', shapeElement);
	    });

	    // Shape 이 Redraw 되었을 때의 이벤트 리스너
	    canvas.graph.onRedrawShape(function (event, shapeElement) {
	    //console.log('onRedrawShape', shapeElement);
	    });

	    // Shape 이 Remove 될 때의 이벤트 리스너
	    canvas.graph.onRemoveShape(function (event, shapeElement) {
	    //console.log('onRemoveShape', shapeElement);
	    });

	    // Shape 이 Move 되었을 때의 이벤트 리스너
	    canvas.graph.onMoveShape(function (event, shapeElement, offset) {
	    //console.log('onMoveShape', shapeElement, offset);
	    });

	    // Shape 이 Resize 되었을 때의 이벤트 리스너
	    canvas.graph.onResizeShape(function (event, shapeElement, offset) {
	    //console.log('onResizeShape', shapeElement, offset);
	    });

	    // Shape 이 Connect 되었을 때의 이벤트 리스너
	    canvas.graph.onConnectShape(function (event, edgeElement, fromElement, toElement) {
	    //console.log('onConnectShape', edgeElement, fromElement, toElement);
	    });

	    // Shape 이 Disconnect 되었을 때의 이벤트 리스너
	    canvas.graph.onDisconnectShape(function (event, edgeElement, fromElement, toElement) {
	    //console.log('onDisconnectShape', edgeElement, fromElement, toElement);
	    });
	}
	
	/**
	 * 엔진 선택을 위한 엔진 정보 가져오기
	 */
	var _getEngine = function(){
		ANKUS_API.ajax({
			url			: '/admin/engine/engines',
			data		: {
				_dc : new Date().getTime(),
				type : 'HADOOP',
				username : $('#_main_userId').val(),
				page : 1,
				start : 0,
				limit : 25,
			},
			success		: function(res){
				var list = res.list;
				var tmpOption = $('#_an_template_engine ._an_tmpOption')[0].outerHTML;
				
				$(list).each(function(index, obj){
					$(tmpOption).val(obj.id).text(obj.instanceName).data('obj', obj).appendTo('#_an_clusterName');
				});
			}
		});
	};

	/**
     * 워크플로우 그래프 XML 을 생성한다.
     * @params type 종류 0:신규, 1:수정
     * @return {String}
     */
    function _makeGraphXML(type) {
        var variableArray = []; // 사용안함
        
        var engineId = $('#_an_clusterName').val();
        var workflowName = $("#_an_workflowName").val();
        var workflowId = $("#_an_workflowId").val(); // 수정시 사용 
        var treeId = $("#_an_treeId").val(); // 수정시 사용
        var description = $("#_an_description").val();
        
        if(type == 0){ // 신규
        	workflowId = "";
        	treeId = "";
        }
        
        var workflow = {
    		"workflowEngineCombo":parseInt(engineId), // 엔진ID
    		"name":workflowName, //워크플로워명
    		"org_name":"",
    		"id":"",
    		"tree_id":treeId,
    		"status":"",
    		"workflow_id":workflowId,
    		"engine_id":engineId,   // 엔진ID
    		"desc":description
        };
        
        canvas.graph.setCustomData(canvas.graph.getRootGroup(), {
            workflow: workflow,
            globalVariables: variableArray
        });
        
        return canvas.graph.toXML();
    }
    
    /**
     * 워크플로우를 저장한다.
     */
    function _saveWorkflow(){ 
    	var engineId = $('#_an_clusterName').val();
        var workflowName = $("#_an_workflowName").val();
        var username = $('#_main_userId').val();
        var workflowId = $("#_an_workflowId").val(); // 수정시 사용
        var treeId = $("#_an_treeId").val(); // 수정시 사용
        var parentTreeId = "/";
		
		if(_isValidWorkflow() === 1){
			ANKUS_API.util.alert(i18nP("JS_ANALYZER_NODE_CONNECT_CHECK"));
			return;
		}else if(_isValidWorkflow() === 2){ // 노드 입력 필수값 없는 경우
			return;
		}
		
		if(workflowName.length == 0){
			ANKUS_API.util.alert(i18nP("JS_ANALYZER_INPUT_WORKFLOW"));
			return;
		}
		if(engineId.length == 0){
			ANKUS_API.util.alert(i18nP("JS_ANALYZER_SELECT_HADOOP_CLUSTER"));
			return;
		}
		
		if(workflowId.length > 0){ // 수정
			ANKUS_API.util.confirm({
				description	: i18nP("JS_ANALYZER_IS_UPDATE_WORKFLOW"),
				okText : i18nP('JS_ANALYZER_YES'),
				cancelText : i18nP('JS_ANALYZER_NO'),
				callback : function(sel){
					if(sel){ // "예" 이벤트
						ANKUS_API.ajax({
							url			: '/designer/status',
							data		: {
								workflowId : workflowId,
							},
							success		: function(res){
								if(res.success === true){
									if(res.map.id !== undefined){ // 존재하면 수정가능
										_requestSave(1);
									}
								}
							}
						});
					}
				}
			});
		}else{ // 신규
			_requestSave(0);
		}
    }
	
    /**
     * 워크플로워 저장하기 요청
     * @param type 모드 0:신규, 1:수정
     */
	function _requestSave(type) {
		var engineId = $('#_an_clusterName').val();
        var workflowName = $("#_an_workflowName").val();
        var username = $('#_main_userId').val();
        var workflowId = $("#_an_workflowId").val(); // 수정시 사용
        var treeId = $("#_an_treeId").val(); // 수정시 사용
        var parentTreeId = "/";
        var xml = _makeGraphXML(type); // 워크플로우 canvas.graph 데이터를 xml로 만들기
        
        if(type === 0){ // 신규        	
        	workflowId = "";
        	treeId = "";
        }else if(type === 1){ // 수정
        }
        _requestWorkflowList(); 
        
		var params = "id="+workflowId+"&workflowId="+""+"&treeId="+treeId+"&parentTreeId="+parentTreeId
			+"&username="+username+"&workflowName="+workflowName+"&cluster="+"";
	
		ANKUS_API.ajax({
			url	: '/designer/save?'+params,
			contentType:"application/xml;charset=UTF-8",
			data : xml,
			type		: 'POST',
			success		: function(res){
				_resultSave(res, type);
			},
			error : function(xhr, status, error) {
//        		alert("에러발생");
			}
		});
	}
	
	/**
	 * 워크플로워 저장하기 결과처리
	 * @param res 서버에서 받은 정보
	 * @param type 종류 0:신규, 1:수정
	 */
	function _resultSave(res, type){
		if(res.success === true){ // 성공
			var obj = res.map;
			
			var workflowName = obj.name;
			var workflowId = obj.id;
			var treeId = obj.tree_id;
			
			$("#_an_workflowId").val(workflowId); // 워크플로우 ID 설정
	        $("#_an_treeId").val(treeId); // 워크플로우 트리 ID 설정
	        
	        if(type === 0){ // 신규
	        	ANKUS_API.util.toast("워크플로우 \"" + workflowName + "\" 저장하였습니다.");
	        }else if(type === 1){ // 수정
	        	ANKUS_API.util.toast("워크플로우 \"" + workflowName + "\" 수정하였습니다.");
	        }
	        
	        $("#_an_btn_run").prop("disabled", false); // 실행 활성화
	        $("#_an_btn_xml").prop("disabled", false); // XML보기 활성화
	        
	        _requestWorkflowList();
		}else{ // 실패
		}
	}
	
	/**
	 * 워크플로워 알고리즘 상세 모달을 띄운다.
	 */
	function _showAlgorithmModal(element){
    	$('#_an_workModal').ankusModal();
    	$('#_an_workModal').ankusModal('show');
    	
    	_initWorkModal(); // 상세 화면 초기화
    	_setWorkModalParams(element); // 파라미터 정보 설정
	}
	
	/**
	 * 노드 모달 초기화
	 */
	function _initWorkModal(){
		$("#_an_workModal_input").empty(); // 입력경로 초기화
		$("#_an_workModal_outPath").val("") // 출력경로 초기화

		$('#_an_workModal_delimiter').val(function(){return $(this).find('[data-default="true"]').val() || $(this).find('option:first').val()}).trigger('change')

		$("#_an_parameter").empty(); // 파라미터 정보 초기화
		
		$("#_an_workModal_preViewList").GridUnload(); // 미리보기 초기화
	}
	
	/**
	 * 파라미터 정보를 설정한다.
	 */
	function _setWorkModalParams(element){
		var node = canvas.graph.getCustomData(element);
		var nodeMeta = node ? node.metadata : null;
		var nodeProperty = node ? node.properties : null;
		
		if(nodeMeta != null){
			$("#_an_workModal .ankusModal-title").text(nodeMeta.name); // 팝업 제목 설정
			
			if(nodeMeta.identifier === "ALG_ANKUS_COMMON_INPUT"){ // 동적 생성된 파라미터인 경우
				$(algorithmData).each(function(index, obj){
					if(obj.classname === nodeMeta.className){ // 정보 매핑
						$("#_an_parameter").data("driver", obj.classname);
						$("#_an_parameter").data("jar", obj.nexus);
						$("#_an_parameter").data("nodeId", element.id);
						//console.log(obj.params);
						$(obj.params).each(function(i, param){ // 파라미터 정보들
							// 템플릿 설정
							var template = undefined;
							if(param.type === "columnindex"){ // 컬럼 다중선택
								template = $("#_an_param_columnindex_template");
							}else if(param.type === "columnselect"){ // 컬럼 1개선택
								template = $("#_an_param_columnselect_template");
							}else if(param.type === "text"){ // 텍스트 입력
								template = $("#_an_param_text_template");
							}else if(param.type === "boolean"){ // 조건
								template = $("#_an_param_boolean_template");
							}else if(param.type === "subinput"){ // 파일 찾기
								template = $("#_an_param_subinput_template");
							}else if(param.type === "combo"){ // 리스트 선택 박스
								template = $("#_an_param_combo_template");
							}else if(param.type === "delimeter"){ // 구분자
								template = $("#_an_param_delimeter_template");
							}else if(param.type === "int"){ // 텍스트 입력인데 int형
								template = $("#_an_param_int_template");
							}else if(param.type === "mtext"){ // 스크립트형 
								template = $("#_an_param_mtext_template");
							}else if(param.type === "restselect"){ // 컬럼 다중선택
								template = $("#_an_param_restselect_template");
							}else if(param.type === "restmselect"){ // 컬럼 1개선택
								template = $("#_an_param_restmselect_template");
							}
							
							var resultHtml = template.render(param);
							$("#_an_parameter").append(resultHtml);							
							// 이벤트
							if(param.type === "columnindex" || param.type === "columnselect"){ // 컬럼 싱글 및 다중선택
								var target = param.name;
								$("#_btn_" + target).click(function() { // 컬럼 선택 버튼 이벤트
									_requestColumnPreview(target);
								});
								$("#"+target).keyup(function() { // "숫자",","만 입력되도록 함
									$(this).val( $(this).val().replace(/[^0-9,]/gi,"") );
								});
							}else if(param.type === "text"){ // 텍스트 입력
							}else if(param.type === "int"){ // 텍스트 입력 int형
								$("#"+target).keyup(function() { // "숫자"만 입력되도록 함
									$(this).val( $(this).val().replace(/[^0-9]/gi,"") );
								});
							}else if(param.type === "combo"){ // 리스트 선택 박스
								var target = param.name;
								$("#"+target).change(function() {
									_setWorkModalFilter();
								});
							}else if(param.type === "boolean"){ // 조건
								var target = param.name;
								$("input[type=radio][name=" + target +"]").change(function() {
									_setWorkModalFilter();
							    });
							}else if(param.type === "subinput"){ // 파일 찾기
								var target = param.name;
								$("#_btn_" + target).click(function() { // 컬럼 선택 버튼 이벤트
									var engineId = $('#_an_clusterName').val();
									if(engineId){
										ANKUS_API.util.fileSystemBrowser({
											engineId : engineId,
											onClick : function(v){
												if(v){
													$("#"+target).val(v);						
												}					
											}
										});
									}
								});
							}else if(param.type === "delimeter"){ // 구분자
								var target = "#" + param.name;
								$(target).change(function(){ // 컬럼 구분자 선택 이벤트
									var delimiter = $(target+" option:selected").val();
									if(delimiter === "CUSTOM"){ // 사용자 지정
										$(target+"Value").val("");
										$(target+"Value").attr("disabled",false);
									}else{
										$(target+"Value").val(delimiter);
										$(target+"Value").attr("disabled",true);
									}
								});
								
								$(target).val(function(){ // 초기값 설정
									return $(this).find('[data-default="true"]').val() || $(this).find('option:first').val()
								}).trigger('change');
							}else if(param.type === "mtext"){ // 코드형 텍스트
								var target = "#" + param.name;
								setTimeout(function(){
									$(target).ankusCode({
										value : "",
										readOnly : false,
										autofocus : false
									});
								}, 500);
							}else if(param.type === "restselect" || param.type === "restmselect"){ // 컬럼 싱글 및 다중선택
								var target = param.name;
								$("#_btn_" + target).click(function() { // 컬럼 선택 버튼 이벤트
									_requestDBPreview(target);
								});
								$("#"+target).keyup(function() { // "숫자",","만 입력되도록 함
									$(this).val( $(this).val().replace(/[^0-9,]/gi,"") );
								});
							}
						});
						return false;
					}
				});
				
				if(nodeProperty != undefined){ // 기존에 설정한 값이 있는 경우 설정한다.
					//console.log(nodeProperty);
					
					$.each(nodeProperty, function(key, value ) {
//						console.log("key = " + key + " value = " + value);
						if(key === "input"){ // 입력
							var inputs = value.split(",");
							$(inputs).each(function(i, obj){
								_addInputPath(obj);
							});
						}else if(key === "output"){ // 출력
							$("#_an_workModal_outPath").val(value);	
						}else if(key === "delimiter"){ // 컬럼구분자
							$delimiter = $("#_an_workModal_delimiter");
							$delimiterValue = $("#_an_workModal_delimiterValue");
							
							$delimiter.val(value); // 해당 위치로 변경
							if(value === "CUSTOM"){
								$delimiterValue.prop("disabled",false);
							}else{
								$delimiterValue.prop("disabled",true);
								$delimiterValue.val(value);
							}
						}else if(key === "delimiterValue"){ // Custom 컬럼구분자
							$("#_an_workModal_delimiterValue").val(value);
						}else if(key === "driver" || key === "jar"){ // drive, jar
						}else{
							var target = "#"+key;
							var type = $("#_div_" + key).data("type");
							if(type === "boolean"){
								$("#_an_parameter input:radio[name="+key+"]").prop("checked", false);
								$("#_an_parameter input:radio[name="+key+"]:radio[value="+value+"]").prop("checked", true);
							}else if(type === "delimeter"){
								if(value === "CUSTOM"){
									$(target).val(value);
									$(target+"Value").prop("disabled",false);
									$(target+"Value").val(nodeProperty[key+"Value"]);
								}else{
									$(target).val(value);
									$(target+"Value").prop("disabled",true);
									$(target+"Value").val(value);
								}
							}else if(type === "mtext"){
								setTimeout(function(){
									var editor = $(target + " > .CodeMirror")[0].CodeMirror;
									editor.setValue(value);
								}, 500);
							}
							$(target).val(value);
						}
					});
				}
				
				_setWorkModalFilter(); // filter 적용
			}else{ // 정적인 파라미터
			}
		}
		
//		console.log(node);
//		console.log(nodeMeta);
//		console.log(nodeProperty);
//		
//    	console.log(nodeData);
//    	console.log(algorithmData);
	}
	
	/**
	 * 워크플로워 모달 저장
	 */
	function _saveWorkModal(){
		if(_isWorkModalValid() === false){ // 필수값 유효성 체크
			return;
		}
		var properties = {};
		var str_display ;
		
		$("#_an_parameter > div:visible").each(function(i,div){
			var id = $(div).attr("id");
			id = id.replace("_div_", "");
			var type = $(div).data("type");
			var required = $(div).data("required");
			var filter = $(div).data("filter");
			
//			console.log("id = " + id);
//			console.log("type = " + type);
//			console.log("required = " + required);
//			console.log("filter = " + filter);
			
			if(type === "delimeter"){ // 구분자 타입
				var delimeter = $("#"+id).val();
				if(delimeter === "CUSTOM"){
					properties[id] = delimeter;
					properties[id+"Value"] = $("#"+id+"Value").val();
				}else{
					properties[id] = delimeter;	
				}
			}else if(type === "boolean"){
				properties[id] = $("#_an_parameter input:radio[name="+ id +"]:checked").val();
			}else if(type === "mtext"){
				var editor = $("#" + id + " > .CodeMirror")[0].CodeMirror;
				properties[id] = editor.getValue();
			}else{
				properties[id] = $("#"+id).val();
			}
			
			var check_d ;
			check_d = $(div).data("iotype");
			
			if(check_d == 'D'){
				str_display = id;
			}
			
		});
		
		var input = "";
		$("#_an_workModal_input a").each(function(i){
			 if(i === 0){
				input = $(this).text();
			 }else{
				input = input +"," + $(this).text();
			 } 
		});
		
		if(str_display != undefined && str_display != ''){
			properties["display"] = str_display;
		}
		
		properties["input"] = input;
		properties["output"] = $("#_an_workModal_outPath").val();
		properties["jar"] = $("#_an_parameter").data("jar");
		properties["driver"] = $("#_an_parameter").data("driver");		

		var delimiter = $("#_an_workModal_delimiter option:selected").val();
		properties["delimiter"] = delimiter;
		if(delimiter === "CUSTOM"){
			properties["delimiterValue"] = $("#_an_workModal_delimiterValue").val();
		}
		
		var nodeId = $("#_an_parameter").data("nodeId");
		
		var node = canvas.graph.getCustomData(nodeId); // 노드 가져오기
		//console.log(properties);
		
		node.properties = properties;
		node.filteredProperties = _getFilteredProperties(properties);
		node.isValidated = true;
        canvas.graph.setCustomData(nodeId, node); // 노드 값 설정
		
		$('#_an_workModal').ankusModal('hide'); // 모달 숨기기
	}
	
	/**
	 * 엔진에서 실행시 사용할 filteredProperties를 설정한다.
	 */
	function _getFilteredProperties(properties){
		var filtered = properties;
		//console.log(properties);
		var mapreduce = {};
		mapreduce["confKey"] = "";
		mapreduce["confValue"] = "";
		mapreduce["driver"] = properties.driver;
		mapreduce["jar"] = properties.jar;
		
		var params = [];
		var str_exception ;		
		str_exception = properties.display;
		
		$.each( properties, function( key, value ) {
						
			if(key === "driver" || key === "jar" || key === "display" || key === str_exception){				
				return true;
			}
			
			if(value.length > 0){ // 값이 있는 경우만 Add한다.
				params.push("-"+key);
				params.push(value);
			}
		});
		mapreduce["params"] = params;
		filtered["mapreduce"] = mapreduce;
		return filtered;
	}
	
	/**
	 * 워크플로워 알고리즘 모달에서 알고리즘 필터 적용
	 */
	function _setWorkModalFilter(){
		$("#_an_parameter > div").each(function(i,div){
			var id = $(div).attr("id");
			var filterText = $(div).data("filter"); // 형식(조건 || 조건) && 조건
			if(filterText.length > 0){
				// 원하는 형태로 필터 파싱
				filterText = filterText.replace(/'/gi, "").replace(/'/gi,"").replace(/ /gi,"").replace(/\(/gi,"").replace(/\)/gi,"");
				
				// and조건을 위한 그룹으로 분리
				filterGroup = filterText.split("&&");
				
				// or조건을 위한 필러목록으로 분리
				var success = []; // 일치하는 조건이 있는지 판단하는 배열
				$(filterGroup).each(function(index, group){
					var filterList = group.split("||");
					
					success.push("false"); // 기본 값 설정
					$(filterList).each(function(j, obj){
						var key = obj.split("==")[0];
						var value = obj.split("==")[1];
						
//						console.log("key = " + key + " val = " + value);
						var type = $("#_div_"+key).data("type");
						if(type === "boolean"){ // 조건 일치
							if(value === $("#_an_parameter input:radio[name="+ key +"]:checked").val()){
								success[index] = "true";
							}
						}else if(type === "combo"){
							if(value === $("#"+key).val()){ // 조건 일치
								success[index] = "true";
							}
						}
					});
				});
				
				// 조건 확인
				if($.inArray("false", success) > -1){ // 조건 불일치
					$("#"+id).hide();
				}else{ // 조건 일치
					$("#"+id).show();
				}
				//console.log(filterGroup);
			}
		});
	}
	
	/**
	 * 워크플로워 알고리즘 상세 모달에서 입력 데이터에 대한 유효값 체크를 한다.
	 */
	function _isWorkModalValid(){
		var isValid = true;
		
		// 입력경로 체크
		var input = $("#_an_workModal_input a");
		if(input.length == 0){
			isValid = false;
			ANKUS_API.util.alert(i18nP('JS_ANALYZER_NESSASARY', "입력경로"));
			return isValid;
		}
		
		// 출력경로 체크
		var output = $("#_an_workModal_outPath");
		if(output.length == 0){
			isValid = false;
			ANKUS_API.util.alert(i18nP('JS_ANALYZER_NESSASARY', "출력경로"));
			return isValid;
		}
		
		$("#_an_parameter > div:visible").each(function(i,div){
			var target = $(div).attr("id");
			var id = target.replace("_div_", "");
			var type = $(div).data("type");
			var required = $(div).data("required");
			
			if(required === "Y"){ // 필수값
				if(type === "columnindex" || type == "columnselect"
					|| type == "text" || type == "subinput"){
					var value = $("#"+id).val();
					if(value.length === 0){
						isValid = false;
						
						var noti = $("#"+target).data("description");
						ANKUS_API.util.alert(i18nP('JS_ANALYZER_NESSASARY', noti));
						return true;
					}
				}
			}
		});
		return isValid; 
	}
	
	/**
	 * 워크플로우 그래프의 노드 연결 Validation 을 체크한다.
	 * return isVaild 유효성여부 0:유효함,1:유효하지않음,2:알고리즘입력값없음
	 */
	function _isValidWorkflow(){
		var isVaild = 0;
		var elements = canvas.graph.getElementsByType();
		if(elements.length > 2){
			$.each(elements, function(i, element){
				var nodeId = $(element).attr("id");
				var shape = $(element).attr("_shape");
				var shapeId = $(element).attr("_shape_id");
				var fromedge = $(element).attr("_fromedge");
				var toedge = $(element).attr("_toedge");
				if(shape === "GEOM"){ // START, END
					if(shapeId === "OG.shape.bpmn.E_Start"){
						if(toedge === undefined){
							isVaild = 1;
						}else{
							if(toedge.length == 0){
								isVaild = 1;	
							}
						}
					}else if(shapeId === "OG.shape.bpmn.E_End"){
						if(fromedge === undefined){
							isVaild = 1;
						}else{
							if(fromedge.length == 0){
								isVaild = 1;	
							}
						}
					}
				}else if(shape == "IMAGE"){ // IMAGE
					if(fromedge === undefined){
						isVaild = 1;
					}
					if(toedge === undefined){
						isVaild = 1;
					}
					
					var node = canvas.graph.getCustomData(nodeId);
					if(node.isValidated === false){ // 노드에서 필수 입력값 유무 체크
						isVaild = 2;
						_showAlgorithmModal(canvas.graph.getElementById(nodeId)); // 입력값 입력을 위한 노드 띄움
					} 
				}
				if(isVaild === 1){ // 유효하지 않는 경우
					return false;
				}
			});
		}else{
			isVaild = 1;
		}
		return isVaild;
	}
	
	/**
	 * 디폴트 시작, 끝 노드를 드로잉한다.
	 * @private
	 */
	function _drawDefaultNode() {
	      var startNode = canvas.graph.drawShape([100, 100], new OG.E_Start('Start'), [30, 30]);
	      var endNode = canvas.graph.drawShape([500, 100], new OG.E_End('End'), [30, 30]);
	      
	      canvas.graph.setCustomData(startNode, {
	    	  metadata: getAlgorithm("Start")
	      });
	      
	      canvas.graph.setCustomData(endNode, {
	    	  metadata: getAlgorithm("End")
	      });
	      
	}
	
	/**
	 * 입력경로를 추가한다.
	 */
	var _addInputPath = function(text){
		var inputsTemplate = $("#_an_param_input_template");
		var resultHtml = inputsTemplate.render({path:text});
		$("#_an_workModal_input").append(resultHtml);	
	};
	
	/**
	 * 입력할 파일 위치를 목록에서 찾는다.
	 */
	var _searchInputPath = function(){
		var engineId = $('#_an_clusterName').val();
		
		if(engineId){
			ANKUS_API.util.fileSystemBrowser({
				engineId : engineId,
				onClick : function(v){
					if(v){
						_addInputPath(v);
					}					
				}
			});
		}			
	};
	
	/**
	 * 연결된 이전 노드에서 출력경로를 가져와서 입력경로에 추가한다.
	 */
	var _importInputPath = function(){
		var nodeId = $("#_an_parameter").data("nodeId");
    	
    	// 연결시킨 노드를 찾는다.
    	var fromedge = $("#"+nodeId).attr("_fromedge");
//    	console.log(fromedge);
    	if(fromedge !== undefined){
    		if(fromedge.length > 0){
    			var from = $("#"+fromedge).attr("_from"); // 연결된 선과 연결된 노드를 찾는다.
//    			console.log(from);
    			
    			if(from.indexOf("_TERMINAL_C_INOUT") > -1){ // 노드로 연결된 경우
    				from = from.replace("_TERMINAL_C_INOUT_0", "");
    				var node = canvas.graph.getCustomData(from); // 노드에 저장된 데이터를 가져온다.
    				var output = node.properties.output;
//    				console.log(output);
    				
    				_addInputPath(output);
    			}
    		}
    	}
		
		
		
	}
	
	/**
	 * 출력할 파일 위치를 선택한다.
	 */
	var _addOutputPath = function(){
		var engineId = $('#_an_clusterName').val();
		
		if(engineId){
			ANKUS_API.util.fileSystemBrowser({
				engineId : engineId,
				onClick : function(v){
					if(v){
						$("#_an_workModal_outPath").val(v)
					}					
				}
			});
		}			
	};
	
	/**
	 * 알고리즘 node 상세 화면에서 HDFS 미리보기 데이터 설정
	 */
	function _setPreview(records){
		var delimiter = $("#_an_workModal_delimiterValue").val();
		var $preView = $("#_an_workModal_preViewList");
		
		var columns = [];
		var gridData = [];
		$preView.GridUnload();
		if(records != undefined){
			for (var i = 0; i < records.length; i++) {
				var rowDataList = records[i].rowData;
				
				for (var k = 0; k < rowDataList.length; k++) {
					var tempRow = {};
					if(delimiter === '\\t'){
						delimiter = '\t';
					}else if(delimiter === '\\s'){
						delimiter = '\s';
					}
					var str_rowData = rowDataList[k].split(delimiter);
					
					for(var j = 0; j < str_rowData.length ; j++){  
						var key = j +' column'; 
						
						if(k===0){
							columns.push({ 
								label : j + ' column'
								, name : key
								, align : 'center'
//								, width : 70
							});
						}
						tempRow[key]=str_rowData[j]; 
					}  
					gridData.push(tempRow);
				}
			}
			
			if(records.length > 0){
				$preView.ankusGrid({ // Grid 생성
					url				: '',
					pager			: false,
					datatype		: '',
					multiselect		: false,
					pager			: '',
					colModel		: columns
				});
				
				setTimeout(function(){
					$preView.ankusSetGridData(gridData); // Grid 데이터 설정
				}, 100);
			}
		}
	}
	
	/**
	 * HDFS 파일 컬럼 정보를 가져온다.
	 */
	function _requestColumnPreview(target){
		var inputPath = $("#_an_workModal_input .active").text();
		var engineId = $('#_an_clusterName').val();
		var delimiter = $("#_an_workModal_delimiterValue").val();
		
		if(inputPath.length > 0){
			ANKUS_API.ajax({
				url			: '/designer/previewHDFSFile_tab',
				data		: {
					_dc : new Date().getTime(),
					inputPath:inputPath,
					delimiter:delimiter,
					engineId:engineId,
					page:1,
					start:0,
					limit:25
				},
				type		: 'GET',
				success		: function(res){
					_resultColumnPreview(res.list, target);
				},
				error : function(xhr, status, error) {
//	        	alert("에러발생");
				}
			});
		}
		
	} 
	
	/**
	 * HDFS 파일 컬럼 정보를 가져온다.
	 */
	function _requestDBPreview(target){
		
		var str_check = null;
		var str_id = null;
		var input_id = null;
		
		if($('#_div_'+target).data('type') == 'restmselect'){
			
			str_check = $('#_an_parameter [data-type="restselect"]');
			
			if(str_check == null || str_check != null){
				str_id = str_check.attr('id');	
				input_id = $('#'+str_id+' input').attr('id');
			}
		}	
			
		if(input_id != null && $('#'+input_id).val().length > 0){
			ANKUS_API.ajax({
				type		: 'GET',				
				url			: '/dbinfo',
				data		: {													
					tbl: $('#'+input_id).val()
				},
				success		: function(res){
					//console.log(res);
					_resultDBPreview(res, target);
				},
				error : function(xhr, status, error) {
//		        	alert("에러발생");
				}
			});
		}else{			
		
			ANKUS_API.ajax({
				type		: 'GET',				
				url			: '/dbinfo',				
				data		: {
					_dc : new Date().getTime(),					
					page:1,
					start:0,
					limit:25
				},
				type		: 'GET',
				success		: function(res){
					_resultDBPreview(res, target);
				},
				error : function(xhr, status, error) {
	//	        	alert("에러발생");
				}
			});
		}
	} 
	
	/**
	 * 서버에서 받은 파일 컬럼 정보
	 * @param responseData
	 */
	function _resultDBPreview(records, target){
		
		var record_obj = eval(records);			
		var columns = [];
		if(records != undefined){
			for (var i = 0; i < record_obj.length; i++) {
				var name = record_obj[i].name;
				var key = record_obj[i].value;
				columns.push({
					name:key
				})
			}			
			_showSelectDB(columns, target);
		}
	}
	
	/**
	 * 서버에서 받은 파일 컬럼 정보
	 * @param responseData
	 */
	function _resultColumnPreview(records, target){
		var delimiter = $("#_an_workModal_delimiterValue").val();
		var $preView = $("#_an_workModal_preViewList");
		
		var columns = [];
		if(records != undefined){
			for (var i = 0; i < records.length; i++) {
				var rowDataList = records[i].rowData;
				var rowCount = rowDataList.length;
				
				// 첫줄만 파싱하여 컬럼 정보를 만든다.
				if(rowCount > 0){
					if(delimiter === '\\t'){
						delimiter = '\t';
					}else if(delimiter === '\\s'){
						delimiter = '\s';
					}
					var str_rowData = rowDataList[0].split(delimiter);
					
					var columns = []; // 컬럼 정보
					for(var i = 0; i < str_rowData.length ; i++){  
						var key = i +' column'; 
						
						columns.push({ 
							name : key
						});
					}  
				}
			}
			_showSelectColumn(columns, target);
		}
	}
	
	/**
	 * 알고리즘 상세에서 미리보기 파일 컬럼 선택 팝업 설정
	 */
	function _showSelectDB(columns, target){
		
		if(columns !== undefined && columns !== null){			
			// 기존에 선택된 컬럼 인덱스 값들을 가져온다.
			var selectIndex = []; // 다른필드 선택 인덱스 값들
			var mySelectIndex = []; // 버튼내 필드 선택 인덱스 값들
			$("#_an_parameter div[data-type=restselect],div[data-type=restmselect]").each(function(i,obj){
				var id = $(obj).attr("id").replace("_div_", "");
				var rowIndexs = $("#"+id).val();
				if(rowIndexs.length > 0){
					if(id === target){
						$.merge(mySelectIndex, rowIndexs.split(","));
					}else{
						$.merge(selectIndex, rowIndexs.split(","));
					}
				} 
			});
			
			// 컬럼 데이터를 가지고 row데이터로 설정한다.
			var data = [];
			var key =[];
			$.each(columns, function(i, obj){
				
				var state = 0; // 0:기본,1:체크상태,2:이미체크중
				
				if($.inArray(""+i, mySelectIndex) > -1){ // 현재 필드 선택된 값이 있는 여부 체크 있는 경우 체크처리
					state = 1;
				}
				
				if($.inArray(""+i, selectIndex) > -1){ // 선택된 값이 있는 여부 체크 있는 경우 비활성화처리
					state = 2;
				}				
				
				data.push({
					column:obj.name,					
					state:state,
					index:i
				});
				
			});
			
    		$('#_an_DBPreviewColumn').jqGrid("GridUnload").ankusGrid({
    			url			: '',
    			pager		: false,
    			datatype	: 'local',
    			data		: data,
    			rowNum		: 100,
    			colModel	: [{
    				name : 'column',    				
    				label : column = 'table'?'table':'column',    				  				
    				//align : 'center',
    				width : 150
    			},{
    				name : 'select',
    				label : 'select',
    				align : 'center',
    				width : 70,
    				formatter : function(c, o, r){
    					var checked = "";
    					var disabled = "";
    					if(r.state === 0){ // 기본상태(체크X)
    					}else if(r.state === 1){ // 체크O
    						checked = "checked";
    					}else if(r.state === 2){ // 체크불가
    						checked = "checked";
    						disabled = "disabled";
    					}
    					return '<input type="checkbox" class="_an_chkFilePreview" data-index="'+ r.index +'" value="'+r.column+'" '+checked + ' ' + disabled + '/>';
    				}
    			}]
    	    });
    		
    		$('#_an_DBPreviewModal').ankusModal('show'); // 선택 모달을 띄운다.
    		
			$('._an_chkFilePreview').off('change');
			setTimeout(function(){
				if('true' === $("#_btn_"+target).attr('data-single')){ // 싱글,멀티 선택을 정한다.
					$('._an_chkFilePreview').on('change', function(){
						$('._an_chkFilePreview').not(this).not(":disabled").prop('checked', false);
					});
				}
			}, 300);
			
			$("#_an_DBPreviewOk").off("click").on("click", function() { // 알고리즘 팝업에서 컬럼 선택 팝업 확인 이벤트
				var selectedArr = [];				
				
				$('._an_chkFilePreview:checked').not(":disabled").each(function(){
					var str_val = $(this).parent().prev().text();
					selectedArr.push(str_val);
				});
				//console.log(selectedArr);
				$("#"+target).val(selectedArr.join(','));
				
				$('#_an_DBPreviewModal').ankusModal('hide');
				$('._an_chkFilePreview').prop('checked', false);
			});
		}
		
	}
	
	/**
	 * 알고리즘 상세에서 미리보기 파일 컬럼 선택 팝업 설정
	 */
	function _showSelectColumn(columns, target){
		if(columns !== undefined && columns !== null){
			// 기존에 선택된 컬럼 인덱스 값들을 가져온다.
			var selectIndex = []; // 다른필드 선택 인덱스 값들
			var mySelectIndex = []; // 버튼내 필드 선택 인덱스 값들
			$("#_an_parameter div[data-type=columnindex],div[data-type=columnselect]").each(function(i,obj){
				var id = $(obj).attr("id").replace("_div_", "");
				var rowIndexs = $("#"+id).val();
				if(rowIndexs.length > 0){
					if(id === target){
						$.merge(mySelectIndex, rowIndexs.split(","));
					}else{
						$.merge(selectIndex, rowIndexs.split(","));
					}
				} 
			});
			
			// 컬럼 데이터를 가지고 row데이터로 설정한다.
			var data = [];
			$.each(columns, function(i, obj){
				var state = 0; // 0:기본,1:체크상태,2:이미체크중
				
				if($.inArray(""+i, mySelectIndex) > -1){ // 현재 필드 선택된 값이 있는 여부 체크 있는 경우 체크처리
					state = 1;
				}
				
				if($.inArray(""+i, selectIndex) > -1){ // 선택된 값이 있는 여부 체크 있는 경우 비활성화처리
					state = 2;
				}
				
				data.push({
					column:obj.name,
					state:state,
					index:i
				});
			});
			
    		$('#_an_filePreviewColumn').jqGrid("GridUnload").ankusGrid({
    			url			: '',
    			pager		: false,
    			datatype	: 'local',
    			data		: data,
    			rowNum		: 1000,
    			colModel	: [{
    				name : 'column',
    				label : 'column',
    				align : 'center',
    				width : 140
    			},{
    				name : 'select',
    				label : 'select',
    				align : 'center',
    				width : 80,
    				formatter : function(c, o, r){
    					var checked = "";
    					var disabled = "";
    					if(r.state === 0){ // 기본상태(체크X)
    					}else if(r.state === 1){ // 체크O
    						checked = "checked";
    					}else if(r.state === 2){ // 체크불가
    						checked = "checked";
    						disabled = "disabled";
    					}
    					return '<input type="checkbox" class="_an_chkFilePreview" data-index="'+ r.index +'" value="'+r.column+'" '+checked + ' ' + disabled + '/>';
    				}
    			}]
    	    });
    		
    		$('#_an_filePreviewModal').ankusModal('show'); // 선택 모달을 띄운다.
    		
			$('._an_chkFilePreview').off('change');
			setTimeout(function(){
				if('true' === $("#_btn_"+target).attr('data-single')){ // 싱글,멀티 선택을 정한다.
					$('._an_chkFilePreview').on('change', function(){
						$('._an_chkFilePreview').not(this).not(":disabled").prop('checked', false);
					});
				}
			}, 300);
			
			$("#_an_filePreviewOk").off("click").on("click", function() { // 알고리즘 팝업에서 컬럼 선택 팝업 확인 이벤트
				var selectedArr = [];
				$('._an_chkFilePreview:checked').not(":disabled").each(function(){
					selectedArr.push($(this).data("index"));
				});
				$("#"+target).val(selectedArr.join(','));
				$('#_an_filePreviewModal').ankusModal('hide');
				$('._an_chkFilePreview').prop('checked', false);
			});
		}
		
	}
	
	/**
	 * 입력경로 직접입력 모달을 띄운다.
	 */
	function _showInputTextModal(){
		$('#_an_textInputModal').ankusModal('show'); // 모달을 띄운다.
	}
	
	/**
	 * 워크플로워 XML 모달을 띄운다.
	 */
	function _showCodeXMLModal(code){
    	$('#_an_showXML').ankusModal('show');
    	
    	setTimeout(function(){
    		$('#_an_codeXML').ankusCode({
            	value : code
            });
    	}, 500);
	}
	
	/**
	 * 워크플로워 XML을 가져온다.
	 */
	function _requestCodeXML(){
		var workflowId = $("#_an_workflowId").val();
		//console.log(workflowId);
		ANKUS_API.ajax({
			url			: '/designer/xml',
			data		: {
				_dc : new Date().getTime(),
				id : workflowId
			},
			success		: function(res){
				_resultCodeXML(res);
			},
			error : function(xhr, status, error) {
//			        	alert("에러발생");
	        }
		});
	} 

	/**
	 * 서버에서 받은 워크플로워 XML
	 * @param responseData
	 */
	function _resultCodeXML(response){
		var code = unescape(response.map.xml);
		_showCodeXMLModal(code);
	}
	
	/**
	 * 워크플로워 설명 입력팝업을 띄운다.
	 */
	function _showDescription(){
    	$('#_an_descriptionInputModal').ankusModal('show');
    	
    	var description = $("#_an_description").val();
    	$("#_an_modal_description").val(description);
	}
	
	/**
     * 워크플로워 실행시키기
     */
	function _requestRun() {
		var engineId = $('#_an_clusterName').val();
        var workflowId = $("#_an_workflowId").val();
        var wrokflowName = $("#_an_workflowName").val();
        
        ANKUS_API.util.confirm({
			description	: i18nP('JS_ALGMGR_IS_EXECUTION_WORKFLOW', wrokflowName),
			okText : i18nP('JS_ANALYZER_YES'),
			cancelText : i18nP('JS_ANALYZER_NO'),
			callback : function(sel){
				if(sel){ // "예" 이벤트
					ANKUS_API.ajax({
						url	: '/designer/run',
						data		: JSON.stringify({
							engineId: engineId, 
							id: workflowId
						}),
						type		: 'POST',
						success		: function(res){
							_resultRun(res);
						},
						error : function(xhr, status, error) {
//			        		alert("에러발생");
						}
					});
				}
			}
		});
	}
	
	/**
	 * 워크플로워 실행하기 결과처리
	 * @param res 서버에서 받은 정보
	 */
	function _resultRun(res){
		var wrokflowName = $("#_an_workflowName").val();
		if(res.success === true){ // 성공
			ANKUS_API.util.alert(i18nP('JS_ANALYZER_EXECUTION_WORKFLOW', wrokflowName));
		}else{ // 실패
		}
	}
	
	/**
	 * 워크플로우 XML 내보내기
	 */
	function _xmlExport(){
		var selectWorkflow = $("#_an_workflowList > .active"); // 워크플로워 목록에서 선택된 항목
		if(selectWorkflow.length === 0){
			return;
		}
		
		var workflowId = selectWorkflow.data("workflowid");
		window.location.assign('/designer/export?id='+workflowId);
	}
	
	/**
	 * 워크플로우 XML 가져오기 버튼 실행
	 */
	function _xmlImport(e){
		var file = e.target.files[0];
		var username = $('#_main_userId').val();
		//console.log(file);
		//console.log(username);
		var formData = new FormData();
        formData.append("file", file);
        formData.append("username", username);
       
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", function (evt) {
        }, false);

        xhr.addEventListener("load", function (evt) {
        }, false);
        xhr.addEventListener("error", function (evt) {
        }, false);
        xhr.addEventListener("abort", function (evt) {
        }, false);
       // console.log(xhr);
        xhr.open("POST", "/designer/import");
       
        xhr.onloadend = function (evt) {
            if (evt.target.status === 200) {  
            	_requestWorkflowList(); 
            	ANKUS_API.util.alert(i18nP('JS_ANALYZER_IMPORT_SUCCESS'));            	
            } else {
            	ANKUS_API.util.alert(i18nP('JS_ANALYZER_IMPORT_FAIL'));
            }
        };
        xhr.send(formData); 
       
       // $('#_an_xmlImport').val('');
	};
})();