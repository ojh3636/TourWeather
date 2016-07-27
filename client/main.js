import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  GoogleMaps.load({
    key: 'XXXXXXXX',
    libraries: 'places'
  });
});
