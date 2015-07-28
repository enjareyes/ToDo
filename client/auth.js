angular.module('app')

.controller('loginController', function(Auth, $scope){
  $scope.login = function(email, password){
    Auth.login(email,password)
  }
})


.factory('Auth', function(){

  var login = function(email,password){
    //store in local storage
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    //send to server
  }

  var logout = function(){
    localStorage.removeItem('email')
    localStorage.removeItem('password')
  }

  return {
    login: login
  }
})