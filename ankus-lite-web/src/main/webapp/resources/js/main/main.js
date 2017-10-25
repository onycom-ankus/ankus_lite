function logout()
{
	ANKUS_API.util.confirm({
		description	: i18nP('JS_LOGOUT_MODAL_CONFIRM'),
		callback : function(sel){
			if(sel){
				
				$(location).attr('href',"/logout");
				
/*				ANKUS_API.ajax({
					url			: '/main/runscheduler',
					type		: 'GET',
					data		: {schid:id},
					success		: function(res){
						if(res.success){
							$(location).attr('href',"logout");
//							ANKUS_API.util.alert(res.error.message);
						}
					}
				});			
*/			
			}
		}
	});	
}

(function(){
	var $btnTop = $('[data-body]');
	
	$btnTop.on('click', function(){
		var $this = $(this);
		
		$btnTop.removeClass('active');
		
		if($this.attr('data-body') != '_conMyInfo' 
			&& $this.attr('data-body') != '_conLanguage'
			&& $this.attr('data-body') != '_conInnerData') {
			$('._body').hide();
		} 
		
		$this.addClass('active');
		$('#' + $this.attr('data-body')).show();
	});
	
	$('body').layout({
		/*north__size		: 75,
		spacing_closed	: 15,
		initClosed		: false,*/
		closable:         false, // 경계 영역에서 중간 표시 부분 표시여부
		resizable		: false // 리사이징 여부
	}).show();
})();	