var express = require('express'),
	routes = require('./routes'),
	map = require('./maproutecontroller'),
	http = require('http'),
	dust = require('dustjs-linkedin'),
	cons = require('consolidate'),
	app = express();

app.engine('dust', cons.dust);
app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('template_engine', 'dust');
	app.set('view engine', 'dust');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(require('less-middleware')({ src: __dirname + '/public' }));
	app.use(express.static(__dirname + '/public'));
	app.use(express.directory(__dirname + '/public'));
	app.use(function(req, res, next) {
		throw new Error(req.url + ' not found');
	});
	app.use(function(err, req, res, next) {
		res.send(err.message);
	});
});
app.configure('development', function() {
	app.use(express.errorHandler({ showStack: true, dumpExceptions: true }));
});

app.get('/', routes.index);
var prefixes = ['widgets'];
prefixes.forEach(function(prefix) {
	map.mapRoute(app, prefix);
});

http.createServer(app).listen(3000);
console.log('Express listening on port 3000');