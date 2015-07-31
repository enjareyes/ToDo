angular.module('app')

.controller('listController', function($scope, List, $http){
  $scope.listItems = List.listItems;
  angular.extend($scope, List);

  $scope.addItem = function(item){
    $scope.newToDo = '';
    List.addItem(item);
  }

  $scope.logout = function(){
    List.logout()
  }
})

.factory('List', function($window){
  var listItems = []; //{text:'ha',done:false}

  var getItems = function(){
    //send request to DB
    var email = localStorage.getItems('email');

    // $http.get('/getItems', function(){

    // }).success(function(data){
    //   console.log('success in getItems')
    // })
  }

  var addItem = function(item){
    listItems.push({text:item,done:false});
    //send to server and save to DB
    $http.post('/addItem', function(){
      //send item to db
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



