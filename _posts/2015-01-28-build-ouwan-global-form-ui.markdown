---
layout: post
title:  "build www.ouwan.com global form element"
date:   2015-01-28 13:37:28
categories: jekyll update
---

<style type="text/css">
@charset "UTF-8";
/*
 * owan-web version 2.0
 * Author: caiweiguo@youmi.net OR 90arther@gmail.com
 * Instruction: /docs/front-end.rm
 * constructor: global: css style
 *                      atom css
 *                      form
 *                      button
 *                      fluid grid system
 ***************************************************************/


/*
 * =css style
 ***************************************************************/
body{font:12px/1.7 "Microsoft YaHei","微软雅黑",simSun,Arial;color:#616161;background: #fafafa;}

/*
 * =atom css
 ***************************************************************/
/*文字排版*/
.f0{font-size:0;}
.f12{font-size:12px}
.f13{font-size:13px}
.f14{font-size:14px}
.f16{font-size:16px}
.f20{font-size:20px}
.f24{font-size:24px}
.f26{font-size:26px}
.f28{font-size:28px}
.f30{font-size:30px}
.f32{font-size:32px}
.f36{font-size:36px}
.fb{font-weight:bold}
.fn{font-weight:normal}
.t2{text-indent:2em}
.lh100{line-height:100%}
.lh150{line-height:150%}
.lh180{line-height:180%}
.lh200{line-height:200%}
.lh240{line-height:240%}
.unl{text-decoration:underline;}
.no_unl{text-decoration:none;}

/*定位*/
.tl{text-align:left}
.tc{text-align:center}
.tr{text-align:right}
.bc{margin-left:auto;margin-right:auto;}
.fl{float:left;display:inline;}
.fr{float:right;display:inline;}
.cb{clear:both}
.cl{clear:left}
.cr{clear:right}
.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
.clearfix{display:inline-block}* html .clearfix{height:1%}.clearfix{display:block}
.vm{vertical-align:middle}
.pr{position:relative}
.pa{position:absolute}
.abs-right{position:absolute;right:0}
.abs-topright{position:absolute;right:0;top:0}
.zoom{zoom:1}
.hidden{visibility:hidden}
.none{display:none !important;}
.overflowh{overflow: hidden;}
.db{display:block}

/*长度高度*/
.w10{width:10px}
.w20{width:20px}
.w30{width:30px}
.w40{width:40px}
.w50{width:50px}
.w60{width:60px}
.w70{width:70px}
.w80{width:80px}
.w90{width:90px}
.w100{width:100px}
.w128{width:128px}
.w200{width:200px}
.w250{width:250px}
.w300{width:300px}
.w400{width:400px}
.w500{width:500px}
.w600{width:600px}
.w700{width:700px}
.w800{width:800px}
.w{width:100%}
.h30{height:30px}
.h50{height:50px}
.h80{height:80px}
.h100{height:100px}
.h128{height:128px}
.h200{height:200px}
.h300{height:300px}
.h400{height:400px}
.h{height:100%}

/*边距*/
.m8{margin:10px}
.m10{margin:10px}
.m15{margin:15px}
.m20{margin:20px}
.m30{margin:30px}
.m40{margin:40px}
.mt5{margin-top:5px}
.mt10{margin-top:10px}
.mt15{margin-top:15px}
.mt20{margin-top:20px}
.mt30{margin-top:30px}
.mt35{margin-top:35px}
.mt40{margin-top:40px}
.mt50{margin-top:50px}
.mt60{margin-top:60px}
.mt100{margin-top:100px}
.mb10{margin-bottom:10px}
.mb15{margin-bottom:15px}
.mb20{margin-bottom:20px}
.mb30{margin-bottom:30px}
.mb50{margin-bottom:50px}
.mb100{margin-bottom:100px}
.ml5{margin-left:5px}
.ml10{margin-left:10px}
.ml15{margin-left:15px}
.ml20{margin-left:20px}
.ml30{margin-left:30px}
.ml35{margin-left:35px}
.ml50{margin-left:50px}
.ml80{margin-left:80px}
.ml100{margin-left:100px}
.ml110{margin-left:110px}
.ml150{margin-left:150px}
.mr5{margin-right:5px}
.mr10{margin-right:10px}
.mr15{margin-right:15px}
.mr20{margin-right:20px}
.mr30{margin-right:30px}
.mr50{margin-right:50px}
.mr80{margin-right:80px}
.mr100{margin-right:100px}

/*内边距*/
.p10{padding:10px;}
.p15{padding:15px;}
.p20{padding:20px;}
.p30{padding:30px;}
.p50{padding:50px;}
.pt5{padding-top:5px}
.pt10{padding-top:10px}
.pt15{padding-top:15px}
.pt20{padding-top:20px}
.pt30{padding-top:30px}
.pt40{padding-top:40px}
.pt50{padding-top:50px}
.pt60{padding-top:60px}
.pb5{padding-bottom:5px}
.pb10{padding-bottom:10px}
.pb15{padding-bottom:15px}
.pb20{padding-bottom:20px}
.pb30{padding-bottom:30px}
.pb40{padding-bottom:40px}
.pb50{padding-bottom:50px}
.pb100{padding-bottom:100px}
.pl5{padding-left:5px}
.pl10{padding-left:10px}
.pl15{padding-left:15px}
.pl20{padding-left:20px}
.pl25{padding-left:25px}
.pl30{padding-left:30px}
.pl40{padding-left:40px}
.pl50{padding-left:50px}
.pl100{padding-left:100px}
.pr5{padding-right:5px}
.pr10{padding-right:10px}
.pr15{padding-right:15px}
.pr20{padding-right:20px}
.pr30{padding-right:30px}
.pr50{padding-right:50px}
.pr100{padding-right:100px}


/*
 * =form
 * |- base style
 * |- Inline form
 * |- Horizontal form
 * |- Control sizing
 */
.form-group {
    margin-bottom: 15px;
}
.form-label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: normal;
    cursor: pointer;
}
.form-control {
    display: block;
    margin-bottom: 10px;
    padding: 2px 0;
    width: 100%;
    height: 30px;
    font-size: 14px;
    text-indent: 1em;
    line-height: 20px;
    color: #3f3f3f;
    vertical-align: middle;
    background-color: #fff;
    border: 1px solid #d3d3d3;
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}
.form-checkbox,
.form-radio {
    position: relative;
    display: block;
    margin-top: 10px;
    margin-bottom: 10px;
}
.form-checkbox label,
.form-radio label {
    min-height: 20px;
    padding-left: 20px;
    margin-bottom: 0;
    font-weight: 400;
    cursor: pointer;
}
.form-checkbox input[type=checkbox],
.form-checkbox-inline input[type=checkbox],
.form-radio input[type=radio],
.form-radio-inline input[type=radio] {
    position: absolute;
    margin: 4px 0 0;
    margin-top: 4px \9;
    margin-left: -20px;
    line-height: normal;
}
.form-help-block {
    display: block;
    margin-top: 5px;
    margin-bottom: 10px;
    color: #737373;
}
.form-control-static {
    padding-top: 7px;
    padding-bottom: 7px;
    margin-bottom: 0;
}
/* =Inline form
 */
