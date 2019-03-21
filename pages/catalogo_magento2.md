---
layout: page
title: Catálogo Magento2
permalink: /catalogo_magento2/
order: 3
excerpt: "Instale nossos módulos sem compromisso e só pague após testar e comprovar a qualidade dos nossos produtos."

array_repo_version:
  - title: 'Pacote completo'
    url: 'https://github.com/mozgbrasil/magento-bundle#mozgbundle'
    summary: ''
  - title: 'Correios & Correios Exporta Fácil'
    url: 'https://github.com/mozgbrasil/magento-correios#mozgcorreios'
    summary: ''

array_repo_free:
  - title: 'Pacote de tradução (Free)'
    url: 'https://github.com/mozgbrasil/magento-locale-pt_br#mozgmagentolocale'
    summary: ''

---

<div class="row">
  <div class="col-sm-6">
    <div class="card ">
      <div class="card-body">
        <h5 class="card-title">Frontend</h5>
        <p class="card-text">Cique abaixo para acesso ao frontend do Magento</p>
        <a href="http://aws-mozgapp.4c8p5qkwgr.us-west-2.elasticbeanstalk.com/magento/" class="btn btn-primary">Clique aqui</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card ">
      <div class="card-body">
        <h5 class="card-title">Backend</h5>
        <p class="card-text">Cique abaixo para acesso ao backend do Magento</p>
        <a href="http://aws-mozgapp.4c8p5qkwgr.us-west-2.elasticbeanstalk.com/magento/index.php/admin/" class="btn btn-primary" title='No processo de autenticação para o campo usuário informe "admin" e para senha informe "123456a", após a autenticação será exibido o menu "∞ MOZG ∞" e seus submenu contendo os diversos métodos'>Clique aqui</a>
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
              <figure class="profile">
                  <img src="/assets/images/logos/theme-logo-white.png" class="profile-avatar" alt="">
              </figure>
              <h4 class="card-title mt-3">{{ item.title }}</h4>
              <div class="meta">
                  <a>&nbsp;</a>
              </div>
              <div class="card-text">
                  {{ item.summary }}
              </div>
          </div>
          <div class="card-footer">
              <a href="{{ item.url | replace: '#', '-php_54#' }}" target="_blank" class="btn btn-info btn-sm">PHP 5.4-5.5</a> <a href="{{ item.url | replace: '#', '-php_56#' }}" target="_blank" class="btn btn-info btn-sm">PHP 5.6-7.0</a> <a href="{{ item.url | replace: '#', '-php_71#' }}" target="_blank" class="btn btn-info btn-sm">PHP 7.1</a> <a href="{{ item.url | replace: '#', '-php_72#' }}" target="_blank" class="btn btn-info btn-sm">PHP 7.2</a>
          </div>
      </div>
  </div>
{% endfor %}

{% for item in page.array_repo_free %}
  <div class="col-sm-6 col-md-4">
      <div class="card">
          <img class="card-img-top" src="/assets/images/free-stock-photos.gif">
          <div class="card-block">
              <figure class="profile">
                  <img src="/assets/images/logos/theme-logo-white.png" class="profile-avatar" alt="">
              </figure>
              <h4 class="card-title mt-3">{{ item.title }}</h4>
              <div class="meta">
                  <a>&nbsp;</a>
              </div>
              <div class="card-text">
                  {{ item.summary }}
              </div>
          </div>
          <div class="card-footer">
              <a href="{{ item.url }}" target="_blank" class="btn btn-info btn-sm">Free</a>
          </div>
      </div>
  </div>
{% endfor %}
</div>
