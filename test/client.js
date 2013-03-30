var client = require('../lib/client');
var Transport = require('../lib/transports/transport').Transport;
var assert = require('chai').assert;

suite('client:', function() {
  var instance, transport;

  setup(function() {
    transport = new Transport();
  });

  suite('is:', function() {

    test('`is` is a function', function() {
      assert.isFunction(client.is);
    });

    test('`is` returns true when invoked with a valid client', function() {
      assert.isTrue(client.is(new client.Client(transport)));
    });

    test('`is` returns false when invoked with an invalid client', function() {
      assert.isFalse(client.is({}));
    });

  });

  suite('assert:', function() {

    test('`assert` is a function', function() {
      assert.isFunction(client.assert);
    });

    test('`assert` returns client when invoked with a valid client', function() {
      instance = new client.Client(transport);
      assert.strictEqual(instance, client.assert(instance));
    });

    test('`assert` throws when invoked with an invalid client', function() {
      assert.throws(function() {
        client.assert({});
      });
    });

  });

  suite('Client:', function() {

    test('Client is a function', function() {
      assert.isFunction(client.Client);
    });

  });

});