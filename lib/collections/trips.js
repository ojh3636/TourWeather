MainTrips = new Mongo.Collection('maintrips');
SubTrips = new Mongo.Collection('subtrips');

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
  "palce": {
    type: String,
    label: "Trip's place in that day"
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
  }
});

SubTrips.attachSchema(SubTripsSchema);
