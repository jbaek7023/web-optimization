exports.config = 
  conventions:
    assets: /^app\/assets\//
  modules:
    definition: false
    wrapper: false
  paths:
    public: 'public'
  files:
    javascripts:
      joinTo: 
      	'js/index.js': /^app\/js\/index\//
      	'js/pizza.js': /^app\/js\/pizza\//	
      	'views/js/main.js': /^app\/js\/main\//		
    stylesheets:
      joinTo: 
      	'css/style.css': /^app\/css\/style\//
      	'css/print.css': /^app\/css\/print\//	
      	'views/css/bootstrap-grid.css': /^app\/css\/bootstrap\//
		'views/css/pizza.css': /^app\/css\/pizza\//	