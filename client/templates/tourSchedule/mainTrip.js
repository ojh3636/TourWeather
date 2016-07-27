Template.mainTrip.helpers({
  mainTrips : function() {
    return MainTrips.find({uid:Meteor.userId()});
  },
  subTrips : function() {
    return SubTrips.find({})
  }
});
