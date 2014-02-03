'use strict';

angular.module('myFirstProjectApp')
    .controller('CodehightlightCtrl', function ($scope, $http, $timeout) {



        $http.get("example.yml").success(function (data) {

            $scope.codeYaml = {
                'highlight': [1, 2, 3, 4, 5, 6, 7, 8],
                'first-line': 1,
                'data': data
            };

            $timeout(function(){
                $scope.codeYaml = {
                    'highlight': [15, 18, 20],
                    'first-line': 10,
                    'data': data
                };
            }, 5000);

        });

    });
