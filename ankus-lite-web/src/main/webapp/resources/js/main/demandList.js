(function demandList(){
	var _firstLoad = false;	
	var _getGrid = function(page){
		var postData = $('#_dl_grid').jqGrid('getGridParam', 'postData');		
		var data = {};	
		data.prdt_strt_dt	= $('#_dl_prdt_strt_dt').val();		
		data.paging	= true;
		if (postData) {
			data.page		= page ? 1 : postData.page;
			data.rows		= postData.rows;
			data.sidx		= postData.sidx;
			data.sord		= postData.sord;
		}

		if(data.prdt_strt_dt == ''){
			ANKUS_API.util.alert('기간을 선택하여 주세요.');
			return;
		}
		
		ANKUS_API.ajax({
			url			: '/demandList/list',
			data		: data,
			success		: function(res){
				//console.log(res);
				var obj = res.map;
				obj.rows = res.list;
								
				$('#_dl_grid').jqGrid('resetSelection');
				$('#_dl_grid').jqGrid('clearGridData');
				$('#_dl_grid')[0].addJSONData(obj);
				
				//d3.select("#_dl_bar").selectAll("svg").remove();
	            //_draw_bar(res.list);	            
			}
		});
	};
	
	var _getChartList = function(){
		var prdt_strt_dt = $('#_dl_prdt_strt_dt').val();		
		ANKUS_API.ajax({
			url			: '/demandList/chartList',
			data		: {
				prdt_strt_dt:prdt_strt_dt
			},
			type		: 'GET',
			success		: function(res){
				//console.log(res);				
				d3.select("#_dl_bar").selectAll("svg").remove();
	            _draw_bar(res.list);	            
			}
		});
	}
	
	var _getModelList = function(){
		var prdt_strt_dt = $('#_dl_prdt_strt_dt').val();	
		ANKUS_API.ajax({
			url			: '/demandList/modelList',
			data		: {
				prdt_strt_dt:prdt_strt_dt
			},
			type		: 'GET',
			success		: function(res){
				//$('#_dl_model_table').empty();				
				$('#_dl_prdt_dt').text(res.list[0].prdt_dt);
				$('#_dl_train_dt').text(res.list[0].train_strt_dt + ' ~ ' + res.list[0].train_term_dt);
				$('#_dl_train_num_data').text(res.list[0].train_num_data);
				$('#_dl_prdt_rmse').text(res.list[0].prdt_rmse);
				$('#_dl_prdt_rrse').text(res.list[0].prdt_rrse);
			},
			error : function(xhr, status, error) {
	//	        	alert("에러발생");
	        }
		});
	}
	
	function _draw_bar(data){
				
		var width = 550,
	    height = 300;
		
		var tip = d3.tip()
		  .attr('class', 'd3-tip')
		  .offset([-10, 0])
		  .html(function(d) {
		    return "<strong>" + d.item_nm + ":</strong> <span style='color:orangered'>" + d.prdt_est + "</span>";
		  })
		
		var svg = d3.select('#_dl_bar').append("svg")
		          .attr("width",550)
		          .attr("height",300);	
		
		svg.call(tip);
		
		var x = d3.scale.ordinal()
		        .domain(data.map(function(d){
		        	var str_val = d.item_nm;
		        	if(str_val.length > 9){
		        		d.item_nm = d.item_nm.substring(0, 8) + "..."
		        	}
		        	return d.item_nm
		        }))
		        .rangeRoundBands([50, 550])
		        
		var y = d3.scale.linear()
		       .domain([d3.max(data.map(function(d){return d.prdt_est})),0])
		       .range([10,250])
		
		var rect = svg.selectAll("rect")
			        .data(data)
			        .enter()
			        .append("rect")
			        .attr("x", function(d){return x(d.item_nm)})
			        .attr("y", function(d){return y(d.prdt_est)})
			        .attr("width", x.rangeBand()-20)
			        .attr("height", function(d){return 250 - y(d.prdt_est)})
			        .style("fill", "steelblue")
			        .on('mouseover', function(d) {
			        	d3.select(this).style("fill", "orangered")
			        	tip.show(d);
			        })
			        .on('mouseout', function(d) {
			        	d3.select(this).style("fill", "steelblue")
			        	tip.hide(d);
			        })

		var xAxis = d3.svg.axis()
        .scale(x)
        .outerTickSize(1)
        .orient("bottom");
		
        
		var yAxis = d3.svg.axis()
		        .scale(y)
		        .outerTickSize(0)
		        .ticks(5)		        
		        .orient("right");			
		
		svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0,250)")
		.call(xAxis);
		
		svg.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(0,0)")
		.call(yAxis);
		
		svg.append("text")		
		.transition()		
		.text('TOP-5 예측 수요량')
		.attr('x', 350)
		.attr('y', 20)
		.attr('text-anchor', 'end')
		.attr('font-size', '15px')
		.attr('fill', 'black')
		.style("font-weight","bold");
    };

	
	// 그리드 설정
	var _setGrid = function(){	
		
		$('#_dl_grid').ankusGrid({
			datatype		: function(postData) {		
				if (_firstLoad) {
					_getGrid();
				} else {
					_firstLoad = true;
				}
			},
			jsonReader		: {
				repeatitems	: false,
				id			: 'item_cd'
			},
			sortname		: 'prdt_est',
			sortorder		: 'desc',
	        multiselect		: false,
	        idPrefix		: '_fcGrid_',
	        ondblClickRow	: function(id){
	        //	_editAction($('#_dl_grid').getRowData(id), true);
	        },
	        refreshfunc		: function(){
	        },
	        rownumbers		: true,
	        pager			: '_dl_pager',
	        rowNum			: 5,
	        colModel		: [	        	    	
	        	{ name : 'prdt_strt_dt', hidden:true},
	        	{ name : 'item_cd', label : '제품코드', width : 400, align : 'center'},
	        	{ name : 'item_nm', label : '제품명',  width : 450, align : 'center'},	        	
	        	{ name : 'prdt_est', label : '수요예측치', width : 400, align : 'center'}	        		        
	        ]
	    });
		/*
		function changeLength(cellvalue, options, rowObject){
			
			var lang = cellvalue.length;			
			cellvalue = cellvalue.replace(/\r/g, '').replace(/\n/g, '');	
			if(lang > 30){
				cellvalue = cellvalue.substring(0, 40) + "..."
			}
			
			return cellvalue;
		}
		*/
	};
	
	var _getYearList = function(){
		ANKUS_API.ajax({
			url			: '/demandList/yearList',
			data		: {},
			type		: 'GET',
			success		: function(res){
				$('#_dl_years').empty();
				$('<option>').val('').text('년도 선택').appendTo($('#_dl_years'));
				$.each(res.list, function(i, v) {
					$('<option>').val(v.str_year).text(v.str_year).appendTo($('#_dl_years'));
				});
			},
			error : function(xhr, status, error) {
	//	        	alert("에러발생");
	        }
		});
	}	
	
	var _getTermsList = function(e){
		var item = $('#_dl_years').val();
		//console.log(item);
		ANKUS_API.ajax({
			url			: '/demandList/termList',
			data		: {
				item:item
			},
			type		: 'GET',
			success		: function(res){
				//console.log(res);
				$('#_dl_terms').empty();
				$('<option>').val('').text('기간 선택').appendTo($('#_dl_terms'));
				$.each(res.list, function(i, v) {
					$('<option>').val(v.prdt_strt_dt).text(v.str_term).appendTo($('#_dl_terms'));
				});
			},
			error : function(xhr, status, error) {
	//	        	alert("에러발생");
	        }
		});
	}
	
	var _setTerms = function(e){
		var strt = $('#_dl_terms').val();
		$('#_dl_prdt_strt_dt').val(strt);	
	}
	
	/*
	var _editAction = function(row, isAdd){
		
		$('#_dl_Modal input, #_dl_Modal textarea').prop('disabled', true).val('');
		$('#_dl_doc_sj').val(row.org_doc_sj);
		$('#_dl_kwrd').val(row.kwrd);
		$('#_dl_kwrd_sj').val(row.kwrd_sj);
		$('#_dl_blog_wrter').val(row.blog_wrter);
		$('#_dl_doc_cret_dt').val(row.doc_cret_dt);
		$('#_dl_doc_cn').val(row.org_doc_cn);
		$('#_dl_http_addr').val(row.http_addr);		
		
		$('#_dl_Modal').ankusModal('show');
	};	
	
	var _cancelAction = function(){
		$('#_dl_Modal').ankusModal('hide');
	};
	*/
	$('#_dl_years').on('change', _getTermsList);
	$('#_dl_terms').on('change', _setTerms);
	
	$('#_dl_btnSearch').on('click', function() {
		_getGrid(true);
		_getModelList();
		_getChartList();
	});	

	//$('#_dl_btnCancel').on('click', _cancelAction);
	
		
	(function init(){
		_setGrid();
		_getYearList();
		//_draw_bar();
	})();		
})();