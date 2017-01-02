(function() {
  function Auth(firebase, $firebaseAuth) {
    return $firebaseAuth();
  }
  
  angular
    .module('blocJams')
    .factory('Auth', ['firebase', "$firebaseAuth", Auth])
})();