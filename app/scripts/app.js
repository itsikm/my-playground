'use strict';

angular.module('myFirstProjectApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.ace',
  'ngAnimate',
  'nvd3ChartDirectives'
])
  .config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .when('/demo', {
            templateUrl: 'views/demopage.html',
            controller:'DemoCtrl'
        })
        .when('/blueprint', {
            templateUrl: 'views/blueprint.html',
            controller:'BluePrintCtrl'
        })
        .when('/install', {
            templateUrl: 'views/install.html',
            controller:'InstallprogressCtrl'
        })
        .when('/networks', {
            templateUrl: 'views/networks.html',
            controller:'NetworksCtrl'
        })
        .when('/codehighlight', {
            templateUrl: 'views/codeHighlight.html',
            controller:'CodehightlightCtrl'
        })
        .when('/aceeditor', {
            templateUrl: 'views/aceEditor.html',
            controller:'AceeditorCtrl'
        })
        .when('/dropdownmenu', {
            templateUrl: 'views/dropDownMenu.html',
            controller:'DropdownmenuCtrl'
        })
        .when('/charts', {
            templateUrl: 'views/charts.html',
            controller:'ChartsCtrl'
        })
        .when('/bigtable', {
            templateUrl: 'views/bigtable.html',
            controller:'BigtableCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
  });
