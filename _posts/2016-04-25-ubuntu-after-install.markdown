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

<h1 class="ui header">Montando ambiente local</h1>

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

https://getcomposer.org/download/

sudo mv composer.phar /usr/local/bin/composer

# Basic

sudo apt install build-essential ubuntu-restricted-extras ubuntu-sdk ubuntu-make juju python-software-properties filezilla git nautilus-dropbox p7zip-full keepassx meld curl gufw gimp gimp-plugin-registry shutter ffmpeg lame links links2 elinks lynx openssh-server ruby-dev nodejs chromium-browser inkscape jq && php -v && sudo service ssh start ;\

sudo add-apt-repository ppa:webupd8team/sublime-text-3 && sudo apt-get update && sudo apt-get install sublime-text-installer

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
                        Ubuntu Server 14.04 LTS
                        Select

                    Step 2:
                        t2.micro
                        Review and Launch
                        Launch
                        Create a new key pair: Name = cerkeypair
                        Download Key Pair
                        Launch Instance

                    Step 3:
                        Instances
                        Select
                        Collum -> Security Groups
                                Launc Wizard
                                    Inbound -> Edit -> Add -> Custom TCP Rule = 80
                                    
{% endhighlight %}

SSH

{% highlight ruby %}

ssh -i cerkeypair.pem ubuntu@52.67.52.67

# Ubuntu 14.04

sudo apt update && sudo apt upgrade && sudo apt dist-upgrade

# Dev Server

sudo apt-get install mysql-server-5.6 mysql-client-5.6 mysql-client-core-5.6 apache2 php5 libapache2-mod-php5 php5-common php5-mcrypt php5-curl php5-cli php5-mysql php5-sqlite php5-gd php5-intl php5-xsl php5-dev phpmyadmin p7zip-full unzip

mkdir -p ~/public_html ;\
sudo ln -s ~/public_html /var/www/html ;\
echo "<?php phpinfo(); ?>" | sudo tee ~/public_html/phpinfo.php > /dev/null ;\
php -l ~/public_html/phpinfo.php

sudo a2enmod rewrite  # FIX: Rewrite

sudo php5enmod mcrypt  # FIX: PHP Fatal error:  Call to undefined function mcrypt_module_open

sudo service apache2 restart

sudo usermod -g www-data $USER ; # FIX: Magento2

# Composer

https://getcomposer.org/download/

sudo mv composer.phar /usr/local/bin/composer

{% endhighlight %}