(function prdtKeyword(){
	var _firstLoad = false;	
	var _firstLoad_blog = false;	
	var _getGrid = function(page){
		var postData = $('#_pk_grid').jqGrid('getGridParam', 'postData');		
		var data = {};	
		data.prdt_strt_dt	= $('#_pk_prdt_strt_dt').val();		
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
			url			: '/prdtKeyword/list',
			data		: data,
			success		: function(res){
				//console.log(res);
				var obj = res.map;
				obj.rows = res.list;
				
				$('#_pk_grid').jqGrid('resetSelection');
				$('#_pk_grid').jqGrid('clearGridData');
				$('#_pk_grid')[0].addJSONData(obj);
				
			}
		});
	};
	

	
	// 그리드 설정
	var _setGrid = function(){	
		
		$('#_pk_grid').ankusGrid({
			datatype		: function(postData) {		
				if (_firstLoad) {
					_getGrid();
				} else {
					_firstLoad = true;
				}
			},
			jsonReader		: {
				repeatitems	: false,
				id			: 'srch_kwrd'
			},
			sortname		: 'srch_kwrd',
			sortorder		: 'asc',
	        multiselect		: false,
	        idPrefix		: '_rwGrid_',
	        onSelectRow		: function(id){
	        	_drawAction($('#_pk_grid').getRowData(id), true);
	        },
	        ondblClickRow	: function(id){
	        	
	        },
	        refreshfunc		: function(){
	        },
	        rownumbers		: true,
	        pager			: '_pk_pager',
	        rowNum			: 5,
	        colModel		: [ 
	        	{ name : 'srch_kwrd', label : '제품', width : 250, align : 'center'},
	        	{ name : 'tf_total', label : '키워드 수',  width : 250, align : 'center'} 
	        ]
	    });		
	};
	
	var _getGridBlog = function(page){
		var postData = $('#_pk_grid_blog').jqGrid('getGridParam', 'postData');
		var data = {};
		//data.from	= $('#_pk_prdt_strt_dt').val();	
		//data.to	= $('#_pk_prdt_term_dt').val();	
		data.srch_kwrd	= $('#_pk_srch_kwrd').val();	
		data.kwrd_sj = $('#_pk_kwrd').val();
		
		data.paging	= true;
		if (postData) {
			data.page		= page ? 1 : postData.page;
			data.rows		= postData.rows;
			data.sidx		= postData.sidx;
			data.sord		= postData.sord;
		}
		console.log(data);
		ANKUS_API.ajax({
			url			: '/blogList/list',
			data		: data,
			success		: function(res){
				//console.log(res);
				var obj = res.map;
				obj.rows = res.list;
				
				if(obj.records > 0){
					for(i = 0; i < obj.records; i++){
						if(i < obj.rows.length){
							obj.rows[i].org_doc_sj = obj.rows[i].doc_sj;
							obj.rows[i].org_doc_cn = obj.rows[i].doc_cn;
						}
					}
				}
								
				$('#_pk_grid_blog').jqGrid('resetSelection');
				$('#_pk_grid_blog').jqGrid('clearGridData');
				$('#_pk_grid_blog')[0].addJSONData(obj);
				
			}
		});
	};
	
	var _setGridBlog = function(){	
		
		$('#_pk_grid_blog').ankusGrid({
			datatype		: function(postData) {
				if (_firstLoad_blog) {
					_getGridBlog();
				} else {
					_firstLoad_blog = true;
				}
			
			},
			jsonReader		: {
				repeatitems	: false,
				id			: 'sn'
			},
			sortname		: 'DOC_CRET_DT, SRCH_KWRD',
			sortorder		: 'desc',
	        multiselect		: false,
	        idPrefix		: '_grid_',
	        multiboxonly	: true,
	        onSelectRow	: function(id){
	        },
	        ondblClickRow	: function(id){
	        	_editAction($('#_pk_grid_blog').getRowData(id), true);
	        },
	        refreshfunc		: function(){
	        },
	        pager			: '_pk_pager_blog',
	        rowNum			: 10,
	        colModel		: [
	        	{ name : 'sn', hidden : true },	        	
	        	{ name : 'doc_cret_dt', label : '일자', width : 100, align : 'center'},
	        	{ name : 'srch_kwrd', label : '검색단어', width : 300, align : 'center'},
	        	{ name : 'doc_sj', label : '제목',  width : 430, formatter:changeLength},	        	
	        	{ name : 'doc_cn', label : '내용', width : 450, formatter:changeLength},
	        	{ name : 'org_doc_sj', hidden : true },
	        	{ name : 'org_doc_cn', hidden : true },
	        	{ name : 'kwrd', hidden : true },
	        	{ name : 'kwrd_sj', hidden : true },
	        	{ name : 'blog_wrter', hidden : true },
	        	{ name : 'http_addr', hidden : true }
	        ]
	    });
		
		function changeLength(cellvalue, options, rowObject){
			
			var lang = cellvalue.length;			
			cellvalue = cellvalue.replace(/\r/g, '').replace(/\n/g, '');	
			if(lang > 30){
				cellvalue = cellvalue.substring(0, 40) + "..."
			}
			
			return cellvalue;
		}
		
	};
	
	var _getYearList = function(){
		ANKUS_API.ajax({
			url			: '/prdtKeyword/yearList',
			data		: {},
			type		: 'GET',
			success		: function(res){
				$('#_pk_years').empty();
				$('<option>').val('').text('년도 선택').appendTo($('#_pk_years'));
				$.each(res.list, function(i, v) {
					$('<option>').val(v.str_year).text(v.str_year).appendTo($('#_pk_years'));
				});
			},
			error : function(xhr, status, error) {
	//	        	alert("에러발생");
	        }
		});
	}	
	
	var _getTermsList = function(e){
		var item = $('#_pk_years').val();
		//console.log(item);
		ANKUS_API.ajax({
			url			: '/prdtKeyword/termList',
			data		: {
				item:item
			},
			type		: 'GET',
			success		: function(res){
				//console.log(res);
				$('#_pk_terms').empty();
				$('<option>').val('').text('기간 선택').appendTo($('#_pk_terms'));
				$.each(res.list, function(i, v) {
					$('<option>').val(v.prdt_strt_dt + '|' + v.prdt_term_dt).text(v.str_term).appendTo($('#_pk_terms'));
				});
			},
			error : function(xhr, status, error) {
	//	        	alert("에러발생");
	        }
		});
	}
	
	var _setTerms = function(e){
		var str_val = $('#_pk_terms').val();		
		var fields = str_val.split('|');
		
		var strt = fields[0];
		var term = fields[1];		
		$('#_pk_prdt_strt_dt').val(strt);	
		$('#_pk_prdt_term_dt').val(term);
	}
	
	
	var _drawAction = function(row){
		var srch_kwrd = row.srch_kwrd;
		$('#_pk_srch_kwrd').val(srch_kwrd);
		
		var cnt = $('#_pk_count').val();		
		ANKUS_API.ajax({
			url			: '/prdtKeyword/chartList',
			data		: {
				srch_kwrd:srch_kwrd,
				count:cnt
			},
			type		: 'GET',
			success		: function(res){
				d3.select("#_pk_cloud").selectAll("svg").remove();
				setCloud(res.list);				
			},
			error : function(xhr, status, error) {
	//	        	alert("에러발생");
	        }
		});
		
	};	
	
	var _editAction = function(row, isAdd){
		
		$('#_pk_Modal input, #_pk_Modal textarea').prop('disabled', true).val('');
		$('#_pk_doc_sj').val(row.org_doc_sj);
		$('#_pk_kwrd').val(row.kwrd);
		$('#_pk_kwrd_sj').val(row.kwrd_sj);
		$('#_pk_blog_wrter').val(row.blog_wrter);
		$('#_pk_doc_cret_dt').val(row.doc_cret_dt);
		$('#_pk_doc_cn').val(row.org_doc_cn);
		$('#_pk_http_addr').val(row.http_addr);		
		
		$('#_pk_Modal').ankusModal('show');
	};	
	
	var _cancelAction = function(){
		$('#_pk_Modal').ankusModal('hide');
	};
	
	$('#_pk_years').on('change', _getTermsList);
	$('#_pk_terms').on('change', _setTerms);
	
	$('#_pk_btnSearch').on('click', function() {
		_getGrid(true);
	});
	$('#_pk_btnCancel').on('click', _cancelAction);
	
	var fill = d3.scale.category20();
	
	function setCloud(data) {
		var size;	
		var max;
		d3.layout.cloud().size([550, 250])
	    .words(data)	    
	    .rotate(function(d) { return 0; })
	    .padding(1)
	    //.rotate(function() { return ~~(Math.random() * 2) * 90; })
	    .font("Impact")
	    .text(function(d) { return d.text; })
	    .fontSize(function(d, i) {
	    	if(i == 0){	  		
	    		max = d.tf_idf;
	    	}
	    	size = (d.tf_idf * 80) / max;
	    	return  size;
	    })
	    .on("end", draw)
	    .start();
	}
	
	var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("color", "black")
    .style("font-size","15px")
    .style("font-weight","bold")
    .style("cursor", "pointer")    
    .text("a simple tooltip");
	
	function draw(data) {				
		d3.select("#_pk_cloud").append("svg")
		    .attr("width", 600)
		    .attr("height", 300)
		    .append("g")
		    .attr("transform", "translate(255,150)")
		    .selectAll("text")
		    .data(data)
		    .enter().append("text")
		    .style("font-size", function(d) {return (d.size) + "px";})
		    .style("font-family", "Impact")
		    .style("fill", function(d, i) { return fill(i); })
		    .attr("text-anchor", "middle")
		    .attr("transform", function(d) {
		        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
		        })
		    .text(function(d) { return d.text; })
		    .on("mouseover", function(d){
		    	tooltip.text(d.text); 
		    	return tooltip.style("visibility", "visible");
		    })
		    .on("mousemove", function(){
		    	return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
		    })
		    .on("mouseout", function(){
		    	return tooltip.style("visibility", "hidden")
		    ;})
		    .on("click", function(d){
		    	$('#_pk_kwrd').val(d.text);
		    	_getGridBlog();
		    });
	}
		
	(function init(){
		_setGrid();
		_getYearList();
		_setGridBlog();
	})();		
})();