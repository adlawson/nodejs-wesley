/**
 * Wesley
 * http://github.com/adlawson/wesley
 * Copyright (c) 2013 Andrew Lawson
 * MIT Licensed
 */
module.exports = (function(Super, Pool, Client, assertTransport) {

  /**
   * Server
   * @param {Array} transports
   * @api public
   */
  function Server(transports) {
    Super.call(this);
    this._transports = transports;
    this.pools = {};
    this._pool = function(transport) {
      return transport.identify();
    };

    var self = this;
    this._transports.forEach(function(transport) {
      assertTransport(transport).on('connection', function(stream) {
        var client = new Client(stream, self._in, self._out);
        var pool = self._pool(stream);

        if (null == self.pools[pool]) {
          self.pools[pool] = new Pool(pool);
        }

        self.pools[pool].attach(client);
        self.emit('connection', client, self.pools[pool]);
      });
    });
  };

  /**
   * Inherit Super.prototype
   */
  Server.prototype = Object.create(Super.prototype);

  /**
   * Listen to network
   * @param {Mixed} spec
   * @return {Server}
   */
  Server.prototype.listen = function(spec) {
    this._transports.forEach(function(transport) {
        transport.listen(spec);
    });
    return this;
  };

  /**
   * Set the inbound message handler
   * @param {Function} callback
   * @return {Server}
   */
  Server.prototype.in = function(callback) {
    this._in = callback;
    return this;
  };

  /**
   * Set the outbound message handler
   * @param {Function} callback
   * @return {Server}
   */
  Server.prototype.out = function(callback) {
    this._out = callback;
    return this;
  };

  /**
   * Set the client pooling handler
   * @param {Function} callback
   * @return {Server}
   */
  Server.prototype.pool = function(callback) {
    this._pool = callback;
    return this;
  };

  /**
   * Write to clients
   * @return {Server}
   * @api public
   */
  Server.prototype.write = function(data) {
    for(var i in this.pools) {
      this.pools[i].write(data);
    }
    return this;
  };

  /**
   * Exports
   */
  return {
    Server: Server
  };

})(require('events').EventEmitter,
  require('./pool').Pool,
  require('./client').Client,
  require('./transports/transport').assert);
