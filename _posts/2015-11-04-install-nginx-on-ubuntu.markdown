---
layout: post
title:  "Ubuntu搭建nginx服务器!"
date:   2015-11-04 10:18:36
categories: jekyll update
tag: nginx
---


这个demo没有配置log，也没有配置屏蔽敏感文件的访问，是写给朋友的小tip，这里就post出来一下。首先更新软件包源:

{% highlight javascript %}
sudo apt-get update
{% endhighlight %}

安装nginx

{% highlight javascript %}
sudo apt-get install nginx
{% endhighlight %}

启动nginx

{% highlight javascript %}
sudo service nginx start
{% endhighlight %}

访问IP地址，默认已经监听了80端口，如果是本地，请访问127.0.0.1，会看到welcome to nginx字样。

编辑配置文件,其中server_name是配置一个访问网址，root是配置一个访问根目录，默认是访问根目录下的index.html

{% highlight javascript %}
sudo vim /etc/nginx/sites-available/www.domain.com
{% endhighlight %}

{% highlight nginx %}
server {
    listen        80;
    server_name   www.domain.com;
    charset       utf8;
    index         index.html;
    root          /home/user/vhost/www.domain.com/;
}
{% endhighlight %}

这个文件并不是放在运行目录，需要软链到运行目录，因为在一个服务器上，有多个网站的话，就最后分各个配置文件写，然后修改都比较不会互相影响到。

{% highlight javascript %}
sudo ln -s /etc/nginx/sites-available/www.domain.com /etc/nginx/sites-enabled/www.domain.com
{% endhighlight %}

然后就是测试配置是否正确了：

{% highlight javascript %}
sudo nginx -t
{% endhighlight %}

如果输出OK等提示就可以重启nginx

{% highlight javascript %}
sudo nginx -s reload
{% endhighlight %}

本地配置Host就可以访问了。



