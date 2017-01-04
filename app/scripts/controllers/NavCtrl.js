(function() {
  function NavCtrl(Auth) {

    Auth.onStateChange(function (firebaseUser) {
      this.firebaseUser = firebaseUser;
      console.log("NavCtrl Auth.$firebaseUser", Auth.$firebaseUser);
    }.bind(this));
  }
  
  angular
    .module('blocJams')
    .controller('NavCtrl', ['Auth', NavCtrl]);
})();