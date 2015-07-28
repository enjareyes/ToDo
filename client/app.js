angular.module('app', ['ngRoute'])

.config(function($routeProvider) {
  $routeProvider 
    .when('/login', {
      templateUrl: 'signup.html',
      controller: 'loginController'
    })
    .when('/list', {
      templateUrl: 'list.html',
      controller: 'listController'
    })
    .otherwise({
      redirectTo: '/login'
    })
})

