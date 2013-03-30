/*
 * Wesley
 * http://github.com/adlawson/wesley
 * Copyright (c) 2013 Andrew Lawson
 * MIT Licensed
 */
module.exports = (function(Server, Socket) {

  /**
   * Default wesley server
   * @type {Server}
   */
  var wesley = new Server([
    new Socket()
  ]);

  /**
   * Expose prototypes
   */
  wesley.Server = Server;
  wesley.Client = require('./client').Client;
  wesley.Transport = require('./transports/transport').Transport;

  /**
   * Expose transports
   */
  wesley.transports = {
    Socket: Socket
  };

  /**
   * Exports
   */
  return wesley;

})(require('./server').Server, require('./transports/socket').Socket);
