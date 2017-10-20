(function monitoring(){
	var timerId; 				// 새로고침 타이머 ID
	var realtimeMaxIndex = 20; 	// 실시간 그래프 표시 제한수
	var d3WebCpuData = []; 		// 웹서버 CPU 좌표 데이터
	var d3WebCpu_X = 1; 		// 웹서버 시작 X 위치
	var d3MasterCpuData = []; 	// 마스터 서버 시작 X 위치
	var d3MasterCpu_X = 1; 		// 웹서버 시작 X 위치
	var d3DataNodeCpuData = []; 	// 데이터노드 서버 시작 X 위치
	var d3DataNodeCpu_X = 1; 	// 데이터노드 서버 시작 X 위치
	var dataNodeDatas = []; 	// 데이터노드 목록 정보
	var dataNodeSelectData = undefined; 	// 데이터노드 선택 값
	
	// 공통 탭 메뉴 이벤트
	$('#_tabMonitoring').one('click', function(){
		$('#_conMonitoring')
			.css({
				width : '100%',
				height : '100%'
			})
			.layout({
				west__size : 320,
				south__size : 200,
				inset : {
					top : 10,
					bottom : 10,
					left : 10,
					right : 10
				}
			})
			.show()
		;
		_getEngine();
		setTimeout(function(){
			$('#_mo_btnRefresh').trigger('click');
		},1000);
	});
	
	$('#_mo_clusterName').on('change', _changeClusterName); // 하둡 선택 이벤트
	$('#_mo_btnRefresh').on('click', _btnRefreshAction); // 새로고침 이벤트
	
	// 하둡 cluster name 변경
	function _changeClusterName(){
		_requestHadoopStatus(0);
	};
	// 갱신 버튼 실행
	function _btnRefreshAction(){
		_requestHadoopStatus(2);
	};
	
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
				var tmpOption = $('#_mo_template_engine ._mo_tmpOption')[0].outerHTML;
				
				$(list).each(function(index, obj){
					$(tmpOption).val(obj.id).text(obj.instanceName).data('obj', obj).appendTo('#_mo_clusterName');
				});
			}
		});
	};
	
	/**
     * 모니터링 정보를 요청한다.(웹,하둡,마스터노드,네임노드, CPU,메모리,용량 등);
     * param type 요청상태(0:최초,1:자동새로고침,2:수동새로고침
     */
	function _requestHadoopStatus(type){
//    	console.log("requestHadoopStatus");
    	_stopTimerRequest(); // 타이머 초기화
    	
    	var engineId = $('#_mo_clusterName').val();
    	
    	console.log(engineId);
    	if(engineId == undefined || engineId == null){
    		return;
    	}
    	
    	var hiddenLoading = true; 
       // var param = "engineId=" + engineId;
    	var param = {'engineId':engineId};
//        var param = {"hadoopurl":me.hadoopIP, "account":account, "pwd":pwd};
        if(type === 0 || type === 2){
        	hiddenLoading = false;
        }
        //console.log(param);
        ANKUS_API.ajax({
			url			: '/monitoring/get_hadoopstatus',
			type		: 'GET',
			data		: param,
			hiddenLoading : hiddenLoading,
			success		: function(res){
				if (res.code === 0) { // 성공
					_setHadoopStatus(res.data, type);
				} else { // 실패
					if (type === 0 || type === 2) {
						//fail
					} else {
						_startTimerRequest();
					}
				}
			},
			error : function(xhr, status, error) {
				if(type === 0 || type === 2){
					//fail
                }else{
                	_startTimerRequest();
                }
	        }
		});
    }
    
    /**
     * 모니터링 정보를 표시한다.
     * param obj 모니터링정보
     * 		 type 상태(0:최초,1:자동새로고침,2:수동새로고침
     */
	function _setHadoopStatus(obj, type){
//    	console.log("setHadoopStatus");
    	
    	if(type === 0 || type === 2){
    		dataNodeSelectData = undefined // 데이터노드 선택값 초기화
    	}
    	
//    	me.serverInfo = obj;
    	// 웹서버정보 설정
    	_setWebServerInfo(obj, type);
    	// 하둡정보 설정 
    	_setHadoopInfo(obj.hadoopclusterinfo, type);
    	// MasterNode 설정
    	_setMasterNodeInfo(obj.hadoopclusterinfo, type);
    	// DataNodeList 설정
    	_setDataNodeList(obj.hadoopclusterinfo, type);
    	
    	// 자동새로고침을 위한 타이머를 시작한다.
    	_startTimerRequest();
    }
    
    /**
     * 웹서버 정보를 표시한다.(CPU,메모리,디스크)
     * param type 상태(0:최초,1:자동새로고침,2:수동새로고침
     */
	function _setWebServerInfo(obj, type){
//    	console.log("setWebServerInfo:type = " + type);
    	var $d3WebCPU = $("#_mo_d3WebCPU"); // Web서버  CPU 그래프
    	var $d3WebMemory = $("#_mo_d3WebMemory"); // Web서버 메모리 그래프
    	var $d3WebDisk = $("#_mo_d3WebDisk"); // Web서버 디스크 그래프
    	if(obj !== undefined){
    		// CPU 설정
    		if(obj.cpuload !== 0){
//    			$('.nvtooltip').remove();
    			
    			var cpu = obj.cpuload*100;
    			if(type === 0 || type === 2){
    				d3WebCpuData = [];
    				d3WebCpuData.push({x:0, y:0}); // 디폴트값
    				d3WebCpuData.push({x:d3WebCpu_X, y:cpu});
    				
    				$d3WebCPU.ankusChartNv({
    					type	: 'line',
    					yMax	: 100,
    					yMin	: 0,
    					data	: [{
    						values : d3WebCpuData,
        					key : '',
        					color : '#7777ff'
						}]
    				});		
    			}else{
    				d3WebCpuData.push({x:d3WebCpu_X, y:cpu});
    				
    				if(d3WebCpuData.length === realtimeMaxIndex){
    					d3WebCpuData.splice(0, 1);
    				}
    				
    				$d3WebCPU.ankusUpdateNv([{
    					values : d3WebCpuData,
    					key : '',
    					color : '#7777ff'
    				}]);
    			}
    			d3WebCpu_X++;
    		}
    		
    		// 메모리 용량 설정
    		var memoryData = [];
    		var usedMemory = obj.totalmemory - obj.freememory; // 사용중 메모리 구하기
    		var freeMemoryPercent = Math.floor(((obj.freememory/obj.totalmemory)*100)); // 남은 용량 %
			var usedMemoryPercent = 100-freeMemoryPercent; // 사용 용량 %
			
    		memoryData.push({label:i18nP('COMMON_USE_RATE') + " " + _getCapacityText(usedMemory) + "   ", value:usedMemoryPercent}); // 사용중 메모리
    		memoryData.push({label:i18nP('COMMON_REMAINGING_SPACE') + " " + _getCapacityText(obj.freememory), value:freeMemoryPercent}); // 남은 메모리
    		if(obj.totalmemory !== 0){
    			if(type === 0 || type === 2){
    				$d3WebMemory.ankusChartNv({
    					type	: 'pie',
    					data	: memoryData,
    					isDonut	: false
    				});
    			}else{
    				$d3WebMemory.ankusUpdateNv(memoryData);
    			}
    		}
    		
    		// 디스크 용량 설정
    		var diskData = [];
    		
    		var freeDisk = 0; // 남은 용량
			var usedDisk = 0; // 사용중 용량
			var totalDisk = 0; // 전체용량
    		$.each(obj.disks, function(i, disk){
    			totalDisk = totalDisk + disk.size;
    			freeDisk = freeDisk + disk.free;
    			usedDisk = usedDisk + disk.size - disk.free; 
    		});
    		var freeDiskPercent = Math.floor(((freeDisk/totalDisk)*100)); // 남은 용량 %
			var usedDiskPercent = 100-freeDiskPercent; // 사용 용량 %
    		
    		diskData.push({label:i18nP('COMMON_USE_RATE') + " " + _getCapacityText(usedDisk) + "   ", value:usedDiskPercent}); // 사용중 메모리
    		diskData.push({label:i18nP('COMMON_REMAINGING_SPACE') + " " + _getCapacityText(freeDisk), value:freeDiskPercent}); // 남은 메모리
    		if(totalDisk !== 0){
    			if(type === 0 || type === 2){
    				$d3WebDisk.ankusChartNv({
    					type	: 'pie',
    					data	: diskData,
    					isDonut	: false
    				});
    			}else{
    				$d3WebDisk.ankusUpdateNv(diskData);
    			}
    		}
    	}
    }    
    /**
     * 하둡 정보를 표시한다.(하둡버전, live노드스, dead노드수, 복제수, 블럭크기, 하둡용량)
     * param type 상태(0:최초,1:자동새로고침,2:수동새로고침
     */
	function _setHadoopInfo(obj, type){
//    	console.log("setHadoopInfo");
    	var $gridHadoopInfo = $("#_mo_gridHadoopInfo"); // 그리드뷰
    	var $d3HadoopCapacity = $("#_mo_d3HadoopCapacity"); // 하둡 용량 그래프
    	
		var datas = [];
		if(obj !== undefined){
			datas.push({ 'key':i18nP('JS_MONIT_VERSION'),'value':obj.version }); // 하둡버젼
			datas.push({ 'key':i18nP('JS_MONIT_USAGE_NODE_COUNT'),'value':obj.livenode }); // live노드수
			datas.push({ 'key':i18nP('JS_MONIT_NON_USAGE_NODE_COUNT'),'value':obj.deadnode }); // dead노드수
			datas.push({ 'key':i18nP('JS_MONIT_COPY_COUNT'),'value':obj.replication }); // 복제수
			datas.push({ 'key':i18nP('JS_MONIT_BLOCK_SIZE'),'value':_getCapacityText(obj.blocksize) }); // 블럭크기(byte)
			
			// 하둡 용량 그래프 표시를 위한 데이터 설정
			var freeHadoop = obj.capacity - obj.used; // 하둡 남은용량
			var freeHadoopPercent = Math.floor(((freeHadoop/obj.capacity)*100)); // 남은 용량 %
			var usedHadoopPercent = 100-freeHadoopPercent; // 사용 용량 %
			
			var hadoopCapacityData = [];
			hadoopCapacityData.push({label:i18nP('JS_MONIT_HADOOP_USE_RATE') + " " + _getCapacityText(obj.used) + "   ", value:usedHadoopPercent}); // 하둡 사용량
			hadoopCapacityData.push({label:i18nP('JS_MONIT_HADOOP_REMAINING_SPACE') + " " + _getCapacityText(freeHadoop), value:freeHadoopPercent}); // 하둡 남은용량
			if(obj.capacity !== 0){
				if(type === 0 || type === 2){
					$d3HadoopCapacity.ankusChartNv({
	    				type	: 'pie',
	    				data	: hadoopCapacityData,
	    				isDonut	: false
	    			});
    			}else{
    				$d3HadoopCapacity.ankusUpdateNv(hadoopCapacityData);
    			}
			}
		}
		
		$gridHadoopInfo.jqGrid("GridUnload").ankusGrid({
			url			: '',
			pager		: false,
			datatype	: 'local',
			data		: datas,
			rowNum		: 1000,
			colModel	: [{
				name : 'key',
				label : 'key',
				align : 'center'
			},{
				name : 'value',
				label : 'value',
				align : 'center'
			}]
	    });
    }
    
    /**
     * MasterNode 정보를 표시한다.(CPU, 메모리, 디스크)
     * param type 상태(0:최초,1:자동새로고침,2:수동새로고침
     */
	function _setMasterNodeInfo(obj, type){
//    	console.log("setMasterNodeInfo");
    	var $d3MasterCpu = $('#_mo_d3MasterCPU'); // MasterNode CPU 그래프
    	var $d3MasterMemory = $('#_mo_d3MasterMemory'); // MasterNode 메모리 그래프
    	var $d3MasterDisk = $('#_mo_d3MasterDisk'); // MasterNode 디스크 그래프
    	
    	if(obj !== undefined){
    		// CPU 설정
    		if(obj.cpuload !== 0){
    			var cpu = obj.cpuload*100;
    			if(type === 0 || type === 2){
    				d3MasterCpuData = [];
    				d3MasterCpuData.push({x:0, y:0}); // 디폴트값
    				d3MasterCpuData.push({x:d3MasterCpu_X, y:cpu});
    				
    				$d3MasterCpu.ankusChartNv({
    					type	: 'line',
    					yMax	: 100,
    					yMin	: 0,
    					data	: [{
    						values : d3MasterCpuData,
        					key : '',
        					color : '#7777ff'
						}]
    				});
    			}else{
    				d3MasterCpuData.push({x:d3MasterCpu_X, y:cpu});
    				
    				if(d3MasterCpuData.length === realtimeMaxIndex){
    					d3MasterCpuData.splice(0, 1);
    				}
    				$d3MasterCpu.ankusUpdateNv([{
    					values : d3MasterCpuData,
    					key : '',
    					color : '#7777ff'
    				}]);
    			}
    			d3MasterCpu_X++;
    		}
    		
    		// 메모리 용량 설정
    		var memoryData = [];
    		var usedMemory = obj.totalmemory - obj.freememory; // 사용중 메모리 구하기
    		var freeMemoryPercent = Math.floor(((obj.freememory/obj.totalmemory)*100)); // 남은 용량 %
			var usedMemoryPercent = 100-freeMemoryPercent; // 사용 용량 %
			
    		memoryData.push({label:i18nP('COMMON_USE_RATE') + " " + _getCapacityText(usedMemory) + "   ", value:usedMemoryPercent}); // 사용중 메모리
    		memoryData.push({label:i18nP('COMMON_REMAINGING_SPACE') + " " + _getCapacityText(obj.freememory), value:freeMemoryPercent}); // 남은 메모리
    		if(obj.totalmemory !== 0){
    			if(type === 0 || type === 2){
    				$d3MasterMemory.ankusChartNv({
        				type	: 'pie',
        				data	: memoryData,
        				isDonut	: false
        			});
    			}else{
    				$d3MasterMemory.ankusUpdateNv(memoryData);
    			}
    		}
    		
    		// 디스크 용량 설정
    		var diskData = [];
    		
    		var freeDisk = 0; // 남은 용량
			var usedDisk = 0; // 사용중 용량
			var totalDisk = 0; // 전체용량
    		$.each(obj.disks, function(i, disk){
    			totalDisk = totalDisk + disk.size;
    			freeDisk = freeDisk + disk.free;
    			usedDisk = usedDisk + disk.size - disk.free; 
    		});
    		var freeDiskPercent = Math.floor(((freeDisk/totalDisk)*100)); // 남은 용량 %
			var usedDiskPercent = 100-freeDiskPercent; // 사용 용량 %
    		
    		diskData.push({label:i18nP('COMMON_USE_RATE') + " " + _getCapacityText(usedDisk) + "   ", value:usedDiskPercent}); // 사용중 메모리
    		diskData.push({label:i18nP('COMMON_REMAINGING_SPACE') + " " + _getCapacityText(freeDisk), value:freeDiskPercent}); // 남은 메모리
    		if(totalDisk !== 0){
    			if(type === 0 || type === 2){
    				$d3MasterDisk.ankusChartNv({
        				type	: 'pie',
        				data	: diskData,
        				isDonut	: false
        			});
    			}else{
    				$d3MasterDisk.ankusUpdateNv(diskData);
    			}
    		}
    	}
    }
    
    /**
     * DataNode 목록 정보를 표시한다.(노드이름, IP)
     * param type 상태(0:최초,1:자동새로고침,2:수동새로고침
     */
	function _setDataNodeList(obj, type){
//    	console.log("setDataNodeList::type = " + type);
    	var $gridDataNode = $('#_mo_gridDataNode'); // 그리드뷰
    	
		var nodeDatas = [];
		if(obj !== undefined){
			if(obj.nodes !== undefined){
				dataNodeDatas = obj.nodes;
				
				$.each(obj.nodes, function(i, node){
					nodeDatas.push({ 'name':node.name,'ip':node.ip , 'index':i}); 
				});
			}
		}
		
		$gridDataNode.jqGrid("GridUnload").ankusGrid({
			url			: '',
			pager		: false,
			datatype	: 'local',
			data		: nodeDatas,
			rowNum		: 1000,
			colModel	: [{
				name : 'name',
				label : i18nP('JS_MONIT_NAME'),
				align : 'center'
			},{
				name : 'ip',
				label : i18nP('JS_MONIT_IP_ADDR'),
				align : 'center'
			},{
				name : 'index',
				label : 'index',
				align : 'center',
				hidden : true
			}],
			onSelectRow		: function(id){ // 목록 선택 이벤트
				dataNodeSelectData = $gridDataNode.getRowData(id);
				_setDataNodeInfo(dataNodeSelectData, 0);
	        }
	    });
		// 이미 선택된 데이터노드 정보 초기화 또는 갱신
		if(type === 0 || type === 2){
			// 초기화
			var $d3DataNodeCpu = $('#_mo_d3DataNodeCPU'); // DataNode CPU 그래프
			var $d3DataNodeMemory = $('#_mo_d3DataNodeMemory'); // DataNode 메모리 그래프
	    	var $d3DataNodeDisk = $('#_mo_d3DataNodeDisk'); // DataNode 디스크 그래프
	    	
	    	$d3DataNodeCpu.empty();
	    	$d3DataNodeMemory.empty();
	    	$d3DataNodeDisk.empty();
		}else{
			// 갱신
			if(nodeDatas.length > 0){
				_setDataNodeInfo(dataNodeSelectData, 1);
			}
		}
    }
    
    /**
     * DataNode 정보를 표시한다.(목록, CPU, 메모리, 디스크, 노드용량)
     * param type 상태(0:처음,1:업데이트)
     */
	function _setDataNodeInfo(selectData, type){
//    	console.log("setDataNodeInfo");
    	if(selectData === undefined){ // 선택된 노드 정보가 없으면 리턴
    		return;
    	}
    	
    	var $gridDataNode = $('#_mo_gridDataNode'); // 그리드뷰
    	// DataNode 목록에서 선택된 위치정보 가져오기
//    	var selectedRecord = gridDataNode.getSelectionModel().getSelection()[0];
//    	var selectIndex = gridDataNode.store.indexOf(selectedRecord);
    	
    	// 기존에 선택한 데이터노드가 있는 지 체크
    	var selectIndex = -1; 
    	$.each(dataNodeDatas, function(i, obj){
    		if(obj.ip === selectData.ip){
    			selectIndex = i;
    			return;
    		}
    	});
    	
    	if(selectIndex > -1){
    		var rowId = $("#_mo_gridDataNode").jqGrid('getDataIDs')[selectIndex];
    		$("#_mo_gridDataNode").setSelection(rowId, false);
    	}
    	
    	var obj = dataNodeDatas[selectIndex];
    	
    	var $d3DataNodeCpu = $('#_mo_d3DataNodeCPU'); // DataNode CPU 그래프
		var $d3DataNodeMemory = $('#_mo_d3DataNodeMemory'); // DataNode 메모리 그래프
    	var $d3DataNodeDisk = $('#_mo_d3DataNodeDisk'); // DataNode 디스크 그래프
    	
    	if(type === 0){ // 처음선택시 초기화 후 진행
    		$d3DataNodeCpu.empty();
	    	$d3DataNodeMemory.empty();
	    	$d3DataNodeDisk.empty();
    	}
    	
		if(obj !== undefined){
			// CPU 설정
			if(obj.cpuload !== 0){
				var cpu = obj.cpuload*100;
				if(type === 0){ // 처음
					d3DataNodeCpuData = [];
					d3DataNodeCpuData.push({x:0, y:0}); // 디폴트값
					d3DataNodeCpuData.push({x:d3DataNodeCpu_X, y:cpu});
    				
					$d3DataNodeCpu.ankusChartNv({
    					type	: 'line',
    					yMax	: 100,
    					yMin	: 0,
    					data	: [{
    						values : d3DataNodeCpuData,
        					key : '',
        					color : '#7777ff'
						}]
    				});
				}else{ // 업데이트
					d3DataNodeCpuData.push({x:d3DataNodeCpu_X, y:cpu});
    				
    				if(d3DataNodeCpuData.length === realtimeMaxIndex){
    					d3DataNodeCpuData.splice(0, 1);
    				}
    				
    				$d3DataNodeCpu.ankusUpdateNv([{
    					values : d3DataNodeCpuData,
    					key : '',
    					color : '#7777ff'
    				}]);
    			}
				d3DataNodeCpu_X++;
			}
    		
			// 메모리 표시
    		var usedMemory = obj.totalmemory - obj.freememory; // 사용중 메모리 구하기
			var freeMemoryPercent = Math.floor(((obj.freememory/obj.totalmemory)*100)); // 남은 용량 %
			var usedMemoryPercent = 100-freeMemoryPercent; // 사용 용량 %
			
    		var memoryData = [];
    		memoryData.push({label:i18nP('COMMON_USE_RATE') + " " + _getCapacityText(usedMemory) + "   ", value:usedMemoryPercent}); // 사용중 메모리
    		memoryData.push({label:i18nP('COMMON_REMAINGING_SPACE') + " " + _getCapacityText(obj.freememory), value:freeMemoryPercent}); // 남은 메모리
    		if(obj.totalmemory !== 0){
    			if(type === 0){
    				$d3DataNodeMemory.ankusChartNv({
    					type	: 'pie',
    					data	: memoryData,
    					isDonut	: false
    				});
    			}else{
    				$d3DataNodeMemory.ankusUpdateNv(memoryData);
    			}
    		}
    		// 디스크 용량 표시
			var freeDisk = 0; // 남은 용량
			var usedDisk = 0; // 사용중 용량
			var totalDisk = 0; // 전체용량
			$.each(obj.disks, function(i, disk){
				totalDisk = totalDisk + disk.size;
    			freeDisk = freeDisk + disk.free;
    			usedDisk = usedDisk + disk.size - disk.free; 
    		});
			var freeDiskPercent = Math.floor(((freeDisk/totalDisk)*100)); // 남은 용량 %
			var usedDiskPercent = 100-freeDiskPercent; // 사용 용량 %
			
			var diskData = [];
			diskData.push({label:i18nP('COMMON_USE_RATE') + " " + _getCapacityText(usedDisk) + "   ", value:usedDiskPercent}); // 사용량
			diskData.push({label:i18nP('COMMON_REMAINGING_SPACE') + " " + _getCapacityText(freeDisk), value:freeDiskPercent}); // 남은용량
			if(totalDisk !== 0){
				if(type === 0){
					$d3DataNodeDisk.ankusChartNv({
	    				type	: 'pie',
	    				data	: diskData,
	    				isDonut	: false
	    			});
    			}else{
    				$d3DataNodeDisk.ankusUpdateNv(diskData);
    			}
			}
		}
    }
    
    /**
     * 용량 단위에 맞는 텍스트 리턴한다.
     * data byte
     */
	function _getCapacityText(data){
 		if (data !== undefined) {
 			if ((data / 1024 / 1024 / 1024 / 1024) >= 1) { // 테라바이트
 				data = _removeZeroDecimalPoint((data / 1024 / 1024 / 1024 / 1024).toFixed(2)) + " TB";
 			} else if (data / 1024 / 1024 / 1024 >= 1) { // 기가바이트
 				data = _removeZeroDecimalPoint((data / 1024 / 1024 / 1024).toFixed(2)) + " GB";
 			} else if (data / 1024 / 1024 >= 1) { // 메가바이트
 				data = _removeZeroDecimalPoint((data / 1024 / 1024).toFixed(2)) + " MB";
 			} else if (data / 1024 >= 1) { // 키로바이트
 				data = _removeZeroDecimalPoint((data / 1024).toFixed(2)) + " KB";
 			} else if (data >= 1) { // 바이트
 				data = _removeZeroDecimalPoint((data).toFixed(2)) + " Byte";
 			} else { // 비트
 				data = _removeZeroDecimalPoint(data.toFixed(2)) + " Bit";
 			}
 		}
 		return data;
    }
    
    /**
     * 제로 소수점 제거
     */
	function _removeZeroDecimalPoint(text){
    	if(text != undefined){
    		if(text.indexOf(".00") > -1){
 				text = text.substring(0, text.indexOf(".00"));
 			}
    	}
    	return text;
    }
    
    /**
     * 자동 새로고침을 위한 타이머를 시작한다.
     */
	function _startTimerRequest(){
		var interval = $("#_mo_time").val() * 1000;
    	var run = function(){

    		// 활성화 상태일때만 자동 새로고침
    		if($("#_tabMonitoring.active").length > 0){
    			_requestHadoopStatus(1);
    		}
		};
		$('.nvtooltip').css('opacity', '0'); // 그래프 툴팁 새로고침시 잔상 남는 현상 수정
		timerId = setTimeout(run, interval); // Timer
    }
    
    /**
     * 자동 새로고침을 종료한다.
     */
	function _stopTimerRequest(){
    	clearTimeout(timerId);
    }
	
})();