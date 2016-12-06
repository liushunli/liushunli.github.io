define(function(require,exports,moduel){
  
//图片position
  function posChange()
  {
  	var oMain=document.getElementById('main'); 
  	var sprTop=require('./move.js').getByClass(oMain,'act');
  	require('./move.js').bindEvent(window,'scroll',function(){
  	for(var i=0;i<sprTop.length;i++)
        {   
        	if(i<sprTop.length-1)
        	{
               bgPos(sprTop[i]);
        	}
        	
        	if(i>(sprTop.length/2-1))
        	{  
               actPos2(sprTop[i]);
        	}else{
                actPos(sprTop[i]);
        	}
        }
    });
    
  }
  function bgPos(obj)
	{
		
		var cTop=document.documentElement.scrollTop||document.body.scrollTop;
		obj.style.backgroundPositionY=-(cTop-obj.offsetTop)/10+'px';	
	}


	function actPos(obj)
	{
		var actChild=obj.children;
		var cTop=document.documentElement.scrollTop||document.body.scrollTop;
		actChild[0].style.backgroundPositionY=-cTop+obj.offsetTop+450+'px';
		actChild[1].style.backgroundPositionY=(cTop-obj.offsetTop)/0.6+'px';	
	}

	
	function actPos2(obj)
	{
		var actChild=obj.children;
		var cTop=document.documentElement.scrollTop||document.body.scrollTop;
		actChild[0].style.backgroundPositionY=(cTop-obj.offsetTop)/0.8+'px';
		actChild[1].style.backgroundPositionY=(cTop-obj.offsetTop)/0.7+'px';	
	}
	
exports.posChange=posChange;


   //返回顶部
 function toTop(btn)
 {	
		var timers=null;
		var onOff=true;
		var oTop=document.documentElement.scrollTop||document.body.scrollTop;
		require('./move.js').bindEvent(window,'scroll',function(){
            if(!onOff){
               clearInterval(timers);
           }
           onOff=false;
		})

    btn.onclick=function(){
    	clearInterval(timers);
		timers=setInterval(function(){	
            //获取滚动条距离顶部距离
			var oTop=document.documentElement.scrollTop||document.body.scrollTop;
			var iSpeed=Math.floor(-oTop/10);
			document.documentElement.scrollTop=document.body.scrollTop=oTop+iSpeed;
			onOff=true;//判断是否是点击按钮触发
		  // console.log(oTop+iSpeed);
			if(oTop===0){
				clearInterval(timers);
			}		
		},30);

     };
}

	exports.toTop=toTop;


	//弹性菜单
	function menuMove(obj,childUl,iTarget){
		var iSpeed=0;
			clearInterval(obj.timer);
			obj.timer = setInterval(function(){
				
				iSpeed += (iTarget - obj.offsetLeft)/6;
				iSpeed *= 0.75;
				
				if( Math.abs(iSpeed)<=1 && Math.abs(iTarget - obj.offsetLeft)<=1 ){
					clearInterval(obj.timer);
					obj.style.left = iTarget + 'px';
					childUl.style.left = -iTarget + 'px';
					iSpeed = 0;
				}
				else{
					obj.style.left = obj.offsetLeft + iSpeed + 'px';
					childUl.style.left = - obj.offsetLeft + 'px';
				}
				
			},30);
		}



	function toMark()
	{   
		var oMain=document.getElementById('main');
		var acTop=require('./move.js').getByClass(oMain,'act');
		var oMark = document.getElementById('mark');
		var aLi=oMark.getElementsByTagName('li');
		var oDaoh_nav=document.getElementById('daoh_nav');
		var aBox = require('./move.js').getByClass(oDaoh_nav,'box');
		
		var childUl = oMark.getElementsByTagName('ol')[0];
		var timer2 = null;
		
		for(var i=0;i<aBox.length;i++){
			aBox[i].onmouseover = function(){
				clearTimeout(timer2);
				menuMove( oMark,childUl,this.offsetLeft );
			};
			
			aBox[i].onmouseout = function(){
				timer2 = setTimeout(function(){
					menuMove( oMark,childUl,this.offsetLeft );
				},100);
			};
		}
	    // //导航定位效果
		for(var i=0;i<aLi.length;i++)
		{   aLi[i].index=i;
			aLi[i].onclick=function()
			{
			
	         document.documentElement.scrollTop=document.body.scrollTop=require('./move.js').posTop(acTop[this.index])+80;
			}
		}
		
		oMark.onmouseover = function(){
			clearTimeout(timer2);
		};
		
		// oMark.onmouseout = function(){
		// 	timer2 = setTimeout(function(){
		// 		menuMove( oMark,childUl,0 );
		// 	},100);
		// };
		
		
	}
 
    exports.toMark=toMark;

	function scrollClass()
	{  
		var oMain=document.getElementById('main');
		var acTop=require('./move.js').getByClass(oMain,'act');
		var oMark = document.getElementById('mark');
		var aLi=oMark.getElementsByTagName('li');
		var childUl = oMark.getElementsByTagName('ol')[0];
		var oDaoh_nav=document.getElementById('daoh_nav');
		var aBox = require('./move.js').getByClass(oDaoh_nav,'box');
		var sTop=document.documentElement.scrollTop||document.body.scrollTop;
	    
		       for(var i=0;i<aBox.length;i++)
		       {
		       	if(sTop>acTop[i].offsetTop)
		       	{
		       		for(var j=0;j<aBox.length;j++)
		       		{
		       			menuMove(oMark,childUl,0);
		       		}
		       		menuMove( oMark,childUl,aBox[i].offsetLeft);
		       	}
		       }
	}

   exports.scrollClass=scrollClass;

	//tab切换
	function tab()
	{   var oHead=document.getElementById('news_hd_ul');
		var oNews=document.getElementById('news_s3_nav');
		var aLi=oHead.getElementsByTagName('a');
		var aNewsUl=require('./move.js').getByClass(oNews,'news_nav_ul');
		for(var i=0;i<aLi.length;i++)
		{
			aLi[i].index=i;
			aLi[i].onclick=function()
			{
				for(var i=0;i<aLi.length;i++)
				{
					aLi[i].className='fl';
					aNewsUl[i].className='news_nav_ul none';
				}
				aLi[this.index].className='news_cur';
				aNewsUl[this.index].className='news_nav_ul';
			};
		}
	}

	exports.tab=tab;

	function toShow()
	{
		var atBtn=document.getElementById('about_s3_a1');
		var oConat=document.getElementById('conat');
		var oHeight=oConat.offsetHeight;
		
		atBtn.onclick=function()
		{  
			
			var sTop=document.documentElement.scrollTop||document.body.scrollTop;
			document.documentElement.scrollTop=document.body.scrollTop=oConat.offsetTop;
	          require('./move.js').startMove(oConat,{height:800});
			
		};

	}

	exports.toShow=toShow;

	function toHide()
	{
		var atBtn=document.getElementById('conat_close');
		var oConat=document.getElementById('conat');
		var oHeight=oConat.offsetHeight;
		
		atBtn.onclick=function()
		{  
			var sTop=document.documentElement.scrollTop||document.body.scrollTop;
			document.documentElement.scrollTop=document.body.scrollTop=oConat.offsetTop;
	          require('./move.js').startMove(oConat,{height:0});	
		};

	}

   exports.toHide=toHide;

	function imgShow()
	{
		var sectorNav=document.getElementById('sector_s3_nav');
	    var aLi = sectorNav.getElementsByTagName('img');
		var arr = [];
		var zIndex = 1;
		
		for (var i=0; i<aLi.length; i++) {
			arr.push( {left: aLi[i].offsetLeft, top: aLi[i].offsetTop} );
		}
		
		for (var i=0; i<aLi.length; i++) {
			aLi[i].index = i;
			aLi[i].style.left = arr[i].left + 'px';
			aLi[i].style.top = arr[i].top + 'px';
			aLi[i].style.position = 'absolute';
			aLi[i].style.margin = '0px';
			
			aLi[i].onmouseover = function() {
				
				//this.style.background = 'green';
				this.style.zIndex = zIndex++;
				
				require('./move.js').startMove( this, {
					width : 210,
					height : 210,
					left : arr[this.index].left - 25,
					top : arr[this.index].top - 25
				});
				
			}
			
			aLi[i].onmouseout = function() {
				
				require('./move.js').startMove( this, {
					width : 170,
					height : 170,
					left : arr[this.index].left,
					top : arr[this.index].top
				});
			}
			
		}
		
	}
   exports.imgShow=imgShow;


 //项目经验鼠标滑过切换 
function changeList(obj,obj2)
{
	
	var oUl=obj.getElementsByTagName('ul')[0];
	var aLi_ul=oUl.getElementsByTagName('li');
	var aLi_ol=obj2.getElementsByTagName('a');
	var num = 0;
	var iLen=aLi_ul.length;
	var iWidth=aLi_ul[0].offsetWidth;
	oUl.style.width=iLen*iWidth+'px';
	for(var i=0;i<aLi_ol.length;i++){
		aLi_ol[i].index = i;
		aLi_ol[i].onmouseover = function(){
			for(var i=0;i<aLi_ol.length;i++){
				aLi_ol[i].className = '';
				
			}	
			this.className = 'page_a';		
			require('./move.js').startMove(oUl,{left:-iWidth*this.index});
			num = this.index;			
			
		};	
	
	}

	
	function toChanges()
	{
			num++;
			num%=aLi_ol.length;
				
		for(var i=0;i<aLi_ol.length;i++){
			aLi_ol[i].className = '';
		}
		
		aLi_ol[num].className = 'page_a';		
		require('./move.js').startMove(left,{left: -iWidth *num});
		
	}

}
  exports.changeList=changeList;

	
});