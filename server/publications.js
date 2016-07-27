Meteor.publish('maintrip', function(user_id) {
  return MainTrips.find({user_id: user_id});
});

Meteor.publish('subtrip', function(mainTrip_id) {
  return SubTrips.find({mainTrip_id: mainTrip_id});
});
