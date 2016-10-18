import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Markers } from '../api/gMaps.js';
import './gMaps.html';
// import { Places } from '../api/gMaps.js'

let places;

Meteor.startup(function() {  
  GoogleMaps.load();
  Meteor.call("placesGet", function(err, response){
  	if(response)
  		places = response;
  })  
});

Template.gMaps.onCreated(function() {  

		

  	GoogleMaps.ready('map', function(map) {

  		let mrkrs = [];
	    let markers = {};
	    let newMarker = true;
	    let markerCluster ;
	    let newLength, marker, latLng;
	    let oldLength = Markers.find().count();

	    let options = {
						gridSize: 50, 
						maxZoom: 15,
			            imagePath: 'images/m'
			        };


		

	  	google.maps.event.addListener(map.instance, 'dblclick', function(event) {	
	  		let randm = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
	  		Markers.insert({ 
	  			lat: event.latLng.lat(), 
	  			lng: event.latLng.lng(), 
	  			place: places[randm].place, 
	  			img1: places[randm].img1,
	  			img2: places[randm].img2,
	  			img3: places[randm].img3,
	  		});
	    });


		deleteMarker = (id) => {
			Markers.remove({_id:id});
		}


		infowindow = new google.maps.InfoWindow()
		setInfowindow = (doc, marker) =>
            marker.addListener("click", ()=> {
            	infowindow.setContent("<div class='info'>"+
            							"<p> <strong>Place: </strong>"+doc.place+"<p>"+
            							"<img src='images/"+doc.img1+"' alt='image 1'>"+
            							"<img src='images/"+doc.img2+"' alt='image 2'>"+
            							"<img src='images/"+doc.img3+"' alt='image 3'>"+"<br>"+
					            		"<p> <strong> Latitude:  </strong>"+doc.lat+"<p>"+
					            		"<p> <strong> Longitude:  </strong>"+doc.lng+"<p>"+
					            		"<a href='#' onclick=deleteMarker('"+marker.id+"')>"+"Delete Marker &times;"+"</a>"+
					            	"</div>")
                infowindow.open(map.instance, marker)
            }     
        )       

	    
		Markers.find().observe({  
			
			added: function(document) {

			    marker = new google.maps.Marker({
			      draggable: true,
			      position: new google.maps.LatLng(document.lat, document.lng),
			      map: map.instance,
			      id: document._id
			    });

			    setInfowindow(document, marker)

			    google.maps.event.addListener(marker, 'dragend', function(event) {
			      Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
			    });

			    markers[document._id]=marker;

			    mrkrs.push(marker)
			    
			    Tracker.autorun(function(){
			    	let j = 1;
			   	
				    for(i in markers){
				    	if(j==Markers.find().count()){

				    		if(newMarker){
				    			markerCluster = new MarkerClusterer(map.instance, mrkrs, options);
				    			newMarker=false;
				    		} else {
				    			markerCluster.resetViewport()
				    			markerCluster.addMarkers(mrkrs)
					    		markerCluster.redraw()    		
				    		}	
				    	}
				    	j++;
				    }	
			    })
			    	    
				
			},
			changed: function(newDocument, oldDocument) {	   
			    console.log("changed")
			},
			removed: function(oldDocument){

				markers[oldDocument._id].setMap(null);

			    google.maps.event.clearInstanceListeners(markers[oldDocument._id]);

			    delete markers[oldDocument._id];

			    for(i in mrkrs){
			    	if(mrkrs[i].id==oldDocument._id){
			    		mrkrs.splice(i,1)
			    	}
			    }

			    markerCluster.removeMarker(markers[oldDocument._id])
			    markerCluster.clearMarkers()
			    markerCluster.addMarkers(mrkrs)
			    markerCluster.redraw()
			    console.log("removed")
			}
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

Template.gMaps.events({
	'submit .addMarker'(event){
		event.preventDefault();

		const target = event.target;
		const place = target.place.value;
		const img1 = target.img1.files[0];
		const img2 = target.img2.files[0];
		const img3 = target.img3.files[0];
		const lat = target.lat.value;
		const lng = target.lng.value;

		

		if(img1){
			
	  		var file = new FormData;
			var FileReader = require('filereader')
			var reader = new window.FileReader();
	  		file=img1;
	        reader.addEventListener("load", function(){
	        	var buffer = new Uint8Array(reader.result)
	            Meteor.call("placeImg", buffer, file.name)

	        })

	        reader.onerror = function(event){    
	            alert(event.target.error.code); 
	        }

	        reader.readAsArrayBuffer(file)
		}

		if(img2){
			
	  		var file = new FormData;
			var FileReader = require('filereader')
			var reader = new window.FileReader();
	  		file=img1;
	        reader.addEventListener("load", function(){
	        	var buffer = new Uint8Array(reader.result)
	            Meteor.call("placeImg", buffer, file.name)

	        })

	        reader.onerror = function(event){    
	            alert(event.target.error.code); 
	        }

	        reader.readAsArrayBuffer(file)
		}

		if(img3){
			
	  		var file = new FormData;
			var FileReader = require('filereader')
			var reader = new window.FileReader();
	  		file=img1;
	        reader.addEventListener("onloadend", function(){
	        	var buffer = new Uint8Array(reader.result)
	            Meteor.call("placeImg", buffer, file.name)

	        })

	        reader.onerror = function(event){    
	            alert(event.target.error.code); 
	        }

	        reader.readAsArrayBuffer(file)
		}

		Markers.insert({ 
	  			lat: lat, 
	  			lng: lng, 
	  			place: place, 
	  			img1: img1.name,
	  			img2: img2.name,
	  			img3: img3.name,
	  		});

		target.place.value = '';
		target.img1.value = '';
		target.img2.value = '';
		target.img3.value = '';
		target.lat.value = '';
		target.lng.value = '';

	},
	'onchange #imge'(event){
		event.preventDefault();

		const target = event.target;
		const imge = target.imge.files;
		

		console.log(imge)
	}
})