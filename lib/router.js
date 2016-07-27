Router.map(function() {
  this.route('/',{
    name: 'weatherPage',
    layoutTemplate: 'layout'
  });

  this.route('/submit',{
    name: 'scheduleSubmit',
    layoutTemplate: 'layout'
  });

  this.route('/main_trip', {
    name: 'mainTrip',
    layoutTemplate: 'layout',
    waitOn: function() { return Meteor.subscribe('maintrip',Meteor.userId());}

  });


  this.route('/specific_trip', {
    name: 'subTrip',
    layoutTemplate: 'layout',
    waitOn: function() { return Meteor.subscribe('subtrip', _id);}
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
    Router.go('weatherPage');
  } else {
    this.next();
  }
};

Router.onBeforeAction(mustBeSignedIn, {except: ['login']});
Router.onBeforeAction(goHome, {only :['weatherPage', 'login']});

/*Router.route('/login',{
  name: 'loginPage',
  layoutTemplate: 'loginLayout'
});*/
