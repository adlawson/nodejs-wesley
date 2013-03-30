var server = require('../lib/server');
var events = require('events');
var assert = require('chai').assert;

suite('server:', function() {
  var instance, renderer, router, socket;

  suite('Server:', function() {

    test('Server is a function', function() {
      assert.isFunction(server.Server);
    });

  });

});

