# Wesley #


**Version:** *0.1.0*<br/>
**Master build:** [![Master branch build status][travis-master]][travis]


### Wesley? What the frig? ###
Wesley is a protocol compliant web socket server with some awesome extras.
```bash
$ npm install wesley
```


### Usage ###
```js
var server = require('wesley').listen(1234);

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
var server = require('wesley').listen(1234);

server.on('connection', function (client, pool) {

    // Relay a message to the current pool of clients
    client.on('message', function (message) {
        pool.send(message);
    });

});
```

Pooling is done when the client connects to a route on the host.
```
ws://localhost:1234/            # Server and / events
ws://localhost:1234/pool        # Server and /pool events
ws://localhost:1234/pool/child  # Server and /pool/child events
```

You can also handle events differently depending on the pool.
```js
var server = require('wesley').listen(1234);

server.on('connection', function (client, pool) {

    if ('/' !== pool.path) {
        return client.send('Pooling is not enabled on this server.');
    }

    // handle the client

});
```


### Routing ###
Routing is a way to take a message sent from the client and emit your desired event.
This way you can replace the default emitting of `message` with your own.
```js
var router = function(message, callback) {
    callback('echo', message);
};
var server = require('wesley').listen(1234).router(router);

server.on('connection', function (client) {

    client.on('echo', function(message) {
        // handle the message
    });

});
```

Using routing, you can also handle more complicated messages than simple strings.
```js
var router = function(json, callback) {
    var data = JSON.parse(json);
    callback(data.type, data);
};
var server = require('wesley')
    .listen(1234)
    .router(router);

server.on('connection', function (client) {

    client.on('message', function(data) {
        // handle the data
    });

});
```


### Rendering ###
You can only send string data to clients, so by using rendering you can format
your data just before it's sent.
```js
var renderer = function(type, message, callback) {
    var packed = JSON.stringify{type:type, body:message};
    callback(packed);
};
var server = require('wesley')
    .listen(1234)
    .renderer(renderer);

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
[travis]: https://travis-ci.org/newtonjs/frame
[travis-master]: https://travis-ci.org/newtonjs/frame.png?branch=master
[vagrant]: http://vagrantup.com
