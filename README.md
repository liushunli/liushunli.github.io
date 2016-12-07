# liushunli.github.io
个人博客
===================================

  
项目经验：
-----------------------------------
### 2016/11 -- 2016/12<br />
  仿考拉官网首页-原生js开发<br />
  PC: https://liushunli.github.io/neteasy/ <br />
  
### 2016/11 -- 2016/12
仿考拉详情页放大镜效果-原生js开发 <br />
PC: https://liushunli.github.io/neteasy/detailed <br />

### 2016/9 -- 2016/10 
仿网易手机端rem响应式布局-原生js开发<br />
WebApp: https://liushunli.github.io/neteasy_webapp/<br />

### 2016 -- 2015/09
B区项目-O2O海淘商城
PC： http://www.bqu.com/     <br/>
WebApp： http://www.bqu.com/m <br />

### 2015/11 -- 2015/12
分公司官网-浙江沛宏网络有限公司<br />
PC: http://phsoft.com<br />

### 2016/03 -- 2016/04
生鲜o2o-送你家(外包项目) <br />
http://www.songnij.com <br />
### 案例
    function fnTab(){
		smallImg.src = aImgArr[num];
		bigImg.src = aImgArr2[num];
		for( var i=0; i<aLi.length; i++ ){
			aLi[i].className = '';
		}
		aLi[num].className = 'active';
	   }


### 代码片段高亮显示

``` ev
function bindEvent(obj,ev,fn)
{
```
```ev
if(obj.addEventListener)
	{
		obj.addEventListener(ev,fn,false);
	}
```
```ev
else if(obj.attachEvent)
	{
		obj.attachEvent('on'+ev,fn);
	}
```
```ev
else
	{
       obj['on'+type]=fn;
	}
}
```

