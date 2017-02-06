---
layout: post
title:  "Instalando o Magento2"
date:   2016-04-26 14:01:03
category: magento2
author: Marcio Amorim
tags: [magento2, php]
excerpt: "Nesse artigo será exibido detalhadamente os processos feito via terminal para a instalação do Magento2"
---

[phpinfo]:http://ec2-54-232-215-118.sa-east-1.compute.amazonaws.com/public_html/phpinfo.php
[crowdin]:https://crowdin.com/project/magento-2/pt-BR

Ola

Execute os comandos efetuando as devidas alterações personalizando para seu projeto

# Criação de diretório e atualização do Composer

	cd ~/dados/public_html ;\
	pwd ;\
	ls ;\
	mkdir magento-2.1.0-dev36 ;\
	cd magento-2.1.0-dev36 ;\
	composer --version && sudo composer self-update && composer clear-cache

# Download Magento

	composer create-project --repository-url=https://repo.magento.com/ magento/project-community-edition magento2 -vvv ;\
	ls ;\
	mv magento2/{.[!.],}* . ;\
	sudo chown -R :www-data . ;\
	sudo find . -type d -exec chmod 770 {} \; && sudo find . -type f -exec chmod 660 {} \; && sudo chmod u+x bin/magento ;\
	mysqladmin -u root -p CREATE "magento210dev36"

# Install Magento

	php bin/magento setup:install \
	--base-url=http://127.0.0.1/public_html/magento-2.1.0-dev36/ \
	--backend-frontname=admin \
	--db-host=127.0.0.1 --db-name=magento210dev36 --db-user=root --db-password=??? \
	--admin-firstname=Marcio --admin-lastname=Amorim --admin-email=mailer@mozg.com.br \
	--admin-user=admin --admin-password=123456a --language=pt_BR \
	--currency=BRL --timezone=America/Sao_Paulo \
	--use-sample-data \
	--use-rewrites=1 \
	--cleanup-database

# Sample Data

	sudo chmod 777 -R ./var ./pub ;\
	php index.php ;\
	sudo rm -fR var/cache/* var/page_cache/* var/generation/* ;\
	php bin/magento sampledata:deploy ;\
	composer update -vvv

# Install Extensions via Composer

	composer require magento2translations/language_pt_br:dev-master ;\
	composer require mozgbrasil/magento2-bundle-php56

	# Para cada procedimento deve ser executado os comandos de atualização da plataforma

# Atualizando a plataforma

	echo -e "\e[1;33m --(Processo 1)-- \e[0m" ;\
	sudo chmod 777 -R . ;\
	echo -e "\e[1;33m --(Processo 2)-- \e[0m" ;\
	php bin/magento cache:disable ;\
	echo -e "\e[1;33m --(Processo 3)-- \e[0m" ;\
	php bin/magento cache:clean ;\
	echo -e "\e[1;33m --(Processo 4)-- \e[0m" ;\
	php bin/magento cache:flush ;\
	echo -e "\e[1;33m --(Processo 5)-- \e[0m" ;\
	php bin/magento cache:status ;\
	echo -e "\e[1;33m --(Processo 6)-- \e[0m" ;\
	php bin/magento deploy:mode:show ;\
	echo -e "\e[1;33m --(Processo 6)-- \e[0m" ;\
	php bin/magento deploy:mode:set developer ;\
	echo -e "\e[1;33m --(Processo 7)-- \e[0m" ;\
	php bin/magento indexer:reindex ;\
	echo -e "\e[1;33m --(Processo 8)-- \e[0m" ;\
	php bin/magento indexer:status ;\
	echo -e "\e[1;33m --(Processo 9)-- \e[0m" ;\
	php bin/magento maintenance:disable ;\
	echo -e "\e[1;33m --(Processo 10)-- \e[0m" ;\
	php bin/magento maintenance:status ;\
	echo -e "\e[1;33m --(Processo 11)-- \e[0m" ;\
	php bin/magento module:status ;\
	echo -e "\e[1;33m --(Processo 12)-- \e[0m" ;\
	php bin/magento setup:db:status ;\
	echo -e "\e[1;33m --(Processo 13)-- \e[0m" ;\
	php bin/magento setup:upgrade ;\
	echo -e "\e[1;33m --(Processo 14)-- \e[0m" ;\
	sudo chmod 777 -R . ;\
	echo -e "\e[1;33m --(Processo 15)-- \e[0m" ;\
	pwd ;\
	echo -e "\e[1;33m --(Processo 16)-- \e[0m" ;\
	php bin/magento ;\
	echo -e "\e[1;33m --(Processo 17)-- \e[0m" ;\
	php bin/magento cron:run ;\
	echo -e "\e[1;33m --(Processo 18)-- \e[0m" ;\
	php update/cron.php ;\
	echo -e "\e[1;33m --(Processo 19)-- \e[0m" ;\
	php bin/magento setup:cron:run ;\
	echo -e "\e[1;33m --(Processo 20)-- \e[0m" ;\
	sudo chmod 777 -R .

# Apresentação

Veja na apresentação os processos executados

Foi feito acesso via terminal ao servidor da amazon onde na execução dos comandos foi feito a instalação do Magento 2 sobre o [Servidor][phpinfo]

<div class="">
    <a class="fab google-red" data-g-action="Anthem - Video Start"
        data-g-event="Home" data-g-label="For Enterprise"
        data-glue-modal-disabled-on-mobile="true" data-glue-modal-trigger=
        "ss-yt-7vXrTYFPJt0" href=
        "https://www.youtube.com/watch?v=7vXrTYFPJt0">
        <svg class="icon-fab-video"
            enable-background="new 0 0 32 32" height="24px" version="1.1" viewbox=
            "0 0 32 32" width="24px" x="0px" xml:space="preserve" xmlns=
            "http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" y=
            "0px">
            <path d=
                "M28.8,3.8c-1-0.3-6.9-0.6-12.8-0.6c-5.9,0-11.8,0.3-12.8,0.6C0.7,4.6,0,10.2,0,16s0.7,11.4,3.2,12.2c1,0.3,6.9,0.6,12.8,0.6 c5.9,0,11.8-0.3,12.8-0.6C31.3,27.4,32,21.8,32,16S31.3,4.7,28.8,3.8 M12.8,22.4V9.6l8.8,6.4L12.8,22.4z">
            </path>
        </svg>
        <img alt="" class="icon-fab-video" height="24" src=
            "//www.google.com/ads/images/icons/icon-fab-video.png" width="24">
    </a>
    <div data-glue-modal="ss-yt-7vXrTYFPJt0" data-rs-modal="" id=
        "ss-yt-7vXrTYFPJt0">
        <iframe allowfullscreen="" frameborder="0" height="100%" src=
            "https://www.youtube.com/embed/7vXrTYFPJt0?enablejsapi=1&amp;rel=0" type=
            "text/html" width="100%"></iframe>
    </div>
</div>

https://mirasvit.com/blog/7-ways-to-improve-your-magento-2-site-speed.html

http://devdocs.magento.com/guides/v2.0/config-guide/memcache/memcache_ubuntu.html

http://devdocs.magento.com/guides/v2.0/config-guide/redis/config-redis.html

{% comment %}

composer require magento2translations/language_pt_br:dev-master ;\
composer require adyen/module-payment ;\
composer require bleez/smtp ;\
composer require vpietri/adm-quickdevbar ;\
composer require mozgbrasil/framework-php56 --ignore-platform-reqs

{% endcomment %}