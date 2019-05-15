---
layout: post
title:  "Zend Guard Loader"
date:   2016-04-26 14:01:01
category: ubuntu
author: Marcio Amorim
tags: [magento2, php]
excerpt: "Nesse artigo será exibido detalhadamente o processo usado para ativar o Zend Guard Loader no servidor"
---

[phpinfo]: http://ec2-54-232-215-118.sa-east-1.compute.amazonaws.com/public_html/phpinfo.php

Ola

Acesse o terminal do seu servidor

O terminal ou prompt de comando é o ambiente acessado via SSH

Para saber a versão do seu PHP, execute o seguinte comando no terminal

    php -v

Esse comando deve exibir a versão do PHP e a presença da extensão de servidor Zend Guard Loader

# Como instalar o "Zend Guard Loader" em meu servidor?

Acesse

<http://www.zend.com/en/products/loader/downloads>

Deve ser feito o download do Zend Guard Loader baseado na versão do PHP do seu servidor

ou

    wget http://downloads.zend.com/guard/7.0.0/zend-loader-php5.6-linux-x86_64.tar.gz

    tar -zxf zend-loader-php5.6-linux-x86_64.tar.gz

Ao efetuar o download e extração do "Zend Guard Loader", leia o arquivo o "README.txt", nele está contido a instrução para ativar o módulo para qualquer servidor

Veja que o processo é super simples devendo apenas editar os arquivos que aplicam o suporte da extensão de servidor para o ambiente cliente e web do PHP

    sudo nano /etc/php/5.6/cli/php.ini

    sudo nano /etc/php/5.6/apache2/php.ini

e informar o conteúdo baseado no modelo a seguir

    [zendloader]
    zend_extension=/home/marcio/dados/softwares/zend-loader-php5.6-linux-x86_64/ZendGuardLoader.so
    zend_extension=/home/marcio/dados/softwares/zend-loader-php5.6-linux-x86_64/opcache.so

Voce só deve alterar o caminho correspondente a seu ambiente

Em seguida reiniciamos o servidor

    sudo service apache2 restart

Obs.

Na ocorrência de problemas certifique se foi informado o caminho correto em "zend_extension"

Na ocorrência de problemas de servidor, sugiro analisar o log do servidor onde deve ser apontado o motivo da ocorrência

Certifique se de ter reiniciado o servidor

Devido o "Zend Guard Loader" se tratar de ferramenta de terceiros, dúvidas ou problemas sugiro entrar em contato direto com a Zend, abrindo uma interação no forum do "Zend Guard Loader"

<http://forums.zend.com/viewforum.php?f=57&sid=8556b95ded7978a11c27ca31de8592d4>

Para usuários do "Zend Server" o módulo "Zend Guard Loader" já vem instalado no servidor, necessitando somente de ativar o mesmo.

<http://www.zend.com/en/products/server/>

Veja que esses procedimentos está documentado em

<http://files.zend.com/help/Zend-Guard/content/installing_zend_guard_loader.htm>

# Processos executados sobre o Servidor Apache

Veja no video que é exibido diversas imagens relativas aos processos executados

Foi feito acesso via terminal ao servidor da amazon onde na execução dos comandos foi ativação da extensão "Zend Guard Loader" sobre o [Servidor][phpinfo]

<div class="">
    <a class="fab google-red" data-g-action="Anthem - Video Start"
        data-g-event="Home" data-g-label="For Enterprise"
        data-glue-modal-disabled-on-mobile="true" data-glue-modal-trigger=
        "ss-yt-sUfE6Rf7w14" href=
        "https://www.youtube.com/watch?v=sUfE6Rf7w14">
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
    <div data-glue-modal="ss-yt-sUfE6Rf7w14" data-rs-modal="" id=
        "ss-yt-sUfE6Rf7w14">
        <iframe allowfullscreen="" frameborder="0" height="100%" src=
            "https://www.youtube.com/embed/sUfE6Rf7w14?enablejsapi=1&amp;rel=0" type=
            "text/html" width="100%"></iframe>
    </div>
</div>

Executando o seguinte comando temos o resultado se está ativo o recurso no ambiente client

    php -i | grep -i 'Zend Guard Loader'

Executando o seguinte comando temos o resultado se está ativo o recurso no ambiente web

    echo "<?php phpinfo(); ?>" >> phpinfo.php

    curl -v --silent http://SEU_DNS/phpinfo.php 2>&1 | grep 'Zend Guard Loader'

## [core:notice][pid 16387] AH00051: child pid 16530 exit signal Segmentation fault (11), possible coredump in /etc/apache2

Esse erro foi gerado devido a mal configuração do módulo Zend Guard Loader

No manual do Zend Guard Loader tem a instrução para usar as 2 bibliotecas que eles disponibilizam

Para efeito de teste ao comentar o uso da biblioteca "opcache.so" vemos que foi gerado o erro

[Fri Jun 23 11:57:58.914258 2017][core:notice] [pid 16387] AH00051: child pid 16530 exit signal Segmentation fault (11), possible coredump in /etc/apache2

Abaixo temos uma demonstração dessa ocorrência

<div class="">
    <a class="fab google-red" data-g-action="Anthem - Video Start"
        data-g-event="Home" data-g-label="For Enterprise"
        data-glue-modal-disabled-on-mobile="true" data-glue-modal-trigger=
        "magento-bradesco" href=
        "https://youtu.be/dGImDka87mo">
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
    <div data-glue-modal="magento-bradesco" data-rs-modal="" id=
        "magento-bradesco">
        <iframe allowfullscreen="" frameborder="0" height="100%" src=
            "https://youtu.be/dGImDka87mo" type=
            "text/html" width="100%"></iframe>
    </div>
</div>

## PHP Fatal error:  Cannot run code from this file in conjunction with non encoded files in app/code/local/Mozg/Base/Model/Resource/Setup.php on line 8

Já tivemos relatos de incompatibilidade entre o Zend Guard Loader e o Zend Opcache

Nesse tipo de eventualidade, desative o Zend Opache ou entre em contato com sua empresa de hospedagem solicitando essa ação

## Use of undefined constant Zend - assumed 'Zend'

Esse erro ocorre devido a ausência do Zend Guard Loader no ambiente PHP CLI

No terminal ao digitar o comando

    php -v

Deve ser exibido a ausência do Zend Guard Loader no ambiente PHP CLI

Aplique o suporte do componente ao ambiente PHP CLI
