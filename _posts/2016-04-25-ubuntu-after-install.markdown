---
layout: post
title:  "Ambiente de desenvolvimento e execução no Ubuntu"
date:   2016-04-25 17:36:05
category: ubuntu
author: Marcio Amorim
tags: [magento2, php]
excerpt: "Nesse artigo será exibido detalhadamente os processos feito via terminal para a instalação dos programas"
---

Ola

Execute os comandos efetuando as devidas alterações personalizando para seu projeto

# Atualização do sistema operacional

    sudo apt update && sudo apt upgrade && sudo apt dist-upgrade && sudo apt autoremove

# Suporte a repositórios

    sudo add-apt-repository ppa:ondrej/php && sudo apt-get update ;\
    sudo add-apt-repository ppa:nijel/phpmyadmin && sudo apt-get update ;\
    sudo add-apt-repository ppa:kdenlive/kdenlive-stable && sudo apt-get update

# Pesquisa sobre programas

    apt-cache search php-gd ;\
    apt-cache show php-gd ;\
    apt search php7.0-*

# TODO http://askubuntu.com/questions/761713/how-can-i-downgrade-from-php-7-to-php-5-6-on-ubuntu-16-04

# Ubuntu 17.04 - Local Server - PHP 5.6

    sudo apt install mysql-server mysql-client php5.6 php5.6-cli php5.6-curl php5.6-sqlite3 php5.6-mcrypt php5.6-mbstring php5.6-gd php5.6-intl php5.6-xsl php5.6-zip php5.6-soap php5.6-common php5.6-json php5.6-mysql php-gettext php5.6-cgi libapache2-mod-php5.6 php-pear php5.6-fpm php5.6-bcmath memcached php-memcache phpmyadmin

# Symlink WWW

    mkdir -p ~/dados/public_html ;\
    sudo ln -s ~/dados/public_html /var/www/html ;\
    echo "<?php phpinfo(); ?>" | sudo tee ~/dados/public_html/phpinfo.php > /dev/null ;\
    php -l ~/dados/public_html/phpinfo.php ;\
    curl -I http://127.0.0.1/public_html/phpinfo.php ;\
    curl -I --compress http://127.0.0.1/public_html/phpinfo.php ;\
    GET -Used http://127.0.0.1/public_html/phpinfo.php

# FIX: Apache Enable Module

#NOTICE: Not enabling PHP 5.6 FPM by default.
#NOTICE: To enable PHP 5.6 FPM in Apache2 do:
#NOTICE: a2enmod proxy_fcgi setenvif
#NOTICE: a2enconf php5.6-fpm
#NOTICE: You are seeing this message because you have apache2 package installed.

    sudo a2enmod proxy_fcgi setenvif actions rewrite

    sudo a2enconf php5.6-fpm

    sudo nano /etc/apache2/sites-available/000-default.conf

        <Directory "/var/www/html">
        AllowOverride All
        </Directory>

# Config PHP-FPM (FPM : FastCGI Process Manager
# http://www.server-world.info/en/note?os=Ubuntu_16.04&p=httpd&f=16

    sudo nano /etc/apache2/sites-enabled/000-default.conf

        # add into <VirtualHost> - </VirtualHost>

                <FilesMatch "\.php$">
                    SetHandler "proxy:fcgi://127.0.0.1:9000/"
                </FilesMatch>
        </VirtualHost>

    sudo nano /etc/php/5.6/fpm/pool.d/www.conf

        # line 36: change

        listen = 127.0.0.1:9000

## FIX: PHP Fatal error:  Call to undefined function mcrypt_module_open

    sudo php5enmod mcrypt  

# To activate the new configuration, you need to run:
  sudo systemctl restart apache2

# FIX: Apache

    No Magento2 no processo de instalação é exibido o retorno

    "$HTTP_RAW_POST_DATA is deprecated from PHP 5.6 onwards and will stop the installer from running. Please open your php.ini file and set always_populate_raw_post_data to -1.",
    pesquise por
    ";always_populate_raw_post_data = -1"
    e retire o comentário ";"

        sudo nano /etc/php/7.0/cli/php.ini
        sudo nano /etc/php/5.6/apache2/php.ini

        ou

        sudo nano /etc/php/5.6/fpm/php.ini

    Atualize para

        memory_limit = 2048M
        max_input_vars = 2000
        display_errors = On
        zlib.output_compression = On

    Algumas mudanças que que vai ajudar a fazer o seu servidor apache um pouco mais eficiente

        sudo nano /etc/apache2/apache2.conf

    Atualize "Timeout 300" para "Timeout 30"

    Atualize "KeepAliveTimeout 5" para "KeepAliveTimeout 2"

# FIX: Apache - Acesso aos arquivos de log

    sudo usermod -g www-data $USER

# FIX: pdo_mysql extension is not installed

    sudo phpenmod pdo_mysql

    #sudo phpdismod pdo_mysql

