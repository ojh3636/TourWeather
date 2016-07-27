Template.loginLayout.events({
  'click #login-form-link': function(e,template) {


    template.$('#login-form').css("display","block");
    template.$('#register-form').css("display","none");
    template.$('#login-form-link').addClass('active');
    template.$('#register-form-link').removeClass('active');

    console.log("click! login!");
  },

  'click #register-form-link': function(e,template) {

    template.$('#login-form').css("display","none");
    template.$('#register-form').css("display","block");
    template.$('#login-form-link').removeClass('active');
    template.$('#register-form-link').addClass('active');
    console.log("click! register!");
  },

  'submit #login-form': function(e,template) {
    e.preventDefault();
    var getUser = e.target.username.value;
    var getPassword = e.target.password.value;
    Meteor.loginWithPassword(getUser,getPassword);
    console.log(getUser + getPassword);
  },
  'submit #register-form': function(e,template) {
    e.preventDefault();
    var getUser = e.target.username.value;
    var getEmail = e.target.email.value;
    var getPassword = e.target.password.value;
    var getConfrimPassword = e.target.confirmPassword.value;

    Accounts.createUser({
      email: getEmail,
      password: getPassword
    });

    console.log(getUser + getEmail + getPassword + getConfrimPassword);

  }

});

Template.layout.events({
  'click #logout-btn': function(e, template) {
    Meteor.logout();
  }

});
