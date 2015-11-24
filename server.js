var Client = require('node-xmpp-client');
var ltx = require('ltx');
var https = require('https');
var config = require("./config.js").settings;

console.log("Initializing XMPP...");
var client = new Client(config.xmpp);
console.log("Initializing Slack Webhook...");
var httpsOptions = config.slackWebhook;

if (config.keepAlive) {
    console.log("Setting keep-alives...");
    client.connection.socket.setTimeout(0);
    client.connection.socket.setKeepAlive(true, 10000);	

    setInterval(function() {
        client.send("     ");
    }, 5000);
}

client.on('online', function() {
    console.log('Connected to XMPP');
    client.send(new ltx.Element('presence', { })
            .c('show').t('chat').up()
            .c('status').t(config.statusMessage)
    );
});

client.on('error', function(message) {
    console.log("error: " + message);
    process.exit(1);
});

client.on('stanza', function(stanza) {
    if (stanza.is('message') &&
        (stanza.attrs.type !== 'error')) {
        var xmppPayload = ltx.parse(stanza.root().toString());
        var message = "", payload;
        if (xmppPayload.getChild("body") != null) {
            message = xmppPayload.getChild("body").getText();
        }

        if (message != "") {
            var req = https.request(httpsOptions, function (res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    console.log('Response: ' + chunk);
                });
            });

	    for (var i = 0; i < config.slackPayloads.length; i++) {
    		console.log("Checking message against filter: " + config.slackPayloads[i].filter);
    		if (message.indexOf(config.slackPayloads[i].filter) > -1) {
                	payload = config.slackPayloads[i];
    			    break;
    		}
        }

        if (payload) {
    	    payload.text = message.replace(config.filter, '');
                console.log('Sending message to channel ' + payload.channel + ': ' + payload.text);
                req.write(JSON.stringify(payload));
                req.end();
            }
        }
    }
});
