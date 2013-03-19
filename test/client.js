var client = require('../lib/client');
var events = require('events');
var assert = require('chai').assert;
var sinon  = require('sinon');

suite('client:', function() {
  var instance, renderer, router, socket;

  setup(function() {
    renderer = sinon.spy();
    router = sinon.spy();
    socket = sinon.stub(new events.EventEmitter());
  });

  suite('isClient:', function() {

    test('isClient is a function', function() {
      assert.isFunction(client.isClient);
    });

    test('isClient returns true when invoked with a valid client', function() {
      assert.isTrue(client.isClient(new client.Client(socket, router, renderer)));
    });

    test('isClient returns false when invoked with an invalid client', function() {
      assert.isFalse(client.isClient({}));
    });

  });

  suite('assertClient:', function() {

    test('assertClient is a function', function() {
      assert.isFunction(client.assertClient);
    });

    test('assertClient returns client when invoked with a valid client', function() {
      instance = new client.Client(socket, router, renderer);
      assert.strictEqual(instance, client.assertClient(instance));
    });

    test('assertClient throws when invoked with an invalid client', function() {
      assert.throws(function() {
        client.assertClient({});
      });
    });

  });

  suite('Client:', function() {

    test('Client is a function', function() {
      assert.isFunction(client.Client);
    });

  });

});