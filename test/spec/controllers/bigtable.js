'use strict';

describe('Controller: BigtableCtrl', function () {

  // load the controller's module
  beforeEach(module('myFirstProjectApp'));

  var BigtableCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BigtableCtrl = $controller('BigtableCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
