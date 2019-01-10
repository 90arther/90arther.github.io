---
layout: post
title:  "在ubuntu 14.04的nginx配置letsencrypt证书与http2"
date:   2016-06-16 12:57:25
categories: web
tag: ssl http2 letsencrypt nginx
keywords: ssl http2 letsencrypt nginx ubuntu 14.04
description: "配置let's encrypt 证书并且升级nginx到1.9+并开启http2"
---


这篇文章很久前就想写了。只是一直没时间（懒）。不过现在有个习惯，好的经验，会先用evernote记录起来，主要把关键点记录下来，包括截图、链接、心得等。过后写就有大纲，这不，这次就不会像以前一样不知从哪里开始。

先上letsencrypt验证服务器获取证书基本过程，首先letsencrypt会先到访问一下我们的服务器，确保我们的域名跟服务器对应上，才会把证书颁发给我们，我们拿到证书后，就可以向用户的客户端提供证书跟私钥，这样才能验证ssl。图示：

<img src="/img/letsencrypt.png">

### 准备工作：

首先我们要拥有一个公网IP的ubuntu 14.04的服务器，并且我们所使用的账户在sudo组里。

其次，我们必须拥有一个自己可控制解析功能的域名。

以上如果准备完毕，我们解析一个A记录到服务器所在IP，比如我是解析spa.90arther.net到一台云主机，下面都以spa.90arther.net为例。


### 步骤一：安装letsencrypt

对于ubuntu 14.04下的nginx，官网上推荐我们下载安装脚本，因为没有对应的安装源可以给我们的安装，[官网安装方法][certbot-install]：

{% highlight shell %}
sudo mkdir /opt/letsencrypt && cd /opt/letsencrypt
sudo wget https://dl.eff.org/certbot-auto
sudo chmod a+x certbot-auto
{% endhighlight %}

certbot-auto将安装它的所有依赖并且自动升级客户端代码：

{% highlight shell %}
./certbot-auto
{% endhighlight %}

### 步骤二：获取证书

先安装nginx，如果您已经安装，可以忽略此步骤：

{% highlight shell %}
sudo apt-get install nginx
{% endhighlight %}

确保以下nginx的路径/.well-known能访问以便通过letsencrypt的验证。

{% highlight shell %}
sudo mkdir /opt/letsencrypt/acme-challenge -p
sudo chmod 666 /opt/letsencrypt/acme-challenge
sudo vim /etc/nginx/sites-available/spa.90arther.net
{% endhighlight %}

spa.90arther.net配置文件内容如下：
{% highlight conf %}
server {
    listen 80;
    server_name spa.90arther.net;
    root /opt/letsencrypt/acme-challenge/;

    location /.well-known/acme-challenge/ {
        index index.html;
        root /opt/letsencrypt/acme-challenge/;
    }

}
{% endhighlight %}


因为nginx默认是跑site-enabled下的配置文件，建立一条nginx软链
{% highlight conf %}
sudo ln -s /etc/nginx/site-available/spa.90arther.net /etc/nginx/sites-enabled/spa.90arther.net
{% endhighlight %}

测试nginx配置文件：
{% highlight conf %}
sudo nginx -t
{% endhighlight %}

一般配置写错会输出错误信息，根据提示修改就可以，接着reload配置nginx
{% highlight conf %}
sudo nginx -s reload
{% endhighlight %}


测试我们的服务器是否配置成功：
{% highlight conf %}
sudo echo 'hello letsencrypt' > /opt/letsencrypt/acme-challenge/index.html;
{% endhighlight %}

打开浏览器，访问网站：http://spa.90arther.net，看到显示hello letsencrypt，恭喜你，完成服务器nginx的准备工作。


服务器已经做好让letsencrypt验证的准备工作了，接下来就是获取证书了，我们将证书放到目录/opt/letsencrypt

{% highlight shell %}
/opt/letsencrypt/certbot-auto certonly --webroot -w /opt/letsencrypt/acme-challenge/ -d spa.90arther.net
{% endhighlight %}

成功获取ssl证书：
<img src="/img/get-ssl.png">

你会获得以下四份文件：

