angular.module('app')

.controller('loginController', function(Auth, $scope){
  $scope.login = function(){
    var email = $scope.email,
        pw = $scope.pw;

    Auth.login(email,pw)
  }

  $scope.signup = function () {
    var email = $scope.email,
        pw = $scope.pw;

    Auth.signup(email, pw);
  };
})

.factory('Auth', function($http, $window){
  var login = function(email,password){
    return $http.get('/login', {
      params: { email: email, password: password }
    })
    .success(function(res){
      localStorage.setItem('email', email);
      localStorage.setItem('token',res.token)
      $window.location.href = '#/list'
    })
  }

  var signup = function (email, password) {
    return $http.get('/signup', {
      params: {email: email, password: password}
    })
    .success(function(res){
      localStorage.setItem('email', email);
      localStorage.setItem('token',res.token)
      $window.location.href = '#/list'
    })
  };

  return {
    login: login,
    signup: signup
  }
})


