---
layout: post
title:  "Dicas para o Magento 1"
date:   2016-05-02 16:01:04
category: dicas
author: Marcio Amorim
tags: [magento, php, apache, mysql]
excerpt: "Nesse artigo é exibido diversas dicas relativa ao Magento 1"
---

# Oi

# Modificando a tradução do módulo para o template

Cada módulo tem o seu arquivo de tradução com a mesma nomenclatura do módulo

Os arquivos de tradução para português do Brasil no Magento é armazenado no diretório  

	/app/locale/pt_BR/

Recomendo não editar os arquivos nesse diretório pois em uma nova atualização de módulo esse arquivo deve ser atualizado com as informações do módulo

Na necessidade de trocar algum item

Edite o arquivo translate.csv presente no diretório do seu template para ser exibido um novo resultado

	/app/design/frontend/default/default/locale/pt_BR/translate.csv

Caso não exista a estrutura "/locale/pt_BR/translate.csv" em seu template apenas crie o arquivo nessa estrutura de diretório

Obs.

No Windows ou Mac sugiro usar o programa UltraEdit para edição do arquivo, dessa forma será mantido a codificação do arquivo em UTF-8

# Mage_Core_Exception: The requested Payment Method is not available. in /app/Mage.php:603

Esse erro é ocasionado caso o módulo relacionado ao método de pagamento esteja ausente no projeto

em

http://magento.stackexchange.com/questions/24307/the-requested-payment-method-is-not-available-on-order-details-page

vemos  que temos 2 opções:

- usar o módulo relacionado ao método de pagamento
- alterar o relacionamento do método a um módulo via banco de dados

Simulei um exemplo em meu ambiente local, pois não pretendo usar o módulo Cerebrum_Telencephalon e quero usar somente o novo pacote Mozg

	SELECT * FROM `sales_flat_order_payment` WHERE `method` like '%cerebrum%' ;

	UPDATE `sales_flat_order_payment` SET `method`= 'mozg_cielo_cc'  WHERE `method` = 'cerebrum_cielo';

# Login no backend não retorna nada

A empresa de hospedagem aumentou o espaço em disco e funcionou como esperado

# Erro: Warning: inet_pton(): Unrecognized address 177.23.249.99, 127.0.0.1  in /app/code/core/Mage/Core/Helper/Http.php on line 149

Esse erro foi exibido quando foi colocado o seguinte item no .htaccess

	SetEnv MAGE_IS_DEVELOPER_MODE "true"

# Como ativar a CRON no Magento

No terminal ao executar o comando

	crontab -e

Pode ser informado qualquer um dos modelos de comandos a seguir

	*/1 * * * * /bin/sh /home/marcio/dados/public_html/magento-1.9.2.4-dev31/cron.sh >> /home/marcio/dados/public_html/magento-1.9.2.4-dev31/var/log/magento.cron.log&

	*/1 * * * * curl -s -o /dev/null http://SUA_URL/magento-1.8.0.0-dev02/cron.php >> /home/marcio/dados/public_html/magento-1.9.2.4-dev31/var/log/magento.cron.log&

	*/1 * * * * php /home/marcio/dados/public_html/magento-1.9.0.1-dev06/cron.php >> /home/marcio/dados/public_html/magento-1.9.2.4-dev31/var/log/magento.cron.log&

Veja que o primeiro modelo acessa via shell o arquivo cron.sh do Magento

Veja que o segundo modelo acessa via curl o arquivo cron.php do Magento

Veja que o terceiro modelo acessa via php-client o arquivo cron.php do Magento

Você pode usar qualquer um dos modelos acima ou qualquer tecnologia que faz acesso ao devido arquivo do Magento

Esse modelo está baseado em meu ambiente local, portanto pode haver variação para cada ambiente

# Erro de servidor: "error 500" ou "tela branca"

A informação "error 500" se trata da omissão do erro devendo ser analisado o erro no log do servidor

Todo o erro gerado no servidor é armazenado no log a causa do erro

Execute o seguinte comando no terminal do seu servidor  

	tail -f /var/log/apache2/error.log

	tail -f /home/marcio/var/php-fpm/error.log

Acesse o projeto até gerar o erro 

Será exibido no log a causa do erro 

Efetuando pesquisa sobre o erro geralmente é encontrado a solução 

Agora é somente aplicar a devida correção sobre o seu servidor

# Cotação de Moedas, Magento Cambio

## Habilitando moedas

Assim que instalamos o Magento, por padrão, ele carrega diversas moedas. Mas o normal seria utilizarmos apenas uma (ou duas) moedas no sistema.

Então carregar menos moedas no sistema é mais inteligente e otimizado para sua loja. Para isso acesse:

No Backend do Magento, acesse o menu: Sistema -> Configuração -> Avançado -> Sistema -> Moeda

