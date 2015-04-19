'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoApp
 */
angular.module('todoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.showDone = true;
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'Sitepoint',
    ];

    $scope.model = {
        user: 'Luis',
        items: [
            {action: 'Buy Flowers', done: false},
            {action: 'Go to sleep', done: false},
            {action: 'set conf directory', done: true},
        ],
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
    };

  });
