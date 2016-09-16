---
layout: post
title:  "Ativando o Zend Guard Loader sob o servidor web"
date:   2016-04-26 14:01:01
category: Zend Guard Loader
author: Marcio Amorim
tags: [magento2, php]
excerpt: "Nesse artigo será exibido detalhadamente o processo usado para ativar o Zend Guard Loader no servidor"
---

[phpinfo]:http://ec2-54-232-215-118.sa-east-1.compute.amazonaws.com/public_html/phpinfo.php

# Oi

# Como instalar o "Zend Guard Loader" em meu servidor?

Acesse

http://www.zend.com/en/products/loader/downloads

Deve ser feito o download do Zend Guard Loader baseado na versão do PHP do seu servidor

Ao efetuar o download e extração do "Zend Guard Loader", leia o arquivo o "README.txt", nele está contido a instrução para ativar o módulo para qualquer servidor

Veja que o processo é super simples devendo apenas editar os arquivos que aplicam o suporte da extensão de servidor para o ambiente cliente e web do PHP

	sudo nano /etc/php5/cli/php.ini

	sudo nano /etc/php5/apache2/php.ini

e informar o conteúdo baseado no modelo a seguir

	[zendloader]
	zend_extension=/home/ubuntu/zend-loader-php5.5-linux-x86_64/ZendGuardLoader.so
	zend_extension=/home/ubuntu/zend-loader-php5.5-linux-x86_64/opcache.so

Voce só deve alterar o caminho correspondente a seu ambiente

Em seguida reiniciamos o servidor

	sudo service apache2 restart

Obs. 
Na ocorrência de problemas certifique se foi informado o caminho correto em "zend_extension"
Na ocorrência de problemas de servidor, sugiro analisar o log do servidor onde deve ser apontado o motivo da ocorrência
Certifique se de ter reiniciado o servidor

Devido o "Zend Guard Loader" se tratar de ferramenta de terceiros, dúvidas ou problemas sugiro entrar em contato direto com a Zend, abrindo uma interação no forum do "Zend Guard Loader"

http://forums.zend.com/viewforum.php?f=57&sid=8556b95ded7978a11c27ca31de8592d4

Para usuários do "Zend Server" o módulo "Zend Guard Loader" já vem instalado no servidor, necessitando somente de ativar o mesmo.

http://www.zend.com/en/products/server/

Veja que esses procedimentos está documentado em

http://files.zend.com/help/Zend-Guard/content/installing_zend_guard_loader.htm

# Processos executados sobre o Servidor Apache

Veja no video que é exibido diversas imagens relativas aos processos executados

Foi feito acesso via terminal ao servidor da amazon onde na execução dos comandos foi ativação da extensão "Zend Guard Loader" sobre o [Servidor][phpinfo]


<div class="embed-responsive embed-responsive-16by9">
    <iframe class="embed-responsive-item" src="//www.youtube.com/watch?v=sUfE6Rf7w14"></iframe>
</div>

Executando o seguinte comando temos o resultado se está ativo o recurso no ambiente client

	php -i | grep -i 'Zend Guard Loader'

Executando o seguinte comando temos o resultado se está ativo o recurso no ambiente web

	curl -v --silent http://52.67.2.27/public_html/phpinfo.php 2>&1 | grep 'Zend Guard Loader'