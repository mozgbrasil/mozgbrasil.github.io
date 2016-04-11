---
layout: post
title:  "Instalando o Magento1"
date:   2016-01-04 17:36:05
category: Magento2
author: Marcio Amorim
tags: [magento2, php]
excerpt: "Nesse artigo será exibido detalhadamente os processos feito via terminal para a instalação do Magento1"
---

[phpinfo]:http://ec2-54-232-215-118.sa-east-1.compute.amazonaws.com/public_html/phpinfo.php

## Introdução

Ola Boa Tarde

Execute os comandos efetuando as devidas alterações personalizando para seu projeto

{% highlight ruby %}

pwd

ls

cd public_html

mkdir magento-1.9.2.4-dev29

cd magento-1.9.2.4-dev29

composer --version && sudo composer self-update && composer clear-cache

composer require magento-hackathon/magento-composer-installer ~3.0
composer require aydin-hassan/magento-core-composer-installer ~1.2
composer require firegento/magento ~1.9.2.4

{% endhighlight %}

<h1 class="ui header">Fonte</h1>

https://razbakov.com/blog/install-magento-via-composer