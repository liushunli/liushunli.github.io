$(function(){
	$('#dowebok').fullpage({
		'navigation': true,
		afterLoad: function(){	
	          $('.J-point-prev').on("click",function(){
					$.fn.fullpage.moveSectionUp();
				});	     
		}
	});
	$(document).on('click', '.J-point-next', function(){
	  $.fn.fullpage.moveSectionDown();
	});

	var viewH=$(window).height(),top=(viewH-600)/2;
	if(top>0){
		$('.J-point-next').css({"bottom":-top/2});
		$('.J-point-prev').css({"bottom":-top/2});
		}
});