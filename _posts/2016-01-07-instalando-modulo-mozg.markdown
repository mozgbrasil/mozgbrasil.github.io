---
layout: post
title:  "Instalando os módulos da MOZG no Magento2"
date:   2016-01-07 15:52:52
category: instalação
author: Marcio Amorim
tags: [magento2, composer]
excerpt: "Nesse artigo é exibido o uso do composer para a instalação dos módulos"
---

[phpinfo]:http://ec2-54-232-215-118.sa-east-1.compute.amazonaws.com/public_html/phpinfo.php
[magento2-bundle-php55]:https://github.com/mozgbrasil/magento2-bundle-php55
[magento2-bundle-php56]:https://github.com/mozgbrasil/magento2-bundle-php56

Ola Boa Tarde

Veja na apresentação os processos executados

Foi feito acesso via terminal ao servidor da amazon onde na execução dos comandos foi instalado via composer os módulos no Magento 2

<div class="ui raised padded container segment">
	<h2 class="ui header">Slide</h2>
	<div class="ui embed" data-url="//www.slideshare.net/slideshow/embed_code/key/LjBUlmiPDuf2VE"></div>
	<script>
	$('.ui.embed').embed();
	</script>
</div>

Executando o seguinte comando temos a versão do PHP do servidor

{% highlight ruby %}
php -v
{% endhighlight %}

No uso do PHP 5.5.x deve ser seguido as instruções em [GitHub][magento2-bundle-php55]

No uso do PHP 5.6.x deve ser seguido as instruções em [GitHub][magento2-bundle-php56]
