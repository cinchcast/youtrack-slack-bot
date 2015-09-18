# YouTrack Slack Bot

We built this bot at [Cinchcast](http://cinchcast.com/?refer=youtrack-slack-bot "Cinchcast"), because we love Slack and YouTrack. We need a good way to get updates without the need for a Jabber client or email notifications.  After we set this up, we all disabled our email and just use Slack now.  

This bot allows you to connect to YouTrack via an account to the XMPP chat room.  From there you can filter on specific text and publish to a YouTrack hook.  

There are few steps required for configuring this.

1. Create an XMPP account for the YouTrack bot account to use.  Any XMPP server will do, however if you decide to use Google, ensure that you have two-factor authentication enabled and use the two-factor authentication password provided.  (Through testing, I've discovered that it doesn't work without it.)   Any XMPP server will work.  

2. Add the settings for username [`jid`] and the server hostname [`host`] see here https://github.com/cinchcast/youtrack-slack-bot/blob/master/config.js#L6-L7. 
 
3. You will need to create an Incoming Webhook for Slack.  Take note of the path, as you will have to pass it on the startup.

4. You will need to have dedicated YouTrack account for this.  From there you can set up the Jabber account to match the account name you set up.  Ensure that jabber notifications are enabled (you may want to disable email notifications for the account).  You can set up the the notifications based off project or saved search.  Basically whatever gets pushed to Jabber will wind up in Slack.

5. You can set up a `filter` to push messages that contain specific text to a specific Slack `channel`.  In the `config.js` you will notice that each `filter` has been configured to point a specific Slack `channel` that has context for that project.  You can also configure the `icon_url` or the `username` that will show up in Slack.  Use this for reference: https://github.com/cinchcast/youtrack-slack-bot/blob/master/config.js#L18-L21

6. To start the application run the following command:

```shell
bot_password=<xmpp password> slack_webhook_path=<slack_path> node server.js
```
