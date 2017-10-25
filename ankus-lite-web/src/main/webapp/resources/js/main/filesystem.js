(function filesystem(){
		var currentNodeId;
		var treeNodeId;
		var savedNode;
		var uploadObj;		
		// 그리드에 데이터 설정
		var _getGrid = function(path){
			ANKUS_API.ajax({
				url			: '/fs/hdfs/file',
				data		: {
					_dc : new Date().getTime(),
					engineId : $('#_fs_clusterName').val(),
					path : path,
					page : 1,
					start : 0,
					limit : 25,
				},
				success		: function(res){
					$('#_fs_grid').ankusSetGridData(res.list);
				}
			});
		};
		// 트리 우클릭 후 디렉토리 생성 실행
		var _createAction = function(obj){
			currentNodeId = obj.reference.prevObject[0].id;
			$('#_fs_createModal').ankusModal('show');
			setTimeout(function(){$('#_fs_createInput').focus();}, 300);
		};
		// 트리 우클릭 후 디렉토리 이름 변경 실행
		var _modifyAction = function(obj){
			var id;
			var name;
			var selArr;
			
			if(undefined === obj){
				selArr = $('#_fs_grid').getGridParam('selarrrow');
				if(0 === selArr.length){
					ANKUS_API.util.alert(i18nP('JS_FILESYS_ITEM_SELECT', 'COMMON_CHANGE'));
					return;
				}
				if(1 < selArr.length){
					ANKUS_API.util.alert(i18nP('JS_FILESYS_ITEM_SELECT_ONE', 'COMMON_CHANGE'));
					return;
				}
				id = selArr[0];
				name = $('#_fs_grid').getRowData(id).filename;
			}
			else{
				id = obj.reference.prevObject[0].id;
				name = obj.reference.prevObject[0].innerText;
			}
			currentNodeId = id;
			$('#_fs_modifyInput').val(name);
			$('#_fs_modifyModal').ankusModal('show');
			setTimeout(function(){$('#_fs_modifyInput').focus();}, 300);				
		};
		// 트리 우클릭 후 디렉토리 삭제 실행
		var _delAction = function(obj){
			currentNodeId = obj.reference.prevObject[0].id;
			$('#_fs_deleteModal').ankusModal('show');
		};
		// 트리 우클릭 후 디렉토리 이동 실행
		var _moveAction = function(obj){
			var selectedNodes;
			
			if(undefined === obj){
				selectedNodes = $('#_fs_grid').getGridParam('selarrrow').join(',');
				if(!selectedNodes){
					ANKUS_API.util.alert(i18nP('JS_FILESYS_ITEM_SELECT', 'COMMON_CHANGE'));
					return;
				}
				_moveSubmitAction.isTree(false);
				_moveSubmitAction.setFrom(selectedNodes);
			}
			else{
				_moveSubmitAction.isTree(true);
				currentNodeId = obj.reference.prevObject[0].id;
				_moveSubmitAction.setFrom(currentNodeId);
			}
			
			$('#_fs_moveTree').jstree('destroy').off('changed.jstree').on('changed.jstree', function(e, data){
				treeNodeId = data.node.id;
			}).jstree({
	            core : {
	            	data : {
	            		url			: function(node){return '/fs/hdfs/directory';},
	            		type		: 'GET',
	            		dataType	: 'json',
	            		contentType	: 'application/json',
	            		data		: function(node){
	            			treeNodeId = (node.parent) ? node.id : '/';
	            			return {
	            				_dc			: new Date().getTime(),
	            				engineId	: $('#_fs_clusterName').val(),
	            				node		: treeNodeId,
	            				sort		:[{property : 'text', direction : 'ASC'}]
		                    };
	                    },
	                    dataFilter	: function(r){
	                    	var res = JSON.parse(r);
	                    	var list = res.list;
	                    	var len = list.length;
	                    	var dir = [];
	                    	var i = 0;
	                    	var tmpNodeObj;

	                    	if('/' === treeNodeId){
	                    		dir.push({
	                    			id		: '/',
	                    			text	: '/',
	                    			parent	: '#'
	                    		});
	                    	}
	                    	if(0 < len){ 
	                    		for(; i<len; i++){
	                    			tmpNodeObj = list[i];
	                    			/*
	                    			if(currentNodeId == tmpNodeObj.id){
	                    				continue;
	                    			}
	                    			*/
	                    			dir.push({
	                    				parent : treeNodeId,
	                    				children : true,
	                    				id : tmpNodeObj.id,
	                    				text : tmpNodeObj.text
	                    			});
	                    		}
	                    	}
	                    	return JSON.stringify(dir);
	                    }
	                }
	            }
	        });
			$('#_fs_moveModal').ankusModal('show');
		};
		// 트리 우클릭 후 디렉토리 복사 실행
		var _copyAction = function(obj){
			var selectedNodes;
			
			if(undefined === obj){
				selectedNodes = $('#_fs_grid').getGridParam('selarrrow').join(',');
				if(!selectedNodes){
					alert(i18nP('JS_FILESYS_ITEM_SELECT', 'COMMON_COPY'));
					return;
				}
				_copySubmitAction.isTree(false);
				_copySubmitAction.setFrom(selectedNodes);
			}
			else{
				_copySubmitAction.isTree(true);
				currentNodeId = obj.reference.prevObject[0].id;
				_copySubmitAction.setFrom(currentNodeId);
			}
			
			$('#_fs_copyTree').jstree('destroy').off('changed.jstree').on('changed.jstree', function(e, data){
				treeNodeId = data.node.id;
			}).jstree({
	            core : {
	            	data : {
	            		url			: function(node){return '/fs/hdfs/directory';},
	            		type		: 'GET',
	            		dataType	: 'json',
	            		contentType	: 'application/json',
	            		data		: function(node){
	            			treeNodeId = (node.parent) ? node.id : '/';
	            			return {
	            				_dc			: new Date().getTime(),
	            				engineId	: $('#_fs_clusterName').val(),
	            				node		: treeNodeId,
	            				sort		:[{property : 'text', direction : 'ASC'}]
		                    };
	                    },
	                    dataFilter	: function(r){
	                    	var res = JSON.parse(r);
	                    	var list = res.list;
	                    	var len = list.length;
	                    	var dir = [];
	                    	var i = 0;
	                    	var tmpNodeObj;

	                    	if('/' === treeNodeId){
	                    		dir.push({
	                    			id		: '/',
	                    			text	: '/',
	                    			parent	: '#'
	                    		});
	                    	}
	                    	if(0 < len){ 
	                    		for(; i<len; i++){
	                    			tmpNodeObj = list[i];
	                    			/*
	                    			if(currentNodeId == tmpNodeObj.id){
	                    				continue;
	                    			}
	                    			*/
	                    			dir.push({
	                    				parent : treeNodeId,
	                    				children : true,
	                    				id : tmpNodeObj.id,
	                    				text : tmpNodeObj.text,
	                    			});
	                    		}
	                    	}
	                    	return JSON.stringify(dir);
	                    }
	                }
	            }
	        });
			$('#_fs_copyModal').ankusModal('show');
		};
		// 트리 우클릭 후 파일 업로드 실행
		var _uploadAction = function(obj){
			_fileResetAction();
			$('#_fs_uploadModal').ankusModal('show');
		};
		// 트리 우클릭 후 정보 실행
		var _infoAction = function(param){
			var url;
			var path;
			
			if('object' === typeof param){
				url = '/fs/hdfs/infoDirectory';
				path = param.reference.prevObject[0].id;
			}
			else{
				url = '/fs/hdfs/info';
				path = param;
			}
			
			ANKUS_API.ajax({
				url			: url,
				data		: {
					_dc : new Date().getTime(),
					engineId : $('#_fs_clusterName').val(),
					path : path
				},
				success		: function(res){
					var data = res.map;
					
					$('#_fs_infoName').text(data.name || '');
					$('#_fs_infoPath').text(data.path || '');
					$('#_fs_infoLength').text(ANKUS_API.util.roundAndtoFixed((data.length || 0)/1024, 2) + 'KB');
					$('#_fs_infoModification').text(data.modification || '');
					$('#_fs_infoBlockSize').text((data.blockSize || '0') + 'Bit');
					$('#_fs_infoSpaceQuota').text(data.spaceQuota || '');
					$('#_fs_infoSpaceConsumed').text(data.spaceConsumed || '0');
					$('#_fs_infoReplication').text(data.replication || '0');
					$('#_fs_infoDirectoryCount').text(data.directoryCount || '0');
					$('#_fs_infoQuota').text(data.quota || '');
					$('#_fs_infoFileCount').text(data.fileCount || '0');
					$('#_fs_infoOwnerRead').prop('checked', data.ownerRead);
					$('#_fs_infoOwnerWrite').prop('checked', data.ownerWrite);
					$('#_fs_infoOwnerExecute').prop('checked', data.ownerExecute);
					$('#_fs_infoGroupRead').prop('checked', data.groupRead);
					$('#_fs_infoGroupWrite').prop('checked', data.groupWrite);
					$('#_fs_infoGroupExecute').prop('checked', data.groupExecute);
					$('#_fs_infoOtherRead').prop('checked', data.otherRead);
					$('#_fs_infoOtherWrite').prop('checked', data.otherWrite);
					$('#_fs_infoOtherExecute').prop('checked', data.otherExecute);
					$('#_fs_infoIsFile').prop('checked', data.isFile);
					$('#_fs_infoIsDirectory').prop('checked', data.isDirectory);
					$('#_fs_infoModal').ankusModal('show');
				}
			});
		};
		// 트리 우클릭 후 갱신 실행
		var _refreshAction = function(obj){
			$("#_fs_jstreeAjax").jstree(true).refresh_node(obj.reference.prevObject[0].id);
		};
		// 트리 설정
		var _setTree = function(isDefault){
			savedNode = isDefault ? '/' : currentNodeId;
			$('#_fs_jstreeAjax').jstree('destroy').off('changed.jstree').on('changed.jstree', function(e, data){
				currentNodeId = data.node.id;
				_getGrid(data.node.id);
			}).jstree({
				plugins : ['contextmenu'],
				contextmenu : {
					items : {
						ccp : false,
						create	: {label : i18nP('JS_FILESYS_GRID_DIRECTORY_CREATE'),		action : _createAction,		icon : '/resources/images/folder-add.png'},
				        modify	: {label : i18nP('JS_FILESYS_GRID_DIRECTORY_RENAME'),	action : _modifyAction,		icon : '/resources/images/folder_vertical_rename.png'},
				        del 	: {label : i18nP('JS_FILESYS_GRID_DIRECTORY_REMOVE'),		action : _delAction,		icon : '/resources/images/folder-delete.png'},
				        move	: {label : i18nP('JS_FILESYS_GRID_DIRECTORY_MOVE'),		action : _moveAction,		icon : '/resources/images/move_to_folder.png'},
				        copy	: {label : i18nP('JS_FILESYS_GRID_DIRECTORY_COPY'),		action : _copyAction,		icon : '/resources/images/folder-copy.png'},
				        upload	: {label : i18nP('JS_FILESYS_GRID_DIRECTORY_UPLOAD'),		action : _uploadAction,		icon : '/resources/images/file-upload.png'},
				        info	: {label : i18nP('JS_FILESYS_GRID_DIRECTORY_INFO'),			action : _infoAction,		icon : '/resources/images/Info_Light.png'},
				        refresh	: {label : i18nP('JS_FILESYS_GRID_DIRECTORY_REFRESH'),			action : _refreshAction,	icon : '/resources/images/refresh.png'}
				    }
				},
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
	            				engineId	: $('#_fs_clusterName').val(),
	            				node		: currentNodeId,
	            				sort		:[{property : 'text', direction : 'ASC'}]
		                    };
	                    },
	                    success		: function(){
	                    	var $tree = $('#_fs_jstreeAjax');
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
	                    			$('#_fs_jstreeAjax').jstree('deselect_all', true);
	                    			var $target = $('#_fs_jstreeAjax [id="'+currentNodeId+'"]');
	                    			$('#_fs_jstreeAjax').jstree('select_node', $target);
				        			$('#_fs_jstreeAjax').parent().scrollTop($('#_fs_jstreeAjax').parent().scrollTop() + $target.position().top);
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
			var folderImg = $('#_fs_template ._fs_folderImage')[0].outerHTML;
			var fileImg = $('#_fs_template ._fs_fileImage')[0].outerHTML;
			
			$('#_fs_grid').ankusGrid({
				url				: '',
				datatype		: '',
		        multiselect		: true,
		        ondblClickRow	: function(id){
		        	var arrForParent = [];
		        	
		        	if('true' === $('#_fs_grid').getRowData(id).directory){
		        		currentNodeId = id;
		        		_getGrid(id);
		        		if('/' !== id){
		        			arrForParent = id.split('/');
			        		arrForParent.pop();
			        		if (arrForParent.length == 1) { arrForParent.push(''); }
			        		$('#_fs_jstreeAjax').jstree('open_node', $('#_fs_jstreeAjax [id="' + arrForParent.join('/') + '"]'), function() {
			        			$('#_fs_jstreeAjax').jstree('deselect_all', true);
			        			var $target = $('#_fs_jstreeAjax [id="' + id + '"]');
			        			$('#_fs_jstreeAjax').jstree('select_node', $target);
			        			$('#_fs_jstreeAjax').parent().scrollTop($('#_fs_jstreeAjax').parent().scrollTop() + $target.position().top);
			        		});
		        		}		        		
		        	}
		        	else{
		        		_infoAction(id);
		        	}
		        },
		        refreshfunc		: function(){
					_getGrid(currentNodeId);					
		        },
		        pager			: null,//'_fs_pager',
		        rowNum			: null,
		        colModel		: [{
		        	name : 'directory',
		        	label : i18nP('JS_FILESYS_GRID_DIRECTORY'),
		        	hidden : true
		        },{
		        	name : 'cls',
		        	label : i18nP('JS_FILESYS_GRID_DIRECTORY_TYPE'),
		        	width : 70,
		        	align : 'center',
		        	formatter : function(v){
		        		return ('folder' === v) ? folderImg : fileImg;
		        	}
		        },{
		        	name : 'filename',
		        	label : i18nP('JS_FILESYS_GRID_DIRECTORY_FILE_NAME'),
		        	width : 300,
		        	align : 'center'
		        },{
		        	name : 'length',
		        	label : i18nP('JS_FILESYS_GRID_DIRECTORY_FILE_SIZE'),
		        	width : 180,
		        	align : 'center',
		        	formatter : function(v){
		        		return ANKUS_API.util.roundAndtoFixed(v/1024, 2) + 'kb';
		        	}
		        },{
		        	name : 'modificationTime',
		        	label : i18nP('JS_FILESYS_GRID_DIRECTORY_LAST_UPDATE'),
		        	width : 150,
		        	align : 'center',
		        	formatter : function(v){
		        		return ANKUS_API.util.getDiffDate({
		    			 	diffDate : v,
		    			 	form : 'yyyymmdd',
		    			 	deli : '-',
		    			 	isMili : true
		    			 });
		            }
		        },{
		        	name : 'permission',
		        	label : i18nP('JS_FILESYS_GRID_DIRECTORY_ACCESS_AUTH'),
		        	width : 150,
		        	align : 'center'
		        },{
		        	name : 'replication',
		        	label : i18nP('JS_FILESYS_GRID_DIRECTORY_COPY_COUNT'),
		        	width : 100,
		        	align : 'center'
		        }]
		    });
		};
		// 남은 디스크 공간 설정
		var _setProgress = function(){
			$('#_fs_remainingProgress').ankusProgress(0, true);
		};
		// 화면 레이아웃 설정
		var _setLayout = function(){
			$('#_conFileSystem')
				.css({
					width : '100%',
					height : '100%'
				})
				.layout({
					west__size : 350,
					inset : {
						top : 10,
						bottom : 10,
						left : 10,
						right : 10
					}
				})
				.show();
		};
		// modal 설정
		var _setModal = function(){
			$('.ui-layout-center').css('z-index','initial');
			$('#_fs_remainingModal').ankusModal();
			$('#_fs_infoModal').ankusModal();
			$('#_fs_createModal').ankusModal();				
			$('#_fs_moveModal').ankusModal();
		};
		// 파일 업로드 설정
		var _setUpload = function(){
			uploadObj = $('#_fs_fileUploader').ankusUpload({
				url				: '/fs/hdfs/upload',
				fileName		: 'file',
				dynamicFormData	: function(){
					return {
						path: currentNodeId,
						engineId: $('#_fs_clusterName').val()
					}
				},
				onSuccess		: function(files, data, xhr, pd){
					var res = JSON.parse(data);
					
					if(res.success){
						ANKUS_API.util.alert(i18nP('JS_FILESYS_UPLOAD_SUCCESS'));
					}
					else{
						ANKUS_API.util.alert(res.error.message);
					}
				},
				onError			: function(){
					ANKUS_API.util.alert(i18nP('JS_FILESYS_UPLOAD_FAIL'));
				}
			});
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
					var tmpOption = $('#_fs_template ._fs_tmpOption')[0].outerHTML;
					
					$('#_fs_clusterName').find('._fs_tmpOption').remove();
					
					for(; i<len; i++){
						tmpObj = list[i];
						$(tmpOption).val(tmpObj.id).text(tmpObj.instanceName).data('obj', tmpObj).appendTo('#_fs_clusterName');
					}					
				}
			});
			
		};
		// cluster name 변경
		var _changeClusterName = function(){				
			_setTree(true);
			ANKUS_API.ajax({
				url			: '/fs/hdfs/fileSystemStatus',
				data		: {
					_dc : new Date().getTime(),
					engineId : $('#_fs_clusterName').val()
				},
				success		: function(res){
					var data = res.map;
					
					$('#_fs_hdfsUrl').text(data.canonicalServiceName || '');
					$('#_fs_remainingP').text(data.humanProgressPercent || '');
					$('#_fs_capacity').text(data.humanCapacity || '');
					$('#_fs_used').text(data.humanUsed || '');
					$('#_fs_remaining').text(data.humanRemaining || '');
					$('#_fs_liveNodes').text(data.liveNodes || '');
					$('#_fs_deadNodes').text(data.deadNodes || '');
					$('#_fs_missingBlocks').text(data.missingBlocksCount || '');
					$('#_fs_corruptBlocks').text(data.corruptBlocksCount || '');
					$('#_fs_replication').text(data.underReplicatedBlocksCount || '');
					$('#_fs_blockSize').text(data.humanDefaultBlockSize || '');
					$('#_fs_remainingProgress').ankusProgress(data.humanProgressPercent, true);
					
					setTimeout(function(){
						$('#_fs_jstreeAjax').jstree('open_node', $('[id="/"]'));
					}, 300);
					
				}
			});
		};
		// 갱신 버튼 실행
		var _btnRefreshAction = function(){
			_changeClusterName();
			_setTree();
		};
		// 남은 디스크 공간 버튼 실행
		var _btnRemainingAction = function(){
			$('#_fs_remainingModal').ankusModal('show');
		};
		// 복사 버튼 실행
		var _btnCopyAction = function(){
			_copyAction();
		};
		// 이동 버튼 실행
		var _btnMoveAction = function(){
			_moveAction();
		};
		// 이름변경 버튼 실행
		var _btnRenameAction = function(){
			_modifyAction();
		};
		// 삭제 버튼 실행
		var _btnDeleteAction = function(){
			var selArr = $('#_fs_grid').getGridParam('selarrrow');
			var length = selArr.length;
			
			if(0 === length){
				ANKUS_API.util.alert(i18nP('JS_FILESYS_ITEM_SELECT', 'COMMON_DELETE'));
				return;
			}
			ANKUS_API.util.confirm({
				description	: i18nP('JS_FILESYS_REMOVE_CHECK', length),
				callback : function(sel){
					if(sel){
						ANKUS_API.ajax({
							url			: '/fs/hdfs/deleteFiles?engineId=' + $('#_fs_clusterName').val(),
							type		: 'POST',
							data		: JSON.stringify(selArr),
							success		: function(res){
								if(res.success){
									ANKUS_API.util.alert(i18nP('JS_FILESYS_REMOVE_SUCCESS'));
									_setTree();
									$('#_fs_grid').ankusSetGridData([]);
								}
								else{
									ANKUS_API.util.alert(res.error.message);
								}
							}
						});			
					}
				}
			});
		};
		// 다운로드 버튼 실행
		var _btnDownloadAction = function(){
			var selArr = $('#_fs_grid').getGridParam('selarrrow');
			var length = selArr.length;
			
			if(0 === length){
				ANKUS_API.util.alert(i18nP('JS_FILESYS_SELECT_FILE', 'COMMON_DOWNLOAD'));
				return;
			}
			if(1 < length){
				ANKUS_API.util.alert(i18nP('JS_FILESYS_SELECT_FILE', 'JS_FILESYS_SELECT_ONE'));
				return;
			}
			location.href = '/fs/hdfs/download?&path='+selArr[0]+'&engineId=' + $('#_fs_clusterName').val();
		};
		var _btnPreviewAction = function(){
			var selArr = $('#_fs_grid').getGridParam('selarrrow');
			var length = selArr.length;
			
			if(0 === length){
				ANKUS_API.util.alert(i18nP('JS_FILESYS_SELECT_FILE', 'JS_FILESYS_SELECT_PREVIEW'));
				return;
			}
			if(1 < length){
				ANKUS_API.util.alert(i18nP('JS_FILESYS_SELECT_FILE', 'JS_FILESYS_SELECT_ONE'));
				return;
			}
			var row = $('#_fs_grid').getRowData(selArr[0]);
			if ("true" === row.directory) {
				ANKUS_API.util.alert(i18nP('JS_FILESYS_SELECT_FILE', ''));
				return;
			}
			
			var fileLen = row.filename.length;
			var lastDot = row.filename.lastIndexOf('.');
			var fileExt = row.filename.substring(lastDot, fileLen).toLowerCase();
						
			if(fileExt == '.html' || fileExt == '.htm'){
				ANKUS_API.util.alert(i18nP('JS_FILESYS_REQUIRE_DOWNLOAD'));
				return;
			}

			ANKUS_API.ajax({
				url			: '/designer/previewHDFSFile_tab',
				data		: {
					_dc : new Date().getTime(),
					inputPath: selArr[0],
					delimiter:'',
					engineId: $('#_fs_clusterName').val(),
					page:1,
					start:0,
					limit:2000
				},
				type		: 'GET',
				success		: function(res){
					console.log(res)
					if (!res.list || res.list.length < 1) { return; }
					$('#_fs_previewArea').val('');		
					
					$.each(res.list[0].rowData, function(idx, val) {
						$('#_fs_previewArea').val($('#_fs_previewArea').val() + val + '\n');
					});	
					
					$('#_fs_previewModal').ankusModal('show');
				},
				error : function(xhr, status, error) {

				}
			});
			
		};
		// 디렉토리 생성 팝업의 예 버튼 실행
		var _createSubmitAction = function(){
			var dirName = $('#_fs_createInput').val();
			var pNode = ('/' === currentNodeId) ? '/' : currentNodeId + '/';
			
			if(!dirName){
				ANKUS_API.util.alert(i18nP('JS_FILESYS_DIRECTORY_NAME_CHECK'));
				return;
			}
			ANKUS_API.ajax({
				url			: '/fs/hdfs/newDirectory',
				type		: 'POST',
				data		: JSON.stringify({
					path : pNode + dirName,
					engineId : $('#_fs_clusterName').val()
				}),
				success		: function(res){
					if(res.success){
						ANKUS_API.util.alert(i18nP('JS_FILESYS_DIRECTORY_CREATE_SUCCESS'));
						_setTree();
						$('#_fs_grid').ankusSetGridData([]);
					}
					else{
						ANKUS_API.util.alert(res.error.message);
					}
				}
			});
			$('#_fs_createModal').ankusModal('hide');
			$('#_fs_createInput').val('');
		};
		// 디렉토리 생성 팝업의 아니오 버튼 실행
		var _createCancelAction = function(){
			$('#_fs_createModal').ankusModal('hide');
			$('#_fs_createInput').val('');
		};
		// 디렉토리 이름 변경 팝업의 예 버튼 실행
		var _modifySubmitAction = function(){
			var dirName = $('#_fs_modifyInput').val();
			var dirArr = currentNodeId.split('/');
			var parent;
			
			dirArr.length = dirArr.length - 1;
			parent = dirArr.join('/');
			
			if(!dirName){
				ANKUS_API.util.alert(i18nP('JS_FILESYS_DIRECTORY_NAME_CHECK'));
				return;
			}
			ANKUS_API.ajax({
				url			: '/fs/hdfs/renameDirectory',
				type		: 'POST',
				data		: JSON.stringify({
					from : currentNodeId,
					to : parent + '/' + dirName,
					engineId : Number($('#_fs_clusterName').val())
				}),
				success		: function(res){
					if(res.success){
						ANKUS_API.util.alert(i18nP('JS_FILESYS_DIRECTORY_UPDATE_SUCCESS'));
						_setTree();
						$('#_fs_grid').ankusSetGridData([]);
					}
				}
			});
			$('#_fs_modifyModal').ankusModal('hide');
			$('#_fs_modifyInput').val('');
		};
		// 디렉토리 이름 변경 팝업의 아니오 버튼 실행
		var _modifyCancelAction = function(){
			$('#_fs_modifyModal').ankusModal('hide');
			$('#_fs_modifyInput').val('');
		};
		// 디렉토리 삭제 팝업의 예 버튼 실행
		var _deleteSubmitAction = function(){
			ANKUS_API.ajax({
				url			: '/fs/hdfs/deleteDirectory',
				type		: 'POST',
				data		: JSON.stringify({
					path : currentNodeId,
					engineId : Number($('#_fs_clusterName').val())
				}),
				success		: function(res){
					if(res.success){
						ANKUS_API.util.alert(i18nP('JS_FILESYS_DIRECTORY_REMOVE_SUCCESS'));
						_setTree();
						$('#_fs_grid').ankusSetGridData([]);
					}
					else{
						ANKUS_API.util.alert(res.error.cause);
					}
				}
			});
			$('#_fs_deleteModal').ankusModal('hide');
		};
		// 디렉토리 삭제 팝업의 아니오 버튼 실행
		var _deleteCancelAction = function(){
			$('#_fs_deleteModal').ankusModal('hide');
		};
		// 디렉토리 이동 팝업의 확인 버튼 실행
		var _moveSubmitAction = function(){
			var fromVal;
			var isTree;
			
			return {
				isTree : function(v){
					isTree = v;
				},
				setFrom : function(v){
					fromVal = v;
				},
				action : function(){
					var nodeArr = currentNodeId.split('/');
					var nodeName = nodeArr[nodeArr.length-1];
					var toDir;
					var confirmMsg;
					var urlVal;
					var data = {
						engineId : Number($('#_fs_clusterName').val())
					};
					
					if(isTree){
						toDir = treeNodeId + '/' + nodeName;
						confirmMsg = i18nP('JS_FILESYS_DIRECTORY_CONFIRM_MSG');
						urlVal = '/fs/hdfs/moveDirectory';
						data.from = fromVal;
					}
					else{
						toDir = treeNodeId + '';
						confirmMsg = i18nP('JS_FILESYS_FILE_CONFIRM_MSG');
						urlVal = '/fs/hdfs/move';
						data.paths = fromVal;
					}
					data.to = toDir;
					
					ANKUS_API.util.confirm({
						description	: i18nP('JS_FILESYS_MOVE_CHECK', fromVal+confirmMsg+toDir),
						callback : function(sel){
							if(sel){
								ANKUS_API.ajax({
									url			: urlVal,
									type		: 'POST',
									data		: JSON.stringify(data),
									success		: function(res){
										if(res.success){
											ANKUS_API.util.alert(i18nP('JS_FILESYS_MOVE_CHECK_SUCCESS', confirmMsg));
											_setTree();
											$('#_fs_grid').ankusSetGridData([]);
										}
										else{
											ANKUS_API.util.alert(res.error.message);
										}
									}
								});							
							}
							$('#_fs_moveModal').ankusModal('hide');
						}
					});
				}
			};			
		}();
		// 디렉토리 이동 팝업의 취소 버튼 실행
		var _moveCancelAction = function(){
			$('#_fs_moveModal').ankusModal('hide');
		};
		// 디렉토리 복사 팝업의 확인 버튼 실행
		var _copySubmitAction = function(){
			var fromVal;
			var isTree;
			
			return {
				isTree : function(v){
					isTree = v;
				},
				setFrom : function(v){
					fromVal = v;
				},
				action : function(){
					var nodeArr = currentNodeId.split('/');
					var nodeName = nodeArr[nodeArr.length-1];
					var toDir;
					var urlVal;
					var confirmMsg;
					var data = {
						to : toDir,
						engineId : Number($('#_fs_clusterName').val())
					};
					if(isTree){
						toDir = treeNodeId + '/' + nodeName;
						urlVal = '/fs/hdfs/copyDirectory';
						confirmMsg = i18nP('JS_FILESYS_DIRECTORY_CONFIRM_MSG');
						data.from = fromVal;
					}
					else{
						toDir = treeNodeId;
						urlVal = '/fs/hdfs/copy';
						confirmMsg = i18nP('JS_FILESYS_FILE_CONFIRM_MSG');
						data.paths = fromVal;
					}
					data.to = toDir;
					
					ANKUS_API.util.confirm({
						description	: i18nP('JS_FILESYS_COPY_CHECK', fromVal+confirmMsg+toDir),
						callback : function(sel){
							if(sel){
								ANKUS_API.ajax({
									url			: urlVal,
									type		: 'POST',
									data		: JSON.stringify(data),
									success		: function(res){
										if(res.success){
											ANKUS_API.util.alert(i18nP('JS_FILESYS_COPY_CHECK_SUCCESS', confirmMsg));
											_setTree();
											$('#_fs_grid').ankusSetGridData([]);
										}
										else{
											ANKUS_API.util.alert(res.error.message);
										}
									}
								});							
							}
							$('#_fs_copyModal').ankusModal('hide');
						}
					});
				}
			};			
		}();
		// 디렉토리 복사 팝업의 취소 버튼 실행
		var _copyCancelAction = function(){
			$('#_fs_copyModal').ankusModal('hide');
		};
		// 파일 업로드 실행
		var _fileUploadAction = function(){
			uploadObj.startUpload();
		};
		// 파일 업로드 중지
		var _fileStopAction = function(){
			uploadObj.stopUpload();
		};
		// 파일 업로드 모두 취소
		var _fileCancelAction = function(){
			uploadObj.cancelAll();
		};
		// 파일 업로더 리셋
		var _fileResetAction = function(){
			uploadObj.reset();
		};
		// 파일 업로더 팝업 닫기
		var _closeUpload = function(){		
			$('#_fs_uploadModal').ankusModal('hide');
			_getGrid(currentNodeId);
		};
		var _closePreview = function(){		
			$('#_fs_previewModal').ankusModal('hide');
		};

		$('#_tabFileSystem').one('click', function(){
			_setLayout();
			setTimeout(function(){
				$('#_fs_btnRefresh').trigger('click');
			},600);
		});
		$('#_fs_clusterName').on('change', _changeClusterName);
		$('#_fs_btnRefresh').on('click', _btnRefreshAction);
		$('#_fs_btnRemaining').on('click', _btnRemainingAction);
		$('#_fs_btnCopy').on('click', _btnCopyAction);
		$('#_fs_btnMove').on('click', _btnMoveAction);
		$('#_fs_btnRename').on('click', _btnRenameAction);
		$('#_fs_btnDelete').on('click', _btnDeleteAction);
		$('#_fs_btnUpload').on('click', _uploadAction);
		$('#_fs_btnDownload').on('click', _btnDownloadAction);
		$('#_fs_btnPreview').on('click', _btnPreviewAction);
		$('#_fs_createSubmit').on('click', _createSubmitAction);
		$('#_fs_createCancel').on('click', _createCancelAction);
		$('#_fs_createInput').keypress(function(e){
			if(13 === e.which){
				_createSubmitAction();
			}
		});
		$('#_fs_modifySubmit').on('click', _modifySubmitAction);
		$('#_fs_modifyCancel').on('click', _modifyCancelAction);
		$('#_fs_modifyInput').keypress(function(e){
			if(13 === e.which){
				_modifySubmitAction();
			}
		});
		$('#_fs_deleteSubmit').on('click', _deleteSubmitAction);
		$('#_fs_deleteCancel').on('click', _deleteCancelAction);
		$('#_fs_moveSubmit').on('click', _moveSubmitAction.action);
		$('#_fs_moveCancel').on('click', _moveCancelAction);
		$('#_fs_copySubmit').on('click', _copySubmitAction.action);
		$('#_fs_copyCancel').on('click', _copyCancelAction);
		$('#_fs_btnUploadAction').on('click', _fileUploadAction);
		$('#_fs_btnStopAction').on('click', _fileStopAction);
		$('#_fs_btnCancelAction').on('click', _fileCancelAction);
		$('#_fs_btnResetAction').on('click', _fileResetAction);
		$('#_fs_fileUploadClose').on('click', _closeUpload);
		$('#_fs_previewClose').on('click', _closePreview);
		
		(function init(){
			_getEngine();
			_setTree(true);
			_setGrid();
			_setProgress();			
			_setModal();
			_setUpload();
		})();		
	})();