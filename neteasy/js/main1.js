define(function(require,exports,moduel){

	var oMain=document.getElementById('main');
	var oBanner=document.getElementById('banner');
  var btn=document.getElementById("toTop");
  var oSearch=document.getElementById('search');
  var oSearch2=document.getElementById('search2');
  var oBar=document.getElementById('dh_bar');
  var oSerfix=document.getElementById('search_fixed');
  var oHead=document.getElementById('act_love_hd');
  var oLove=document.getElementById('act_love');
  var ortList=require('./move.js').getByClass(oMain,'my_rt_list');
  var lfList=document.getElementById('nav_lf_s2');
  var aLis=lfList.getElementsByTagName('li');
	require('./index.js').changeBg(oMain);/*焦点图轮播*/
	require('./index.js').change(oBanner);
  require('./index.js').showText(oSearch,'在千万海外商品中搜索');//搜索框文字显示
  require('./index.js').showText(oSearch2,'在千万海外商品中搜索');//搜索框文字显示
  require('./index.js').showImg(oMain);  //图片预加载
  require('./index.js').detailTop();//导航定位效果
  require('./index.js').tab(oHead,oLove,'act_like','love_cur');//商品tab切换
  require('./index.js').toTop(btn);//返回顶部
  require('./index.js').daoJs();//倒计时
  setInterval( require('./index.js').daoJs, 1000 );//倒计时
  require('./move.js').bindEvent(window,'scroll',function(){
        require('./index.js').showBar(oBar);//两边悬浮导航出现
        require('./index.js').showBar(oSerfix);//顶部搜索框
        require('./index.js').scrollClass();//左边导航随着滚动条滚动加上灰色背景
   });
  for(var i=0;i<ortList.length;i++)
  {
    require('./index.js').changeList(ortList[i]);/*s商品列表页面的商品自动切换*/
  }
    /*s导航下拉菜单显示*/
  for(var i=0;i<aLis.length;i++)
    {
      require('./index.js').show(aLis[i]);
    }
 
});
