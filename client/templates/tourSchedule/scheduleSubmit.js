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

  $('#calendar').fullCalendar();

});
