---
layout: post
title:  "iptables设置与开放特殊端口"
date:   2015-11-06 23:15:36
categories: jekyll update
tag: iptables
---



在运维中，有一个环节是通过加防火墙来限制额外流量，确保服务器带宽的步骤。我们一般推荐封闭那些我们不使用的端口。在Ubuntu系统下，我们推荐适用iptables或者ufw（不过听说ufw也是用iptables封装的，然后使用起来更加方便）。

#### 1、输入命令，查看iptables的默认设置：
{% highlight bash %}
sudo iptables -L
{% endhighlight %}


默认情况下，你会看到下面的输出结果：

{% highlight bash %}
Chain INPUT (policy ACCEPT)
target prot opt source destination

Chain FORWARD (policy ACCEPT)
target prot opt source destination

Chain OUTPUT (policy ACCEPT)
target prot opt source destination
{% endhighlight %}


#### 2、输入一下命令，创建一个iptables规则:

{% highlight bash %}
sudo vim /etc/iptables.firewall.rules
{% endhighlight %}

我们推荐以下设置，默认将允许一些端口: http(80) https(443) ssh(22)

{% highlight bash %}
*filter
# Allow all loopback (lo0) traffic and drop all traffic to 127/8 that doesn't use lo0
-A INPUT -i lo -j ACCEPT
-A INPUT -d 127.0.0.0/8 -j REJECT

# Accept all established inbound connections
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Allow all outbound traffic - you can modify this to only allow certain traffic
-A OUTPUT -j ACCEPT

# Allow HTTP and HTTPS connections from anywhere (the normal ports for websites and SSL).
-A INPUT -p tcp --dport 80 -j ACCEPT
-A INPUT -p tcp --dport 443 -j ACCEPT

# Allow SSH connections
#
# The -dport number should be the same port number you set in sshd_config
# 
-A INPUT -p tcp -m state --state NEW --dport 22 -j ACCEPT

# Allow ping
-A INPUT -p icmp --icmp-type echo-request -j ACCEPT

# Log iptables denied calls
-A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables denied: " --log-level 7
# Drop all other inbound - default deny unless explicitly allowed policy
-A INPUT -j DROP
-A FORWARD -j DROP

COMMIT
{% endhighlight %}

#### 3、那配置文件我们已经写好，接下来，就是让iptables运用这个规则，运行下面命令：
{% highlight bash %}
sudo iptables-restore < /etc/iptables.firewall.rules
{% endhighlight %}

#### 4、再次检查输入检查命令，会发现以下规则已经生效：

{% highlight bash %}
sudo iptables -L
{% endhighlight %}

{% highlight bash %}
Chain INPUT (policy ACCEPT)
target prot opt source destination
ACCEPT all -- anywhere anywhere
REJECT all -- anywhere 127.0.0.0/8 reject-with icmp-port-unreachable
ACCEPT all -- anywhere anywhere state RELATED,ESTABLISHED
ACCEPT tcp -- anywhere anywhere tcp dpt:http
ACCEPT tcp -- anywhere anywhere tcp dpt:https
ACCEPT tcp -- anywhere anywhere state NEW tcp dpt:ssh
ACCEPT icmp -- anywhere anywhere
LOG all -- anywhere anywhere limit: avg 5/min burst 5 LOG level debug prefix "iptables denied: "
DROP all -- anywhere anywhere

Chain FORWARD (policy ACCEPT)
target prot opt source destination
DROP all -- anywhere anywhere

Chain OUTPUT (policy ACCEPT)
target prot opt source destination
ACCEPT all -- anywhere anywhere
{% endhighlight %}

#### 5、像我最近搭建了一个shadowsocks的服务，需要开放一个8888的端口，就让iptables放行，回到第二步，我们加入这个配置：

{% highlight bash %}
# Allow Shadowsocks
-A INPUT -p tcp --dport 8888 -j ACCEPT
{% endhighlight %}

#### 6、完整配置如下, 修改配置之后回到第三步，让iptables运用这个规则：

{% highlight bash %}
*filter
# Allow all loopback (lo0) traffic and drop all traffic to 127/8 that doesn't use lo0
-A INPUT -i lo -j ACCEPT
-A INPUT -d 127.0.0.0/8 -j REJECT

# Accept all established inbound connections
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Allow all outbound traffic - you can modify this to only allow certain traffic
-A OUTPUT -j ACCEPT

# Allow HTTP and HTTPS connections from anywhere (the normal ports for websites and SSL).
-A INPUT -p tcp --dport 80 -j ACCEPT
-A INPUT -p tcp --dport 443 -j ACCEPT

# Allow Shadowsocks
-A INPUT -p tcp --dport 8888 -j ACCEPT

# Allow SSH connections
#
# The -dport number should be the same port number you set in sshd_config
# 
-A INPUT -p tcp -m state --state NEW --dport 22 -j ACCEPT

# Allow ping
-A INPUT -p icmp --icmp-type echo-request -j ACCEPT

# Log iptables denied calls
-A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables denied: " --log-level 7
# Drop all other inbound - default deny unless explicitly allowed policy
-A INPUT -j DROP
-A FORWARD -j DROP

COMMIT
{% endhighlight %}
