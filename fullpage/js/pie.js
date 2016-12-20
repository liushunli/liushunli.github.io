function PieCharts(canvasId,datas){
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
			PieCharts.prototype = {
				constructor : PieCharts,
				init : function(){ //初始化
					this.can.width = this.w;
					this.can.height = this.h;
					// this.can.style.left = (this.winw-this.w)/2 + "px";
					// this.can.style.top = (this.winh-this.h)/2 + "px";
					this.loop();
				},
				gridLines : function(){ //底部圆层
					
					var r=this.w/2;
					this.ctx.save(); //保持当前绘制路径
					this.ctx.beginPath(); //开始
					this.ctx.strokeStyle = "#eee";
					this.ctx.fillStyle="#eee";
					
					this.ctx.lineWidth = 1;
					this.ctx.arc(r,r,r,0,2*Math.PI,false);
					
					this.ctx.fill();//填充
					this.ctx.stroke();
					this.ctx.closePath(); //结束
					this.ctx.restore();//释放
				},
				gridBar : function(per){ //
					
					this.ctx.clearRect(0,0,this.w,this.h); //清空画布
					this.gridLines();
					 //坐标系
					var r=this.w/2;
					//绘制弧度
					var colors=['#ebd3ce','bed1cf','#f3ba8a','#f8bfb1','#8fc1da'];
					var sAngle=1.5*Math.PI;
					var eAngle=0;
					var aAngle=Math.PI*2;
					//画出图形
					for(var i=0;i<this.len;i++)
					{	
					var item=this.data.data[i];
					var color = item.color || ( item.color = colors.pop() );
                    // console.log(color);
                     eAngle=sAngle+aAngle*item.data*per;
                     //console.log(eAngle);
                     this.ctx.beginPath();
					this.ctx.fillStyle=color;
					this.ctx.strokeStyle=color;
					this.ctx.lineWidth=0.1;
					this.ctx.moveTo(r,r);
					this.ctx.arc(r,r,r,sAngle,eAngle,false);

				    this.ctx.fill();
					this.ctx.stroke();
					sAngle = eAngle;
					

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
				width : 140, //canvas 宽度
				height : 140, //canvas 高度
				data : [ //需要的数据
					{name : "跳舞",data : 0.38,color:'#ff7676'},
					{name : "游泳",data : 0.22,color:'#a5c9de'},
					{name : "看书",data : 0.12,color:'#d99e93'},
					{name : "影视",data : 0.28,color:'#d6ce95'},
					// {name : "jq",data : 0.16,color:'#c0d3d1'}
					
				]
			};
			 var pie = new PieCharts("pie",datas);
			