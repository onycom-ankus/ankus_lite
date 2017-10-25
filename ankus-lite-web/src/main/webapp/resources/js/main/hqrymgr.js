(function hqrymgr(){

		var hadoopIP;
		var hdfsUrl;
		
		// 화면 레이아웃 설정
//		var _setLayout = function(){
//			$('#_conHQryMgr')
//				.css({
//					width : '100%',
//					height : '100%'
//				})
//				.layout({					
//					north__size : '35%',									
//					inset : {
//						top : 10,
//						bottom : 10,
//						left : 10,
//						right : 10
//					}
//				})
//				.show();
//		};
		
		// 엔진 리스트 가져온 후 Select box에 설정
		var _getEngine = function(){
			ANKUS_API.ajax({
				url			: '/admin/engine/engines',
				data		: {
					_dc : new Date().getTime(),
					type : 'HADOOP',
					username : $('#_main_userId').val(),
					page : 1,
					start : 0,
					limit : 25
				},
				success		: function(res){					
					var list = res.list;
					var i = 0;
					var len = list.length;
					var tmpObj;
					var tmpOption = $('#_tq_template ._tq_tmpOption')[0].outerHTML;
					
					$('#_tq_clusterName').find('._tq_tmpOption').remove();
					
					for(; i<len; i++){
						tmpObj = list[i];
						$(tmpOption).val(tmpObj.id).text(tmpObj.instanceName).data('obj', tmpObj).appendTo('#_tq_clusterName');
						$(tmpOption).val(tmpObj.hadoopClusterId).text(tmpObj.id).data('obj', tmpObj).appendTo('#_tq_hadoopId');
					}
				}
			});
			
		};
		// cluster name 변경
		var _changeClusterName = function(){			
			_requestHadoopInfo();
		};	
		
		var _btnQueryAction = function(){
			_getQueryGrid();
		}
		
		var _getQueryGrid = function(){
			
			var postData = $('#_tq_tajoGrid').jqGrid('getGridParam', 'postData');	
			
			var port = $('#_tq_port').val();
			var dasebaseName = $('#_tq_DB').val();
			var tableName = $('#_tq_DBTable').val();
			var query = $('#_tq_query').val();
					
			//console.log(port);
			//console.log(dasebaseName);
			//console.log(query);
			
			if(dasebaseName === undefined || dasebaseName === null){
				ANKUS_API.util.alert(i18nP('JS_HQMGR_SELECT_CHECK', 'COMMON_DATABASE'));
	    		return;
	    	}
	    	
	    	if(tableName === undefined || tableName === null){
	    		ANKUS_API.util.alert(i18nP('JS_HQMGR_SELECT_CHECK', 'COMMON_TABLE'));
	    		return;
	    	}
	    	
	    	if(query.length == 0){
	    		ANKUS_API.util.alert(i18nP('JS_HQMGR_INPUT_CHECK', 'COMMON_QUERY', 'COMMON_INPUT'));
	    		return;
	    	}
			
//			var filePath = $('#_tq_grid').jqGrid("getGridParam", "selrow" );
//			var fileInfo =  $('#_tq_grid').jqGrid("getRowData", filePath);
//			var isFile = false;
//			
//			if(fileInfo.directory == false){
//				ANKUS_API.util.alert('파일을 선택하세요.');
//				return;				
//			}
			
			var data = {
					'ip':hadoopIP,
					'port':port,
					'database':dasebaseName,
					'sql':query
		    };
				       
			ANKUS_API.ajax({
				url			: '/run_tajoQuery',
				type		: 'GET',
				data		: data,
				success		: function(res){
					if(res.message == 'success'){
						if(res.code == 0 && res.data.length > 0){
							_m_colChange(res);
						}else{
							ANKUS_API.util.alert(i18nP('JS_HQMGR_NO_DATA'));
						}
					}else{
						//ANKUS_API.util.alert(res.error.message);
						
					}
				}
			});		
		};		
		
		var _m_colChange = function(obj){
			console.log(obj);
			var headers = obj.fields;
	    	var datas = obj.data;
	    	console.log(headers);
	    	console.log(datas);
	    	var columns = [];
			
			for (var i = 0; i < headers.length; i++) {
				columns.push({
					label :  headers[i],
					name : i,
					width : 80
				});
			}	
			console.log(columns);
			
			_setQueryGrid(columns);
			
			$('#_tq_queryGrid').jqGrid('resetSelection');
			$('#_tq_queryGrid').jqGrid('clearGridData');
			$('#_tq_queryGrid')[0].addJSONData(datas);				
					
		};
		
		
		var _setQueryGrid = function(columns){
			
			$('#_tq_queryGrid').ankusGrid({
				datatype		:function(postData) {
					_getQueryGrid();
				},
				jsonReader		: {
					repeatitems	: false,
					id			: 'id'
				},
				sortname		: false,
				sortorder		: '',
		        multiselect		: false,
		        rownumbers		: true,
		        idPrefix		: '_QueryGrid_',
		        ondblClickRow	: function(id){},
		        refreshfunc		: function(){},
		        pager			: false,
		        rowNum			: -1,		       
		        scrollerbar		:true,
		        height			:'250px',
		        colModel		: columns
		    });
		};
		
		
		
		var _requestHadoopInfo = function(){			
			var id = $("#_tq_clusterName").val();
			var hadoopId = $("#_tq_hadoopId option:selected").text(id).val();
			
			ANKUS_API.ajax({
				url			: '/admin/hadoop/cluster',
				type		: 'GET',
				data		: {'id':hadoopId},
				success		: function(res){
					if(res.success){
						hadoopIP = res.map.namenodeIP;
						hdfsUrl = res.map.hdfs_url;
						_requestTajoDBList();						
					}else{
						ANKUS_API.util.alert(res.error.message);
					}
				}
			});	
			
			
		}
				
		var _requestTajoDBList = function(){
					
			var port = $('#_tq_port').val();
			var data = {'ip':hadoopIP, 'port':port};
			
			ANKUS_API.ajax({
				url			: '/get_tajodatabases',
				type		: 'GET',			
				data		: data,
				success		: function(res){
					
					if(res.message){
						if(res.code == 0){
							if(res.data != null){
								$('#_tq_DB').empty();
								$('<option>').val('').text('').appendTo($('#_tq_DB'));
								$.each(res.data, function(i, v) {								
									$('<option>').val(v).text(v).appendTo($('#_tq_DB'));
								});
							}else{
								$('#_tq_DBTable').empty();
							}
						}
					}else{	
						ANKUS_API.util.alert(res.error.message);
					}	
				}
			});	
		}
		
		var _requestTajoTableList = function(){
			
			$('#_tq_query').val('');
			$('#_tq_DBTable').empty();
			
			var DBSelected = $('#_tq_DB').val();
			var port = $('#_tq_port').val();
			var data = {'ip':hadoopIP, 'port':port,'database':DBSelected};
			
			ANKUS_API.ajax({
				url			: '/get_tajotables',
				type		: 'GET',			
				data		: data,
				success		: function(res){
					//console.log(res);
					if(res.message == 'success'){
						if(res.code == 0){
							if(res.data != null){
								$('#_tq_DBTable').empty();
								$('<option>').val('').text('').appendTo($('#_tq_DBTable'));
								$.each(res.data, function(i, v) {								
									$('<option>').val(v).text(v).appendTo($('#_tq_DBTable'));
								});
							}
						}
					}else{	
						ANKUS_API.util.alert(res.error.message);
					}	
				}
			});	
		}
		
		var _selectTable = function(){
			var table = $('#_tq_DBTable').val();
			var maxLine = $('#_tq_rows').val();			
			var sql = "SELECT * FROM " + table + " LIMIT " + maxLine;
			
			if(table == undefined || table == ''){
				ANKUS_API.util.alert(i18nP('JS_HQMGR_SELECT_CHECK', 'COMMON_TABLE'));
	    		return;
			}else{
				$('#_tq_query').val(sql);
			}
			
		}
		
		
		
		$('#_tabHQryMgr').one('click', function(){
			_requestHadoopInfo();
		});
		
		$('#_tq_clusterName').on('change', _changeClusterName);		
		$('#_tq_btnQueryAction').on('click', _btnQueryAction)
		$('#_tq_DB').on('change', _requestTajoTableList);
		$('#_tq_DBTable').on('change', _selectTable);
				
		(function init(){
			_getEngine();			
		})();		
	})();