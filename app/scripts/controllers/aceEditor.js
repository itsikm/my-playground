'use strict';

angular.module('myFirstProjectApp')
    .controller('AceeditorCtrl', function ($scope, $http) {

        $scope.aceLoaded = function (_editor) {
            // Options
            _editor.setReadOnly(true);
        };

        $scope.aceChanged = function (e) {
            //
        };

        $http.get("example.yml").success(function (data) {

            $scope.code = data;

        });
    });
