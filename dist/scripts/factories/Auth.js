(function() {
  function Auth($firebaseAuth) {
    var Auth = {};
    var stateChangeCallbacks = [];
    
    Auth.$firebaseAuth = $firebaseAuth();
    
//    Auth.isUserLoaded = function () {
//      if (Auth.$firebaseUser) {
//        return
//      }
//    }
    
    Auth.onStateChange = function (callback) {
      stateChangeCallbacks.push(callback);
    };

    // any time auth state changes, add the user data to scope
    Auth.$firebaseAuth.$onAuthStateChanged(function(firebaseUser) {
      Auth.$firebaseUser = firebaseUser;
      console.log("Auth Auth.$firebaseUser", Auth.$firebaseUser);
      
      for (var i = 0; i < stateChangeCallbacks.length; i++) {
        stateChangeCallbacks[i](firebaseUser);
      }
    });
                                 
    Auth.createUser = function() {
      this.message = null;
      this.error = null;

      // Create a new user
      Auth.$firebaseAuth.$createUserWithEmailAndPassword(this.email, this.password)
        .then(function(firebaseUser) {
          Auth.message = "User created with uid: " + firebaseUser.uid;
        }).catch(function(error) {
          Auth.error = error;
        });
    };

    Auth.deleteUser = function() {
      this.message = null;
      this.error = null;

      // Delete the currently signed-in user
      Auth.$firebaseAuth.$deleteUser().then(function() {
        Auth.message = "User deleted";
      }).catch(function(error) {
        Auth.error = error;
      });
    };
    
    Auth.signOut = function() {
      Auth.$firebaseAuth.$signOut();
      this.email = null;
      this.password = null;
      window.alert("You have been successfully signed out. See you back soon!");
    }
        
    return Auth;
  }
  
  angular
    .module('blocJams')
    .factory('Auth', ["$firebaseAuth", Auth])
})();