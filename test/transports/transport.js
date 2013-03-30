var transport = require('../../lib/transports/transport');
var assert = require('chai').assert;

suite('transport:', function() {
  var instance;

  suite('is:', function() {

    test('`is` is a function', function() {
      assert.isFunction(transport.is);
    });

    test('`is` returns true when invoked with a valid transport', function() {
      assert.isTrue(transport.is(new transport.Transport()));
    });

    test('`is` returns false when invoked with an invalid transport', function() {
      assert.isFalse(transport.is({}));
    });

  });

  suite('assert:', function() {

    test('`assert` is a function', function() {
      assert.isFunction(transport.assert);
    });

    test('`assert` returns transport when invoked with a valid transport', function() {
      instance = new transport.Transport();
      assert.strictEqual(instance, transport.assert(instance));
    });

    test('`assert` throws when invoked with an invalid transport', function() {
      assert.throws(function() {
        transport.assert({});
      });
    });

  });

  suite('Transport:', function() {

    test('Transport is a function', function() {
      assert.isFunction(transport.Transport);
    });

  });

});