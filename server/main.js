import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  GringosList = new Mongo.Collection('gringos');
  Meteor.publish('theGringos', function() {
    var currentUserId = this.userId;
    return GringosList.find({ createdBy: currentUserId });
  });
});

Meteor.methods({
  createMan(nameVar, scoreVar) {
    check(nameVar, String);
    var currentUserId = Meteor.userId();
    var scoreVar = parseInt(scoreVar);
    if(currentUserId) {
        GringosList.insert({
        name: nameVar,
        score: scoreVar,
        createdBy: currentUserId
      });
    }
  },
  deleteMan(nameVar) {
    check(nameVar, String);
    var currentUserId = Meteor.userId();
    if (currentUserId) {
        GringosList.remove({ _id: nameVar, createdBy: currentUserId});
    }
  },
  updateMan(numeVar) {
    check(numeVar, String);
    var currentUserId = Meteor.userId();
    if (currentUserId) {
      GringosList.update({ _id: numeVar, createdBy: currentUserId}, {$inc: {score: 5}});
    }
  }
});
