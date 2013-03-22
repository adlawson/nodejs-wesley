# Wesley #


**Version:** *0.2.1*<br/>
**Master build:** [![Master branch build status][travis-master]][travis]


### Wesley? What the frig? ###
Wesley is a protocol compliant web socket server with some awesome extras.
```bash
$ npm install wesley
```


### Usage ###
```js
var server = require('wesley').listen(3000);

server.on('connection', function (client) {

    // Relay a message to all clients on the server
    client.on('message', function (message) {
        server.send(message);
    });

});
```


### Pooling ###
Sometimes it's necessary to maintain logical pools of clients (AKA namespaces, rooms, topics, etc).
```js
var server = require('wesley').listen(3000);

server.on('connection', function (client, pool) {

    // Relay a message to the current pool of clients
    client.on('message', function (message) {
        pool.send(message);
    });

});
```

The default pooling strategy separates clients based on the path they connect to.
```bash
ws://localhost:3000/            # Server and / events
ws://localhost:3000/pool        # Server and /pool events
ws://localhost:3000/pool/child  # Server and /pool/child events
```

This behavoiur can be overridden by passing in your own handler.
The callback expects to be called with the name of the pool to join.
```js
var pooling = function(client, callback) {
    callback('pool-name');
};
var server = require('wesley')
    .listen(3000)
    .with(pooling);

server.on('connection', function (client, pool) {

    // handle the client
    client.send('You\'ve just joined the ' + pool.name + ' pool.');

});
```


### Inbound messages ###
By default, a Wesley client will emit `message` for every message sent from the client.
You can entirely replace this behaviour at your leisure.
```js
var inbound = function(message, callback) {
    callback('echo', message);
};
var server = require('wesley')
    .listen(3000)
    .in(inbound);

server.on('connection', function (client) {

    client.on('echo', function(message) {
        // handle the message
    });

});
```

This also means you could handle more complicated messages than simple strings.
```js
var inbound = function(json, callback) {
    var data = JSON.parse(json);
    callback('message', data);
};
var server = require('wesley')
    .listen(3000)
    .in(inbound);

server.on('connection', function (client) {

    client.on('message', function(data) {
        // handle the data
    });

});
```


### Outbound messages ###
In much the same way as handling inbound messages, you can also handle outbound messages.
```js
var outbound = function(type, message, callback) {
    var packed = JSON.stringify{type:type, body:message};
    callback(packed);
};
var server = require('wesley')
    .listen(3000)
    .out(outbound);

server.on('connection', function (client) {

    client.send('message', 'Derp.');

});
```


### Command line interface ###
I can tell you're super excited to start working on your web socket server.
One thing you may find useful is a client to start interacting with.
This command line client will hopefully give you what you need to get started.
```bash
$ wesley --help

  Usage: wesley [options]

  Options:

    -h, --help                output usage information
    -V, --version             output the version number
    -u, --uri <string>        host address
    -p, --protocol <integer>  web socket protocol

  Default:

    wesley --uri ws://localhost:3000 --protocol 13
```


### Contributing ###
I accept contributions to the source via Pull Request,
but passing unit tests must be included before it will be considered for merge.
```bash
$ make install
$ make tests
```

If you have [Vagrant][vagrant] installed, you can build our dev environment to assist development.
The repository will be mounted in `/srv`.
```bash
$ vagrant up
$ vagrant ssh
$ cd /srv
```


### License ###
The content of this library is released under the **MIT License** by **Andrew Lawson**.<br/>
You can find a copy of this license at http://www.opensource.org/licenses/mit


<!-- Links -->
[travis]: https://travis-ci.org/adlawson/wesley
[travis-master]: https://travis-ci.org/adlawson/wesley.png?branch=master
[vagrant]: http://vagrantup.com
