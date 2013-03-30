/**
 * Wesley
 * http://github.com/adlawson/wesley
 * Copyright (c) 2013 Andrew Lawson
 * MIT Licensed
 */
module.exports = (function(Super) {

  /**
   * Transport
   * @param {Object} options
   * @api public
   */
  function Transport(options) {
    options = options || {};
    this.name = options.name || this.name;
    this.raw = options.raw || null;
    Super.call(this);
  };

  /**
   * Inherit Super.prototype
   */
  Transport.prototype = Object.create(Super.prototype);

  /**
   * Identitfy the transport connection
   * @return {String}
   */
  Transport.prototype.identify = function() {
    return this.name;
  };

  /**
   * Listen to network
   * @param {Mixed} spec
   * @return {Transport}
   * @api public
   */
  Transport.prototype.listen = function(spec) {
    if (null != this.raw) {
      throw new Error('Transport already listening.');
    }
    this.raw = spec;
    return this;
  };

  /**
   * Write data to transport
   * @param {Mixed} data
   * @return {Transport}
   * @api public
   */
  Transport.prototype.write = function() {
    return this;
  };

  /**
   * @param {Mixed} transport
   * @return {Boolean}
   * @api public
   */
  function isTransport(transport) {
    return transport instanceof Transport;
  };

  /**
   * @param {Mixed} transport
   * @return {Transport}
   * @api public
   */
  function assertTransport(transport) {
    if (!isTransport(transport)) {
      throw new Error('Invalid transport.');
    }
    return transport;
  };

  /**
   * Exports
   */
  return {
    Transport: Transport,
    is: isTransport,
    assert: assertTransport
  };

})(require('events').EventEmitter);
