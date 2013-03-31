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
   * @param {Function} inbound
   * @param {Function} outbound
   * @api public
   */
  function Client(transport, inbound, outbound) {
    Super.call(this);
    this.transport = assertTransport(transport);
    this.in = inbound || function(data, callback) {
      callback('data', data);
    };
    this.out = outbound || function(data, callback) {
      callback(data);
    };

    var self = this;
    transport.on('data', function() {
      var args = Array.prototype.slice.call(arguments);
      args.push(function(event, data) {
        self.emit(event, data);
      });
      self.in.apply(self, args);
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
  Client.prototype.write = function() {
    var self = this;
    var args = Array.prototype.slice.call(arguments);
    args.push(function(data) {
      self.transport.write(data);
      self.emit('write', data);
    });
    this.out.apply(null, args)
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
