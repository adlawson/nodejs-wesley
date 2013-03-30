/**
 * Wesley
 * http://github.com/adlawson/wesley
 * Copyright (c) 2013 Andrew Lawson
 * MIT Licensed
 */
module.exports = (function(Super, assertTransport) {

  /**
   * Client
   * @param {Transport} transport
   * @api public
   */
  function Client(transport) {
    Super.call(this);
    this.transport = assertTransport(transport);

    var self = this;
    transport.on('data', function(data) {
      self.emit('data', data);
    });
  };

  /**
   * Inherit Super.prototype
   */
  Client.prototype = Object.create(Super.prototype);

  /**
   * Write to clients
   * @return {Client}
   * @api public
   */
  Client.prototype.write = function(data) {
    this.transport.write(data);
    return this;
  };

  /**
   * @param {Mixed} client
   * @return {Boolean}
   * @api public
   */
  function isClient(client) {
    return client instanceof Client;
  };

  /**
   * @param {Mixed} client
   * @return {Client}
   * @api public
   */
  function assertClient(client) {
    if (!isClient(client)) {
      throw new Error('Invalid client.');
    }
    return client;
  };

  /**
   * Exports
   */
  return {
    Client: Client,
    is: isClient,
    assert: assertClient
  };

})(require('events').EventEmitter, require('./transports/transport').assert);