Na lista de moedas instaladas você deve selecionar apenas as que deseja usar no sistema, para que ele não carregue opções desnecessárias.

Neste exemplo iremos trabalhar com Real Brasileiro e Dólar Norte-Americano.

# Exibindo moedas na vitrine

Por padrão, o sistema exibe apenas uma moeda na sua visão de loja, apenas a moeda padrão – informada durante a instalação do Magento.

Para ter outras opções de moeda, você deve acessar:

No Backend do Magento, acesse o menu: Sistema -> Configuração -> Geral -> Configuração de Moedas [Opções e Moeda]

No campo "Moedas Permitidas" serão listados todas as moedas do sistema, aquelas que você configurou anteriormente. Basta selecionar as opções que deseja disponibilizar em frontend.

O campo "Moeda Base" é referente à cobrança dos produtos, como os clientes devem considerar a compra/pagamento dos itens, então mesmo visualizando em outra moeda o formato válido para pagamento é o da moeda base. Por padrão você tem apenas uma moeda base para todo o sistema, caso queira ter uma moeda base para cada website, você deve primeiro ir em:

No Backend do Magento, acesse o menu: Sistema -> Configuração -> Catálogo -> Catálogo [Preço]

E alterar o escopo de preços para "Website".

Em seguida você deve reindexar os índices das tabelas conforme solicitado pelo sistema.

Se você alterar o escopo para "website" durante a criação/edição de um produto, pode definir preços diferentes para o mesmo produto. (exemplo no vídeo)

Já o campo "Exibir Moeda Padrão" influencia apenas na forma como seus produtos serão apresentados durante a navegação do usuário. Assim que ele entrar na sua loja, antes dele escolher o formato de moeda que deseja visualizar, qual a moeda será apresentada? Você decide neste campo.

## Fazendo a cotação

Não basta apenas selecionar as opções de moedas para o sistema, é preciso informar o valor cambial de cada nova cifra. Para isso você precisa acessar:

No Backend do Magento, acesse o menu: Sistema -> Gerenciar Moeda -> Tarifas

Alguns campos estarão em branco para você preencher manualmente, ou… basta clicar no botão [+ Importar]. E a cotação será importada automaticamente do serviço Webservicex.

Se você estiver de acordo com o valor informado, basta clicar em Salvar.

Agora que o sistema conhece os valores de cada moeda, ele deve ser exibido na visão da sua loja as opções para o cliente escolher como deseja visualizar os preços.

# Controle de câmbio

Você provavelmente não deseja fazer esse controle manualmente, todo dia acessando o backend para atualizar os preços do dólar/euro/real, etc. Por isso vamos a mais algumas configurações, em:

No Backend do Magento, acesse o menu: Sistema -> Configuração -> Geral -> Configuração de Moedas [Webservicex]

Você tem apenas um campo, no qual não precisa se preocupar.

tempo conexao webservicex

Este campo informa em segundos, por quanto tempo ele vai tentar uma conexão com o webservice da Webservicex para obter atualização dos valores. Mas você pode aumentar esse número caso queira uma garantia maior de resposta do servidores deles.

Agora a configuração que realmente interessa fica em:

No Backend do Magento, acesse o menu: Sistema -> Configuração -> Geral -> Configuração de Moedas [Opções de Importação Agendadas]

Aqui não tem muito o que explicar, é tudo bem sugestivo na verdade – sem truques.

configuracoes de agendamento webservicex

Basta “habilitar” o módulo. O serviço disponível é apenas o “Webservicex“, pelo menos até a versão 1.7.0.2 do Magento CE. A frequência normalmente será “Diariamente“, pois os valores são sempre atualizados. O horário é uma decisão mais administrativa, você pode fazer isso todo dia à meia-noite, ou então após o fechamento do pregão.

Os últimos 3 (três) campos referentes ao campo email, são para os casos em que a cotação automática falhar – assim você pode ser avisado por email.

## Os arquivos de layout

No template padrão do Magento, este campo de seleção de moedas é apresentado sempre na coluna da esquerda. Caso queira modificar isso, saiba que o arquivo responsável por ele é o directory.xml que fica em:

	app/design/frontend/base/default/layout/directory.xml

E o arquivo currency.phtml é quem carrega as informações na tela:

	app/design/frontend/base/default/template/directory/currency.phtml

Lembre-se de nunca alterar o arquivo em base/default, faça sempre uma cópia dele para default/default, ou então para seu template/tema customizado.

E basicamente é isso que você precisa saber sobre o controle de moedas no Magento. Qualquer dúvida basta acessar o fórum da Escola Magento.

Fonte: http://mariosam.com.br/magento/cotar-moedas/

# Como compactar a pasta do meu projeto ?

