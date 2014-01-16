'use strict';

angular.module('myFirstProjectApp')
    .controller('InstallprogressCtrl', function ($scope, $timeout) {

    $scope.progress = {
        "progress": 10
    }

    $timeout(function(){
        $scope.progress = {
            "progress": 30
        }
    }, 1000);

    $scope.assocData = {
        "succeed": 10,
        "error": 15,
    }

    $timeout(function(){
        $scope.assocData = {
            "succeed": 20,
            "error": 45,
            "warning": 35
        }
    }, 2000);

    $timeout(function(){
        $scope.assocData = {
            "succeed": 60,
            "error": 5,
            "warning": 35
        }
    }, 5000);


    var progressDemo = function() {
        $scope.progress['progress']++;
        if($scope.progress['progress'] < 85)
            $timeout(progressDemo, 30);
    }
    $timeout(progressDemo, 2000);

});
