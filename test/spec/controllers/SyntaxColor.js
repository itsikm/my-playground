'use strict';

describe('Controller: SyntaxcolorCtrl', function () {

  // load the controller's module
  beforeEach(module('myFirstProjectApp'));

  var SyntaxcolorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SyntaxcolorCtrl = $controller('SyntaxcolorCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
