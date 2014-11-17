/*jshint quotmark: null, undef: true, unused: true, globalstrict: true, browser: true, jquery: true, node: true, indent: 2*/
$( document ).ready(function() {

    'use strict';
    //var x = document.getElementById("demo");
    getLocation();

});

//I used information and code from
//http://www.w3schools.com/html/html5_geolocation.asp
//to help me access the browser's geolocation ability
function getLocation() {
    'use strict';
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(usePosition);
    } else {
        var x = document.getElementById("demo");
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function usePosition(position) {
    'use strict';
    var x = document.getElementById("demo");
    var temperature;

    $.get('http://localhost:3000/api/'+ parseFloat(position.coords.latitude).toFixed(2) + '/' + parseFloat(position.coords.longitude).toFixed(2), function(data){
        //    $.get('http://localhost:3000/api/47.6/-100', function(data) 
        //
        //          {
        //data.compare: 
        //1 = raining more there, not here,
        //2 = raining more in seattle, not there.
        //3 = not raining at either
        //0 = raining in both
        var location = data.You.loc.toUpperCase();
        x.innerHTML = data.compare;

        if (data.compare === 1) {
            x.innerHTML = "<h1> UNLIKE " + location + ", ITS NOT RAINING IN SEATTLE, SO FUCK YOU. </h1>";
        } 
        else if (data.compare === 2) {
            x.innerHTML = "<h1> OK YEAH, IT'S RAINING SEATTLE, NOT " + location + ". <BR> FUCK ME. </h1>";
        } 
        else if (data.compare === 3) {
            x.innerHTML = "<h1> IT'S NOT RAINING IN SEATTLE OR IN " + location + ". <BR> BUT FUCK YOU, IT'S MORE BEAUTIFUL HERE. </h1>";
        } 
        else if (data.compare === 0) {
            x.innerHTML = "<h1> RAINING BOTH IN SEATTLE AND " + location + ". <BR> FUCK US BOTH.  </h1>";
        }
        else {
            x.innerHTML =  "<h1> SOMETHING WENT WRONG. SHIT. </h1>" + data;
        }
    });
}