
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

function getSearchCriteria() {
    //get the arist selected
    var artistSelected = searchObject.artist;

    return artistSelected;
};

///////////////////////////////////////////
// JQuery
///////////////////////////////////////////
$(document).ready (function() {

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
   
});


