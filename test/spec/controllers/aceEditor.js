'use strict';

describe('Controller: AceeditorCtrl', function () {

  // load the controller's module
  beforeEach(module('myFirstProjectApp'));

  var AceeditorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AceeditorCtrl = $controller('AceeditorCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
