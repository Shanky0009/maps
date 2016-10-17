FlowRouter.route('/', {
	name: "home",
  	action: function() {
  		BlazeLayout.render('mainTemp', { 
  			content: 'gMaps'
  		});
  	}
});

FlowRouter.route('/list', {
	name: "list",
  	action: function() {
  		BlazeLayout.render('mainTemp', { 
  			content: 'lists'
  		});
  	}
});

