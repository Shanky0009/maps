import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Markers } from '../api/gMaps.js';
import './gMaps.html';

Meteor.startup(function() {  
  GoogleMaps.load();
});

Template.gMaps.onCreated(function() {  
  	GoogleMaps.ready('map', function(map) {


	  	google.maps.event.addListener(map.instance, 'click', function(event) {
	      	Markers.insert({ lat: event.latLng.lat(), lng: event.latLng.lng() });
	    });

	    var markers = [];
	    var newDocument, oldDocument, newLength, marker, latLng;
	    var oldLength = Markers.find().count();

	    var options = {
						gridSize: 50, 
						maxZoom: 15,
			            imagePath: 'images/m'
			        };

		deleteMarker = (id) => {
			console.log(markers.length)

			for(i in markers){
				if(markers[i].id==id){
					ids=markers[i].id
					markers[i].id.setMap(null);
				    google.maps.event.clearInstanceListeners(markers[i].id);
				    delete markers[i].id;
				    Markers.remove({_id:id});
				}
			}
		}


		infowindow = new google.maps.InfoWindow()
		setInfowindow = (Lat, Lng, marker) =>
            marker.addListener("click", ()=> {

            	infowindow.setContent("<div>"+"Latitude: "+Lat+"<br>"+"Longitude: "+Lng+"<br/>"+"<a href='#' onclick=deleteMarker('"+marker.id+"')>"+"clickMe"+"</a>"+"</div>")
                infowindow.open(map.instance, marker)
            }
                
        )       

		Tracker.autorun(function () { 
			        
			var mark = Markers.find().fetch();
			newLength = Markers.find().count();

			markers = [];
			marker = ''

			
				for (var i = 0; i < newLength; i++) {
					latLng = new google.maps.LatLng(mark[i].lat, mark[i].lng);
					marker = new google.maps.Marker({
					  	draggable: true,
						// animation: google.maps.Animation.DROP,
					  	position: latLng,
					  	map: map.instance,
						id: mark[i]._id
					});
					markers.push(marker);
					setInfowindow(mark[i].lat, mark[i].lng, marker)
				}
				var markerCluster = new MarkerClusterer(map.instance, markers, options);
			
			
		})	

		

	    
  			Markers.find().observe({  
				
			
				changed: function(newDocument, oldDocument) {
				    markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
				    console.log("changed")
				},
				
			});
		
			
	});
});


Template.gMaps.helpers({  
  mapOptions: function() {
  	
    if (GoogleMaps.loaded()) {
    	
      		return {
        		center: new google.maps.LatLng(28.608633641676363, 77.21878445707262),
        		zoom: 8,
        		mapTypeId: google.maps.MapTypeId.ROADMAP
      		};
    }
  }
});