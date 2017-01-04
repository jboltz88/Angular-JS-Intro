(function() {
  function UserCtrl(Auth) {
    this.deleteUser = Auth.deleteUser;
    this.auth = Auth.$firebaseAuth;
    this.signOut = Auth.signOut

    Auth.onStateChange(function (firebaseUser) {
      this.firebaseUser = firebaseUser;
      console.log("UserCtrl Auth.$firebaseUser", Auth.$firebaseUser);
    }.bind(this));
   
  }
  
  angular
    .module('blocJams')
    .controller('UserCtrl', ['Auth', UserCtrl]);
})();