
			function ColumnCharts(canvasId,datas){
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
			ColumnCharts.prototype = {
				constructor : ColumnCharts,
				init : function(){ //初始化
					this.can.width = this.w;
					this.can.height = this.h;
					// this.can.style.left = (this.winw-this.w)/2 + "px";
					// this.can.style.top = (this.winh-this.h)/2 + "px";
				},
				gridLines : function(){ //网格线
					//水平线
					this.ctx.save(); //保持当前绘制路径
					this.ctx.beginPath(); //开始
					this.ctx.strokeStyle = "#bdd0ce";
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
					this.ctx.moveTo(this.startSpace,0);
					this.ctx.lineTo(this.startSpace,this.h - this.startSpace);
					
					this.ctx.stroke();//填充
					this.ctx.closePath(); //结束
					this.ctx.restore();//释放
				},
				gridBar : function(per){ //柱形图 及文字 
					this.ctx.clearRect(0,0,this.w,this.h);
					this.gridLines();
					this.ctx.beginPath();
					var w = (this.w-this.startSpace)/this.len;
					
					// for(var i=0;i<this.len;i++){
					// 	var item = this.data.data[i];
					// 	//console.log(item.data);
					// 	this.ctx.fillStyle = item.color ? item.color : "aquamarine";
					// 	this.ctx.fillRect(i*w+this.startSpace+10,this.h-this.startSpace,w-10,-(item.data*per));
					// };
					
					for(var i=0;i<this.len;i++){ //绘制数据
						var item = this.data.data[i];
						this.ctx.fillStyle = "rgba(191,210,208,1)";
						var num = parseInt(item.data*per);
						this.ctx.fillRect(i*w+this.startSpace+10,this.h-this.startSpace,w-20,-(item.data*per));
						if(num>=0)
						//this.ctx.fillText(num,i*w+this.startSpace+(w/3),this.h-(item.data*per)-this.startSpace-5);//柱图上的数据(-5目的：设置便宜量)
						this.ctx.fillText(item.name,i*w+this.startSpace+(w/3),this.h-(item.data*per)-this.startSpace-5);//柱图上的数据(-5目的：设置便宜量)

						this.ctx.fillStyle="#333332";
						this.ctx.fillText(item.name,i*w+this.startSpace+(w/3),this.h-20);//x轴数据
					};
					this.ctx.closePath();
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
				width : 530, //canvas 宽度
				height : 300, //canvas 高度
				data : [ //需要的数据
					{name : "js",data : 90},
					{name : "jquery",data : 70},
					{name : "css",data : 80},
					{name : "html",data : 85},
					{name : "css3",data : 122},
					{name : "firbug",data : 80},
					{name : "rem",data : 60},
					{name : "canvas",data : 68},
					{name : "sea.js",data : 85},
					{name : "grunt.js",data : 75},
					{name : "handlebars.js",data : 90}
				]
			};
			var colum = new ColumnCharts("cloum",datas);
			