# Restart Apache

    echo -e "\e[1;31m --(Processo 1)-- \e[0m" ;\
    apache2 -v ;\
    echo -e "\e[1;31m --(Processo 2)-- \e[0m" ;\
    sudo apache2ctl configtest ;\
    echo -e "\e[1;31m --(Processo 3)-- \e[0m" ;\
    sudo apachectl fullstatus ;\
    echo -e "\e[1;31m --(Processo 4)-- \e[0m" ;\
    sudo apachectl -M ;\
    echo -e "\e[1;31m --(Processo 5)-- \e[0m" ;\
    service --status-all ;\
    echo -e "\e[1;31m --(Processo 6)-- \e[0m" ;\
    sudo service apache2 restart ;\
    echo -e "\e[1;31m --(Processo 7)-- \e[0m" ;\
    sudo service php5.6-fpm restart ;\
    echo -e "\e[1;31m --(Processo 8)-- \e[0m" ;\
    sudo service php5.6-fpm status

# Versions

    echo -e "\e[1;31m --(Processo 1)-- \e[0m" ;\
    mysql --version ;\
    echo -e "\e[1;31m --(Processo 2)-- \e[0m" ;\
    apache2 -v ;\
    echo -e "\e[1;31m --(Processo 3)-- \e[0m" ;\
    php -v

# Composer

    https://getcomposer.org/download/

    https://getcomposer.org/doc/00-intro.md#locally

        curl -sS https://getcomposer.org/installer | php

    ## FIX: https://getcomposer.org/doc/00-intro.md#globally

        sudo mv composer.phar /usr/local/bin/composer

    ## FIX: https://github.com/thomaszbz/native-dockerfiles-typo3/issues/19

        sudo chown -R $USER $HOME/.composer

# Local Desktop

    sudo apt install build-essential ubuntu-restricted-extras python-software-properties filezilla git nautilus-dropbox p7zip-full keepassx meld curl gufw gimp gimp-plugin-registry shutter ffmpeg lame links links2 elinks lynx openssh-server ruby-dev nodejs nodejs-legacy chromium-browser inkscape jq npm nmap ntp vlc browser-plugin-vlc gedit-plugins kdenlive kde-runtime pavucontrol gifsicle && sudo service ssh start

    git config --global credential.helper cache

    # vlc http://avenard.org/iptv/playlist-tpg-vlc.m3u

# Dica:

## Caso

Configurações de Som -> Entrada -> Volume de entrada fica desativado

## Solução

Instalar o Pulse Audio Volume Control e configurar

# Sublime - text editor

    sudo add-apt-repository ppa:webupd8team/sublime-text-3 && sudo apt-get update && sudo apt-get install sublime-text-installer

    ## Plugins - https://packagecontrol.io/
    ## Sublime Menu: (Tools > Command Palette…) search for "Package"

# Atom - text editor

    sudo add-apt-repository ppa:webupd8team/atom -y && sudo apt-get update && sudo apt-get install atom

    ## Plugins - https://atom.io/packages

    composer global require friendsofphp/php-cs-fixer
    export PATH="$PATH:$HOME/.composer/vendor/bin"

    apm install php-cs-fixer open-on-bitbucket php-hyperclick atom-autocomplete-php project-manager pigments atom-beautify minimap git-plus

# Jekyll

    sudo gem install jekyll && sudo gem install github-pages && sudo gem install rouge && jekyll -v && ruby --version && gem --version

# Google Chrome

    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb ;\
    sudo dpkg -i --force-depends google-chrome-stable_current_amd64.deb ;\
    sudo apt-get install -f

# Google Web Designer

    wget https://dl.google.com/linux/direct/google-webdesigner_current_amd64.deb ;\
    sudo dpkg -i --force-depends google-webdesigner_current_amd64.deb ;\
    sudo apt-get install -f

# TeamViewer

# https://www.teamviewer.com/pt/download/

    wget https://download.teamviewer.com/download/teamviewer_i386.deb ;\
    sudo dpkg -i teamviewer_i386.deb -y ;\
    sudo apt-get install -f

# Open Broadcaster Software

    sudo add-apt-repository ppa:obsproject/obs-studio && sudo apt-get update && sudo apt-get install obs-studio

# OS Update

    echo -e "\e[1;31m --(Processo 1)-- \e[0m" ;\
    sudo apt update ;\
    echo -e "\e[1;31m --(Processo 2)-- \e[0m" ;\
    apt list --upgradable ;\
    echo -e "\e[1;31m --(Processo 3)-- \e[0m" ;\
    sudo apt upgrade ;\
    echo -e "\e[1;31m --(Processo 4)-- \e[0m" ;\
    sudo apt dist-upgrade ;\
    echo -e "\e[1;31m --(Processo 5)-- \e[0m" ;\
    sudo apt autoremove

# Dica: Samba

    # Após criar uma pasta e compartilhar pelo Nautilus só deve funcionar a autenticação após ser criado o devido usuário no Samba

    sudo smbpasswd -a marcio

# Montando ambiente na Amazon

    https://console.aws.amazon.com/

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
