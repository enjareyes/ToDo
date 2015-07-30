angular.module('app')

.controller('loginController', function(Auth, $scope){
  $scope.login = function(email, password){
    Auth.login(email,password)
  }
})


.factory('Auth', function($http){

  var login = function(email,password){
    //store in local storage
    localStorage.setItem('email', email);

    //send to server
    return $http.get('/login', {
      params: { email: email, password: password }
    }).success(function(res){
      console.log('success in login!', res)
      localStorage.setItem('token',res.token)
    })
  }

  var logout = function(){
    localStorage.removeItem('email')
  }

  return {
    login: login,
    logout: logout
  }
})