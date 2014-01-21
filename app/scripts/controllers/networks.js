'use strict';

angular.module('myFirstProjectApp')
    .controller('NetworksCtrl', function ($scope, $http, d3Networks) {
        $http.get("networks.json").success(function (callback) {
            var data = callback.blueprint.topology;
            for (var i = 0; i < data.length; i++) {
                var node = data[i];
                switch (node.type) {
                    case "neutron_network":
                        d3Networks.addNetwork(node);
                        break;

                    case "neutron_subnet":
                        d3Networks.addSubnet(node);
                        break;

                    case "neutron_router":
                        d3Networks.addRouter(node);
                        break;
                }
            }
            $scope.topology = d3Networks.getTopology();

            console.log($scope.topology);
        });
    });
