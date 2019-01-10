---
layout: post
title:  "Nginx http code 499"
date:   2015-11-19 15:06:46
categories: jekyll update
tag: nginx
---

[Http status codes][LIST_OF_HTTP_STATUS_CODES] 是我们做web开发需要了解的，昨天，我们的log记录到同一时间的重复请求, 其中有一个请求返回的HTTP状态码为499，另一个是200, 但是查阅http的状态码规范RFC，我们并没有发现这个状态码的定义。
那显然，这个code是Nginx自定义的，查询[wiki][LIST_OF_HTTP_STATUS_CODES]看到下面的结果：

{% highlight text %}
499 Client Closed Request (Nginx):
Used in Nginx logs to indicate when the connection has been closed by client while the server is still processing its request, making server unable to send a status code back.[75]
{% endhighlight %}

大致意思是：当服务器还在处理请求的时候，客户端关闭了连接，以致于服务器无法返回一个状态给客户端。

我们还查到[邮件][NGX_HTTP_CLIENT_CLOSED_REQUEST]：

{% highlight text %}
List:       nginx
Subject:    Re: 499 error in nginx
From:       Igor Sysoev <is () rambler-co ! ru>
Date:       2007-08-27 10:44:30
Message-ID: 20070827104430.GA50945 () rambler-co ! ru
[Download message RAW]

On Mon, Aug 27, 2007 at 04:01:33PM +0530, Abhishek Singh wrote:

> I am using nginx as a web and proxy server for mongrel, its working fine but
> i am facing one problem with nginx , i am getting 499 http client error code
> in nginx log file, earlier when i was using lighttpd and pound so i was not
> getting 499 error. So can anyone please explain me what is the main problem
> and how can i resolve this and what is the exact definition of 499 http
> status code.

src/http/ngx_http_request.h:

/*
 * HTTP does not define the code for the case when a client closed
 * the connection while we are processing its request so we introduce
 * own code to log such situation when a client has closed the connection
 * before we even try to send the HTTP header to it
 */
#define NGX_HTTP_CLIENT_CLOSED_REQUEST     499


-- 
Igor Sysoev
http://sysoev.ru/en/
{% endhighlight %}

另外，Nginx是一个开源项目，托管在github上，我们通过grep, 找到源码：

{% highlight c %}
/*
* HTTP does not define the code for the case when a client closed
* the connection while we are processing its request so we introduce
* own code to log such situation when a client has closed the connection
* before we even try to send the HTTP header to it
*/
#define NGX_HTTP_CLIENT_CLOSED_REQUEST 499
{% endhighlight %}

根据以上资料，如何解析我们这次出现的情景呢？涉及内部数据，我们不展示log内容了.

> **我们注意到一下几点：**

>  1. 我们Nginx收到两条请求都创建了数据库数据.
>  2. 两条log的另一个区别就是客户端的IP地址改变.
>  3. 根据log上UserAgent，我们发现这是一个oppo 手机的android 4.2的浏览器.
>  4. 两次请求的时间一致（秒级别）

根据以上收集的证据，我们大致推断为： 当用户准备提交，请求已经到了服务器的程序端，而在服务器返回之前，用户手机的网络突变，有可能是移动过程中，换了基站，所以IP地址改变（TCP链接断开），所以请求无法到达客户端。 而浏览器在断开链接的时候，又重新发送了一次请求。

以上结果是推断，具体真实原因我们无法知道, 这需要我们在前端加数据记录并在网络好的时候反馈给服务端。


Reference:

* [https://en.wikipedia.org/wiki/List_of_HTTP_status_codes][LIST_OF_HTTP_STATUS_CODES]
* [http://marc.info/?l=nginx&m=120127275109824&w=2][NGX_HTTP_CLIENT_CLOSED_REQUEST]

[LIST_OF_HTTP_STATUS_CODES]: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
[NGX_HTTP_CLIENT_CLOSED_REQUEST]: http://marc.info/?l=nginx&m=120127275109824&w=2
