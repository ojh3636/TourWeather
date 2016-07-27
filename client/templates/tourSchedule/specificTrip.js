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