.form-inline .form-group {
    display: inline-block;
    margin-bottom: 0;
    vertical-align: middle;
}
.form-inline .form-control {
    display: inline-block;
    width: auto;
    vertical-align: middle;
    margin: 5px 0;
}
.form-sr-only {
    display: none;
}
.form-inline .form-checkbox,
.form-inline .form-radio {
    display: inline-block;
    margin-top: 0;
    margin-bottom: 0;
    vertical-align: middle;
}
.form-checkbox-inline,
.form-radio-inline {
    display: inline-block;
    margin: auto 10px 0 auto;
    padding-left: 20px;
    font-weight: 400;
    vertical-align: middle;
    cursor: pointer;
}
/*
 * =Horizontal form
 */
.form-horizontal .form-label {
    padding-top: 7px;
    margin-bottom: 0;
    text-align: right;
}

/*
 * =Control Size
 */
.form-control-lg {
    height: 46px;
    padding: 10px 0;
    font-size: 18px;
    line-height: 1.3333333;
}
select.form-control-lg {
    height: 46px;
    line-height: 46px;
}
.form-control-sm {
    height: 30px;
    padding: 5px 0;
    font-size: 12px;
    line-height: 1.5;
}
select.form-control-sm {
    height: 30px;
    line-height: 30px;
}
/*
 * =button
 * |- btn
 * |- style
 *      |- btn-style1
 *      |- btn-style2
 *      |- btn-style3
 *      |- btn-style4
 *      |- btn-style5
 *      |- ...
 * |- status
 *      |- active
 *      |- disabled
 * |- size
 *      |- btn-xl
 *      |- btn-lg
 *      |- btn-sm
 *      |- btn-xs
 * |- animation
 *      |- action
 ********************************************/
