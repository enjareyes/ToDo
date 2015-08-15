angular.module('app', ['ngRoute'])

.config(function($routeProvider) {
  $routeProvider 
    .when('/login', {
      templateUrl: 'signup.html',
      controller: 'loginController',
      authenticate: false
    })
    .when('/list', {
      templateUrl: 'list.html',
      controller: 'listController',
      authenticate: true
    })
    .otherwise({
      redirectTo: '/list'
    })
})

.run(function($rootScope, $location, authFac){
  $rootScope.$on('$routeChangeStart', function(event, next){
    $rootScope.path = $location.path();
    $rootScope.authenticate = authFac.isLoggedIn();
    var loggedIn = authFac.isLoggedIn();
    console.log('isLoggedIn:',localStorage.getItem('token'))

    if(!loggedIn && next.$$route.authenticate){
      console.log('!loggedin')
      $location.path('/login');
    } else if(loggedIn && $location.path() === '/list'){
      $location.path('/list'); 
    }
  });
})

.factory('authFac', function(){

  var isLoggedIn = function(){
    return (!!localStorage.getItem('token'))  
  };

  return { isLoggedIn: isLoggedIn};
})



