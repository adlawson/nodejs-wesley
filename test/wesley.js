var wesley = require('../');
var assert = require('chai').assert;

suite('wesley:', function() {

  suite('createServer:', function() {

    test('createServer is a function', function() {
      assert.isFunction(wesley.createServer);
    });

  });

  suite('listen:', function() {

    test('listen is a function', function() {
      assert.isFunction(wesley.listen);
    });

  });

});
