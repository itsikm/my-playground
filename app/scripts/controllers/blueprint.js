'use strict';

angular.module('myFirstProjectApp')
    .controller('BluePrintCtrl', function ($scope, $http, blueprintCoordinateService){

    $http.get("node-format.json").success(function(dataMap){

        $scope.map = dataMap.contained_in;

        // Get Nodes
        $http.get("nodes.json").success(function(data){

            // Index data by ID
            $scope.indexNodes = {};
            data.nodes.forEach(function(node){
                $scope.indexNodes[node.id] = node;
            });

            // Connection between nodes
            $scope.coordinates = blueprintCoordinateService.getCoordinates(dataMap.connected_to);

        });

    });

});


angular.module("myFirstProjectApp")
    .directive("blueprintArrows", function(blueprintCoordinateService){
    return {
        restrict: "A",
        scope: {
           "coordinates": "=blueprintArrows"
        },
        link: function($scope, $element, $attr)
        {
            var canvas = d3.select($element[0]).append("svg")
                .attr("width", "100%")
                .attr("height", "100%")
                .attr("fill", "silver")
                .attr("opacity", "0.2");

            var group = canvas.append("g")
                .attr("transform", "translate(0, 37)");

            var line = d3.svg.line()
                .x(function(d){ return d.x; })
                .y(function(d){ return d.y; });

            $scope.$watch("coordinates", function(data){
                group.selectAll("path")
                    .data(data)
                    .enter()
                    .append("path")
                    .attr("d", line)
                    .attr("fill", "none")
                    .attr("stroke", "black")
                    .attr("stroke-width", 5);
            });
        }
    }
});

/***************
 * Directive to define DOM element coordinate
 * Must be as: Attribute="{id}"
 */
angular.module("myFirstProjectApp")
    .directive("blueprintCoordinate", function(blueprintCoordinateService){
   return {
        restrict: "A",
        scope: {
            "id": "=blueprintCoordinate"
        },
        link: function($scope, $element, $attr) {
            blueprintCoordinateService.addCoordinate(
                $scope.id,
                $element.offset().left,
                $element.offset().top,
                $element
            );
        }
   }
});

/***************
 * Service to store and calculate the coordinate data
 */
angular.module("myFirstProjectApp")
    .service("blueprintCoordinateService", function(){

        var data = {};

        this.getData = function()
        {
            return data;
        }

        /***************
         * Conveting Map relations to D3
         * @param map
         * @returns {Array} of Coordinates for D3
         */
        this.getCoordinates = function( map )
        {
            var Coords = [];
            angular.forEach(map, function(to, from){
                Coords.push([data[from], data[to]]);
            });
            return Coords;
        }

        /***************
         * Add Coordinate of DOM element
         * @param id: id of DOM element
         * @param x: offset from left
         * @param y: offset from top
         * @param e: reference to the DOM element
         */
        this.addCoordinate = function(id, x, y, e)
        {
            data[id] = this.getCenter({
                "x": x,
                "y": y,
                "e": e
            });
        }

        /***************
         * Calculate the center Coordinate of DOM element
         * @param data
         * @returns JSON Array of coordinates
         */
        this.getCenter = function( data )
        {
            data.x = data.x + data.e.width() / 2;
            data.y = data.y + data.e.height() / 2;
            return data;
        }

});