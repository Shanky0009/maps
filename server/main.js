import { Meteor } from 'meteor/meteor';

import { Markers } from '../imports/gMaps/api/gMaps.js';

Meteor.startup(() => {
 //  var userGeoLocation = new ReactiveVar(null);
 //  var geo = new GeoCoder({
 //      geocoderProvider: "mapquest",
 //      httpAdapter: "https",
 //  });


	// Tracker.autorun(function (computation) {
	//   userGeoLocation.set(Geolocation.latLng());
	//   if (userGeoLocation.get()) {
	//     //stop the tracker if we got something
	//     computation.stop();
	//   }
	// });
});
