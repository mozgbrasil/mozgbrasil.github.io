---
layout: page
title: Catálogo
permalink: /catalogo/
order: 3
excerpt: "Instale nossos módulos sem compromisso."

my_array:
  - title: 'Pacote completo'
    url: 'https://github.com/mozgbrasil/magento-bundle#mozgbundle'
    summary: ''
  - title: 'Correios & Correios Exporta Fácil'
    url: 'https://github.com/mozgbrasil/magento-correios#mozgcorreios'
    summary: ''
  - title: 'Jadlog'
    url: 'https://github.com/mozgbrasil/magento-jadlog#mozgjadlog'
    summary: ''
  - title: 'Jamef'
    url: 'https://github.com/mozgbrasil/magento-jamef#mozgjamef'
    summary: ''
  - title: 'Loggi'
    url: 'https://github.com/mozgbrasil/magento-loggi#mozgloggi'
    summary: ''
  - title: 'Braspag API V2'
    url: 'https://github.com/mozgbrasil/magento-braspag#mozgbraspag'
    summary: ''
  - title: 'Cielo API 3.0 &  Checkout Cielo'
    url: 'https://github.com/mozgbrasil/magento-cielo#mozgcielo'
    summary: ''
  - title: 'Rede / Komerci WebService'
    url: 'https://github.com/mozgbrasil/magento-redecard#mozgredecard'
    summary: ''
  - title: 'Bradesco'
    url: 'https://github.com/mozgbrasil/magento-bradesco#mozgbradesco'
    summary: ''
  - title: 'Banco do Brasil'
    url: 'https://github.com/mozgbrasil/magento-bancodobrasil#mozgbancodobrasil'
    summary: ''
  - title: 'Itaú'
    url: 'https://github.com/mozgbrasil/magento-itau#mozgitau'
    summary: ''
  - title: 'PagSeguro'
    url: 'https://github.com/mozgbrasil/magento-pagseguro#mozgpagseguro'
    summary: ''
  - title: 'Total ClearSale & ClearSale Start'
    url: 'https://github.com/mozgbrasil/magento-clearsale#mozgclearsale'
    summary: ''
  - title: 'Cadastro de Clientes'
    url: 'https://github.com/mozgbrasil/magento-customer#mozgcustomer'
    summary: ''
  - title: 'Estimativa de Frete na página de produto'
    url: 'https://github.com/mozgbrasil/magento-product-page-shipping#mozgproductpageshipping'
    summary: ''
  - title: 'Filtros para o Checkout'
    url: 'https://github.com/mozgbrasil/magento-checkout-filters#mozgcheckoutfilters'
    summary: ''
  - title: 'Pacote de tradução (Free)'
    url: 'https://github.com/mozgbrasil/magento-locale-pt_br#mozgmagentolocale'
    summary: ''
  - title: 'Estados do Brasil (Free)'
    url: 'https://github.com/mozgbrasil/magento-brasil-regions#mozgbrregions'
    summary: ''
  - title: 'Checkout da compra em 1 passo (Free)'
    url: 'https://github.com/mozgbrasil/magento-iwd-opc#mozgiwd_opc'
    summary: ''

---

<div class="row area--white">
    <div class="inner-container div--no-padding-top">
        <div class="blog-list row">
            {% for my_array in page.my_array %}
            <div class="blog-list__item column col-md-4 col-xs-12  text-center">
                <span class="blog-list__item-image-container">
                <img data-src="/assets/images/rocket.png" alt title class="lazy image--rounded image--margin"/>
                </span>
                <span class="blog-list__item-title">{{ my_array.title }}</span>
                <span class="blog-list__item-summary">{{ my_array.summary }} <a href="{{ my_array.url | replace: '#', '-PHP_54#' }}" target="_blank" class="blog-list__item-link link--no-hover">PHP 5.4-5.5</a> <a href="{{ my_array.url | replace: '#', '-PHP_56#' }}" target="_blank" class="blog-list__item-link link--no-hover">PHP 5.6-7.0</a></span>
            </div>
            {% endfor %}
        </div>
    </div>
</div>
