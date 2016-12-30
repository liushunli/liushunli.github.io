function tabs(btn,obj,cla){
	var btns='.'+btn;
	var objs='.'+obj;
	
	$(btns).on('click',function(){
		$(this).addClass(cla).siblings().removeClass(cla);
		$(objs).eq($(this).index()).show().siblings(objs).hide();
	});
}

tabs('nav_main_n a','main-container','cur');;function tabs(btns,cla){
   
    $(btns).on('click',function(){
        $(this).addClass(cla).siblings().removeClass(cla);
    });
}

