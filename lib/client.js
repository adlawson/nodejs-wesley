/**
 * Wesley
 * http://github.com/adlawson/wesley
 * Copyright (c) 2013 Andrew Lawson
 * MIT Licensed
 */
EventEmitter = require('events').EventEmitter;

/**
 * Client
 * @param {WebSocket} socket
 * @param {Function} router
 * @param {Function} renderer
 */
function Client(socket, router, renderer) {
  this._socket = socket;
  if (typeof router === 'function') {
    this.route = router;
  }
  if (typeof renderer === 'function') {
    this.render = renderer;
  }

  bindEvents.call(this);
};

/**
 * Inherit from EventEmitter.prototype
 */
Client.prototype = Object.create(EventEmitter.prototype);

/**
 * Render the message before sending
 * @param {Mixed} data
 * @param {Function} callback
 * @return {Client}
 */
Client.prototype.render = function(data, callback) {
  callback(data);
  return this;
};

/**
 * Route the message from the client
 * @param {Mixed} data
 * @param {Function} callback
 * @return {Client}
 */
Client.prototype.route = function(data, callback) {
  callback('message', data);
  return this;
};

/**
 * Send a message to the client
 * @param {Mixed} arg1
 * @param {Mixed} arg2
 * @param {Mixed} [...]
 * @return {Client}
 */
Client.prototype.send = function() {
  var args = Array.prototype.slice.call(arguments);
  args.unshift('send');
  this.emit.apply(this, args);
  return this;
};

/**
 * Bind client events
 */
function bindEvents() {
  var self = this;

  this._socket.on('message', function(data) {
    self.route(data, function() {
      self.emit.apply(self, arguments);
    });
  });

  this.on('send', function() {
    var args = Array.prototype.slice.call(arguments);
    args.push(function(data) {
      self._socket.send(data);
    });
    self.render.apply(self, args);
  });

  this._socket.on('close', function() {
    self.emit('close');
  });
};

/**
 * Is client
 * @param {Mixed} client
 * @return {Boolean}
 */
function isClient(client) {
  return client instanceof Client;
};

/**
 * Assert client
 * @param {Mixed} client
 * @return {Client}
 */
function assertClient(client) {
  if (!isClient(client)) {
    throw new Error('Invalid client.');
  }
  return client;
};

/**
 * Export
 */
module.exports = {
  Client: Client,
  isClient: isClient,
  assertClient: assertClient
};
