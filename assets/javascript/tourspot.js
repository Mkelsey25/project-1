
///////////////////////////////////////////
// Variables
///////////////////////////////////////////
var artists = [];
var cities = [];
var venues = [];
var currentArtist = '';
var artistSearchList = [];

///////////////////////////////////////////
// JavaScript
///////////////////////////////////////////
function isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
};

function ProperCase(txt) {
    return txt.replace(/\w\S*/g, c => c.charAt(0).toUpperCase() + c.substr(1).toLowerCase());
};

///////////////////////////////////////////
// JQuery
///////////////////////////////////////////
$(document).ready (function() {

    $("#add-artist").on("click", function() {
        console.log("in add artist handler");

        currentArtist = $("#input-artist").val().trim();
        currentArtist = ProperCase(currentArtist);
        console.log("Current artist: ", currentArtist);

        // add to artist search history
        artistSearchList.push(currentArtist);
        console.log(artistSearchList);

        //clear search field
        $("#input-artist").val("");
    });

    $("#section-1").on("click",function() {
        event.preventDefault();
        
        //TODO: determine if anything happens and/or revise id of selector


    })

    // TESTING Giphy
    $("#section-test-giphy").delegate("button#btn-test-giphy","click", function() {

        console.log("in giphy handler");

        // prevent the page from reloading
        event.preventDefault();

        // clear any messges that remain from adding duplicate topics
        $("#message").text("");
        
        // set up query string
        //var topic = $(this).attr("data-topic");
        var topic = "OMG";
        var itemLimit = 10;
        const USER_API_KEY = "qE5VEI7m7vEyr5u78viHHZEPaPRIkgo8";

        var queryURL = "https://api.giphy.com/v1/gifs/search?" +
            "q=" + topic + 
            "&api_key=" + USER_API_KEY +
            "&limit=" + itemLimit;
        console.log(queryURL);

        // clear current results
        // if (document.getElementById("clear-results").checked) {
        //     $("#gifs").empty();
        // }

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
    
            var results = response.data;                                            // data returned from Giphy app
    
            for (var i = 0; i < results.length; i++) {

                /* sample for construction
                <div class="card" style="width:400px">                                               
                    <img class="card-img-top"/>
                    <div class="card-body">
                    <h4 class="card-title">John Doe</h4>
                    <p class="card-text">Some example text some example text. John Doe is an architect and engineer</p>
                    </div>
                </div>
                */

                // construct the HTML that will be added
                var cardDiv = $("<div>");
                cardDiv.addClass("card");

                var gifImageElem = $("<img>");
                gifImageElem.attr("src",results[i].images.fixed_height_still.url);
                if (!isEmpty(results[i].images.title)) {
                    gifImageElem.attr("alt", results[i].images.title.trim());
                } else {
                    gifImageElem.attr("alt", "GIF image");
                };
                gifImageElem.attr("data-static",results[i].images.fixed_height_still.url);
                gifImageElem.attr("data-animated",results[i].images.fixed_height.url);
                gifImageElem.addClass("card-img-top animate");                                      // img-gif

                var cardBodyDiv = $("<div>");
                cardBodyDiv.addClass("card-body");

                var titleElem =  $("<h5>");
                if (!isEmpty(results[i].title)) {
                    titleElem.text(ProperCase(results[i].title.trim()));                          // Capitalize the first letter of every word
                } else {
                    titleElem.text("NONE");
                };

                var ratingElem =  $("<p>");
                ratingElem.addClass("mb-0");
                if (!isEmpty(results[i].rating)) {
                    ratingElem.text("Rated " + results[i].rating.trim().toUpperCase());
                } else {
                    ratingElem.text("Not Rated");
                };

                cardBodyDiv.append(titleElem);
                cardBodyDiv.append(ratingElem);
                cardDiv.append(gifImageElem);
                cardDiv.append(cardBodyDiv);

                // add the elements to the DOM
                $("#gifs").prepend(cardDiv);
    
            };
    
        });

    });

    // TEST END

    $("#section-test-spotify").delegate("button#btn-test-spotify","click", function() {

        // prevent the page from reloading
        event.preventDefault();
        console.log("in my handler");

        //get the arist selected
        var inputData = $("#input-artist").val().trim();
        $("#input-artist").val("");

        // set up query string for SPOTIFY
        var client_id = 'beeec1203a66453e99e3119ef75c13e6';                  // Your client id
        var client_secret = '72ac98e2d30a4d74814452b00c6e333c';              // Your secret
        var redirect_uri = 'http://www.google.com';                          // Your redirect uri
        var scopes = "\'user-read-private user-read-email\'";


    //     $.ajax({
    //         dataType: 'json',
    //         url: url,
    //         data: data,
    //         success: success
    //       });


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
    
            var results = response.data;                    
    
            for (var i = 0; i < results.length; i++) {

                // TODO: construct the HTML that will be added

                // add/modify elements in the DOM
    
            };
    
        });

    });

});


