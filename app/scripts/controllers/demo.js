'use strict';

angular.module('myFirstProjectApp')
  .controller('DemoCtrl', function ($scope, $timeout) {
        $scope.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
        ];

        $scope.chartData = [
            {
                "label": "Itsik",
                "value": 20
            },
            {
                "label": "John",
                "value": 50
            }
        ];


        $timeout(function(){
            console.log("push");
            $scope.chartData.push({
                "label": "other",
                "value": 120
            });
        }, 1000);

        $timeout(function(){
            console.log("push");
            $scope.chartData.push({
                "label": "New One",
                "value": 40
            });
        }, 3000);

        $timeout(function(){
            console.log("shift");
            $scope.chartData.shift();
        }, 5000);
  });
