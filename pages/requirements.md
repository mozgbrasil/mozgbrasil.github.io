---
layout: page
title: Pré-requisitos e sugestões
permalink: /requirements/
order: 7
excerpt: "Antes de executar os processos, e leia os pré-requisitos e sugestões"
---
[getcomposer]: https://getcomposer.org/
[ativando-zend-guard-loader]: /zend%20guard%20loader/ativando-zend-guard-loader
[acordo]: /acordo-licenca-usuario-final/

# Leia atentamente cada tópico

## Iniciando

Acesse o terminal do seu servidor

O terminal ou prompt de comando é o ambiente acessado via SSH

Para saber a versão do seu PHP, execute o seguinte comando no terminal

	php -v

Esse comando deve exibir a versão do PHP e a presença da extensão de servidor [Zend Guard Loader][ativando-zend-guard-loader]

Para visualizar se no servidor tem o suporte ao [Composer][getcomposer], execute o seguinte comando no terminal

	composer --version

Como a atual versão é 1.2.0 deve ser retornado

	Composer version 1.2.0

Caso no seu servidor não tenha o suporte ao [Composer][getcomposer], entre em contato com a sua empresa de hospedagem solicitando a instalação do [Composer][getcomposer]

Caso no seu servidor já tenha o [Composer][getcomposer] instalado mas com uma versão defasada você pode atualiza-lo, executando o seguinte comando no terminal

	sudo composer self-update

Caso seja retornado erro de permissão você devera entrar em contato com a sua empresa de hospedagem solicitando a execução desse procedimento

## Pré-requisitos

- Instalar a ferramenta [Composer][getcomposer]

- Ativar a extensão de servidor [Zend Guard Loader][ativando-zend-guard-loader]

- Para utilizar o(s) módulo(s) da MOZG é necessário aceitar o [Acordo de licença do usuário final][acordo]

## Sugestões

- Efetuar backup do projeto Magento
