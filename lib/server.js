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

    var self = this;
    this._transports.forEach(function(transport) {
      assertTransport(transport).on('connect', function(stream) {
        var client = new Client(stream);
        var name = stream.pool();

        if (null == self.pools[name]) {
          self.pools[name] = new Pool(name);
        }

        self.pools[name].attach(client);
        self.emit('connect', client, self.pools[name]);
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
