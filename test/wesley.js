var wesley = require('../lib/wesley');
var server = require('../lib/server');
var assert = require('chai').assert;

suite('wesley:', function() {

  test('wesley is an instance of server.Server', function() {
    assert.isTrue(wesley instanceof server.Server);
  });

  test('wesley.Server is server.Server', function() {
    assert.strictEqual(server.Server, wesley.Server);
  });

  test('wesley.Client is client.Client', function() {
    assert.strictEqual(require('../lib/client').Client, wesley.Client);
  });

  test('wesley.Pool is pool.Pool', function() {
    assert.strictEqual(require('../lib/pool').Pool, wesley.Pool);
  });

  test('wesley.Transport is transport.Transport', function() {
    assert.strictEqual(require('../lib/transports/transport').Transport, wesley.Transport);
  });

  test('wesley.transport.Socket is Socket', function() {
    assert.strictEqual(require('../lib/transports/socket').Socket, wesley.transports.Socket);
  });

});
