---
layout: post
title:  "Dicas para o Ubuntu"
date:   2016-05-02 16:01:02
category: dicas
author: Marcio Amorim
tags: [magento, php, apache, mysql]
excerpt: "Nesse artigo é exibido diversas dicas relativa ao Ubuntu"
---

Ola

# Conectar via SFTP pelo nautilus

	sftp://marcio@192.168.0.7

# Conectar via Samba pelo nautilus

	smb://192.168.0.7

# Conectar via ssh pelo terminal

	ssh marcio@192.168.0.7

# Obter a versão do PHP via terminal

	php -r \@phpinfo\(\)\; | grep 'PHP Version' -m 1

	php -i | grep 'PHP Version' -m 1

# Execução comando condicional em linha

	sh -c 'if [ "$TRAVIS_PHP_VERSION" = "5.4" ] || [ "$TRAVIS_PHP_VERSION" = "5.5" ]; then echo '0'; else echo '1'; fi;'