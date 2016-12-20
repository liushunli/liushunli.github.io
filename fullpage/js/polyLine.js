
			function LineCharts(canvasId,datas){
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
			LineCharts.prototype = {
				constructor : LineCharts,
				init : function(){ //初始化
					this.can.width = this.w;
					this.can.height = this.h;
					// this.can.style.left = (this.winw-this.w)/2 + "px";
					// this.can.style.top = (this.winh-this.h)/2 + "px";
					this.loop();
				},
				gridLines : function(){ //网格线
					//水平线
					this.ctx.save(); //保持当前绘制路径
					this.ctx.beginPath(); //开始
					this.ctx.strokeStyle = "#c9c8c7";
					this.ctx.translate(0.5,0.5);
					this.ctx.lineWidth = 0.3;
					for(var i=0;i<this.space;i++){
						var y = this.h/this.space*i;
						this.ctx.moveTo(this.startSpace,y);
						this.ctx.lineTo(this.w,y);
						var num = this.h-y-this.startSpace;
						if(num>=0) this.ctx.fillText(num,10,y+10); // y轴文字
					}
						//垂直线
					var step = this.data.data.length;
					for(var i=0;i<=step;i++){
						var x = ((this.w-this.startSpace)/step)*i;
						this.ctx.moveTo(x+this.startSpace,0);
						this.ctx.lineTo(x+this.startSpace,this.h - this.startSpace)
					}
					this.ctx.moveTo(this.w-1,0);
					this.ctx.lineTo(this.w-1,this.h-this.startSpace);
					this.ctx.stroke();//填充
					this.ctx.closePath(); //结束
					this.ctx.restore();//释放
				},
				gridBar : function(per){ //
					
					this.ctx.clearRect(0,0,this.w,this.h); //清空画布
					this.gridLines();
					 //坐标系
					
					//绘制点
					var x = 0,y=0;
					this.ctx.beginPath();
					this.ctx.lineWidth = 2;
					this.ctx.strokeStyle = "#7eafce";
					for(var i in this.data.data){
						var item = this.data.data[i];
						//console.log(item);
						x = ((this.w-this.startSpace)/this.len)*i;
						y = this.h-this.startSpace-(item.data*per);
						//console.log(x);
						this.ctx.moveTo(x+this.startSpace,y);
						this.ctx.arc(x+this.startSpace,y,2,0,2*Math.PI,false);
					}
					this.ctx.stroke();
					this.ctx.closePath();
					
					//点连线
					this.ctx.beginPath();
					this.ctx.strokeStyle = "#99c0d8";
					var row_w = (this.w-this.startSpace)/(this.len);
					for(var i in this.data.data){
						var item = this.data.data[i];
						x = row_w *i + this.startSpace;
						y = this.h-this.startSpace-(item.data*per);
						if(x>=0&&y>=0)
						this.ctx.lineTo(x,y);
					}
					this.ctx.stroke();
					
					//绘制阴影
					this.ctx.lineWidth = 1;
					this.ctx.strokeStyle = "rgba(138,181,209,0)";
					this.ctx.lineTo(x,this.h-this.startSpace);
					this.ctx.lineTo(this.startSpace,this.h-this.startSpace);
					this.ctx.fillStyle = "rgba(138,181,209,0.15)";
					this.ctx.fill();
					this.ctx.stroke();
					this.ctx.closePath();
					
					//绘制数据
					var w = (this.w-this.startSpace)/this.len;
					for(var i=0;i<this.len;i++){
						var item = this.data.data[i];
						this.ctx.fillStyle = "#9ec0d8";
						var num = parseInt(item.data*per);
						if(num>=0)
						//this.ctx.fillText(num,i*w+this.startSpace,this.h-(item.data*per)-this.startSpace-5);//柱图上的数据(-5目的：设置便宜量)
						this.ctx.fillText(item.name,i*w+this.startSpace,this.h-(item.data*per)-this.startSpace-5);
						this.ctx.fillStyle = "#333332";
						this.ctx.fillText(item.name,i*w+this.startSpace-10,this.h-20);//x轴数据
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
				width : 600, //canvas 宽度
				height : 400, //canvas 高度
				data : [ //需要的数据
					{name : "云诺",data : 0},
					{name : "云诺",data : 180},
					{name : "鹰泊",data : 150},
					{name : "鹰泊",data : 190}
				
				]
			};
			var line = new LineCharts("line",datas);
			