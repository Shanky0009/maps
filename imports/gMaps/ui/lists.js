import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Markers } from '../api/gMaps.js';
import './lists.html';
import './list.html';
 

Template.lists.onCreated(function bodyOnCreated(){
});

Template.lists.helpers({
	
	lists() {
			return Markers.find({}).fetch();
	}
	
})