(function() {
  function RegisterCtrl(Auth) {
    this.createUser = function() {
      this.message = null;
      this.error = null;

      // Create a new user
      Auth.$createUserWithEmailAndPassword(this.email, this.password)
        .then(function(firebaseUser) {
          this.message = "User created with uid: " + firebaseUser.uid;
        }).catch(function(error) {
          this.error = error;
        });
    };

    this.deleteUser = function() {
      this.message = null;
      this.error = null;

      // Delete the currently signed-in user
      Auth.$deleteUser().then(function() {
        this.message = "User deleted";
      }).catch(function(error) {
        this.error = error;
      });
    };
  }
  
  angular
    .module('blocJams')
    .controller('RegisterCtrl', ['Auth', RegisterCtrl])
})();