Meteor.publish('maintrip', function(user_id) {
  return MainTrips.find({uid: user_id});
});

Meteor.publish('subtrip', function(user_id) {
  return SubTrips.find({uid: user_id});
});
