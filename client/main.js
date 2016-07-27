import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  GoogleMaps.load({
    key: 'AIzaSyAUzYU9V7-8mguIrm75gKZKbjYc-YELklM',
    libraries: 'places'
  });
});
