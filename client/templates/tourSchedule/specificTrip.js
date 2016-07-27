Template.specificTrip.helpers({
  subTrips : function() {
    return Template.currentData();
  }
});

Template.specificTrip.events({
  "click #edit": function(event, template){
    Session.set("edit_mode",true);
    Router.go("scheduleSubmit"); 
  }
});

Template.subTripItem.helpers({
  dateFormat(dateString) {
    return moment(dateString).format().slice(0, 10);
  },

  dayEntries(lat, lon, from, end) {
    let diff = moment(end).diff(moment(from), 'day');
    let result = [];
    for (var i = 0; i <= diff; i++) {
      var item = {
        lat: lat,
        lon: lon,
        time: moment(from).add(i, 'day')
      };
      result.push(item);
    }
    return result;
    //Meteor.call('getWeatherForLocation', {lat: lat, lng: lon}, time, function(err, res) {
    //  console.log(res);
    //});
  }
});

Template.weatherItem.created = function() {
  this.state = new ReactiveDict();
  this.state.set('tempMax', 0);
  this.state.set('tempMin', 0);
  this.state.set('daily', {});
};


Template.weatherItem.helpers({
  dateFormat: function (dateString) {
    return moment(dateString).format().slice(0, 10);
  },


  weatherOfDay(lat, lon, time) {
    var state = Template.instance().state;
    Meteor.call('getWeatherForLocation', {lat: lat, lng: lon}, time.toDate(), function(err, res) {
      console.log(res);
      state.set('tempMax', res.daily.data[0].temperatureMax);
      state.set('tempMin', res.daily.data[0].temperatureMin);
      state.set('daily', res.daily.data[0].summary);
      return res;
    });
  },

  tempMax: function() {
    return Template.instance().state.get('tempMax');
  },
  tempMin: function() {
    return Template.instance().state.get('tempMin');
  },
  summaryOfDay: function() {
    return Template.instance().state.get('daily');
  }

});
