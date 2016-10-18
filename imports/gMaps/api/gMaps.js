import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Markers = new Mongo.Collection('markers');  

Meteor.startup(function() {  
	if(Meteor.isServer){
		Meteor.methods({
		 	placesGet:function(){
				return JSON.parse(Assets.getText('places.json'))
			},
			placeImg:function(file, name){
				var fs = require('fs')
				console.log(file)
				fs.writeFile(process.env["PWD"] + "/public/images/"+name, new Buffer(file), function(err) {
				    if (err) {
				        throw (new Meteor.Error(500, 'Failed to save file.', err));
				    } else {	
				        console.log('The file was saved ');
				    }
			  	}); 
			},
			getLoc:function(loc){
				var geo = new GeoCoder();
    		 	return geo.reverse(loc.lat, loc.lng );
			}
		})
	}
})	