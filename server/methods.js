Meteor.methods({
  'getWeatherForLocation': function(location) {
    console.log(location);
    this.unblock();
    var Now = new Date().toISOString().slice(0, 19);
    var APPID = "c9bb7da531e89897c45c5beae23fba79";
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
