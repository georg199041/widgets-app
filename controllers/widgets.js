var widgets = [{ 
	widget: {
		id: 1,
		name: 'The 1st widget',
		price: 100.00,
		descr: 'A widget beyond price'
	}
}];

exports.index = function(req, res) {
	res.render('widgets/index', { title: 'Widgets Factory', widgets: widgets });
};

exports.new = function(req, res) {
	res.render('widgets/add');
};

exports.create = function(req, res) {
	var indx = widgets.length + 1;
	widgets[widgets.length] = {
		widget: {
			id: indx,
			name: req.body.widgetname,
			price: parseFloat(req.body.widgetprice),
			descr: req.body.widgetdesc
		}
	};
	console.log('Added ' + widgets[indx-1].widget);
	res.render('widgets/added', {title: 'Widget Added', widget: widgets[indx-1].widget});
};

exports.show = function(req, res) {
	var indx = parseInt(req.params.id) - 1;
	if (!widgets[indx]) {
		res.send('There is no widget with id of ' + req.param.id);
	} else {
		res.render('widgets/show', {title: 'Show Widget', widget: widgets[indx].widget});
	}
};

exports.destroy = function(req, res) {
	var indx = req.params.id - 1;
	
	console.log('deleted ' + req.params.id);
	res.render('widgets/added', {title: 'Widget Deleted', widget: widgets[indx].widget});
	delete widgets[indx];
};

exports.edit = function(req, res) {
	var indx = req.params.id - 1;
	console.log(widgets[indx].widget)
	res.render('widgets/edit', { title: 'Edit Widget', widget: widgets[indx].widget });
};

exports.update = function(req, res) {
	var indx = parseInt(req.params.id) - 1;
	widgets[indx] = {
		widget: {
			id: indx + 1,
			name: req.body.widgetname,
			price: parseFloat(req.body.widgetprice),
			descr: req.body.widgetdesc
		}	
	};
	console.log(widgets[indx]);
	res.render('widgets/added', {title: 'Widget Edited', widget: widgets[indx].widget});
};