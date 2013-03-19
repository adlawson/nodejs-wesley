/**
 * Wesley
 * http://github.com/adlawson/wesley
 * Copyright (c) 2013 Andrew Lawson
 * MIT Licensed
 */
EventEmitter = require('events').EventEmitter;
Client = require('./client').Client;
Pool = require('./pool').Pool;

/**
 * Server
 * @param {WebSocketServer} server
 * @param {Function} router
 * @param {Function} renderer
 */
function Server(server, router, renderer) {
  var self = this;
  this._server = server;
  this._router = router;
  this._renderer = renderer;
  this.pools = {};

  bindEvents.call(this);
};

/**
 * Inherit from EventEmitter.prototype
 */
Server.prototype = Object.create(EventEmitter.prototype);

/**
 * Close the server
 */
Server.prototype.close = function() {
  this._server.close();
}

/**
 * Set the client renderer
 * @param {Function} callback
 * @return {Server}
 */
Server.prototype.renderer = function(callback) {
  this._renderer = callback;
  return this;
};

/**
 * Set the client router
 * @param {Function} callback
 * @return {Server}
 */
Server.prototype.router = function(callback) {
  this._router = callback;
  return this;
};

/**
 * Send a message to server
 * @param {Mixed} arg1
 * @param {Mixed} arg2
 * @param {Mixed} [...]
 * @return {Server}
 */
Server.prototype.send = function() {
  var args = Array.prototype.slice.call(arguments);
  for (var i in this.pools) {
    this.pools[i].send.apply(this.pools[i], args);
  }
  args.unshift('send');
  this.emit.apply(this, args);

  return this;
};

/**
 * Bind server events
 */
function bindEvents() {
  var self = this;

  this._server.on('connection', function(socket) {
    var path = socket.upgradeReq.url;
    if (null != self.pools[path]) {
      var pool = self.pools[path];
    } else {
      var pool = new Pool(path);
      self.pools[path] = pool;
    }

    var client = new Client(socket, self._router, self._renderer);
    pool.attach(client);
    self.emit('connection', client, pool);
  });
};

/**
 * Is server
 * @param {Mixed} server
 * @return {Boolean}
 */
function isServer(server) {
  return server instanceof Server;
};

/**
 * Assert server
 * @param {Mixed} server
 * @return {Server}
 */
function assertServer(server) {
  if (!isServer(server)) {
    throw new Error('Invalid server.');
  }
  return server;
};

/**
 * Export
 */
module.exports = {
  Server: Server,
  isServer: isServer,
  assertServer: assertServer
};
