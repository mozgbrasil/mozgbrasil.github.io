---
layout: post
title:  "Instalando o Magento2"
date:   2016-04-26 14:01:03
category: Magento2
author: Marcio Amorim
tags: [magento2, php]
excerpt: "Nesse artigo será exibido detalhadamente os processos feito via terminal para a instalação do Magento2"
---

[phpinfo]:http://ec2-54-232-215-118.sa-east-1.compute.amazonaws.com/public_html/phpinfo.php
[crowdin]:https://crowdin.com/project/magento-2/pt-BR

## Introdução

Ola Boa Tarde

Veja na apresentação os processos executados

Foi feito acesso via terminal ao servidor da amazon onde na execução dos comandos foi feito a instalação do Magento 2 sobre o [Servidor][phpinfo]

<div class="ui embed" data-source="youtube" data-id="7vXrTYFPJt0"></div>
<script>
$('.ui.embed').embed();
</script>

Execute os comandos efetuando as devidas alterações personalizando para seu projeto

{% highlight ruby %}

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

{% endhighlight %}

{% comment %}

composer require magento2translations/language_pt_br:dev-master ;\
composer require adyen/module-payment ;\
composer require bleez/smtp ;\
composer require mozgbrasil/framework-php56 --ignore-platform-reqs

{% endcomment %}

<h1 class="ui header">Para atualizar a plataforma deve se executar o comando a seguir</h1>

{% highlight ruby %}

echo -e "\e[1;31m --(Processo 1)-- \e[0m" ;\
sudo chmod 777 -R . ;\
echo -e "\e[1;31m --(Processo 2)-- \e[0m" ;\
php bin/magento cache:disable ;\
echo -e "\e[1;31m --(Processo 3)-- \e[0m" ;\
php bin/magento cache:clean ;\
echo -e "\e[1;31m --(Processo 4)-- \e[0m" ;\
php bin/magento cache:flush ;\
echo -e "\e[1;31m --(Processo 5)-- \e[0m" ;\
php bin/magento cache:status ;\
echo -e "\e[1;31m --(Processo 6)-- \e[0m" ;\
php bin/magento deploy:mode:show ;\
echo -e "\e[1;31m --(Processo 6)-- \e[0m" ;\
php bin/magento deploy:mode:set developer ;\
echo -e "\e[1;31m --(Processo 7)-- \e[0m" ;\
php bin/magento indexer:reindex ;\
echo -e "\e[1;31m --(Processo 8)-- \e[0m" ;\
php bin/magento indexer:status ;\
echo -e "\e[1;31m --(Processo 9)-- \e[0m" ;\
php bin/magento maintenance:disable ;\
echo -e "\e[1;31m --(Processo 10)-- \e[0m" ;\
php bin/magento maintenance:status ;\
echo -e "\e[1;31m --(Processo 11)-- \e[0m" ;\
php bin/magento module:status ;\
echo -e "\e[1;31m --(Processo 12)-- \e[0m" ;\
php bin/magento setup:db:status ;\
echo -e "\e[1;31m --(Processo 13)-- \e[0m" ;\
php bin/magento setup:upgrade ;\
echo -e "\e[1;31m --(Processo 14)-- \e[0m" ;\
sudo chmod 777 -R . ;\
echo -e "\e[1;31m --(Processo 15)-- \e[0m" ;\
pwd ;\
echo -e "\e[1;31m --(Processo 16)-- \e[0m" ;\
php bin/magento ;\
echo -e "\e[1;31m --(Processo 17)-- \e[0m" ;\
php bin/magento cron:run ;\
echo -e "\e[1;31m --(Processo 18)-- \e[0m" ;\
php update/cron.php ;\
echo -e "\e[1;31m --(Processo 19)-- \e[0m" ;\
php bin/magento setup:cron:run ;\
echo -e "\e[1;31m --(Processo 20)-- \e[0m" ;\
sudo chmod 777 -R .

{% endhighlight %}

https://mirasvit.com/blog/7-ways-to-improve-your-magento-2-site-speed.html

http://devdocs.magento.com/guides/v2.0/config-guide/memcache/memcache_ubuntu.html

http://devdocs.magento.com/guides/v2.0/config-guide/redis/config-redis.html