
			function RadarCharts(canvasId,datas){
				this.data = datas; //数据
				this.can = document.getElementById(canvasId);//canvas对象
				this.ctx = this.can.getContext("2d");//绘图环境
				this.space = 10;//间隔
				this.winw = window.innerWidth;//浏览器宽度
				this.winh = window.innerHeight;//浏览器高度
				this.w = this.data.width;//画布宽度
				this.h = this.data.height;//画布高度
				this.len = this.data.data.length;
				this.startSpace = 40; //开始的距离
			}
			RadarCharts.prototype = {
				constructor : RadarCharts,
				init : function(){ //初始化
					this.can.width = this.w;
					this.can.height = this.h;
					// this.can.style.left = (this.winw-this.w)/2 + "px";
					// this.can.style.top = (this.winh-this.h)/2 + "px";
					this.loop();
				},
				gridLines : function(){ 
					//底部伞骨
					var r=this.w/2;
					var isBule=false;
					this.ctx.save(); //保持当前绘制路径

					for(var s=10;s>0;s--)
					{
						this.ctx.beginPath(); //开始
						for(var i=0;i<this.len;i++)
						{
							var rad=(2*Math.PI/360)*360/this.len*i;
							var x=r+Math.sin(rad)*r*(s/10);
							var y=r+Math.cos(rad)*r*(s/10);
							this.ctx.lineTo(x,y);
						}
						this.ctx.fillStyle=(isBule=!isBule)?'rgba(182,218,111,0.3)' : 'rgba(255,255,255,0.3)';
						this.ctx.fill();

						for(var i=0;i<this.len;i++)
	                     {
	                     	var rad=(Math.PI/180)*360/this.len*i;
	                     	var x=r+Math.sin(rad)*r;
	                     	var y=r+Math.cos(rad)*r;
	                     	this.ctx.moveTo(r,r);
	                     	this.ctx.lineTo(x,y);
	                     	
	                     }
	                     this.ctx.strokeStyle="#e0e0e0";
	                     	this.ctx.stroke();

					

					   this.ctx.closePath(); //结束

					}
					
					this.ctx.restore();//释放
				},
				gridBar : function(per){ //
					
					this.ctx.clearRect(0,0,this.w,this.h); //清空画布
					this.gridLines();
					 //坐标系
					var r=this.w/2;
					
                     this.ctx.beginPath();
                     for(var i=0;i<this.len;i++)
                     {
                     	var rad=(2*Math.PI/360)*(360/this.len)*i;
                     	var item=this.data.data[i];
                     	var x=r+Math.sin(rad)*r*(item.data*per);
                     	var y=r+Math.cos(rad)*r*(item.data*per); 
                     	this.ctx.lineTo(x,y);
                     	this.ctx.strokeStyle="#ff7676";

                     }
                    
					this.ctx.closePath();
					this.ctx.stroke();
					
					//画出圆点
					
					for(var i=0;i<this.len;i++)
					{
						var rad=(2*Math.PI/360)*(360/this.len)*i;
						var item=this.data.data[i];
						var x=r+Math.sin(rad)*r*(item.data*per);
						var y=r+Math.cos(rad)*r*(item.data*per);
						this.ctx.beginPath();//注意写在for里面还是外面有区别的
						this.ctx.fillStyle="#ff7676";
                     	this.ctx.arc(x,y,5,0,2*Math.PI);
                     	this.ctx.fillText(item.name,x+5,y+5);//柱图上的数据(-5目的：设置便宜量)

                     	this.ctx.fill();
                     	this.ctx.closePath();	
					}
					
					

					
					
					
					
					
					
					
				},
				loop:function(){ //运动
					var per = 0; //比例值
					var _this = this;
					var onOff = true;
					up();
					document.onclick = function(){
						onOff ? down() : up();
						onOff = !onOff;
					}
					function up(){ //升
						for(var i=0;i<100;i++){
							setTimeout(function(){
								per+=0.01;
								_this.gridBar(per);
							},i*10);
						}
					};
					function down(){ //降
						for(var i=0;i<100;i++){
							setTimeout(function(){
								per-=0.01;
								_this.gridBar(per);
							},i*10);
						}
					};
				}
			};

			var datas = {
				width : 280, //canvas 宽度
				height : 280, //canvas 高度
				data : [ //需要的数据
					{name : "凝碧初中",data : 0.6},
					{name : "新建中学",data : 0.5},
					{name : "新建高中",data : 0.4},
					{name : "浙江海洋",data : 0.5},
					{name : "宁波大学",data : 0.4}
					
				]
			};
			 var radar = new RadarCharts("radar",datas);
			
