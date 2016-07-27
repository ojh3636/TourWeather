let isPast = (date) => {
  let today = moment().format();
  return moment(today).isAfter(date);
};

Template.scheduleSubmit.onRendered(function() {
  //this.autorun(function() {
  //  if (GoogleMaps.loaded()) {
  //    $("#geocomplete").geocomplete({
  //      map: "#map",
  //      details: "form"
  //    }).bind("geocode:result", (event, results) => {
  //      let res = results.geometry.location.toJSON();
  //      console.log(`latitude: ${res.lat}, altitude: ${res.lng}`);
  //      Meteor.call('getWeatherForLocation', res, function(err, res) {
  //        console.log("Result !!");
  //        console.log(res);
  //      })
  //    });
  //  }
  //});

  $('#calendar').fullCalendar({
    selectable: true,

    events(start, end, timezone, callback) {
      let data = SubTrips.find().fetch().map(function(event) {
        event.editable = !isPast(event.from);
        event.start = event.from;
        event.title = event.place;
        return event;
      });


      if (data) {
        callback(data);
      }
    },

    eventClick(event) {
      Session.set('eventModal', {type: 'edit', event: event._id});
      $('#add-edit-event-modal').modal('show');
    },

    select(start, end) {
      console.log(start);
      console.log(end.toJSON());
      Session.set('eventModal', {type:'add',
        dates: [start.format(), end.subtract(1, 'day').format()]});
      $("#add-edit-event-modal").modal('show');
      $("#calendar").fullCalendar('unselect');
    }
  });


  Tracker.autorun(function() {
    SubTrips.find().fetch();
    $('#calendar').fullCalendar('refetchEvents');
  });

  $('#add-edit-event-modal').on('hidden.bs.modal', function (e) {
    $(this).find("#placecomplete").val('').end();
  })

});
