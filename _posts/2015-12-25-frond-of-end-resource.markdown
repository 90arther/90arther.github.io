---
layout: post
title:  "前端资源管理解决方案"
date:   2015-12-25 18:06:46
categories: jekyll update
tag: 前端
---


# 前端资源管理解决方案

前端资源目录架构与预处理问题一直是一个热门的争议话题，业内的技术发展也是突飞猛进。很多以前手动处理的工作，而今都是可以自动化处理。

> 举个例子：关于静态资源的cdn部署的问题，记得我还是两年前学生时代的时候，做某某网易的专题页面的时候，当时我做完页面后是交接给编辑，编辑的工作是将图片通过ftp穿到服务器，生成相应的cdn资源路径，然后将cdn路径逐步填写到html与css源码文件中，然后提交代码到服务器。

以上例子就会有几个问题：

1.  沟通问题：由于前端页面由前端控制，所以编辑如果看不懂前端的逻辑，无法加路径，就需要与前端不断交流。
2.  技能问题：需要编辑能看懂前端代码，但是懂前端代码的编辑又不愿意做着重复无营养的工作，更多是想直接做前端开发，所以很多编辑都是不是擅长前端的成员。
3.  维护问题：也是最严重的问题，如果一个ui调整，经常需要重新走以上流程，对于现今快速开发的时代，都是不合适的。

还有诸多问题都曾经困扰着开发人员，而今我们都可以通过部署工具来解决。这两年很多大神都分享自己的解决方案，其中，我记得看过 [@张云龙][zhangyunlong] 大神的[前端资源文件方案][front-of-end]。

整理需求后，我们发现，我们可以用环境类型来进行分类开发：

1. 生产环境：文件合并、压缩、加版本（强缓存）、部署cdn
2. 测试环境：文件合并、不压缩（方便排查）、加版本（强缓存）、不部署cdn
3. 开发环境：文件合并、不压缩（方便调试）、无版本（无缓存）、无cdn、实时监听文件变化编译（实现自动化处理工具）

我们整理一份适合我们项目的实践方案：

>   项目说明：
>   
 * 使用FIS3做scss编译、js合并、img合并等前端预处理功能
 * 使用bower做公用包管理器
 * 前端代码源码必须放在`src`下
 * 生成代码将发布到`static`和`template`
 * DOC : http://fis.baidu.com/fis3/index.html

#### 目录结构
{% highlight text %}
	fis-conf.js  //fis配置文件
	src
	 |--js       //存放所有的js文件
	 |--css      //存放所有的css和less和sass文件
	 |--img      //存放所有的图片资源
	 |--data     //存放所有的多媒体和其他类型文件
	 |--json     //存放json数据格式文件
	index.html   //src的根目录下放html
	template     //html模版文件
	static       //其它静态文件的发布地址
{% endhighlight %}

#### 各个环境代码管理
设置.gitignore。我们的三个环境的发布代码是不一样的，不应该让代码管理器跟踪到，不然会导致各种代码冲突，所以我们应该ignore掉它们，以git为例，在git根目录下设置.gitignore文件：
{% highlight text %}
template
static
{% endhighlight %}

#### 设置源码文件过滤器
我们需要用fis设置项目源码文件过滤器, 只有匹配到的目录才会执行fis3，src(默认包括css\js\scss\png\jpg\gif等文件)
{% highlight javascript %}
fis.set('project.files', ['src/**']);
{% endhighlight %}

#### 设置fis的ignore模块
设置排除某些发布版本文件, 匹配到的目录不会执行fis3，
fis3默认值：['node_modules/**', 'output/**', 'fis-conf.js']
添加基础模块目录 ：'bower_components/**'
{% highlight javascript %}
fis.set('project.ignore', ['node_modules/**', 'output/**', 'fis-conf.js', 'bower_components/**']);
{% endhighlight %}

#### 处理css文件
目前，最好的css预处理工具是sass，支持用各种变量、函数的形式书写css。我们需要对sass实时编译，让我们可以预览我们的页面效果。
一下配置会找到所有的scss文件，然后编程生成css。细心的同学还注意到一个选项useSprite，这是fis封装的一个强大的sprite处理功能，支持根据文件内img的路径来定位到图片，合成sprite，并自动修改css文件。
{% highlight javascript %}
// 编译sass文件
fis.match('**/*.scss', {
    rExt        : '.css', // from .scss to .css
    parser      : fis.plugin('node-sass', {
        //fis-parser-sass option
    }),
    // 对 CSS 进行图片合并
    useSprite   : true
});
fis.match('/src/scss/(*.scss)', {
    release     : '/static/css/$1'
});
{% endhighlight %}

#### 处理js文件
将所有的js文件发布到static－js目录下：
{% highlight javascript %}
fis.match('/src/js/(*.js)', {
    release     : '/static/js/$1'
});
{% endhighlight %}

#### 处理图片文件
这里是将png、fis、jpg图片发布到static-img目录下，fis3本身的文档有错误，虽然提交MR给官方，而且也合并了，但是官方网站还没更新。
{% highlight javascript %}
fis.match('/src/img/(*.{png,gif,jpg})', {
    release     : '/static/img/$1$2$3'
});
{% endhighlight %}

#### 处理html文件
我们将html文件发布到template目录下：
{% highlight javascript %}
fis.match('/src/(*.html)', {
    release      : '/templates/game_wall/$1'
});
{% endhighlight %}

### 设置生产环境版本
{% highlight javascript %}
fis.media('master')
    .match('src/**/(*.{js,css,png,jpg,scss})', {
        useHash     : true,     // 配置md5加密
        domain      : 'http://cdn-path.com' // cdn路径
    })
    .match('/src/*.png', {
        // fis-optimizer-png-compressor 插件进行压缩，已内置
        optimizer   : fis.plugin('png-compressor')
    }).match('/src/scss/*.scss', {
        // fis-optimizer-clean-css 插件进行压缩，已内置
        optimizer   : fis.plugin('clean-css')
    }).match('/src/js/*.js', {
        // fis-optimizer-uglify-js 插件进行压缩，已内置
        optimizer   : fis.plugin('uglify-js')
    });
{% endhighlight %}

### 设置测试环境版本
{% highlight javascript %}
fis.media('test')
    .match('src/**/(*.{js,css,png,jpg,scss})', {
        useHash     : true     // 配置md5加密
    });
{% endhighlight %}

### 构建本地开发版：
{% highlight text %}
fis3 release -d ./ -wl
{% endhighlight %}

### 构建测试版：
{% highlight text %}
fis3 release test -d ./
{% endhighlight %}

### 部署线上正式环境
{% highlight text %}
fis3 release master -d ./
{% endhighlight %}




[zhangyunlong]: https://github.com/fouber
[front-of-end]: https://www.zhihu.com/question/20790576
