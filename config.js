exports.settings = {
    "statusMessage": "greetings",
    "keepAlive": true,
    "filter": /You can apply a command[\s\S]+for more details./mg,
    "xmpp": {
        jid: 'cinchbot@jabb3r.org',
        host: 'jabber.hot-chilli.net',
        password: process.env.bot_password,
	reconnect: true
    },
    "slackWebhook" : {
        host: 'hooks.slack.com',
        path: process.env.slack_webhook_path,
        method: 'POST'
    },
    "slackPayloads" : [
	{
             channel : '#telephony-general',
             username : 'youtrack',
             icon_url : 'http://blog.jetbrains.com/wp-content/uploads/2014/01/YouTrack-logo-200x200-150x150.jpg',
             filter : 'TELEPHONY-'
        },
       	{
             channel : '#support',
      	     username : 'youtrack',
	     icon_url : 'http://blog.jetbrains.com/wp-content/uploads/2014/01/YouTrack-logo-200x200-150x150.jpg',
             filter : 'SUPPORT-'
        },
	{
             channel : '#ams-general',
             username : 'youtrack',
             icon_url : 'http://blog.jetbrains.com/wp-content/uploads/2014/01/YouTrack-logo-200x200-150x150.jpg',
             filter : 'CC-'
        },
    ]
};
