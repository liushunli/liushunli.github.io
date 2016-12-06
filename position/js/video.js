define(function(require,exports,moduel){
/*========================================================*/    
/* 自制视频播放停止
/*========================================================*/
function videoShow(){
	var likeNav=document.getElementById('like_s3_nav');
  var oV = document.getElementById('v1');
	var oPlay=document.getElementById('play');
	var noVoice=document.getElementById('no_voice');
	var likeMark=document.getElementById('like_mark');
	var aInpTime=document.getElementById('like_time');
	var aInput=aInpTime.getElementsByTagName('input');
	var oGress=document.getElementById('like_gress');
	var oGress2=document.getElementById('like_gress2');
	//console.log(aInput[2].value);
	var oVoe1 = document.getElementById('like_bg');
	var oVoe2 = document.getElementById('like_btn');
	var oVoe3 = document.getElementById('like_bg2');
	var oVoe4 = document.getElementById('like_btn2');
	
	var disX = 0;
	var disX2 = 0;
	
	var timer = null;
	
	oPlay.onclick = function(){
		
		if( oV.paused ){
			
			oV.play();
			
			this.value = '暂停';
			likeMark.style.display="none";
			nowTime();
			timer = setInterval(nowTime,1000);
			
		}
		else{
			
			oV.pause();
			
			this.value = '播放';
			likeMark.style.display="block";
			clearInterval(timer);
			
		}
		
	};
	
	likeMark.onclick=function()
	{
		if(oV.paused)
		{
			oV.play();
			this.style.display="none";
			oPlay.value='暂停';
			nowTime();
			timer = setInterval(nowTime,1000);
		}
		else{
			
			oV.pause();
			oPlay.value = '播放';
			
			clearInterval(timer);
			
		}
	}
	//播放时间
	//aInput[1].value = changeTime(oV.duration);
	
	noVoice.onclick = function(){
		
		
		if( oV.muted ){
			
			oV.volume = 1;
			
			//this.value = '静音';
			this.className="cat1";
			oV.muted = false;
			
		}
		else{
			
			oV.volume = 0;
			
			//this.value = '取消静音';
			this.className="cat2"
			oV.muted = true;
			
		}
		
	};
	
	// aInput[4].onclick = function(){
	// 	oV.mozRequestFullScreen();
	// };
	
	
	function nowTime(){
		
		aInput[0].value = changeTime(oV.currentTime);
		
		var scale = oV.currentTime/oV.duration;
		
		oVoe2.style.left = scale * 255 + 'px';
       
       if(scale==0)
       {
       	oGress.style.width=0+'px';
       }
       else
       {
        oGress.style.width=5+scale * 295 + 'px';
       }
		
	}
	
	
	function changeTime(iNum){
		
		iNum = parseInt( iNum );
		
		var iH = toZero(Math.floor(iNum/3600));
		var iM = toZero(Math.floor(iNum%3600/60));
		var iS = toZero(Math.floor(iNum%60));
		
		return iH + ':' +iM + ':' + iS;
		
	}
	
	function toZero(num){
		if(num<=9){
			return '0' + num;
		}
		else{
			return '' + num;
		}
	}
	
	
	oVoe2.onmousedown = function(ev){
		var ev = ev || window.event;
		disX = ev.clientX - oVoe2.offsetLeft;
		
		document.onmousemove = function(ev){
			var ev = ev || window.event;
			
			var L = ev.clientX - disX;
			
			if(L<0){
				L = 0;
			}
			else if(L>oVoe1.offsetWidth - oVoe2.offsetWidth){
				L = oVoe1.offsetWidth - oVoe2.offsetWidth;
			}
			
			oVoe2.style.left = L + 'px';
			
			var scale = L/(oVoe1.offsetWidth - oVoe2.offsetWidth);
			
			oV.currentTime = scale * oV.duration;
			
			nowTime();
			
		};
		document.onmouseup = function(){
			document.onmousemove = null;
		};
		return false;
	};
	
	
	oVoe4.onmousedown = function(ev){
		var ev = ev || window.event;
		disX2 = ev.clientX - oVoe4.offsetLeft;
		
		document.onmousemove = function(ev){
			var ev = ev || window.event;
			
			var L = ev.clientX - disX2;
			
			if(L<0){
				L = 0;
			}
			else if(L>oVoe3.offsetWidth - oVoe4.offsetWidth){
				L = oVoe3.offsetWidth - oVoe4.offsetWidth;
			}
			
			oVoe4.style.left = L + 'px';
			
			var scale = L/(oVoe3.offsetWidth - oVoe4.offsetWidth);
			oV.volume = scale;
			if(L==0)
			{
				oGress2.style.width=0+"px";
			}else{
               oGress2.style.width=L+15+'px';
			}
		};
		document.onmouseup = function(){
			document.onmousemove = null;
		};
		return false;
	};
};
    exports.videoShow=videoShow;

	
});