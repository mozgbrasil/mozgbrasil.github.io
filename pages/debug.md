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

{% if node.url contains 'node_modules' %}
{% assign has_node_modules = "yes" %}
{% else %}
{% assign has_node_modules = "no" %}
{% endif %}

{% if has_node_modules == "no" %}

{{ node.url }} - {{ node.title }}

{% endif %}
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
