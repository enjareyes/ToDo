angular.module('app')

.controller('loginController', function(Auth, $scope){
  $scope.login = function(email, password){
    Auth.login(email,password)
  }

  $scope.signup = function (email,password) {
    Auth.signup(email, password);
  };
})


.factory('Auth', function($http, $window){

  var login = function(email,password){

    //send to server
    return $http.get('/login', {
      params: { email: email, password: password }
    }).success(function(res){
      localStorage.setItem('email', email);
      console.log('success in login!', res)
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
      console.log('Success in signup')
      localStorage.setItem('token',res.token)
      $window.location.href = '#/list'
    })
  };


  return {
    login: login,
    signup: signup
  }
})


