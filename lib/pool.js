/**
 * Wesley
 * http://github.com/adlawson/wesley
 * Copyright (c) 2013 Andrew Lawson
 * MIT Licensed
 */
module.exports = (function(Super, assertClient) {

  /**
   * Pool
   * @param {Object} options
   * @api public
   */
  function Pool(name) {
    this.name = name;
    this.clients = [];
    Super.call(this);
  };

  /**
   * Inherit Super.prototype
   */
  Pool.prototype = Object.create(Super.prototype);

  /**
   * Attach a client
   * @param {Client} client
   * @return {Pool}
   * @api public
   */
  Pool.prototype.attach = function(client) {
    if (-1 === this.clients.indexOf(assertClient(client))) {
      this.clients.push(assertClient(client));
      this.emit('attach', client);
      client.emit('attach', this);
      client.pool = this;
    }
    return this;
  };

  /**
   * Detach a client
   * @param {Client} client
   * @return {Pool}
   * @api public
   */
  Pool.prototype.detach = function(client) {
    var index = this.clients.indexOf(assertClient(client));
    if (-1 < index) {
      this.clients.splice(index, 1);
      this.emit('detach', client);
      client.emit('detach', this);
      client.pool = null;
    }
    return this;
  };

  /**
   * Write to clients
   * @return {Pool}
   * @api public
   */
  Pool.prototype.write = function(data) {
    this.clients.forEach(function(client) {
        client.write(data);
    });
    return this;
  };

  /**
   * Exports
   */
  return {
    Pool: Pool
  };

})(require('events').EventEmitter, require('./client').assert);
