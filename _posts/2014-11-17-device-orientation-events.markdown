---
layout: post
title:  "使用html5的DeviceOrientationEvent制作指南针"
date:   2014-11-17 13:37:38
categories: jekyll update
---

<style type="text/css">
    #guide{ 
        -webkit-transform:rotate(7deg); /* Opera, Chrome, and Safari */
        transform:rotate(7deg);
        position: relative;
        width: 100px;
        height: 100px;
        margin: 0 auto;
        -webkit-border-radius: 50px;
        -moz-border-radius: 50px;
        -ms-border-radius: 50px;
        border-radius: 50px;
        background: green;
    }
    #guide b{
        position: absolute;
        display: block;
        width: 16px;
        height: 16px;
        line-heigth: 16px;
        font-size: 12px;
        text-align: center;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        -ms-border-radius: 8px;
        border-radius: 8px;
        color: #fff;
        background: red;
    }
    #guide b:nth-last-child(1){right: 0;top: 50%; margin-top: -8px; }
    #guide b:nth-last-child(2){left: 0;top: 50%; margin-top: -8px;}
    #guide b:nth-last-child(3){left: 50%; bottom: 0; margin-left: -8px;}
    #guide b:nth-last-child(4){left: 50%; top: 0; margin-left: -8px;}

    </style>

<p>Please open with your mobile, THX!</p>

<dt>
    <dl>alpha:</dl>
    <dd id="alpha"></dd>
</dt>
<dt>
    <dl>beta:</dl>
    <dd id="beta"></dd>
</dt>
<dt>
    <dl>gamma:</dl>
    <dd id="gamma"></dd>
</dt>
<div id="guide" style="-webkit-transform:rotate(0deg)">
    <b>N</b><b>S</b><b>W</b><b>E</b>
</div>

<pre class="pre">
    <code>
if(window.DeviceOrientationEvent){
    console.log('your browser is pefer to support DeviceOrientationEvent');
    window.addEventListener("deviceorientation", findNorth);
    function getOrientationData(evt){
        return {
            'alphaValue': evt.alpha,
            'betaValue': evt.beta,
            'gammaValue': evt.gamma
        }
    }
    function showInScreen(data){
        document.getElementById('alpha').innerHTML = data.alphaValue;
        document.getElementById('beta').innerHTML = data.betaValue;
        document.getElementById('gamma').innerHTML = data.gammaValue;
        document.getElementById('guide').style.cssText = "transform: rotate("+ data.alphaValue + "deg); " + "-webkit-transform: rotate(" + data.alphaValue + "deg)";
    }
    function findNorth(evt){
        var me = evt;
        showInScreen(getOrientationData(me));
    }
}else{
    document.getElementById('guide').innerHTML = 'you need to update your browser!';
}
    </code>
</pre>



<script type="text/javascript">
if(window.DeviceOrientationEvent){
    console.log('your browser is pefer to support DeviceOrientationEvent');
    window.addEventListener("deviceorientation", findNorth);
    function getOrientationData(evt){
        return {
            'alphaValue': evt.alpha,
            'betaValue': evt.beta,
            'gammaValue': evt.gamma
        }
    }
    function showInScreen(data){
        document.getElementById('alpha').innerHTML = data.alphaValue;
        document.getElementById('beta').innerHTML = data.betaValue;
        document.getElementById('gamma').innerHTML = data.gammaValue;
        document.getElementById('guide').style.cssText = "transform: rotate("+ data.alphaValue + "deg); " + "-webkit-transform: rotate(" + data.alphaValue + "deg)";
    }
    function findNorth(evt){
        var me = evt;
        showInScreen(getOrientationData(me));
    }
}else{
    alert('you need to update your browser!');
}
</script>
