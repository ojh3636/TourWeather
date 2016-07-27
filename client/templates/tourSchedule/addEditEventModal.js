let closeModal = () => {
  $( '#add-edit-event-modal' ).modal( 'hide' );
  $( '.modal-backdrop' ).fadeOut();
};

Template.addEditEventModal.onRendered(function() {
  this.autorun(function() {
    if (GoogleMaps.loaded()) {
      $("#placecomplete").geocomplete({
        details: "form"
      });
    }
  });
});

Template.addEditEventModal.helpers({
  modalType( type ) {
    let eventModal = Session.get( 'eventModal' );
    if ( eventModal ) {
      return eventModal.type === type;
    }
  },
  modalFormat(dateString) {
    console.log(dateString);
    return moment(dateString).format().slice(0, 10);
  },
  modalLabel() {
    let eventModal = Session.get( 'eventModal' );

    if ( eventModal ) {
      return {
        button: eventModal.type === 'edit' ? 'Edit' : 'Add',
        label: eventModal.type === 'edit' ? 'Edit' : 'Add an'
      };
    }
  },
  selected( v1, v2 ) {
    return v1 === v2;
  },
  event() {
    let eventModal = Session.get( 'eventModal' );

    if ( eventModal ) {
      return eventModal.type === 'edit' ? SubTrips.findOne(eventModal.event) :
      {
        from: eventModal.dates[0],
        end: eventModal.dates[1]
      };
    }
  }
});

Template.addEditEventModal.events({
  'submit form' ( event, template ) {
    event.preventDefault();

    let eventModal = Session.get( 'eventModal' ),
        submitType = eventModal.type === 'edit' ? 'editEvent' : 'addEvent',
        eventItem  = {
          place: template.find( '[name="place"]' ).value,
          from: new Date(template.find( '[name="start"]' ).value),
          end: new Date(template.find( '[name="end"]' ).value),
          lat: template.find( '[name="lat"]' ).value,
          lon: template.find( '[name="lng"]' ).value,
          uid: Meteor.userId()
        };
    console.log(eventModal.type);

    /*if ( submitType === 'editEvent' ) {
      eventItem._id   = eventModal.event;
    }*/
    Meteor.call( submitType, eventItem,eventModal.event, ( error ) => {
      if ( error ) {
        console.log(error);
        Bert.alert( error.reason, 'danger' );
      } else {
        Bert.alert( `Event ${ eventModal.type }ed!`, 'success' );
        closeModal();
      }
    });
  },
  'click .delete-event' ( event, template ) {
    console.log("wow");
    let eventModal = Session.get( 'eventModal' );
    Meteor.call( 'removeEvent', eventModal.event, ( error ) => {
      if ( error ) {
        console.log(error);
        Bert.alert( error.reason, 'danger' );
      } else {
        Bert.alert( 'Event deleted!', 'success' );
        closeModal();
      }
    });
  }

});
