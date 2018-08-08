---
layout: post
title:  "Ambiente de desenvolvimento e execução no Ubuntu"
date:   2018-04-27 15:06:00
category: ubuntu
author: Marcio Amorim
tags: [magento2, php]
excerpt: "Nesse artigo será exibido detalhadamente os processos feito via terminal para a instalação dos programas"
---

# Ubuntu 18.04

## Suporte ao SSH

	sudo apt install net-tools

	sudo apt install openssh-server && sudo service ssh start

### Conectar ao SSH "Secure SHell"

    ssh marcio@192.168.0.2
    ssh marcio@192.168.0.6

### Download via SCP "Secure Copy"

    scp -r marcio@192.168.0.3:/home/marcio/Imagens/ /home/marcio/Imagens/

### Upload via SCP "Secure Copy"

    scp -r /home/marcio/Imagens/ marcio@192.168.0.3:/home/marcio/Imagens/

## Sobre o Ubuntu

Para começar a atualização do Ubuntu do sistema, primeiro precisamos atualizar a lista de índice de pacotes. Abra o terminal e digite:

    sudo apt update

Podemos instalar a atualização para todos os pacotes de uma só vez:
A forma a seguir vai atualizar todas as versões dos pacotes instalados, sem remover pacotes.

    sudo apt upgrade

Tudo feito. Seu sistema Ubuntu agora está totalmente atualizado.

Durante a atualização inicial do sistema, alguns dos pacotes podem se tornar obsoletos e, portanto, não são mais necessários. Para remover todos os pacotes desnecessários, execute:

    sudo apt autoremove

Para analise do Kernel

    dmesg

Para analise da Bios

    sudo dmidecode -t bios
