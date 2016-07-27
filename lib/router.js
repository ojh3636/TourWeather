Router.map(function() {
  this.route('/',{
    name: 'weatherPage',
    layoutTemplate: 'layout'
  });

  this.route('/submit',{
    name: 'scheduleSubmit',
    layoutTemplate: 'layout'
  });
});


/*Router.route('/login',{
  name: 'loginPage',
  layoutTemplate: 'loginLayout'
});*/
