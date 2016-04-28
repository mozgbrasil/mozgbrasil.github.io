---
layout: post
title:  "Ambiente de desenvolvimento no Ubuntu"
date:   2016-04-25 17:36:05
category: Ubuntu
author: Marcio Amorim
tags: [magento2, php]
excerpt: "Nesse artigo será exibido detalhadamente os processos feito via terminal para a instalação dos programas usado para desenvolvimento de softwares"
---

## Introdução

Ola Boa Tarde

Execute os comandos efetuando as devidas alterações personalizando para seu projeto

{% highlight ruby %}

# Ubuntu 16.04

# Dev Server

sudo apt install mysql-server mysql-client phpmyadmin php-cli php-curl php-sqlite3 php-mcrypt php-mbstring php-gettext php-gd php-intl php-xsl php-zip php-soap ;\

mkdir -p ~/dados/public_html ;\
sudo ln -s ~/dados/public_html /var/www/html ;\
echo "<?php phpinfo(); ?>" | sudo tee ~/dados/public_html/phpinfo.php > /dev/null ;\
php -l ~/dados/public_html/phpinfo.php

sudo a2enmod rewrite

sudo usermod -g www-data $USER ; # FIX: Magento2

# Composer

php -r "readfile('https://getcomposer.org/installer');" > composer-setup.php
php -r "if (hash_file('SHA384', 'composer-setup.php') === '7228c001f88bee97506740ef0888240bd8a760b046ee16db8f4095c0d8d525f2367663f22a46b48d072c816e7fe19959') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" ;\
php composer-setup.php ;\
php -r "unlink('composer-setup.php');" ;\
sudo mv composer.phar /usr/local/bin/composer

# Basic

sudo apt install build-essential ubuntu-restricted-extras ubuntu-sdk ubuntu-make juju python-software-properties filezilla git nautilus-dropbox p7zip-full keepassx meld curl gufw gimp gimp-plugin-registry shutter ffmpeg lame links links2 elinks lynx openssh-server ruby-dev nodejs chromium-browser inkscape jq && php -v && sudo service ssh start ;\

sudo add-apt-repository ppa:webupd8team/sublime-text-3 && sudo apt-get update && sudo apt-get install sublime-text-installer

# jekyll

sudo gem install jekyll && sudo gem install github-pages && sudo gem install rouge && jekyll -v && ruby --version && gem --version ;\

# OS Update

sudo apt update && sudo apt upgrade && sudo apt dist-upgrade

{% endhighlight %}
