# slack-server-notification
Post error notifications to a Slack channel when logging.

#Installing
Copy consoleSlack.js to your working directory. 

#Usage
```javascript
var ConsoleSlack = require('./consoleSlack.js');
var cs = new ConsoleSlack({
  'webhookURL' : '...', //Slack webhook URL
  'defaultChannel' : '...', //Default Slack channel to post to
  'errorChannel' : '...', //(Optional) Error Slack channel to post to, for messages marked as 'error'
  'moduleName' : '...', //(Optional) Name will be prepended to Slack message, in order to identify which module it was referring to.
  'username' : '...', //(Optional) username of Slack bot when posting messages. Defaults to CSBot.
  'userIcon' : '...', //(Optional) user icon of Slack bot when posting messages. Defaults to Slack logo.
});

cs.notify('All good.'); //post a message to the default channel in Slack. 
cs.notify("Everything's on fire!!!", true); //post a message to the error channel in Slack (if specified, otherwise will post to the default channel). 
```
