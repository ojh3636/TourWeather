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
    editable: true,

    events(start, end, timezone, callback) {
      var mainTripId = Session.get('mainTripId');
      console.log(mainTripId);
      let data = SubTrips.find({maintrip_id : mainTripId}).fetch().map(function(event) {
        event.editable = !isPast(event.from);
        event.start = event.from;
        event.title = event.place;
        return event;
      });


      if (data) {
        callback(data);
      }
    },

    eventDrop(event, delta, revert) {
      let date = event.start.format();
      if(!isPast(data)) {
      }
    },

    eventClick(event) {
      Session.set('eventModal', {type: 'edit', event: event._id});
      $('#add-edit-event-modal').modal('show');
    },

    select(start, end) {
      Session.set('eventModal', {type:'add',
        dates: [start.format(), end.subtract(1, 'day').format()]});
      $("#add-edit-event-modal").modal('show');
      $("#calendar").fullCalendar('unselect');
    },

    eventResize(callback) {
      console.log("resize");
    }
  });


  Tracker.autorun(function() {
    SubTrips.find().fetch();
    $('#calendar').fullCalendar('refetchEvents');
  });

  $('#add-edit-event-modal').on('hidden.bs.modal', function (e) {
    $(this).find(".autocomplete").val('').end();
    Session.set('eventModal', {});
  });

});

Template.scheduleSubmit.events({
  "submit form": function(event, template){
    event.preventDefault();
    Session.set('is_submit',true);
    var mainTripId = Session.get('mainTripId');
    console.log("title: " + template.find('[name=title]').value);
    Meteor.call("addTitle",mainTripId,template.find('[name=title]').value);

//    console.log("click submit" + Session.get('is_submit'));
    Router.go("mainTrip");
  } ,
  "click #return": function(event, template) {
    Session.set('is_submit',false);
//    console.log("click return" + Session.get('is_submit'));
    Router.go("mainTrip");
  }
});

Template.scheduleSubmit.helpers({
  title: function() {
    var mainTripId = Session.get("mainTripId");

    //console.log(MainTrips.find({_id:mainTripId}).fetch()[0].title);
    return MainTrips.find({_id:mainTripId}).fetch()[0].title;
  }
});
