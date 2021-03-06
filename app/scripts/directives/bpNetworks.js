'use strict';

angular.module('myFirstProjectApp')
    .directive('bpNetworks', function (bpNetworkService) {
        return {
            restrict: 'A',
            link: function postLink($scope, $element, $attrs) {

                var width = "100%",
                    height = "100%";

                var vis = d3.select($element[0]).append("svg:svg")
                    .attr("width", width)
                    .attr("height", height);

                var group = vis.append("g")
                    .attr("transform", "translate(0, 0)");

                var diagonal = d3.svg.diagonal();

                function applyDiagonals(data) {
                    return diagonal.apply(this, [
                        {
                            source: {
                                x: data.source.x,
                                y: data.source.y
                            },
                            target: {
                                x: data.target.x,
                                y: data.target.y
                            }
                        }
                    ]);
                }

                bpNetworkService.setMap([
                    {"from": "6", "to": "2"},
                    {"from": "3", "to": "2"},
                    {"from": "6", "to": "8"},
                    {"from": "3", "to": "7"},
                    {"from": "1", "to": "5"},
                    {"from": "1", "to": "4"}
                ]);
                $scope.coordinates = bpNetworkService.getCoordinates();

                function broadcastResize() {
                    $element.scope().$apply(function () {
                        bpNetworkService.render();
                    });
                }
                document.addEventListener("DOMContentLoaded", broadcastResize, false);
                window.onresize = broadcastResize;

                $scope.$watch("coordinates", function (data) {
                    if (data) {
                        group.selectAll("path")
                            .remove();

                        group.selectAll("path")
                            .data(data)
                            .enter()
                            .append("path")
                            .attr("d", applyDiagonals)
                            .attr("fill", "none")
                            .attr("stroke", function (d) {
                                return d.color;
                            })
                            .attr("stroke-width", "4px");
                    }

                }, true);
            }
        };
    });

angular.module("myFirstProjectApp")
    .directive("bpNetworkCoordinate", function(bpNetworkService, $timeout){
        return {
            restrict: "A",
            scope: {
                "id": "=bpNetworkCoordinate"
            },
            link: function($scope, $element, $attr) {

                switch ($attr.type) {
                    case "subnet":
                        bpNetworkService.addSubnet($scope.id, $element, $attr.color);
                        break;

                    case "network":
                        bpNetworkService.addNetwork();
                        break;

                    case "device":
                        bpNetworkService.addDevice($scope.id, $element);
                        break;
                }

            }
        }
    });

angular.module('myFirstProjectApp')
    .service("bpNetworkService", function($timeout){

        var data = {},
            elements = {},
            coordinates = [],
            map = {};

        $timeout(render, 500);

        this.render = function () {
            render();
        }

        function render() {
            var Coords = [];
            angular.forEach(map, function (relation) {
                var from = elements[relation.from],
                    to = elements[relation.to],
                    height = to.element.outerHeight();

                Coords.push({
                    source: {
                        x: getAttachPoint(from.x, to.x, from.element),
                        y: to.y + (height / 2)
                    },
                    target: {
                        x: getAttachPoint(to.x, from.x, to.element),
                        y: to.y + (height / 2)
                    },
                    color: from.color
                });
            });
            angular.extend(coordinates, Coords);
        }

        function getAttachPoint(startPoint, endPoint, element) {
            var width = element.outerWidth(),
                pointPosition = startPoint - endPoint;

            if (pointPosition < 0) { // Target right
                return startPoint + width;
            }
            else return startPoint; // Target left
        }

        this.addDevice = function (id, element, type) {
            elements[id] = angular.extend(elementCoords(element), {
                "type": "device"
            });
        }

        this.addSubnet = function (id, element, color) {
            elements[id] = angular.extend(elementCoords(element), {
                "color": color || "silver",
                "type": "subnet"
            });
        }

        this.addNetwork = function (id, element) {
            elements[id] = angular.extend(elementCoords(element), {
                "type": "network"
            });
        }

        function elementCoords(element) {
            return {
                "x": element.offset().left - element.parents("#networks").offset().left,
                "y": element.offset().top - element.parents("#networks").offset().top,
                "element": element
            }
        }

        this.setMap = function (data) {
            map = data;
        }

        this.getCoordinates = function () {
            return coordinates;
        }

    });