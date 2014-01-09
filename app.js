var express = require('express'),
	routes = require('./routes'),
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
	app.use(express.static(__dirname + '/public'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
});
app.configure('development', function() {
	app.use(express.errorHandler());
});
app.get('/', routes.index);
http.createServer(app).listen(3000);
console.log('Express listening on port 3000');