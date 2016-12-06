define(function(require,exports,moduel){
	var oMain=document.getElementById('main');
	var oBanner=document.getElementById('banner');
	var oList_top_img=document.getElementById('list_top_img');
	/*焦点图轮播*/
	require('./index.js').changeBanr(oBanner);
    var oReturn=document.getElementById('return');
    require('./index.js').toTop(oReturn);

});
