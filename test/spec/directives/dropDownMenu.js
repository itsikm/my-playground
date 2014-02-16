'use strict';

describe('Directive: dropDownMenu', function () {
  beforeEach(module('myFirstProjectApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<drop-down-menu></drop-down-menu>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the dropDownMenu directive');
  }));
});
