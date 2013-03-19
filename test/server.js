var server = require('../lib/server');
var events = require('events');
var assert = require('chai').assert;
var sinon  = require('sinon');

suite('server:', function() {
  var instance, renderer, router, socket;

  setup(function() {
    renderer = sinon.spy();
    router = sinon.spy();
    socket = sinon.stub(new events.EventEmitter());
  });

  suite('isServer:', function() {

    test('isServer is a function', function() {
      assert.isFunction(server.isServer);
    });

    test('isServer returns true when invoked with a valid server', function() {
      assert.isTrue(server.isServer(new server.Server(socket, router, renderer)));
    });

    test('isServer returns false when invoked with an invalid server', function() {
      assert.isFalse(server.isServer({}));
    });

  });

  suite('assertServer:', function() {

    test('assertServer is a function', function() {
      assert.isFunction(server.assertServer);
    });

    test('assertServer returns server when invoked with a valid server', function() {
      instance = new server.Server(socket, router, renderer);
      assert.strictEqual(instance, server.assertServer(instance));
    });

    test('assertServer throws when invoked with an invalid server', function() {
      assert.throws(function() {
        server.assertServer({});
      });
    });

  });

  suite('Server:', function() {

    test('Server is a function', function() {
      assert.isFunction(server.Server);
    });

  });

});

