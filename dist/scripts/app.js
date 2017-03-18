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
        templateUrl: '/templates/landing.html',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["Auth", "$cookies", function(Auth, $cookies) {
            console.log(">>>>", $cookies);
            if ($cookies.getObject("user")) {
              console.log("A cookie exists");
              return $cookies.getObject("user");
            }
            // $requireSignIn returns a promise so the resolve waits for it to complete
            return Auth.$firebaseAuth.$waitForSignIn();
          }]
        }
      })
      .state('album', {
        url: '/album',
        controller: 'AlbumCtrl as album',
        templateUrl: '/templates/album.html',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["Auth", "$cookies", function(Auth, $cookies) {
            console.log(">>>>", $cookies);
            if ($cookies.getObject("user")) {
              console.log("A cookie exists");
              return $cookies.getObject("user");
            }
            // $requireSignIn returns a promise so the resolve waits for it to complete
            return Auth.$firebaseAuth.$requireSignIn();
          }]
        }
      })
      .state('user', {
        url: '/user',
        controller: 'UserCtrl as user',
        templateUrl: '/templates/user.html',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["Auth", "$cookies", function(Auth, $cookies) {
            console.log(">>>>", $cookies);
            if ($cookies.getObject("user")) {
              console.log("A cookie exists");
              return $cookies.getObject("user");
            }
            // $requireSignIn returns a promise so the resolve waits for it to complete
            return Auth.$firebaseAuth.$waitForSignIn();
          }]
        }
      })
      .state('register', {
        url: '/register',
        controller: 'RegisterCtrl as register',
        templateUrl: '/templates/register.html'
      })
      .state('collection', {
        url: '/collection',
        controller: 'CollectionCtrl as collection',
        templateUrl: '/templates/collection.html',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["Auth", "$cookies", function(Auth, $cookies) {
            console.log(">>>>", $cookies);
            if ($cookies.getObject("user")) {
              console.log("A cookie exists");
              return $cookies.getObject("user");
            }
            // $requireSignIn returns a promise so the resolve waits for it to complete
            return Auth.$firebaseAuth.$requireSignIn();
          }]
        }
      });
  }
  
  angular
    .module('blocJams', ['ui.router', 'firebase', 'ngCookies'])
    .config(config);
})();
