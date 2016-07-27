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
    label: "Trip's title"
  },
  "from": {
    type: Date,
    label: "Trip's start date(yy-mm-dd-hh-mm)"
  },
  "end": {
    type: Date,
    label: "Trip's end date(yy-mm-dd-hh-mm)"
  },
  "uid": {
    type: String,
    label: "The user's id who has this trips"
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
    type: Number,
    min: -180,
    max: 180
  },
  "lon": {
    type: Number,
    min: -180,
    max: 180
  },
  "uid": {
    type: String,
    label: "The user's id who has this trips"
  }
});

SubTrips.attachSchema(SubTripsSchema);
