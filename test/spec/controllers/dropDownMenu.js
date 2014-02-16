'use strict';

describe('Controller: DropdownmenuCtrl', function () {

  // load the controller's module
  beforeEach(module('myFirstProjectApp'));

  var DropdownmenuCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DropdownmenuCtrl = $controller('DropdownmenuCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
