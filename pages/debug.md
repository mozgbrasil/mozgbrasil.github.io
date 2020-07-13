---
layout: page
title: Debug
permalink: /debug/
order: 0
excerpt: "Debug"
---

<hr>

<hr>

{% assign sorted_pages = site.pages | sort:"order" %}
{% for node in sorted_pages %}
{% if node.title %}
{% if node.title != "Debug" and node.title != "Curriculum" %}

{{ node.url }} - {{ node.title }}

{% endif %}
{% endif %}
{% endfor %}

<hr>

{{ page.path }}

<hr>

{{ site.versao }}

<hr>

{{ jekyll }}

{{ jekyll.environment }}

{{ jekyll | debug }}

<hr>

[https://github.com/jekyll/jekyll-mentions](https://github.com/jekyll/jekyll-mentions)

Hey @mozgbrasil, what do you think of this?

<hr>

[https://github.com/benbalter/jekyll-avatar/blob/master/README.md](https://github.com/benbalter/jekyll-avatar/blob/master/README.md)

{% avatar mozgbrasil %}

<hr>

{{ site.theme }}

<hr>

{% comment %}
{{ site.github }}
{{ site | debug }}
{{ page | debug }}
{{ site.posts | debug }}
{{ paginator | debug }}
{% endcomment %}
