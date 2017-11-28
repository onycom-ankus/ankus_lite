/******************************************************************************
 * 
 * ANKUS_API
 *
 * 이 파일은 Ankus를 손쉽게 사용할 수 있는 자바스크립트 라이브러리이다.
 *
 * @version     0.1
 * @author      Onycom
 * @url         www.onycom.com
 * @require     jquery.js
 *              d3.js
 *              d3.layout.cloud.js
 *              daum map
 *              nv.d3.js              
 *              jstree.js
 *              jquery.jqgrid.js
 *
 *****************************************************************************/

var ANKUS_API = function(w){
	/* 필수 라이브러리 체크 */
	(function checkRequire(){
		var checkLib = function(isExist, str){
			if(!isExist){
				console.log(str);
			}
		};
		
		checkLib('$' in w, 'jquery 라이브러리를 추가해 주세요.');
		checkLib('d3' in w, 'D3 라이브러리를 추가해 주세요.');
		checkLib('cloud' in w.d3.layout, 'D3 cloud 라이브러리를 추가해 주세요.');
		checkLib('daum' in w, 'Daum map 라이브러리를 추가해 주세요.');
		checkLib('nv' in w, 'NVD3 라이브러리를 추가해 주세요.');
		checkLib('jstree' in w.$.fn, 'jquery tree 라이브러리를 추가해 주세요.');
		checkLib('jqGrid' in w.$.fn, 'jquery grid 라이브러리를 추가해 주세요.');
	})();
	
	/* local 변수 */
	var isDev = false;
	var d3 = w.d3;
	var $ = w.jQuery;
	var host = location.origin;
	var maps = (undefined !== w.daum) ? w.daum.maps : {};
	var nv = w.nv;
	var markerImgSrc = '/resources/images/kfda.png';
	var markerContent = '<h3 style="color:red; background-color:initial;">ankus-lite</h3>';
//	var markerContent = '<h3 style="color:red; background-color:initial;"><spring:message code="JS_ANKUS_API_HTML_MFDS"/></h3>';
	var dateFormat = 'yyyymmdd';
	var dateDelimiter = '-';
	var datePickerFormat = 'yyyy-mm-dd';
	// D3 차트 기본 값
	var chartDDefaultOption = {
		'line'			: {
			url : '/testLine',
			param : {},
			margin : {top : 20, right : 20, bottom : 30, left : 50},
			formatDate : d3.time.format('%d-%b-%y'),
			xAxisName : 'date',
			yAxisName : 'close',
			yAxisTitle : 'Price ($)',
			data : [],
			dataType : 'json'
		},
		'pie'			: {
			url : '/testPie',
			param : {},
			textName : 'text',
			sizeName : 'size',
			range : ['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00'],
			data : [],
			dataType : 'json'
		},
		'bubble'		: {
			url : '/testBubble',
			param : {},
			nodeName : 'name',
			childName : 'children',
			sizeName : 'size',
			padding : 1.5,
			data : {},
			dataType : 'json'
		},
		'wordCloud'		: {
			url : '/testWordCloud',
			param : {},
			textName : 'text',
			sizeName : 'size',
			opacity : .75,
			dataType : 'json',
			data : [],
			visual : [{
				scale : 10,		size : 10,	color : 'blue'},{
				scale : 100,	size : 20,	color : 'green'},{
				scale : 500,	size : 40,	color : 'orange'},{
				scale : 1000,	size : 80,	color : 'red'
			}]
		}
	};
	// NVD3 차트 기본 값
	var chartNvDefaultOption = {
		'line'			: {
			margin : {left : 100},
			xTitle : '',
			yTitle : ''
		},
		'pie'			: {
			labelType : 'percent',
			showLegend : true,
			showLabel : true,
			isDonut : false
		},
		'lineColumn'	: {
			margin : {top : 30, right : 60, bottom : 50, left : 70}
		}
	};

	/* private 함수 */
	// 개발 중일 때 info를 나타냄
	var _devInfo = function(str){
		if(isDev){
			console.log(str);
		}
	};
	
	/* jquery 확장 */
	(function extendPlugin(){
		/*
		Function: $.fn.ankusChartD3
			차트를 만든다.

		Parameter:
			- option [object] - 차트로 만들 옵션

		Returns:
			- this.

		Examples:
			: $('#selector').ankusChartD3({
			: 	type	: 'pie'
			: });

		Notes:
			- 각 옵션 값은 See Also의 차트 설정 메소드를 참고하도록 한다.
			- html : <div></div>
			
		See Also:
			- <ANKUS_API.chartD3.line>
			- <ANKUS_API.chartD3.pie>
			- <ANKUS_API.chartD3.bubble>
			- <ANKUS_API.chartD3.wordCloud>
		*/
		$.fn.ankusChartD3 = function(option){
			var el = _chartD3.setChart(this, option);
			var $parent = $(el).parent(); 
			
			$parent.parent().css({
				background	: 'transparent',
				border		: '0px'
			});
			
			if(true === option.isMap){
				$parent.prev().remove();
			}
			return this;
		};
		
		/*
		Function: $.fn.ankusChartNv
			NV 차트를 만든다.

		Parameter:
			- option [object] - 차트로 만들 옵션

		Returns:
			- this.

		Examples:
			: $('#selector').ankusChartNv({
			: 	type	: 'pie',
			: 	data	: [{
			: 		'label' : 'One', 'value' : 29.765957771107
			: 	},{
			: 		'label' : 'Two', 'value' : 0}],
			: 	isDonut	: false
			: });

		Notes:
			- 각 옵션 값은 See Also의 차트 설정 메소드를 참고하도록 한다.
			- html : <div></div>
			
		See Also:
			- <ANKUS_API.chartNv.line>
			- <ANKUS_API.chartNv.lineColumn>
			- <ANKUS_API.chartNv.pie>
		*/
		$.fn.ankusChartNv = function(option){
			var el = _chartNv.setChart(this, option);
			var $parent = $(el).parent(); 
			
			$parent.parent().css({
				background	: 'transparent',
				border		: '0px'
			});
			
			if(true === option.isMap){
				$parent.prev().remove();
			}
			return this;
		};

		/*
		Function: $.fn.ankusRemoveChartD3
			차트를 삭제한다.

		Parameter:
			- 없음.

		Returns:
			- this.

		Examples:
			: $('#selector').ankusRemoveChartD3();
		*/
		$.fn.ankusRemoveChartD3 = function(){
			$(this).find('svg').remove();
		};
		
		/*
		Function: $.fn.ankusUpdateNv
			NV 차트 데이터를 업데이트 한다.

		Parameter:
			- data [array] : 업데이트 할 데이터.

		Returns:
			- this.

		Examples:
			: $('#selector').ankusUpdateNv([{
			: 	color : '#ff7f0e',
			: 	key : 'Sine Wave',
			: 	values : [{x : 6, y : 0.5}, {x : 7, y : 0.6}]
			: }]);
		*/
		$.fn.ankusUpdateNv = function(data){
			var $this = $(this);
			var svg = $this.find('svg').get(0);
			var chart = $this.data('chart');
			
			d3.select(svg).datum(data).transition().duration(300).call(chart);
			nv.utils.windowResize(chart.update);
			return this;
		};
		
		/*
		Function: $.fn.ankusTree
			트리 메뉴를 만든다.

		Parameter:
			- option [object] - 트리 설정 옵션.

		Returns:
			- this.

		Examples:
			: $('#selector').ankusTree({
			: 	click	: function(selected){
			: 		alert(selected);
			: 	},
			: 	url		: function(node){
			: 		return '#' === node.id ? '/resources/doc/directory.json' : '/resources/doc/directory2.json';
			: 	}
			: });
			: 			
			: $('#selector').ankusTree({
			: 	data : [
			: 		'Simple root node', {
			: 			'text' : 'Root node 2', 
			: 			'state' : {
			: 				'opened' : true,
			: 				'selected' : true
			: 			},
			: 			'children' : [{'text' : 'Child 1'}, 'Child 2']
			: 		}
			: 	]
			: });
			
		Notes:
			- 옵션은 click, data, url을 설정할 수 있다.
			- html : <div></div>
		*/
		$.fn.ankusTree = function(option){
			var dataObj;
			
			if(undefined !== option.data){
				dataObj = option.data; 
			}
			else if('string' === typeof option.url){
				dataObj = {
					'url' : function(node){
						return option.url + '?id=' + node.id;
					}
				}
			}
			else if('function' === typeof option.url){
				dataObj = {
					'url' : function(node){
						return option.url(node);
					}
				}
			}
			$(this).jstree('destroy').on('changed.jstree', function(e, data){
				var fnClick = option.click;
				
				if('function' === typeof fnClick){
					fnClick(data.selected[0]);
				}
			}).jstree({
				'core' : {
					'data' : dataObj
				}
			});
			
			return this;
		};
		
		/*
		Function: $.fn.ankusGrid
			그리드 메뉴를 만든다.

		Parameter:
			- option [object] - 그리드 설정 옵션.

		Returns:
			- this.

		Examples:
			: $('selector').ankusTree({
			: 	url			: '/resources/doc/grid.json',
			: 	sortname	: 'modificationTime',
			: 	multiselect: true,
			: 	colModel	: [{
			: 		name : 'cls',
			: 		label : 'Type',
			: 		width : 50,
			: 		align : 'center',
			: 		formatter : function(v){
			: 			return ('folder' === v) ? '<img src="/resources/images/common-folder.png" alt="folder" />' : '<img src="/resources/images/common-file.png" alt="file" />';
			: 		}
			: 	},{
			: 	name : 'filename',
			: 	label : 'File Name',
			: 	width : 210
			: 	}]
			: });
			
		Notes:
			- pager가 필요한 경우 pager로 만들 div의 id값을 option의 pager 항목에 설정한다.
			- toolbar에는 add, edit, del, search, download, upload, copy, move, clear 9가지의 버튼을 설정할 수 있으며 각각의 함수 설정 시 해당 버튼이 나타난다.
			- 아래 코드와 같이 작성하면 checkbox로 선택된 항목의 id값을 가져올 수 있다. 
			: $('selector').getGridParam('selarrrow');
			- 아래 코드와 같이 작성하면 id를 이용하여 row값을 가져올 수 있다. 
			: $('selector').getRowData(rowid);
			- html : <table></table>
			
		See Also:
			- <$.fn.ankusSetGridData>
		*/
		$.fn.ankusGrid = function(option){
			var $this = $(this);
			var defaultOption = {
				url				: '',
				datatype		: 'json',
				guiStyle		: 'bootstrap',
				iconSet			: 'fontAwesome',
				rownumbers		: false,
				onSelectRow		: function(id){},
				ondblClickRow	: function(id){},
				multiselect		: false,
				sortname		: '',
				sortorder		: 'desc',
				rowNum			: 10,
				pager			: true,
				viewrecords		: true,
				rowList			: [5, 10, 20],
				colModel		: [],
				addfunc			: function(){},
				editfunc		: function(){},
				delfunc			: function(){},
				searchfunc		: function(){}
			};			
			var addButton = function(opt){
				var fn = opt.fn;
				var title = opt.title || '';
				var icon = opt.icon || '';
				
				if('function' === typeof fn){
					$this.navButtonAdd(option.pager, {
						caption : '',
						buttonicon : icon,
						onClickButton : fn,
						position : 'last',
						title : title,
						cursor:'pointer'
					});
				}				
			};
			var buttonOption;
			
			if(option.pager && (0 === $('#' + option.pager).length)){
				$this.after('<div id="'+option.pager+'"></div>');
				option.pager = '#' + option.pager;
			}
			
			$this.jqGrid($.extend(defaultOption, option));
			
			if(option.headerFix){
				$this.parent().css({'overflow-x':'hidden'}); //.end().closest('.ui-jqgrid-bdiv').css({'overflow-y' : 'scroll'});
			}
			
			if(option.pager){
				buttonOption = {
					add			: 'function' === typeof option.addfunc,
					edit		: 'function' === typeof option.editfunc,
					del			: 'function' === typeof option.delfunc,
					search		: 'function' === typeof option.searchfunc,
					addfunc		: defaultOption.addfunc,
					editfunc	: defaultOption.editfunc,
					delfunc		: defaultOption.delfunc,
					searchfunc	: defaultOption.searchfunc,
					refresh		: false
				};

				$this.navGrid(option.pager, buttonOption);
			}
			addButton({fn : option.downloadfunc,	title : 'download',	icon : 'fa fa-download'});
			addButton({fn : option.uploadfunc,		title : 'upload',	icon : 'fa fa-upload'});
			addButton({fn : option.copyfunc,		title : 'copy',		icon : 'fa fa-files-o'});
			addButton({fn : option.movefunc,		title : 'move',		icon : 'fa fa-exchange'});
			addButton({fn : option.clearfunc,		title : 'clear',	icon : 'fa fa-folder-open-o'});
			if('function' === typeof option.refreshfunc){
				addButton({fn : option.refreshfunc, title : 'refresh', icon : 'fa fa-refresh'});
			}
			
			return this;
		};
		
		/*
		Function: $.fn.ankusSetGridData
			ankusGrid에 데이터를 설정한다.

		Parameter:
			- data [array] - 그리드에 설정할 데이터

		Returns:
			- this.

		Examples:
			: $('selector').ankusSetGridData([{test:'test'}]);
			
		See Also:
			- <$.fn.ankusGrid>
		*/
		$.fn.ankusSetGridData = function(data){
			$(this).jqGrid('clearGridData').jqGrid('setGridParam', {
				datatype	: 'local',
				data		: data
			}).trigger('reloadGrid');
			
			return this;
		};
		
		/*
		Function: $.fn.ankusProgress
			progress bar를 만든다.

		Parameter:
			- value [number] - progress bar percentage

		Returns:
			- this.

		Examples:
			: $('selector').ankusProgress(30);
			
		Notes:
			- parameter 값에 따라 4가지 색으로 표현할 수 있다.
			- html : <div></div>
		*/
		$.fn.ankusProgress = function(value, isProgress){
			var val = Number((value + '').replace(/[^0-9\.]/g, '')) || 0;
			var colorClass = 'progress-bar-success';
			
			if(0 === val){
				colorClass = 'progress-bar-danger';
			}
			else if(50 > val){
				colorClass = 'progress-bar-warning';
			}
			else if(100 > val){
				colorClass = 'progress-bar-info';
			}
			
			if(isProgress){
				colorClass = colorClass + ' progress-bar-striped';
			}
			
			$(this)
				.addClass('progress')
				.empty()
				.append('<div></div>').find('div')
				.addClass('progress-bar')
				.addClass(colorClass)
				.attr('role', 'progressbar')
				.attr('aria-valuenow', val + '')
				.attr('aria-valuemin', '0')
				.attr('aria-valuemax', '100')
				.css('width', val + '%')
				.css('color', val < 30 ? '#333' : 'white')
				.text(val + '%')
			;
			
			return this;
		};
		
		/*
		Function: $.fn.ankusButton
			버튼을 만든다.

		Parameter:
			- color [string] - 버튼 색
			- size [string] - 버튼 크기

		Returns:
			- this.

		Examples:
			: $('selector').ankusButton('blue', 'small');
			
		Notes:
			- color는 white, blue, green, sky, orange, red, link로 설정할 수 있다.
			- size는 large, medium, small, xSmall로 설정할 수 있다.
			- html : <button></button>
		*/
		$.fn.ankusButton = function(color, size){
			var colorVal = color || 'white';
			var sizeVal = size || 'default';
			var colorObj = {
				white	: 'btn-default',
				blue	: 'btn-primary',
				green	: 'btn-success',
				sky		: 'btn-info',
				orange	: 'btn-warning',
				red		: 'btn-danger',
				link	: 'btn-link'
			};
			var sizeObj = {				
				large	: 'btn-lg',
				medium	: '',
				small	: 'btn-sm',
				xSmall	: 'btn-xs'
			};
			
			$(this).addClass('btn').addClass(colorObj[colorVal]).addClass(sizeObj[sizeVal]);
			
			return this;
		};
		
		/*
		Function: $.fn.ankusSelect
			select box를 만든다.

		Parameter:
			- size [string] - 버튼 크기

		Returns:
			- this.

		Examples:
			: $('selector').ankusSelect('small');
			
		Notes:
			- size는 large, medium, small로 설정할 수 있다.
			- html : <select><option value="opt">opt</option></select>
		*/
		$.fn.ankusSelect = function(size){
			var sizeObj = {				
				large	: 'input-lg',
				medium	: '',
				small	: 'input-sm'
			};
			
			$(this).addClass('form-control').addClass(sizeObj[size]);
			
			return this;
		};
		
		/*
		Function: $.fn.ankusInput
			input box를 만든다.

		Parameter:
			- size [string] - input box 크기

		Returns:
			- this.

		Examples:
			: $('selector').ankusInput('small');
			
		Notes:
			- size는 large, medium, small로 설정할 수 있다.
			- html : <input />
		*/
		$.fn.ankusInput = function(size){
			var sizeClass = '';
			
			if('small' === size){
				sizeClass = 'input-sm';
			}
			else if('large' === size){
				sizeClass = 'input-lg';
			}
			$(this).addClass('form-control').addClass(sizeClass);
			
			return this;
		};
		
		/*
		Function: $.fn.ankusTextarea
			textarea를 만든다.

		Parameter:
			- 없음.

		Returns:
			- this.

		Examples:
			: $('selector').ankusTextarea();
			
		Notes:
			- html : <textarea><textarea/>
		*/
		$.fn.ankusTextarea = function(){
			$(this).addClass('form-control');
			
			return this;
		};
		
		/*
		Function: $.fn.ankusModal
			modal popup을 만든다.

		Parameter:
			- option [object] - modal option

		Returns:
			- this.

		Examples:
			: $('selector').ankusModal();
			
		Notes:
			- html
			: <div id="_modal" class="modal fade" role="dialog">
			: 	<div class="modal-dialog">
			: 		<div class="modal-content">
			: 			<div class="modal-header">
			: 				<button type="button" class="close" data-dismiss="modal">&times;</button>
			: 				<h4 class="modal-title">Modal Header</h4>
			: 			</div>
			: 			<div class="modal-body">
			: 				<p>Some text in the modal.</p>
			: 			</div>
			: 			<div class="modal-footer">
			: 				<button class="btn btn-default" data-dismiss="modal">Close</button>
			: 			</div>
			: 		</div>
			: 	</div>
			: </div>
		*/
		$.fn.ankusModal = function(option){
			var $this = $(this);
			var defaultOption = {
				backdrop	: true,
				keyboard	: true,
				show		: false,
				remote		: false
			};

			if('string' === typeof option){
				$this.modal(option);
				if('show' === option && 'body' !== $this.parent()[0].tagName.toLowerCase()){
					$this.appendTo('body');
				}
			}
			else {
				$this.modal($.extend(defaultOption, option || {}));
			}
			
			return this;
		};
		
		/*
		Function: $.fn.ankusDate
			date picker를 만든다.

		Parameter:
			- option [object] - date picker 옵션

		Returns:
			- this.

		Examples:
			: $('selector').ankusDate();
			
		Notes:
			- html 
			: <input type="text" class="form-control" id="_datePicker" value="2012-04-05" />
		*/
		$.fn.ankusDate = function(option){
			var opt = option || {};
			var defaultOption = {
				format		: datePickerFormat
			};
			
			$(this).datepicker($.extend(defaultOption, opt));
			$('.datepicker').on('click', '.day', function(){
				$('.datepicker:visible').slideUp();
			});
			return this;
		};
		
		/*
		Function: $.fn.ankusCode
			CodeMirror를 만든다.

		Parameter:
			- obj [object] - CodeMirror 옵션

		Returns:
			- this.

		Examples:
			: $('selector').ankusCode({val : 'test'});
			
		Notes:
			- html 
			: <div id="_ds_popupWorkFlowHistory_errorLogValue"></div>
		*/
		$.fn.ankusCode = function(obj){	
			var dummy = {
				attrs : {
					color : [ "red", "green", "blue", "purple", "white", "black", "yellow" ],
					size : [ "large", "medium", "small" ],
					description : null
				},
				children : []
			};
			var tags = {
					"!top": ["top"],
					"!attrs": {
						id: null,
						"class": ["A", "B", "C"]
					},
					top: {
						attrs: {
							lang: ["en", "de", "fr", "nl"],
							freeform: null
						},
						children: ["animal", "plant"]
					},
					animal: {
						attrs: {
							name: null,
							isduck: ["yes", "no"]
						},
						children: ["wings", "feet", "body", "head", "tail"]
					},
					plant: {
						attrs: {name: null},
						children: ["leaves", "stem", "flowers"]
					},
					wings: dummy, feet: dummy, body: dummy, head: dummy, tail: dummy,
					leaves: dummy, stem: dummy, flowers: dummy
		      };
	      
			var completeAfter = function(cm, pred) {
				var cur = cm.getCursor();
	          	if (!pred || pred()) setTimeout(function() {
	          		if (!cm.state.completionActive)
	          			cm.showHint({completeSingle: false});
	          	}, 100);
	          	return CodeMirror.Pass;
	        }
			var completeIfAfterLt = function(cm) {
				return completeAfter(cm, function() {
					var cur = cm.getCursor();
					return cm.getRange(CodeMirror.Pos(cur.line, cur.ch - 1), cur) == "<";
				});
			}
	        var completeIfInTag = function(cm) {
	        	return completeAfter(cm, function() {
	        		var tok = cm.getTokenAt(cm.getCursor());
	        		if (tok.type == "string" && (!/['"]/.test(tok.string.charAt(tok.string.length - 1)) || tok.string.length == 1)) return false;
	        		var inner = CodeMirror.innerMode(cm.getMode(), tok.state).state;
	        		return inner.tagName;
	        	});
	        }

			var defaultObj = {
				value : '',
				readOnly : true,
				lineNumbers : true,
				lineWrapping : true,
				matchBrackets : true,
				indentUnit : 2,
				mode : 'xml',
				extraKeys : {
					"'<'" : completeAfter,
					"'/'" : completeIfAfterLt,
					"' '" : completeIfInTag,
					"'='" : completeIfInTag,
					"Ctrl-Space" : "autocomplete"
				},
				hintOptions : {
					schemaInfo : tags
				},
				showModes : true,
				autofocus : true,
				lint : true,
				gutters : [ 'CodeMirror-linenumbers', 'CodeMirror-foldgutter' ]
			}; 
			var $this = $(this);
			
			$this.empty();
			CodeMirror($this[0], $.extend(defaultObj, obj));
			
			return this;
		};
		
		/*
		Function: $.fn.ankusUpload
			file uploader를 만든다.

		Parameter:
			- opt [object] - uploader 옵션

		Returns:
			- this.

		Examples:
			: uploadObj = $('#_fs_fileUploader').ankusUpload({
			: 	url				: '/fs/hdfs/upload',
			: 	fileName		: 'file',
			: 	dynamicFormData	: function(){
			: 		return {
			: 			path: currentNodeId,
			: 			engineId: $('#_fs_clusterName').val()
			: 		}
			: 	},
			: 	onSuccess		: function(files, data, xhr, pd){
			: 		var res = JSON.parse(data);				
			: 		console.log(res);
			: 	},
			: 	onError			: function(){
			: 		ANKUS_API.util.alert('업로드가 실패하였습니다.');
			: 	}
			: });
			
		Notes:
			- html 
			: <div id="_fs_fileUploader"></div>
		*/
		$.fn.ankusUpload = function(opt){
			var defaultObj = {
				url				: '',
				fileName		: '',
				autoSubmit		: false,
				method			: 'POST',
				enctype			: 'multipart/form-data',
				showDone		: true,
				sequential		: true,
				sequentialCount	: 1,
				returnType		: 'json',
				multiple		: false,
				showCancel		: true,
				showAbort		: true,
				showProgress	: true,
				showFileSize	: true,
				uploadStr		: i18nP('JS_ANKUS_API_FIND'),
				maxFileSize		: 107374182400
			};
			
			return $(this).uploadFile($.extend(defaultObj, opt));
		};
	})();
	
	/* D3 chart */
	var _chartD3 = function(){
		// 차트 그리기
		var _drawChart = function(dataType, type, drawFn, url, data){
			if('json' === dataType){
				for(var i=0; i<data.length; i++){
					data[i] = type(data[i]);
				}
				drawFn(data);
			}
			else if('csv' === dataType){
				d3.csv(url, type, function(error, response){
					if(error){throw error;}
					drawFn(response);
				});
			}
		};
		
		/*
		Function: ANKUS_API.chartD3.setChart
			D3 차트 설정하기

		Parameter:
			- el [object] - 차트로 만들 dom object
			- option [object] - 차트 설정 옵션

		Returns:
			- this [object] - 차트로 만든 dom object

		Examples:
			: ANKUS_API.chartD3.setChart(document.getElementById('id'), {
			: 	type : 'line',
			: 	data : [{
			:		'date' : '24-Apr-07',
			:		'close' : 93.24
			:	}]
			: });

		Notes: 
			- 각 차트의 상세 옵션값은 See Also를 참고한다.
			
		See Also:
			- <ANKUS_API.chart.line>
			- <ANKUS_API.chart.pie>
			- <ANKUS_API.chart.bubble>
			- <ANKUS_API.chart.wordCloud>
		*/
		var _setChart = function(el, option){
			var $chart = $(el);
			var url;
			var param;
			var drawFn;
			var dataType;
			var defaultOptionObj;
			
			$chart.ankusRemoveChartD3();
			
			switch(option.type){
				case 'line' :
					defaultOptionObj = chartDDefaultOption.line;
					url = option.url || defaultOptionObj.url;
					param = defaultOptionObj.param;
					drawFn = _line;
					dataType = option.dataType || defaultOptionObj.dataType;
					break;
				case 'pie' :
					defaultOptionObj = chartDDefaultOption.pie;
					url = option.url || defaultOptionObj.url;
					param = defaultOptionObj.param;
					drawFn = _pie;
					dataType = option.dataType || defaultOptionObj.dataType;
					break;
				case 'bubble' :
					defaultOptionObj = chartDDefaultOption.bubble;
					url = option.url || defaultOptionObj.url;
					param = defaultOptionObj.param;
					drawFn = _bubble;
					dataType = option.dataType || defaultOptionObj.dataType;
					break;
				case 'wordCloud' :
					defaultOptionObj = chartDDefaultOption.wordCloud;
					url = option.url || defaultOptionObj.url;
					param = defaultOptionObj.param;
					drawFn = _wordCloud;
					dataType = option.dataType || defaultOptionObj.dataType;
					break;
				default :
					break;
			}
			
			option.$this = $chart;
			option.dataType = dataType;
			option.url = url;
			
			if('json' === dataType){
				_ajax({
					url		: option.url || url,
					data	: option.param || param,
					type	: 'POST',
					success	: function(res){
						option.data = res;
						drawFn(option);
					}
				});
			}
			else if('csv' === dataType){
				drawFn(option);
			}
			
			return el;
		};
		
		/*
		Function: ANKUS_API.chartD3.line
			D3 line 차트를 만든다.

		Parameter:
			- $this [object] - 차트로 만들 jquery selector
			- url [string] - 데이터를 가져올 url
			- dataType [string] - 데이터의 종류(json, csv...)
			- data [array] - 차트에 적용할 데이터
			- margin [object] - 차트의 margin 값
			- formatDate [object] - x 축 날짜 설정 D3 object(d3.time.format)
			- yTitle [string] - y축 타이틀 값
			- callback [function] - 차트를 그린 후 실행할 callback 함수

		Returns:
			- 없음.

		Examples:
			: ANKUS_API.chart.line({
			: 	$this : $('#selector'),
			: 	data : [{
			:		'date' : '24-Apr-07',
			:		'close' : 93.24
			:	}]
			: });

		Notes:
			- margin 값은 미설정 시 {top : 20, right : 20, bottom : 30, left : 50}로 설정된다. 
			- formatDate 값은 미설정 시 %d-%b-%y로 설정된다.
			
		See Also:
			- <ANKUS_API.chartD3.pie>
			- <ANKUS_API.chartD3.bubble>
			- <ANKUS_API.chartD3.wordCloud>
		*/
		var _line = function(option){
			var $this = option.$this;
			var lineDefault = chartDDefaultOption.line;
			var data = option.data || lineDefault.data;
			var dataType = option.dataType || lineDefault.dataType;
			var margin = option.margin || lineDefault.margin;
		    var width = $this.width() - margin.left - margin.right;
		    var height = $this.height() - margin.top - margin.bottom;
		    var formatDate = option.formatDate || lineDefault.formatDate;
		    var x = d3.time.scale().range([0, width]);
		    var y = d3.scale.linear().range([height, 0]);
		    var d3svg = d3.svg;		    
		    var xAxis = d3svg.axis().scale(x).orient('bottom');
		    var yAxis = d3svg.axis().scale(y).orient('left');
		    var xAxisName = option.xAxisName || lineDefault.xAxisName;
		    var yAxisName = option.yAxisName || lineDefault.yAxisName;
		    var yAxisTitle = option.yTitle || lineDefault.yAxisTitle;
		    var line = d3svg.line()
		    	.x(function(d) { return x(d[xAxisName]); })
		    	.y(function(d) { return y(d[yAxisName]); })
		    ;
		    var svg = d3.select($this.get(0)).append('svg')
		    	.attr('width', width + margin.left + margin.right)
		    	.attr('height', height + margin.top + margin.bottom)
		    	.append('g')
		    	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
		    ;
		    var type = function(d){
		    	d.date = formatDate.parse(d[xAxisName]);
		    	d.close = +d[yAxisName];
		    	return d;
		    };
		    var drawChart = function(chartData){
		    	x.domain(d3.extent(chartData, function(d) { return d[xAxisName]; }));
			    y.domain(d3.extent(chartData, function(d) { return d[yAxisName]; }));
			    
			    svg.append('g')
			    	.attr('class', 'x axis')
			    	.attr('transform', 'translate(0,' + height + ')')
			    	.style('display', 'none')
			    	.call(xAxis)
			    ;
			    
			    svg.append('g')
			    	.attr('class', 'y axis')
			    	.call(yAxis)
			    	.append('text')
			    	.attr('transform', 'rotate(-90)')
			    	.attr('y', 6)
			    	.attr('dy', '.71em')
			    	.style('text-anchor', 'end')
			    	.text(yAxisTitle)
			    ;
			    
			    svg.append('path')
			    	.datum(chartData)
			    	.attr('class', 'line')
			    	.attr('d', line)		    	
			    	.style('fill', 'none')
			    	.style('stroke', 'steelblue')
			    	.style('stroke-width', '1.5px')
			    ;
		    };
		    _drawChart(dataType, type, drawChart, option.url, data);
		    
		    if('function' === typeof option.callback){
		    	callback();
		    }
		};
		
		/*
		Function: ANKUS_API.chartD3.pie
			pie 차트를 만든다.

		Parameter:
			- $this [object] - 차트로 만들 jquery selector
			- url [string] - 데이터를 가져올 url
			- dataType [string] - 데이터의 종류(json, csv...)
			- range [array] - pie 차트의 색상
			- textName [string] - 각 단어 값
			- sizeName [string] - 각 단어의 크기
			- data [array] - 차트에 그릴 데이터
			- callback [function] - 차트를 그린 후 실행할 callback 함수

		Returns:
			- 없음.

		Examples:
			: ANKUS_API.chartD3.pie({
			: 	$this : $('#selector'),
			: 	data : [{
			: 		'text' : 'word',
			: 		'size' : 127
			: 	}],
			: 	textName : 'text',
			: 	sizeName : 'size'
			: });

		Notes:
			- opacity 값은 미설정 시 .75로 설정된다.
			
		See Also:
			- <ANKUS_API.chartD3.bubble>
			- <ANKUS_API.chartD3.line>
			- <ANKUS_API.chartD3.wordCloud>
		*/
		var _pie = function(option){
			var $this = option.$this;
			var pieDefault = chartDDefaultOption.pie;
			var d3el = d3.select($this.get(0));
			var width = $this.width();
		    var height = $this.height();
		    var radius = Math.min(width, height) / 2;
		    var color = d3.scale.ordinal().range(option.range || pieDefault.range);
		    var textName = option.textName || pieDefault.textName;
		    var sizeName = option.sizeName || pieDefault.sizeName;
		    var data = option.data || pieDefault.data;
		    var dataType = option.dataType || pieDefault.dataType;
		    var arc = d3.svg.arc().outerRadius(radius - 10).innerRadius(0);
		    var labelArc = d3.svg.arc().outerRadius(radius - 40).innerRadius(radius - 40);
		    var pie = d3.layout.pie().sort(null).value(function(d) { return d[sizeName]; });
		    var svg = d3el.append('svg')
		    	.attr('width', width)
		    	.attr('height', height)
		    	.append('g')
		    	.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
		    ;
		    var g;
			var type = function(d){
				d[sizeName] = +d[sizeName];
				return d;
			};
			var drawPie = function(chartData){
				g = svg.selectAll('.arc')
					.data(pie(chartData))
					.enter().append('g')
					.attr('class', 'arc')
				;				
				g.append('path')
					.attr('d', arc)
					.style('fill', function(d) { return color(d.data[textName]); })
				;				
				g.append('text')
					.attr('transform', function(d) { return 'translate(' + labelArc.centroid(d) + ')'; })
					.attr('dy', '.35em')
					.text(function(d) { return d.data[textName]; })
				;
			};
			
			_drawChart(dataType, type, drawPie, option.url, data);
			
			if('function' === typeof option.callback){
				callback();
			}
		};
		
		/*
		Function: ANKUS_API.chartD3.bubble
			bubble 차트를 만든다.

		Parameter:
			- $this [object] - 차트로 만들 jquery selector
			- url [string] - 데이터를 가져올 url
			- dataType [string] - 데이터의 종류(json, csv...)
			- nodeName [string] - 각 노드의 이름이 설정된 키 값
			- childName [string] - 하위 노드가 설정된 키 값
			- sizeName [number] - 각 노드의 크기가 설정된 키 값
			- padding [number] - 버블간의 padding 값
			- data [object] - 차트에 그릴 데이터
			- callback [function] - 차트를 그린 후 실행할 callback 함수

		Returns:
			- 없음.

		Examples:
			: ANKUS_API.chartD3.bubble({
			: 	$this : $('#selector'),
			: 	data : {
			: 		'name':'cluster',
			: 		'children':[{
			: 			'name':'AgglomerativeCluster',
			: 			'size':3938
			: 		}]
			: 	},
			: 	nodeName : 'name',
			: 	childName : 'children',
			: 	sizeName : 'size'
			: });

		Notes:
			- padding 값은 미설정 시 1.5로 설정된다. 
			
		See Also:
			- <ANKUS_API.chartD3.pie>
			- <ANKUS_API.chartD3.wordCloud>
			- <ANKUS_API.chartD3.line>
		*/
		var _bubble = function(option){
			var $this = option.$this;
			var bubbleDefault = chartDDefaultOption.bubble;
			var d3el = d3.select($this.get(0));
			var nodeName = option.nodeName || bubbleDefault.nodeName;
			var childName = option.childName || bubbleDefault.childName;
			var sizeName = option.sizeName || bubbleDefault.sizeName;
			var node = d3el.node();
			var width = node.clientWidth;
			var height = node.clientHeight;
			var diameter = (width > height) ? height : width;
			var padding = option.padding || bubbleDefault.padding;
		    var format = d3.format(',d');
		    var color = d3.scale.category20c();
		    var bubble = d3.layout.pack()
		    	.sort(null)
		    	.size([diameter, diameter])
		    	.padding(padding)
		    ;
		    var svg = d3el
		    	.append('svg')
		    	.attr('width', diameter)
		    	.attr('height', diameter)
		    	.attr('class', 'bubble')
		    ;
		    var classes = function(root){
		    	var classes = [];
		    	var recurse = function(name, node){
		    		if(node[childName]){
		    			node[childName].forEach(function(child){
		    				recurse(node[nodeName], child);
		    			});
		    		}
		    	    else{
		    	    	classes.push({packageName: name, className: node[nodeName], value: node[sizeName]});
		    	    }
		    	};
		    	var returnObj = {};
		    	
		    	recurse(null, root);
		    	returnObj[childName] = classes;
		    	return returnObj;
		    };
		    var node = svg.selectAll('.node')
		    	.data(bubble.nodes(classes(option.data || bubbleDefault.data))
		    	.filter(function(d){return !d[childName];}))
		    	.enter().append('g')
		    	.attr('class', 'node')
		    	.attr('transform', function(d){return 'translate(' + d.x + ',' + d.y + ')';})
		    ;		    
		    
		    node.append('title')
		    	.text(function(d){return d.className + ': ' + format(d.value);})
		    ;
		    node.append('circle')
		    	.attr('r', function(d){return d.r;})
		    	.style('fill', function(d){return color(d.packageName);})
		    ;		    
		    node.append('text')
		    	.attr('dy', '.3em')
		    	.style('text-anchor', 'middle')
		    	.text(function(d){return d.className.substring(0, d.r / 3);})
		    ;
		    d3.select(self.frameElement).style('height', diameter + 'px');
		    
		    if('function' === typeof option.callback){
		    	callback();
		    }
		};
		
		/*
		Function: ANKUS_API.chartD3.wordCloud
			wordCloud 차트를 만든다.

		Parameter:
			- $this [object] - 차트로 만들 jquery selector
			- url [string] - 데이터를 가져올 url
			- dataType [string] - 데이터의 종류(json, csv...)
			- opacity [number] - 투명도
			- textName [string] - 각 단어 값
			- sizeName [string] - 각 단어의 크기
			- visual [array] - 각 단어를 그릴때의 옵션
			- data [array] - 차트에 그릴 데이터
			- callback [function] - 차트를 그린 후 실행할 callback 함수

		Returns:
			- 없음.

		Examples:
			: ANKUS_API.chartD3.wordCloud({
			: 	$this : $('#selector'),
			: 	data : [{
			: 		'text' : 'word',
			: 		'size' : 127
			: 	}],
			: 	textName : 'text',
			: 	sizeName : 'size'
			: });

		Notes:
			- opacity 값은 미설정 시 .75로 설정된다.
			
		See Also:
			- <ANKUS_API.chartD3.pie>
			- <ANKUS_API.chartD3.bubble>
			- <ANKUS_API.chartD3.line>
		*/
		var _wordCloud = function(option){
			var $this = option.$this;
			var wordCloudDefault = chartDDefaultOption.wordCloud;
			var d3el = d3.select($this.get(0));
			var node = d3el.node();
			var width = node.clientWidth;
			var height = node.clientHeight;
			var linear = d3.scale.linear;
			var visual = option.visual || wordCloudDefault.visual;
			var sizeName = option.sizeName || wordCloudDefault.sizeName;
			var data;
			var scaleArr = [];
			var sizeArr = [];
			var colorArr = [];
			var tmpObj;
			for(var i=0; i<visual.length; i++){
				tmpObj = visual[i];
				scaleArr.push(tmpObj.scale);
				sizeArr.push(tmpObj.size);
				colorArr.push(tmpObj.color);
			}
			var wordScale = linear().domain(scaleArr).range(sizeArr).clamp(true);
			var wordColor = linear().domain(scaleArr).range(colorArr);
			var viz = d3el.append('svg')
				.attr('width', width)
				.attr('height', height)
			;
			var type = function(d){
				d[sizeName] = +d[sizeName];
				return d;
			};
			var drawG = function(words){
				viz.append('g')
					.attr('transform', 'translate(200,220)')
					.selectAll('text')
					.data(words)
					.enter().append('text')
					.style('font-size', function(d){return d[sizeName] + 'px';})
					.style('fill', function(d){return wordColor(d[sizeName]);})
					.style('opacity', option.opacity || wordCloudDefault.opacity)
					.attr('text-anchor', 'middle')
					.attr('transform', function(d){return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';})
					.text(function(d){return d[option.textName || wordCloudDefault.textName];})
				;			
			};
			var drawChart = function(chartData){
				d3.layout.cloud().size([width, height])
					.words(chartData)
					.rotate(function(){return ~~(Math.random() * 2) * 5;})
					.fontSize(function(d){return wordScale(d[sizeName]);})
					.on('end', drawG)
					.start()
				;
			};
			
			_drawChart(option.dataType || wordCloudDefault.dataType, type, drawChart, option.url, option.data || wordCloudDefault.data);
			
		    if('function' === typeof option.callback){
		    	callback();
		    }
		};
		
		/*
		Function: ANKUS_API.chartD3.getChartD3Option
			D3 chart 종류 및 각 차트의 파라미터를 보여준다.

		Parameter:
			- type [string] - 확인할 차트 타입

		Returns:
			- obj [object] - 차트 정보

		Examples:
			: ANKUS_API.chartD3.getChartD3Option();
			: ANKUS_API.chartD3.getChartD3Option('line');

		Notes:
			- 파라미터 생략 시 전체 차트의 정보를 보여준다.
			
		See Also:
			- <ANKUS_API.chartD3.line>
			- <ANKUS_API.chartD3.pie>
			- <ANKUS_API.chartD3.bubble>
			- <ANKUS_API.chartD3.wordCloud>
		*/
		var _getChartD3Option = function(type){
			var obj = {
				'line'			: {
					$this : 'object',
					url : 'string',
					dataType : 'string',
					data : 'array',
					margin : 'object',
					formatDate : 'object',
					xAxisName : 'string',
					yAxisName : 'string',
					yTitle : 'string',
					callback : 'function'
				},
				'pie'			: {
					$this : 'object',
					url : 'string',
					dataType : 'string',
					range : 'array',
					textName : 'string',
					sizeName : 'string',
					data : 'array',
					callback : 'function'
				},
				'bubble'		: {
					$this : 'object',
					url : 'string',
					dataType : 'string',
					nodeName : 'string',
					childName : 'string',
					sizeName : 'number',
					padding : 'number',
					data : 'object',
					callback : 'function'
				},
				'wordCloud'		: {
					$this : 'object',
					url : 'string',
					dataType : 'string',
					opacity : 'number',
					textName : 'string',
					sizeName : 'string',
					visual : 'array',
					data : 'array',
					callback : 'function'
				}
			};
			
			if(type in obj){return obj[type];}
			else{return obj;}
		};
		
		return {
			setChart			: _setChart,
			line				: _line,
			pie					: _pie,
			bubble				: _bubble,
			wordCloud			: _wordCloud,			
			getChartD3Option	: _getChartD3Option
		};
	}();
	
	/* NVD3 */
	var _chartNv = function(){
		/*
		Function: ANKUS_API.chartNv.setChart
			NVD3차트 설정하기

		Parameter:
			- el [object] - 차트로 만들 dom object
			- option [object] - 차트 설정 옵션

		Returns:
			- el [object] - 차트로 변환한 dom object

		Examples:
			: ANKUS_API.chartNv.setChart(document.getElementById('id'), {
			: 	type : 'pie',
			: 	data : [{
			: 		'label' : 'One', 'value' : 29.765957771107
			: 	},{
			: 		'label' : 'Two', 'value' : 0
			: 	},{
			: 		'label' : 'Three', 'value' : 32.807804682612
			: 	}]
			: });

		Notes: 
			- 각 차트의 상세 옵션값은 See Also를 참고한다.
			
		See Also:
			- <ANKUS_API.chartNv.line>
			- <ANKUS_API.chartNv.lineColumn>
			- <ANKUS_API.chartNv.pie>
		*/
		var _setChart = function(el, option){
			var $chart = $(el);
			var url;
			var param;
			var drawFn;
			var dataType;
			var defaultOptionObj;
			
			$chart.ankusRemoveChartD3();
			switch(option.type){
				case 'line' :
					defaultOptionObj = chartNvDefaultOption.line;
					url = option.url || defaultOptionObj.url;
					param = defaultOptionObj.param;
					drawFn = _line;
					dataType = option.dataType || defaultOptionObj.dataType;
					break;
				case 'lineColumn' :
					defaultOptionObj = chartNvDefaultOption.lineColumn;
					url = option.url || defaultOptionObj.url;
					param = defaultOptionObj.param;
					drawFn = _lineColumn;
					dataType = option.dataType || defaultOptionObj.dataType;
					break;
				case 'pie' :
					defaultOptionObj = chartNvDefaultOption.pie;
					url = option.url || defaultOptionObj.url;
					param = defaultOptionObj.param;
					drawFn = _pie;
					dataType = option.dataType || defaultOptionObj.dataType;
					break;
				case 'bar' :
					defaultOptionObj = chartNvDefaultOption.bar;
					url = option.url || defaultOptionObj.url;
					param = defaultOptionObj.param;
					drawFn = _bar;
					dataType = option.dataType || defaultOptionObj.dataType;
					break;	
				default :
					break;
			}
			
			option.$this = $chart;
			option.dataType = dataType;
			option.url = url;

			drawFn($.extend(defaultOptionObj, option));
			
			return el;
		};
		
		/*
		Function: ANKUS_API.chartNv.lineColumn
			NVD3 line plus bar 차트 그리기

		Parameter:
			- option [object] - 차트 설정 옵션

		Returns:
			- 없음.

		Examples:
			: ANKUS_API.chartNv.lineColumn({
			: 	$this : $('selector'),
			: 	data : [{
			:		bar : true,
			: 		color : '#ccf',
			: 		key : 'Quantity (left axis)',
			: 		originalKey : 'Quantity',
			: 		values : [[1136005200000, 1271000], [1138683600000, 1271000]]
			:	}, {
			: 		color : '#333',
			: 		key : 'Price (right axis)',
			: 		originalKey : 'Price',
			: 		values : [[1136005200000, 71.89], [1138683600000, 75.51]]
			:	}]
			: });
			
		Notes: 
			- 차트 생성 후 $('selector').data('chart')를 호출하면 chart 객체를 얻을 수 있다.
			
		See Also:
			- <ANKUS_API.chartNv.line>
			- <ANKUS_API.chartNv.pie>
		*/
		var _lineColumn = function(opt){
			var data = opt.data;
			var $this = opt.$this.get(0);
			opt.$this = null;
			var optStr = JSON.stringify(opt);

			nv.addGraph(function(){
				var option = JSON.parse(optStr); // 비동기 문제 해결
				var chart = nv.models.linePlusBarChart()
					.margin(option.margin)
					.x(function(d, i){return i;}) //We can set x data accessor to use index. Reason? So the bars all appear evenly spaced.
					.y(function(d, i){return d[1];})
				;

				option.$this = $this;
				
				chart.xAxis.tickFormat(function(d){
					var dx = data[0].values[d] && data[0].values[d][0] || 0;
					
					return d3.time.format('%x')(new Date(dx));
				});
				
				chart.y1Axis.tickFormat(d3.format(', f'));
				chart.y2Axis.tickFormat(function(d){return '$' + d3.format(', f')(d);});
				chart.bars.forceY([0]);
				d3.select($this).append('svg')
					.datum(data)
					.transition()
					.duration(0)
					.call(chart)
				;
				nv.utils.windowResize(chart.update);
				$($this).data('chart', chart);
				return chart;
			});
		};
		
		/*
		Function: ANKUS_API.chartNv.pie
			NVD3 pie 차트 그리기

		Parameter:
			- option [object] - 차트 설정 옵션

		Returns:
			- 없음.

		Examples:
			: ANKUS_API.chartNv.pie({
			: 	$this : $('selector'),
			: 	labelType : 'percent',				
			: 	data : [{
			:		label : 'one', value : 29.765957771107
			:	}, {
			: 		label : 'two', value : 0
			:	}, {
			: 		label : 'three', value : 32.807804682612
			:	}]
			: });
			
		Notes: 
			- 차트 생성 후 $('selector').data('chart')를 호출하면 chart 객체를 얻을 수 있다.
			
		See Also:
			- <ANKUS_API.chartNv.line>
			- <ANKUS_API.chartNv.lineColumn>
		*/
		var _pie = function(opt){
			var data = opt.data;
			var $this = opt.$this.get(0);
			opt.$this = null;
			var optStr = JSON.stringify(opt);
			
			nv.addGraph(function(){
				var option = JSON.parse(optStr); // 비동기 문제 해결
				var chart = nv.models.pieChart()
					.x(function(d){return d.label;})
					.y(function(d){return d.value;})
					.showLegend(option.showLegend)
					.showLabels(option.showLabel)     //Display pie labels
					.labelThreshold(.05)  //Configure the minimum slice size for labels to show up
					.labelType(option.labelType) //Configure what type of data to show in the label. Can be "key", "value" or "percent"
					.donut(option.isDonut)          //Turn on Donut mode. Makes pie chart look tasty!
					.donutRatio(0.35)     //Configure how big you want the donut hole size to be.
				;
				
				option.$this = $this;
				
				d3.select($this).append('svg')
					.datum(data)
					.transition()
					.duration(350)
					.call(chart)
				;
				$($this).data('chart', chart);
				return chart;
			});
		};
		
		/*
		Function: ANKUS_API.chartNv.line
			NVD3 line 차트 그리기

		Parameter:
			- option [object] - 차트 설정 옵션

		Returns:
			- 없음.

		Examples:
			: ANKUS_API.chartNv.line({
			: 	$this : $('selector'),
			: 	margin : {left:100},
			: 	xTitle : 'time (ms)',
			: 	yTitle : 'voltage (v)',				
			: 	data : [{
			:		color : '#ff7f0e', key : 'Sine Wave', values : [{series : 0, x : 0, y : 0}, {series : 0, x : 1, y : 0.099}, {series : 0, x : 2, y : 0.198}]
			:	}, {
			:		color : '#2ca02c', key : 'Cosine Wave', seriesIndex : 1, values : [{series : 1, x : 0, y : 0.5}, {series : 1, x : 1, y : 0.6}, {series : 1, x : 2, y : 0.4}]
			:	}, {
			:		color : '#7777ff', key : 'Another sine wave', seriesIndex : 2, values : [{series : 2, x : 0, y : 0.7}, {series : 2, x : 1, y : 0.6}, {series : 2, x : 2, y : 0.3}]
			:	}]
			: });
						
		Notes: 
			- 차트 생성 후 $('selector').data('chart')를 호출하면 chart 객체를 얻을 수 있다.
			
		See Also:
			- <ANKUS_API.chartNv.pie>
			- <ANKUS_API.chartNv.lineColumn>
		*/
		var _line = function(opt){
			var data = opt.data;
			var $this = opt.$this.get(0);
			opt.$this = null;
			var optStr = JSON.stringify(opt);
			
			nv.addGraph(function(){
				var option = JSON.parse(optStr); // 비동기 문제 해결
				var chart = nv.models.lineChart()
					.margin(option.margin)  //Adjust chart margins to give the x-axis some breathing room.
					.useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
					//.transitionDuration(350)  //how fast do you want the lines to transition?
					.showLegend(true)       //Show the legend, allowing users to turn on/off line series.
					.showYAxis(true)        //Show the y-axis
					.showXAxis(true)        //Show the x-axis
				;
				
				option.$this = $this;
				
				chart.xAxis     //Chart x-axis settings
					.axisLabel(option.xTitle || '')
					.tickFormat(d3.format(', r'))
				;
				chart.yAxis     //Chart y-axis settings
					.axisLabel(option.yTitle || '')
					.tickFormat(d3.format('.02f'))
				;
				
				if(undefined !== option.yMax || undefined !== option.yMin){
					chart.forceY([option.yMin || 0, option.yMax || 100]);
				}
				
				d3.select($this).append('svg')
					.datum(data)         //Populate the <svg> element with chart data...
					.call(chart)         //Finally, render the chart!
				;
				nv.utils.windowResize(function(){chart.update();});
				$($this).data('chart', chart);
				return chart;
			});
		};
		
		/*
		Function: ANKUS_API.chartNv.getChartNVOption
			NV chart 종류 및 각 차트의 파라미터를 보여준다.

		Parameter:
			- type [string] - 확인할 차트 타입

		Returns:
			- obj [object] - 차트 정보

		Examples:
			: ANKUS_API.chartNv.getChartNVOption();
			: ANKUS_API.chartNv.getChartNVOption('line');

		Notes:
			- 파라미터 생략 시 전체 차트의 정보를 보여준다.
			
		See Also:
			- <ANKUS_API.chartNv.line>
			- <ANKUS_API.chartNv.pie>
			- <ANKUS_API.chartNv.lineColumn>
		*/
		var _getChartNVOption = function(type){
			var obj = {
				'line'			: {
					$this : 'object',
					url : 'string',
					dataType : 'string',
					data : 'array',
					margin : 'object',
					xTitle : 'string',
					yTitle : 'string',
					yMax : 'number',
					yMin : 'number',
					callback : 'function'
				},
				'pie'			: {
					$this : 'object',
					url : 'string',
					dataType : 'string',
					showLegend : 'boolean',
					showLabel : 'boolean',
					labelType : 'string',
					isDonut : 'boolean',
					data : 'array',
					callback : 'function'
				},
				'lineColumn'		: {
					$this : 'object',
					url : 'string',
					dataType : 'string',
					margin : 'object',
					data : 'object',
					callback : 'function'
				}
			};
			
			if(type in obj){return obj[type];}
			else{return obj;}
		};
		
		return {
			setChart			: _setChart,
			lineColumn			: _lineColumn,
			pie					: _pie,
			line				: _line,
			getChartNVOption	: _getChartNVOption
		};
	}();
	
	/* map */
	var _map = function(){
		if(!('daum' in w)){
			return;
		}
		/*
		Function: ANKUS_API.map.getLatLngObj
			좌표 object를 가져온다.

		Parameter:
			- lat [number] - latitude(위도) 값
			- lng [number] - longitude(경도) 값

		Returns:
			- obj [object] - 좌표 object

		Examples:
			: ANKUS_API.map.getLatLngObj(37.3595953, 127.1053971);

		Notes:
			- 파라미터 생략 시 전체 차트의 정보를 보여준다.
			
		See Also:
			- <ANKUS_API.map.getBounds>
		*/
		var _getLatLngObj = function(lat, lng){
			return new maps.LatLng(lat, lng);
		};
		
		/*
		Function: ANKUS_API.map.getBounds
			좌표 object를 가져온다.

		Parameter:
			- arr [array] - 좌표값을 요소로 갖는 배열

		Returns:
			- maps.LatLngBounds [object] - LatLngBounds object

		Examples:
			: ANKUS_API.map.getBounds([{lat : 37.1793196, lng : 125.8795594},{lat : 37.5398662, lng : 126.3312422}]);

		Notes:
			- 파라미터는 lat와 lng를 요소로 갖는 json object가 2개 존재하는 배열로 설정한다.
			
		See Also:
			- <ANKUS_API.map.getLatLngObj>
		*/
		var _getBounds = function(arr){
			return new maps.LatLngBounds(new maps.LatLng(arr[0].lat, arr[0].lng), new maps.LatLng(arr[1].lat, arr[1].lng));
		};
		
		/*
		Function: ANKUS_API.map.getMap
			지도 object를 가져온다.

		Parameter:
			- option [object] - 지도 옵션 값

		Returns:
			- maps.Map [object] - map object

		Examples:
			: ANKUS_API.map.getMap({
			:	id		: '_map',
			:	center	: ANKUS_API.map.getLatLngObj(37.3595953, 127.1053971)
			: });
		*/
		var _getMap = function(option){
			var defaultOption = {
				id			: '',
				center		: {},
				level		: 14
			};
			
			defaultOption = $.extend(defaultOption, option);
			
			return new maps.Map(document.getElementById(defaultOption.id), defaultOption);
		};
		
		/*
		Function: ANKUS_API.map.getInfoWindow
			지도의 정보창 객체를 가져온다.

		Parameter:
			- str [string] - 정보창의 형태

		Returns:
			- maps.InfoWindow [object] - 정보창 object

		Examples:
			: ANKUS_API.map.getInfoWindow($('#_template > ._infoWindow')[0].outerHTML);

		Notes:
			- 파라미터는 html 형식의 string으로 전달한다.
		*/
		var _getInfoWindow = function(option){
			var defaultOption = {
				map			: {},
				position	: {},
				content		: '',
				removable	: false
			};
			
			return new maps.InfoWindow($.extend(defaultOption, option));
		};
		
		/*
		Function: ANKUS_API.map.drawSpotInMap
			지도에 도형을 그린다.

		Parameter:
			- option [object] - 도형의 옵션

		Returns:
			- mapObj [object] - 도형 object

		Examples:
			: ANKUS_API.map.drawSpotInMap({
			: type		: 'rectangle',
			: map		: map,
			: latLng	: [{lat : 37.1793196, lng : 125.8795594},{
			: 			lat : 37.5398662, lng : 126.3312422}],
			: click		: function(e){
			: 	if (infowindow.getMap()) {
			:         infowindow.close();
			:     } else {
			:         infowindow.open(map, ANKUS_API.map.getLatLngObj(37.1793196, 125.8795594));
			:         $('._infoClose:visible').on('click', function(){
			:     		infowindow.close();
			:     	});
			:    }
			: }
			:});

		Notes:
			- 좌표값은 latLng 요소에 배열로 설정한다.
			- 각 도형에 따른 옵션값은 See Also의 메소드를 참고한다. 
			
		See Also:
			- <ANKUS_API.map.getSpotOption>
		*/
		var _drawSpotInMap = function(option){
			var defaultOption = {
				map : {},
			    clickable : true,
			    latLng : {},
			    strokeColor : '#FF3DE5',
			    strokeOpacity : 1,
			    strokeWeight : 3,
			    strokeStyle: 'solid',
			    fillColor : '#FF8AEF',
			    fillOpacity : 0.8
			};
			var createSpotFn;
			var mapObj;
			
			if(!option.map){
				_devInfo(i18nP('JS_ANKUS_API_MAP_CHECK'));
				return;
			}
			defaultOption = $.extend(defaultOption, option);
			switch(option.type){
				case 'rectangle' :
					defaultOption.bounds = _getBounds(defaultOption.latLng);
					createSpotFn = maps.Rectangle;
					break;
				case 'circle' :
					defaultOption.center = _getLatLngObj(defaultOption.latLng[0].lat, defaultOption.latLng[0].lng);
					defaultOption.radius = 10000;
					createSpotFn = maps.Circle;
					break;
				case 'polygon' :
					defaultOption.path = defaultOption.latLng;
					createSpotFn = maps.Polygon;
					break;
				default :
					break;
			}
			
			mapObj = new createSpotFn(defaultOption);
			mapObj.setMap(defaultOption.map);
			
			if('function' === typeof defaultOption.click){
				maps.event.addListener(mapObj, 'click', function(){
					defaultOption.click();
				});
			}
			
			return mapObj; 
		};
		
		/*
		Function: ANKUS_API.map.getSpotOption
			지도에 도형을 그리는 메소드의 파라미터를 확인한다.

		Parameter:
			- type [string] - 도형의 종류

		Returns:
			- returnObj [object] - 도형 옵션

		Examples:
			: ANKUS_API.map.getSpotOption();

		Notes:
			- 파라미터 중 map과 latLng를 제외한 나머지 항목은 생략 가능하다.
			
		See Also:
			- <ANKUS_API.map.drawSpotInMap>
		*/
		var _getSpotOption = function(type){
			var defaultOption = JSON.stringify({
				map : 'object',
			    clickable : 'boolean',
			    latLng : 'array',
			    strokeColor : 'string',
			    strokeOpacity : 'number',
			    strokeWeight : 'number',
			    fillColor : 'string',
			    fillOpacity : 'number',
			    click : 'function'
			});
			var returnObj = {
				rectangle	: JSON.parse(defaultOption),
				ellipse		: JSON.parse(defaultOption),
				circle		: $.extend(JSON.parse(defaultOption), {
					radius : 'number'
				})				
			};
			
			if(type){return returnObj[type];}
			else{return returnObj;}
		};
		
		/*
		Function: ANKUS_API.map.getMarkerImage
			지도에 마커 이미지를 그린다.

		Parameter:
			- src [string] - 이미지 src attribute
			- size [object] - ANKUS_API.map.getSize object
			- option [object] - 마커 옵션

		Returns:
			- maps.MarkerImage [object] - 마커 이미지 object

		Examples:
			: ANKUS_API.map.getMarkerImage('/images/img.png', ANKUS_API.map.getSize(30, 30), {offset : ANKUS_API.map.getPoint(20, 20)});
		*/
		var _getMarkerImage = function(src, size, option){
			return new maps.MarkerImage(src, size, option);
		};
		
		/*
		Function: ANKUS_API.map.getSize
			지도에 그릴 object의 size 값을 가져온다.

		Parameter:
			- w [number] - size의 너비
			- h [number] - size의 높이

		Returns:
			- maps.Size [object] - size object

		Examples:
			: ANKUS_API.map.getSize(30, 30);
		*/
		var _getSize = function(w, h){
			return new maps.Size(w, h);
		};
		
		/*
		Function: ANKUS_API.map.getPoint
			지도에 그릴 object의 위치 값을 가져온다.

		Parameter:
			- l [number] - left 값
			- t [number] - top 값

		Returns:
			- maps.Point [object] - point object

		Examples:
			: ANKUS_API.map.getPoint(30, 30);
		*/
		var _getPoint = function(l, t){
			return new maps.Point(t, l);
		};
		
		/*
		Function: ANKUS_API.map.getMarker
			지도에 그릴 marker object를 가져온다.

		Parameter:
			- position [object] - ANKUS_API.map.getLatLngObj object
			- image [object] - ANKUS_API.map.getMarkerImage object

		Returns:
			- maps.Marker [object] - marker object

		Examples:
			: ANKUS_API.map.getMarker(ANKUS_API.map.getLatLngObj(37.5, 127.1), ANKUS_API.map.getMarkerImage('/images/img.png', ANKUS_API.map.getSize(30, 30), {
			: 	offset : ANKUS_API.map.getPoint(30, 30)
			: }));
		*/
		var _getMarker = function(position, image){
			return new maps.Marker({
				position	: position,
				image		: image
			});
		};
		
		/*
		Function: ANKUS_API.map.getCustomOverlay
			지도에 그릴 custom overlay object를 가져온다.

		Parameter:
			- option [object] - custom overlay option

		Returns:
			- maps.CustomOverlay [object] - custom overlay object

		Examples:
			: ANKUS_API.map.getCustomOverlay({
			: 	map			: ANKUS_API.map.getMap({id : '_map'}),
			: 	position	: ANKUS_API.map.getLatLngObj(37.5, 127.1),
			: 	content		: '<h3>marker</h3>'
			: });
		*/
		var _getCustomOverlay = function(option){
			return new maps.CustomOverlay({
				map			: option.map,
				position	: option.position,
				content		: option.content,
				yAnchor		: 1
			});
		};
		
		/*
		Function: ANKUS_API.map.setMarkerOnMap
			지도에 이미지 마커를 그린다.

		Parameter:
			- option [object] - image marker option

		Returns:
			- 없음.

		Examples:
			: ANKUS_API.map.setMarkerOnMap({
			: 	map		: ANKUS_API.map.getMap({id : '_map'}),
			: 	lat		: 37.54699,
			: 	lng		: 127.09598
			: });
		*/
		var _setMarkerOnMap = function(option){
			var map = option.map;
			var size = _getSize(30, 30);
			var markerImgOption = {
				offset : _getPoint(20, 20)
			};
			var markerImage = _getMarkerImage(markerImgSrc, size, markerImgOption);
			var position = _getLatLngObj(option.lat, option.lng);
			var marker = _getMarker(position, markerImage);
			
			marker.setMap(map);
			_getCustomOverlay({
				map			: map,
				position	: position,
				content		: markerContent
			});
		};
		
		return {
			getLatLngObj		: _getLatLngObj,
			getBounds			: _getBounds,
			getMap				: _getMap,
			getInfoWindow		: _getInfoWindow,
			drawSpotInMap		: _drawSpotInMap,
			getSpotOption		: _getSpotOption,
			getMarkerImage		: _getMarkerImage,
			getSize				: _getSize,
			getPoint			: _getPoint,
			getMarker			: _getMarker,
			getCustomOverlay	: _getCustomOverlay,
			setMarkerOnMap		: _setMarkerOnMap
		};
	}();
	
	/*util */
	var _util = function(){
		/*
		Function: ANKUS_API.util.addZero
			10 이하의 숫자 앞에 0을 붙여준다.

		Parameter:
			- v [string, number] - 가공할 값

		Returns:
			- returnVal [string] - 가공된 값

		Examples:
			: ANKUS_API.util.addZero(5);
			: ANKUS_API.util.addZero('12');

		Notes:
			- 파라미터 변수 타입은 숫자와 문자 모두 가능하다.
			- 결과값은 문자열 타입으로 리턴된다.
		*/
		var _addZero = function(v){
			var val = Number(v);
			var returnVal;
			
			if(isNaN(val)){
				returnVal = v;
			}
			else{
				if(10 > val){
					returnVal = '0' + val;
				}
				else{
					returnVal = '' + val;
				}
			}
			
			return returnVal;
		};
		
		/*
		Function: ANKUS_API.util.getDiffDate
			00일 전후의 날짜값을 원하는 형식으로 가져온다.

		Parameter:
			- option [object] - 날짜 설정 옵션

		Returns:
			- dateArr.join [string] - 가공된 날짜 값

		Examples:
			: ANKUS_API.util.getDiffDate({
			: 	diffDate : -5,
			: 	form : 'yyyymmdd',
			: 	deli : '-'
			: });
			: ANKUS_API.util.getDiffDate({
			: 	diffDate : 1462938526112,
			: 	form : 'yymmdd',
			: 	deli : ',',
			: 	isMili : true
			: });

		Notes:
			- diffDate는 금일 기준으로 전날일 경우 음수로 설정한다.
			- form, deli, isMili는 생략 가능하다.
		*/
		var _getDiffDate = function(option){
			var diffDate = option.diffDate;
			var form = option.form;
			var deli = option.deli;
			var isMili = option.isMili || false;
			var now = new Date();
			var nowMill = now.getTime();
			var diffMillVal = isMili ? diffDate : nowMill + 1000*60*60*24*(diffDate || 0);
			var dateObj = new Date(diffMillVal);
			var format = form || dateFormat;
			var delimiter = deli || dateDelimiter;
			var yyyy = dateObj.getFullYear() + '';
			var MM = _addZero(dateObj.getMonth() + 1);
			var dd = _addZero(dateObj.getDate());
			var hh = _addZero(dateObj.getHours());
			var mm = _addZero(dateObj.getMinutes());
			var ss = _addZero(dateObj.getSeconds());
			var dateArr = [];
			var dateArr2 = [];
			var dateString = '';
			
			switch(format){
				case 'yymmdd' :
					dateArr.push(yyyy.substring(2));
					dateArr.push(MM);
					dateArr.push(dd);
					break;
				case 'mmdd' :
					dateArr.push(MM);
					dateArr.push(dd);
					break;
				case 'yyyymm' :
					dateArr.push(yyyy);
					dateArr.push(MM);
					break;
				case 'yymm' :
					dateArr.push(yyyy.substring(2));
					dateArr.push(MM);
					break;
				case 'yyyymmddhhMMss' : 
					dateArr.push(yyyy);
					dateArr.push(MM);
					dateArr.push(dd);
					dateArr2.push(hh);
					dateArr2.push(mm);
					dateArr2.push(ss);
					
					dateString = dateArr.join(delimiter) + " " + dateArr2.join(':');
				
					break;
				case 'yyyymmdd' :
				default :
					dateArr.push(yyyy);
					dateArr.push(MM);
					dateArr.push(dd);
					break;
			}
			
			if(dateString){				
				return dateString;				
			}else{				
				return dateArr.join(delimiter);
			}			
		};
		
		/*
		Function: ANKUS_API.util.roundAndtoFixed
			원하는 소숫점 아래 값을 반올림한다.

		Parameter:
			- v [string, number] - 대상 값
			- n [number] - 반올림할 자릿수

		Returns:
			- returnVal [string] - 가공된 값

		Examples:
			: ANKUS_API.util.roundAndtoFixed(12.34567, 2);
		*/
		var _roundAndtoFixed = function(v, n){
			var val = Number(v);
			var returnVal;
			
			if(isNaN(val)){
				returnVal = v;
			}
			else{
				returnVal = val.toFixed(n);
			}
			
			return returnVal;
		};
		
		/*
		Function: ANKUS_API.util.fileSystemBrowser
			파일 브라우저를 modal popup으로 띄운다.

		Parameter:
			- option [object] - 브라우저 설정 옵션

		Returns:
			- 없음.

		Examples:
			: ANKUS_API.util.fileSystemBrowser({engineId:1, onClick:function(v){console.log(v);}});

		Notes:
			- 옵션에 engineId와 onClick을 설정한다.
			- 선택된 디렉토리 혹은 파일은 onClick에 정의한 함수에 파라미터로 전달된다.
		*/
		var _fileSystemBrowser = function(obj){
			var engineId = obj.engineId || '';
			var selectedNode;
			var folderHtml = '<img src="/resources/images/common-folder.png" alt="folder" height="16px" class="_fs_folderImage" />';
			var fileHtml = '<img src="/resources/images/common-file.png" alt="folder" height="16px" class="_fs_fileImage" />';
			var modalHtml = '';
			var _setTree = function(){
				$('#_main_tree').jstree('destroy').off('changed.jstree').on('changed.jstree', function(e, data){
					selectedNode = data.node.id;
					_getGrid(selectedNode);
					$('#_main_ok').data('id', selectedNode);
				}).jstree({
		            core : {
		            	data : {
		            		url			: function(node){return '/fs/hdfs/directory';},
		            		type		: 'GET',
		            		dataType	: 'json',
		            		contentType	: 'application/json',
		            		data		: function(node){
		            			selectedNode = (node.parent) ? node.id : '/';
		            			return {
		            				_dc			: new Date().getTime(),
		            				engineId	: engineId,
		            				node		: selectedNode,
		            				sort		:[{property : 'text', direction : 'ASC'}]
			                    };
		                    },
		                    dataFilter	: function(r){
		                    	var res = JSON.parse(r);
		                    	var list = res.list;
		                    	var len = list.length;
		                    	var dir = [];
		                    	var i = 0;

		                    	if('/' === selectedNode){
		                    		dir.push({
		                    			id		: '/',
		                    			text	: '/',
		                    			parent	: '#'
		                    		});
		                    	}
		                    	if(0 < len){ 
		                    		for(; i<len; i++){
		                    			dir.push({
		                    				parent : selectedNode,
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
				setTimeout(function(){
					$('#_main_tree').jstree('open_node', $('[id="/"]'));
				}, 300);
			};
			var _setGrid = function(){
				var folderImg = $('#_fs_template ._fs_folderImage')[0].outerHTML;
				var fileImg = $('#_fs_template ._fs_fileImage')[0].outerHTML;
				
				$('#_main_grid').ankusGrid({
					url				: '',
					pager			: null,
					datatype		: '',
					rowNum			: null,
					onSelectRow		: function(id){
			        	selectedNode = id;
			        	$('#_main_ok').data('id', selectedNode);
			        },
			        ondblClickRow	: function(id){
			        	if('true' === $('#_main_grid').getRowData(id).directory){
			        		_getGrid(id);
			        		if('/' !== id){
			        			var arrForParent = id.split('/');
				        		arrForParent.pop();
				        		if (arrForParent.length == 1) { arrForParent.push(''); }
				        		$('#_main_tree').jstree('open_node', $('#_main_tree [id="' + arrForParent.join('/') + '"]'), function() {
				        			$('#_main_tree').jstree('deselect_all', true);
				        			var $target = $('#_main_tree [id="' + id + '"]');
				        			$('#_main_tree').jstree('select_node', $target);
				        			$('#_main_tree').parent().scrollTop($('#_main_tree').parent().scrollTop() + $target.position().top - 20);
				        		});
			        		}		        
			        	}
			        	else{
			        		obj.onClick(id);
							$('#_main_fileSystemBrowser').modal('hide');
			        	}
			        },
			        colModel		: [{
			        	name : 'directory',
			        	label : 'directory',
			        	hidden : true
			        },{
			        	name : 'cls',
			        	label : i18nP('JS_ANKUS_API_TYPE'),
			        	width : 40,
			        	align : 'center',
			        	formatter : function(v){
			        		return ('folder' === v) ? folderImg : fileImg;
			        	}
			        },{
			        	name : 'filename',
			        	label : i18nP('JS_ANKUS_API_FILE_NAME'),
			        	width : 135,
			        	align : 'center',
			        },{
			        	name : 'length',
			        	label : i18nP('JS_ANKUS_API_FILE_SIZE'),
			        	width : 70,
			        	align : 'center',
			        	formatter : function(v){
			        		return ANKUS_API.util.roundAndtoFixed(v/1024, 2) + 'kb';
			        	}
			        },{
			        	name : 'modificationTime',
			        	label : i18nP('JS_ANKUS_API_LAST_EDIT'),
			        	width : 80,
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
			        	label : i18nP('JS_ANKUS_API_FILE_ACCESS_AUTH'),
			        	width : 75,
			        	align : 'center',
			        },{
			        	name : 'replication',
			        	label : i18nP('JS_ANKUS_API_COPY_COUNT'),
			        	width : 75,
			        	align : 'center',
			        }]
			    });
			};			
			var _getGrid = function(path){
				ANKUS_API.ajax({
					url			: '/fs/hdfs/file',
					data		: {
						_dc : new Date().getTime(),
						engineId : engineId,
						path : path,
						page : 1,
						start : 0,
						limit : 25,
					},
					success		: function(res){
						$('#_main_grid').ankusSetGridData(res.list);
					}
				});
			};
			$('#_main_fileSystemBrowser').remove();
			$('#_main_previewModal').remove();
//			if(0 === $('#_main_fileSystemBrowser').length){
				modalHtml += '<div id="_main_fileSystemBrowser" class="modal fade" role="dialog" style="z-index:9999;">';
				modalHtml += 	'<div class="modal-dialog" style="width:800px;">';
				modalHtml +=		'<div class="modal-content">'; 
				modalHtml +=			'<div class="modal-header">'; 
				modalHtml +=				'<button type="button" class="close" data-dismiss="modal">&times;</button>'; 
				modalHtml +=				'<h4 class="modal-title">'+ i18nP('JS_ANKUS_API_HTML_FILE_SYS_BROWSER') +'</h4>'; 
				modalHtml +=			'</div>'; 
				modalHtml +=			'<div class="modal-body" style="height:500px;">'; 
				modalHtml +=				'<div style="float:left; height:500px; width:260px; overflow:scroll;">'; 
				modalHtml += 					'<h4>'+ i18nP('JS_ANKUS_API_HTML_DIRECTORY') +'</h4>';
				modalHtml += 					'<div id="_main_tree"></div>';
				modalHtml +=				'</div>'; 
				modalHtml +=				'<div style="float:right; height:500px; width:500px; overflow:scroll;">'; 
				modalHtml += 					'<h4>'+ i18nP('JS_ANKUS_API_HTML_FILE') +'</h4>';
				modalHtml += 					'<div>';
				modalHtml += 					'<button id="_main_btnPreview" class="btn btn-info btn-xs browser_button">Preview</button>';
				modalHtml += 					'</div>';
				modalHtml += 					'<table id="_main_grid"></table>';
				modalHtml +=				'</div>';
				modalHtml += 			'</div>';
				modalHtml += 			'<div class="modal-footer">';
				modalHtml += 				'<button class="btn btn-default" id="_main_ok">'+ i18nP('COMMON_CONFIRM') +'</button>';
				modalHtml += 				'<button class="btn btn-default" data-dismiss="modal">'+ i18nP('COMMON_CANCEL') +'</button>';
				modalHtml += 			'</div>';
				modalHtml += 		'</div>';
				modalHtml += 	'</div>';
				modalHtml += '</div>';
				
				modalHtml += '<div id="_main_previewModal" class="modal fade" role="dialog" style="width:1000px; z-index:999999">'
				modalHtml += 	'<div class="modal-dialog">'
				modalHtml += 		'<div class="modal-content">'
				modalHtml += 			'<div class="modal-header">'
				modalHtml += 				'<button type="button" class="close" data-dismiss="modal">&times;</button>'
				modalHtml += 				'<h4 class="modal-title">'+ i18nP('JS_ANKUS_API_HTML_FILE_PREVIEW') +'</h4>'
				modalHtml += 			'</div>'
				modalHtml += 			'<div class="modal-body" style="height:450px; overflow-y:auto;">'
				modalHtml += 				'<textarea id="_main_previewArea" rows="" cols="" wrap="off" style="width:100%; height:410px">'
				modalHtml += 				'</textarea>'
				modalHtml += 			'</div>'
				modalHtml += 			'<div class="modal-footer">'
				modalHtml += 				'<button class="btn btn-default" id="_main_previewClose">'+ i18nP('JS_ANKUS_API_HTML_CLOSE') +'</button>'
				modalHtml += 			'</div>'
				modalHtml += 		'</div>'
				modalHtml += 	'</div>'
				modalHtml += '</div>'
				$(modalHtml).appendTo('body');
				$('#_main_fileSystemBrowser').modal();				
				_setGrid();		
//			}
			$('#_main_ok').off('click').on('click', function(){
				obj.onClick($(this).data('id'));
				$('#_main_fileSystemBrowser').modal('hide');
			});
			$('#_main_btnPreview').on('click', function() {
				var selrow = $('#_main_grid').getGridParam('selrow');
				
				if(!selrow){
					ANKUS_API.util.alert(i18nP('JS_ANKUS_API_SELECT_PREVIEW_FILE'));
					return;
				}
				var row = $('#_main_grid').getRowData(selrow);
				if ("true" === row.directory) {
					ANKUS_API.util.alert(i18nP('JS_ANKUS_API_SELECT_FILE'));
					return;
				}
				
				ANKUS_API.ajax({
					url			: '/designer/previewHDFSFile_tab',
					data		: {
						_dc : new Date().getTime(),
						inputPath: selrow,
						delimiter:'',
						engineId: engineId,
						page:1,
						start:0,
						limit:25
					},
					type		: 'GET',
					success		: function(res){
						console.log(res)
						if (!res.list || res.list.length < 1) { return; }
						$('#_main_previewArea').text('')
						$.each(res.list[0].rowData, function(idx, val) {
							$('#_main_previewArea').append(val);
							$('#_main_previewArea').append('\n');
						});
						$('#_main_previewModal').ankusModal('show');
					},
					error : function(xhr, status, error) {

					}
				});
			});
			$('#_main_previewClose').off('click').on('click', function(){
				$('#_main_previewModal').ankusModal('hide');
			});
			
			_setTree();
			$('#_main_grid').ankusSetGridData([]);
			$('#_main_fileSystemBrowser').modal('show');
		};
		
		/*
		Function: ANKUS_API.util.toBase64
			String을 base64로 인코딩한다.

		Parameter:
			- str [string] - 인코딩 대상 문자열

		Returns:
			- return [string] - 인코딩 된 문자열

		Examples:
			: ANKUS_API.util.toBase64('test');
		*/
		var _toBase64 = function(str){
			var key = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
			var i = 0;
			var len = str.length;
			var c1;
			var c2;
			var c3;
			var e1;
			var e2;
			var e3;
			var e4;
			var result = [];
			
			while(i < len){
				c1 = str.charCodeAt(i++);
				c2 = str.charCodeAt(i++);
				c3 = str.charCodeAt(i++);
				e1 = c1 >> 2;
				e2 = ((c1 & 3) << 4) | (c2 >> 4);
				e3 = ((c2 & 15) << 2) | (c3 >> 6);
				e4 = c3 & 63;
				
				if(isNaN(c2)){
					e3 = e4 = 64;
				}
				else if(isNaN(c3)){
					e4 = 64;
				}
				result.push(e1, e2, e3, e4);
			}
			return result.map(function(e){
				return key.charAt(e);
			}).join('');
		};
		
		/*
		Function: ANKUS_API.util.toast
			토스트 메시지를 띄운다.

		Parameter:
			- opt [object] - 토스트 메시지 옵션

		Returns:
			- 없음.

		Examples:
			: ANKUS_API.util.toast({
			: 	description	: '토스트 메시지 입니다.',
			:	timeout : 3000
			: });

		Notes:
			- timeout을 설정하지 않으면 2.5초 후 메시지가 사라진다.
			
		See Also:
			- <ANKUS_API.util.alert>
			- <ANKUS_API.util.confirm>
		*/
		var _toast = function(opt){
			var desc = ('string' === typeof opt) ? opt : (opt.description || '');
			var time = ('string' === typeof opt) ? 2000 : (opt.timeout || 2000);
			var modal = '<div id="_main_toast" class="modal fade display_none" role="dialog">';
			modal +=		'<div class="modal-dialog" style="width:1000px;">';
			modal +=			'<div class="modal-content">';
			modal +=				'<div class="modal-body" id="_main_toastDescription"></div>';
			modal +=			'</div>';
			modal +=		'</div>';
			modal +=	'</div>';			
			
			if(0 === $('#_main_toast').length){
				$(modal).appendTo('body');
			}
			$('#_main_toast').find('#_main_toastDescription').text(desc).end().modal('show');
			setTimeout(function(){
				$('#_main_toast').modal('hide');
			}, time);
		};
		
		/*
		Function: ANKUS_API.util.alert
			알림 메시지를 띄운다.

		Parameter:
			- opt [object, string] - 알림 메시지 옵션 or 알림 메시지 문자열

		Returns:
			- 없음.

		Examples:
			: ANKUS_API.util.alert('알림 메시지만 설정합니다.');
			: ANKUS_API.util.alert({
			: 	description	: '알림 메시지 입니다.',
			:	okText : 'OK',
			:	callback : function(){console.log('after OK');},
			: });

		Notes:
			- okText를 설정하지 않으면 [확인]으로 설정된다.
			
		See Also:
			- <ANKUS_API.util.toast>
			- <ANKUS_API.util.confirm>
		*/
		var _alert = function(opt){
			var isString = 'string' === typeof opt;
			var desc = isString ? opt : (opt.description || '');
			var okStr = isString ? i18nP('COMMON_CONFIRM') : (opt.okText || i18nP('COMMON_CONFIRM'));
			var callFn = isString ? function(){} : (opt.callback || function(){});
			var modal = '<div id="_main_alert" class="modal fade display_none" role="dialog">';
			modal +=		'<div class="modal-dialog" style="width:1000px;">';
			modal +=			'<div class="modal-content">';
			modal +=				'<div class="modal-body" id="_main_alertDescription"></div>';
			modal +=			'</div>';
			modal +=			'<div class="modal-footer">';
			modal +=				'<button class="btn btn-default" id="_main_alertOk"></button>';
			modal +=			'</div>';
			modal +=		'</div>';
			modal +=	'</div>';			
			
			if(0 === $('#_main_alert').length){
				$(modal).appendTo('body');
			}
			$('#_main_alert')
				.find('#_main_alertDescription').html(desc.replace(/\n/g, '<br>')).end()
				.find('#_main_alertOk').text(okStr).off('click').on('click', function(){
					$('#_main_alert').modal('hide');
					callFn();			
				}).end()
				.modal('show')
			;
		};
		
		/*
		Function: ANKUS_API.util.confirm
			확인 메시지를 띄운다.

		Parameter:
			- opt [object] - 확인 메시지 옵션

		Returns:
			- 없음.

		Examples:
			: ANKUS_API.util.confirm({
			: 	description	: '확인 메시지 입니다.',
			:	okText : 'OK',
			:	cancelText : 'Cancel',
			:	callback : function(sel){console.log(sel);}
			: });

		Notes:
			- okText를 설정하지 않으면 [확인]으로 설정된다.
			- cancelText를 설정하지 않으면 [취소]로 설정된다.
			- callback에는 선택 결과가 boolean 형식으로 전달된다.
			
		See Also:
			- <ANKUS_API.util.toast>
			- <ANKUS_API.util.alert>
		*/
		var _confirm = function(opt){
			var modal = '<div id="_main_confirm" class="modal fade display_none" role="dialog">';
			modal +=		'<div class="modal-dialog" style="width:1000px;">';
			modal +=			'<div class="modal-content">';
			modal +=				'<div class="modal-body" id="_main_confirmDescription"></div>';
			modal +=			'</div>';
			modal +=			'<div class="modal-footer">';
			modal +=				'<button class="btn btn-default" id="_main_confirmOk"></button>';
			modal +=				'<button class="btn btn-default" id="_main_confirmCancel"></button>';
			modal +=			'</div>';
			modal +=		'</div>';
			modal +=	'</div>';			
			
			if(0 === $('#_main_confirm').length){
				$(modal).appendTo('body');
			}
			$('#_main_confirm')
				.find('#_main_confirmDescription').text(opt.description || '').end()
				.find('#_main_confirmOk').text(opt.okText || i18nP('COMMON_CONFIRM')).off('click').on('click', function(){
					$('#_main_confirm').modal('hide');
					if('function' === typeof opt.callback){
						opt.callback(true);
					}					
				}).end()
				.find('#_main_confirmCancel').text(opt.cancelText || i18nP('COMMON_CANCEL')).off('click').on('click', function(){
					$('#_main_confirm').modal('hide');
					if('function' === typeof opt.callback){
						opt.callback(false);
					}					
				}).end()
				.modal('show')
			;
		};
		
		return {
			addZero				: _addZero,
			getDiffDate			: _getDiffDate,
			roundAndtoFixed		: _roundAndtoFixed,
			fileSystemBrowser	: _fileSystemBrowser,
			toBase64			: _toBase64,
			toast				: _toast,
			alert				: _alert,
			confirm				: _confirm
		};
	}();
	
	/* ajax */
	/*
	Function: ANKUS_API.ajax
		Ajax request를 보낸다.

	Parameter:
		- urlVal [string] - ajax url 값
		- data [object] - ajax의 data 값
		- successCallback [function] - ajax의 success callback 함수
		- errorCallback [function] - ajax의 errorCallback callback 함수
		- completeCallback [function] - ajax의 completeCallback callback 함수
		- timeout [number] - ajax의 timeout 시간(millisecond)
		- type [string] - ajax 요청 방식(GET, POST)

	Returns:
		- response[All] - callback 함수에 파라미터로 전달

	Examples:
		: ANKUS_API.ajax('url', {data1 : 'data1'}, function(){}, function(){}, function(){}, 10000, true);

	Notes:
		- parameter의 timeout은 생략 가능하며 생략할 경우 10초가 설정된다.
		- 모든 callback 함수 및 파라미터는 생략 가능하다.
	*/
	var _ajax = function(option){
		var urlVal = option.url;
		var dataVal = option.data || {};
		var successCallback = option.success || function(res){console.log(res);};
		var errorCallback = option.error || function(jqXHR, textStatus, errorThrown){ANKUS_API.util.alert(i18nP('JS_ANKUS_API_AJAX_ERROR'));};
		var completeCallback = option.complete || function(){};
		var timeout = option.timeout || 10 * 1000;
		var type = option.type || 'GET';
		var ajaxOption = {
			url				: urlVal
			,data			: dataVal
			,type			: type
			,dataType		: 'json'
			,beforeSend : function(xhr){
				if(true !== option.hiddenLoading){
					$('#_ajaxLoading').show();
				}
				xhr.setRequestHeader('Accept', 'application/json');
	            xhr.setRequestHeader('Cache-Control', 'no-cache, must-revalidate'); 
	            xhr.setRequestHeader('Pragma', 'no-cache');
	            xhr.setRequestHeader('Content-type', option.contentType || 'application/json;charset=UTF-8');
	        }
			,success		: successCallback
			,complete		: function(){
				if(true !== option.hiddenLoading){
					$('#_ajaxLoading').hide();
				}				
				completeCallback();
			}
			,error			: errorCallback
		};		
		
		$.ajax(ajaxOption);
	};
	
	/* init */
	(function init(){
		if(isDev && 'console' in w){
			console.log = function(){};
		}
		if(0 === $('#_ajaxLoading').length){
			var loading =	'<div class="wrap-loading display_none" id="_ajaxLoading">'
			loading	+=			'<div><img src="/resources/images/ajax-loader.gif" /></div>';
			loading +=		'</div>';
			
			$('body').append(loading);
		}
		
	})();
	
	return {
		chartD3		: _chartD3,
		chartNv		: _chartNv,
		map			: _map,
		util		: _util,
		ajax		: _ajax
	};
	
	
	
}(window);