.btn {
    display: inline-block;
    padding: 6px 16px;
    margin-bottom: 0;
    width: auto;
    height: auto;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    -ms-transition: all .5s;
    -o-transition: all .5s;
    -moz-transition: all .5s;
    -webkit-transition: all .5s;
    transition: all .5s;
}
/*
 * =button style
 ********************************************/
.btn-style1 {
    background-color: #9cdbff;
    border: 1px solid #0077bb;
    color: #0077bb;
}
.btn-style1:hover,
.btn-style1:active,
.btn-style1.active {
    background-color: #0093e8;
    border: 1px solid #0077bb;
    color: #fff;
}
.btn-style2 {
    background-color: #fff;
    border: 1px solid #d4d4d4;
    color: #3f3f3f;
}
.btn-style2:hover,
.btn-style2:active,
.btn-style2.active {
    background-color: #00a2ff;
    border: 1px solid #0077bb;
    color: #fff;
}
.btn-style3 {
    background-color: #fff;
    border: 1px solid #d4d4d4;
    color: #3f3f3f;
}
.btn-style3:hover,
.btn-style3:active,
.btn-style3.active {
    background-color: #20ca90;
    border: 1px solid #0fb47c;
    color: #fff;
}
.btn-style4 {
    background-color: #fff;
    border: 1px solid #d4d4d4;
    color: #3f3f3f;
}
.btn-style4:hover,
.btn-style4:active,
.btn-style4.active {
    background-color: #ff8711;
    border: 1px solid #da730e;
    color: #fff;
}
.btn-style5 {
    background-color: transparent;
    border: 1px solid #fff;
    color: #fff;
}
.btn-style5:hover,
.btn-style5:active,
.btn-style5.active {
    background-color: #0093e8;
    border: 1px solid #0077bb;
    color: #fff;
}
.btn-style6 {
    background-color: transparent;
    border: 1px solid #fff;
    color: #fff;
}
.btn-style6:hover,
.btn-style6:active,
.btn-style6.active {
    background-color: #0ab078;
    border: 1px solid #08a26e;
    color: #fff;
}
.btn-style7 {
    background-color: transparent;
    border: 1px solid #fff;
    color: #fff;
}
.btn-style7:hover,
.btn-style7:active,
.btn-style7.active {
    background-color: #ee7e35;
    border: 1px solid #d86d27;
    color: #fff;
}
.btn-style8 {
    background-color: #00a2ff;
    border: 1px solid #0077bb;
    color: #fff;
}
.btn-style8:hover,
.btn-style8:active,
.btn-style8.active {
    background-color: #0093e8;
    border: 1px solid #0077bb;
    color: #fff;
}
.btn-style9 {
    background-color: #20ca90;
    border: 1px solid #0fb47c;
    color: #fff;
}
.btn-style9:hover,
.btn-style9:active,
.btn-style9.active {
    background-color: #0ab078;
    border: 1px solid #08a26e;
    color: #fff;
}
.btn-style10 {
    background-color: #ff8711;
    border: 1px solid #da730e;
    color: #fff;
}
.btn-style10:hover,
.btn-style10:active,
.btn-style10.active {
    background-color: #ee7e35;
    border: 1px solid #e4732a;
    color: #fff;
}
.btn-style11 {
    background-color: #fff;
    border: 1px solid transparent;
    color: #3f3f3f;
}
.btn-style11:hover,
.btn-style11:active,
.btn-style11.active {
    background-color: #00a2ff;
    border: 1px solid transparent
    color: #fff;
}
.btn-style12 {
    background-color: #00a2ff;
    border: 1px solid transparent;
    color: #fff;
}
.btn-style12:hover,
.btn-style12:active,
.btn-style12.active {
    background-color: #0093e8;
    border: 1px solid transparent;
    color: #fff;
}
/* =button size
 ********************************************/
