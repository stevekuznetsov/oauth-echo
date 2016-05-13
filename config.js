"use strict";

module.exports = {
	// authorizationURL is the URL at which this client will attempt to authorize
	authorizationURL: 'https://localhost:8443/oauth/authorize',
	// tokenURL is the URL at which this client can reqeust a token
	tokenURL: 'https://localhost:8443/oauth/token',

	// scope is a string or array of scopes that you want to request
	scope: ['foo', 'bar'],

	// clientID and clientSecret define the OAuth client for this application
	clientID: 'dummy',
	clientSecret: 'dummy',

	// callbackURL is the URL that will be called to return to your application on successful authentication
	callbackURL: 'http://localhost:30000/info'
};