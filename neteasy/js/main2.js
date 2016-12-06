define(function(require,exports,moduel){  
    var tab_li=document.getElementById('tab_li');
    var d_tc_r=document.getElementById('d_tc_nav');
    require('./index.js').tab(tab_li,d_tc_r,'d_tc_tabs','h');
    require('./index.js').bigImg();
    
    require('./index.js').changeImg();
 });