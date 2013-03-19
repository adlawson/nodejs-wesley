var pool = require('../lib/pool');
var events = require('events');
var assert = require('chai').assert;
var sinon  = require('sinon');

suite('pool:', function() {
  var instance;

  suite('isPool:', function() {

    test('isPool is a function', function() {
      assert.isFunction(pool.isPool);
    });

    test('isPool returns true when invoked with a valid pool', function() {
      assert.isTrue(pool.isPool(new pool.Pool('foo')));
    });

    test('isPool returns false when invoked with an invalid pool', function() {
      assert.isFalse(pool.isPool({}));
    });

  });

  suite('assertPool:', function() {

    test('assertPool is a function', function() {
      assert.isFunction(pool.assertPool);
    });

    test('assertPool returns pool when invoked with a valid pool', function() {
      instance = new pool.Pool('foo');
      assert.strictEqual(instance, pool.assertPool(instance));
    });

    test('assertPool throws when invoked with an invalid pool', function() {
      assert.throws(function() {
        pool.assertPool({});
      });
    });

  });

  suite('Pool:', function() {

    test('Pool is a function', function() {
      assert.isFunction(pool.Pool);
    });

  });

});
