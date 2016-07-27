let isPast = (date) => {
  let today = moment().format();
  return moment(today).isAfter(date);
};

Template.scheduleSubmit.onRendered(function() {
  console.log("Rendered");
  this.autorun(function() {
    if (GoogleMaps.loaded()) {
      $("#geocomplete").geocomplete({
        map: "#map",
        details: "form"
      });
    }
  });

  $('#calendar').fullCalendar({
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
    dayClick(date){

      Session.set('eventModal', {type:'add',date: date.format()});
      $('#add-edit-event-modal').modal('show');
    },
    eventClick(event) {
      Session.set('eventModal', {type: 'edit', event: event._id});
      $('#add-edit-event-modal').modal('show');
    }
  });


  Tracker.autorun(function() {
    SubTrips.find().fetch();
    $('#calendar').fullCalendar('refetchEvents');
  });

});