.btn-xl {
    padding: 10px 36px;
    font-size: 18px;
    line-height: 1.33;
}
.btn-lg {
    padding: 10px 16px;
    font-size: 18px;
    line-height: 1.33;
}
.btn-sm {
    padding: 5px 14px;
    font-size: 12px;
    line-height: 1.5;
}
.btn-xs {
    padding: 1px 5px;
    font-size: 12px;
    line-height: 1.5;
}
.btn-block {
    box-sizing: border-box;
    display: block;
    width: 100%;
}

/*
 * old button
 */
.btn-primary {
    display: block;
    color: #0077bb;
    background: #9cdbff;
    border: 1px solid #0077bb;
    -ms-transition: all .5s;
    -o-transition: all .5s;
    -moz-transition: all .5s;
    -webkit-transition: all .5s;
    transition: all .5s;
}
.btn-primary:hover {
    cursor: pointer;
    text-decoration: none !important;
    color: #fff;
    background: #0093e8;
    border: 1px solid #0077bb;
}
.btn-success {
    display: block;
    color: #fff;
    background: #20ca90;
    border: 1px solid #0fb47c;
    -ms-transition: all .5s;
    -o-transition: all .5s;
    -moz-transition: all .5s;
    -webkit-transition: all .5s;
    transition: all .5s;
}
.btn-success:hover {
    cursor: pointer;
    color: #fff;
    background: #12bd83;
}
.btn-unavaible {
    display: block;
    text-decoration: none;
    color: #000;
    background-color: #ccc;
}
.btn-primary1 {
    display: block;
    text-decoration: none;
    color: #fff;
    background: #00a2ff;
    -ms-transition: all .5s;
    -o-transition: all .5s;
    -moz-transition: all .5s;
    -webkit-transition: all .5s;
    transition: all .5s;
}
.btn-primary1:hover {
    cursor: pointer;
    background: #0090E2;
}
.btn-white {
    display: block;
    text-decoration: none;
    color: #000;
    background: #fff;
    border: 1px solid #d8d8d8;
        -ms-transition: all .5s;
         -o-transition: all .5s;
       -moz-transition: all .5s;
    -webkit-transition: all .5s;
            transition: all .5s;
}
.btn-white:hover {
    cursor: pointer;
    display: block;
    text-decoration: none;
    color: #fff;
    background-color: #01a1ff;
    border: 1px solid #0276bf;
}
.btn-white-blue2 {
    display: block;
    text-decoration: none;
    text-align: center;
    color: #3f3f3f;
    border: 1px solid #a2a2a2;
    background: transparent;
        -ms-transition: all .5s;
         -o-transition: all .5s;
       -moz-transition: all .5s;
    -webkit-transition: all .5s;
            transition: all .5s;
}
.btn-white-blue2:hover{
    cursor: pointer;
    text-decoration: none !important;
    color: #fff;
    background-color: #0090e2;
    border: 1px solid #0086d2;
}
.btn-orange {
    display: block;
    text-align: center;
    text-decoration: none;
    color: #fff;
    border: 1px solid #da730e;
    background: #ff9956;
        -ms-transition: all .5s;
         -o-transition: all .5s;
       -moz-transition: all .5s;
    -webkit-transition: all .5s;
            transition: all .5s;
}
.btn-orange:hover {
    cursor: pointer;
    text-decoration: none !important;
}
/*
 * =fluid grid system
 */
.row-fluid {
  width: 100%;
  *zoom: 1;
}