O script a seguir é um modelo para a execução do procedimento de backup a ser executado via terminal do servidor

	tar -cvpzf EMPRESA_$(date +%Y.%m.%d_%H.%M.%S).tgz /DIRETORIO

# Como exportar o backup do banco de dados ?

O script a seguir é um modelo para a execução do procedimento de backup compactado a ser executado via terminal do servidor

	mysqldump -h 'HOST' -u 'USER' -p'PASS' 'DBNAME' | gzip > EMPRESA_$(date +%Y.%m.%d_%H.%M.%S).sql.gz

# Como importar o backup do banco de dados ?

O script a seguir é um modelo a ser executado via terminal do servidor

	mysql -h 'HOST' -u 'USER' -p 'DBNAME' < 'PATH_FILE';

# Como alterar a URL_BASE do Magento no banco de dados ?

O script a seguir é um modelo a ser executado via terminal do servidor

	mysql -h 'HOST' -u 'USER' -p 'DBNAME' -e "\
	    SELECT * FROM `core_config_data` WHERE `path` like '%base_url%'; \
	    UPDATE `core_config_data` SET `value` = 'http://SUA_URL/ambiente_01/ ' WHERE `path` like '%base_url%'; \
	    SELECT * FROM `core_config_data` WHERE `path` like '%base_url%'; \
	"

# Ativar debug do template no backend

Edite o arquivo /app/code/core/Mage/Core/etc/system.xml

Atualizando para

	<template_hints translate="label">
		<label>Template Path Hints</label>
		<frontend_type>select</frontend_type>
		<source_model>adminhtml/system_config_source_yesno</source_model>
		<sort_order>20</sort_order>
		<show_in_default>1</show_in_default>
		<show_in_website>1</show_in_website>
		<show_in_store>1</show_in_store>
	</template_hints>
	<template_hints_blocks translate="label">
		<label>Add Block Names to Hints</label>
		<frontend_type>select</frontend_type>
		<source_model>adminhtml/system_config_source_yesno</source_model>
		<sort_order>21</sort_order>
		<show_in_default>1</show_in_default>
		<show_in_website>1</show_in_website>
		<show_in_store>1</show_in_store>
	</template_hints_blocks>

# Sobre como cadastrar o peso do produto

O método de entrega já vem como default o formato do peso como Kilos, caso tenha preenchido o peso do produto no formato de gramas na configuração do método deve alterar o Formato do Peso para Gramas

Peso preenchido no formato "Default" em Kilos  
	Para um peso de 80 gramas, para isso devemos informar 0.0800  
	Para um peso de 800 gramas, para isso devemos informar 0.8000  
	Para um peso de 1 kilo, para isso devemos informar 1 onde deve ser convertido pelo Magento para 1.0000

Peso preenchido no formato "Alternativo" em gramas  
	Para um peso de 80 gramas, para isso devemos informar 80.0000  
	Para um peso de 800 gramas, para isso devemos informar 800.0000  
	Para um peso de 1 kilo, para isso devemos informar 1000 onde deve ser convertido pelo Magento para 1000.0000

# Exibir horário corrente no backend

Edite o arquivo /app/design/adminhtml/default/default/template/page/header.phtml

Atualizando

DE

	$this->formatDate(null, 'full')

PARA

	$this->formatDate(null, 'full', true)

# Ativar debug

No Backend do Magento, acesse o menu: System -> Configuration -> Developer -> Debug -> Template Path Hints = Yes  

Para ser exibido a opção "Template Path Hints" em Debug, deve ser selecionado a configuração para o website, selecionando o mesmo no SelectBox "Configuration Scope:"

# Desabilitando a compilação do Magento pelo código

Para desabilitar a compilação sem ter acesso pelo admin do magento basta ir em /includes editar o arquivo chamado config.php comentando a linha abaixo com # na frente  

Com o compilador ligado

	define('COMPILER_INCLUDE_PATH', dirname(__FILE__).DIRECTORY_SEPARATOR.'src');

Com o compilador desligado

	#define('COMPILER_INCLUDE_PATH', dirname(__FILE__).DIRECTORY_SEPARATOR.'src');

# Forçar Recompilação do Magento pelo código

A pasta que fica localizada dentro da pasta /includes chamada de SRC é onde se encontra todos os arquivos compilados pelo Magento, para forçar pelo código uma nova compilação do Magento, basta renomear essa pasta ou removela. 
Obs: (Recomendo antes só renomear e se tudo der certo e uma nova pasta SRC for criada automaticamente, ai sim pode remover ela)

## Obs. no uso do Compiler do Magento

No processo "Compilação" nunca apenas clique no botão "Ativar" pois pode ser ativado uma versão em Cache

Sempre antes clique no botão "Executar o processo de compilação", dessa forma em seguida deve ser ativado automaticamente o Compiler do Magento

# Como limpar o cache do Magento?

