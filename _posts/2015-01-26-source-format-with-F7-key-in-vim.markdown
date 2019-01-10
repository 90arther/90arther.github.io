---
layout: post
title:  "Source code with F7 key in vim!"
date:   2015-01-26 19:27:28
categories: jekyll update
---

Add the following to your .vimrc (or alternatively, if you use spf13 like myself) .vimrc.local to easily format your source code:

{% highlight python %}
map <F7> mzgg=G`z<CR>
{% endhighlight %}

This will map source formatting to your F7 key.

