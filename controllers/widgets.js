var widgets = [{ 
	id: 1,
	price: 100.00,
	descr: 'A widget beyond price'	 
}];

exports.index = function(req, res) {
	res.send(widgets);
};

exports.new = function(req, res) {
	res.render('widgets/add');
};

exports.create = function(req, res) {
	var indx = widgets.length + 1;
	widgets[widgets.length] = {
		id: indx,
		name: req.body.widgetname,
		price: parseFloat(req.body.widgetprice),
		descr: req.body.widgetdesc
	};
	console.log('Added ' + widgets[indx - 1]);
	res.render('widgets/added', {title: 'Widget Added', widget: widgets[indx-1]});
};

exports.show = function(req, res) {
	var indx = parseInt(req.params.id) - 1;
	if (!widgets[indx]) {
		res.send('There is no widget with id of ' + req.param.id);
	} else {
		res.send(widgets[indx]);
	}
};

exports.destroy = function(req, res) {
	var indx = req.params.id - 1;
	delete widgets[indx];
	console.log('deleted ' + req.params.id);
	res.send('seleted ' + re.params.id);
};

exports.edit = function(req, res) {
	res.render('widgets/edit');
};

exports.update = function(req, res) {
	var indx = parseInt(req.params.id) - 1;
	widgets[indx] = {
		id: indx,
		name: req.body.widgetname,
		price: parseFloat(req.body.widgetprice),
		descr: req.body.widgetdesc
	};
	console.log(widgets[indx]);
	res.send('Updated ' + req.params.id);
};