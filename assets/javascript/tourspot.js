
///////////////////////////////////////////
// Variables
///////////////////////////////////////////
var artists = [];
var cities = [];
var venues = [];

var artistsSearched = [];
var searchCriteria = {
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
    var artistSelected = searchCriteria.artist;

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
        event.preventDefault();
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

                searchCriteria.artist = currentArtist;
                console.log(searchCriteria);
            }
        }

        // TODO: Show info about the artist...



        //clear search field
        $("#input-artist").val("");
    });
   

    $("btn-submit-user-message").on("click", function() {
        event.preventDefault();
        console.log("in submit for contact message");

        // ...

    });

    $("btn-submit-criteria").on("click", function() {
        event.preventDefault();
        console.log("in submit criteria handler");

        // ...

        // retrieve the criteria values
        var artist = $("#input-artist").val().trim();
        var attraction = document.getElementById('input-artist').value;                 // TODO do we need an attraction criteria field?
        var startDate = document.getElementById("input-startdate").value;
        var endDate = document.getElementById("input-enddate").value;
        var eventNumberInput = "10";

        console.log("artist: " + artist + 
            "attraction: " + attraction +
            "start date: " + startDate +
            "end date: " + endDate +
            "event number: " + eventNumberInput
        );

        // make sure user provides atleast one criteria
        if (isEmpty(artist) && isEmpty(attraction) && isEmpty(startDate) && isEmpty(endDate)) {
            return false;
        } 
        

        if (!isEmpty(artist)) {
            artist = ProperCase(artist);

            // add to list of artists searched if not in there already
            if (artistsSearched.indexOf(artist) === -1) {
                // adds to artist search history
                artistsSearched.push(artist);
                console.log(artistsSearched);
            }

            // add the artist to the search criteria object
            searchCriteria.artist = artist;
        }







        console.log(searchCriteria);

        //clear search field                    // TODO add attraction?
        $("#input-artist").val("");
        $("#input-startdate").val("");
        $("#input-enddate").val("");

    });

});


