---
layout: page
title: Debug
permalink: /debug/
order: 0
excerpt: "Debug"
---

<hr>

[https://github.com/benbalter/jekyll-avatar/blob/master/README.md](https://github.com/benbalter/jekyll-avatar/blob/master/README.md)

{% avatar mozgbrasil %}

<hr>

{{ site.theme }}

<hr>

{{ site | debug }}

<hr>

{{ page | debug }}

<hr>

{% comment %}
{{ site.posts | debug }}
{{ paginator | debug }}
{% endcomment %}
