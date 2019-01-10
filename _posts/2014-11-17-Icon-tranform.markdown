---
layout: post
title:  "CSS3制作icon旋转效果"
date:   2014-11-17 13:37:28
categories: jekyll update
---

<style type="text/css">
.demo li{width: 48px;display: inline;margin-right: 18px;text-align: center;overflow: hidden;}
.demo a,.demo i{display: block;}
.demo a:hover i{-webkit-transform: rotateY(360deg);-moz-transform: rotateY(360deg);-ms-transform: rotateY(360deg);-o-transform: rotateY(360deg);transform: rotateY(360deg);}
.demo i{width: 46px;height: 46px;background: red;margin: 0 auto 4px;-webkit-transition: all 1s;-moz-transition: all 1s;-ms-transition: all 1s;transition: all 1s;}
</style>
<p>鼠标移上去看看. mouse move to over follow:</p>
<div class="demo clearfix">
    <ul>
        <li>
            <a href="#">
                <i class="icon1"></i>
            </a>
        </li>
    </ul>
</div>

<pre class="pre">
    <code>
.demo li{width: 48px;float: left;display: inline;margin-right: 18px;text-align: center;overflow: hidden;}
.demo a,.demo i{display: block;}
.demo a:hover i{-webkit-transform: rotateY(360deg);-moz-transform: rotateY(360deg);-ms-transform: rotateY(360deg);-o-transform: rotateY(360deg);transform: rotateY(360deg);}
.demo i{width: 46px;height: 46px;background: red;margin: 0 auto 4px;-webkit-transition: all 1s;-moz-transition: all 1s;-ms-transition: all 1s;transition: all 1s;}
    &lt;div class="demo clearfix"&gt;
        &lt;ul&gt;
            &lt;li&gt;
                &lt;a href="#"&gt;
                    &lt;i class="icon1"&gt;&lt;/i&gt;
                    &lt;span class="title"&gt;客户端&lt;/span&gt;
                &lt;/a&gt;
            &lt;/li&gt;
            &lt;li&gt;
                &lt;a href="#"&gt;
                    &lt;i class="icon1"&gt;&lt;/i&gt;
                    &lt;span class="title"&gt;客户端&lt;/span&gt;
                &lt;/a&gt;
            &lt;/li&gt;
            &lt;li&gt;
                &lt;a href="#"&gt;
                    &lt;i class="icon1"&gt;&lt;/i&gt;
                    &lt;span class="title"&gt;客户端&lt;/span&gt;
                &lt;/a&gt;
            &lt;/li&gt;
        &lt;/ul&gt;
    &lt;/div&gt;
    </code>
</pre>
