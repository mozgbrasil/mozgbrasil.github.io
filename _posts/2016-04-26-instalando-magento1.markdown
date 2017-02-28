---
layout: post
title:  "Instalando o Magento1 usando o Composer"
date:   2016-04-26 14:01:02
category: magento
author: Marcio Amorim
tags: [magento2, php]
excerpt: "Nesse artigo será exibido detalhadamente os processos feito via terminal para a instalação usando o Composer"
---

Ola

Sempre utilize como base as referências presentes na documentação da plataforma

https://magento.com/resources/technical

Sugiro ler a documentação do Magento 1 para uma melhor experiencia no uso da plataforma

http://docs.magento.com/m1/ce/user_guide/Magento_Community_Edition_User_Guide.html

Execute os comandos efetuando as devidas alterações personalizando para seu projeto

# Criação de diretório e atualização do Composer

	cd ~/dados/public_html ;\
	pwd ;\
	ls ;\
	mkdir magento-1.9.3.2-dev35 ;\
	cd magento-1.9.3.2-dev35 ;\
	composer --version && sudo composer self-update && composer clear-cache

# Download Magento
	# https://razbakov.com/blog/install-magento-via-composer
	#
	# Quando aparecer "please define your magento root dir [root]"
	# 
	# tecle ENTER, isso irá instalar o Magento nessa pasta root

	composer require magento-hackathon/magento-composer-installer ~3.0 ;\
	composer require aydin-hassan/magento-core-composer-installer ~1.2 ;\
	composer require firegento/magento ~1.9.3.1 ;\
	composer update -vvv --profile

<!--

# Comentado devido ao erro https://github.com/firegento/magento/issues/51#

# FIX: new root folder to current folder
	# Na edição do composer.json altere para
	# "magento-root-dir": "./"

	rm ./root/composer.json ;\
	rm ./root/README.md ;\
	mv ./root/{.[!.],}* . ;\
	rm -fr ./root ;\
	nano composer.json
-->

# Criar Banco de dados

	mysqladmin -u root -p CREATE "magento-1.9.3.2-dev35"

