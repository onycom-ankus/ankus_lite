(function hmetamgr(){
		var currentNodeId;
		var treeNodeId;
		var savedNode;
		
		var hadoopIP;
		var hdfsUrl;
		var sql;
		var isLoading = false;
		
		var cnames = [];
		var ctypes = [];
		
		
		// 그리드에 데이터 설정
		var _getGrid = function(path){
			ANKUS_API.ajax({
				url			: '/fs/hdfs/file',
				data		: {
					_dc : new Date().getTime(),
					engineId : $('#_tm_clusterName').val(),
					path : path,
					page : 1,
					start : 0,
					limit : 25,
				},
				success		: function(res){
					//console.log(res);
					$('#_tm_grid').ankusSetGridData(res.list);
					
				}
			});
		};
		
		// 트리 설정
		var _setTree = function(isDefault){
			//console.log(currentNodeId);
			savedNode = isDefault ? '/' : currentNodeId;
			$('#_tm_jstreeAjax').jstree('destroy').off('changed.jstree').on('changed.jstree', function(e, data){
				currentNodeId = data.node.id;				
				_getGrid(data.node.id);
			}).jstree({							
	            core : {
	            	data : {
	            		url			: function(node){return '/fs/hdfs/directory';},
	            		type		: 'GET',
	            		dataType	: 'json',
	            		contentType	: 'application/json',
	            		data		: function(node){
	            			currentNodeId = (node.parent) ? node.id : '/';
	            			return {
	            				_dc			: new Date().getTime(),
	            				engineId	: $('#_tm_clusterName').val(),
	            				node		: currentNodeId,
	            				sort		:[{property : 'text', direction : 'ASC'}]
		                    };
	                    },
	                    success		: function(){
	                    	var $tree = $('#_tm_jstreeAjax');
	                    	var selectedArr = savedNode.split('/');
	                    	var openArr = [];
	                    	var $tmpNode;
	                    	
	                    	if(!isDefault){
	                    		setTimeout(function(){
	                    			$tree.jstree('open_node', $('[id="/"]'));
	                    			for(var i=0; i<selectedArr.length; i++){	                    				
		                    			openArr.push(selectedArr[i]);
		                    			$tmpNode = $('[id="' + openArr.join('/') + '"]');
		                    			if($tmpNode.length){
		                    				$tree.jstree('open_node', $tmpNode);
		                    				$tree.parent().scrollTop($tmpNode.position().top);
		                    			}
		                    		}
	                    			$('#_tm_jstreeAjax').jstree('deselect_all', true);
	                    			var $target = $('#_tm_jstreeAjax [id="'+currentNodeId+'"]');
	                    			$('#_tm_jstreeAjax').jstree('select_node', $target);
				        			$('#_tm_jstreeAjax').parent().scrollTop($('#_tm_jstreeAjax').parent().scrollTop() + $target.position().top);
	                    		}, 300);	                    			                    		
	                    	}
	                    },
	                    dataFilter	: function(r){
	                    	var res = JSON.parse(r);
	                    	var list = res.list;
	                    	var len = list.length;
	                    	var dir = [];
	                    	var i = 0;

	                    	if('/' === currentNodeId){
	                    		dir.push({
	                    			id		: '/',
	                    			text	: '/',
	                    			parent	: '#'
	                    		});
	                    	}
	                    	if(0 < len){ 
	                    		for(; i<len; i++){
	                    			dir.push({
	                    				parent : currentNodeId,
	                    				children : true,
	                    				id : list[i].id,
	                    				text : list[i].text,
	                    			});
	                    		}
	                    	}
	                    	return JSON.stringify(dir);
	                    }
	                }
	            }
	        });
		};
		// 그리드 설정
		var _setGrid = function(){
			
			var folderImg = $('#_tm_template ._tm_folderImage')[0].outerHTML;
			var fileImg = $('#_tm_template ._tm_fileImage')[0].outerHTML;
			
			$('#_tm_grid').ankusGrid({
				url				: '',
				datatype		: '',
		        multiselect		: false,
		        ondblClickRow	: function(id){
		        	var arrForParent = [];
		        	
		        	if('true' === $('#_tm_grid').getRowData(id).directory){
		        		currentNodeId = id;
		        		_getGrid(id);
		        		if('/' !== id){
		        			arrForParent = id.split('/');
			        		arrForParent.pop();
			        		if (arrForParent.length == 1) { arrForParent.push(''); }
			        		$('#_tm_jstreeAjax').jstree('open_node', $('#_tm_jstreeAjax [id="' + arrForParent.join('/') + '"]'), function() {
			        			$('#_tm_jstreeAjax').jstree('deselect_all', true);
			        			var $target = $('#_tm_jstreeAjax [id="' + id + '"]');
			        			$('#_tm_jstreeAjax').jstree('select_node', $target);
			        			$('#_tm_jstreeAjax').parent().scrollTop($('#_tm_jstreeAjax').parent().scrollTop() + $target.position().top);
			        		});
		        		}		        		
		        	}		        
		        },
		        refreshfunc		: function(){
					_getGrid(currentNodeId);					
		        },
		        pager			: null,//'_tm_pager',
		        rowNum			: null,
		        width			: 'auto',
		        colModel		: [{
		        	name : 'directory',
		        	label : 'directory',
		        	hidden : true
		        },{
		        	name : 'cls',
		        	label : i18nP('HMMGR_GRID_TYPE'),		        
		        	align : 'center',
		        	formatter : function(v){
		        		return ('folder' === v) ? folderImg : fileImg;
		        	}
		        },{
		        	name : 'filename',
		        	label : i18nP('HMMGR_GRID_FILE_NAME'),		        	
		        	align : 'center'
		        },{
		        	name : 'length',
		        	label : i18nP('HMMGR_GRID_FILE_SIZE'),		        	
		        	align : 'center',
		        	formatter : function(v){
		        		return ANKUS_API.util.roundAndtoFixed(v/1024, 2) + 'kb';
		        	}
		        },{
		        	name : 'modificationTime',
		        	label : i18nP('HMMGR_GRID_LAST_UPDATE'),		        	
		        	align : 'center',
		        	formatter : function(v){
		        		return ANKUS_API.util.getDiffDate({
		    			 	diffDate : v,
		    			 	form : 'yyyymmdd',
		    			 	deli : '-',
		    			 	isMili : true
		    			 });
		            }
		        }]
		    });
		};
		
		// 화면 레이아웃 설정
		var _setLayout = function(){
			$('#inner_west')
			.css({
					width : '100%',
					height : '100%',
					border : '1px',
					padding: '1px'
					
				})
				.layout({
					closable : false,
					resizable : false,	
					north__size : '50%',					
					inset : {
						top : 0,
						bottom : 0,
						left : 0,
						right : 0
					}
				});
			
			$('#inner_center')
			.css({
					width : '100%',
					height : '100%',
					border : '1px'
					
				})
				.layout({
					closable : false,
					resizable : false,	
					north__size : 'auto',
					inset : {
						top : 0,
						bottom : 0,
						left : 0,
						right : 0
					}
				});
				
			$('#_conHMetaMgr')
				.css({
					width : '100%',
					height : '100%'
					
				})
				.layout({
					closable : false,
					resizable : false,
					west__size : '35%',									
					inset : {
						top : 10,
						bottom : 10,
						left : 10,
						right : 10
					}
				})
				.show();
		};
		
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
					var tmpOption = $('#_tm_template ._tm_tmpOption')[0].outerHTML;
					
					$('#_tm_clusterName').find('._tm_tmpOption').remove();
					
					for(; i<len; i++){
						tmpObj = list[i];
						$(tmpOption).val(tmpObj.id).text(tmpObj.instanceName).data('obj', tmpObj).appendTo('#_tm_clusterName');
						$(tmpOption).val(tmpObj.hadoopClusterId).text(tmpObj.id).data('obj', tmpObj).appendTo('#_tm_hadoopId');
					}
				}
			});
			
		};
		// cluster name 변경
		var _changeClusterName = function(){
			_setTree(true);
			//_setGrid(true);			
			setTimeout(function(){
				$('#_tm_jstreeAjax').jstree('open_node', $('[id="/"]'));
			}, 600);
			_requestHadoopInfo();
		};
				
		// 갱신 버튼 실행
		var _btnRefreshAction = function(){
			_changeClusterName();
			_setTree();
		};	
		
		var _changeDelimiter = function(){
			var delimiter = $('#_tm_delimiter').val();
			
			if(delimiter == 'CUSTOM'){
				$('#_tm_DelimiterText').val('');
				$('#_tm_DelimiterText').prop('disabled', false);
			}else{
				$('#_tm_DelimiterText').val(delimiter);
				$('#_tm_DelimiterText').prop('disabled', true);
			}
			return;
		}
		
		var _changeFirstLine = function(){
			_getPreviewGrid();
		}
		
		var _btnPreviewAction = function(){
			_getPreviewGrid();
		}
		
		var _getPreviewGrid = function(){
			
			var postData = $('#_tm_tajoGrid').jqGrid('getGridParam', 'postData');	
			var engineId = $('#_tm_clusterName').val();
			var filePath = $('#_tm_grid').jqGrid("getGridParam", "selrow" );
			var fileInfo =  $('#_tm_grid').jqGrid("getRowData", filePath);
			var isFile = false;
			
			if(fileInfo.directory == false){
				ANKUS_API.util.alert(i18nP('JS_HMMGR_SELECT_CHECK', 'COMMON_FILE'));
				return;				
			}
			
			var data = {
					'inputPath':filePath,
					'delimiter':$('#_tm_delimiter').val(),
					'engineId':engineId,
					'maxLine':$('#_tm_rows').val(),
					'maxColumn':-1
		    };
				       
			ANKUS_API.ajax({
				url			: '/designer/previewHDFSFile_FP_ORIGINAL',
				type		: 'GET',
				data		: data,
				success		: function(res){
					if(res.success){
						var obj = res.map;
						obj.rows = res.list;
						
						_m_colChange(obj);
						
					}else{
						ANKUS_API.util.alert(i18nP('JS_HMMGR_SELECT_CHECK', 'COMMON_FILE'));
						return;
					}
				}
			});		
		};		
		
		var _m_colChange = function(obj){
			
			var delimiter = $('#_tm_delimiter').val();
			var ishead = $('#_tm_firstLine').prop("checked");
			var lines;
			var headers = [];
	    	var datas = [];
	    	var columns = [];
	    	var addHeader = [];
			
			lines = obj.rows[0].rowData;
			
			for(var i=0; i<lines.length; i++){
	    		var cols = lines[i].split(delimiter);
	    		if(i==0){
	    			for(var j=0; j<cols.length; j++)
	    				if(ishead == true){
	    					headers.push(cols[j]);	    					
	    				}else{
	    					headers.push('column'+j);
	    				}
	    			
	    			if(ishead) continue;
	    		}
	    		datas.push(cols);
	    	}
			
			cnames = [];
			cnames = headers;
			
			for (var i = 0; i < headers.length; i++) {
				columns.push({
					name : i,
					width : 80
				});
			}			
			_setPreviewGrid(headers, columns);		
			
			$('#_tm_tajoGrid').jqGrid('resetSelection');
			$('#_tm_tajoGrid').jqGrid('clearGridData');
			$('#_tm_tajoGrid')[0].addJSONData(datas);
			
		};
		
		
		var _setPreviewGrid = function(headers, columns){
			
			$('#_tm_tajoGrid').ankusGrid({
				datatype		:function(postData) {
					//_getPreviewGrid();
				},
				jsonReader		: {
					repeatitems	: false,
					id			: 'id'
				},
				sortname		: '',
				sortorder		: 'desc',
				sortable		: false,
		        multiselect		: false,
		        idPrefix		: '_PreviewGrid_',
		        refreshfunc		: function(){},
		        pager			: false,
		        rowNum			: -1,
		        colModel		: columns		       
		    });
		};
		
		var _requestHadoopInfo = function(){			
			var id = $("#_tm_clusterName").val();
			var hadoopId = $("#_tm_hadoopId option:selected").text(id).val();
			
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
			$('#_tm_DB').empty();
			$('#_tm_DBTable').empty();
			$('#_tm_DBName').val('');
			
			var port = $('#_tm_port').val();
			var data = {'ip':hadoopIP, 'port':port};
			
			ANKUS_API.ajax({
				url			: '/get_tajodatabases',
				type		: 'GET',			
				data		: data,
				success		: function(res){
					
					if(res.message){
						if(res.code == 0){
							if(res.data != null){
								$('#_tm_DB').empty();
								$('<option>').val('').text('').appendTo($('#_tm_DB'));
								$.each(res.data, function(i, v) {								
									$('<option>').val(v).text(v).appendTo($('#_tm_DB'));
								});
							}
						}
					}else{	
						ANKUS_API.util.alert(res.error.message);
					}	
				}
			});	
		}
		
		var _requestTajoTableList = function(){
			
			$('#_tm_DBTable').empty();
			
			var DBSelected = $('#_tm_DB').val();
			var port = $('#_tm_port').val();
			var data = {'ip':hadoopIP, 'port':port,'database':DBSelected};
			
			if(DBSelected == 'undefined' || DBSelected == null){
				ANKUS_API.util.alert(i18nP('JS_HMMGR_SELECT_CHECK', 'COMMON_DATABASE'));
				return;	
			}
						
			ANKUS_API.ajax({
				url			: '/get_tajotables',
				type		: 'GET',			
				data		: data,
				success		: function(res){
					//console.log(res);
					if(res.message == 'success'){
						if(res.code == 0){
							if(res.data != null){
								$('#_tm_DBTable').empty();
								$('<option>').val('').text('').appendTo($('#_tm_DBTable'));
								$.each(res.data, function(i, v) {								
									$('<option>').val(v).text(v).appendTo($('#_tm_DBTable'));
								});
							}
						}
					}else{
						ANKUS_API.util.alert(res.error.message);
					}	
				}
			});	
			
		}
		
		var _createDB = function(){
			
			var port = $('#_tm_port').val();
			var dasebaseName = $('#_tm_DBName').val();
			
			var data = {'ip':hadoopIP, 'port':port,'database':dasebaseName};
						
			if(dasebaseName.length === 0){
				ANKUS_API.util.alert(i18nP('JS_HMMGR_INPUT_CHECK', 'COMMON_DATABASE_NAME'));
				return;	
			}
			
			ANKUS_API.ajax({
				url			: '/create_tajoDatabase',
				type		: 'GET',
				data		: data,
				success		: function(res){
					console.log(res);
					if(res.message == 'success'){
						ANKUS_API.util.alert(i18nP('JS_HMMGR_EDIT_MSG', 'COMMON_DATABASE', 'COMMON_CREATE'));
						_requestTajoDBList();
					}else{						
					}
				}
			});	
		}
		
		var _DeleteDB = function(){
			
			var dasebaseName = $('#_tm_DB').val();
			var port = $('#_tm_port').val();
			
			var data = {'ip':hadoopIP, 'port':port,'database':dasebaseName};
			
			if(dasebaseName == 'undefined' || dasebaseName == null){
				ANKUS_API.util.alert(i18nP('JS_HMMGR_SELECT_CHECK', 'COMMON_DATABASE'));
				return;	
			}
			
			ANKUS_API.ajax({
				url			: '/del_tajoDatabase',
				type		: 'GET',
				data		: data,
				success		: function(res){
					if(res.message == 'success'){
						if(res.code == 0){
							ANKUS_API.util.alert(i18nP('JS_HMMGR_EDIT_MSG', 'COMMON_DATABASE', 'COMMON_DELETE'));
							_requestTajoDBList();
						}
					}else{						
					}
				}
			});	
			
		}
		
		var _DeleteTable = function(){			
			
			var port = $('#_tm_port').val();
			var dasebaseName = $('#_tm_DB').val();
			var tableName = $('#_tm_DBTable').val();
			
			if(dasebaseName == 'undefined' || dasebaseName == ''){
				ANKUS_API.util.alert(i18nP('JS_HMMGR_SELECT_CHECK', 'COMMON_DATABASE'));
				return;	
			}
			
			if(tableName == 'undefined' || tableName == ''){
				ANKUS_API.util.alert(i18nP('JS_HMMGR_SELECT_CHECK', 'COMMON_TABLE'));
				return;	
			}
			
			var data = {'ip':hadoopIP, 'port':port, 'database':dasebaseName, 'table':tableName};
			
			ANKUS_API.ajax({
				url			: '/del_tajoTable',
				type		: 'GET',
				data		: data,
				success		: function(res){
					if(res.message == 'success'){
						if(res.code == 0){
							ANKUS_API.util.alert(i18nP('JS_HMMGR_EDIT_MSG', 'COMMON_TABLE', 'COMMON_DELETE'));
							_requestTajoTableList();
						}
					}else{						
					}
				}
			});
						
		}
		
		var _setCreateTable = function(){

			var dasebaseName = $('#_tm_DB').val();
			var filePath = $('#_tm_grid').jqGrid("getGridParam", "selrow" );
			
			if(filePath === undefined || filePath === null){
				ANKUS_API.util.alert(i18nP('JS_HMMGR_SELECT_CHECK', 'COMMON_FILE'));
				return;
			}
			
			if(dasebaseName === undefined || dasebaseName === ''){
				ANKUS_API.util.alert(i18nP('JS_HMMGR_SELECT_CHECK', 'COMMON_DATABASE'));
				return;
			}
			
			
			if(cnames == undefined || cnames == ''){
				ANKUS_API.util.alert(i18nP('JS_HMMGR_PLEASE_CONFIRM_FILE'));
				return;
				
			}else{	
				$('#_tm_TableHeader').empty();
				for(var i=0; i < cnames.length; i++){
					
					var c_tag = "<div class='form-group' id="+ cnames[i] + ">" +
									"<label for='_tm_headerName' class='col-sm-2 control-label'>" + i18nP('COMMON_ATTR') + i + "</label>" +
									"<div class='col-sm-5'>" +
									"<input type='text' class='form-control' value=" + cnames[i] + " id='_tm_name_" + i + "'></input>" +
									"</div>" +
									"<div class='col-sm-5'>" +
									"<select id='_tm_type_"+ i +"' class='form-control'>" +
									"<option value='text'>text</option>" +	
									"<option value='int1'>int1</option>" +
									"<option value='int2'>int2</option>" +
									"<option value='int4'>int4</option>" +
									"<option value='int'>int</option>" +
									"<option value='bit varying'>bit varying</option>" +
									"<option value='int8'>int8</option>" +
									"<option value='float4'>float4</option>" +
									"<option value='float8'>float8</option>" +
									"<option value='bool'>bool</option>" +
									"<option value='date'>date</option>" +
									"<option value='time'>time</option>" +
									"<option value='timestamp'>timestamp</option>" +
									"<option value='inet4'>inet4</option>" +
									"</div></div>"
					
					$('#_tm_TableHeader').append(c_tag);					
					
				}
				
			}
			
			$('#_tm_DBTableName').val('');			
			$('#_tm_Modal').ankusModal('show');
		}
		
		var _saveTable = function(){
			
			var tableName = $('#_tm_DBTableName').val();
			var port = $('#_tm_port').val();
			var dasebaseName = $('#_tm_DB').val();
			var filePath = $('#_tm_grid').jqGrid("getGridParam", "selrow" );
			var delimiter = $('#_tm_DelimiterText').val();
			
			if(tableName === undefined || tableName === ''){
				ANKUS_API.util.alert(i18nP('JS_HMMGR_SELECT_CHECK', 'COMMON_TABLE_NAME'));
				return;
			}
			
			var header = [];
			var type = [];
			
			for(var i=0; i < cnames.length; i++){
				
				var id_name = '#_tm_name_' + i;
				var id_type = '#_tm_type_' + i;
				
				if($(id_name).val() === undefined || $(id_name).val() === ''){
					ANKUS_API.util.alert(i18nP('COMMON_ATTR') + i + " " + i18nP('JS_HMMGR_SELECT_CHECK', 'JS_HMMGR_HEADER_NAME'));
					return;
				}
				
				header.push($(id_name).val());	
				type.push($(id_type).val());	
			}	
			
			cnames = header;
			ctypes = type;
			
			var sql = "CREATE EXTERNAL TABLE IF NOT EXISTS "+tableName+" (\n";
			var fs = "";
	    	for(var i = 0 ; i<ctypes.length; i++)
	    	{
	    		fs += (i==0?"":",\n");
	    		fs += cnames[i]+ " " + ctypes[i];
	    	}
	    	sql += fs + ") USING TEXT WITH ('text.delimiter'='"+ delimiter +"') LOCATION '"+ hdfsUrl + filePath + "'";
	    	
	    	var data = {'ip':hadoopIP, 'port':port, 'database':dasebaseName, 'createSql':sql};
	    		    	
	    	
	    	ANKUS_API.ajax({
				url			: '/create_tajoTable',
				type		: 'GET',
				data		: data,
				success		: function(res){
					console.log(res);
					if(res.message == 'success'){
						if(res.code === 0){
							ANKUS_API.util.alert(i18nP('JS_HMMGR_EDIT_MSG', 'COMMON_TABLE', 'COMMON_CREATE'));
							$('#_tm_Modal').ankusModal('hide');
							_requestTajoTableList();
						}						
					}else{						
					}
				}
			});
			
		}
		
		var _cencleTable = function(){
			$('#_tm_Modal').ankusModal('hide');
		}
	
		$('#_tabHMetaMgr').one('click', function(){
			_setLayout();
			setTimeout(function(){
				$('#_tm_btnRefresh').trigger('click');
			},600);
		});
		$('#_tm_clusterName').on('change', _changeClusterName);
		$('#_tm_btnRefresh').on('click', _btnRefreshAction);
		$('#_tm_btnPreview').on('click', _btnPreviewAction);
		$('#_tm_delimiter').on('change', _changeDelimiter);
		$('#_tm_firstLine').on('change', _changeFirstLine);
		$('#_tm_btnDBCreate').on('click', _createDB);
		$('#_tm_DB').on('change', _requestTajoTableList);
		$('#_tm_btnDBDelete').on('click', _DeleteDB);
		$('#_tm_btnTableCreate').on('click', _setCreateTable);
		$('#_tm_btnSave').on('click', _saveTable);
		$('#_tm_btnDBTableDelete').on('click', _DeleteTable);
		$('#_tm_btnCencel').on('click', _cencleTable);
		
		(function init(){
			_getEngine();
			_setTree(true);
			_setGrid(true);
			
		})();		
	})();