Meteor.methods({
  'getWeatherForLocation': function(location) {
    console.log(location);
    this.unblock();
    var APPID = "0f6e059b814f1d7549531c19b7779373";
    let apiReqUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}' +
        `&lon=${location.lng}&mode=json&APPID=${APPID}`;
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