.row-fluid:before,
.row-fluid:after {
  display: table;
  line-height: 0;
  content: "";
}

.row-fluid:after {
  clear: both;
}

.row-fluid [class*="span"] {
  display: block;
  float: left;
  width: 100%;
  min-height: 30px;
  margin-left: 2.127659574468085%;
  *margin-left: 2.074468085106383%;
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}

.row-fluid [class*="span"]:first-child {
  margin-left: 0;
}

.row-fluid .controls-row [class*="span"] + [class*="span"] {
  margin-left: 2.127659574468085%;
}

.row-fluid .span12 {
  width: 100%;
  *width: 99.94680851063829%;
}

.row-fluid .span11 {
  width: 91.48936170212765%;
  *width: 91.43617021276594%;
}

.row-fluid .span10 {
  width: 82.97872340425532%;
  *width: 82.92553191489361%;
}

.row-fluid .span9 {
  width: 74.46808510638297%;
  *width: 74.41489361702126%;
}

.row-fluid .span8 {
  width: 65.95744680851064%;
  *width: 65.90425531914893%;
}

.row-fluid .span7 {
  width: 57.44680851063829%;
  *width: 57.39361702127659%;
}

.row-fluid .span6 {
  width: 48.93617021276595%;
  *width: 48.88297872340425%;
}

.row-fluid .span5 {
  width: 40.42553191489362%;
  *width: 40.37234042553192%;
}

.row-fluid .span4 {
  width: 31.914893617021278%;
  *width: 31.861702127659576%;
}

.row-fluid .span3 {
  width: 23.404255319148934%;
  *width: 23.351063829787233%;
}

.row-fluid .span2 {
  width: 14.893617021276595%;
  *width: 14.840425531914894%;
}

.row-fluid .span1 {
  width: 6.382978723404255%;
  *width: 6.329787234042553%;
}

.row-fluid .offset12 {
  margin-left: 104.25531914893617%;
  *margin-left: 104.14893617021275%;
}

.row-fluid .offset12:first-child {
  margin-left: 102.12765957446808%;
  *margin-left: 102.02127659574467%;
}

.row-fluid .offset11 {
  margin-left: 95.74468085106382%;
  *margin-left: 95.6382978723404%;
}

.row-fluid .offset11:first-child {
  margin-left: 93.61702127659574%;
  *margin-left: 93.51063829787232%;
}

.row-fluid .offset10 {
  margin-left: 87.23404255319149%;
  *margin-left: 87.12765957446807%;
}

.row-fluid .offset10:first-child {
  margin-left: 85.1063829787234%;
  *margin-left: 84.99999999999999%;
}

.row-fluid .offset9 {
  margin-left: 78.72340425531914%;
  *margin-left: 78.61702127659572%;
}

.row-fluid .offset9:first-child {
  margin-left: 76.59574468085106%;
  *margin-left: 76.48936170212764%;
}

.row-fluid .offset8 {
  margin-left: 70.2127659574468%;
  *margin-left: 70.10638297872339%;
}

.row-fluid .offset8:first-child {
  margin-left: 68.08510638297872%;
  *margin-left: 67.9787234042553%;
}

.row-fluid .offset7 {
  margin-left: 61.70212765957446%;
  *margin-left: 61.59574468085106%;
}

.row-fluid .offset7:first-child {
  margin-left: 59.574468085106375%;
  *margin-left: 59.46808510638297%;
}

.row-fluid .offset6 {
  margin-left: 53.191489361702125%;
  *margin-left: 53.085106382978715%;
}

.row-fluid .offset6:first-child {
  margin-left: 51.063829787234035%;
  *margin-left: 50.95744680851063%;
}

.row-fluid .offset5 {
  margin-left: 44.68085106382979%;
  *margin-left: 44.57446808510638%;
}

.row-fluid .offset5:first-child {
  margin-left: 42.5531914893617%;
  *margin-left: 42.4468085106383%;
}

.row-fluid .offset4 {
  margin-left: 36.170212765957444%;
  *margin-left: 36.06382978723405%;
}

.row-fluid .offset4:first-child {
  margin-left: 34.04255319148936%;
  *margin-left: 33.93617021276596%;
}

