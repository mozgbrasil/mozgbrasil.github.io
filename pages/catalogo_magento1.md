---
layout: page
title: Catálogo Magento1
permalink: /catalogo_magento1/
order: 3
excerpt: "Instale nossos módulos sem compromisso e só pague após testar e comprovar a qualidade dos nossos produtos."

array_repo_version:
  - title: "Pacote completo"
    url: "https://github.com/mozgbrasil/magento-bundle#mozgbundle"
    summary: ""
  - title: "Correios & Correios Exporta Fácil"
    url: "https://github.com/mozgbrasil/magento-correios#mozgcorreios"
    summary: ""
  - title: "Jadlog"
    url: "https://github.com/mozgbrasil/magento-jadlog#mozgjadlog"
    summary: ""
  - title: "Jamef"
    url: "https://github.com/mozgbrasil/magento-jamef#mozgjamef"
    summary: ""
  - title: "Loggi"
    url: "https://github.com/mozgbrasil/magento-loggi#mozgloggi"
    summary: ""
  - title: "Braspag API V2"
    url: "https://github.com/mozgbrasil/magento-braspag#mozgbraspag"
    summary: ""
  - title: "Cielo API 3.0 &  Checkout Cielo"
    url: "https://github.com/mozgbrasil/magento-cielo#mozgcielo"
    summary: ""
  - title: "Rede / e.Rede"
    url: "https://github.com/mozgbrasil/magento-rede#mozgrede"
    summary: ""
  - title: "Rede / Komerci WebService"
    url: "https://github.com/mozgbrasil/magento-redecard#mozgredecard"
    summary: ""
  - title: "Bradesco"
    url: "https://github.com/mozgbrasil/magento-bradesco#mozgbradesco"
    summary: ""
  - title: "Banco do Brasil"
    url: "https://github.com/mozgbrasil/magento-bancodobrasil#mozgbancodobrasil"
    summary: ""
  - title: "Itaú"
    url: "https://github.com/mozgbrasil/magento-itau#mozgitau"
    summary: ""
  - title: "PagSeguro"
    url: "https://github.com/mozgbrasil/magento-pagseguro#mozgpagseguro"
    summary: ""
  - title: "Total ClearSale & ClearSale Start"
    url: "https://github.com/mozgbrasil/magento-clearsale#mozgclearsale"
    summary: ""
  - title: "Cadastro de Clientes"
    url: "https://github.com/mozgbrasil/magento-customer#mozgcustomer"
    summary: ""
  - title: "Estimativa de Frete na página de produto"
    url: "https://github.com/mozgbrasil/magento-product-page-shipping#mozgproductpageshipping"
    summary: ""
  - title: "Filtros para o Checkout"
    url: "https://github.com/mozgbrasil/magento-checkout-filters#mozgcheckoutfilters"
    summary: ""

array_repo_free:
  - title: "Pacote de tradução (Free)"
    url: "https://github.com/mozgbrasil/magento-locale-pt_br#mozgmagentolocale"
    summary: ""
  - title: "Estados do Brasil (Free)"
    url: "https://github.com/mozgbrasil/magento-brasil-regions#mozgbrregions"
    summary: ""
  - title: "Checkout da compra em 1 passo (Free)"
    url: "https://github.com/mozgbrasil/magento-iwd-opc#iwdopc"
    summary: ""
---

<div class="alert alert-danger" role="alert">
  Para informações entre em contato no e-mail <a href="mailto:ajuda@cerebrum.com.br" class="btn btn-primary">ajuda@cerebrum.com.br</a>
</div>

<div class="row">
  <div class="col-sm-6">
    <div class="card ">
      <div class="card-body">
        <h5 class="card-title">Frontend</h5>
        <p class="card-text">Cique abaixo para acesso ao frontend do Magento</p>
        <a href="http://magento1mozg.herokuapp.com/magento/index.php/" class="btn btn-primary">Clique aqui</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card ">
      <div class="card-body">
        <h5 class="card-title">Backend</h5>
        <p class="card-text">Cique abaixo para acesso ao backend do Magento</p>
        <a href="http://magento1mozg.herokuapp.com/magento/index.php/admin/" class="btn btn-primary" title='No processo de autenticação para o campo usuário informe "admin" e para senha informe "123456a", após a autenticação será exibido o menu "∞ MOZG ∞" e seus submenu contendo os diversos métodos'>Clique aqui</a>
      </div>
    </div>
  </div>
</div>

<div class="row">
{% for item in page.array_repo_version %}
  <div class="col-sm-6 col-md-4">
      <div class="card">
          <img class="card-img-top" src="/assets/images/free-stock-photos.gif">
          <div class="card-block">
              <figure class="card-profile">
                  <img src="/assets/images/logos/theme-logo-white.png" class="card-profile-avatar" alt="">
              </figure>
              <h4 class="card-title mt-3">{{ item.title }}</h4>
              <div class="card-meta">
                  <a>&nbsp;</a>
              </div>
              <div class="card-text">
                  {{ item.summary }}
              </div>
          </div>
          <div class="card-footer">
              <a href="{{ item.url | replace: '#', '-php_54#' }}" target="_blank" class="btn btn-primary">PHP 5.4-5.5</a> <a href="{{ item.url | replace: '#', '-php_56#' }}" target="_blank" class="btn btn-primary">PHP 5.6-7.0</a> <a href="{{ item.url | replace: '#', '-php_71#' }}" target="_blank" class="btn btn-primary">PHP 7.1</a> <a href="{{ item.url | replace: '#', '-php_72#' }}" target="_blank" class="btn btn-primary">PHP 7.2</a>
          </div>
      </div>
  </div>
{% endfor %}

{% for item in page.array_repo_free %}

  <div class="col-sm-6 col-md-4">
      <div class="card">
          <img class="card-img-top" src="/assets/images/free-stock-photos.gif">
          <div class="card-block">
              <figure class="card-profile">
                  <img src="/assets/images/logos/theme-logo-white.png" class="card-profile-avatar" alt="">
              </figure>
              <h4 class="card-title mt-3">{{ item.title }}</h4>
              <div class="card-meta">
                  <a>&nbsp;</a>
              </div>
              <div class="card-text">
                  {{ item.summary }}
              </div>
          </div>
          <div class="card-footer">
              <a href="{{ item.url }}" target="_blank" class="btn btn-primary">Free</a>
          </div>
      </div>
  </div>
{% endfor %}
</div>
