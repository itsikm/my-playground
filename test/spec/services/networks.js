'use strict';

describe('Service: networks', function () {

  // load the service's module
  beforeEach(module('myFirstProjectApp'));

  // instantiate service
  var networks;
  beforeEach(inject(function (_networks_) {
    networks = _networks_;
  }));

  it('should do something', function () {
    expect(!!networks).toBe(true);
  });

});
