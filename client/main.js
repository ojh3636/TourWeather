import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  GoogleMaps.load({
    key: '',
    libraries: 'places'
  });
});
