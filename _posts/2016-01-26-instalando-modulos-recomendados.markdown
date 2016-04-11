---
layout: post
title:  "Instalando módulos de terceiros no Magento2"
date:   2016-01-26 16:20:11
category: Módulos
author: Marcio Amorim
tags: [magento2, composer]
excerpt: "Nesse artigo é exibido o uso do composer para a instalação de módulos de terceiros que estou testando"
---

[phpinfo]:http://ec2-54-232-215-118.sa-east-1.compute.amazonaws.com/public_html/phpinfo.php
[magento2-bundle-php55]:https://github.com/mozgbrasil/magento2-bundle-php55
[magento2-bundle-php56]:https://github.com/mozgbrasil/magento2-bundle-php56

Ola Boa Tarde

Cada bloco de comando abaixo instala o devido módulo no Magento2, devendo em seguida registrar o mesmo para uso

{% highlight ruby %}

composer require esilvajr/pagseguro-magento2:dev-master

composer require sebwite/magento2-smartsearch:*

composer require sebwite/magento2-category-sidebar:*

composer require sebwite/magento2-product-downloads:*

composer require ashsmith/magento2-blog-module-example:*

composer require paynl/magento2-plugin:*

composer require narayanvarma/magento2-google-tagmanager:*

composer require ebizmarts/magento2-abandonedcart:*

composer require ebizmarts/magento2-autoresponder:*

composer require cedricblondeau/magento2-module-catalog-import-command:*

composer require nabooru/module-address-validation-core:dev-master

composer require nabooru/module-address-validation-adapter-dummy:dev-master

composer require scandiweb/facebook-login:*

# ERRO AO USAR O COMPILER
composer require richdynamix/personalised-products:*

composer config repositories.ultimatemodulecreator-umc-base git git@github.com:UltimateModuleCreator/Umc_Base.git
composer require ultimatemodulecreator/umc-base:dev-master

composer config repositories.ced git https://github.com/cedcommerce/Magento2-Developer-Debug-Tool
composer require cedcommerce/magento2-developer-debug-tool:*

composer config repositories.hackathon-orderitemcomments vcs https://github.com/magento-hackathon/Hackathon_OrderItemComments
composer require hackathon/module-orderitemcomments:dev-master

composer config repositories.magento2-gridconfigshare vcs https://github.com/magento-hackathon/Magento2-GridConfigShare
composer require magento-hackathon/magento2-gridconfigshare:dev-master

composer config repositories.swissup/countdowntimer vcs git@github.com:swissup/countdowntimer.git
composer require swissup/countdowntimer

composer config repositories.mirasvit-profiler vcs https://github.com/mirasvit/module-profiler
composer require mirasvit/module-profiler:dev-master

{% endhighlight %}

Para registrar o módulo e atualizar a plataforma deve se executar o comando a seguir

{% highlight ruby %}

echo -e "\e[1;31m --(Processo 1)-- \e[0m" ;\
sudo chmod 777 -R . ;\
echo -e "\e[1;31m --(Processo 2)-- \e[0m" ;\
php bin/magento -vvv cache:disable ;\
echo -e "\e[1;31m --(Processo 3)-- \e[0m" ;\
php bin/magento -vvv cache:clean ;\
echo -e "\e[1;31m --(Processo 4)-- \e[0m" ;\
php bin/magento -vvv cache:flush ;\
echo -e "\e[1;31m --(Processo 5)-- \e[0m" ;\
php bin/magento -vvv cache:status ;\
echo -e "\e[1;31m --(Processo 6)-- \e[0m" ;\
php bin/magento -vvv deploy:mode:show ;\
echo -e "\e[1;31m --(Processo 7)-- \e[0m" ;\
php bin/magento -vvv indexer:reindex ;\
echo -e "\e[1;31m --(Processo 8)-- \e[0m" ;\
php bin/magento -vvv indexer:status ;\
echo -e "\e[1;31m --(Processo 9)-- \e[0m" ;\
php bin/magento -vvv maintenance:disable ;\
echo -e "\e[1;31m --(Processo 10)-- \e[0m" ;\
php bin/magento -vvv maintenance:status ;\
echo -e "\e[1;31m --(Processo 11)-- \e[0m" ;\
php bin/magento -vvv module:status ;\
echo -e "\e[1;31m --(Processo 12)-- \e[0m" ;\
php bin/magento -vvv setup:db:status ;\
echo -e "\e[1;31m --(Processo 13)-- \e[0m" ;\
php bin/magento -vvv setup:upgrade ;\
echo -e "\e[1;31m --(Processo 14)-- \e[0m" ;\
sudo chmod 777 -R . ;\
echo -e "\e[1;31m --(Processo 15)-- \e[0m" ;\
pwd

{% endhighlight %}