.row-fluid .offset3 {
  margin-left: 27.659574468085104%;
  *margin-left: 27.5531914893617%;
}

.row-fluid .offset3:first-child {
  margin-left: 25.53191489361702%;
  *margin-left: 25.425531914893618%;
}

.row-fluid .offset2 {
  margin-left: 19.148936170212764%;
  *margin-left: 19.04255319148936%;
}

.row-fluid .offset2:first-child {
  margin-left: 17.02127659574468%;
  *margin-left: 16.914893617021278%;
}

.row-fluid .offset1 {
  margin-left: 10.638297872340425%;
  *margin-left: 10.53191489361702%;
}

.row-fluid .offset1:first-child {
  margin-left: 8.51063829787234%;
  *margin-left: 8.404255319148938%;
}
</style>

<!-- Basic Example -->
<form>
    <fieldset>
        <legend class="p30 f18 font-bold font-blue tc">基本用法</legend>
        <div class="form-group">
            <label class="form-label" for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
        </div>
        <div class="form-group">
            <label class="form-label" for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>
        <div class="form-group">
            <label class="form-label" for="exampleInputFile">File input</label>
            <input type="file" id="exampleInputFile">
            <p class="form-help-block">Example block-level help text here.</p>
        </div>
        <div class="form-checkbox">
            <label>
                <input type="checkbox"> Check me out
            </label>
        </div>
        <div class="form-radio">
            <label>
                <input type="radio"> Check me out
            </label>
        </div>
        <div class="checkbox">
            <label class="form-label">
                <input type="checkbox" value="">
                Option one is this and that&mdash;be sure to include why it's great
            </label>
        </div>
        <div class="checkbox disabled">
            <label class="form-label">
                <input type="checkbox" value="" disabled>
                Option two is disabled
            </label>
        </div>

        <div class="radio">
            <label class="form-label">
                <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked>
                Option one is this and that&mdash;be sure to include why it's great
            </label>
        </div>
        <div class="radio">
            <label class="form-label">
                <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
                Option two can be something else and selecting it will deselect option one
            </label>
        </div>
        <div class="radio disabled">
            <label class="form-label">
                <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3" disabled>
                Option three is disabled
            </label>
        </div>
        <input class="btn btn-style8 btn-xl" type="submit" value="submit">
        <input class="btn btn-style8 btn-lg" type="submit" value="submit">
        <input class="btn btn-style8" type="submit" value="submit">
        <input class="btn btn-style8 btn-sm" type="submit" value="submit">
    </fieldset>
</form>
{% highlight html %}
<form>
    <fieldset>
        <legend class="p30 f18 font-bold font-blue tc">基本用法</legend>
        <div class="form-group">
            <label class="form-label" for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
        </div>
        <div class="form-group">
            <label class="form-label" for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>
        <div class="form-group">
            <label class="form-label" for="exampleInputFile">File input</label>
            <input type="file" id="exampleInputFile">
            <p class="form-help-block">Example block-level help text here.</p>
        </div>
        <div class="form-checkbox">
            <label>
                <input type="checkbox"> Check me out
            </label>
        </div>
        <div class="form-radio">
            <label>
                <input type="radio"> Check me out
            </label>
        </div>
        <div class="checkbox">
            <label class="form-label">
                <input type="checkbox" value="">
                Option one is this and that&mdash;be sure to include why it's great
            </label>
        </div>
        <div class="checkbox disabled">
            <label class="form-label">
                <input type="checkbox" value="" disabled>
                Option two is disabled
            </label>
        </div>

        <div class="radio">
            <label class="form-label">
                <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked>
                Option one is this and that&mdash;be sure to include why it's great
            </label>
        </div>
        <div class="radio">
            <label class="form-label">
                <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
                Option two can be something else and selecting it will deselect option one
            </label>
        </div>
        <div class="radio disabled">
            <label class="form-label">
                <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3" disabled>
                Option three is disabled
            </label>
        </div>
        <input class="btn btn-style8 btn-xl" type="submit" value="submit">
        <input class="btn btn-style8 btn-lg" type="submit" value="submit">
        <input class="btn btn-style8" type="submit" value="submit">
        <input class="btn btn-style8 btn-sm" type="submit" value="submit">
    </fieldset>
