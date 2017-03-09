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
		$('.J-items-3').css({"bottom":-(top+50)});
		}
});
/**判断是否为移动端浏览器***/
function checkMobile(){    
    var isiPad = navigator.userAgent.match(/iPad/i) != null;    
    if(isiPad){    
        return false;    
    }    
    var isMobile=navigator.userAgent.match(/iphone|android|phone|mobile|wap|netfront|x11|java|opera mobi|opera mini|ucweb|windows ce|symbian|symbianos|series|webos|sony|blackberry|dopod|nokia|samsung|palmsource|xda|pieplus|meizu|midp|cldc|motorola|foma|docomo|up.browser|up.link|blazer|helio|hosin|huawei|novarra|coolpad|webos|techfaith|palmsource|alcatel|amoi|ktouch|nexian|ericsson|philips|sagem|wellcom|bunjalloo|maui|smartphone|iemobile|spice|bird|zte-|longcos|pantech|gionee|portalmmm|jig browser|hiptop|benq|haier|^lct|320x320|240x320|176x220/i)!= null;    
    if(isMobile){    
        return true;    
    }    
    return false;    
};
if(checkMobile()){
         window.location.href = "http://www.nimini.com/appDownload20160628";
    }