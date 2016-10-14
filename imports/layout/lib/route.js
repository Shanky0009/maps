FlowRouter.route('/', {
	name: "home",
  	action: function() {
  		BlazeLayout.render('mainTemp', { 
  			content: 'gMaps'
  		});
  	}
});
