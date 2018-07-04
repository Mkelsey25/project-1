
///////////////////////////////////////////
// Variables
///////////////////////////////////////////
var artistsSearched = [];
var searchCriteria = {
    artist: ''
};
var contactRequests = [];

///////////////////////////////////////////
// JavaScript
///////////////////////////////////////////
function isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
};

function isEmptyObj(obj) {
    return Object.keys(obj).length === 0;
};

function ProperCase(txt) {
    return txt.replace(/\w\S*/g, c => c.charAt(0).toUpperCase() + c.substr(1).toLowerCase());
};

function getSearchCriteria() {
     return searchCriteria
};

///////////////////////////////////////////
// JQuery
///////////////////////////////////////////
$(document).ready (function() {

    /////////////////////////////
    // Handle Search Criteria
    /////////////////////////////

    $("#btn-submit-criteria").on("click", function() {
        event.preventDefault();
        console.log("in submit criteria handler");

        // retrieve the criteria values
        var artist = $("#input-artist").val().trim();
        var attraction = document.getElementById('input-attraction').value;
        var startDate = document.getElementById("input-startdate").value;
        var endDate = document.getElementById("input-enddate").value;
        var eventNumberInput = "10";

        console.log("artist: " + artist + "\n" +
            "attraction: " + attraction + "\n" +
            "start date: " + startDate + "\n" +
            "end date: " + endDate + "\n" +
            "event number: " + eventNumberInput
        );

        // make sure user provides atleast one criteria
        if (isEmpty(artist) && isEmpty(attraction) && isEmpty(startDate) && isEmpty(endDate)) {
            return false;
        } 
        
        /////////////////////////////////////////////////////////////
        // add the search criteria to the search criteria object
        /////////////////////////////////////////////////////////////
        //add the artist
        if (!isEmpty(artist)) {
            artist = ProperCase(artist);

            // add to list of artists searched if not in there already
            if (artistsSearched.indexOf(artist) === -1) {
                // adds to artist search history
                artistsSearched.push(artist);
                console.log(artistsSearched);
            }
            searchCriteria.artist = artist;
        }
        // add the attraction to the search criteria object
        if (!isEmpty(attraction)) {
            attraction = ProperCase(attraction);
            searchCriteria.attraction = attraction;
        }
        // add the start date to the search criteria object
        if (!isEmpty(startDate)) { searchCriteria.startDate = startDate; }
        // add the end date to the search criteria object
        if (!isEmpty(endDate)) { searchCriteria.endDate = endDate; }

        console.log(searchCriteria);

        //clear search fields
        $("#input-artist").val("");
        $("#input-attraction").val("");
        $("#input-startdate").val("");
        $("#input-enddate").val("");

    });

    $("#btn-submit-contact-us").on("click", function() {
        event.preventDefault();
        console.log("in submit for contact message");

        // retrieve the contact info and message
        var contactName = $("#input-contact-name").val().trim();
        var contactEmail = $("#input-email").val().trim();
        var contactMessage = $("#input-message").val().trim();
        var contactRequest = {};

        //add the contact name
        if (!isEmpty(contactName)) {
            contactName = ProperCase(contactName);
            contactRequest.contactName = contactName;
        }

        //add the contact email
        if (!isEmpty(contactEmail)) {
            contactEmail = ProperCase(contactEmail);
            contactRequest.contactEmail = contactEmail;
        }

        //add the contact name
        if (!isEmpty(contactMessage)) {
            contactMessage = ProperCase(contactMessage);
            contactRequest.contactMessage = contactMessage;
        }
        
        // only add the contact request if something was submitted
        if (!isEmptyObj(contactRequest)) {
            contactRequests.push(contactRequest);
        }

        console.log(contactRequests);

        //clear contact request fields
        $("#input-contact-name").val("");
        $("#input-email").val("");
        $("#input-message").val("");
    });
});