# Sample Data

	cd root ;\
	wget https://raw.githubusercontent.com/Vinai/compressed-magento-sample-data/1.9.1.0/compressed-no-mp3-magento-sample-data-1.9.1.0.tar.7z ;\
	7za x compressed-no-mp3-magento-sample-data-1.9.1.0.tar.7z ;\
	tar -xvf compressed-no-mp3-magento-sample-data-1.9.1.0.tar ;\
	cp -ri magento-sample-data-1.9.1.0/media/* ./media/ ;\
	mysql -h 'localhost' -u 'root' -p 'magento-1.9.3.2-dev35' < 'magento-sample-data-1.9.1.0/magento_sample_data_for_1.9.1.0.sql' ;\
	rm -fr compressed-no-mp3-magento-sample-data-1.9.1.0.tar compressed-no-mp3-magento-sample-data-1.9.1.0.tar.7z magento-sample-data-1.9.1.0

# Instalar Magento

	php -f install.php -- \
	--license_agreement_accepted "yes" \
	--locale "pt_BR" \
	--timezone "America/Sao_Paulo" \
	--default_currency "BRL" \
	--db_host "localhost" \
	--db_name "magento-1.9.3.2-dev35" \
	--db_user "root" \
	--db_pass "???" \
	--url "http://127.0.0.1/public_html/magento-1.9.3.2-dev35/root/" \
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

# Permissões

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

# Instalar extensões via Composer

	# Certique se da existencia do arquivo composer.json na raiz do projeto Magento e que o mesmo tenha os trechos "minimum-stability", "prefer-stable", "repositories" e "magento-root-dir", conforme
	#
	# https://gist.github.com/mozgbrasil/0c9bb8792ea6273ea24aed30b0fbcfba
	#
	# Caso não exista o arquivo composer.json na raiz do projeto Magento, efetue o download
	#
	# wget https://gist.githubusercontent.com/mozgbrasil/0c9bb8792ea6273ea24aed30b0fbcfba/raw/b53c403620c111c43834fec9aa025809d1cb96b1/composer.json

	cd .. ;\
	nano composer.json ;\
	composer diagnose && composer show -i ;\
	composer require connect20/mage_locale_pt_br ;\
	composer require aschroder/smtp_pro ;\
	composer require aoepeople/aoe_scheduler ;\
	composer require magento-hackathon/hackathon_magemonitoring ;\
	composer require jayelkaake/enhancedgrid ;\
	composer require husseycoding/customordergrid ;\
	composer require mozgbrasil/magento-brasil-regions ;\
	composer require mozgbrasil/magento-iwd-opc ;\
	composer require connect20/clarion_customerattribute ;\
	composer require madalinoprea/magneto-debug ;\
	composer require connect20/fooman_sameorderinvoicenumber ;\
	composer require connect20/pedroteixeira_correios

	# No uso do PHP 7

	composer require inchoo/php7

	# As Urls abaixo aponta para a descrição de cada módulo

	# https://www.magentocommerce.com/magento-connect/magento-official-portuguese-translation.html
	# http://packages.firegento.com/#aschroder/smtp_pro
	# https://packagist.org/packages/aoepeople/aoe_scheduler
	# http://packages.firegento.com/#magento-hackathon/hackathon_magemonitoring
	# http://packages.firegento.com/#jayelkaake/enhancedgrid
	# http://packages.firegento.com/#husseycoding/customordergrid
	# https://packagist.org/packages/mozgbrasil/magento-iwd-opc
	# https://www.magentocommerce.com/magento-connect/customer-attributes-extra-fields-for-registration-form-1.html

	# Config aschroder/smtp_pro

	# smtppro/general/option 				smtp
	# smtppro/general/smtp_authentication	login
	# smtppro/general/smtp_username			mailer@mozg.com.br
	# smtppro/general/smtp_password			???
	# smtppro/general/smtp_host				smtp.zoho.com
	# smtppro/general/smtp_port				465
	# smtppro/general/smtp_ssl				ssl

	# Config SQL

	# SELECT * FROM `core_config_data` WHERE `value` like '%@%';

# Instalar extensões via terminal

	cd root ;\
	wget http://mariosam.com.br/wp-content/uploads/2013/02/Traducao_Magento_ptBR_19xx_MarioSAM_v12.zip ;\
	unzip Traducao_Magento_ptBR_19xx_MarioSAM_v12.zip ;\
	cp -fr Traducao_Magento_ptBR_19xx_MarioSAM/pt_BR/* ./app/locale/pt_BR/ ;\
	rm -fr Traducao_Magento_ptBR_19xx_MarioSAM __MACOSX Traducao_Magento_ptBR_19xx_MarioSAM_v12.zip

{% comment %}

	wget --no-check-certificate https://raw.githubusercontent.com/cerebrumgit/cerebrum/master/wizard_module.sh ;\
	chmod +x ./wizard_module.sh ;\
	./wizard_module.sh 5.6

	cd ..
	composer require mozgbrasil/magento-bundle-php56 --ignore-platform-reqs
	composer update --ignore-platform-reqs

{% endcomment %}

# Usando links simbólicos no Magento

Copie os arquivos .htaccess e index.php da pasta onde se encontra o Magento e coloque na raiz do projeto em seguida execute os comandos para criação dos links simbólicos

	ln -s root/app
	ln -s root/errors
	ln -s root/includes
	ln -s root/js
	ln -s root/lib
	ln -s root/media
	ln -s root/skin
	ln -s root/var
	ln -s root/sitemap

# Habilitar exibição do erro no Magento

No magento edite o arquivo index.php e retire o comentário # devendo ficar como abaixo

	ini_set('display_errors', 1);

# Ativar modo desenvolvedor no Magento

Edite o arquivo .htacces e adicione 

	SetEnv MAGE_IS_DEVELOPER_MODE "true"

Esse recurso é legal pois exibe os erros de scripts

O uso desse recurso pode gerar alguns erros como por exemplo

Warning: include(StaLib/Logger.php): failed to open stream: No such file or directory  in /home/marcio/dados/public_html/magento-1.9.3.2-dev35/root/lib/Varien/Autoload.php on line 94

O fato de existir o script abaixo em qualquer controller já dispara o erro acima

	if (class_exists('\StaLib_Logger')) {}

# Visualizar erros do servidor

No terminal pode ser o comando para a visualização do log de erro do servidor

	tail -f /var/log/apache2/error.log