// 메뉴 클릭 이벤트
$(".navbar-nav li").click(function() {
	$(".navbar-nav li").removeClass("active");
	$(this).addClass("active");
	
	var id = $(this).attr("id");
	$("._body").hide();
	if(id == "_tabHome"){
		$("#_conHome").show();
	}else if(id == "_tabAnalyzer"){
		$("#_conAnalyzer").show();
	}else if(id == "_tabDashboard"){
		$("#_conDashboard").show();
	}else if(id == "_tabFileSystem"){
		$("#_conFileSystem").show();
	}else if(id == "_tabVisual"){
		$("#_conVisual").show();
	}else if(id == "_tabMonitoring"){
		$("#_conMonitoring").show();
	}
});