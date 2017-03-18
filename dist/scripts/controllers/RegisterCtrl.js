(function() {
  function RegisterCtrl(Auth) {
    this.createUser = Auth.createUser;
  }
  
  angular
    .module('blocJams')
    .controller('RegisterCtrl', ['Auth', RegisterCtrl])
})();