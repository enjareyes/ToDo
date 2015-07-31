angular.module('app')

.controller('loginController', function(Auth, $scope){
  $scope.login = function(email, password){
    Auth.login(email,password)
  }
})


.factory('Auth', function($http, $window){

  var login = function(email,password){
    //store in local storage
    localStorage.setItem('email', email);

    //send to server
    return $http.get('/login', {
      params: { email: email, password: password }
    }).success(function(res){
      if (res.token === false){
        console.log('Wrong password')
      } else {
        console.log('success in login!', res)
        localStorage.setItem('token',res.token)
        $window.location.href = '#/list'
      }
    })
  }


  return {
    login: login
  }
})


