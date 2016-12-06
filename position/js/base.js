define(function(require,exports,moduel){
/*========================================================*/    
/* 所有效果集合
/*========================================================*/
	
	var oReturn=document.getElementById('return');
    var proNav=document.getElementById('product_s3_nav');
    var proPage=document.getElementById('page');
    var btn=document.getElementById("conat_s3_Btn");
    var oCon=document.getElementById("conat_about"); 
    var aLiw = document.getElementById("conat_about").getElementsByTagName("li");
     require('./index.js').changeList(proNav,proPage);//图片切换
     require('./index.js').posChange();
	 require('./index.js').tab();//工作经验
     require('./index.js').toTop(oReturn);
     require('./index.js').toShow();
     require('./index.js').toHide();
     require('./index.js').toMark();
     require('./index.js').imgShow();
     require('./video.js').videoShow();//视频歌曲
     require('./canvas.js').autoCanvas();
     require('./wheel.js').dragDown(btn,oCon,aLiw);
     require('./wheel.js').mouWheel(btn,oCon,aLiw);
     require('./load.js').load();
     require('./move.js').bindEvent(window,'scroll',function(){
        require('./index.js').scrollClass();//顶部导航随着滚动条滚动加上红色背景
       });
    
});