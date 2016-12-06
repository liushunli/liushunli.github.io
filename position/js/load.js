define(function(require,exports,module){
	function load(){
        var oProMain=document.getElementById('progressMian');
		var oPro1 = document.getElementById('progressBox');
		var oPro2 = document.getElementById('progressBar');
		var oPro3 = document.getElementById('progressText');
        var clintHeight=document.documentElement.clientHeight;
        var allWidth = parseInt(require('./move.js').getStyle(oPro1,'width'));
		var iNow = 0;
		var timer = setInterval(function(){
		
			if(iNow==100){
				clearInterval(timer);
			}
			else{
				iNow += 1;
				
				progressFn(iNow);
			}	
		
		},10);

		
		function progressFn(cent){

			oPro2.innerHTML = cent + '%';
			oPro3.innerHTML = cent + '%';
			oPro2.style.clip = 'rect(0px, '+ cent/100 * allWidth +'px, 40px, 0px)';		
		};

		
        oProMain.style.height=clintHeight+'px';
        oPro1.style.top=(clintHeight-oPro1.offsetHeight)/2+'px';

		setTimeout(function(){
	         require('./move.js').startMove(oProMain,{opacity:0},function(){
	         	oProMain.style.height=0+'px';
	         });
	         require('./move.js').startMove(oPro1,{opacity:0},function(){
	         	oPro1.style.height=0+'px';
	         });
		},1500);


		
	};
	exports.load=load;	
});