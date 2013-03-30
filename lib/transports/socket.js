/**
 * Wesley
 * http://github.com/adlawson/wesley
 * Copyright (c) 2013 Andrew Lawson
 * MIT Licensed
 */
module.exports = (function(Super, SocketServer) {

  /**
   * Socket
   * @param {Object} options
   * @api public
   */
  function Socket(options) {
    Super.call(this, options);
  };

  /**
   * Inherit Super.prototype
   */
  Socket.prototype = Object.create(Super.prototype);

  /**
   * Expose name to prototype
   */
  Socket.prototype.name = 'socket';

  /**
   * Listen to network
   * @param {Mixed} spec
   * @return {Socket}
   * @api public
   */
  Socket.prototype.listen = function(spec) {
    Super.prototype.listen.call(this, new SocketServer('number' === typeof spec ? {port:spec} : {server:spec}));

    var self = this;
    this.raw.on('connection', function(socket) {
      self.emit('connect', new SocketClient(socket));
    });

    return this;
  };

  /**
   * Socket client
   * @param {Socket} socket
   * @api private
   */
  function SocketClient(socket) {
    Super.call(this, {raw:socket});

    var self = this;
    this.raw.on('message', function(data) {
      self.emit('data', data);
    });
  };

  /**
   * Inherit Super.prototype
   */
  SocketClient.prototype = Object.create(Super.prototype);

  /**
   * Expose name to prototype
   */
  SocketClient.prototype.name = 'socket-client';

  /**
   * Identitfy the transport
   * @return {String}
   */
  SocketClient.prototype.pool = function() {
    return this.raw.upgradeReq.url;
  };

  /**
   * Write data to transport
   * @param {Mixed} data
   * @return {SocketClient}
   * @api public
   */
  SocketClient.prototype.write = function(data) {
    this.raw.send(data)
    return this;
  };

  /**
   * Exports
   */
  return {
    Socket: Socket
  };

})(require('./transport').Transport, require('ws').Server);
