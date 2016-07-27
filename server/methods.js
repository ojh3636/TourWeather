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

Meteor.methods({
  addMainTrip(user_id) {

    var maintrip_item = {
      title: "무제! 제목을 수정해주세요",
      uid: user_id
    };

    try {
      return MainTrips.insert(maintrip_item);
    } catch (exception) {
      throw new Meteor.Error('500',`${ exception}`);
    }
  }
});

Meteor.methods({
  removeMainTrip(mainTrip_id) {
    check (mainTrip_id, String );

    try {
      return MainTrips.remove(mainTrip_id);
    } catch (exception) {
      throw new Meteor.Error('500',`${exception}`);
    }
  }
});
