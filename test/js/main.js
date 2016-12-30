function tabs(btns,cla){
   
    $(btns).on('click',function(){
        $(this).addClass(cla).siblings().removeClass(cla);
    });
}

