---
layout: page
title: Posts
permalink: /posts/
---


{% for post in site.posts %}
<article>
    <h3>
        <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
    </h3>
    <p class="mes">
        <span>{{ post.date | date: "%b %-d, %Y" }}</span>
        <span>Author:90Arther</span>
    </p>
</article>
{% endfor %}

