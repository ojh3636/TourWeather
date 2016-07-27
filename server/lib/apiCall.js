apiCall = function(apiUrl, callback) {
  try {
    var response = HTTP.get(apiUrl).data;
    console.log(response);

    callback(null, response);
  } catch (error) {
    if (error.response) {
      var errorCode = error.response.data.code;
      var errorMessage = error.response.data.message;
    } else {
      var errorCode = 500;
      var errorMessage = 'Cannot access the api';
    }

    var myError = new Meteor.Error(errorCode, errorMessage);
    callback(myError, null);
  }
}