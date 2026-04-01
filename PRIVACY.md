# Politica de Privacidade

Esta politica descreve como a landing publica de MOZG em
`https://mozgbrasil.github.io/` trata sinais tecnicos e dados de navegacao.

## Escopo

Esta superficie e estatica e foi desenhada para apresentar o perfil publico,
links oficiais, curriculo, provas de confianca e sinais recentes do ecossistema
MOZG.

## Dados e sinais tecnicos utilizados

O site pode processar os seguintes sinais tecnicos durante a navegacao:

- `Google Analytics 4` com o identificador `G-WCNGF2YB71` para medir visitas e
  interacoes publicas;
- `localStorage` para guardar preferencia de tema e cache temporario do resumo
  publico do GitHub;
- chamadas client-side para a API publica do GitHub com um envelope tecnico
  contendo `request_id`, `x_request_timestamp`, `x_request_path` e
  `x_request_method`;
- carregamento do `VLibras` a partir de `https://vlibras.gov.br/app` para
  acessibilidade em Libras.

## Finalidade

Esses sinais sao usados para:

- entender o uso publico da landing e das paginas principais;
- manter a experiencia visual consistente entre visitas;
- reduzir consultas repetidas ao GitHub com cache curto no navegador;
- oferecer recursos de acessibilidade em Libras na propria superficie publica.

## Compartilhamento com terceiros

Alguns sinais tecnicos sao processados por servicos de terceiros usados pela
propria pagina:

- `Google` para analytics;
- `GitHub` para ler eventos e repositorios publicos do perfil;
- `VLibras` para o widget de acessibilidade.

O projeto nao vende dados pessoais e nao cria cadastro proprio nesta landing.

## Retencao

- a preferencia de tema e o cache local do dashboard do GitHub ficam no
  navegador do visitante e podem ser removidos a qualquer momento;
- eventos de analytics seguem as politicas do provedor responsavel;
- o envelope tecnico do request e usado no browser para observabilidade da
  pagina e das consultas publicas.

## Controle do visitante

O visitante pode:

- limpar `localStorage` no navegador;
- bloquear scripts de terceiros;
- navegar sem interagir com links externos;
- entrar em contato para esclarecer duvidas sobre esta politica.

## Contato

Para duvidas sobre privacidade, acessibilidade ou tratamento tecnico dos dados:

- `mozgbrasil@gmail.com`
- `https://mozg.com.br/contato`
