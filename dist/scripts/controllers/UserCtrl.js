(function() {
  function UserCtrl(Auth, $cookies, currentAuth) {
    this.deleteUser = Auth.deleteUser;
    this.auth = Auth.$firebaseAuth;
    this.signOut = Auth.signOut;
    this.userExists = function() {
      if ($cookies.getObject("user")) {
        return true;
      }
      else {
        return false;
      }
    }
    this.setCookie = function() {
      $cookies.putObject("user", this.firebaseUser);
      console.log("user", this.firebaseUser);
    }
    this.getCookie = function() { 
      var user = $cookies.getObject("user");
      console.log(user);
      var userEmail = user.email;
      console.log(userEmail);
    };
      
    Auth.onStateChange(function (firebaseUser) {
      this.firebaseUser = firebaseUser;
      console.log("UserCtrl Auth.$firebaseUser", Auth.$firebaseUser);
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 1);
      $cookies.putObject("user", firebaseUser, {'expires': expireDate});
    }.bind(this));
   
  }
  
  angular
    .module('blocJams')
    .controller('UserCtrl', ['Auth', '$cookies', 'currentAuth', UserCtrl]);
})();