<img src="/img/ssl-live.png">

### 步骤三：配置TLS／SSL在nginx

{% highlight shell %}
sudo vim /etc/nginx/site-available/spa.90arther.net
{% endhighlight %}


{% highlight conf %}
server {
    listen 80;
    server_name spa.90arther.net;

    location /.well-known/acme-challenge/ {
        index index.html;
        root /opt/letsencrypt/acme-challenge/;
      }

    return 302 https://$host$request_uri;

}
server {
    listen 443;
    server_name spa.90arther.net;
    ssl on;
    ssl_certificate /etc/letsencrypt/live/spa.90arther.net/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/spa.90arther.net/privkey.pem;

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA';
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_stapling on;
    ssl_stapling_verify on;

    location /.well-known/acme-challenge/ {
        index index.html;
        root /opt/letsencrypt/acme-challenge/;
    }

    location / {
        root /opt/letsencrypt/acme-challenge/;
        index index.html;
    }
}
{% endhighlight %}


测试nginx并reload配置文件
{% highlight conf %}
sudo nginx -t
sudo nginx -s reload
{% endhighlight %}

### 四、一些问题及解决办法：

#### 问题一：

> * 手机的chrome：一直提示非私密加密，而gitlab开启了HSTS，所以无法打开网页。
> * pc的safari正常
> * pc的chrome有时候也是会提示开启了HSTS而非私密，无法访问。

https在android的chrome验证不通过，我们尝试把HSTS关闭，但gitlab把HSTS设为默认设置，而且写在代码里面，不可配置：
https://gitlab.com/gitlab-org/gitlab-ce/issues/568

解决方案一：https://www.zhihu.com/question/40718588  证书需要提供letsencrypt跟自己的，即fullchain.pem，之前用的是cert.pem



#### 问题二：
我们用https://www.ssllabs.com/ssltest/测来一下，结果是安全级别不够高，才B，所以我们要加一层ssl_dhparam:

Generate Strong Diffie-Hellman Group：

{% highlight conf %}
sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
{% endhighlight %}

<img src="/img/dhparam.png">

在nginx配置上加上配置路径：
{% highlight conf %}
ssl_dhparam /etc/ssl/certs/dhparam.pem;
{% endhighlight %}

完整的配置文件如下：
{% highlight conf %}
server {
    listen 80;
    server_name spa.90arther.net;

    location /.well-known/acme-challenge/ {
        index index.html;
        root /opt/letsencrypt/acme-challenge/;
      }

    return 302 https://$host$request_uri;

}
server {
    listen 443 http2;
    server_name spa.90arther.net;
    ssl on;
    ssl_certificate /etc/letsencrypt/live/spa.90arther.net/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/spa.90arther.net/privkey.pem;

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_dhparam /etc/ssl/certs/dhparam.pem;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA';
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_stapling on;
    ssl_stapling_verify on;

    location /.well-known/acme-challenge/ {
        index index.html;
        root /opt/letsencrypt/acme-challenge/;
    }

    location / {
        root /home/vhost/ssl/;
        index index.html;
    }
}
{% endhighlight %}

同样的测试配置文件并reload：
{% highlight shell %}
sudo nginx -t
sudo nginx -s reload
{% endhighlight %}


文章参考：

* [https://certbot.eff.org/#ubuntutrusty-nginx][certbot-install]
* [https://gitlab.com/gitlab-org/gitlab-ce/blob/v8.1.0/doc/install/installation.md#using-https][gitlab]
* [https://www.zhihu.com/question/40718588][zhihu]
* [https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-14-04][digitalocean]


原文地址(转载请注明出处)：[http://www.90arther.net/web/2016/06/16/ssl-and-http2.html][original]

[original]: http://www.90arther.net/web/2016/06/16/ssl-and-http2.html
[certbot-install]: https://certbot.eff.org/#ubuntutrusty-nginx
[digitalocean]: https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-14-04
[zhihu]: https://www.zhihu.com/question/40718588
[gitlab]: https://gitlab.com/gitlab-org/gitlab-ce/blob/v8.1.0/doc/install/installation.md#using-https
