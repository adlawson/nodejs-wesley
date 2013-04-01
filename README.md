# Wesley #


**Version:** *0.3.3*<br/>
**Master build:** [![Master branch build status][travis-master]][travis]


### Wesley? What the frig? ###
Wesley is a protocol compliant web socket server with some awesome extras.
```bash
$ npm install wesley
```


### Usage ###
```js
var server = require('wesley').listen(3000);

server.on('connection', function(client) {

    // Relay data to all clients on the server
    client.on('data', function(data) {
        server.write(data);
    });

});
```


### Pooling ###
Sometimes it's necessary to maintain logical pools of clients (AKA namespaces, rooms, topics, etc).
```js
var server = require('wesley').listen(3000);

server.on('connection', function(client, pool) {

    // Relay data to the current pool of clients
    client.on('data', function(data) {
        pool.write(data);
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
var server = require('wesley').listen(3000).pool(pooling);

server.on('connection', function(client, pool) {

    // Handle the client
    client.write('You\'ve just joined the ' + pool.name + ' pool.');

});
```


### Inbound messages ###
By default, a Wesley client will emit `data` for every message sent from the client.
You can entirely replace this behaviour at your leisure.
```js
var inbound = function(data, emit) {
    emit('message', data);
};
var server = require('wesley').listen(3000).in(inbound);

server.on('connection', function(client) {

    client.on('message', function(message) {
        // Handle the message
    });

});
```

This also means you could handle more complicated messages than simple strings.
```js
var inbound = function(json, emit) {
    var data = JSON.parse(json);
    emit('data', data);
};
var server = require('wesley').listen(3000).in(inbound);

server.on('connection', function(client) {

    client.on('data', function(data) {
        // Handle the data
    });

});
```

Wesley clients inherit from [EventEmitter2][event-emitter], so even more complex
events can be listened to.
```js
var inbound = function(json, emit) {
    var data = JSON.parse(json);
    emit(['client', data.type], data);
};
var server = require('wesley').listen(3000).in(inbound);

server.on('connection', function(client) {

    client.on(['client', 'message'], function(data) {
        // Handle data with `data.type === message`
    });

    client.on(['client', '*'], function(data) {
        // Handle all client data
    });

});
```


### Outbound messages ###
In much the same way as handling inbound messages, you can also handle outbound messages.
```js
var outbound = function(type, message, emit) {
    var packed = JSON.stringify{type:type, body:message};
    emit(packed);
};
var server = require('wesley').listen(3000).out(outbound);

server.on('connection', function(client) {

    // Send data to the client
    client.write('message', 'Derp.');

});
```


### Transports ###
As Wesley is a web socket server, it uses a socket transport by default.
You can create custom transports by extending `wesley.Transport`.
It is the job of the transport to proxy events listened to by the client
or server. Please see the documentation for more detail (Coming soon).

Once you have a client, using it is simple.
```js
var wesley = require('wesley');
var server = new wesley.Server([
    // An array of transports
    new CustomTransport()
]);

server.on('connection', function(client, pool) {

    // Client wraps the the transport the connection came through
    client.write('Derp.');

});
```


### Command line client ###
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
[event-emitter]: https://github.com/hij1nx/EventEmitter2
