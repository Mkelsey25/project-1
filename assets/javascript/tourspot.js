
///////////////////////////////////////////
// Variables
///////////////////////////////////////////
var artists = [];
var cities = [];
var venues = [];
var artistsSearched = [];
var searchObject = {
    artist: ''
};

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

    function getSearchCriteria() {
        //get the arist selected
        var artistSelected = searchObject.artist;
    
        return artistSelected;
    };

    /////////////////////////////
    // Handle Search Criteria
    /////////////////////////////
    $("#add-artist").on("click", function() {
        console.log("in add artist handler");

        var currentArtist = $("#input-artist").val().trim();

        // if a value is given
        if (!isEmpty(currentArtist)) {

            currentArtist = ProperCase(currentArtist);
            console.log("Current artist (proper cased): ", currentArtist);

            // if not already in the list
            if (artistsSearched.indexOf(currentArtist) === -1) {
                // adds to artist search history
                artistsSearched.push(currentArtist);
                console.log(artistsSearched);

                searchObject.artist = currentArtist;
                console.log(searchObject);
            }
        }

        // TODO: Show info about the artist...



        //clear search field
        $("#input-artist").val("");
    });

    ///////////////////////
    // TEST Spotify
    ///////////////////////
    $("#section-test-spotify").delegate("button#btn-test-spotify","click", function() {

        // prevent the page from reloading
        event.preventDefault();
        console.log("in Spotify handler");

        // get the criteria for the search
        var inputData = getSearchCriteria();
        console.log("Retrieved Artist: " + inputData);

        // SPOTIFY api
        var client_id = 'beeec1203a66453e99e3119ef75c13e6';                  // Your client id
        var client_secret = '72ac98e2d30a4d74814452b00c6e333c';              // Your secret
        var redirect_uri = 'http://www.google.com';                          // Your redirect uri
        var scopes = "\'user-library-read user-follow-read user-read-birthdate playlist-read-private user-read-currently-playing user-read-recently-played\'";

        // endpoint query parameters
        var endpoint = "https://api.spotify.com/v1/search";
        var q = '';
        var type = '';
        var market = '';
        var limit = 3;
        var offset = 0;
        //var oToken = '';

        //"https://api.spotify.com/v1/search?q=Muse&type=track%2Cartist&market=US&limit=10&offset=5" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer ..."
        var queryURL = endpoint + '?' +
                        "q=" + q +
                        "&type=" + type +
                        "&market=" + market +
                        "&limit=" + limit +
                        "&offset=" + offset;


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
    
    ///////////////////////
    // TEST D3
    ///////////////////////
    $("#section-test-d3").delegate("button#btn-test-d3","click", function() {

        console.log("in D3 handler");

        // prevent the page from reloading
        event.preventDefault();


    });

    ///////////////////////
    // TEST Giphy
    ///////////////////////
    $("#section-test-giphy").delegate("button#btn-test-giphy","click", function() {

        console.log("in giphy handler");

        // prevent the page from reloading
        event.preventDefault();

        // set up query string
        //var topic = $(this).attr("data-topic");
        var topic = "dogs";
        var itemLimit = 2;
        const USER_API_KEY = "qE5VEI7m7vEyr5u78viHHZEPaPRIkgo8";

        var queryURL = "https://api.giphy.com/v1/gifs/search?" +
            "q=" + topic + 
            "&api_key=" + USER_API_KEY +
            "&limit=" + itemLimit;
        console.log(queryURL);

        // clear current results
        // if (document.getElementById("clear-results").checked) {
            // $("#gifs").empty();
        // }

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
    
            var results = response.data;                                            // data returned from Giphy app
    
            for (var i = 0; i < results.length; i++) {

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

});


