define(function(require,exports,moudel){
/*========================================================*/    
/* 自制滚动条
/*========================================================*/

    function dragDown(btn,oCon,oLi)
    {  
        var btnBg=btn.parentNode;
        var oBgHeight=btnBg.offsetHeight;
        var oHeight=btn.offsetHeight;
        var iMaxTop=oBgHeight-oHeight;
        var oConBg=oCon.parentNode;
        var F=oCon.offsetHeight-oConBg.offsetHeight;
        var disH=0;
        btn.onmousedown=function(ev)
        {
            var ev=ev||event;
            disH=ev.clientY-this.offsetTop;
            document.onmousemove=function(ev)
            {
                var ev=ev||event;
                var T=ev.clientY-disH;
                if(T<0)
                {
                    T=0;
                }else if(T>iMaxTop)
                {
                    T=iMaxTop;
                }

                btn.style.top=T+'px';
                var J=T/iMaxTop;
                
               oCon.style.top=-F*J+'px';
               for (var M = 0; M < oLi.length; M++) {
                        if ((oLi[M].offsetTop - (F * J)) > -80 && (oLi[M].offsetTop - (F * J)) < 20) {
                            var L = 80 - F * J + oLi[M].offsetTop - 50;
                            var Q = 100 - (F * J - oLi[M].offsetTop + 20) * 0.1;
                            oLi[M].style.opacity = L / 50;
                            if (Q < 90) {
                                Q = 90
                            }
                            oLi[M].style.transform = "scale(" + Q / 100 + ")"
                        }
                        if ((oLi[M].offsetTop - (F * J)) < 371 && (oLi[M].offsetTop - (F * J)) > 271) {
                            var O = 370 - oLi[M].offsetTop + F * J - 60;
                            var N = 100 - ((oLi[M].offsetTop - F * J) - 270) * 0.1;
                            oLi[M].style.opacity = O / 40;
                            if (N < 95) {
                                N = 95
                            }
                            oLi[M].style.transform = "scale(" + N / 100 + ")"
                        }
                        if ((oLi[M].offsetTop - (F * J)) <= 271 && (oLi[M].offsetTop - (F * J)) >= 20) {
                            oLi[M].style.opacity = 1;
                            oLi[M].style.transform = "scale(1)"
                        }
                        if ((oLi[M].offsetTop - (F * J)) <= -80 || (oLi[M].offsetTop - (F * J)) >= 371) {
                            oLi[M].style.opacity = 0;
                            oLi[M].style.transform = "scale(0)"
                        }
                    }
                    console.log(oLi[1].offsetTop);

            }
            document.onmouseup=function()
            {
                document.onmousemove=document.onmouseup=null;
            }
            return false;

        }
    }
     exports.dragDown=dragDown;
    
//鼠标滚动效果
   function mouWheel(btn,oCon,oLi) {
        var J = oCon.offsetHeight - oCon.parentNode.offsetHeight;
        var i = btn.parentNode.scrollHeight - btn.clientHeight;
        if (J < 0) {
            return false
        }
        require('./move.js').bindEvent(oCon, "mousewheel", F);
        require('./move.js').bindEvent(oCon, "DOMMouseScroll", F);
        var x = -oCon.offsetTop;
        function F(S) {
            var S = S || event;
            var R = true;
            if (S.wheelDelta) {
                R = S.wheelDelta > 0 ? false: true;
            } else {
                R = S.detail > 0 ? true: false;
            }
            if (R) {
                x += 10;
                if (x > J) {
                    x = J
                }
            } else {
                x -= 10;
                if (x < 0) {
                    x = 0
                }
            }
            var K = x / J;
            var L = K * i;
            oCon.style.top = -x + "px";
            btn.style.top = L + "px";
            for (var M = 0; M < oLi.length; M++) {
                if ((oLi[M].offsetTop - x) <= -100 || (oLi[M].offsetTop - x) >= 370) {
                    oLi[M].style.opacity = 0;
                }
                if ((oLi[M].offsetTop - x) > -100 && (oLi[M].offsetTop - x) < 0) {
                    var N = 100 - x + oLi[M].offsetTop - 60;
                    var Q = 100 - (x - oLi[M].offsetTop) * 0.1;
                    oLi[M].style.opacity = N / 40;
                    if (Q < 95) {
                        Q = 95;
                    }
                    oLi[M].style.transform = "scale(" + Q / 100 + ")";
                }
                if ((oLi[M].offsetTop - x) < 370 && (oLi[M].offsetTop - x) > 270) {
                    var P = 370 - oLi[M].offsetTop + x - 60;
                    var O = 100 - ((oLi[M].offsetTop - x) - 270) * 0.1;
                    oLi[M].style.opacity = P / 40;
                    if (O < 95) {
                        O = 95;
                    }
                    oLi[M].style.transform = "scale(" + O / 100 + ")"
                }
                if ((oLi[M].offsetTop - x) <= 271 && (oLi[M].offsetTop - x) >= 0) {
                    oLi[M].style.opacity = 1;
                    oLi[M].style.transform = "scale(1)";
                }
            }
            if (x == J) {
                oCon.removeEventListener("mousewheel", F, false);
                oCon.removeEventListener("DOMMouseScroll", F, false);
                require('./move.js').bindEvent(oCon, "mousewheel", t);
                require('./move.js').bindEvent(oCon, "DOMMouseScroll", t);
                function t(T) {
                    if (T.preventDefault) {
                        T.preventDefault();
                    }
                    T.stopPropagation();
                    return false
                }
                setTimeout(function() {
                    oCon.removeEventListener("mousewheel", t, false);
                    oCon.removeEventListener("DOMMouseScroll", t, false);
                    require('./move.js').bindEvent(oCon, "mousewheel", F);
                    require('./move.js').bindEvent(oCon, "DOMMouseScroll", F)
                },
                100);
            }
            if (S.preventDefault) {
                S.preventDefault();
            }
            S.stopPropagation();
            return false;
        }
    }

    //鼠标滚动
    exports.mouWheel=mouWheel;

});