Template.layout.events({
  'click #logout-btn': function(e, template) {
    Meteor.logout();
  }
});
