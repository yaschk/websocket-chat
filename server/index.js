var server = require('ws').Server;
var s = new server({ port:5001});


s.on('connection', function (ws) {
    ws.on('message', function(message) {


        message = JSON.parse(message);

        if(message.type == "name") {
            ws.personName = message.data;

            return;
        }

        console.log("Received: " +message);

        s.clients.forEach(function e(client) {
            if(client != ws)
                client.send(JSON.stringify({
                    name: ws.personName,
                    data: message.data
                }));

        });


    });

    ws.on('close', function () {
        console.log("I lost a client");
    });

});