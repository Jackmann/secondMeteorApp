import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';

import './main.html';

GringosList = new Mongo.Collection('gringos');
Meteor.subscribe('theGringos');
Template.info.helpers({
  tasks() {
    var currentUserId = Meteor.userId();
    return GringosList.find({ createdBy: currentUserId},
      {sort: {score: -1, name: 1}});
  },
  howmuch() {
    return GringosList.find().count();
  },
  selectedClass() {
    var thismId = this._id;
    var ss = Session.get("thisman");
    if (thismId === ss)
      return "selected";
  },
  selectedGringo() {
    var selectedGringo2 = Session.get('thisman');
    return GringosList.findOne({ _id: selectedGringo2 });
  }
});

Template.info.events({
  'click .player'() {
    var thismanId = this._id;
    Session.set('thisman', thismanId);
  },
  'click .increment'() {
    var thisma = Session.get("thisman");
    Meteor.call('updateMan', thisma);
  },
  'click .remove'() {
    var manToDelete = Session.get("thisman");
    Meteor.call('deleteMan', manToDelete);
  },
  'blur li'() {
    console.log("You clicked blur");
  },
  'submit form'(event){
    event.preventDefault();
    var nameOfTheMan = event.target.gringoField.value;
    var scoreOfTheMan = event.target.gringoScore.value;
    Meteor.call('createMan', nameOfTheMan, scoreOfTheMan);
    event.target.gringoField.value = "";
    event.target.gringoScore.value = "";
  }
});