</form>
{% endhighlight %}


<form class="form-inline">
    <fieldset>
        <legend class="p30 f18 font-bold font-blue tc">行内显示</legend>
        <div class="form-group">
            <label class="form-label" for="exampleInputName2">Name</label>
            <input type="text" class="form-control" id="exampleInputName2" placeholder="Jane Doe">
        </div>
        <div class="form-group">
            <label class="form-label" for="exampleInputEmail2">Email</label>
            <input type="email" class="form-control" id="exampleInputEmail2" placeholder="jane.doe@example.com">
        </div>
        <input class="btn btn-style8 " type="submit" value="submit">
    </fieldset>
</form>
{% highlight html %}
<form class="form-inline">
    <fieldset>
        <legend class="p30 f18 font-bold font-blue tc">行内显示</legend>
        <div class="form-group">
            <label class="form-label" for="exampleInputName2">Name</label>
            <input type="text" class="form-control" id="exampleInputName2" placeholder="Jane Doe">
        </div>
        <div class="form-group">
            <label class="form-label" for="exampleInputEmail2">Email</label>
            <input type="email" class="form-control" id="exampleInputEmail2" placeholder="jane.doe@example.com">
        </div>
        <input class="btn btn-style8 " type="submit" value="submit">
    </fieldset>
</form>
{% endhighlight %}


<form class="form-inline">
    <fieldset>
        <legend class="p30 f18 font-bold font-blue tc">隐藏输入框标签Label</legend>
        <div class="form-group">
            <label class="form-sr-only" for="exampleInputEmail3">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail3" placeholder="Enter email">
        </div>
        <div class="form-group">
            <label class="form-sr-only" for="exampleInputPassword3">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword3" placeholder="Password">
        </div>
        <div class="form-checkbox">
            <label>
                <input type="checkbox"> Remember me
            </label>
        </div>
        <input class="btn btn-style8 " type="submit" value="submit">
    </fieldset>
</form>
{% highlight html %}
<form class="form-inline">
    <fieldset>
        <legend class="p30 f18 font-bold font-blue tc">隐藏输入框标签Label</legend>
        <div class="form-group">
            <label class="form-sr-only" for="exampleInputEmail3">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail3" placeholder="Enter email">
        </div>
        <div class="form-group">
            <label class="form-sr-only" for="exampleInputPassword3">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword3" placeholder="Password">
        </div>
        <div class="form-checkbox">
            <label>
                <input type="checkbox"> Remember me
            </label>
        </div>
        <input class="btn btn-style8 " type="submit" value="submit">
    </fieldset>
</form>
{% endhighlight %}


<form class="form-horizontal">
    <fieldset>
        <legend class="p30 f18 font-bold font-blue tc">水平显示</legend>
        <div class="form-group row-fluid">
            <label class="span3 form-label">Email</label>
            <div class="span6">
                <p class="form-control-static">email@example.com</p>
            </div>
        </div>
        <div class="form-group row-fluid">
            <label class="form-label span3" for="inputEmail3" >Email</label>
            <div class="span6">
                <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
            </div>
        </div>
        <div class="form-group row-fluid">
            <label class="form-label span3" for="inputPassword3" >Password</label>
            <div class="span9">
                <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
            </div>
        </div>
        <div class="form-group row-fluid">
            <div class="offset3 span9">
                <div class="checkbox">
                    <label>
                        <input type="checkbox"> Remember me
                    </label>
                </div>
            </div>
        </div>
        <div class="form-group row-fluid">
            <div class="offset3 span9">
                <input class="btn btn-style8 btn-xl" type="submit" value="submit">
            </div>
        </div>
    </fieldset>
