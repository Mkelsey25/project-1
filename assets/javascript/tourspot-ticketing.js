/*
    ///////////////////////
    // TEST Ticketmaster
    ///////////////////////
    $("#section-test-ticketmaster").delegate("button#btn-test-ticketmaster","click", function() {

        console.log("in Ticketmaster handler");

        // prevent the page from reloading
        event.preventDefault();

        
    });
    
    ///////////////////////
    // TEST Songkick
    ///////////////////////
    $("#section-test-songkick").delegate("button#btn-test-songkick","click", function() {

        console.log("in Songkick handler");

        // prevent the page from reloading
        event.preventDefault();

        
    });
    */
   //Promoter wishing to find venue locations of last tour input goes here. Attraction= artist or band name
$(document).ready (function() {
    function displayLocation() {
        var attractionInput = document.getElementById('input-artist').value;
        var eventNumberInput = "10";
        var startDate = document.getElementById('input-startdate').value;
        var endDate = document.getElementById('input-enddate').value;

        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=" + eventNumberInput + "&keyword=" + attractionInput + "&startDateTime=" + startDate + "T11:46:00Z" + "&endDateTime=" + endDate + "T11:46:00Z" + "&apikey=GLNMcHnx3wplCbjqx5KCTh995mHbpnCo";
        console.log(queryURL);
        $.ajax({
            method: "GET",
            url: queryURL
        })
        .then(function(response) {
               console.log(response._embedded);
               for( var i = 0; i < response._embedded.events.length; i++) {
                var locationDiv = $("<div class='location'>");
                console.log(locationDiv);
                var latitude = response._embedded.events[i]._embedded.venues[0].location.latitude;
                console.log(latitude);
                var longitude = response._embedded.events[i]._embedded.venues[0].location.longitude;
                console.log(longitude);
                var displayLatitude = $("<p>").text("Latitude: " + latitude);
                var displayLongitude = $("<p>").text("Longitude: " + longitude); 
                 //display lat and long
                locationDiv.append(displayLatitude);
                locationDiv.append(displayLongitude);
                        
            }
        })
    }
    //The lattitude and longitude will appear after the test button is clicked
    $(document).on("click", "#btn-test-ticketmaster", displayLocation);
});