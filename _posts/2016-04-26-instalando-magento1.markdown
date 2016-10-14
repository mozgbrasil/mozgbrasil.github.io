---
layout: post
title:  "Instalando o Magento1 usando o Composer"
date:   2016-04-26 14:01:02
category: Magento1
author: Marcio Amorim
tags: [magento2, php]
excerpt: "Nesse artigo será exibido detalhadamente os processos feito via terminal para a instalação usando o Composer"
---

Ola

Execute os comandos efetuando as devidas alterações personalizando para seu projeto

# Criação de diretório e atualização do Composer

	cd ~/dados/public_html ;\
	pwd ;\
	ls ;\
	mkdir magento-1.9.3.0-dev32 ;\
	cd magento-1.9.3.0-dev32 ;\
	composer --version && sudo composer self-update && composer clear-cache

# Download Magento
	# https://razbakov.com/blog/install-magento-via-composer
	#
	# Quando aparecer "please define your magento root dir [root]"
	# 
	# tecle ENTER, isso irá instalar o Magento nessa pasta root

	composer require magento-hackathon/magento-composer-installer ~3.0 ;\
	composer require aydin-hassan/magento-core-composer-installer ~1.2 ;\
	composer require firegento/magento ~1.9.3.0 ;\
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

	mysqladmin -u root -p DROP "magento-1.9.3.0-dev32" ;\
	mysqladmin -u root -p CREATE "magento-1.9.3.0-dev32"

# Sample Data

	wget https://raw.githubusercontent.com/Vinai/compressed-magento-sample-data/1.9.1.0/compressed-no-mp3-magento-sample-data-1.9.1.0.tar.7z ;\
	7za x compressed-no-mp3-magento-sample-data-1.9.1.0.tar.7z ;\
	tar -xvf compressed-no-mp3-magento-sample-data-1.9.1.0.tar ;\
	cp -ri magento-sample-data-1.9.1.0/media/* ./media/ ;\
	mysql -h 'localhost' -u 'root' -p 'magento-1.9.3.0-dev32' < 'magento-sample-data-1.9.1.0/magento_sample_data_for_1.9.1.0.sql' ;\
	rm -fr compressed-no-mp3-magento-sample-data-1.9.1.0.tar compressed-no-mp3-magento-sample-data-1.9.1.0.tar.7z magento-sample-data-1.9.1.0

# Install Magento

	php -f install.php -- \
	--license_agreement_accepted "yes" \
	--locale "pt_BR" \
	--timezone "America/Sao_Paulo" \
	--default_currency "BRL" \
	--db_host "localhost" \
	--db_name "magento-1.9.3.0-dev32" \
	--db_user "root" \
	--db_pass "???" \
	--url "http://127.0.0.1/public_html/magento-1.9.3.0-dev32/" \
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

	echo -e "\e[1;33m --(Processo 1)-- \e[0m" ;\
	php shell/compiler.php --state ;\
	echo -e "\e[1;33m --(Processo 2)-- \e[0m" ;\
	php shell/log.php --clean ;\
	echo -e "\e[1;33m --(Processo 3)-- \e[0m" ;\
	php shell/indexer.php --status ;\
	echo -e "\e[1;33m --(Processo 4)-- \e[0m" ;\
	php shell/indexer.php --info ;\
	echo -e "\e[1;33m --(Processo 5)-- \e[0m" ;\
	php shell/indexer.php --reindexall

# Magento ./mage command-line
	# Install Extensions via MagentoConect

	echo -e "\e[1;33m --(Processo 1)-- \e[0m" ;\
	./mage ;\
	echo -e "\e[1;33m --(Processo 2)-- \e[0m" ;\
	./mage mage-setup ;\
	echo -e "\e[1;33m --(Processo 3)-- \e[0m" ;\
	./mage sync ;\
	echo -e "\e[1;33m --(Processo 4)-- \e[0m" ;\
	./mage list-installed ;\
	echo -e "\e[1;33m --(Processo 5)-- \e[0m" ;\
	./mage list-upgrades ;\
	echo -e "\e[1;33m --(Processo 6)-- \e[0m" ;\
	./mage install http://connect20.magentocommerce.com/community Mage_Locale_pt_BR

# Install Extensions via Composer

	# Certique se da existencia do arquivo composer.json na raiz do projeto Magento e que o mesmo tenha os trechos "minimum-stability", "prefer-stable", "repositories" e '"magento-root-dir":"./"', conforme
	#
	# https://gist.github.com/mozgbrasil/0c9bb8792ea6273ea24aed30b0fbcfba
	#
	# Caso não exista o arquivo composer.json na raiz do projeto Magento, efetue o download
	#
	# wget https://gist.githubusercontent.com/mozgbrasil/0c9bb8792ea6273ea24aed30b0fbcfba/raw/b53c403620c111c43834fec9aa025809d1cb96b1/composer.json

	nano composer.json ;\
	composer diagnose && composer show -i ;\
	composer require connect20/mage_locale_pt_br ;\
	composer require aschroder/smtp_pro ;\
	composer require aoepeople/aoe_scheduler ;\
	composer require magento-hackathon/hackathon_magemonitoring ;\
	composer require jayelkaake/enhancedgrid ;\
	composer require husseycoding/customordergrid

# Habilitar exibição do erro no Magento

No magento edite o arquivo index.php e retire o comentário # devendo ficar como abaixo

	ini_set('display_errors', 1);

Edite o arquivo .htacces e adicione 

	SetEnv MAGE_IS_DEVELOPER_MODE "true"

No terminal pode ser o comando para a visualização do log de erro do servidor

	tail -f /var/log/apache2/error.log


{% comment %}

# Install Cerebrum_Telencephalon

	wget --no-check-certificate https://raw.githubusercontent.com/cerebrumgit/cerebrum/master/wizard_module.sh ;\
	chmod +x ./wizard_module.sh ;\
	./wizard_module.sh 5.5

composer require inchoo/php7

wget --no-check-certificate https://www.dropbox.com/s/tsak00jso89ko5f/iwd_onepagecheckout_free-4.3.0_1.tgz
./mage install-file iwd_onepagecheckout_free-4.3.0_1.tgz

wget --no-check-certificate http://iwdextensions.com/media/modules/iwd_all.tgz
./mage install-file iwd_all.tgz

{% endcomment %}