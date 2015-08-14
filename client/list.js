angular.module('app')

.controller('listController', function($scope, List, $http, $window){
  $scope.listItems = List.listItems;
  angular.extend($scope, List);

  $scope.addItem = function(item){
    List.addItem(item).success(function(){
      $scope.getItems();
    })
  }

  $scope.removeItem = function(item){
    List.removeItem(item).success(function(){
      $scope.getItems()
    })
  }

  $scope.getItems = function(){
    List.getItems().success(function(data){
      $scope.listItems = data.items
    })
  }

  $scope.logout = function(){
    List.logout()
  }

  $scope.getItems()
})


.factory('List', function($window, $http){
  var listItems;

  var getItems = function(){
    var email = localStorage.getItem('email');

    return $http.get('/getItems', {
      params: {email: email}
    }).success(function(data){
      console.log('success in getItems')
      listItems = data.items.reverse()
      return listItems
    })
  }

  var addItem = function(item){
    listItems.push({text:item,done:false});
    var email = localStorage.getItem('email')

    return $http({
    method: 'POST',
    url: '/addItem',
    params: {email: email, item:item}
    })
  }

  var removeItem = function(item){
    var email = localStorage.getItem('email')
    return $http({
    method: 'POST',
    url: '/removeItem',
    params: {email: email, item:item}
    })
    .success(function(data){
      console.log('removing item')
    })
  }

  var logout = function(){
    localStorage.removeItem('email')
    console.log('loggingout')
    localStorage.removeItem('token')
    $window.location.href = '#/login'
  }

  return {
    getItems: getItems,
    listItems: listItems,
    addItem: addItem,
    removeItem: removeItem,
    logout: logout 
  }
})


.directive('ngEnter', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if(event.which === 13) {
        scope.$apply(function (){
            scope.$eval(attrs.ngEnter);
        });
        event.preventDefault();
      }
    });
  };
});



