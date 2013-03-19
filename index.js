/*
 * Wesley
 * http://github.com/adlawson/wesley
 * Copyright (c) 2013 Andrew Lawson
 * MIT Licensed
 */
var Server = require('./lib/server').Server;
var ws = require('ws');

/**
 * Wesley namespace
 * @type {Object}
 */
var wesley = {};

/**
 * Create a server
 * @param {Object} options
 * @param {Function} router
 * @param {Function} render
 * @return {Server}
 */
wesley.createServer = function(options, router, render) {
    var server = new ws.Server(options);
    return new Server(server, router, render);
};

/**
 * Listen to a server configuration
 * @param {mixed} handler Port number or net.Server
 * @return {Server}
 */
wesley.listen = function(handler) {
  if (typeof handler === 'number') {
    var options = {port:handler};
  } else {
    var options = {server:handler};
  }

  return wesley.createServer(options);
};

module.exports = wesley;