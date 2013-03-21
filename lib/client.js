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
 * @param {Function} inbound
 * @param {Function} oubbound
 */
function Client(socket, inbound, oubbound) {
  this._socket = socket;
  if (typeof inbound === 'function') {
    this.in = inbound;
  }
  if (typeof oubbound === 'function') {
    this.out = oubbound;
  }

  bindEvents.call(this);
};

/**
 * Inherit from EventEmitter.prototype
 */
Client.prototype = Object.create(EventEmitter.prototype);

/**
 * Handle messages sent to the server
 * @param {Mixed} data
 * @param {Function} callback
 * @return {Client}
 */
Client.prototype.in = function(data, callback) {
  callback('message', data);
  return this;
};

/**
 * Handle messages sent from the server
 * @param {Mixed} data
 * @param {Function} callback
 * @return {Client}
 */
Client.prototype.out = function(data, callback) {
  callback(data);
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
    self.in(data, function() {
      self.emit.apply(self, arguments);
    });
  });

  this.on('send', function() {
    var args = Array.prototype.slice.call(arguments);
    args.push(function(data) {
      self._socket.send(data);
    });
    self.out.apply(self, args);
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
