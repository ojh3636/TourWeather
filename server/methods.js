Meteor.methods({
  'getWeatherForLocation': function(location) {
    console.log(location);
    this.unblock();
    var Now = new Date().toISOString().slice(0, 19);
    var APPID = "XXXXXXX";
    let apiReqUrl = `https://api.forecast.io/forecast/${APPID}/${location.lat}` +
        `,${location.lng},${Now}?units=si`;
    var response = Meteor.wrapAsync(apiCall)(apiReqUrl);
    return response;
  }
});

Meteor.methods({
  addEvent( event ) {
    check( event, SubTrips.simpleSchema());

    try {
      return SubTrips.insert( event );
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});

Meteor.methods({
  editEvent( event, id ) {
    check( event, SubTrips.simpleSchema());

    try {
      return SubTrips.update( id, {
        $set: event
      });
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});

Meteor.methods({
  removeEvent( event ) {
    check( event, String );

    try {
      return SubTrips.remove( event );
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});
