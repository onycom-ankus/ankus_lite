(function prdtKeyword(){
	var _firstLoad = false;	
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
				console.log(res);
				var obj = res.map;
				obj.rows = res.list;
				
//				for(var i=0 ; i < obj.rows.length ; i++){
//					var ratio;
//					if(obj.rows[i].tot_num_data > 0 && obj.rows[i].num_data > 0){
//						ratio = (obj.rows[i].num_data / obj.rows[i].tot_num_data) * 100;
//						obj.rows[i].ratio = ratio.toFixed(2);
//					}else{
//						ratio = 0;
//						obj.rows[i].ratio = ratio.toFixed(2);
//					}
//				}
				
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
	        ondblClickRow	: function(id){
	        	_drawAction($('#_pk_grid').getRowData(id), true);
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
				console.log(res);
				$('#_pk_terms').empty();
				$('<option>').val('').text('기간 선택').appendTo($('#_pk_terms'));
				$.each(res.list, function(i, v) {
					$('<option>').val(v.prdt_strt_dt).text(v.str_term).appendTo($('#_pk_terms'));
				});
			},
			error : function(xhr, status, error) {
	//	        	alert("에러발생");
	        }
		});
	}
	
	var _setTerms = function(e){
		var strt = $('#_pk_terms').val();
		$('#_pk_prdt_strt_dt').val(strt);	
	}
	
	
	var _drawAction = function(row){
		
		ANKUS_API.ajax({
			url			: '/prdtKeyword/chartList',
			data		: {
				srch_kwrd:row.srch_kwrd
			},
			type		: 'GET',
			success		: function(res){
				console.log(res.list);	
				
				d3.select("#_pk_cloud").selectAll("svg").remove();
				setCloud(res.list);
			},
			error : function(xhr, status, error) {
	//	        	alert("에러발생");
	        }
		});
		
	};	
	
	$('#_pk_years').on('change', _getTermsList);
	$('#_pk_terms').on('change', _setTerms);
	
	$('#_pk_btnSearch').on('click', function() {
		_getGrid(true);
	});
	
	var color = d3.scale.linear()
    .domain([0,1,2,3,4,5,10,15,20,25,30])
    .range(['#3498DB', '#1478BB', '#00589B', '#54A8FB', '#74C8FF'])
    .clamp(true);
    //.range([0, 150]).clamp(true);
	
	function setCloud(data) {
		
	d3.layout.cloud().size([550, 250])
	    .words(data)
	    .rotate(0)
	    .fontSize(function(d) { return d.tf_idf; })
	    .on("end", draw)
	    .start();
	}
	
	function draw(data) {
		
	d3.select("#_pk_cloud").append("svg")
	    .attr("width", 600)
	    .attr("height", 300)
	    .attr("class", "wordcloud")
	    .append("g")
	    // without the transform, words words would get cutoff to the left and top, they would
	    // appear outside of the SVG area
	    .attr("transform", "translate(255,125)")
	    .selectAll("text")
	    .data(data)
	    .enter().append("text")
	    .style("font-size", function(d) {return (d.size*10) + "px"; })
	    .style("fill", function(d, i) { return color(i); })
	    .style("fill-opacity", .5)
	    .attr("text-anchor", "middle")
	    .attr("transform", function(d) {
	        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
	        })
	    .text(function(d) { return d.text; });
	}
		
	(function init(){
		_setGrid();
		_getYearList();		
	})();		
})();