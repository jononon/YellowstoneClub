$(document).ready(function() {

  var currentWeather;

  $.ajax({
    url: 'http://api.wunderground.com/api/e78d2ccf0a39822b/conditions/q/CA/Studio_City.json',
    dataType: 'json',
    success: function(data) {
      currentWeather=data.current_observation.temp_f + String.fromCharCode(parseInt('00B0', 16)) + 'F';
    }
  });

  var myDate = new Date();

  if (myDate.getHours() < 12) {
      $('#title').append("Good Morning, ");
  } else if (myDate.getHours() >= 12 && myDate.getHours() <= 17) {
      $('#title').append("Good Afternoon, ");
  } else if (myDate.getHours() > 17 && myDate.getHours() <= 24) {
      $('#title').append("Good Evening, ");
  } else /* the hour is not between 0 and 24, so something is wrong */ {
      $('#title').append("Hello, ");
  }
  $('#title').append("DJ and Jonathan");

  function updateClock() {
    var now = new Date(), // current date
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // you get the idea
        time = ((now.getHours()%12==0)?12:now.getHours()%12) + ':' + (now.getMinutes()<10?0:'') + now.getMinutes() + ':' + (now.getSeconds()<10?0:'') + now.getSeconds(), // again, you get the idea

        // a cleaner way than string concatenation
        date = [now.getDate(),
                months[now.getMonth()]].join(' ');

    // set the content of the element with the ID time to the formatted string
    document.getElementById('time').innerHTML = [date, time].join(', ') + ' - ' + currentWeather;

    // call this function again in 1000ms
    setTimeout(updateClock, 1000);
  }
  updateClock(); // initial call



/*
  var key = 'AIzaSyAcmscSUENKMTKPgTTX9982lWLuFn2DqC0';
  $.ajax({
    url: 'https://maps.googleapis.com/maps/api/directions/json?origin=place_id:ChIJSydXgVm8woARrlqYCBU_ZRQ&destination=place_id:ChIJeVT19fK9woAR2y9xeIx-CTo&key=' + key,
    dataType: 'jsonp',
    jsonpCallback: 'callback',
    type: 'GET',
    success: function(data) {
      $('#directions_MS').append('Time to Middle School via ' + data.routes[0].summary + ': ' + data.routes[0].legs[0].duration.text);
    }
  });
  */
});
