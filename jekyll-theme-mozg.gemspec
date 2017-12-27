# encoding: utf-8

Gem::Specification.new do |s|
  s.name          = "jekyll-theme-mozg"
  s.version       = "0.1.0"
  s.authors       = ["GitHub, Inc."]
  s.email         = ["suporte@mozg.com.br"]
  s.homepage      = "https://github.com/mozgbrasil/mozgbrasil.github.io"
  s.summary       = "Primer is a Jekyll theme for GitHub Pages based on GitHub's Primer styles"
  s.metadata    = { "source_code_uri" => "https://github.com/mozgbrasil/mozgbrasil.github.io" }

  s.files         = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r!^(assets|_(includes|layouts|sass)/|(LICENSE|README)((\.(txt|md)|$)))!i)
  end

  s.platform      = Gem::Platform::RUBY
  s.license       = "None"

  s.add_dependency "jekyll", "~> 3.6"
  s.add_runtime_dependency "jekyll-seo-tag", "~> 2.4"
  s.add_runtime_dependency "jekyll-github-metadata", "~> 2.9"
  s.add_runtime_dependency "jekyll-paginate", "~> 1.1"
  s.add_development_dependency "rubocop", "~> 0.52"
end
