var socket = require('../../lib/transports/socket');
var assert = require('chai').assert;

suite('socket:', function() {

  suite('Socket:', function() {

    test('Socket is a function', function() {
      assert.isFunction(socket.Socket);
    });

  });

});