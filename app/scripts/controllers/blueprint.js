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

            // Set Map
            blueprintCoordinateService.setMap(dataMap.connected_to)

            // Connection between nodes
            $scope.coordinates = blueprintCoordinateService.getCoordinates();

        });

    });

});

/*********************
 * SVG layer to implement the relations between the nodes
 */
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
                .attr("fill", "silver");

            var group = canvas.append("g")
                .attr("transform", "translate(0, 0)");

            var diagonal = d3.svg.diagonal();

            function applyDiagonals(data) {
                return diagonal.apply(this, [{
                    source : {
                        x: data[0].x,
                        y: data[0].y
                    },
                    target : {
                        x: data[1].x,
                        y: data[1].y
                    }
                }]);
            }

            canvas.append("svg:defs").selectAll("marker")
                .data([""])
                .enter()
                    .append("svg:marker")
                    .attr("id", "arrowhead")
                    .attr("viewBox", "0 -5 10 10")
                    .attr("refX", 9)
                    .attr("refY", 0)
                    .attr("markerWidth", 6)
                    .attr("markerHeight", 6)
                    .attr("orient", "auto")
                    .attr("fill", "orange")
                    .append("svg:path")
                    .attr("d", "M0,-5L10,0L0,5");

            var arrows = group.selectAll("g.arrow")
                .data([])
                .enter()
                    .append("g")
                    .attr("class", "arrow");

            var path = arrows.append("path")
                .attr("d", applyDiagonals);

            $scope.$watch("coordinates", function(data){
                if(data) {
                    console.log(data);

                    path.data(data)
                        .attr("d", applyDiagonals);

                    var updateArrows = group.selectAll("g.arrow")
                        .data(data);

                    updateArrows.enter()
                        .append("path")
                        .attr("marker-end", "url(#arrowhead)")
                        .attr("d", applyDiagonals)
                        .attr("fill", "none")
                        .attr("stroke", "orange")
                        .attr("stroke-width", "3px")
                        .attr("shape-rendering", "auto");

                    updateArrows.exit()
                        .remove();
                }
            }, true);
        }
    }
});

/***************
 * Directive to define DOM element coordinate
 * Must be as: Attribute="{id}"
 */
angular.module("myFirstProjectApp")
    .directive("blueprintCoordinate", function(blueprintCoordinateService, $timeout){
   return {
        restrict: "A",
        scope: {
            "id": "=blueprintCoordinate"
        },
        link: function($scope, $element, $attr) {
            blueprintCoordinateService.addElement($scope.id, $element);
        }
   }
});

/*****************
 * This directive listen to the blueprint container for any resize
 * and broadcast it into angular, which update the "data" of the
 * coordinates
 */
angular.module("myFirstProjectApp")
    .directive("blueprintResize", function(blueprintCoordinateService){
   return {
       restrict: "A",
       scope: false,
       link: function($scope, $element, $attr) {
           function broadcastResize() {
               $element.scope().$apply(function(){
                   blueprintCoordinateService.refresh();
               });
           }
           document.addEventListener("DOMContentLoaded", broadcastResize, false);
           window.onresize = broadcastResize;
       }
   }
});

/***************
 * Service to store and calculate the coordinate data
 */
angular.module("myFirstProjectApp")
    .service("blueprintCoordinateService", function($rootScope, $timeout){

        var data = {},
            elements = {},
            coordinates = [],
            map = {};

        /*************
         * Init
         */
        $timeout(updateData, 500);

        /*************
         * Api method to fire the update method
         */
        this.refresh = function()
        {
            updateData();
        }

        /**************
         * Api method to connect the coordinates
         * @returns {Array}
         */
        this.getCoordinates = function()
        {
            return coordinates;
        }

        /**************
         * Using the element which inject into the server
         * and calculating the x,y coordinates of the element
         */
        function updateData() {
            angular.forEach(elements, function (element, id){
                data[id] = {
                    "x": element.offset().left,
                    "y": element.offset().top
                }
            });
            setCoordinates();
        };

        /***************
         * Conveting Map relations to D3
         * @param map
         * @returns {Array} of Coordinates for D3
         */
        function setCoordinates()
        {
            var Coords = [];
            angular.forEach(map, function(to, from){
                if(data[from] != undefined && data[to] != undefined) {

                    setAttachPoint(from, to);

                    Coords.push([data[from], data[to]]);
                }
            });
            angular.extend(coordinates, Coords);
        }

        function setAttachPoint(from, to)
        {
//            console.log(data[from].x + " -> " + data[to].x);
//            console.log(data[from].y + " -> " + data[to].y);
//            console.log(elements[from].width());

            console.log(data[from]);

            if(data[from].y == data[to].y) {
                data[from].x = data[from].x + elements[from].outerWidth();
                data[from].y = data[from].y + (elements[from].outerHeight() / 2);
                data[to].y = data[to].y + (elements[to].outerHeight() / 2);
            }

            else if((data[from].x + data[from].y) < (data[to].x + data[to].y)) {
                data[from].x = data[from].x + (elements[from].outerWidth() / 2);
                data[from].y = data[from].y + elements[from].outerHeight();
                data[to].x = data[to].x + (elements[to].outerWidth() / 2)
            }

            console.log(data[from]);
        }

        /**************
         * Set the map of relations between the nodes
         * @param data
         */
        this.setMap = function( data )
        {
            map = data;
        }

        /***************
         * Add node element
         * @param id
         * @param element
         */
        this.addElement = function(id, element)
        {
            elements[id] = element;
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