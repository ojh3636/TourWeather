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
  }
});
