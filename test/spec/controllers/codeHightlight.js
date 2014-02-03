'use strict';

describe('Controller: CodehightlightCtrl', function () {

  // load the controller's module
  beforeEach(module('myFirstProjectApp'));

  var CodehightlightCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CodehightlightCtrl = $controller('CodehightlightCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
