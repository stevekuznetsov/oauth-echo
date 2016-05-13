'use strict';

var express = require('express');
var passport = require('passport');
var session = require('express-session');
var OAuthStrategy = require('passport-oauth').OAuth2Strategy;
var config = require('./config');
var https = require('https');

var app = express();

passport.use('OpenShift', new OAuthStrategy({
		authorizationURL: config.authorizationURL,
		tokenURL: config.tokenURL,
		clientID: config.clientID,
		clientSecret: config.clientSecret,
		callbackURL: config.callbackURL
	},
	function (accessToken, refreshToken, profile, done) {
		return done({
			accessToken: accessToken,
			refreshToken: refreshToken,
			profile: profile
		});
	}
));

app.use(session({
	secret: 'topSecretKey'
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

app.get('/', function (request, response) {
	var html ="\
	<ul>\
	    <li><a href='/auth'>Authenticate</a></li>\
	    <li><a href='/logout'>Log Out</a></li>\
	</ul>\
	";

	response.send(html);
});

app.get('/logout', function (request, response) {
	console.log('logging out');
	request.logout();
	response.redirect('/');
});

app.get('/auth', passport.authenticate('OpenShift', {
	scope: config.scope,
	state: 'this-is-totally-random'
}));

app.get('/callback', passport.authenticate('OpenShift', {
	successRedirect: '/info',
	failureRedirect: '/'
}));

app.get('/info', function (request, response) {
	var hmtl ="\
	<ul>\
	    <li>Access Token: " + request.user.accessToken + "</li>\
	    <li>Refresh Token: " + request.user.refreshToken + "</li>\
	    <li>Profile: " + request.user.profile + "</li>\
	</ul>\
	";

	response.send(html);
})

var server = app.listen(30000, 'localhost', function () {
	console.log('Example app listening at http://%s:%s',
		server.address().address, server.address().port);
});
