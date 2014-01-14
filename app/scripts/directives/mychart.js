'use strict';

angular.module('myFirstProjectApp')
  .directive("chartDonut", function () {
    return {
      restrict: 'A',
      scope: {
          data: "=chartDonut"
      },
      link: function postLink(scope, element, attrs) {

          // Settings
          var r = attrs.radius || 100,          // radius
              w = attrs.width  || r * 3,        // width
              h = attrs.height || r * 3,        // height
              p = attrs.ply    || 40,           // ply
              color = d3.scale.category20c();   // range of colors


          // Chart Defines
          var canvas = d3.select(element[0]).append("svg")
              .attr("width", w)
              .attr("height", h);

          var group = canvas.append("g")
              .attr("transform", "translate(" + r + ", " + r + ")");

          var arc = d3.svg.arc()
              .innerRadius(r * p)
              .outerRadius(r);

          var pie = d3.layout.pie()
              .value(function(d){ return d.value; });

          var arcs = group.selectAll("g.slice")
              .data(pie(scope.data))
              .enter()
                .append("g")
                .attr("class", "slice");

          var path = arcs.append("path")
              .attr("d", arc)
              .attr("fill", function(d){ return color(d.value); });

          arcs.append("text")
              .attr("transform", function(d){ return "translate("+ arc.centroid(d) +")"; })
              .text(function(d){ return d.data.label; });

          // Redraw Chart
          scope.$watch("data", function(data){

              // Update the exist path's
              path.data(pie(data))
                  .attr("d", arc);

              // Selector of the slices and merge the data
              var newArcs = group.selectAll("g.slice")
                  .data(pie(data));

              // Filter the new slices and append propeties
              newArcs.enter()
                  .append("g")
                  .attr("class", "slice")
                  .append("path")
                  .attr("d", arc)
                  .attr("fill", function(d){ return color(d.value); });

          }, true);

      }
    };
  });
