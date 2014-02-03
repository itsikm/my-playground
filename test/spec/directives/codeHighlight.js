'use strict';

describe('Directive: codeHighlight', function () {
  beforeEach(module('myFirstProjectApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<code-highlight></code-highlight>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the codeHighlight directive');
  }));
});
