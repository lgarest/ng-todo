'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoApp
 */
angular.module('todoApp')
  .controller('MainCtrl', function ($http, $scope, $rootScope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'Sitepoint',
    ];

    $scope.model = {
        user: 'Luis',
        items: $rootScope.items,
    };

    $scope.incompleteCount = function(){
        var count = 0;
        angular.forEach($scope.model.items, function(item){
            if (!item.done) { count++; }
        });
        return count;
    };

    $scope.warningLevel = function(){
        return $scope.incompleteCount() < 3 ? 'label-success' : 'label-warning';
    };

    $scope.addNewItem = function(actionText){
        $scope.model.items.push({action: actionText, done:false});
        // $http.post('json/todo.json', angular.toJson($scope.model.items, true), []); // save to json file
    };

  })
  .filter('checkedItems', function() {
    return function (items, showComplete) {
        var resultArr = [];
        angular.forEach(items, function(item){
            if (item.done === false || showComplete === true) {
                resultArr.push(item);
            }
        });
        return resultArr;
    };
  })
  .run(function ($http, $rootScope){
    $http.get('json/todo.json').success(function (data) {
        $rootScope.items = data;
    });
  });
