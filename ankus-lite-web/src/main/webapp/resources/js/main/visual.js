(function visual(){
	var gridId;
	var jar = 'org.ankus:ankus-visualization:1.0.1';
	// 히스토리 그리드 데이터 처리
	var _getActionTabGridData = function(url, param){
		ANKUS_API.ajax({
			url			: url,
			data		: param,
			success		: function(res){
				var list = res.list;
				var tmpObj;
				var secondsToTime = function(secs){
					var hours = Math.floor(secs / (60 * 60));
					var divisor_for_minutes = secs % (60 * 60);
					var minutes = Math.floor(divisor_for_minutes / 60);
					var divisor_for_seconds = divisor_for_minutes % 60;
					var seconds = Math.ceil(divisor_for_seconds);
					var obj = {
						h : hours,
				        m : minutes,
				        s : seconds
				    };
				    
				    return obj;
				};
				
				for(var i=0; i<list.length; i++){
					tmpObj = list[i]; 
					if(tmpObj.status === 'SUCCESS'){
						tmpObj.status = i18nP('COMMON_SUCCESS');
					}
					else if(tmpObj.status === 'FAIL'){
						tmpObj.status = i18nP('COMMON_FAIL');
					}
					else if(tmpObj.status === 'RUNNING'){
						tmpObj.status = i18nP('COMMON_RUNNING');
					}
					else if(tmpObj.status === 'KILL'){
						tmpObj.status = i18nP('COMMON_FORCE_QUIT');
					}
					sec = tmpObj.elapsed; 
					timeObj = secondsToTime(sec * 60);
					h = timeObj.h;
					m = timeObj.m;
					s = timeObj.s;						
					tmpObj.elapsed = h + ':' + m;
				}
				$('#_vs_popupWorkFlowHistoryActionTabGrid').ankusSetGridData(list);
			}
		});
	};
	//히스토리 팝업의 실행 로그 데이터 가져오기
	var _getActionRunningLogData = function(url, param){
		ANKUS_API.ajax({
			url			: url,
			data		: param,
			success		: function(res){
				if($('#_vs_popupWorkFlowHistory_runningLogTabDiv').is(':visible')){
					$('#_vs_popupWorkFlowHistory_runningLogTabValue').ankusCode({
						value : res
					});
				}
				else{
					$('[data-type="_vs_popupWorkFlowHistory_runningLogTab"]').one('click', function(){
						$('#_vs_popupWorkFlowHistory_runningLogTabValue').ankusCode({
							value : res
						});
					});
				}
			}
		});
	};
	// 히스토리 팝업에서 탭 선택
	var _selectTabInHistory = function(){
		var $this = $(this);
		var dataType = $this.attr('data-type'); 
		
		if(dataType === '_vs_popupWorkFlowHistory_workTab'){				
			$('#_vs_popupWorkFlowHistory_workDiv').show();
			$('#_vs_popupWorkFlowHistory_actionDiv').hide();				
		}
		else if(dataType === '_vs_popupWorkFlowHistory_actionTab'){				
			$('#_vs_popupWorkFlowHistory_workDiv').hide();
			$('#_vs_popupWorkFlowHistory_actionDiv').show();
		}
		else if(dataType === '_vs_popupWorkFlowHistory_workXmlTab'){				
			$('#_vs_popupWorkFlowHistory_workflowXmlDiv').show();
			$('#_vs_popupWorkFlowHistory_errorLogDiv').hide();
		}
		else if(dataType === '_vs_popupWorkFlowHistory_errorLogTab'){
			$('#_vs_popupWorkFlowHistory_workflowXmlDiv').hide();
			$('#_vs_popupWorkFlowHistory_errorLogDiv').show();
			$('#_vs_popupWorkFlowHistory_errorLogCause').text($('#_vs_historyGrid').getRowData(gridId).cause);
			$('#_vs_popupWorkFlowHistory_errorLogValue').ankusCode({
            	value : $('#_vs_historyGrid').getRowData(gridId).exception
            });
		}
		else if(dataType === '_vs_popupWorkFlowHistory_conmmandTab'){
			$('#_vs_popupWorkFlowHistory_conmmandTabDiv').show();
			$('#_vs_popupWorkFlowHistory_scriptTabDiv').hide();
			$('#_vs_popupWorkFlowHistory_runningLogTabDiv').hide();
			$('#_vs_popupWorkFlowHistory_errorMessageTabDiv').hide();				
		}
		else if(dataType === '_vs_popupWorkFlowHistory_scriptTab'){				
			$('#_vs_popupWorkFlowHistory_conmmandTabDiv').hide();
			$('#_vs_popupWorkFlowHistory_scriptTabDiv').show();
			$('#_vs_popupWorkFlowHistory_runningLogTabDiv').hide();
			$('#_vs_popupWorkFlowHistory_errorMessageTabDiv').hide();				
		}
		else if(dataType === '_vs_popupWorkFlowHistory_runningLogTab'){				
			$('#_vs_popupWorkFlowHistory_conmmandTabDiv').hide();
			$('#_vs_popupWorkFlowHistory_scriptTabDiv').hide();
			$('#_vs_popupWorkFlowHistory_runningLogTabDiv').show();
			$('#_vs_popupWorkFlowHistory_errorMessageTabDiv').hide();				
		}
		else if(dataType === '_vs_popupWorkFlowHistory_errorMessageTab'){				
			$('#_vs_popupWorkFlowHistory_conmmandTabDiv').hide();
			$('#_vs_popupWorkFlowHistory_scriptTabDiv').hide();
			$('#_vs_popupWorkFlowHistory_runningLogTabDiv').hide();
			$('#_vs_popupWorkFlowHistory_errorMessageTabDiv').show();				
		}
	};
	// 히스토리 그리드 항목 선택
	var _selectHistoryRow = function(id){
		var rowData = $('#_vs_historyGrid').getRowData(id);
    	
    	$('#_vs_workTabHigh_work').addClass('active');
    	$('#_vs_workTabHigh_action').removeClass('active');		        	
    	$('#_vs_popupWorkFlowHistory_workDiv').show();
		$('#_vs_popupWorkFlowHistory_actionDiv').hide();		        	
    	$('#_vs_workTabLow_workflowXml').addClass('active');
    	$('#_vs_workTabLow_errorLog').removeClass('active');		        	
		$('#_vs_popupWorkFlowHistory_workflowXmlDiv').show();
		$('#_vs_popupWorkFlowHistory_errorLogDiv').hide();					
		$('#_vs_popupWorkFlowHistory_conmmandTabLi').addClass('active');
		$('#_vs_popupWorkFlowHistory_scriptTabLi').removeClass('active');
		$('#_vs_popupWorkFlowHistory_runningLogTabLi').removeClass('active');
		$('#_vs_popupWorkFlowHistory_errorMessageTabLi').removeClass('active');		        	
		$("#_vs_popupActionTabActionId").empty();
		$("#_vs_popupActionTabStartTime").empty();
		$("#_vs_popupActionTabEndTime").empty();
		$("#_vs_popupActionTabworkId").empty();
		$("#_vs_popupActionTabEndDate").empty();
		$("#_vs_popupActionTabStatus").empty();
		$("#_vs_popupActionTabworkFlowId").empty();
		$("#_vs_popupActionTabActionName").empty();
		$("#_vs_popupActionTabLogPath").empty();					
		$("#_vs_popupWorkFlowHistory_conmmandTabValue").empty();
		$("#_vs_popupWorkFlowHistory_scriptTabValue").empty();
		$("#_vs_popupWorkFlowHistory_runningLogTabValue").empty();
		$("#_vs_popupWorkFlowHistory_errorMessageValue").empty();					
    	$('#_vs_historyDetailModal').ankusModal('show');
    	
    	gridId = id;		        	
    	setTimeout(function(){		        		
    		$('#_vs_popupWorkTabWorkId').text(rowData.jobId);
    		$('#_vs_popupWorkTabStartDate').text(rowData.startDate);
    		$('#_vs_popupWorkTabWorkflowId').text(rowData.workflowId);
    		$('#_vs_popupWorkTabEndDate').text(rowData.endDate);
    		$('#_vs_popupWorkTabWorkflowName').text(rowData.workflowName);
    		$('#_vs_popupWorkTabElapsed').text(rowData.elapsed);
    		$('#_vs_popupWorkTabStatus').text(rowData.status);
    		$('#_vs_popupWorkTabCurrentStep').text(rowData.currentStepValue);
    		$('#_vs_popupWorkTabCurrentAction').text(rowData.currentAction);
    		$('#_vs_popupWorkTabUsername').text(rowData.username);
    		$('#_vs_workPopupTitle').text(rowData.workflowName + ' - ' + rowData.workflowId);		                		        		       		
            $('#_vs_popupWorkFlowHistory_workflowXmlValue').ankusCode({
            	value : rowData.workflowXml
            });		        			        		
    	}, 500);
    	
    	_getActionTabGridData('/dashboard/actions', {
    		jobId 		: rowData.jobId,
			engineId 	: $('#_vs_historyEngine').val(),
			page		: '1',
			start		: '0',
			limit		: '25'
		});
	};
	// 히스토리 그리드 데이터 가져오기
	var _getHistoryGridData = function(p){
		if(!$('#_vs_historyEngine').val()){return;}					
		ANKUS_API.ajax({
			url			: '/dashboard/workflows',
			data		: {
				_dc				: new Date().getTime(),
				startDate	 	: $('#_vs_historyStart').val().replace(/-/gi, ''),
				endDate 		: $('#_vs_historyEnd').val().replace(/-/gi, ''),
				status			: $('#_vs_historyStatus').val(),
				workflowName	: $('#_vs_historyName').val(),
				username		: $('#_main_userId').val(),
				jobType			: 'VISUALIZATION',
				engineId		: $('#_vs_historyEngine').val(),
				start			: (p.page-1)*16,
				page			: p.page,
				limit			: '16'
			},
			success		: function(res){
				if(res.success){
					var list = res.list;
					var sec; 
					var timeObj;					
					var h;
					var m;
					var s;
					var successHtml = $('#_vs_template ._vs_historyGridSuccess')[0].outerHTML;
					var failHtml = $('#_vs_template ._vs_historyGridFail')[0].outerHTML;
					var runningHtml = $('#_vs_template ._vs_historyGridRunning')[0].outerHTML;
					var killHtml = $('#_vs_template ._vs_historyGridKill')[0].outerHTML;
					var secondsToTime = function(secs){
						var hours = Math.floor(secs / (60 * 60));
						var divisor_for_minutes = secs % (60 * 60);
						var minutes = Math.floor(divisor_for_minutes / 60);
						var divisor_for_seconds = divisor_for_minutes % 60;
						var seconds = Math.ceil(divisor_for_seconds);
						var obj = {
							h : hours,
					        m : minutes,
					        s : seconds
					    };
					    
					    return obj;
					};
					
					for(var i=0; i<list.length; i++){
						if('SUCCESS' === list[i].status){
							list[i].status = i18nP('COMMON_SUCCESS');
						}else if('FAIL' === list[i].status){
							list[i].status = i18nP('COMMON_FAIL');
						}else if('RUNNING' === list[i].status){
							list[i].status = i18nP('COMMON_RUNNING');
						}else if('KILL' === list[i].status){
							list[i].status = i18nP('COMMON_FORCE_QUIT');
						}
						if(list[i].currentStep === 0){							
							list[i].currentStep = 0;		
							list[i].currentStepValue = '0%';
						}else if(list[i].currentStep === 1){							
							list[i].currentStep = 33;							
							list[i].currentStepValue = '33%';
						}else if(list[i].currentStep === 2){							
							list[i].currentStep = 66;							
							list[i].currentStepValue = '66%';
						}else if(list[i].currentStep === 3){							
							list[i].currentStep = 100;
							list[i].currentStepValue = '100%';
						}
						
						sec = list[i].elapsed; 
						timeObj = secondsToTime(sec * 60);
						h = timeObj.h;
						m = timeObj.m;
						s = timeObj.s;						
						list[i].elapsed = h + ':' + m;												
					}
					$('#_vs_historyGrid')[0].addJSONData({
						rows : list,
						page : p.page||1,
						records : res.total,
						total : Math.ceil(res.total/16)
						//,rowCount : 16
					});				
				}else{					
					ANKUS_API.util.alert(i18nP('JS_VISUAL_ROAD_FAIL_HISTORY'));
				}
			}
		});
	};
	// 그리드 설정
	var _setGrid = function(){
		$('#_vs_historyGrid').ankusGrid({
			url				: '',
			rowNum			: 16,
			rowList			: [],
//			pager			: '_vs_historyPager',
			datatype		: _getHistoryGridData,
	        ondblClickRow	: _selectHistoryRow,
	        beforeSelectRow	: function(rowid, e)
	        {
	            $('#_vs_historyGrid').jqGrid('resetSelection');
	            return true;
	        },
	        colModel		: [{
	        	name : 'id',
	        	label : i18nP('COMMON_NUMBER'),
	        	width : 50,
	        	align : 'center'		        	
	        },{
	        	name : 'workflowName',
	        	label : i18nP('VISUAL_CHART_TITLE'),
	        	width : 240,
	        	align : 'center'
	        },{
	        	name : 'currentAction',
	        	label : i18nP('COMMON_ACTION_NAME'),
	        	width : 150,
	        	align : 'center'
	        },{
	        	name : 'startDate',
	        	label : i18nP('COMMON_START_DTTM'),
	        	width : 140,
	        	align : 'center',
	        	formatter : function(v){
	        		return ANKUS_API.util.getDiffDate({
	    			 	diffDate : v,
	    			 	form : 'yyyymmddhhMMss',
	    			 	deli : '-',
	    			 	isMili : true
	    			 });
	            }
	        },{
	        	name : 'endDate',
	        	label : i18nP('COMMON_END_DTTM'),
	        	width : 140,
	        	align : 'center',
	        	formatter : function(v){
	        		return ANKUS_API.util.getDiffDate({
	    			 	diffDate : v,
	    			 	form : 'yyyymmddhhMMss',
	    			 	deli : '-',
	    			 	isMili : true
	    			 });
	            }
	        },{
	        	name : 'elapsed',
	        	label : i18nP('COMMON_RUNNING_TIME'),
	        	width : 80,
	        	align : 'center'
	        },{
	        	name : 'currentStep',
	        	label : i18nP('COMMON_PROGRESS_RATE'),
	        	width : 100,
	        	align : 'center',
	        	formatter : function(v){
	        		return $('<div style="height:15px; margin-bottom:0px;"></div>').ankusProgress(v)[0].outerHTML;
	            }
	        },{
	        	name : 'status',
	        	label : i18nP('COMMON_STATUS'),
	        	width : 60,
	        	align : 'center'
	        },{
	        	name : 'username',
	        	label : i18nP('COMMON_USER_NAME'),
	        	width : 100,
	        	align : 'center'
	        },{
	        	name : 'jobStringId',
	        	label : 'jobStringId',
	        	hidden : true
	        },{
	        	name : 'workflowXml',
	        	label : 'workflowXml',
	        	hidden : true
	        },{
	        	name : 'workflowId',
	        	label : 'workflowId',
	        	hidden : true
	        },{
	        	name : 'jobId',
	        	label : 'jobId',
	        	hidden : true
	        },{
	        	name : 'jobName',
	        	label : 'jobName',
	        	hidden : true
	        },{
	        	name : 'totalStep',
	        	label : 'totalStep',
	        	hidden : true
	        },{
	        	name : 'jobType',
	        	label : 'jobType',
	        	hidden : true
	        },{
	        	name : 'exception',
	        	label : 'exception',
	        	hidden : true
	        },{
	        	name : 'currentStepValue',
	        	label : 'currentStepValue',
	        	hidden : true
	        },{
	        	name : 'cause',
	        	label : 'cause',
	        	hidden : true
	        }]
	    });
		/*
		$('#_vs_filePreviewData').ankusGrid({
			url				: '',
			pager			: false,
			datatype		: ''
	    });
		*/
		$('#_vs_filePreviewColumn').ankusGrid({
			url				: '',
			pager			: false,
			datatype		: ''
	    });
		$('#_vs_popupWorkFlowHistoryActionTabGrid').ankusGrid({
	   		url				: '',
	        multiselect		: false,
			pager			: false,
			rowNum			: 100,
			datatype		: '',
			onSelectRow		: function(id){
				var tmpRowData = $('#_vs_popupWorkFlowHistoryActionTabGrid').getRowData(id);
				
				$('#_vs_popupActionTabActionId').text(tmpRowData.id);
				$('#_vs_popupActionTabStartTime').text(tmpRowData.startDate);
				$('#_vs_popupActionTabEndTime').text(tmpRowData.elapsed);
				$('#_vs_popupActionTabworkId').text(tmpRowData.jobId);
				$('#_vs_popupActionTabEndDate').text(tmpRowData.endDate);
				$('#_vs_popupActionTabStatus').text(tmpRowData.status);
				$('#_vs_popupActionTabworkFlowId').text(tmpRowData.workflowId);
				$('#_vs_popupActionTabActionName').text(tmpRowData.actionName);
				$('#_vs_popupActionTabLogPath').text(tmpRowData.logPath);					
				$('#_vs_popupWorkFlowHistory_conmmandTabValue').text(tmpRowData.command);
				$('#_vs_popupWorkFlowHistory_errorMessageValue').text(tmpRowData.cause);
				
				if($('#_vs_popupWorkFlowHistory_scriptTabDiv').is(':visible')){
					$('#_vs_popupWorkFlowHistory_scriptTabValue').ankusCode({
						value : tmpRowData.script
					});
				}
				else{
					$('[data-type="_vs_popupWorkFlowHistory_scriptTab"]').one('click', function(){
						$('#_vs_popupWorkFlowHistory_scriptTabValue').ankusCode({
							value : tmpRowData.script
						});
					});
				}
				
				_getActionRunningLogData('/dashboard/log', {						
					actionId : id,
					engineId : $('#_vs_historyEngine').val()
				});
			},
	        beforeSelectRow	: function(rowid, e)
	        {
	            $('#_vs_runningGrid').jqGrid('resetSelection');
	            return true;
	        },
	        colModel		: [{
	        	name : 'workflowId',
	        	label : i18nP('COMMON_WORKFLOW') + " ID",
	        	width : 100,
	        	align : 'center'
	        	
	        },{
	        	name : 'actionName',
	        	label : i18nP('COMMON_ACTION_NAME'),
	        	width : 100,
	        	align : 'center'
	        },{
	        	name : 'startDate',
	        	label : i18nP('COMMON_START_DTTM'),
	        	width : 100,
	        	align : 'center',
	          	formatter : function(v){
	        		return ANKUS_API.util.getDiffDate({
	    			 	diffDate : v,
	    			 	form : 'yyyymmddhhMMss',
	    			 	deli : '-',
	    			 	isMili : true
	    			 });
	            }
	        },{
	        	name : 'endDate',
	        	label : i18nP('COMMON_END_DTTM'),
	        	width : 100,
	        	align : 'center',
	        	formatter : function(v){
	        		return ANKUS_API.util.getDiffDate({
	    			 	diffDate : v,
	    			 	form : 'yyyymmddhhMMss',
	    			 	deli : '-',
	    			 	isMili : true
	    			 });
	            }
	        },{
	        	name : 'elapsed',
	        	label : i18nP('COMMON_RUNNING_TIME'),
	        	width : 80,
	        	align : 'center'
	        },{
	        	name : 'status',
	        	label : i18nP('COMMON_STATUS'),
	        	width : 95,
	        	align : 'center',
	        	formatter : function(v){
	        		var imageText='';
	        		
	    			if(v === i18nP('COMMON_SUCCESS')){
	    				imageText = $('#_vs_template ._vs_historyGridSuccess')[0].outerHTML;
	    			}else if(v === i18nP('COMMON_FAIL')){
	    				imageText = $('#_vs_template ._vs_historyGridFail')[0].outerHTML;
	    			}else if(v === i18nP('COMMON_RUNNING')){
	    				imageText = $('#_vs_template ._vs_historyGridRunning')[0].outerHTML;
	    			}else if(v === i18nP('COMMON_FORCE_QUIT')){
	    				imageText = $('#_vs_template ._vs_historyGridKill')[0].outerHTML;
	    			}
	    			
	    			return imageText + ' ' + v;
	        	}
	        },{
	        	name : 'id',
	        	label : 'id',
	        	hidden : true
	        },{
	        	name : 'jobId',
	        	label : 'jobId',
	        	hidden : true
	        },{
	        	name : 'jobStringId',
	        	label : 'jobStringId',
	        	hidden : true
	        },{
	        	name : 'workflowName',
	        	label : 'workflowName',
	        	hidden : true
	        },{
	        	name : 'jobName',
	        	label : 'jobName',
	        	hidden : true
	        },{
	        	name : 'cause',
	        	label : 'cause',
	        	hidden : true
	        },{
	        	name : 'currentStep',
	        	label : 'currentStep',
	        	hidden : true
	        },{
	        	name : 'totalStep',
	        	label : 'totalStep',
	        	hidden : true
	        },{
	        	name : 'logPath',
	        	label : 'logPath',
	        	hidden : true
	        },{
	        	name : 'script',
	        	label : 'script',
	        	hidden : true
	        },{
	        	name : 'exception',
	        	label : 'exception',
	        	hidden : true
	        },{
	        	name : 'username',
	        	label : 'username',
	        	hidden : true
	        },{
	        	name : 'command',
	        	label : 'command',
	        	hidden : true
	        }]
	    });
	};
	// 날짜 피커 설정
	var _setDatePicker = function(){
		$('#_vs_historyStart').ankusDate();
		$('#_vs_historyEnd').ankusDate();
	};
	// 화면 레이아웃 설정
	var _setLayout = function(){
		$('#_conVisual')
			.css({
				width : '100%',
				height : '100%'
			})
			.layout({
				west__size : 420,
				inset : {
					top : 10,
					bottom : 10,
					left : 10,
					right : 10
				}
			})
			.show()
		;
	};
	// Cluster name 가져온 후 Select box에 설정
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
				var i = 0;
				var len = list.length;
				var tmpObj;
				var tmpOption = $('#_vs_template ._vs_tmpOption')[0].outerHTML;
				
				for(; i<len; i++){
					tmpObj = list[i];
					$(tmpOption).val(tmpObj.id).text(tmpObj.instanceName).data('obj', tmpObj).appendTo('#_vs_clusterName');
					$(tmpOption).val(tmpObj.id).text(tmpObj.instanceName).appendTo('#_vs_historyEngine');
				}
			}
		});
	};
	// 차트 설정 값 초기화
	var _initAll = function(type){
		$('#_vs_clusterName').val('');
		$('._vs_chartIcon[data-type="'+type+'"]').trigger('click');
		$('._vs_path:visible').remove();
		$('[name="_vs_useFirstRecord"][value="false"]').prop('checked', true);
		$('#_vs_columnDivSel').val('\\t').trigger('change');
		$('#_vs_chartTitle').val('');
		$('._vs_chartOption input:text').val('');
		$('._vs_chartOption select').val(function(){
			return $(this).find('option:first').val();
		});
		$('._vs_chartOption input:radio[value="false"]').prop('checked', true);
	};
	// 차트 설정 값 가져오기
	var _getChartOption = function(){
		var $selectedChart = $('._vs_chartIcon[data-selected="selected"]');
		var $selectedPath = $('._vs_path.bg-danger');
		var ajaxOption = {
			delimiter		: $('#_vs_columnDivTxt').val(),
			engine			: $('#_vs_clusterName').val(),
			input			: $selectedPath.text(),
			jar				: jar,			
			useFirstRecord	: $('[name="_vs_useFirstRecord"]:checked').val()
		};
		
		// 차트제목 조건
		if($('#_vs_chartTitle').val() != null && $('#_vs_chartTitle').val() != ''){			
			ajaxOption.title = $('#_vs_chartTitle').val();
		}
		
		if(0 === $selectedChart.length){
			ANKUS_API.util.alert(i18nP('JS_VISUAL_SELECT_CHART'));
			return false;
		}
		if(0 === $selectedPath.length){
			ANKUS_API.util.alert(i18nP('JS_VISUAL_SELECT_FILE_PATH'));
			return false;
		}
		
		switch($selectedChart.attr('data-option')){
			case '_vs_pdfGraph' :
				ajaxOption.chartParam = {
					'avgIndex'			: $('#_vs_pdfGraph_ioa').val(),
					'idIndex'			: $('#_vs_pdfGraph_ioi').val(),
					'stddevIndex'		: $('#_vs_pdfGraph_ios').val(),
					'targetIDList'		: $('#_vs_pdfGraph_targetIdListTxt').val()	
				};
				
				//xLabel 조건
				if($('#_vs_pdfGraph_nox').val() != null && $('#_vs_pdfGraph_nox').val() != ''){					
					ajaxOption.chartParam.xLabel = $('#_vs_pdfGraph_nox').val();
				}
				
				if(!ajaxOption.chartParam.idIndex){			ANKUS_API.util.alert(i18nP('JS_VISUAL_INPUT_CHECK', 'VISUAL_INDEX_OF_ID'));			return false;}
				if(!ajaxOption.chartParam.avgIndex){		ANKUS_API.util.alert(i18nP('JS_VISUAL_INPUT_CHECK', 'VISUAL_INDEX_OF_AVG'));		return false;}
				if(!ajaxOption.chartParam.stddevIndex){		ANKUS_API.util.alert(i18nP('JS_VISUAL_INPUT_CHECK', 'VISUAL_INDEX_OF_STD') + ". Dev");	return false;}
				break;
				
			case '_vs_boxPlot' :
				ajaxOption.chartParam = {
					'targetIDList'		: $('#_vs_boxPlot_targetIdListTxt').val(),
					'idIndex'			: $('#_vs_boxPlot_ioi').val(),
					'minIndex'			: $('#_vs_boxPlot_io0').val(),
					'1QIndex'			: $('#_vs_boxPlot_io1').val(),
					'2QIndex'			: $('#_vs_boxPlot_io2').val(),
					'3QIndex'			: $('#_vs_boxPlot_io3').val(),
					'maxIndex'			: $('#_vs_boxPlot_io4').val()
				};
				
				//yLabel 조건
				if($('#_vs_boxPlot_noy').val() != null && $('#_vs_boxPlot_noy').val() != ''){					
					ajaxOption.chartParam.yLabel = $('#_vs_boxPlot_noy').val();
				}
				
				//yMax 조건
				if($('#_vs_boxPlot_mvoy').val() != null && $('#_vs_boxPlot_mvoy').val() != ''){					
					ajaxOption.chartParam.yMax = $('#_vs_boxPlot_mvoy').val();
				}
				
				if(!ajaxOption.chartParam.idIndex){			ANKUS_API.util.alert(i18nP('JS_VISUAL_INPUT_CHECK', 'VISUAL_INDEX_OF_ID'));			return false;}
				if(!ajaxOption.chartParam.minIndex){		ANKUS_API.util.alert(i18nP('JS_VISUAL_INPUT_CHECK', 'VISUAL_INDEX_OF_0Q' + '(Min.)'));	return false;}
				if(!ajaxOption.chartParam['1QIndex']){		ANKUS_API.util.alert(i18nP('JS_VISUAL_INPUT_CHECK', 'VISUAL_INDEX_OF_1Q'));			return false;}
				if(!ajaxOption.chartParam['2QIndex']){		ANKUS_API.util.alert(i18nP('JS_VISUAL_INPUT_CHECK', 'VISUAL_INDEX_OF_2Q' + '(Med.)'));	return false;}
				if(!ajaxOption.chartParam['3QIndex']){		ANKUS_API.util.alert(i18nP('JS_VISUAL_INPUT_CHECK', 'VISUAL_INDEX_OF_3Q'));			return false;}
				if(!ajaxOption.chartParam.maxIndex){		ANKUS_API.util.alert(i18nP('JS_VISUAL_INPUT_CHECK', 'VISUAL_INDEX_OF_4Q' + '(Max.)'));	return false;}
				break;
				
			case '_vs_barChart' :
				ajaxOption.chartParam = {
					'xIndex'			: $('#_vs_barChart_ioi').val(),					
					'yIndexList'		: $('#_vs_barChart_ilov').val(),
					'printValue'		: $('[name="_vs_barChart_pvic"]:checked').val()					
				};
				
				//xLabel 조건
				if($('#_vs_barChart_nox').val() != null && $('#_vs_barChart_nox').val() != ''){					
					ajaxOption.chartParam.xLabel = $('#_vs_barChart_nox').val();
				}
				
				//yMax 조건
				if($('#_vs_barChart_mvoy').val() != null && $('#_vs_barChart_mvoy').val() != ''){					
					ajaxOption.chartParam.yMax = $('#_vs_barChart_mvoy').val();
				}
				
				if(!ajaxOption.chartParam.xIndex){	ANKUS_API.util.alert(i18nP('JS_VISUAL_INPUT_CHECK', 'VISUAL_INDEX_OF_ID'));			return false;}
				if(!ajaxOption.chartParam.yIndexList){		ANKUS_API.util.alert(i18nP('JS_VISUAL_INPUT_CHECK', 'VISUAL_INDEX_LIST_OF_VAL'));	return false;}
				break;	
				
			case '_vs_pieChart' :
				ajaxOption.chartParam = {
					'categoryIndex'		: $('#_vs_pieChart_ioi').val(),					
					'valueIndex'		: $('#_vs_pieChart_iov').val(),
					'isPrintLegend'		: 'true'
				};
				if(!ajaxOption.chartParam.categoryIndex){	ANKUS_API.util.alert(i18nP('JS_VISUAL_INPUT_CHECK', 'VISUAL_INDEX_OF_VAL'));			return false;}
				if(!ajaxOption.chartParam.valueIndex){		ANKUS_API.util.alert(i18nP('JS_VISUAL_INPUT_CHECK', 'VISUAL_INDEX_LIST_OF_VAL'));	return false;}
				break;
				
			case '_vs_scatterPlot' :
				ajaxOption.chartParam = {
					'xIndex'			: $('#_vs_scatterPlot_iox').val(),					
					'yIndex'			: $('#_vs_scatterPlot_ioy').val()
				};
				
				//xLabel 조건
				if($('#_vs_scatterPlot_nox').val() != null && $('#_vs_scatterPlot_nox').val() != ''){					
					ajaxOption.chartParam.xLabel = $('#_vs_scatterPlot_nox').val();
				}
				
				//yLabel 조건
				if($('#_vs_scatterPlot_noy').val() != null && $('#_vs_scatterPlot_noy').val() != ''){					
					ajaxOption.chartParam.yLabel = $('#_vs_scatterPlot_noy').val();
				}
				
				//classIndex 조건
				if($('#_vs_scatterPlot_ioca').val() != null && $('#_vs_scatterPlot_ioca').val() != ''){					
					ajaxOption.chartParam.classIndex = $('#_vs_scatterPlot_ioca').val();
				}
				
				//sizeIndex 조건
				if($('#_vs_scatterPlot_iods').val() != null && $('#_vs_scatterPlot_iods').val() != ''){					
					ajaxOption.chartParam.sizeIndex = $('#_vs_scatterPlot_iods').val();
				}
				
				if(!ajaxOption.chartParam.xIndex){			ANKUS_API.util.alert(i18nP('JS_VISUAL_INPUT_CHECK', 'VISUAL_X_AXIS_NAME'));		return false;}
				if(!ajaxOption.chartParam.yIndex){			ANKUS_API.util.alert(i18nP('JS_VISUAL_INPUT_CHECK', 'VISUAL_Y_AXIS_NAME'));		return false;}
				break;
				
			case '_vs_treePlot' :
				ajaxOption.chartParam = {};
				break;
				
			case '_vs_connectedGraph' :
				ajaxOption.chartParam = {					
					'isDirected'		: $('[name="_vs_connectedGraph_gt"]:checked').val(),
					'startNodeIndex'	: $('#_vs_connectedGraph_iosn').val(),					
					'endNodeIndex'		: $('#_vs_connectedGraph_ioen').val(),
					'edgeIndex'			: $('#_vs_connectedGraph_ioev').val(),
					'isEdgeSize'		: $('[name="_vs_connectedGraph_aes"]:checked').val(),
					'isPrintNodeLabel'	: $('[name="_vs_connectedGraph_pnl"]:checked').val(),
					'isPrintEdgeValue'	: $('[name="_vs_connectedGraph_pev"]:checked').val()					
				};
				
				//startNodeSize 조건
				if($('#_vs_connectedGraph_iosns').val() != null && $('#_vs_connectedGraph_iosns').val() != ''){					
					ajaxOption.chartParam.startNodeSize = $('#_vs_connectedGraph_iosns').val();
				}
				
				//endNodeSize 조건
				if($('#_vs_connectedGraph_ioens').val() != null && $('#_vs_connectedGraph_ioens').val() != ''){					
					ajaxOption.chartParam.endNodeSize = $('#_vs_connectedGraph_ioens').val();
				}
				
				if(!ajaxOption.chartParam.startNodeIndex){	ANKUS_API.util.alert(i18nP('JS_VISUAL_INPUT_CHECK', 'VISUAL_START_NODE_INDEX'));	return false;}
				if(!ajaxOption.chartParam.endNodeIndex){	ANKUS_API.util.alert(i18nP('JS_VISUAL_INPUT_CHECK', 'VISUAL_END_NODE_INDEX'));	return false;}
				if(!ajaxOption.chartParam.edgeIndex){		ANKUS_API.util.alert(i18nP('JS_VISUAL_INPUT_CHECK', 'VISUAL_EDGE_VAL_INDEX'));	return false;}
				break;
			default :
				break;
		}
		ajaxOption.chartType = $selectedChart.attr('data-type');
		
		return ajaxOption;
	};
	// 신규 버튼 실행 
	var _newAction = function(){			
		ANKUS_API.util.confirm({
			description	: i18nP('JS_VISUAL_IS_CREATE_VISUALIZATION'),
			callback : function(sel){
				if(sel){
					_initAll('PDFGraph');
				}
			}
		});
	};
	// 실행 버튼 실행
	var _run = function(){
		var ajaxOption = _getChartOption();
		
		//console.log(ajaxOption);
		
		if(false === ajaxOption){
			return;
		}
		
		ANKUS_API.util.confirm({
			description	: i18nP('JS_VISUAL_IS_EXECUTION_VISUALIZATION'),
			callback : function(sel){
				if(sel){
					ANKUS_API.ajax({
						url			: '/visualization/run',
						data		: JSON.stringify(ajaxOption),
						type		: 'POST',
						success		: function(res){
							if(res.success){
								var doc = $('#_vs_chart')[0].contentWindow.document;
								
								doc.open();
								doc.write('<html><head></head><body>'+res.object.visualizationHtml+'</body></html>');
								doc.close();
							}
							$('#_vs_btnSaveToImage').prop('disabled', !res.success);
							$('#_vs_btnSaveToHtml').prop('disabled', !res.success);
						}
					});
				}
			}
		});
	};
	// 차트 종류 선택
	var _selectChart = function(){
		var $this = $(this);
		
		$('._vs_chartIcon').css({
			'background-color' : 'white'
		}).removeAttr('data-selected');
		$('._vs_chartOption').hide();
		$('#' + $this.attr('data-option')).show();
		$this.css({
			'background-color' : 'red'
		}).attr('data-selected', 'selected');
	};
	// 입력 경로 추가
	var _addPath = function(){
		var engineId = $('#_vs_clusterName').val();
		var tmpPath = $('#_vs_template ._vs_path')[0].outerHTML;
		
		if(engineId){
			ANKUS_API.util.fileSystemBrowser({
				engineId : engineId,
				onClick : function(v){
					if(v){
						$(tmpPath).text(v).appendTo('#_vs_paths');
						if(1 === $('#_vs_paths ._vs_path').length){
							$('#_vs_paths ._vs_path').addClass('bg-danger');
						}
					}					
				}
			});
		}
		else{
			ANKUS_API.util.alert(i18nP('JS_VISUAL_SELECT_CHECK', 'VISUAL_CLUSTER_NAME'));
		}
	};
	// 파일 경로 선택
	var _selectPath = function(){
		$('._vs_path:visible').removeClass('bg-danger');
		$(this).addClass('bg-danger');
	};
	// 히스토리 버튼 실행
	var _historyAction = function(){
		$('#_vs_historyModal').ankusModal('show');
		$('.datepicker').css('z-index', '9999');
	};
	// 다운로드 버튼 실행
	var _downloadAction = function(){
		var opt = _getChartOption();
		if(false === opt){
			return;
		}		
		var input = opt.input;
		var useFirstRecord = opt.useFirstRecord;
		var delimiter = opt.delimiter;
		var title = opt.title;
		var chartType = opt.chartType;			
		var chartParam = opt.chartParam;
		
		var xmlDoc = new DOMParser().parseFromString('<workflow></workflow>', 'text/xml');
		var root = xmlDoc.getElementsByTagName('workflow')[0];
			root.setAttribute('workflowName', title?title:'Visualization Job');
			root.setAttribute('xmlns', 'http://www.openankus.org/schema/workflow');			
		var pi = xmlDoc.createProcessingInstruction('xml', 'version="1.0" encoding="UTF-8"');

		xmlDoc.appendChild(pi);
		xmlDoc.removeChild(root);
		xmlDoc.appendChild(root);
		
		var startEl = xmlDoc.createElement('start');
			startEl.setAttribute('to', chartType);
			startEl.setAttribute('name', 'Start');
			startEl.setAttribute('description', 'Start');
		
		root.appendChild(startEl);
			
		var actionEl = xmlDoc.createElement('action');
			actionEl.setAttribute('to', 'End');
			actionEl.setAttribute('name', chartType);
			actionEl.setAttribute('description', 'Visualization');
		
		
		var mapreduceEl = xmlDoc.createElement('mapreduce');
		
		var jarEl = xmlDoc.createElement('jar');
			jarEl.textContent = jar;
		
		var classNameEl = xmlDoc.createElement('className');
			classNameEl.textContent = chartType;
		
		var commandEl = xmlDoc.createElement('command');
		
		var variableEl = xmlDoc.createElement('variable');
		
		variableEl.setAttribute('value', '-input');
		commandEl.appendChild(variableEl);
		variableEl = xmlDoc.createElement('variable');
		variableEl.setAttribute('value', input);
		commandEl.appendChild(variableEl);

		variableEl = xmlDoc.createElement('variable');
		variableEl.setAttribute('value', '-useFirstRecord');
		commandEl.appendChild(variableEl);
		variableEl = xmlDoc.createElement('variable');
		variableEl.setAttribute('value', useFirstRecord);
		commandEl.appendChild(variableEl);
		
		variableEl = xmlDoc.createElement('variable');
		variableEl.setAttribute('value', '-delimiter');
		commandEl.appendChild(variableEl);
		variableEl = xmlDoc.createElement('variable');
		variableEl.setAttribute('value', delimiter);
		commandEl.appendChild(variableEl);
		
		if(title != ''){
		variableEl = xmlDoc.createElement('variable');
		variableEl.setAttribute('value', '-title');
		commandEl.appendChild(variableEl);
		variableEl = xmlDoc.createElement('variable');
		variableEl.setAttribute('value', title);
		commandEl.appendChild(variableEl);						
		}
		
		var keys = Object.keys(chartParam);						
		for (var i=0; i<keys.length; i++) {
			var key = keys[i];							
			if (chartParam[key]) {																
				variableEl = xmlDoc.createElement('variable');
				variableEl.setAttribute('value', '-' + key);
				commandEl.appendChild(variableEl);
				variableEl = xmlDoc.createElement('variable');
				variableEl.setAttribute('value', chartParam[key]);
				commandEl.appendChild(variableEl);
			}							
		}		
		
		mapreduceEl.appendChild(jarEl);
		mapreduceEl.appendChild(classNameEl);
		mapreduceEl.appendChild(commandEl);
		
		actionEl.appendChild(mapreduceEl);
		root.appendChild(actionEl);
		
		var endEl = xmlDoc.createElement('end');
			endEl.setAttribute('name', 'End');
			endEl.setAttribute('description', 'End');
		
		root.appendChild(endEl);
		
		var link = document.createElement('a');
		link.href = 'data:application/octet-stream;base64;charset=utf-8,' + ANKUS_API.util.toBase64(new XMLSerializer().serializeToString(xmlDoc));
		link.download = 'Visualization.xml';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
	// 실제 업로드 버튼 이벤트 발생
	var _uploadTrigger = function(){
		$('#_vs_btnUploadReal').trigger('click');
	};
	// 업로드 버튼 실행
	var _uploadAction = function(e){
		var reader = new FileReader();
        
		reader.onload = function() {
			var xmlhttp = new XMLHttpRequest();
			var xmlDoc;
			var $xml;
			var typeVal;
			var getVal = function(v, callback){
				var value = $xml.find('[value="'+v+'"]').next().attr('value');

				if(value){
					callback(value);
				} 
			};
			
			xmlhttp.open('GET', reader.result, false);
			xmlhttp.send();
			xmlDoc = xmlhttp.responseXML;
			
			$xml = $(xmlDoc);
			typeVal = $xml.find('className').text(); 
			_initAll(typeVal);
			getVal('-input', function(v){
				$('#_vs_template ._vs_path').clone().text(v).appendTo($('#_vs_paths'));
			});
			getVal('-useFirstRecord', function(v){
				$('[name="_vs_useFirstRecord"][value="'+v+'"]').prop('checked', true);
			});
			getVal('-delimiter', function(v){
				if(0 === $('#_vs_columnDivSel [value="'+v+'"]')){
					$('#_vs_columnDivSel').val('');
					$('#_vs_columnDivTxt').val(v).prop('disabled', false);
				}
				else{
					$('#_vs_columnDivSel').val(v);
					$('#_vs_columnDivTxt').val(v).prop('disabled', true);
				}					
			});
			getVal('-title', function(v){
				$('#_vs_chartTitle').val(v);
			});
			
			switch(typeVal){
				case 'PDFGraph' :
					getVal('-targetIDList_c', function(v){
						if(0 === $('#_vs_pdfGraph_targetIdListSel [value="'+v+'"]')){
							$('#_vs_pdfGraph_targetIdListSel').val('');
							getVal('-targetIDList', function(v){
								$('#_vs_pdfGraph_targetIdListTxt').val(v).prop('disabled', false);
							});
						}
						else{
							$('#_vs_pdfGraph_targetIdListSel').val(v);
							getVal('-targetIDList', function(v){
								$('#_vs_pdfGraph_targetIdListTxt').val(v).prop('disabled', true);
							});
						}					
					});
					getVal('-idIndex', function(v){
						$('#_vs_pdfGraph_ioi').val(v);
					});
					getVal('-avgIndex', function(v){
						$('#_vs_pdfGraph_ioa').val(v);
					});
					getVal('-stddevIndex', function(v){
						$('#_vs_pdfGraph_ios').val(v);
					});
					getVal('-xLabel', function(v){
						$('#_vs_pdfGraph_nox').val(v);
					});
					break;
				case 'BoxPlots' :
					getVal('-targetIDList_c', function(v){
						if(0 === $('#_vs_boxPlot_targetIdListSel [value="'+v+'"]')){
							$('#_vs_boxPlot_targetIdListSel').val('');
							getVal('-targetIDList', function(v){
								$('#_vs_boxPlot_targetIdListTxt').val(v).prop('disabled', false);
							});
						}
						else{
							$('#_vs_boxPlot_targetIdListSel').val(v);
							getVal('-targetIDList', function(v){
								$('#_vs_boxPlot_targetIdListTxt').val(v).prop('disabled', true);
							});
						}					
					});
					getVal('-idIndex', function(v){
						$('#_vs_boxPlot_ioi').val(v);
					});
					getVal('-minIndex', function(v){
						$('#_vs_boxPlot_io0').val(v);
					});
					getVal('-1QIndex', function(v){
						$('#_vs_boxPlot_io1').val(v);
					});
					getVal('-2QIndex', function(v){
						$('#_vs_boxPlot_io2').val(v);
					});
					getVal('-3QIndex', function(v){
						$('#_vs_boxPlot_io3').val(v);
					});
					getVal('-maxIndex', function(v){
						$('#_vs_boxPlot_io4').val(v);
					});
					getVal('-yLabel', function(v){
						$('#_vs_boxPlot_noy').val(v);
					});
					getVal('-yMax', function(v){
						$('#_vs_boxPlot_mvoy').val(v);
					});
					break;
				case 'BarChart' :
					getVal('-xIndex', function(v){
						$('#_vs_barChart_ioi').val(v);
					});
					getVal('-yIndexList', function(v){
						$('#_vs_barChart_ilov').val(v);
					});
					getVal('-xLabel', function(v){
						$('#_vs_barChart_nox').val(v);
					});
					getVal('-printValue', function(v){
						$('[name="_vs_barChart_pvic"][value="'+v+'"]').prop('checked', true);
					});
					getVal('-yMax', function(v){
						$('#_vs_barChart_mvoy').val(v);
					});
					break;	
				case 'PieChart' :
					getVal('-categoryIndex', function(v){
						$('#_vs_pieChart_ioi').val(v);
					});
					getVal('-valueIndex', function(v){
						$('#_vs_pieChart_iov').val(v);
					});
					break;
				case 'ScatterPlot' :
					getVal('-xIndex', function(v){
						$('#_vs_scatterPlot_iox').val(v);
					});
					getVal('-xLabel', function(v){
						$('#_vs_scatterPlot_nox').val(v);
					});
					getVal('-yIndex', function(v){
						$('#_vs_scatterPlot_ioy').val(v);
					});
					getVal('-yLabel', function(v){
						$('#_vs_scatterPlot_noy').val(v);
					});
					getVal('-classIndex', function(v){
						$('#_vs_scatterPlot_ioca').val(v);
					});
					getVal('-sizeIndex', function(v){
						$('#_vs_scatterPlot_iods').val(v);
					});
					break;
				case 'TreePlot' :
					break;
				case 'ConnectedGraph' :
					getVal('-isDirected', function(v){
						$('[name="_vs_connectedGraph_gt"][value="'+v+'"]').prop('checked', true);
					});
					getVal('-startNodeIndex', function(v){
						$('#_vs_connectedGraph_iosn').val(v);
					});
					getVal('-startNodeSize', function(v){
						$('#_vs_connectedGraph_iosns').val(v);
					});
					getVal('-endNodeIndex', function(v){
						$('#_vs_connectedGraph_ioen').val(v);
					});
					getVal('-endNodeSize', function(v){
						$('#_vs_connectedGraph_ioens').val(v);
					});
					getVal('-edgeIndex', function(v){
						$('#_vs_connectedGraph_ioev').val(v);
					});
					getVal('-isEdgeSize', function(v){
						$('[name="_vs_connectedGraph_aes"][value="'+v+'"]').prop('checked', true);
					});
					getVal('-isPrintNodeLabel', function(v){
						$('[name="_vs_connectedGraph_pnl"][value="'+v+'"]').prop('checked', true);
					});
					getVal('-isPrintEdgeValue', function(v){
						$('[name="_vs_connectedGraph_pev"][value="'+v+'"]').prop('checked', true);
					});
					break;
				default :
					break;
			}
		}
		reader.readAsDataURL(e.target.files[0], 'UTF-8');
	};
	// 입력 경로 삭제
	var _removePath = function(){
		$('._vs_path.bg-danger').remove();
	};
	// 입력 경로 모두 삭제
	var _removeAllPath = function(){
		$('._vs_path:visible').remove();
	};
	// 컬럼 구분자 변경
	var _changeColumnDiv = function(){
		var selectedVal = $(this).val();
		
		$('#_vs_columnDivTxt').val(selectedVal).prop('disabled', '' !== selectedVal);
	};
	// 차트 상단 Save to image 버튼 실행
	var _saveToImage = function(){
		var iframeDocument = $('#_vs_chart').contents()[0];
		
		saveSvgAsPng(iframeDocument.getElementsByTagName('svg'), 'Visualization.png', {document : iframeDocument});
	};
	// 차트 상단 Save to html 버튼 실행
	var _saveToHtml = function(){
		var doc = $('#_vs_chart').contents()[0].cloneNode(true);
		var svg = doc.getElementsByTagName('svg');
		var a = document.createElement('a');
		
		while (svg.length > 0) {
			svg[0].remove();
		}
    	a.download = 'Visualization.html';
    	a.href = 'data:application/octet-stream;base64;charset=utf-8,' + ANKUS_API.util.toBase64(doc.documentElement.innerHTML);
    	document.body.appendChild(a);
    	a.addEventListener('click', function(e){
    		a.parentNode.removeChild(a);
    	});
    	a.click();
	};
	// 히스토리 팝업에서 엔진 교체
	var _selectHistoryEngine = function(){
		var engineId = $('#_vs_historyEngine').val();
		
		if(engineId){
			if(Number($('#_vs_historyEnd').val().replace(/-/g, '') < Number($('#_vs_historyStart').val().replace(/-/g, '')))){
				ANKUS_API.util.alert(i18nP('JS_VISUAL_START_END_DTTM_CHECK'));
				return;
			}
			$('#_vs_historyGrid').trigger('reloadGrid');
		}
		else{
			ANKUS_API.util.alert(i18nP('JS_VISUAL_SELECT_CHECK', 'VISUAL_WORKFLOW_ENGINE'));
		}
	};
	// 히스토리 팝업의 검색 영역 초기화
	var _initHistory = function(){
		$('#_vs_historyEngine').val('');
		$('#_vs_historyStart').val('');
		$('#_vs_historyEnd').val('');
		$('#_vs_historyStatus').val('ALL');
		$('#_vs_historyName').val('');
	};
	// PDF Graph의 Target ID List 변경
	var _changePdfGraphTargetId = function(){
		var selectedVal = $(this).val();
		
		$('#_vs_pdfGraph_targetIdListTxt').val(selectedVal).prop('disabled', '' !== selectedVal);
	};
	
	// PDF Graph의 Target ID List 변경
	var _changeBoxPlotTargetId = function(){
		var selectedVal = $(this).val();
		
		$('#_vs_boxPlot_targetIdListTxt').val(selectedVal).prop('disabled', '' !== selectedVal);
	};
	
	// 파일 시스템 브라우저 팝업 호출
	var _openFilePreview = function(){
		var $this=  $(this);
		var inputPathVal = $('._vs_path.bg-danger').text();
		var delimiterVal = $('#_vs_columnDivTxt').val();
		var engineVal = $('#_vs_clusterName').val();
		
		if(!inputPathVal){
			ANKUS_API.util.alert(i18nP('JS_VISUAL_CONFIG_CHECK', 'VISUAL_FILE_PATH'));
			return;
		}
		if(!delimiterVal){
			ANKUS_API.util.alert(i18nP('JS_VISUAL_CONFIG_CHECK', 'VISUA_COLUMN_SEPARATOR'));
			return;
		}
		if(!engineVal){
			ANKUS_API.util.alert(i18nP('JS_VISUAL_CONFIG_CHECK', 'VISUAL_CLUSTER_NAME'));
			return;
		}
		
		ANKUS_API.ajax({
			url			: '/designer/previewHDFSFile_tab',
			data		: {
				_dc : new Date().getTime(),
				inputPath : inputPathVal,
				delimiter : delimiterVal,
				engineId : engineVal,
				page : 1,
				start : 0,
				limit : 25
			},
			success		: function(res){
				var useFirst = 'true' === $('[name="_vs_useFirstRecord"]:checked').val();
				var data;
				var len;
				var i = 1;
				var j = 0;
				var z = 0;
				var baseRow;
				var colArr = [];
				var dataArr = [];
				var splitVal;
				var tmpArr;
				var selectDataArr = [];
				
				if(res.success){
					splitVal = res.object;
					data = res.list[0].rowData;
					len = data.length;
					baseRow = data[0].split(splitVal);
					
					for(var v=0; v<baseRow.length; v++){
						colArr.push({
							name : (v + 'a'),
							label : useFirst ? v + 'column' : baseRow[v],
							align : 'center'
						});
						selectDataArr.push({
							column : v
						});
					}
					if(useFirst){
						i = 0;
					}
					for(; i<len; i++){
						tmpArr = data[i].split(splitVal);
						dataArr[z] = {};
						for(j=0; j<tmpArr.length; j++){
							dataArr[z][j + 'a'] = tmpArr[j];
						}
						z++;
					}
					setTimeout(function(){
						$('#_vs_filePreviewData').jqGrid('GridUnload').ankusGrid({
							url			: '',
							pager		: false,
							datatype	: 'local',
							data		: dataArr,
							colModel	: colArr,
							rowNum		: 25
					    });
						$('#_vs_filePreviewColumn').jqGrid('GridUnload').ankusGrid({
							url			: '',
							pager		: false,
							datatype	: 'local',
							data		: selectDataArr,
							rowNum		: 25,
							colModel	: [{
								name : 'column',
								label : 'column',
								align : 'center',
								width : 70
							},{
								name : 'select',
								label : 'select',
								align : 'center',
								width : 50,
								formatter : function(c, o, r){
									return '<input type="checkbox" class="_vs_chkFilePreview" value="'+r.column+'" />';
								}
							}]
					    });
					}, 100);						
				}
			}
		});			
		$('#_vs_filePreviewModal')
			.find('#_vs_filePreviewSubTitle').text($this.attr('data-title')).end()
			.ankusModal('show')
		;
		_selectFilePreview.setCaller($this.attr('data-txt'));
		$('._vs_chkFilePreview').off('change');
		setTimeout(function(){
			if('true' === $this.attr('data-single')){
				$('._vs_chkFilePreview').on('change', function(){
					$('._vs_chkFilePreview').not(this).prop('checked', false);
				});
			}
		}, 300);
	};
	// 파일 시스템 브라우저에서 파일 선택
	var _selectFilePreview = function(){
		var $caller;
		var selectedArr = [];
		
		return {
			setCaller : function(id){
				$caller = $('#' + id);
			},
			setValue : function(){
				selectedArr.length = 0;
				$('._vs_chkFilePreview:checked').each(function(){
					selectedArr.push($(this).val());
				});
				$caller.val(selectedArr.join(','));
				$('#_vs_filePreviewModal').ankusModal('hide');
				$('._vs_chkFilePreview').prop('checked', false);
			}
		};			
	}();
	// 히스토리 팝업의 그리드 업데이트
	var _updateHistoryPopupGrid = function(){
		_getActionTabGridData('/dashboard/actions', {
			jobId 		: $('#_vs_historyGrid').getRowData(gridId).jobId,
			engineId 	: $('#_vs_historyEngine').val(),
			page		: '1',
			start		: '0',
			limit		: '25'
		});
	};
	
	_setGrid();
	_setDatePicker();		
	$('#_tabVisual').one('click', function(){
		_setLayout();
		_getEngine();
		$('._vs_chartIcon[data-option="_vs_pdfGraph"]').trigger('click');
		$('#_vs_columnDivSel').val('\\t').trigger('change');
	});
	$('#_vs_btnNew').on('click', _newAction);
	$('#_vs_btnRun').on('click', _run);
	$('#_vs_btnHistory').on('click', _historyAction);
	$('#_vs_btnDownload').on('click', _downloadAction);
	$('#_vs_btnUpload').on('click', _uploadTrigger);
	$('#_vs_btnUploadReal').on('change', _uploadAction);
	$('#_vs_columnDivTxt').val($('#_vs_columnDivSel').val())
	$('._vs_chartIcon').on('click', _selectChart);
	$('#_vs_btnAddDir').on('click', _addPath);
	$('#_vs_paths').on('click', '._vs_path', _selectPath);
	$('#_vs_btnRemoveDir').on('click', _removePath);
	$('#_vs_btnRemoveAllDir').on('click', _removeAllPath);
	$('#_vs_columnDivSel').on('change', _changeColumnDiv);		
	$('#_vs_historyEngine').on('change', _selectHistoryEngine);
	$('#_vs_historySearch').on('click', _selectHistoryEngine);
	$('#_vs_historyInit').on('click', _initHistory);
	$('#_vs_pdfGraph_targetIdListSel').on('change', _changePdfGraphTargetId);
	$('#_vs_boxPlot_targetIdListSel').on('change', _changeBoxPlotTargetId);
	
	$('#_vs_btnSaveToImage').on('click', _saveToImage);
	$('#_vs_btnSaveToHtml').on('click', _saveToHtml);
	$('._vs_btnOpenFilePreview').on('click', _openFilePreview);
	$('#_vs_filePreviewOk').on('click', _selectFilePreview.setValue);
	$('._vs_tab').on('click', _selectTabInHistory);
	$('#_vs_popupWorkFlowHistory_actionUpdateBtn').on('click', _updateHistoryPopupGrid);
})();