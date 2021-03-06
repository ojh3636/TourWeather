MainTrips = new Mongo.Collection('maintrips');
SubTrips = new Mongo.Collection('subtrips');

SubTrips.allow({
  insert: () => false,
  update: () => false,
  remove: () =>false
});

SubTrips.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

MainTripsSchema = new SimpleSchema({
  "title": {
    type: String,
    label: "Trip's title",
    optional: true
  },
  "from": {
    type: Date,
    label: "Trip's start date(yy-mm-dd-hh-mm)",
    optional: true
  },
  "end": {
    type: Date,
    label: "Trip's end date(yy-mm-dd-hh-mm)",
    optional: true
  },
  "uid": {
    type: String,
    label: "The user's id who has this trips",
    optional: true
  }
});

MainTrips.attachSchema(MainTripsSchema);

SubTripsSchema = new SimpleSchema({
  "place": {
    type: String,
    label: "Trip's place in that day"
  },
  "from": {
    type: Date,
    label: "Trip's start date(yy-mm-dd-hh-mm)"
  },
  "end": {
    type: Date,
    label: "Trip's end date(yy-mm-dd-hh-mm)"
  },
  "lat": {
    type: String,
    min: -180,
    max: 180,
    optional: true
  },
  "lon": {
    type: String,
    min: -180,
    max: 180,
    optional: true
  },
  "uid": {
    type: String,
    label: "The user's id who has this trips"
  },
  "maintrip_id": {
    type: String,
    label: "mainTrip's id (foreignKey)",
    optional: true
  }
});

SubTrips.attachSchema(SubTripsSchema);
