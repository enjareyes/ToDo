angular.module('app')

.controller('listController', function($scope, List){
  $scope.listItems = List.listItems;
  angular.extend($scope, List);

  $scope.addItem = function(item){
    $scope.newToDo = '';
    List.addItem(item);
  }
})

.factory('List', function(){
  var listItems = []; //{text:'ha',done:false}

  var getItems = function(){
    //send request to DB
  }

  var addItem = function(item){
    listItems.push({text:item,done:false});
    //send to server and save to DB
  }

  return {
    getItems: getItems,
    listItems: listItems,
    addItem: addItem  
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



