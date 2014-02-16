'use strict';

angular.module('myFirstProjectApp')
    .controller('DropdownmenuCtrl', function ($scope) {

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
