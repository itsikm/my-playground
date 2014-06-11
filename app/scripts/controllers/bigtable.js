'use strict';

angular.module('myFirstProjectApp')
    .controller('BigtableCtrl', function ($scope, $http) {

        $scope.tableData = [];
        $scope.welcom = 'welcome!';

        $http({method: 'GET', url: 'mocks/bigtable_data.json'})
            .success(function(data){
                console.log(['data', data]);
                $scope.tableData = data.hits.hits;
            });

        $scope.options = [
            {'value': '1', 'label': 'Itsik Option'},
            {'value': '2', 'label': 'Cosmo-UI'},
            {'value': '3', 'label': 'This is Cool!'},
            {'value': '4', 'label': 'Cloudify 3.0'}
        ];

        $scope.cars = [
            {'value': '1', 'label': 'Ferrari'},
            {'value': '2', 'label': 'Porsche'},
            {'value': '3', 'label': 'Maserati'},
            {'value': '4', 'label': 'Lamborghini'}
        ];

    });
