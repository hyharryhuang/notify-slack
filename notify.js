var request = require('request');

var log = console.log;
var error = console.error;

var ConsoleSlack = function(config) {
	var self = this;

	var configSettings = {
		webhookURL: config['webhookURL'],

		defaultChannel: config['defaultChannel'],
		errorChannel: config['errorChannel'],


		moduleName: config['moduleName'],

		username: config['username'] || 'CSBot',
		userIcon: config['userIcon'] || 'https://slack.com/img/icons/app-57.png'
	};

	self.config = configSettings;
	self._validateConfig(config);
};

ConsoleSlack.prototype._validateConfig = _validateConfig;
ConsoleSlack.prototype._sendSlackMessage = _sendSlackMessage;

ConsoleSlack.prototype.notify = notify;


function _validateConfig(config) {
	if (typeof config !== 'object') {
		throw new TypeError('config must be object, got ' + typeof config)
	}

	if (!config['webhookURL'] || !config['defaultChannel']) {
		throw new Error("Missing Slack webhook URL/default channel to post to!");
	}
}

function notify(toLog, error) {
	var self = this;

	if (toLog) {
		log(Date() + ': ' + toLog);
		self._sendSlackMessage(toLog, error);
	} else
		log('');
}

function _sendSlackMessage(message, error) {

	var self = this;

	var webhookURL = self.config['webhookURL'];
	var moduleName = self.config['moduleName'];
	var username = self.config['username'];
	var userIcon = self.config['userIcon'];

	var defaultChannel = self.config['defaultChannel'];
	var errorChannel = self.config['errorChannel'];

	var channel = defaultChannel;

	if(self.config['moduleName']) {
		message = self.config['moduleName'] + " :" + message;
	}

	if(error && errorChannel) {
		channel = errorChannel
	}

	var bodyParams = {
		'text' : message,
		'icon_url' : userIcon,
		'username' : username,
		'channel' : channel
	};

	request.post({
			url: webhookURL,
			json: bodyParams,
		},
		function(err, httpResponse, body) {
			if (err)
				console.log("ERROR! " + JSON.stringify(err));
			else
				console.log("RESPONSE: " + JSON.stringify(httpResponse));
		}
	)
};

module.exports = ConsoleSlack;