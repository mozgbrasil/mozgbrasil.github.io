---
layout: post
title:  "Instalando o Magento1"
date:   2016-04-26 14:01:02
category: Magento1
author: Marcio Amorim
tags: [magento2, php]
excerpt: "Nesse artigo será exibido detalhadamente os processos feito via terminal para a instalação do Magento1"
---

## Introdução

Ola Boa Tarde

Execute os comandos efetuando as devidas alterações personalizando para seu projeto

{% highlight ruby %}

cd ~/dados/public_html ;\
pwd ;\
ls ;\
mkdir magento-1.9.2.4-dev31 ;\
cd magento-1.9.2.4-dev31 ;\
composer --version && sudo composer self-update && composer clear-cache

# Download Magento
# https://razbakov.com/blog/install-magento-via-composer
# Quando aparecer
# please define your magento root dir [root]
# tecle ENTER, isso irá instalar o Magento nessa pasta root

composer require magento-hackathon/magento-composer-installer ~3.0 ;\
composer require aydin-hassan/magento-core-composer-installer ~1.2 ;\
composer require firegento/magento ~1.9.2.4 ;\
composer update -vvv --profile

# FIX: new root folder to current folder
# Na edição do composer.json altere para
# "magento-root-dir": "./"

rm ./root/composer.json ;\
rm ./root/README.md ;\
mv ./root/{.[!.],}* . ;\
rm -fr ./root ;\
nano composer.json

# Create Database

mysqladmin -u root -p DROP "magento-1.9.2.4-dev31" ;\
mysqladmin -u root -p CREATE "magento-1.9.2.4-dev31"

# Sample Data

wget https://raw.githubusercontent.com/Vinai/compressed-magento-sample-data/1.9.1.0/compressed-no-mp3-magento-sample-data-1.9.1.0.tar.7z ;\
7za x compressed-no-mp3-magento-sample-data-1.9.1.0.tar.7z ;\
tar -xvf compressed-no-mp3-magento-sample-data-1.9.1.0.tar ;\
cp -ri magento-sample-data-1.9.1.0/media/* ./media/ ;\
mysql -h 'localhost' -u 'root' -p 'magento-1.9.2.4-dev31' < 'magento-sample-data-1.9.1.0/magento_sample_data_for_1.9.1.0.sql' ;\
rm -fr compressed-no-mp3-magento-sample-data-1.9.1.0.tar compressed-no-mp3-magento-sample-data-1.9.1.0.tar.7z magento-sample-data-1.9.1.0

# Install Magento

php -f install.php -- \
--license_agreement_accepted "yes" \
--locale "pt_BR" \
--timezone "America/Sao_Paulo" \
--default_currency "BRL" \
--db_host "localhost" \
--db_name "magento-1.9.2.4-dev31" \
--db_user "root" \
--db_pass "???" \
--url "http://127.0.0.1/public_html/magento-1.9.2.4-dev31/" \
--skip_url_validation "yes" \
--use_rewrites "yes" \
--use_secure "no" \
--secure_base_url "" \
--use_secure_admin "no" \
--admin_firstname "Marcio" \
--admin_lastname "Amorim" \
--admin_email "mailer@mozg.com.br" \
--admin_username "admin" \
--admin_password "123456a"

# Permission

chmod 777 -R .

# Magento /shell

php shell/compiler.php --state ;\
php shell/log.php --clean ;\
php shell/indexer.php --status ;\
php shell/indexer.php --info ;\
php shell/indexer.php --reindexall

# Magento ./mage command-line
# Install Extensions via MagentoConect

./mage ;\
./mage mage-setup ;\
./mage sync ;\
./mage list-installed ;\
./mage list-upgrades ;\
./mage install http://connect20.magentocommerce.com/community Mage_Locale_pt_BR

# Install Extensions via Composer

# Certique se que no arquivo composer.json tenha o trecho "stability" e "repositories", conforme
# https://gist.github.com/mozgbrasil/0c9bb8792ea6273ea24aed30b0fbcfba

nano composer.json ;\
composer require aschroder/smtp_pro ;\
composer require aoepeople/aoe_scheduler ;\
composer require mozgbrasil/magento-bundle-php56

# Caso venha a ocorrer o erro abaixo eu editei o compose.json e retirei o suporte ao "repositories" packages.magento.com
#
# Installation failed, reverting ./composer.json to its original content. The following exception is caused by a lack of memory and not having swap configured Check https://getcomposer.org/doc/articles/troubleshooting.md#proc-open-fork-failed-errors for details

# Install Cerebrum_Telencephalon

wget --no-check-certificate https://raw.githubusercontent.com/cerebrumgit/cerebrum/master/wizard_module.sh ;\
chmod +x ./wizard_module.sh ;\
./wizard_module.sh 5.6

{% endhighlight %}


### Habilitar exibição do erro no Magento

No magento edite o arquivo index.php e retire o comentário # devendo ficar como abaixo

	ini_set('display_errors', 1);

Edite o arquivo .htacces e adicione 

	SetEnv MAGE_IS_DEVELOPER_MODE "true"