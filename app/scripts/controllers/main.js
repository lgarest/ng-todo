'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoApp
 */
angular.module('todoApp')
  .controller('MainCtrl', function ($scope, $http){ //, $rootScope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'Sitepoint',
    ];

    $scope.model = {
        user: 'Luis',
        items: [],
        // items: $rootScope.items,
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
        $scope.actionText = '';
        // $http.post('json/todo.json', angular.toJson($scope.model.items, true), []); // save to json file
    };

    $scope.deleteItem = function (item){
        $scope.model.items.splice($scope.model.items.indexOf(item),1);
    };


    $scope.loadFromJson = function(){
        $http.get('json/todo.json').success(function (data) {
            $scope.model.items = data;
        });
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
  .run(function (){ // , $http, $rootScope){
    // $http.get('json/todo.json').success(function (data) {
    //     $rootScope.items = data;
    // });
    console.log('HEY just executed');
  });
