
//////////////////////////////////////
// Ticketing API -- Ticketmaster
//////////////////////////////////////

// $(document).ready (function() {

    ////////////////////////////////////
    // functions
    ////////////////////////////////////

    //Promoter wishing to find venue locations of last tour input goes here. Attraction= artist or band name
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

    ////////////////////////////////////////////////////////////////////////////////////////
    // Function: loadTicketData 
    // Description: Load event data based on the search criteria provided
    // Author:  Jenni
    ////////////////////////////////////////////////////////////////////////////////////////
    function loadTicketData() {

        // var apikey = 'GLNMcHnx3wplCbjqx5KCTh995mHbpnCo';     // Morgan
        var apikey = '3iV9ANntI8jG3s95mMHrG3M3833bPskR';        // Jenni

        var artist = encodeURI(searchCriteria.artist);
        // var attractionInput = encodeURI(searchCriteria.attraction);
        var eventNumberInput = encodeURI(searchCriteria.resultLimit);
        var startDate = (isEmpty(searchCriteria.startDate) ? '' : new Date(searchCriteria.startDate));
        var endDate = (isEmpty(searchCriteria.endDate) ? '' : new Date(searchCriteria.endDate));
        var sortOption = "date,name,desc";

        // which fields are required -- 
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json";
        var queryParm = "?size=" + eventNumberInput
                    + "&sort=" + sortOption
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

        console.log(queryURL);

        // NOTE: "Query param with date must be of valid format YYYY-MM-DDTHH:mm:ssZ {example: 2020-08-01T14:00:00Z }",
        $.ajax({
            type: "GET",
            url: queryURL + queryParm,    //"https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=3iV9ANntI8jG3s95mMHrG3M3833bPskR",
            async: true,
            dataType: "json",
            success: function(response) {

                // Parse the response.
                console.log(response);

                if (!isEmptyObj(response._embedded))
                {
                    var data = response._embedded;

                    for (var i=0; i < response._embedded.events.length; i++) {

                    //     var locationDiv = $("<div class='location'>");
                    //     console.log(locationDiv);
                        
                    //     var latitude = response._embedded.events[i]._embedded.venues[0].location.latitude;
                    //     console.log(latitude);
                        
                    //     var longitude = response._embedded.events[i]._embedded.venues[0].location.longitude;
                    //     console.log(longitude);
                        
                    //     var displayLatitude = $("<p>").text("Latitude: " + latitude);
                    //     var displayLongitude = $("<p>").text("Longitude: " + longitude); 
                        
                    //     //display lat and long
                    //     locationDiv.append(displayLatitude);
                    //     locationDiv.append(displayLongitude);
                                
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

    ////////////////////////////////////
    // event handlers
    ////////////////////////////////////

    //The lattitude and longitude will appear after the test button is clicked
    // $(document).on("click", "#btn-test-ticketmaster", displayLocation);
    
    // load ticketing data
    $(document).on("click", "#btn-test-ticketmaster", loadTicketData.bind(window));

// });
