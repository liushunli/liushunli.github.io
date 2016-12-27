
/*========================================================*/    
/* canvas线条自动滚动
/*========================================================*/


  function autoCanvas()
  {
   var iTimer=null;
    var s = document.getElementById("canvas");
    var h = s.getContext("2d");
    var A = Math.PI / 180;
     var a = [{
        angle: 0,//角度
        a: 40,//顶部x宽度
        b: 10,
        c: 100//底部点
    },
    {
        angle: 180,
        a: 40,
        b: 10,
        c: 100//
    },
    {
        angle: 90,
        a: 80,
        b: 15,
        c: 60 //倒数第二行的点高
    },
    {
        angle: 270,
        a: 80,
        b: 15,
        c: 60
    },
    {
        angle: 45,
        a: 140,
        b: 20,
        c: 0
    },
    {
        angle: 135,
        a: 140,
        b: 20,
        c: 0
    },
    {
        angle: 225,
        a: 140,
        b: 20,
        c: 0
    },
    {
        angle: 315,
        a: 140,
        b: 20,
        c: 0
    },
    {
        angle: 270,
        a: 80,
        b: 15,
        c: -60
    },
    {
        angle: 90,
        a: 80,
        b: 15,
        c: -60
    },
    {
        angle: 180,
        a: 40,
        b: 10,
        c: -100
    },
    {
        angle: 0,
        a: 40,
        b: 10,
        c: -100
    }];
    var d = [];
    for (var z = 0; z < a.length; z++) {
        var n = {
            x: a[z].a * Math.cos(A * a[z].angle),
            y: a[z].b * Math.sin(A * a[z].angle) + a[z].c
        };
        d.push(n);
    }
    var r = [[1, 2, 3, 4, 7], [2, 3, 5, 6], [4, 5], [6, 7], [5, 7, 9, 11], 
    [6, 9, 10], [7, 8, 10], [8, 11], [10, 11], [10, 11], [11]];
    var p = null;
    var o = null;
    //线条自动滚动
    iTimer = setInterval(function() {
        q();
    },
    60);
    //线条自动滚动
    setInterval(function() {
        for (var x = 0; x < a.length; x++) {
            a[x].angle += 2;
            var t = {
                x: a[x].a * Math.cos(A * a[x].angle),
                y: a[x].b * Math.sin(A * a[x].angle) + a[x].c
            };
            d[x] = t
        }
    },
    60);
    //画出线条
    function q(y) {
        h.clearRect(0, 0, 500, 500);
        for (var x = 0; x < d.length; x++) {
            h.save();
            h.translate(250, 190);
            h.beginPath();
            h.arc(d[x].x, d[x].y, 3, 0, 2 * Math.PI, false);
            h.shadowOffsetX = 0;
            h.shadowOffsetY = 0;
            h.shadowBlur = 20;
            h.fillStyle = "rgba(255,255,255,.9)";
            h.fill();
            h.restore()
        }
        for (var x = 0; x < r.length; x++) {
            for (var t = 0; t < r[x].length; t++) {
                h.save();
                h.translate(250, 190);
                h.beginPath();
                h.moveTo(d[x].x, d[x].y);
                h.lineTo(d[r[x][t]].x, d[r[x][t]].y);
                h.strokeStyle = "rgba(255,255,255,.8)";
                h.stroke();
                h.restore()
            }
        }
        
    }


  }
   autoCanvas();  