/**
 * Wesley
 * http://github.com/adlawson/wesley
 * Copyright (c) 2013 Andrew Lawson
 * MIT Licensed
 */
EventEmitter = require('events').EventEmitter;
assertClient = require('./client').assertClient;

/**
 * Pool
 * @param {String} name
 */
function Pool(name) {
  this.clients = [];
  this.name = name;
};

/**
 * Inherit from EventEmitter.prototype
 */
Pool.prototype = Object.create(EventEmitter.prototype);

/**
 * Attach a client
 * @param {Client} client
 * @return {Pool}
 */
Pool.prototype.attach = function(client) {
  var self = this;
  this.clients.push(assertClient(client));
  client.on('close', function() {
    self.detach(client);
  });

  return this;
};

/**
 * Detach a client
 * @param {Client} client
 * @return {Pool}
 */
Pool.prototype.detach = function(client) {
  var i = this.clients.indexOf(assertClient(client));
  if (-1 < i) {
    this.clients.splice(i, 1);
  }

  return this;
};

/**
 * Send a message to the pool
 * @param {Mixed} arg1
 * @param {Mixed} arg2
 * @param {Mixed} [...]
 * @return {Pool}
 */
Pool.prototype.send = function() {
  var args = Array.prototype.slice.call(arguments);
  this.clients.forEach(function(client) {
    client.send.apply(client, args);
  });
  args.unshift('send');
  this.emit.apply(this, args);

  return this;
};

/**
 * Is pool
 * @param {Mixed} pool
 * @return {Boolean}
 */
function isPool(pool) {
  return pool instanceof Pool;
};

/**
 * Assert pool
 * @param {Mixed} pool
 * @return {Pool}
 */
function assertPool(pool) {
  if (!isPool(pool)) {
    throw new Error('Invalid pool.');
  }
  return pool;
};

/**
 * Export
 */
module.exports = {
  Pool: Pool,
  isPool: isPool,
  assertPool: assertPool
};