Se você tiver feito alterações em sua loja Magento, e elas não aparecerão imediatamente, pode ser necessário que você limpe o cache.  
O Magento mantém seu cache em /var/cache localizado dentro do diretório de instalação do Magento.  
Assim, por exemplo, se o Magento é instalado na pasta principal public_html/, o cache será em public_html/var/cache  
Para limpar o cache, simplesmente apague tudo do diretório public_html/var/cache e recarregue seu site no seu browser.  
Para limpar todas as sessões, você também pode excluir tudo do diretório public_html/var/session.

# Como depurar problemas Magento MySQL

Assim como qualquer aplicação PHP moderna o Magento armazena a maioria de suas informações no banco de dados (exceto mídia e configurações XML).

Assim, para a depuração de problemas no Magento é útil saber algumas coisas:

1. Todas as consultas do MySQL podem ser registrados e analisados. 
Para este efeito, abra o arquivo lib/Varien/Db/Adapter/Pdo/Mysql.php e altere o valor da propriedade protegida $ _debug para true, também a propriedade protegida $_logAllQuerie para true. 

Você também pode alterar o valor de US $_logQueryTime que é especialmente útil quando a depuração lentidão. Uma vez que você fizer essa alteração todas as consultas serão registradas no arquivo var/debug/sql.txt

# Como adicionar o rastreamento(tracking)?

No Backend do Magento, acesse o menu: Sales -> Order -> Acesse o pedido em seguida clique no botão "Ship", no bloco "Shipping Information" clque no botão "Add Tracking Number", selecione o método de entrega e informe o número para rastreamento, adicione um comentário caso ache necessário e clique em "Submit Shipment"

No Backend do Magento, na visualização do pedido no bloco "Shipping & Handling Information" deve ser exibido o link "Track Order" onde clicando no mesmo deve ser aberto Popup apresentado o processo do rastreamento

No frontend do Magento, acessando o menu: Minha conta -> Meus pedidos -> onde ao visualizar o pedido deve ser exibido o link "Rastrear o seu pedido" onde clicando no mesmo deve ser aberto Popup apresentado o processo do rastreamento

# Como redefinir a senha do administrador em Magento?

	UPDATE `admin_user` SET `password` = MD5('NEWPASSWORD') WHERE `username` = 'ADMINUSERNAME';

# Exibir cabeçalho "Esta é uma loja de demonstração. ..."

No Backend do Magento, acesse o menu: System -> Configuration -> General -> Design -> HTML Head -> Display demo store notice = YES

# Erro 404 Página não encontrada

Geralmente é exibido a pagina 404 após a instalação de módulos, onde é necessário apenas se deslogar e logar novamente no sistema

# Modo de manutenção

Para habilitar o modo de manutenção no Magento, basta criar um arquivo vazio na raiz de sua loja Magento nomeado como "maintenance.flag"

# Reexecutar os scripts de setup do módulo

Execute o comando a seguir no MySQL para reexecutar os scripts de setup

	-- add table prefix if you have one
	DROP TABLE IF EXISTS mozg_boxpacker_packing_comment_store;
	DROP TABLE IF EXISTS mozg_boxpacker_packing_comment;
	DROP TABLE IF EXISTS mozg_boxpacker_packing_store;
	DROP TABLE IF EXISTS mozg_boxpacker_packing;
	DROP TABLE IF EXISTS mozg_api_debug;
	DROP TABLE IF EXISTS mozg_event_data;
	DROP TABLE IF EXISTS mozg_event_data_queue;
	DROP TABLE IF EXISTS mozg_order_payment;
	SELECT * FROM `core_resource` WHERE `code` like '%mozg%';
	DELETE FROM core_resource WHERE code like '%mozg%';
	SELECT * FROM `core_config_data` WHERE `path` like '%mozg%';
	DELETE FROM core_config_data WHERE path like '%mozg%';

# Como redefinir a senha do administrador em Magento?

	UPDATE `admin_user` SET `password` = MD5('123456a') WHERE `username` = 'admin';

# Problemas com caracteres

O erro de caracteres é gerado por definição de charset no servidor onde o mesmo deve ser configurado para aceitar qualquer charset

Para alterar o charset no Apache no Ubuntu tente esse procedimento

	sudo nano /etc/apache2/conf.d/charset

ou 

	grep -ri 'AddDefaultCharset' /etc/apache2

	sudo nano /etc/apache2/conf-available/charset.conf

Em seguida, comente a linha

	#AddDefaultCharset UTF-8

salve e saia do arquivo

Agora você precisa reiniciar o servidor apache usando o seguinte comando

	sudo /etc/init.d/apache2 restart

Fonte: http://stackoverflow.com/questions/30088776/apache-2-4-x-override-charset-after-update-to-ubuntu-15-04