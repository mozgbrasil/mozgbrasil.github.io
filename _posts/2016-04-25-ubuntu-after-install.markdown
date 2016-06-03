---
layout: post
title:  "Ambiente de desenvolvimento e execução no Ubuntu"
date:   2016-04-25 17:36:05
category: Ubuntu
author: Marcio Amorim
tags: [magento2, php]
excerpt: "Nesse artigo será exibido detalhadamente os processos feito via terminal para a instalação dos programas usado para desenvolvimento e execução de softwares"
---

## Introdução

Ola Boa Tarde

<h1 class="ui header">Montando ambiente</h1>

Execute os comandos efetuando as devidas alterações personalizando para seu projeto

{% highlight ruby %}

sudo apt update && sudo apt upgrade && sudo apt dist-upgrade

# Ubuntu 16.04 - Local Server - PHP 7

sudo apt install mysql-server mysql-client php-cli php-curl php-sqlite3 php-mcrypt php-mbstring php-gettext php-gd php-intl php-xsl php-zip php-soap && sudo add-apt-repository ppa:nijel/phpmyadmin && sudo apt-get update && sudo apt install phpmyadmin

# Ubuntu 16.04 - Local Server - PHP 5.6

sudo add-apt-repository ppa:ondrej/php && sudo apt-get update && sudo apt install mysql-server mysql-client php5.6 php5.6-cli php5.6-curl php5.6-sqlite3 php5.6-mcrypt php5.6-mbstring php5.6-gd php5.6-intl php5.6-xsl php5.6-zip php5.6-soap php5.6-common php5.6-json php5.6-mysql php-gettext phpmyadmin

# Ubuntu 14.04 - Amazon Server

sudo apt-get install mysql-server-5.6 mysql-client-5.6 mysql-client-core-5.6 apache2 php5 libapache2-mod-php5 php5-common php5-mcrypt php5-curl php5-cli php5-mysql php5-sqlite php5-gd php5-intl php5-xsl php5-dev phpmyadmin p7zip-full unzip git

## FIX: PHP Fatal error:  Call to undefined function mcrypt_module_open

sudo php5enmod mcrypt  

# Symlink WWW

mkdir -p ~/dados/public_html ;\
sudo ln -s ~/dados/public_html /var/www/html ;\
echo "<?php phpinfo(); ?>" | sudo tee ~/dados/public_html/phpinfo.php > /dev/null ;\
php -l ~/dados/public_html/phpinfo.php

# FIX: Rewrite

sudo a2enmod rewrite

sudo nano /etc/apache2/sites-available/000-default.conf

    <Directory "/var/www/html">
    AllowOverride All
    </Directory>

# FIX: Magento2

sudo usermod -g www-data $USER

# Zend Guard Loader

cd ~/dados/public_html ;\
wget http://downloads.zend.com/guard/7.0.0/zend-loader-php5.6-linux-x86_64.tar.gz ;\
tar -zxvf zend-loader-php5.6-linux-x86_64.tar.gz

sudo nano /etc/php/5.6/cli/php.ini
sudo nano /etc/php/5.6/apache2/php.ini

    [zendloader]
    zend_extension=/home/marcio/dados/public_html/zend-loader-php5.6-linux-x86_64/ZendGuardLoader.so
    zend_extension=/home/marcio/dados/public_html/zend-loader-php5.6-linux-x86_64/opcache.so

# Restart Apache

sudo service apache2 restart

# Versions

mysql --version && php -v

# Composer

https://getcomposer.org/download/

## FIX: https://getcomposer.org/doc/00-intro.md#globally

sudo mv composer.phar /usr/local/bin/composer

## FIX: https://github.com/thomaszbz/native-dockerfiles-typo3/issues/19

sudo chown -R $USER $HOME/.composer

# Local Desktop

sudo apt install build-essential ubuntu-restricted-extras ubuntu-sdk ubuntu-make juju python-software-properties filezilla git nautilus-dropbox p7zip-full keepassx meld curl gufw gimp gimp-plugin-registry shutter ffmpeg lame links links2 elinks lynx openssh-server ruby-dev nodejs chromium-browser inkscape jq && sudo service ssh start

# Sublime Editor

sudo add-apt-repository ppa:webupd8team/sublime-text-3 && sudo apt-get update && sudo apt-get install sublime-text-installer

# Google Chrome

wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb ;\
sudo dpkg -i --force-depends google-chrome-stable_current_amd64.deb ;\
sudo apt-get install -f

# jekyll

sudo gem install jekyll && sudo gem install github-pages && sudo gem install rouge && jekyll -v && ruby --version && gem --version ;\

# OS Update

sudo apt update && sudo apt upgrade && sudo apt dist-upgrade

{% endhighlight %}

<h1 class="ui header">Montando ambiente na Amazon</h1>

https://console.aws.amazon.com/

{% highlight ruby %}

    AWS Management Console

        Compute      
            EC2
            Virtual Servers in the Cloud

                Create Instance
                    Launch Instance

                    Step 1:
                        Ubuntu Server 14.04 LTS -> Select

                    Step 2:
                        t2.micro -> Review and Launch
                        Launch
                        Create a new key pair: Name = cerkeypair -> Download Key Pair -> Launch Instance
                        View Instances

                    Step 3:
                        Instances
                        Select
                        Collum -> Security Groups
                                Launc Wizard
                                    Inbound -> Edit -> Add -> Custom TCP Rule = 80

{% endhighlight %}