</form>
{% highlight html %}
<form class="form-horizontal">
    <fieldset>
        <legend class="p30 f18 font-bold font-blue tc">水平显示</legend>
        <div class="form-group row-fluid">
            <label class="span3 form-label">Email</label>
            <div class="span6">
                <p class="form-control-static">email@example.com</p>
            </div>
        </div>
        <div class="form-group row-fluid">
            <label class="form-label span3" for="inputEmail3" >Email</label>
            <div class="span6">
                <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
            </div>
        </div>
        <div class="form-group row-fluid">
            <label class="form-label span3" for="inputPassword3" >Password</label>
            <div class="span9">
                <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
            </div>
        </div>
        <div class="form-group row-fluid">
            <div class="offset3 span9">
                <div class="checkbox">
                    <label>
                        <input type="checkbox"> Remember me
                    </label>
                </div>
            </div>
        </div>
        <div class="form-group row-fluid">
            <div class="offset3 span9">
                <input class="btn btn-style8 btn-xl" type="submit" value="submit">
            </div>
        </div>
    </fieldset>
</form>
{% endhighlight %}


<form>
    <fieldset>
        <legend class="db p30 f18 font-bold font-blue tc">水平checkbox</legend>
        <div class="form-group">
            <label class="form-checkbox-inline">
                <input type="checkbox" id="inlineCheckbox1" value="option1"> 1
            </label>
            <label class="form-checkbox-inline">
                <input type="checkbox" id="inlineCheckbox2" value="option2"> 2
            </label>
            <label class="form-checkbox-inline">
                <input type="checkbox" id="inlineCheckbox3" value="option3"> 3
            </label>

            <label class="form-radio-inline">
                <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"> 1
            </label>
            <label class="form-radio-inline">
                <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"> 2
            </label>
            <label class="form-radio-inline">
                <input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"> 3
            </label>
        </div>
        <div class="form-group">
            <select class="form-control">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
        </div>
    </fieldset>
</form>
{% highlight html %}
<form>
    <fieldset>
        <legend class="db p30 f18 font-bold font-blue tc">水平checkbox</legend>
        <div class="form-group">
            <label class="form-checkbox-inline">
                <input type="checkbox" id="inlineCheckbox1" value="option1"> 1
            </label>
            <label class="form-checkbox-inline">
                <input type="checkbox" id="inlineCheckbox2" value="option2"> 2
            </label>
            <label class="form-checkbox-inline">
                <input type="checkbox" id="inlineCheckbox3" value="option3"> 3
            </label>

            <label class="form-radio-inline">
                <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"> 1
            </label>
            <label class="form-radio-inline">
                <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"> 2
            </label>
            <label class="form-radio-inline">
                <input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"> 3
            </label>
        </div>
        <div class="form-group">
            <select class="form-control">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
        </div>
    </fieldset>
</form>
{% endhighlight %}


<form>
    <fieldset>
        <legend class="db p30 f18 font-bold font-blue tc">控件大小</legend>
        <input class="form-control form-control-lg" type="text" placeholder=".input-lg">
        <input class="form-control" type="text" placeholder="Default input">
        <input class="form-control form-control-sm" type="text" placeholder=".input-sm">

        <select class="form-control form-control-lg">
            <option>1</option>
            <option>2</option>
            <option>3</option>
        </select>
        <select class="form-control">
            <option>1</option>
            <option>2</option>
            <option>3</option>
        </select>
        <select class="form-control form-control-sm">
            <option>1</option>
            <option>2</option>
            <option>3</option>
        </select>
    </fieldset>
</form>
{% highlight html %}
<form>
    <fieldset>
        <legend class="db p30 f18 font-bold font-blue tc">控件大小</legend>
        <input class="form-control form-control-lg" type="text" placeholder=".input-lg">
        <input class="form-control" type="text" placeholder="Default input">
        <input class="form-control form-control-sm" type="text" placeholder=".input-sm">

        <select class="form-control form-control-lg">
            <option>1</option>
            <option>2</option>
            <option>3</option>
        </select>
        <select class="form-control">
            <option>1</option>
            <option>2</option>
            <option>3</option>
        </select>
        <select class="form-control form-control-sm">
            <option>1</option>
            <option>2</option>
            <option>3</option>
        </select>
    </fieldset>
</form>
{% endhighlight %}
