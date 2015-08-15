angular.module('app')

.controller('loginController', function(Auth, $scope){
  $scope.login = function(email, password){
    Auth.login(email,password)
  }

  $scope.signup = function (email,password) {
    Auth.signup(email, password);
  };
})


.factory('Auth', function($http, $location){

  var login = function(email,password){
    return $http.get('/login', {
      params: { email: email, password: password }
    })
    .success(function(res){
      localStorage.setItem('email', email);
      // console.log('success in login!', res)
      localStorage.setItem('token',res.token)
      $location.path = '/list'
    })
  }

  var signup = function (email, password) {
    return $http.get('/signup', {
      params: {email: email, password: password}
    })
    .success(function(res){
      localStorage.setItem('email', email);
      console.log('Success in signup')
      localStorage.setItem('token',res.token)
      $location.path = '/list'
    })
  };

  return {
    login: login,
    signup: signup
  }
})


