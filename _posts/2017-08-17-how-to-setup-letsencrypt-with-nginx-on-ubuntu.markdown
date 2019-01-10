---
layout: post
title:  "Setup Let's Encrypt With Nginx on Ubuntu 16.04"
date:   2017-08-16 23:57:25
categories: server
tag: ssl letsencrypt nginx ubuntu ubuntu16.04
keywords: ssl letsencrypt nginx ubuntu 14.04
description: "Setup Let's Encrypt With Nginx on Ubuntu 16.04"
---

With the rapid development of the Internet, network security has become an important part of network development, and SSL certificate plays an important role as an important product to maintain the safe transmission of network data. SSL enables encrypted communication between the user and the server. Can effectively reduce the risk of hacking and identity theft or theft of sensitive information (such as credit card number, user name, password, e-mail, transaction amount, etc.). SSL certificate can not be overlooked, the future will be the site of the SSL certificate of standard products.

Thanks to Let's Encrypt, we can get the ssl certificate free of charge and use it to encrypt the data between the client and the server without worrying that the data is being stolen.

In this guide, we will walk you through how to set up Let's Encrypt and http2 with nginx on ubuntu 16.04 VPS. During this process, you'll learn how Let's Encrypt verification your server, issued a ssl cert for your server,  and auto renew cert. 

###  Requirements
Before starting this guide, you will need to prepare the following：

> **Requirements list:**

> - A VPS with Ubuntu 16.04
> - A public IP( We assume that your ip address is: 192.0.2.0)
> - 443 port and 80 port opened for Internet.
> - A domian or subdomain. Let's encrypt need a valiate domain to verification your server
> - Python 2.6, 2.7, or 3.3+
> - 512MB of RAM at lease

### Prerequisites
Parse your domain name into your public network IP. This step is very important, otherwise you will not be able to get a valid SSL certificate.

you should create a non-root user and add user to the administer the system (admin) group. If you have already done so, please skip this section.

Create the user by entering the following command. Replace `arther` with your desired username:

{% highlight shell %}
adduser arther
{% endhighlight %}

Add the user to the administer the system (admin) group by entering the following command. Replace `arther` with your username:

{% highlight shell %}
usermod -a -G sudo arther
{% endhighlight %}
Log out of your vps as the `root` user by entering the following command:
{% highlight shell %}
logout
{% endhighlight %}
Log in to your VPS as the new user by entering the following command. Replace `arther` with your username, and the example IP address with your VPS’s IP address:

{% highlight shell %}
ssh arther@192.0.2.0
{% endhighlight %}
### Install Nginx
You will need to have nginx installed in order to work through these steps. If you haven't already done so, install nginx by entering the following command.
{% highlight shell %}
sudo apt-get update
sudo apt-get install nginx
{% endhighlight %}
Open your browser and access the public IP address, you will see `Welcome to Nginx`.


### Hosting a website
In this section, I will show you how to hostting a website which will be setup with SSL cert.

Navigate to your /var/www directory:
{% highlight shell %}
cd /var/www
{% endhighlight %}
create a folder to hold your website by entering the following command, replacing `example.com` with your domain name:
{% highlight shell %}
sudo mkdir example.com
{% endhighlight %}
create a default page for website and make sure it's read permission
{% highlight shell %}
sudo touch /var/www/example.com/index.html
sudo chmod a+rw /var/www/example.com/index.html
sudo echo 'hello world' > /var/www/example.com/index.html
{% endhighlight %}
create a nginx conf by entering the following command, replacing `example.com` with your domain name:
{% highlight shell %}
sudo vim /etc/nginx/sites-available/example.com
{% endhighlight %}
Copy and paste the settings shown below in to the file, replacing `example.com` with your domain name:
{% highlight conf %}
server {
    listen        80;
    server_name   example.com;
    charset       utf8;
    index         index.html;
    root          /var/www/example.com/;
}
{% endhighlight %}
Enable the site and disable the default host, replacing `example.com` with your domain name:
{% highlight conf %}
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/example.com
sudo rm /etc/nginx/sites-enabled/default
{% endhighlight %}
Test the conf and reload nginx conf by  entering the following command:
{% highlight shell %}
sudo nginx -t
sudo nginx -s reload
{% endhighlight %}

Check the website by open your browser and access the `example.com`, replacing `example.com` with your domain name. Your will see a page with `hello world` .

### Install Certbot
In this section, We will show you how to obtain SSL certs through Certbot.

Thanks to Certbot team, we can use Certbot to obtain certs from Let's encrypt. And another lucky thing is Certbot can be installed through PPA. Just entering the following command to install it.

{% highlight shell %}
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx
{% endhighlight %}

Certbot has an Nginx plugin, which is supported on many platforms, and automates both obtaining and installing certs:
{% highlight shell %}
sudo certbot --nginx
{% endhighlight %}
The plugin will list valid websites and ask which names would you like to activate HTTPS. Please select the website we just created, and plugin will get a certificate for you and have Certbot edit your Nginx configuration automatically to serve it. 

As the result message shown. Congratulations! You had obtained a cert for your website. Open your web browser and navigate to your domain (replace example.com with your actual domain name): `https://example.com`, your will see `safe` before the URL.

### Auto renew cert
Your cert will expire after three months. To obtain a new or tweaked version of this certificate in the future, simply run certbot again with the "certonly" option.

With the crontab, we can auto renew our cert. Just entering the following command to install a new crontab task.
{% highlight shell %}
sudo crontab -e
{% endhighlight %}

Copy and paste the settings shown below in to the file, the task will renew cert at At 2 am every first day of month.
{% highlight conf %}
0 2 1 * * certbot renew --dry-run
{% endhighlight %}
