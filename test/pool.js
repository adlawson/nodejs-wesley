var pool = require('../lib/pool');
var events = require('events');
var assert = require('chai').assert;
var sinon  = require('sinon');

suite('pool:', function() {
  var instance;

  suite('Pool:', function() {

    test('Pool is a function', function() {
      assert.isFunction(pool.Pool);
    });

  });

});
