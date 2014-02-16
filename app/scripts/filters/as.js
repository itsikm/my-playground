'use strict';

angular.module('myFirstProjectApp')
    .filter('as', function ($parse) {
        return function (value, path) {
            return $parse(path).assign(this, value);
        };
    });
