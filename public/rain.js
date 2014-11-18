/*jshint globalstrict: true, browser: true, jquery: true, node: true*/
$(document).ready(function() {
  "use strict";
  getLocation();
});

function getLocation() {
  "use strict";
  if (!navigator.geolocation) {
    var x = document.getElementById("demo");
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
  navigator.geolocation.getCurrentPosition(usePosition);
}

function usePosition(position) {
  "use strict";
  var x = document.getElementById("demo");

  $.get("http://localhost:3000/api/" + parseFloat(position.coords.latitude).toFixed(2) + "/" + parseFloat(position.coords.longitude).toFixed(2), function(data) {
    //    $.get('http://localhost:3000/api/47.6/-100', function(data)

    var location = data.You.loc.toUpperCase();

    switch (data.compare) {
      case 0: // not raing at either
        x.innerHTML = "<h1> IT'S NOT RAINING IN SEATTLE OR IN " + location + ". <BR> BUT FUCK YOU, IT'S MORE BEAUTIFUL HERE. </h1>";
        break;
      case 1: // raining more there, not here
        x.innerHTML = "<h1> UNLIKE " + location + ", ITS NOT RAINING IN SEATTLE, SO FUCK YOU. </h1>";
        break;
      case 2: // raining more in seattle, not there
        x.innerHTML = "<h1> OK YEAH, IT'S RAINING SEATTLE, NOT " + location + ". <BR> FUCK ME. </h1>";
        break;
      case 3: // raining in both
        x.innerHTML = "<h1> RAINING BOTH IN SEATTLE AND " + location + ". <BR> FUCK US BOTH.  </h1>";
        break;
    }
  });
}
