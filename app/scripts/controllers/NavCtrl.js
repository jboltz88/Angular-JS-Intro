(function() {
  function NavCtrl(Auth) {

    Auth.onStateChange(function (firebaseUser) {
      this.firebaseUser = firebaseUser;
    }.bind(this));
  }
  
  angular
    .module('blocJams')
    .controller('NavCtrl', ['Auth', NavCtrl]);
})();