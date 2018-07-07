
//////////////////////////////////////
// Ticketing API -- Ticketmaster
//////////////////////////////////////

//Create Map 


 //$(document).ready (function() {

    ////////////////////////////////////
    // functions
    ////////////////////////////////////

    //Promoter wishing to find venue locations of last tour input goes here. venue= artist or band name
    //var lats = [];
    //var longs = [];
    var venueQuery = [];
    var locationsP = [];
    var locationsA = [];
    
    function displayLocation() {
        var venueInput = document.getElementById('input-artist').value;
        var startDate = document.getElementById('input-startdate').value;
        var endDate = document.getElementById('input-enddate').value;

        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + venueInput + "&startDateTime=" + startDate + "&endDateTime=" + endDate + "&apikey=GLNMcHnx3wplCbjqx5KCTh995mHbpnCo";
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
                lats.push(latitude);
                longs.push(longitude);
                //console.log(lats);
                //console.log(longs);

                        
            }
            createQueryUrls();
            accessVenueInfo();
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
        var venue = encodeURI(searchCriteria.venue);
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
        var hasKeyword = false;

        if (!isEmpty(artist)) {
            queryParm = queryParm + "&keyword=" + artist;
            hasKeyword = true;
        }

        if (!isEmpty(venue)) {
            if (hasKeyword) {
                queryParm = queryParm + "," + venue;
            } else {
                queryParm = queryParm + "&keyword=" + venue;
            }
        }

        if (!isEmpty(startDate)) {
            queryParm = queryParm + "&startDateTime=" + startDate.toISOString().replace(/\.\d+Z/,'Z');
        }
        if (!isEmpty(endDate)) {
            queryParm = queryParm + "&endDateTime=" + endDate.toISOString().replace(/\.\d+Z/,'Z');
        }

        console.log(queryURL + queryParm);

        ////////////////////////////
        // CLEAR CURRENT UI DATA
        ////////////////////////////
        // clear out prior entries
        $("#event-list").empty();
        $("#venue-list").empty();

        // NOTE: "Query param with date must be of valid format YYYY-MM-DDTHH:mm:ssZ {example: 2020-08-01T14:00:00Z }",
        // SAMPLE queryUrl call that works: //"https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=3iV9ANntI8jG3s95mMHrG3M3833bPskR",
        $.ajax({
            type: "GET",
            url: queryURL + queryParm,
            useDefaultXhrHeader: false,              
            async: true,
            dataType: "json",
            success: function(response) {

                // Parse the response.
                console.log("Events Response:");
                console.log(response);

                if (!isEmptyObj(response._embedded))
                {
                    if (!isEmptyObj(response._embedded.events)) {

                        var events = response._embedded.events;
                        htmlShowEventList(events);

                        // we aren't showing the venue for EACH of the events returned...
                        // we are showing the venues that match the search criteria
                        // for (var i=0; i < events.length; i++) {
                            //htmlShowVenueList();                            // TODO show and where
                        // }

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

        ////////////////////////////////////////////////////////////////////////////////////////
    // Function: loadVenueData 
    // Description: Load venue data based on the search criteria provided
    // Author:  Jenni
    ////////////////////////////////////////////////////////////////////////////////////////
    function loadTicketMasterVenues(geo, lat, long) {

        // var apikey = 'GLNMcHnx3wplCbjqx5KCTh995mHbpnCo';     // Morgan
        var apikey = '3iV9ANntI8jG3s95mMHrG3M3833bPskR';        // Jenni

        // VENUE parameters
        var venue = encodeURI(searchCriteria.venue);
        var eventNumberInput = encodeURI(searchCriteria.resultLimit);
        var sortOption = "relevance,desc";
        var radius = '60';
        var unit = 'miles';
        var locale = 'en-us,en,*';
        var geoPoint = geo;
        var latitude = lat;
        var longitude = long;

        // which fields are required -- 
        var queryURL = "https://app.ticketmaster.com/discovery/v2/venues.json";
        var queryParm = "?size=" + eventNumberInput
                    + "&sort=" + sortOption
                    // + "&countryCode=US"
                    + "&apikey=" + apikey;
        var hasKeyword = false;

        if (!isEmpty(venue)) {
            if (hasKeyword) {
                queryParm = queryParm + "," + venue;
            } else {
                queryParm = queryParm + "&keyword=" + venue;
            }
        }

        if (!isEmpty(radius)) {
            queryParm = queryParm + "&radius=" + radius;
            queryParm = queryParm + "&unit=" + unit;
        }

        if (!isEmpty(geoPoint)) {
            queryParm = queryParm + "&geoPoint=" + geoPoint;
        } else if (!isEmpty(latitude) && !isEmpty(longitude)) {
            queryParm = queryParm + "&latlong=" + latitude + "," + longitude;
        }

        queryParm = queryParm + "&locale=" + locale;

        console.log(queryURL + queryParm);

        // NOTE: "Query param with date must be of valid format YYYY-MM-DDTHH:mm:ssZ {example: 2020-08-01T14:00:00Z }",
        // SAMPLE queryUrl call that works: "https://app.ticketmaster.com/discovery/v2/venues.json?keyword=UCV&apikey=52e5tuXLDijK8TthU0gwPFpfnfdUJMgq",
        $.ajax({
            type: "GET",
            url: queryURL + queryParm,  
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            useDefaultXhrHeader: false,                         //important, will get 429 without it when location info is passed        
            async: true,
            dataType: "json",
            success: function(response) {
                        // Parse the response.
                        console.log("Venue Response:");
                        console.log(response);

                        if (!isEmptyObj(response._embedded)) {
                            var venues = response._embedded.venues;
                            htmlShowVenueList(venues); 
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

    //////////////////////////
    // HTML snippets
    //////////////////////////
    function htmlShowEventList(events) {

        console.log("in show html event list");

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


                    var startDate = new Date(events[i].dates.start.localDate.replace(/-/g, '\/'));

                    console.log(startDate);
                    // var startTime = new Date(events[i].dates.start.localTime);
                    //start date
                    tdStartDate.text(startDate.toLocaleDateString());

                    console.log(startDate);
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

                //event location (leaflet)
                var locationA = [];
                locationA.push(events[0]._embedded.venues[0].location.latitude, events[0]._embedded.venues[0].location.longitude, events[0].embedded.venues[0].name);
                console.log("LOCATION ARRAY");
                console.log(locationA);
            }
        }
        displayVenueMarkers();  
    };
    
    function displayVenueMarkers() {
        var mymap = L.map('mapid').setView([33.749, -84.390], 13);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibWtlbHNleTI1IiwiYSI6ImNqajY5NTdnZzF5dzkzbHVvYTJiNXluZHoifQ.CAh-gJ-yNMaIjlp2kntkqA'
        }).addTo(mymap);            
        var latit = locationA[0];
        var longi = locationA[1];
        var popUpText = locationA[2];
        console.log(latit);
        console.log(longi);
        var markerLocation = new L.LatLng(latit, longi);
        var marker = new L.Marker(markerLocation);
        mymap.addLayer(marker);
        marker.bindPopup(popUpText);
    }
    mymap.fitBounds(locationA);
   // $("#btn-submit-criteria").click(this.setStyle({fillOpacity: 0.2}));



    // TODO build hmtl to show venue list in a table
    function htmlShowVenueList(venues) {

        console.log("in show html venue list");

        // build html to show venues in a table
        for (var i=0; i < venues.length; i++) {
            
            var tr = $("<tr>");

            // load table
            if (venues[i].type === "venue") {

                console.log("Venue Item html:");
                console.log(venues[i]);

                //venue name
                var tdName = $("<td>");
                tdName.attr("id","td-venue-name-display");
                tdName.attr("scope","row");
                tdName.text(venues[i].name);

                //address
                if (!isEmpty(venues[i].address)) {
                    var tdAddress = $("<td>");
                    tdAddress.attr("id","td-venue-address-display");
                    tdAddress.text(venues[i].address.line1);
                }

                //venue city
                var tdCity = $("<td>");
                tdCity.attr("id","td-venue-city-display");
                tdCity.text(venues[i].city.name);

                // url for Venue
                var tdVenueUrl = $("<td>");
                tdVenueUrl.attr("id","td-venue-url-display");

                var urlA = $("<a>");
                urlA.attr("href",venues[i].url);
                urlA.attr("target","_blank");
                urlA.attr("rel","noopener");
                urlA.text("Buy Tickets");
                tdVenueUrl.append(urlA);

                //venue locations
                //Morgan- added location array to display on leaflet map
                var locationP = [];
                locationP.push(venues[i].location.latitude, venues[i].location.longitude, venues[i].name);
                locationsP.push(locationP);
                console.log("LOCATION ARRAY");
                console.log(locationsP);


                var tdLocation = $("<td>");
                tdLocation.attr("id","td-venue-location-display");
                if (!isEmpty(venues[i].location)) {
                    tdLocation.text(venues[i].location.latitude + "," + venues[i].location.longitude);
                    console.log("LOCATION INFO");
                }

                //image
                var tdImage = $("<td>");
                tdImage.attr("id","td-venue-image-display");
                if (!isEmpty(venues[i].images)) {
                    //TODO figure out what to do with the image ??
                    // tdLocation.text(venues[i].images[0].url);
                    var img = $("<img>");
                    img.attr("src",venues[i].images[0].url);
                    img.attr("alt","Venue Image");
                    img.addClass("img-fluid");
                    tdImage.append(img);
                }
                
                // venues[i].id;
                // venues[i].country;
                // venues[i].postalCode;
                // venues[i].country;                  /* object with name and countryCode */
                // venues[i].upcomingEvents._total;

                tr.append(tdName);
                tr.append(tdAddress);
                tr.append(tdCity);
                tr.append(tdVenueUrl);
                tr.append(tdLocation);
                tr.append(tdImage);

                $("#venue-list").append(tr);
            }
        }
        displayMarkers();
    };
    
    //Morgan- added function that creates map and displays potential venue locations
    function displayMarkers() {
        var mymap = L.map('mapid').setView([22.749, -74.390], 13);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibWtlbHNleTI1IiwiYSI6ImNqajY5NTdnZzF5dzkzbHVvYTJiNXluZHoifQ.CAh-gJ-yNMaIjlp2kntkqA'
        }).addTo(mymap);            
        for(var i = 0; i < locationsP.length; i++) {
        var latit = locationsP[i][0];
        var longi = locationsP[i][1];
        var popUpText = locationsP[i][2];
        console.log(latit);
        console.log(longi);
        var markerLocation = new L.LatLng(latit, longi);
        var marker = new L.Marker(markerLocation);
        mymap.addLayer(marker);
        marker.bindPopup(popUpText);
        
    }
    mymap.fitBounds(locationsP);
    //$("#btn-submit-criteria").click(this.setStyle({fillOpacity: 0.2}));
    }

    ////////////////////////////////////
    // event handlers -- TODO remove, 
    // code is executed when search button is clicked
    ////////////////////////////////////

    //The lattitude and longitude will appear after the test button is clicked
     //$(document).on("click", "#btn-test-ticketmaster", displayLocation);
    
    // load ticketing data
    // $(document).on("click", "#btn-test-ticketmaster", loadTicketMasterEvents.bind(window));

// });
