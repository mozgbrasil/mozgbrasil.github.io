---
layout: post
title:  "Dicas para o Magento 2"
date:   2016-05-04 16:01:04
category: dicas
author: Marcio Amorim
tags: [magento, php, apache, mysql]
excerpt: "Nesse artigo é exibido diversas dicas relativa ao Magento 2"
---

# Magento 2

## Como ativar a CRON no Magento

No terminal ao executar o comando

	crontab -e

Informe 

	*/1 * * * * /usr/bin/php -c /etc/php/7.0/apache2/php.ini /home/marcio/dados/public_html/magento-2.1.0-dev36/bin/magento cron:run >> /home/marcio/dados/public_html/magento-2.1.0-dev36/var/log/magento.cron.log&

	*/1 * * * * /usr/bin/php -c /etc/php/7.0/apache2/php.ini /home/marcio/dados/public_html/magento-2.1.0-dev36/update/cron.php >> /home/marcio/dados/public_html/magento-2.1.0-dev36/var/log/update.cron.log&

	*/1 * * * * /usr/bin/php -c /etc/php/7.0/apache2/php.ini /home/marcio/dados/public_html/magento-2.1.0-dev36/bin/magento setup:cron:run >> /home/marcio/dados/public_html/magento-2.1.0-dev36/var/log/setup.cron.log&

Esse modelo está baseado em meu ambiente local, portanto pode haver variação para cada ambiente

## Composer não está baixando a ultima versão do módulo

Conforme issue

https://github.com/composer/composer/issues/5259#issuecomment-215372345

No uso do comando

	composer show -i

É exibido o módulo e sua versão

Vemos em

https://packagist.org/packages/mozgbrasil/framework-php56

Que a ultima versão é a 1.0.0-rc.4

Vemos na issue que o criador do composer aplicou um suporte no composer devido a essa falha que relatei onde ele pede para usar o seguinte comando

	composer why-not mozgbrasil/framework-php56:1.0.0-rc.4

Onde deve ser exibido o motivo para não ter baixado essa versão

Vejo que em seu servidor é usado o composer 1.0.2 e o composer está na versão 1.1.0, mas não consigo atualizar o composer em seu servidor, entre com o administrador do servidor para que seja feito a atualização do composer, não é obrigatório isso, mas sempre é bom

Como provavelmente se trata da ausencia de componente de servidor com o comando a seguir podemos ver se o mesmo se encontra habilitado em seu servidor

	php -i | grep -i 'Zend Guard Loader'

Vemos que o Zend Guard Loader' não foi habilitado no php-client, foi somente habilitado no php-web

http://magento-12167-29282-97450.cloudwaysapps.com/phpinfo.php

Precisa habilitar no php-client e em seguida usar o comando para baixar módulos atualizados

Obs.

No seguinte artigo informa que o Zend Guard Loader deve ser habilitado em ambos casos

http://mozg.com.br/zend%20guard%20loader/ativando-zend-guard-loader


## Registros Cron

A tabela `cron_schedule` armazena as tarefas a executar e executadas

	TRUNCATE `cron_schedule`;
	SELECT * FROM `cron_schedule`;
	SELECT * FROM `cron_schedule` WHERE `job_code` like '%mozg%' AND `status` != 'success';

## Reexecutar os scripts de setup do módulo

	-- add table prefix if you have one
	DROP TABLE IF EXISTS mozg_boxpacker_packing;
	SELECT * FROM `setup_module` WHERE `module` like '%mozg%';
	DELETE FROM setup_module WHERE module like '%mozg%';
	DELETE FROM core_config_data WHERE path like '%mozg%';

## Limpando arquivos de cache

	sudo rm -R -f ./var/log \
	./var/report \
	./var/cache \
	./var/di \
	./var/generation \
	./var/page_cache \
	./pub/static/*
