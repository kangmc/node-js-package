var express = require('express'),
	expressLayouts = require('express-ejs-layouts'),	
	app = express();

var fs = require('fs');

var TITLE = 'UI Script Guide';

app.set('view engine', 'ejs');
app.set('layout', 'layout/default');

app.use(expressLayouts);
app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
	res.render('view', { title: 'test' });
});

app.get('/guide/:id', function(req, res) {
	var page = req.params.id;
	res.render('guide/' + page, { title: TITLE });
});

app.get('/jquery/:id', function(req, res) {
	var page = req.params.id;
	res.render('jquery/' + page, { title: TITLE });
});

app.get('/plugin/:id', function(req, res) {
	var page = req.params.id;
	res.render('plugin/' + page, { title: TITLE });
});

app.get('/utils', function(req, res) {
	res.render('utils', { title: TITLE });
});

app.get('/sample', function(req, res) {
	fs.readFile('temp/json/samples.json', 'utf8', function(err, data) {
		if(err) throw err;
		var samples = JSON.parse(data);
		res.render('sample', { 
			title: TITLE,
			samples: samples
		});	
	});
});

app.get("/sample/:id", function(req, res) {
	res.render('sample/' + req.params.id, { title: TITLE + ' - ' + req.params.id});
});

app.listen(8006, function(req, res) {
	console.log('server started at 8006');
});