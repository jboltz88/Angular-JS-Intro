(function() {
  function config($stateProvider, $locationProvider) {
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });
    
    $stateProvider
      .state('landing', {
        url: '/',
        controller: 'LandingCtrl as landing',
        templateUrl: '/templates/landing.html'
      })
      .state('album', {
        url: '/album',
        controller: 'AlbumCtrl as album',
        templateUrl: '/templates/album.html'
      })
      .state('login', {
        url: '/login',
        controller: 'UserCtrl as user',
        templateUrl: '/templates/login.html'
      })
      .state('register', {
        url: '/register',
        controller: 'RegisterCtrl as user',
        templateUrl: '/templates/register.html'
      })
      .state('collection', {
        url: '/collection',
        controller: 'CollectionCtrl as collection',
        templateUrl: '/templates/collection.html'
      });
  }
  
  angular
    .module('blocJams', ['ui.router', 'firebase'])
    .config(config);
})();
