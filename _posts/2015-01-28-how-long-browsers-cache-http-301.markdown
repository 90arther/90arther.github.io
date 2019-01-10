---
layout: post
title:  "浏览器对http 301缓存多久!"
date:   2015-01-28 19:27:28
categories: jekyll update
---

今天遇到一个http 301重定向的问题, 一开始, 我想把example1.com重定向到example2.com, 但是我不小心把它重定向到example3.com, 用的是nginx服务器, 代码如下:

{% highlight ruby %}
location / {
    return 301 http://example3.com;
}
{% endhighlight %}

对,就是这样, nginx -t也ok, 好了,就nginx -s reload了.

这时候, 我反悔了, 我知道错了, 马上关了nginx的配置, 但是chrome却一直跳转, 查看了调试面板:
Status Code:301 Moved Permanently (from cache)

竟然被缓存了.

幸好以上都是在本地测试的结果.

根据[师兄][http://www.aihaos.com/rz/]的补救措施: 将example3.com用302重定向到example2.com?key=value.


* IE7, IE8, Android 2.3.4 不缓存301
* Firefox 18.0.2, Safari 5.1.7 (on Windows 7), and Opera 12.14 缓存，但是重启浏览器就等于清除了
* IE10 and Chrome 25 cache 缓存，重启并不能清除缓存


