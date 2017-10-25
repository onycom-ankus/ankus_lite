(function dashboard(){
	var gridId;
	var loginId = $('#_main_userId').val();
	
	setTimeout(function(){
		$('#_ds_historySearchBtn').trigger('click');
	},300);
	
	$('#_ds_startDatePicker').ankusDate({
		format:'yyyy-mm-dd'
	});
	
	$('#_ds_endDatePicker').ankusDate();	

	var _setHistoryGrid = function(){
		$('#_ds_historyGrid').ankusGrid({
	   		url				: '',
	   		rowNum			: 16,
	        multiselect		: true,
			datatype		: getHistoryGridObj,
			rowList			: [],
	        ondblClickRow	: function(id){
	        	
	        	$('#_ds_workTabHigh_work').addClass('active');
	        	$('#_ds_workTabHigh_action').removeClass('active');
	        	
	        	$('#_ds_popupWorkFlowHistory_workDiv').show();
				$('#_ds_popupWorkFlowHistory_actionDiv').hide();
	        	
	        	$('#_ds_workTabLow_workflowXml').addClass('active');
	        	$('#_ds_workTabLow_errorLog').removeClass('active');
	        	
				$('#_ds_popupWorkFlowHistory_workflowXmlDiv').show();
				$('#_ds_popupWorkFlowHistory_errorLogDiv').hide();
				
				$('#_ds_popupWorkFlowHistory_conmmandTabLi').addClass('active');
				$('#_ds_popupWorkFlowHistory_scriptTabLi').removeClass('active');
				$('#_ds_popupWorkFlowHistory_runningLogTabLi').removeClass('active');
				$('#_ds_popupWorkFlowHistory_errorMessageTabLi').removeClass('active');
	        	
				$("#_ds_popupActionTabActionId").empty();
				$("#_ds_popupActionTabStartTime").empty();
				$("#_ds_popupActionTabEndTime").empty();
				$("#_ds_popupActionTabworkId").empty();
				$("#_ds_popupActionTabEndDate").empty();
				$("#_ds_popupActionTabStatus").empty();
				$("#_ds_popupActionTabworkFlowId").empty();
				$("#_ds_popupActionTabActionName").empty();
				$("#_ds_popupActionTabLogPath").empty();
				
				$("#_ds_popupWorkFlowHistory_conmmandTabValue").empty();
				$("#_ds_popupWorkFlowHistory_scriptTabValue").empty();
				$("#_ds_popupWorkFlowHistory_runningLogTabValue").empty();
				$("#_ds_popupWorkFlowHistory_errorMessageValue").empty();
				
	        	$('#_modal').ankusModal('show');
	        	
	        	gridId = id;
	        	
	        	setTimeout(function(){
	        		        		
	        		$('#_ds_popupWorkTabWorkId').text($('#_ds_historyGrid').getRowData(id).jobId);
	        		$('#_ds_popupWorkTabStartDate').text($('#_ds_historyGrid').getRowData(id).startDate);
	        		$('#_ds_popupWorkTabWorkflowId').text($('#_ds_historyGrid').getRowData(id).workflowId);
	        		$('#_ds_popupWorkTabEndDate').text($('#_ds_historyGrid').getRowData(id).endDate);
	        		$('#_ds_popupWorkTabWorkflowName').text($('#_ds_historyGrid').getRowData(id).workflowName);
	        		$('#_ds_popupWorkTabElapsed').text($('#_ds_historyGrid').getRowData(id).elapsed);
	        		$('#_ds_popupWorkTabStatus').text($('#_ds_historyGrid').getRowData(id).status);
	        		$('#_ds_popupWorkTabCurrentStep').text($('#_ds_historyGrid').getRowData(id).currentStepValue);
	        		$('#_ds_popupWorkTabCurrentAction').text($('#_ds_historyGrid').getRowData(id).currentAction);
	        		$('#_ds_popupWorkTabUsername').text($('#_ds_historyGrid').getRowData(id).username);
	        		$('#_ds_workPopupTitle').text($('#_ds_historyGrid').getRowData(id).workflowName + ' - ' + $('#_ds_historyGrid').getRowData(id).workflowId);
	                		        		       		
	                $('#_ds_popupWorkFlowHistory_workflowXmlValue').ankusCode({
	                	value : $('#_ds_historyGrid').getRowData(id).workflowXml
	                });
	        			        		
	        	}, 500);
	        	
	        	
	        	var param = {
	        			
	        			jobId 			: ($('#_ds_historyGrid').getRowData(id).jobId),
	        			engineId 		: $('#_ds_historyEngineSelect').val(),
	        			page			: '1',
	        			start			: '0',
	        			limit			: '25'
	        	};
	       
	        	getActionTabGridData('/dashboard/actions', param);
	        	
	        },
//	        pager			: '_ds_pager',
	        beforeSelectRow: function(rowid, e)
	        {
	            $("#_ds_historyGrid").jqGrid('resetSelection');
	            return(true);
	        },
	        colModel		: [{
	        	name : 'id',
	        	label : i18nP('COMMON_NUMBER'),
	        	width : 50,
	        	align : 'center',
	        	
	        },{
	        	name : 'workflowName',
	        	label : i18nP('COMMON_PROGRESS_RATE'),
	        	width : 220,
	        	align : 'center',
	        },{
	        	name : 'currentAction',
	        	label : i18nP('COMMON_ACTION_NAME'),
	        	width : 100,
	        	align : 'center',

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
	        	align : 'center',
	        },{
	        	name : 'currentStep',
	        	label : i18nP('COMMON_PROGRESS_RATE'),
	        	width : 140,
	        	align : 'center',
	        	formatter : function(v){
	        		return $('<div style="height:15px; margin-bottom:0px;"></div>').ankusProgress(v)[0].outerHTML;
	            }
	        },{
	        	name : 'status',
	        	label : i18nP('COMMON_STATUS'),
	        	width : 100,
	        	align : 'center',
	        	formatter : function(v){
	            		
	        		var imageText='';
	        		
	    			if(v === i18nP('COMMON_SUCCESS')){
	    				imageText = '<img src="/resources/images/Circle_Blue.png" alt='+ i18nP('COMMON_SUCCESS') +' style="height:15px;" />' + v;
	    			}else if(v === i18nP('COMMON_FAIL')){
	    				imageText = '<img src="/resources/images/Circle_Red.png" alt="'+ i18nP('COMMON_FAIL') +'" style="height:15px;" />' + v;
	    			}else if(v === i18nP('COMMON_RUNNING')){
	    				imageText = '<img src="/resources/images/Circle_Green.png" alt="'+ i18nP('COMMON_RUNNING') +'" style="height:15px;" />' + v;
	    			}else if(v === i18nP('COMMON_FORCE_QUIT')){
	    				imageText = '<img src="/resources/images/Circle_Red.png" alt="'+ i18nP('COMMON_FORCE_QUIT') +'" style="height:15px;" />' + v;
	    			}
	    			
	    			return imageText;
	        	}
	        },{
	        	name : 'username',
	        	label : i18nP('COMMON_USER_NAME'),
	        	width : 120,
	        	align : 'center',
	        },{
	        	name : 'jobStringId',
	        	label : 'jobStringId',
	        	width : 0,
	        	align : 'center',
	        	hidden : true,
	        },{
	        	name : 'workflowXml',
	        	label : 'workflowXml',
	        	width : 0,
	        	align : 'center',
	        	hidden : true,
	        },{
	        	name : 'workflowId',
	        	label : 'workflowId',
	        	width : 0,
	        	align : 'center',
	        	hidden : true,
	        },{
	        	name : 'jobId',
	        	label : 'jobId',
	        	width : 0,
	        	align : 'center',
	        	hidden : true,
	        },{
	        	name : 'jobName',
	        	label : 'jobName',
	        	width : 0,
	        	align : 'center',
	        	hidden : true,
	        },{
	        	name : 'totalStep',
	        	label : 'totalStep',
	        	width : 0,
	        	align : 'center',
	        	hidden : true,
	        },{
	        	name : 'status',
	        	label : 'status',
	        	width : 0,
	        	align : 'center',
	        	hidden : true,
	        },{
	        	name : 'jobType',
	        	label : 'jobType',
	        	width : 0,
	        	align : 'center',
	        	hidden : true,
	        },{
	        	name : 'exception',
	        	label : 'exception',
	        	width : 0,
	        	align : 'center',
	        	hidden : true,
	        },{
	        	name : 'currentStepValue',
	        	label : 'currentStepValue',
	        	width : 0,
	        	align : 'center',
	        	hidden : true,
	        },{
	        	name : 'cause',
	        	label : 'cause',
	        	width : 0,
	        	align : 'center',
	        	hidden : true,
	        }]
	    });
	};
	
	var _setRunningGrid = function(){
		$('#_ds_runningGrid').ankusGrid({
	   		url				: '',
	   		rowNum			: 16,
			datatype		: getRunningGridObj,
			rowList			: [],
	        ondblClickRow	: function(id){ 
	        	//$('#_modal').ankusModal('show');
	        },
	        beforeSelectRow: function(rowid, e)
	        {
	            jQuery("#_ds_runningGrid").jqGrid('resetSelection');
	            return(true);
	        },
	        colModel		: [{
	        	name : 'id',
	        	label : i18nP('COMMON_NUMBER'),
	        	width : 50,
	        	align : 'center',
	        	
	        },{
	        	name : 'workflowName',
	        	label : i18nP('COMMON_PROGRESS_RATE'),
	        	width : 200,
	        	align : 'center',
	        },{
	        	name : 'actionName',
	        	label : i18nP('COMMON_ACTION_NAME'),
	        	width : 150,
	        	align : 'center',

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
	        	align : 'center',
	        },{
	        	name : 'currentStep',
	        	label : i18nP('COMMON_PROGRESS_RATE'),
	        	width : 120,
	        	align : 'center',
	        	formatter : function(v){
	        		return $('<div style="height:15px; margin-bottom:0px;"></div>').ankusProgress(v)[0].outerHTML;
	            }
	        },{
	        	name : 'status',
	        	label : i18nP('COMMON_STATUS'),
	        	width : 120,
	        	align : 'center',
	        	formatter : function(v){
	        		
	        		var imageText='';
	        		
	    			if(v === i18nP('COMMON_SUCCESS')){
	    				imageText = '<img src="/resources/images/Circle_Blue.png" alt='+ i18nP('COMMON_SUCCESS') +' style="height:15px;" />' + v;
	    			}else if(v === i18nP('COMMON_FAIL')){
	    				imageText = '<img src="/resources/images/Circle_Red.png" alt="'+ i18nP('COMMON_FAIL') +'" style="height:15px;" />' + v;
	    			}else if(v === i18nP('COMMON_RUNNING')){
	    				imageText = '<img src="/resources/images/Circle_Green.png" alt="'+ i18nP('COMMON_RUNNING') +'" style="height:15px;" />' + v;
	    			}else if(v === i18nP('COMMON_FORCE_QUIT')){
	    				imageText = '<img src="/resources/images/Circle_Red.png" alt="'+ i18nP('COMMON_FORCE_QUIT') +'" style="height:15px;" />' + v;
	    			}
	    			
	    			return imageText;
	        	}
	        },{
	        	name : 'username',
	        	label : i18nP('COMMON_USER_NAME'),
	        	width : 120,
	        	align : 'center',
	        },{
	        	name : 'jobStringId',
	        	label : 'jobStringId',
	        	width : 0,
	        	align : 'center',
	        	hidden : true,
	        }]
	    });
	};

	$('#_ds_popupWorkFlowHistoryActionTabGrid').ankusGrid({
   		url				: '',
        multiselect		: false,
		pager			: false,
		rowNum			: 100,
		datatype		: '',
		onSelectRow: function(id) { 

			$("#_ds_popupActionTabActionId").text($('#_ds_popupWorkFlowHistoryActionTabGrid').getRowData(id).id);
			$("#_ds_popupActionTabStartTime").text($('#_ds_popupWorkFlowHistoryActionTabGrid').getRowData(id).startDate);
			$("#_ds_popupActionTabEndTime").text($('#_ds_popupWorkFlowHistoryActionTabGrid').getRowData(id).elapsed);
			$("#_ds_popupActionTabworkId").text($('#_ds_popupWorkFlowHistoryActionTabGrid').getRowData(id).jobId);
			$("#_ds_popupActionTabEndDate").text($('#_ds_popupWorkFlowHistoryActionTabGrid').getRowData(id).endDate);
			$("#_ds_popupActionTabStatus").text($('#_ds_popupWorkFlowHistoryActionTabGrid').getRowData(id).status);
			$("#_ds_popupActionTabworkFlowId").text($('#_ds_popupWorkFlowHistoryActionTabGrid').getRowData(id).workflowId);
			$("#_ds_popupActionTabActionName").text($('#_ds_popupWorkFlowHistoryActionTabGrid').getRowData(id).actionName);
			$("#_ds_popupActionTabLogPath").text($('#_ds_popupWorkFlowHistoryActionTabGrid').getRowData(id).logPath);
			
			$('#_ds_popupWorkFlowHistory_conmmandTabValue').text($('#_ds_popupWorkFlowHistoryActionTabGrid').getRowData(id).command);
			$('#_ds_popupWorkFlowHistory_errorMessageValue').text($('#_ds_popupWorkFlowHistoryActionTabGrid').getRowData(id).cause);
					
			if($('#_ds_popupWorkFlowHistory_scriptTabDiv').is(':visible')){
				
				 $('#_ds_popupWorkFlowHistory_scriptTabValue').ankusCode({
		            	value : $('#_ds_popupWorkFlowHistoryActionTabGrid').getRowData(id).script
		            });
			}
			else{
				$('[data-type="_ds_popupWorkFlowHistory_scriptTab"]').one('click', function(){
					$('#_ds_popupWorkFlowHistory_scriptTabValue').ankusCode({
		            	value : $('#_ds_popupWorkFlowHistoryActionTabGrid').getRowData(id).script
		            });
				});
			}
			
			var param = {
				
					actionId	: 	id,
					engineId	:   $('#_ds_historyEngineSelect').val()					
					
			};
			
			getActionRunningLogData('/dashboard/log', param);
			
			
			
		},
        beforeSelectRow: function(rowid, e)
        {
            $("#_ds_runningGrid").jqGrid('resetSelection');
            return(true);
        },
        colModel		: [{
        	name : 'workflowId',
        	label : i18nP('COMMON_WORKFLOW'),
        	width : 100,
        	align : 'center',
        	
        },{
        	name : 'actionName',
        	label : i18nP('COMMON_ACTION_NAME'),
        	width : 100,
        	align : 'center',
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
    				imageText = '<img src="/resources/images/Circle_Blue.png" alt='+ i18nP('COMMON_SUCCESS') +' style="height:15px;" />' + v;
    			}else if(v === i18nP('COMMON_FAIL')){
    				imageText = '<img src="/resources/images/Circle_Red.png" alt='+ i18nP('COMMON_FAIL') +' style="height:15px;" />' + v;
    			}else if(v === i18nP('COMMON_RUNNING')){
    				imageText = '<img src="/resources/images/Circle_Green.png" alt='+ i18nP('COMMON_RUNNING') +' style="height:15px;" />' + v;
    			}else if(v === i18nP('COMMON_FORCE_QUIT')){
    				imageText = '<img src="/resources/images/Circle_Red.png" alt='+ i18nP('COMMON_FORCE_QUIT') +' style="height:15px;" />' + v;
    			}
    			
    			return imageText;
        	}
        },{
        	name : 'id',
        	label : 'id',
        	width : 0,
        	align : 'center',
        	hidden : true,
        },{
        	name : 'jobId',
        	label : 'jobId',
        	width : 0,
        	align : 'center',
        	hidden : true,
        },{
        	name : 'jobStringId',
        	label : 'jobStringId',
        	width : 0,
        	align : 'center',
        	hidden : true,
        },{
        	name : 'workflowName',
        	label : 'workflowName',
        	width : 0,
        	align : 'center',
        	hidden : true,
        },{
        	name : 'jobName',
        	label : 'jobName',
        	width : 0,
        	align : 'center',
        	hidden : true,
        },{
        	name : 'cause',
        	label : 'cause',
        	width : 0,
        	align : 'center',
        	hidden : true,
        },{
        	name : 'currentStep',
        	label : 'currentStep',
        	width : 0,
        	align : 'center',
        	hidden : true,
        },{
        	name : 'totalStep',
        	label : 'totalStep',
        	width : 0,
        	align : 'center',
        	hidden : true,
        },{
        	name : 'logPath',
        	label : 'logPath',
        	width : 0,
        	align : 'center',
        	hidden : true,
        },{
        	name : 'script',
        	label : 'script',
        	width : 0,
        	align : 'center',
        	hidden : true,
        },{
        	name : 'exception',
        	label : 'exception',
        	width : 0,
        	align : 'center',
        	hidden : true,
        },{
        	name : 'username',
        	label : 'username',
        	width : 0,
        	align : 'center',
        	hidden : true,
        },{
        	name : 'command',
        	label : 'command',
        	width : 0,
        	align : 'center',
        	hidden : true,
        }]
    });
	
	var $dsTab = $('[data-type^="_ds"]');
	$dsTab.on('click', function(){
		var $this = $(this);
		
		if($this.attr('data-type') === '_ds_workFlowHistory'){
			
			$('#_ds_historyDiv').show();
			$('#_ds_runningWorkFlowDiv').hide();
			
		}else if($this.attr('data-type') === '_ds_runningWorkFlow'){
			
			$('#_ds_historyDiv').hide();
			$('#_ds_runningWorkFlowDiv').show();
			
		}else if($this.attr('data-type') === '_ds_popupWorkFlowHistory_workTab'){
			
			$('#_ds_popupWorkFlowHistory_workDiv').show();
			$('#_ds_popupWorkFlowHistory_actionDiv').hide();
			
		}else if($this.attr('data-type') === '_ds_popupWorkFlowHistory_actionTab'){
			
			$('#_ds_popupWorkFlowHistory_workDiv').hide();
			$('#_ds_popupWorkFlowHistory_actionDiv').show();
			
		}else if($this.attr('data-type') === '_ds_popupWorkFlowHistory_workXmlTab'){
			
			$('#_ds_popupWorkFlowHistory_workflowXmlDiv').show();
			$('#_ds_popupWorkFlowHistory_errorLogDiv').hide();
			
		}else if($this.attr('data-type') === '_ds_popupWorkFlowHistory_errorLogTab'){
			
			$('#_ds_popupWorkFlowHistory_workflowXmlDiv').hide();
			$('#_ds_popupWorkFlowHistory_errorLogDiv').show();
						
			$('#_ds_popupWorkFlowHistory_errorLogCause').text($('#_ds_historyGrid').getRowData(gridId).cause);
			
            $('#_ds_popupWorkFlowHistory_errorLogValue').ankusCode({
            	value : $('#_ds_historyGrid').getRowData(gridId).exception
            });
			
		}else if($this.attr('data-type') === '_ds_popupWorkFlowHistory_conmmandTab'){
			
			$('#_ds_popupWorkFlowHistory_conmmandTabDiv').show();
			$('#_ds_popupWorkFlowHistory_scriptTabDiv').hide();
			$('#_ds_popupWorkFlowHistory_runningLogTabDiv').hide();
			$('#_ds_popupWorkFlowHistory_errorMessageTabDiv').hide();
			
		}else if($this.attr('data-type') === '_ds_popupWorkFlowHistory_scriptTab'){
			
			$('#_ds_popupWorkFlowHistory_conmmandTabDiv').hide();
			$('#_ds_popupWorkFlowHistory_scriptTabDiv').show();
			$('#_ds_popupWorkFlowHistory_runningLogTabDiv').hide();
			$('#_ds_popupWorkFlowHistory_errorMessageTabDiv').hide();
			
		}else if($this.attr('data-type') === '_ds_popupWorkFlowHistory_runningLogTab'){
			
			$('#_ds_popupWorkFlowHistory_conmmandTabDiv').hide();
			$('#_ds_popupWorkFlowHistory_scriptTabDiv').hide();
			$('#_ds_popupWorkFlowHistory_runningLogTabDiv').show();
			$('#_ds_popupWorkFlowHistory_errorMessageTabDiv').hide();
			
		}else if($this.attr('data-type') === '_ds_popupWorkFlowHistory_errorMessageTab'){
			
			$('#_ds_popupWorkFlowHistory_conmmandTabDiv').hide();
			$('#_ds_popupWorkFlowHistory_scriptTabDiv').hide();
			$('#_ds_popupWorkFlowHistory_runningLogTabDiv').hide();
			$('#_ds_popupWorkFlowHistory_errorMessageTabDiv').show();
			
		}
				
		
	});
	
	$('#_ds_historyEngineSelect').on('change', function(){
		
		$('#_ds_historyGrid').trigger('reloadGrid');
		
		
	});
	
	$('#_ds_runningWorkflowEngineOption').on('change', function(){
				
		$('#_ds_runningGrid').trigger('reloadGrid');
		
	});
	
	
	$('#_ds_historySearchBtn').on('click', function(){
		
		$('#_ajaxLoading').show();
		
		var start = $('#_ds_startDatePicker').val();
		var end = $('#_ds_endDatePicker').val();
		var startReplace = start.replace(/-/gi, '');
		var endReplace = end.replace(/-/gi, '');
			
		var status;
		
		switch($('#_ds_status').val()){
			
			case '0':
				status = 'ALL'
				break;
				
			case '1':
				status = 'RUNNING'
				break;
				
			case '2':
				status = 'SUCCESS'
				break;
				
			case '3':
				status = 'FAIL'
				break;
				
			case '4':
				status = 'KILL'
				break;
		}
		
		
		var workflowName = $('#_ds_flowName').val();
		var engindId = $('#_ds_historyEngineSelect').val();
	
			
		if(startReplace > endReplace){
			
			ANKUS_API.util.alert(i18nP('JS_START_END_DTTM_CHECK'));
			
			$('#_ajaxLoading').hide();
			
		}else{
			
			//console.log('test');
			var url = '/dashboard/workflows';
			var param = {
				
					startDate	 	: startReplace,
					endDate 		: endReplace,
					status			: status,
					workflowName	: workflowName,
					userName		: loginId,
					jobType			: 'WORKFLOW',
					engineId		: engindId,
					start			: '0',
					page			: '1',
					limit			: '16'
										
			};
			
			workflowHistorySearchGrid(url, param);
			
		}	
	});
	
	
	$('#_ds_historyClearBtn').on('click', function(){

		$('#_ajaxLoading').show();
		
		$('#_ds_startDatePicker').val('');
		$('#_ds_endDatePicker').val('');
		$('#_ds_status').val(i18nP('COMMON_ALL'));
		$('#_ds_flowName').val('');
		
		$('#_ajaxLoading').hide();
		
	});
	
	$('#_ds_historyDeleteBtn').on('click', function(){
		
		ANKUS_API.util.confirm({
			description	: i18nP('JS_COMMON_DELETE_CHECK', 'Workflow History'),
			callback : function(sel){
				
				if(sel){
					
					$('#_ajaxLoading').show();
					
					var arrGridSelect = $('#_ds_historyGrid').getGridParam('selarrrow').join(', ');
					
					if(arrGridSelect.length === 0){
						
						ANKUS_API.util.alert(i18nP('JS_COMMON_SELECT_CHECK', 'Grid'));
						
						$('#_ajaxLoading').hide();
						
					}else{
						
						var rowId = jQuery('#_ds_historyGrid').jqGrid('getGridParam','selrow');;
						var jobId = jQuery('#_ds_historyGrid').jqGrid('getRowData', rowId).jobStringId;
						
						var url = '/dashboard/delete';
						
						var param = {
							
								jobStringId : jobId
						};
						
						deleteRowWorkFlowHistory(url, param);
						
					}	
				}
				
			}
		});
		
	});
	
	
	var doGet = function(url, param, successCallback, doneCallback, failCallBAck, alwaysCallBack){
		
		
//		$.get(url, param, successCallback, '*/*' /*json, xml, text, script, html */)
		$.get(url, param, successCallback, 'json'/* xml, text, script, html */)
			.done(doneCallback)
			.fail(failCallBAck) 
			.always(alwaysCallBack);
	};
	
	var workflowHistorySearchGrid = function(url, param){
		
		doGet(url, param, function successCallback(res){
						
			var list = res.list;
			
			for(var i=0; i<list.length; i++){
				
				//console.log(list[i].status);
				
				if(list[i].status === 'SUCCESS'){
					
					list[i].status = i18nP('COMMON_SUCCESS');
					
				}else if(list[i].status === 'FAIL'){
					
					list[i].status = i18nP('COMMON_FAIL');
					
				}else if(list[i].status === 'RUNNING'){
					
					list[i].status = i18nP('COMMON_RUNNING');
					
				}else if(list[i].status === 'KILL'){
					
					list[i].status = i18nP('COMMON_FORCE_QUIT');
					
				}
				
				
				if(list[i].currentStep === 0){
					
					list[i].currentStep = 0;
					
				}else if(list[i].currentStep === 1){
					
					list[i].currentStep = 33;
					
				}else if(list[i].currentStep === 2){
					
					list[i].currentStep = 66;
					
				}else if(list[i].currentStep === 3){
					
					list[i].currentStep = 100;
				}
				
				var sec = list[i].elapsed; 
				var timeObj = secondsToTime(sec * 60);
				
				var h = timeObj.h;
				var m = timeObj.m;
				var s = timeObj.s;
				
				list[i].elapsed = h+':'+m;
										
			}
			
			$('#_ds_historyGrid')[0].addJSONData({
				rows : list,
				page : Math.ceil(res.start/res.limit),
				records : res.total,
				total : Math.ceil(res.total/16)
			});				
			
//			$('#_ds_historyGrid').ankusSetGridData(list);
			
		},function doneCallback(res){
			
		},function failCallBAck(res){
							
		},function alwaysCallBack(res){
			
			$('#_ajaxLoading').hide();
			
		});	
		
	};

	var hisroyEngineSelelct = function (url, param){
		
		doGet(url, param, function successCallback(res){
			
		},function doneCallback(res){
						
		    var list = res.list;
		    var i = 0;
		    
		    for(i;i<list.length;i++){
		    	$('#_ds_historyEngineSelect').append('<option value="'+list[i].id+'">'+ list[i].instanceName+ '</option>');
		    }
		    $('#_ajaxLoading').hide();
		    
		},function failCallBAck(res){
							
		},function alwaysCallBack(res){
			
			$('#_ajaxLoading').hide();
		});	
		
	}
	
	var runningEngineSelelct = function(url, param){
		
		doGet(url, param, function successCallback(res){
			
		},function doneCallback(res){
						
		    var list = res.list;
		    var i = 0;
		    
		    for(i;i<list.length;i++){
		    	$('#_ds_runningWorkflowEngineOption').append('<option value="'+list[i].id+'">'+ list[i].instanceName+ '</option>');
		    }
			
		},function failCallBAck(res){
							
		},function alwaysCallBack(res){
			
		});	
		
	};
	
	var hisroyEngineGrid = function(url, param){
		
		doGet(url, param, function successCallback(res){
			
		},function doneCallback(res){
					  	
			if(res.success){
				
				var list = res.list;
				
				for(var i=0; i<list.length; i++){
					
					if(list[i].status === 'SUCCESS'){
						
						list[i].status = i18nP('COMMON_SUCCESS');
					
					}else if(list[i].status === 'FAIL'){
						
						list[i].status = i18nP('COMMON_FAIL');
						
					}else if(list[i].status === 'RUNNING'){
						
						list[i].status = i18nP('COMMON_RUNNING');
						
					}else if(list[i].status === 'KILL'){
						
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
					
					var sec = list[i].elapsed; 
					var timeObj = secondsToTime(sec * 60);
					
					var h = timeObj.h;
					var m = timeObj.m;
					var s = timeObj.s;
					
					list[i].elapsed = h+':'+m;
											
				}
				
				$('#_ds_historyGrid').ankusSetGridData(list);
				
			}else{
				
				ANKUS_API.util.alert('hisroyEngineGrid success = ' + res.error.message);
			}
					
		},function failCallBAck(res){
							
		},function alwaysCallBack(res){
			
			$('#_ajaxLoading').hide();
			
		});	
		
	};
	
	var runningEngineGrid = function(url, param){
		
		doGet(url, param, function successCallback(res){
			
		},function doneCallback(res){
					
		},function failCallBAck(res){
							
		},function alwaysCallBack(res){
			
			$('#_ajaxLoading').hide();
			
		});	
		
	};
	
	var secondsToTime = function(secs){
		
		var hours = Math.floor(secs / (60 * 60));
		   
	    var divisor_for_minutes = secs % (60 * 60);
	    var minutes = Math.floor(divisor_for_minutes / 60);
	 
	    var divisor_for_seconds = divisor_for_minutes % 60;
	    var seconds = Math.ceil(divisor_for_seconds);
	   
	    var obj = {
	        "h": hours,
	        "m": minutes,
	        "s": seconds
	    };
	    
	    return obj;
		
	};
	
	var deleteRowWorkFlowHistory = function(url, param){
		
		doGet(url, param, function successCallback(res){
			
					
		},function doneCallback(res){
			
			
		},function failCallBAck(res){
			
			
		},function alwaysCallBack(res){
						
			var engineVal = $('#_ds_historyEngineSelect').val();
			
			if(engineVal !== '' && engineVal !== null){
				
				var url = '/dashboard/workflows';
				
				param = {
					
						startDate	 	: '',
						endDate 		: '',
						status			: 'ALL',
						workflowName	: '',
						userName		: loginId,
						jobType			: 'WORKFLOW',
						engineId		: engineVal,
						start			: '0',
						page			: '1',
						limit			: '16'
									
						
				};	
			
				$('#_ds_engineId').val(engineVal);
				
				hisroyEngineGrid(url , param);
				
			}
			
			
			
			
		});	
		
		
	};
	
	var runningWorkflowGridData = function(url, param){
		
		doGet(url, param, function successCallback(res){
			
			
		},function doneCallback(res){
			
			var list = res.list;
			
			$('#_ds_runningGrid').ankusSetGridData(list);
			
		},function failCallBAck(res){
			
			
		},function alwaysCallBack(res){
			
		});	
		
		
		
	};
	
	$('#_ds_runningflowUpdateBtn').on('click', function(){
		
		var runningSelectValue = $('#_ds_runningWorkflowEngineOption').val();
		var engineVal = $('#_ds_runningWorkflowEngineOption').val();
		if(runningSelectValue === ''){
			
			ANKUS_API.util.alert(i18nP('JS_COMMON_SELECT_CHECK', 'COMMON_WORKFLOW_ENGINE'));
			
		}else{
			$('#_ajaxLoading').show();
			
			var url = '/dashboard/actions';
			
			var param = {
				
					username : loginId,
					status	 : 'RUNNING',
					engineId : engineVal,
					jobId	 : '',
					start	 : '0',
					page	 : '1',
					limit	 : '16'
			};
			
			doGet(url, param, function successCallback(res){
							
			},function doneCallback(res){
					
				if(res.success){
					
					var list = res.list;
					
					for(var i=0; i<list.length; i++){
						
						if(list[i].status === 'SUCCESS'){
							
							list[i].status = i18nP('COMMON_SUCCESS');
							
						}else if(list[i].status === 'FAIL'){
							
							list[i].status = i18nP('COMMON_FAIL');
							
						}else if(list[i].status === 'RUNNING'){
													
							list[i].status = i18nP('COMMON_RUNNING');
							
						}else if(list[i].status === 'KILL'){
							
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
						
						var sec = list[i].elapsed; 
						var timeObj = secondsToTime(sec * 60);
						
						var h = timeObj.h;
						var m = timeObj.m;
						var s = timeObj.s;
						
						list[i].elapsed = h+':'+m;
												
					}
									
					$('#_ds_runningGrid').ankusSetGridData(list);
					
				}else{
					
					ANKUS_API.util.alert(res.error.message);
				}
				
				
			},function failCallBAck(res){
				
			},function alwaysCallBack(res){
				
				$('#_ajaxLoading').hide();
				
			});	
			
		}	
	});
	
	var getActionTabGridData = function(url, param){
		
		doGet(url, param, function successCallback(res){
						
		},function doneCallback(res){
					
			var list = res.list;
			
			for(var i=0; i<list.length; i++){
				
				if(list[i].status === 'SUCCESS'){
					
					list[i].status = i18nP('COMMON_SUCCESS');
					
				}else if(list[i].status === 'FAIL'){
					
					list[i].status = i18nP('COMMON_FAIL');
					
				}else if(list[i].status === 'RUNNING'){
					
					list[i].status = i18nP('COMMON_RUNNING');
					
				}else if(list[i].status === 'KILL'){
					
					list[i].status = i18nP('COMMON_FORCE_QUIT');
					
				}
				var sec = list[i].elapsed; 
				var timeObj = secondsToTime(sec * 60);
				
				var h = timeObj.h;
				var m = timeObj.m;
				var s = timeObj.s;
				
				list[i].elapsed = h+':'+m;
			}
			$('#_ds_popupWorkFlowHistoryActionTabGrid').ankusSetGridData(list);
			
		},function failCallBAck(res){
			
		},function alwaysCallBack(res){
			$('#_ajaxLoading').hide();
		});	
		
		
	};
	
	var getActionRunningLogData = function(url, param){
		
		doGet(url, param, function successCallback(res){
						
		},function doneCallback(res){
			
			if($('#_ds_popupWorkFlowHistory_runningLogTabDiv').is(':visible')){
				
				 $('#_ds_popupWorkFlowHistory_runningLogTabValue').ankusCode({
		            	value : res
		            });
			}
			else{
				$('[data-type="_ds_popupWorkFlowHistory_runningLogTab"]').one('click', function(){
					$('#_ds_popupWorkFlowHistory_runningLogTabValue').ankusCode({
		            	value : res
		            });
				});
			}
		},function failCallBAck(res){
			
		},function alwaysCallBack(res){
			
		});	
		
		
	};
	
	
	$('#_ds_popupWorkFlowHistory_actionUpdateBtn').on('click', function(){
		
		$('#_ajaxLoading').show();
		
    	var param = {
    			
    			jobId 			: ($('#_ds_historyGrid').getRowData(gridId).jobId),
    			engineId 		: $('#_ds_historyEngineSelect').val(),
    			page			: '1',
    			start			: '0',
    			limit			: '25'
    	};
   
    	getActionTabGridData('/dashboard/actions', param);
		
		
	});
	
	(function getFlowEngine(){
	
		$('#_ajaxLoading').show();
		
		var url = '/admin/engine/engines';
		var param = {
				
				type	 		: 'ALL',
				username 		: loginId,
				query			: '',
				page			: '1',
				start			: '0',
				limit			: '25'									
		};

		hisroyEngineSelelct(url, param);	
		
	})();	
	
	(function getRunningEngine(){
	
		$('#_ajaxLoading').show();
		
		var url = '/admin/engine/engines';
		var param = {
				
				type	 		: 'ALL',
				username 		: loginId,
				query			: '',
				page			: '1',
				start			: '0',
				limit			: '25'									
		};
	
		runningEngineSelelct(url, param);
		
	})();
	
	var getHistoryGridObj = function(p){
			
		if(!$('#_ds_historyEngineSelect').val()){return 'local';}					
		
		var start = $('#_ds_startDatePicker').val();
		var end = $('#_ds_endDatePicker').val();
		var startReplace = start.replace(/-/gi, '');
		var endReplace = end.replace(/-/gi, '');
			
		var status;
		
		switch($('#_ds_status').val()){
			
			case '0':
				status = 'ALL'
				break;
				
			case '1':
				status = 'RUNNING'
				break;
				
			case '2':
				status = 'SUCCESS'
				break;
				
			case '3':
				status = 'FAIL'
				break;
				
			case '4':
				status = 'KILL'
				break;
		}
		
		
		var workflowName = $('#_ds_flowName').val();
		var engindId = $('#_ds_historyEngineSelect').val();
		
		ANKUS_API.ajax({
			url			: '/dashboard/workflows',
			data		: {
				startDate	 	: start,
				endDate 		: end,
				status			: status,
				workflowName	: workflowName,
				userName		: loginId,
				jobType			: 'WORKFLOW',
				engineId		: engindId,
				start			: (p.page-1)*16,
				page			: p.page,
				limit			: '16'
			},
			success		: function(res){
				if(res.success){
					var list = res.list;
					
					for(var i=0; i<list.length; i++){
						
						if(list[i].status === 'SUCCESS'){
							
							list[i].status = i18nP('COMMON_SUCCESS');
						
						}else if(list[i].status === 'FAIL'){
							
							list[i].status = i18nP('COMMON_FAIL');
							
						}else if(list[i].status === 'RUNNING'){
							
							list[i].status = i18nP('COMMON_RUNNING');
							
						}else if(list[i].status === 'KILL'){
							
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
						
						var sec = list[i].elapsed; 
						var timeObj = secondsToTime(sec * 60);
						
						var h = timeObj.h;
						var m = timeObj.m;
						var s = timeObj.s;
						
						list[i].elapsed = h+':'+m;
					}
					
					$('#_ds_historyGrid')[0].addJSONData({
						rows : list,
						page : p.page||1,
						records : res.total,
						total : Math.ceil(res.total/16)
					});				
				}else{					
					ANKUS_API.util.alert('hisroyEngineGrid success = ' + res.error.message);
				}
			}
		});
		
		
	};
	
	var getRunningGridObj = function(p){
		
		if(!$('#_ds_runningWorkflowEngineOption').val()){return 'local';}					
		
		var engineVal = $('#_ds_runningWorkflowEngineOption').val();
		
		if(engineVal !== '' && engineVal !== null){
	
			ANKUS_API.ajax({
				url			: '/dashboard/workflows',
				data		: {
					startDate	 	: '',
					endDate 		: '',
					status			: 'RUNNING',
					workflowName	: '',
					userName		: loginId,
					jobType			: 'WORKFLOW',
					engineId		: engineVal,
					start			: '0',
					page			: '1',
					limit			: '16'
				},
				success		: function(res){
					if(res.success){
						
						var list = res.list;
						
						for(var i=0; i<list.length; i++){
							
							if(list[i].status === 'SUCCESS'){
								
								list[i].status = i18nP('COMMON_SUCCESS');
								
							}else if(list[i].status === 'FAIL'){
								
								list[i].status = i18nP('COMMON_FAIL');
								
							}else if(list[i].status === 'RUNNING'){
														
								list[i].status = i18nP('COMMON_RUNNING');
								
							}else if(list[i].status === 'KILL'){
								
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
							
							var sec = list[i].elapsed; 
							var timeObj = secondsToTime(sec * 60);
							
							var h = timeObj.h;
							var m = timeObj.m;
							var s = timeObj.s;
							
							list[i].elapsed = h+':'+m;
													
						}
										
						$('#_ds_runningGrid')[0].addJSONData({
							rows : list,
							page : p.page||1,
							records : res.total,
							total : Math.ceil(res.total/16)
						});	
					}else{
						
						ANKUS_API.util.alert(res.error.message);
					}
				}
			});
			
		}
		
	};
	
	_setHistoryGrid();
	_setRunningGrid();
	
})();