
-

# Regra para iniciação da instalação

Boa Tarde

-

Em 3 passos você terá as intruções para instalação do(s) módulo(s)

-

## Passo 1
## Sobre levantamento de pré-requisitos

-

Primeiramente vamos interagir para comprovarmos em conjunto se os pré-requisitos estão realmente contemplados em seu servidor.

Digite no terminal SSH

php -v

composer --version

Favor nos enviar a imagem da tela com os resultados obtidos na execução dos comandos acima.

-

Efetue o download do seguinte arquivo

https://gist.githubusercontent.com/mozgbrasil/4237b80941dee306ec99713ffa46b45d/raw/8baab4853d44645b4dd9297fd7e41b631c3309cc/phpinfo.php

E coloque na raiz do seu servidor

Me informe a URL do seu projeto

Preciso acessar esse arquivo phpinfo.php onde o mesmo deve exibir se o seu servidor tem o suporte ao "Zend Guard Loader"

-

:: Para obter a versão do PHP instalado em seu servidor

:: Para confirmar se está instalado ou deve instalar o componente gratuito "Zend Guard Loader"

:: Para confirmar se está instalado ou deve instalar o gerenciador de dependências Composer

Sugiro que execute os procedimentos detalhados no link abaixo

https://mozg.com.br/requerimentos/

Para o perfeito funcionamento dos nossos módulos e necessário estar contemplados os seguintes pré-requisitos ABAIXO.

:: PHP 5.5 ou 5.6

:: Componente gratuito Zend Guard Loader
https://cerebrum.freshdesk.com/support/solutions/articles/4000097555

:: Gerenciador de dependências Composer
https://cerebrum.freshdesk.com/support/solutions/articles/4000097554

-

Fico no aguardo das informações solicitadas

-

## Passo 2
## Sobre a analise do projeto

-

???

-

# Sobre segurança no Magento

Ultimamente tenho visto em grupos de Magento informações sobre ataques em projetos que usam o Magento defasado

Sugiro sempre manter o seu projeto atualizado devido as melhorias e correções

Sugiro também escanear sua loja na busca de vulnerabilidades de segurança conhecidas

https://www.magereport.com/

-

# Dica

Procure manter o máximo de bibliotecas gerenciadas pelo Composer para sempre obter as atualizações automáticas quando feito o uso do composer

-

# Sobre atualizações

Sugiro sempre utilizar módulos atualizados pois os mesmos sempre contem melhorias e correções

Sugiro pelo menos 1 vez por semana, executar os processos a seguir para você sempre ter o módulo atualizado

https://cerebrum.freshdesk.com/solution/articles/4000099413

-

## Passo 3
## Instalação

-

Sugiro analisar o manual 

https://github.com/mozgbrasil/magento-bancodobrasil-php55#mozgbancodobrasil

Abaixo estou resumindo os procedimentos para a instalação do módulo

-

Sugiro "printar" as telas com todos os procedimentos executados

Me envie as imagens das telas na eventualidade de quaisquer dificuldades

-

Sugiro efetuar backup do seu projeto e banco de dados

-

Antes de efetuar qualquer atualização no Magento sempre mantenha o Compiler e o Cache desativado

-

Para efeito de testes, sugiro que clone o seu projeto criando um ambiente de teste e efetue os testes sempre no seu ambiente de testes

-

Edite ou Crie o arquivo composer.json com o seguinte conteúdo 

-

{
  "minimum-stability": "dev",
  "prefer-stable": true,
  "license": [
    "proprietary"
  ],
  "repositories": [
    {
      "type": "composer",
      "url": "https?://packages.firegento.com"
    }
  ],
  "extra": {
    "magento-root-dir": "./",
    "magento-deploystrategy": "copy",
    "magento-force": true
  },
  "require": {
    "aoepeople/aoe_scheduler": "^1.5",
    "aschroder/smtp_pro": "^2.0",
    "mozgbrasil/magento-bancodobrasil-php55": "dev-master"
  }
}

-

Acima vemos o manifesto do Composer onde está sendo requerido a instalação das 3 bibliotecas mencionadas acima

Esse conteúdo deve estar acessível na raiz do seu projeto no seu caso em  

http://www.ctsinformatica.com.br/composer.json

-

Em seguida execute via terminal na raiz do seu projeto o seguinte comando 

        composer update

Dessa forma o Composer deve instalar todos os requerimentos informado no arquivo composer.json

-

Em seguida será necessário configurar a CRON

-

# Sobre a CRON

-

Todos os métodos de pagamentos tem obrigatoriedade do uso da CRON para o processamentos dos serviços

O método do Correios, tem a automação de notificação que é processada pela CRON 

-

A CRON deve estar em funcionamento para o processamento da notificação dos métodos de pagamento

-

Para acessar a CRON do sistema, execute o seguinte comando no terminal


        crontab -e

-

Adicione o comando abaixo para CRON processar os serviços do Magento

-

* * * * * /bin/sh /home/ctsinformatica/public_html/cron.sh >> /home/ctsinformatica/public_html/var/log/magento.cron.log&

-


Ao acessar 

http://www.ctsinformatica.com.br/phpinfo.php

E pesquisar por "SCRIPT_FILENAME", temos o caminho físico do projeto

Por isso que já deixei a CRON acima já configurada para o seu ambiente

-

No backend do Magento em: Sistema -> List View -> Caso tenha registros, exclua os registros

Em seguida exclua ou renomeie a pasta "var/cache" sob o Magento

Na virada do minuto a CRON em execução deve recriar os serviços a ser processado

Acesse no backend do Magento em: Sistema -> List View -> Para visualizar os serviços processados ou a serem processados pela CRON

-