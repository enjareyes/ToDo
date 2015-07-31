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
      redirectTo: '/login'
    })
})

.run(function($rootScope, $location, checkAuthFac){
  $rootScope.$on('$routeChangeStart', function(event, next){
    $rootScope.path = $location.path();
    $rootScope.authenticate = checkAuthFac.isLoggedIn();
    var loggedIn = checkAuthFac.isLoggedIn();

    if(!loggedIn && next.$$route.authenticate){
      console.log('not loggedin')
      $location.path('/login');
    } else if(loggedIn && $location.path() === '/list'){
      $location.path('/list'); 
    }
  });
})

.factory('checkAuthFac', function(){

  var isLoggedIn = function(){
    //if token exists return true
    console.log('isLoggedIn:',localStorage.getItem('token'))
    return (!!localStorage.getItem('token'))  
  };

  return { isLoggedIn: isLoggedIn};
})



