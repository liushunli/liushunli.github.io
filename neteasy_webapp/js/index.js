define(function(require,exports,moduel){
  //焦点图轮播
function changeBanr(obj)
{  
	var aLi =obj.getElementsByTagName('ol')[0].getElementsByTagName('li');
	var oUl = obj.getElementsByTagName('ul')[0];
	var oSpan=aLi[1].getElementsByTagName('span')[0];
	var aLi2 = oUl.getElementsByTagName('li');
    var arrTxt=[
		'河南老人种出"巨无霸"红薯 重24.8斤',
		'广告：C6全新越享高级轿车耀目而至',
		'看客：双十一过后 "购物运动"还在继续',
		'广告：立即办理中国移动高清语音 ',
		'希拉里败选后首亮相 出席儿童保护活动',
		'广告：了解更多中国母乳秘密',
		'郑爽张翰再出演荧屏情侣, 这样的吻戏,.娜扎看了不会退出吗 ',
		'广告：C-TREK蔚领，现已闪耀上市'
	  ];

	 var sX = 0;    // 手指初始x坐标
    var sLeft = 0; // 初始位移
    var iNow = 0; 
    var curLeft = 0; // 当前位移
    var disX = 0;  // 滑动差值

    oUl.addEventListener('touchstart', touchstart, false);

    function touchstart(ev) {
        ev.preventDefault();
        sX = ev.changedTouches[0].pageX;

        // 计算初始位移
        sLeft = oUl.style.transform ? -parseInt(/\d+/.exec(oUl.style.transform)[0]) : 0;
        oUl.style.transition = 'none';
        //transition在css中是属性发生变化时的一个动画形式表达，其中有时间属性，如果位移，他会在指定时间完成位移，但是手指拖动的时候位移一直存在，这个时候就会有拖不太动的感觉，所以拖动时要css属性的变化描述都去掉，变成直接改变就行了

        document.addEventListener('touchmove', touchmove, false);
        document.addEventListener('touchend', touchend, false);
    }

    function touchmove(ev) {

        disX = ev.changedTouches[0].pageX - sX;
        curLeft = sLeft + disX;
        setStyle();
    }

    function touchend(ev) {
    	disX = ev.changedTouches[0].pageX - sX;
    	var iNub=Math.round(disX/window.screen.width);
		iNow-=iNub;
		if(iNow<0)
		{
			iNow=0;
		}
		if(iNow>=aLi2.length)
		{
			iNow=aLi2.length-1;
		}
        // if (disX > 100) { 
        //     if (index != 0) {
        //         index -= 1;
        //     }
        // } 
        // if (disX < -100) {
        //     if (index != aLi.length - 1) {
        //         index += 1;
        //     };
        // };
        curLeft=-iNow*window.screen.width;
        aLi[0].innerHTML=arrTxt[iNow%aLi2.length];
		oSpan.innerHTML=iNow%aLi2.length+1;
        oUl.style.transition = '.5s';
        setStyle();
    }


    function setStyle()
	{
		oUl.style.WebkitTransform=oUl.style.MozTransform=oUl.style.transform="translateX("+curLeft+"px)";
	}
}

exports.changeBanr=changeBanr;

//返回顶部
 function toTop(btn)
 {  
        var timer2=null;
        var isTop=true;
        var clientHeight=document.documentElement.clientHeight;
        var oTop=document.documentElement.scrollTop||document.body.scrollTop;
        require('./move.js').bindEvent(window,'scroll',function(){
            if(!isTop){
               clearInterval(timer2);
           }
           isTop=false;
        })
   btn.addEventListener('touchend', touch, false);
    function touch(ev){
        clearInterval(timer2);
        timer2=setInterval(function(){  
            //获取滚动条距离顶部距离
            var oTop=document.documentElement.scrollTop||document.body.scrollTop;
            var iSpeed=Math.floor(-oTop/10);
            document.documentElement.scrollTop=document.body.scrollTop=oTop+iSpeed;
            isTop=true;//判断是否是点击按钮触发
          // console.log(oTop+iSpeed);
            if(oTop==0){
                clearInterval(timer2);
            }       
        },30);

     }
}

exports.toTop=toTop;


//图片预加载
function showImg()
{  
    var showImg=document.getElementsByTagName('img');
    var arrImg=[];
    for(var i=0;i<showImg.length;i++)
    {
        if(showImg[i].getAttribute('_src'))
        {
            arrImg.push(showImg[i]);
        }
    }
    for(var i=0;i<arrImg.length;i++)
    {
        arrImg[i].att=true;
    }

    function toImg()
    {
        var iScroll=document.documentElement.scrollTop||document.body.scrollTop;
        var iClient=document.documentElement.clientHeight;
        for(var i=0;i<arrImg.length;i++)
        {
            if(require('./move.js').posTop(arrImg[i])<iClient+iScroll&&arrImg[i].att)
            {
                arrImg[i].src=arrImg[i].getAttribute('_src');
                arrImg[i].style.opacity=0;
                arrImg[i].style.filter='alpha(opacity:0)';
                require('./move.js').startMove(arrImg[i],{opacity:100});
                arrImg[i].att=false;
            }
        }
    }
    toImg();
    require('./move.js').bindEvent(window,'scroll',function(){
        toImg();
    });

}

exports.showImg=showImg;


function showLoad()
{   
    var oMain=document.getElementById('main');
    var listMore=document.getElementById('list_more');
     var iScroll=document.documentElement.scrollTop||document.body.scrollTop;
     var listTop=require('./move.js').getByClass(oMain,'list_top');
     console.log(listTop[0]);
    var iClient=document.documentElement.clientHeight;
    console.log(iClient);
    console.log(iScroll);
    require('./move.js').bindEvent(window,'scroll',function(){
        if(require('./move.js').posTop(listTop[i])<iScroll+iClient)
        {  
            //alert('a');
            listMore.style.display="block";
            setTimeout(function(){
                listMore.style.display='none';
            },2000);
        }
    });
    
}
exports.showLoad=showLoad;
})
