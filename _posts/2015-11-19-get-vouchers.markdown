---
layout: post
title:  "刷优惠劵接口"
date:   2015-11-19 11:06:46
categories: jekyll update
tag: api
---

这两天看到师兄发的链接，内容是活动期间内，每天定时可以抢云主机一个月的使用期限。

此脚本不考虑兼容，建议用chrome。

于是跑去看了下内容，打开chrome的控制面板（默认快捷键是F12）, 接着切换到networks面板进行抓包。

得出以下结果：

    接口URL： http://domain.com/xxx/

    参数：
        gift: 礼包编号 <String>

    方法：
        POST

    返回值：
        {static: 1, string: ''}

        static:
            2: 已抢完
            8: 你的IP访问次数太高

        string:
            返回的信息


我们开始写刷优惠劵的脚本。

这个活动要求先登陆才能领取优惠，所以我们先登录好后再加脚本。

{% highlight javascript %}
(function(){

    var timer,                                                      // 计时器
        startTime           = new Date(2015, 10, 19, 9, 59, 0),     // 开始刷接口的时间
        changApiDirection   = 50,                                   // 每50次刷一下cdn的接口
        direction           = 100,                                  // 刷接口的时间间隔，单位ms
        count               = 1;                                    // 刷接口的次数

    function callApi() {

        var promise = $.post('https://domain.com/www/', {
            gift: (count % changeApiDirection === 0)? "cdn_500" : "cvm_personal"
        });

        promise.done(function(data){
            getGift(data);
        });


        function getGift(data){
            switch(data.status){
                case 1:
                    console.log('抢到啦');
                    console.log('已刷'+count+'次');
                    break;
                case 2:
                    console.log('抢不到啊');
                    break;
                default:
                    // nothing.
            }
        }


        if(count % 10 === 0)console.log('已刷'+count+'次');

        count++;
    }

    timer = setInterval(function(){
        if((new Date()) > startTime)callApi();
    }, direction);

})();
{% endhighlight %}

接下来，把刷接口的脚本放到console面板运行起来就好了。
