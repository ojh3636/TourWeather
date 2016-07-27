Router.map(function() {
  this.route('/',{
    name: 'weatherPage',
    layoutTemplate: 'layout'
  });

  this.route('/submit',{
    name: 'scheduleSubmit',
    layoutTemplate: 'layout',
    onStop: function(){
      //Todo : remove mainTrip when real_submit session is 0
      var mainTripId = Session.get('mainTripId');
      var is_submit = Session.get('is_submit');
      var edit_mode = Session.get("edit_mode");
      if(!edit_mode){
        if(!Meteor.user() || !is_submit) {
          Meteor.call("removeMainTrip",mainTripId);
          SubTrips.find({maintrip_id : mainTripId}).fetch().map(function(subtrip) {
            Meteor.call("removeEvent",subtrip._id);
          });
        }
      }
      Session.set('edit_mode',false);
      Session.set('is_submit',false);
    },
    waitOn: function() { return Meteor.subscribe('subtrip',Meteor.userId());}
  });

  this.route('/main_trip', {
    name: 'mainTrip',
    layoutTemplate: 'layout',
    waitOn: function() { return Meteor.subscribe('maintrip',Meteor.userId());}

  });


  this.route('/main_trip/:_id', {
    name: 'specificTrip',
    layoutTemplate: 'layout',
    waitOn: function() { return Meteor.subscribe('subtrip',Meteor.userId());},
    data: function() {return SubTrips.find({maintrip_id:this.params._id});},
    onBeforeAction: function() {
      Session.set("mainTripId",this.params._id);
      this.next();
    }
  });

  this.route('/login', {
    name: 'login',
    layoutTemplate: 'loginLayout'
    //waitOn: function() { return Meteor.subscribe("name", argument);}
  });

});

var mustBeSignedIn = function() {
  if(!(Meteor.user() || Meteor.loggingIn())){
    Router.go('login');
  } else {
    this.next();
  }
};

var goHome = function() {
  if (Meteor.user()){
    Router.go('mainTrip');
  } else {
    this.next();
  }
};

var makeMainTrip = function(){
  var edit_mode = Session.get("edit_mode");
  if(Meteor.user()){
    if(!edit_mode){
      Meteor.call("addMainTrip",Meteor.userId(), function(err, data){
        if(err){
          console.log(err.reason);
        } else {
          Session.set('mainTripId',data);
        }
      });
      this.next();
    } else {
      this.next();
    }
  } else {
    goHome();
  }
};

Router.onBeforeAction(mustBeSignedIn, {except: ['login']});

Router.onBeforeAction(goHome, {only :['weatherPage', 'login']});

Router.onBeforeAction(makeMainTrip, {only: ['scheduleSubmit']});


/*Router.route('/login',{
  name: 'loginPage',
  layoutTemplate: 'loginLayout'
});*/
