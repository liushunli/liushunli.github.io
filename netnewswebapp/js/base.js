function tabs(btn,obj,cla){
	var btn='.'+btn
	var obj='.'+obj
	
	$(btn).on('click',function(){
		$(this).addClass(cla).siblings().removeClass(cla)
		$(obj).eq($(this).index()).show().siblings(obj).hide()
	})
}

tabs('nav_main_n a','main-container','cur');