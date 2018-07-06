
//////////////////////////////////////
// Ticketing API -- Ticketmaster
//////////////////////////////////////
//Create map    
 var coordinates = [];
    var venueQuery = [];

/*var mymap = L.map('mapid').setView([33.749, -84.390], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox.streets',
accessToken: 'pk.eyJ1IjoibWtlbHNleTI1IiwiYSI6ImNqajY5NTdnZzF5dzkzbHVvYTJiNXluZHoifQ.CAh-gJ-yNMaIjlp2kntkqA'
}).addTo(mymap);
for (var i = 0; i < coordinates.length; i++) {
    marker = new L.marker([coordinates[i][0], coordinates[i][1]])
        .bindPopup(coordinates[i][0])
        .addTo(map); }*/

// $(document).ready (function() {

    ////////////////////////////////////
    // functions
    ////////////////////////////////////

    //Promoter wishing to find venue locations of last tour input goes here. Attraction= artist or band name

    
    function displayLocation() {
        var attractionInput = document.getElementById('input-artist').value;
        var startDate = document.getElementById('input-startdate').value;
        var endDate = document.getElementById('input-enddate').value;

        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + attractionInput + "&startDateTime=" + startDate + "&endDateTime=" + endDate + "&apikey=GLNMcHnx3wplCbjqx5KCTh995mHbpnCo";
        //console.log(queryURL);
        $.ajax({
            method: "GET",
            url: queryURL
        })
        .then(function(response) {
               //console.log(response._embedded);
               for( var i = 0; i < response._embedded.events.length; i++) {
                var latitude = response._embedded.events[i]._embedded.venues[0].location.latitude;
                //console.log(latitude);
                var longitude = response._embedded.events[i]._embedded.venues[0].location.longitude;
                //console.log(longitude);
                var venueCoordinates = [latitude, longitude];
                coordinates.push(venueCoordinates);
                console.log(venueCoordinates);
                //console.log(lats);
                //console.log(longs);


                        
            }
            //createQueryUrls();
            //accessVenueInfo();
        })
    }

    function createQueryUrls() {
        for(var i = 0; i < lats.length; i++) {
            var queryURL2 = "https://app.ticketmaster.com/discovery/v2/venues.json?latlong=" + lats[i] + "," + longs[i] + "&apikey=GLNMcHnx3wplCbjqx5KCTh995mHbpnCo"; 
            venueQuery.push(queryURL2);
            //console.log(venueQuery);

        }
    }

    function accessVenueInfo() {
        for(var i = 0; i < venueQuery.length; i++) {
            $.ajax({
                method: "GET",
                url: venueQuery[i]
            })
            .then(function(response) {
                for(var i = 0; i < response._embedded.venues.length; i++) {
                    var potentialVenueName = response._embedded.venues[i].name;
                    console.log(potentialVenueName);
                }
            })
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    // Function: loadTicketData 
    // Description: Load event data based on the search criteria provided
    // Author:  Jenni
    ////////////////////////////////////////////////////////////////////////////////////////
    function loadTicketMasterEvents() {

        // var apikey = 'GLNMcHnx3wplCbjqx5KCTh995mHbpnCo';     // Morgan
        var apikey = '3iV9ANntI8jG3s95mMHrG3M3833bPskR';        // Jenni

        var artist = encodeURI(searchCriteria.artist);
        // var attractionInput = encodeURI(searchCriteria.attraction);
        var eventNumberInput = encodeURI(searchCriteria.resultLimit);
        var startDate = (isEmpty(searchCriteria.startDate) ? '' : new Date(searchCriteria.startDate));
        var endDate = (isEmpty(searchCriteria.endDate) ? '' : new Date(searchCriteria.endDate));
        var sortOption = "date,name,asc";

        // which fields are required -- 
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json";
        var queryParm = "?size=" + eventNumberInput
                    + "&sort=" + sortOption
                    // + "&countryCode=US"
                    + "&apikey=" + apikey;
                    // + "&keyword=" + artist 
                    // + "&startDateTime=" + startDate.toISOString().replace(/\.\d+Z/,'Z') 
                    // + "&endDateTime=" + endDate.toISOString().replace(/\.\d+Z/,'Z') 
                    // + "&sort=" + sortOption
                    // + "&apikey=" + apikey;

        if (!isEmpty(artist)) {
            queryParm = queryParm + "&keyword=" + artist;
        }
        if (!isEmpty(startDate)) {
            queryParm = queryParm + "&startDateTime=" + startDate.toISOString().replace(/\.\d+Z/,'Z');
        }
        if (!isEmpty(endDate)) {
            queryParm = queryParm + "&endDateTime=" + endDate.toISOString().replace(/\.\d+Z/,'Z');
        }

        console.log(queryURL + queryParm);

        // NOTE: "Query param with date must be of valid format YYYY-MM-DDTHH:mm:ssZ {example: 2020-08-01T14:00:00Z }",
        // SAMPLE queryUrl call that works: //"https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=3iV9ANntI8jG3s95mMHrG3M3833bPskR",
        $.ajax({
            type: "GET",
            url: queryURL + queryParm,              
            async: true,
            dataType: "json",
            success: function(response) {

                // Parse the response.
                console.log("Response:");
                console.log(response);

                if (!isEmptyObj(response._embedded))
                {
                    if (!isEmptyObj(response._embedded.events)) {

                        var events = response._embedded.events;
                        htmlShowEventList(events);

                        for (var i=0; i < events.length; i++) {
                            //htmlShowVenueList();                            // TODO show and where
                        }

                    }
                }
            },
            error: function(xhr, status, err) {
                // alert to error
                console.log('API not responsive to the request.');
                console.log(xhr);
                console.log(status);
                console.log(err);
            }
          });
   
    }

    function htmlShowEventList(events) {

        console.log("in show html event list");

        // clear out prior entries
        $("#event-list").empty();

        // build hmtl to show event list in a table
        for (var i=0; i < events.length; i++) {

            var tr = $("<tr>");

            // load table
            if (events[i].type === "event") {

                console.log("Event Item html:");
                console.log(events[i]);

                //event name
                var tdName = $("<td>");
                tdName.attr("id","td-event-name-display");
                tdName.attr("scope","row");
                tdName.text(events[i].name);

                //genre name
                var tdGenre = $("<td>");
                tdGenre.attr("id","td-event-genre-name-display");
                if (!isEmpty(events[i].classifications) && !isEmpty(events[i].classifications[0].genre)) {
                    if (events[i].classifications[0].genre.name === "Undefined") {
                        tdGenre.text("");
                    } else {
                        tdGenre.text(events[i].classifications[0].genre.name);
                    }
                }

                //start date and time
                var tdStartDate = $("<td>");
                var tdStartTime = $("<td>");
                tdStartDate.attr("id","td-event-local-start-date-display");
                tdStartTime.attr("id","td-event-local-start-time-display");
                if (!isEmpty(events[i].dates) && !isEmpty(events[i].dates.start)) {


                    var startDate = new Date(events[i].dates.start.localDate);
                    // var startTime = new Date(events[i].dates.start.localTime);
                    //start date
                    tdStartDate.text(startDate.toLocaleString());
                    //start time    .toLocaleTimeString()
                    tdStartTime.text(events[i].dates.start.localTime);
                }

                //timezone and status
                var tdTimezone = $("<td>");
                tdTimezone.attr("id","td-event-timezone-display");
                var tdStatus = $("<td>");
                tdStatus.attr("id","td-event-date-status-display");
                var tdPromotionUrl = $("<td>");
                tdPromotionUrl.attr("id","td-event-url-display");
                if (!isEmpty(events[i].dates)) {
                    tdTimezone.text(events[i].dates.timezone);
                    if (!isEmpty(events[i].dates.status)) { tdStatus.text(events[i].dates.status.code); }
                }

                // url for tickets
                console.log(".....");
                console.log(events[i].url);
                var urlA = $("<a>");
                urlA.attr("href",events[i].url);
                urlA.attr("target","_blank");
                urlA.attr("rel","noopener");
                urlA.text("Tickets");
                tdPromotionUrl.append(urlA);

                // events[i].id;
                // events[i].classifications.genre.id;

                tr.append(tdName);
                tr.append(tdGenre);
                tr.append(tdStartDate);
                tr.append(tdStartTime);
                tr.append(tdTimezone);
                tr.append(tdStatus);
                tr.append(tdPromotionUrl);

                $("#event-list").append(tr);

            }
        }
    };

    // TODO build hmtl to show venue list in a table
    function htmlShowVenueList(venues) {

        console.log("in show html venue list");

        // clear out prior entries
        $("#venue-list").empty();

        // build html to show venues in a table
        for (var i=0; i < venues.length; i++) {
            
            // load table
            if (venues[i].type === "venue") {
                console.log(venues[i]);
                // venues[i].id;
                // venues[i].name;
                // venues[i].address;
                // venues[i].city;
                // venues[i].country;
                // venues[i].postalCode;
                // venues[i].country;                  /* object with name and countryCode */
                // venues[i].url;
                // venues[i].upcomingEvents._total;
            }
        }
    };

    ////////////////////////////////////
    // event handlers -- TODO remove, 
    // code is executed when search button is clicked
    ////////////////////////////////////

    //The lattitude and longitude will appear after the test button is clicked
     $(document).on("click", "#btn-test-ticketmaster", displayLocation);
    
    // load ticketing data
    // $(document).on("click", "#btn-test-ticketmaster", loadTicketMasterEvents.bind(window));

// });
