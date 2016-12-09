define(function(require,exports,moduel){
	
	//s焦点图轮播
function change(obj)
{  
	var aLi =obj.getElementsByTagName('ol')[0].getElementsByTagName('li');
	var oUl = obj.getElementsByTagName('ul')[0];
	var oDiv= obj.getElementsByTagName('div')[0]
	var aBtn=oDiv.getElementsByTagName('a');
	var aLi2 = oUl.getElementsByTagName('li');
	var iNow = 0;
	var iNow2 = 0;
	var timer = null;
	var onOff=true;
	var iLen=aLi2.length;
	var iWidth=aLi2[0].offsetWidth;
	oUl.style.width=iLen*iWidth+'px';

	obj.onmouseover=function()
	{
		clearInterval(timer);
		oDiv.style.display="block";
	}
	obj.onmouseout=function()
	{
		
		startRun ();
		oDiv.style.display="none";
	}
	//往前按钮
	aBtn[0].onclick=function()
	{
		  iNow--;
		  if(iNow==-1)
		  {
		  	iNow=0;
		  }

		  iNow2--;
		   if(iNow2==-1)
		  {
		  	iNow2=0;
		  }
		   toRun();
	}
	//往后按钮
	aBtn[1].onclick=function()
	{
		   iNow++;
		   iNow%=aLi.length;
		   iNow2++;
		   iNow2%=aLi2.length;
		   toRun();
	}
	//鼠标滑过圆点图片滚动
	for(var i=0;i<aLi.length;i++){
		aLi[i].index = i;
		aLi[i].onmouseover = function(){
			for(var i=0;i<aLi.length;i++){
				aLi[i].className = '';
			};
			this.className = 'active';
			
			require('./move.js').startMove(oUl,{'left' : -iWidth*this.index});
			iNow = this.index;
			iNow2 = this.index;
			clearInterval(timer);
		};
		
		aLi[i].onmouseout = function(){
			//timer = setInterval(toRun,2000);
			startRun ();
		};
	}
	
	function startRun ()
	{  
		if(timer)
		{
			clearInterval(timer);
		}
		
       timer = setInterval(function(){
        	 iNow++;
			iNow%=aLi.length;

		   iNow2++;
		   iNow2%=aLi2.length;
		   toRun();
       },2000);
	}
	startRun ();//初始化	
	
	function toRun(){
		for(var i=0;i<aLi.length;i++){
			aLi[i].className = '';
		};
		aLi[iNow].className = 'active';		
		require('./move.js').startMove(oUl,{ left : -iWidth * iNow2});
	}
	toRun();//初始化
        
}

exports.change=change;
//e焦点图轮播


//s商品列表页面的商品自动切换

function changeList(obj)
{
	
	var oUl=obj.getElementsByTagName('ul')[0];
	var aLi_ul=oUl.getElementsByTagName('li');
	var oOl=obj.getElementsByTagName('ol')[0];
	var aLi_ol=oOl.getElementsByTagName('li');
	var num = 0;
	var timert = null;
	
	for(var i=0;i<aLi_ol.length;i++){
		aLi_ol[i].index = i;
		aLi_ol[i].onmouseover = function(){
			for(var i=0;i<aLi_ol.length;i++){
				aLi_ol[i].className = '';
				require('./move.js').startMove(aLi_ul[i],{opacity:0});
				aLi_ul[i].style.zIndex = 1;
			}
			
			this.className = 'active';
			aLi_ul[this.index].style.zIndex = 2;		
			require('./move.js').startMove(aLi_ul[this.index],{opacity:100});
			num = this.index;			
			
		};	
	
	}

	obj.onmouseover = function(){
		clearInterval(timert);
	};
	obj.onmouseout = function(){
		timert = setInterval(toChanges,2400);
	};
	
	timert = setInterval(toChanges,2400);
	function toChanges()
	{
		
			num++;
			num%=aLi_ol.length;
				
		for(var i=0;i<aLi_ol.length;i++){
			aLi_ol[i].className = '';
			require('./move.js').startMove(aLi_ul[i],{opacity:0});
			aLi_ul[i].style.zIndex = 1;
		}
		
		aLi_ol[num].className = 'active';
		aLi_ul[num].style.zIndex = 2;		
		require('./move.js').startMove(aLi_ul[num],{opacity:100});
		
	}
}
exports.changeList=changeList;
//s导航菜单显示
function show(oLi)
{
   
   oLi.onmouseover=function()
   {  
   	  oLi.className='';
   	  this.className='show';
      this.getElementsByTagName('div')[0].style.display="block";
   }
   oLi.onmouseout=function()
   {  
   	  this.className='default';
      this.getElementsByTagName('div')[0].style.display="none";
   }
   
}
exports.show=show;
//倒计时
function daoJs () 
    {
	    var oTime=document.getElementById('time');
	    var aInp= oTime.getElementsByTagName('input');
		var iNow = new Date();
        var iNew = new Date( 'February 27,2017 12:30:00' );
        var t = Math.floor((iNew - iNow)/1000);
		var str=toTwo(Math.floor(t/86400))+toTwo(Math.floor(t%86400/3600))
		+toTwo(Math.floor(t%86400%3600/60))
		+toTwo(t%60);
		aInp[0].value =  str.substring(0,2);
		aInp[1].value =  str.substring(2,4);
		aInp[2].value =  str.substring(4,6);
		aInp[3].value =  str.substring(6,8);
	}

function toTwo ( n ) {//返回两位数
	return n < 10 ?  '0' + n : '' + n;
}
exports.daoJs=daoJs;

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

    btn.onclick=function(){
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
//两边悬浮导航出现
function showBar(obj)
{
	   
		// var isIE = !!window.ActiveXObject;
		// var isIE6 = isIE && !window.XMLHttpRequest;
		var clientHeight=document.documentElement.clientHeight;
		var clientWidth=document.documentElement.clientWidth;
		
		var oTop=document.documentElement.scrollTop||document.body.scrollTop;
           
        if(oTop>500&&clientWidth>800){//距离顶部大于500，出现悬浮菜单
               require('./move.js').startMove(obj,{opacity:100});

           }else
           {
           	   require('./move.js').startMove(obj,{opacity:0});
           }
   
}

exports.showBar=showBar;


//input 获取焦点
function showText(obj,txt)
{   
	//onfocus : 当元素获取到焦点的时候触发
	   obj.onfocus=function()
	   {
	   	if(obj.value==txt)
	   	{
	   		obj.value='';
	   	}
	   }
	   //onblur : 当元素失去焦点的时候触发
	   obj.onblur=function()
	   {
	   	if(obj.value=='')
	   	{
	   		obj.value=txt;
	   	}
	   }

}
exports.showText=showText;

//图片预加载
function showImg(obj)
{  
	var showImg=obj.getElementsByTagName('img');
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
//导航定位效果
function detailTop()
{   var oMain=document.getElementById('main');
	var oDh_lf=document.getElementById('dh_lf');
	var oUl=oDh_lf.getElementsByTagName('ul')[0];
	var aLi=oUl.getElementsByTagName('a');
	var acTop=require('./move.js').getByClass(oMain,'act_top');
	//var acNav=getByClass(oMain,'act_nav');
	var num=0;
	var oDh_h=oDh_lf.offsetHeight;
	var isTop=true;
	var topArr=[];
	var sTop=document.documentElement.scrollTop||document.body.scrollTop;
    
     for(var i=0;i<aLi.length;i++)
     {  
     	aLi[i].index=i;
     	aLi[i].onclick=function()
     	{
     		//获取滚动条距离顶部距离
			isTop=true;//判断是否是点击按钮触发
			num=this.index;
			scrollTop();

     	}
     }
     //定位到对应的楼层初始化
     function scrollTop()
     { 
     	for(var i=0;i<aLi.length;i++)
     	{
     		aLi[i].className='';
     	}
     	aLi[num].className='cur';
     	document.documentElement.scrollTop=document.body.scrollTop=require('./move.js').posTop(acTop[num])-70;
     
     }
     scrollTop();	
    //console.log(posTop(acTop[0]));//976
   //console.log(posTop(acTop[1])); //1444
}	
exports.detailTop=detailTop;
function scrollClass()
{  
	var oMain=document.getElementById('main');
	var oDh_lf=document.getElementById('dh_lf');
	var oUl=oDh_lf.getElementsByTagName('ul')[0];
	var aLi=oUl.getElementsByTagName('a');
	var acTop=require('./move.js').getByClass(oMain,'act_top');
	
	var sTop=document.documentElement.scrollTop||document.body.scrollTop;
    
	       for(var i=0;i<aLi.length;i++)
	       {
	       	if(sTop>acTop[i+1].offsetTop+200)
	       	{
	       		for(var j=0;j<aLi.length;j++)
	       		{
	       			aLi[j].className='';
	       		}
	       		aLi[i].className='cur';
	       		console.log(acTop[i].offsetTop);
	       	}
	       }
}
exports.scrollClass=scrollClass;

//改变背景颜色
function changeBg(obj)
{ 
	var oMain=document.getElementById('main');
	var actLf=require('./move.js').getByClass(obj,'act_my_lf');
	var arr=['#f99aae','#a69ad8','#bbb','#c0a89c','#92b74d','#f67474','#90a8c2','#f4ab44'];

	for(var i=0;i<actLf.length;i++)
	{
        actLf[i].style.background=arr[i%actLf.length];
	}
}
exports.changeBg=changeBg;


//tab切换
function tab(obj1,obj2,sclName1,sclName2)
{   
	var aLi=obj1.getElementsByTagName('li');
	var actLike=require('./move.js').getByClass(obj2,sclName1);
	for(var i=0;i<aLi.length;i++)
	{
		aLi[i].index=i;
		aLi[i].onclick=function()
		{
			for(var i=0;i<aLi.length;i++)
			{
				aLi[i].className='fl';
				//actLike[i].className=sclName1+'none clearfix';
				require('./move.js').addClass(actLike[i],'none');
			}
			require('./move.js').addClass(aLi[this.index],sclName2);
			require('./move.js').removeClass(actLike[this.index],'none');
		}
	}
}
exports.tab=tab;


     function bigImg(){
		var oDic=document.getElementById('bigPic');
		var small_dd=document.getElementById('small_dd');
		var oMark=require('./move.js').getByClass(oDic,'mark')[0];
		var oFloat=require('./move.js').getByClass(oDic,'float_layer')[0];
		var oBig=require('./move.js').getByClass(oDic,'big_pic')[0];
		var oSmall=require('./move.js').getByClass(oDic,'small_pic')[0];
		var oImg=oBig.getElementsByTagName('img')[0];
		console.log(oDic);
		console.log(oImg);
		oDic.onmouseover=function ()
		{
			oFloat.style.display='block';
			oBig.style.display='block';
		};
		
		oDic.onmouseout=function ()
		{
			oFloat.style.display='none';
			oBig.style.display='none';
		};
		
		oDic.onmousemove=function (ev)
		{
			var oEvent=ev||event;
			
			var l=oEvent.clientX-oDic.offsetLeft-oFloat.offsetWidth/2;
			var t=oEvent.clientY-oDic.offsetTop-oFloat.offsetHeight/2;
			console.log(oDic.offsetLeft);
			console.log(oSmall.offsetLeft);
			console.log(oFloat.offsetWidth/2);
			console.log(l);
			if(l<0)
			{
				l=0;
			}
			else if(l>oDic.offsetWidth-oFloat.offsetWidth)
			{
				l=oDic.offsetWidth-oFloat.offsetWidth;
			}
			
			if(t<0)
			{
				t=0;
			}
			else if(t>oDic.offsetHeight-oFloat.offsetHeight)
			{
				t=oDic.offsetHeight-oFloat.offsetHeight;
			}
			
			oFloat.style.left=l+'px';
			oFloat.style.top=t+'px';
			
			var percentX=l/(oDic.offsetWidth-oFloat.offsetWidth);
			var percentY=t/(oDic.offsetHeight-oFloat.offsetHeight);
			
			oImg.style.left=-percentX*(oImg.offsetWidth-oBig.offsetWidth)+'px';
			oImg.style.top=-percentY*(oImg.offsetHeight-oBig.offsetHeight)+'px';
		};
    }

    exports.bigImg=bigImg;



    function changeImg()
    {  
    	var small_dd=document.getElementById('small_dd');
    	var aLi=small_dd.getElementsByTagName('a');
        var num=0;
        console.log(aLi);
    	var smallImg=document.getElementById('small_img');
    	var bigImg=document.getElementById('big_img');
    	var aImgArr=['images/detail/small1.jpg','images/detail/small2.jpg','images/detail/small3.jpg','images/detail/small4.jpg','images/detail/small5.jpg'];
        var aImgArr2=['images/detail/big1.jpg','images/detail/big2.jpg','images/detail/big3.jpg','images/detail/big4.jpg','images/detail/big5.jpg'];

       for(var i=0;i<aLi.length;i++)
       {
       	aLi[i].index=i;
       	aLi[i].onclick=function()
       	{
       		num=this.index;
       		fnTab();
       	}
       }


       function fnTab(){
		smallImg.src = aImgArr[num];
		bigImg.src = aImgArr2[num];
		for( var i=0; i<aLi.length; i++ ){
			aLi[i].className = '';
		}
		aLi[num].className = 'active';
	   }
	   fnTab();
    }

    exports.changeImg=changeImg;

});