
FlowRouter.wait();
  Meteor.startup(function(){
    Tracker.autorun(function (computation) {
    
      if (Geolocation.latLng()) {
        var loc = Geolocation.latLng()
        Meteor.call("getLoc", loc, function(err, response){
          if(response){
            loc = response[0];
            if(loc.city =="New Delhi" && loc.country=="India"){
              console.log(loc)
              FlowRouter.go('list')
            } else {
              FlowRouter.go('home')
            }
          }
        })
        computation.stop();
      }
    });
})

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

