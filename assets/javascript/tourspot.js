
///////////////////////////////////////////
// Variables
///////////////////////////////////////////
var searchHistory = [];
var searchCriteria = {
    artist: '',
    venue: '',
    resultLimit: 1,
    startDate: '',
    endDate: '',
    init: function()  {
        this.artist = '';
        this.venue = '';
        this.resultLimit = 1;
        this.startDate = '';
        this.endDate = '';
    }
};
var contactRequests = [];

///////////////////////////////////////////
// JavaScript
///////////////////////////////////////////
function isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
};

function isEmptyObj(obj) {
    return (obj === undefined || obj == null || Object.keys(obj).length === 0);
};

function ProperCase(txt) {
    return txt.replace(/\w\S*/g, c => c.charAt(0).toUpperCase() + c.substr(1).toLowerCase());
};

function getSearchCriteria() {
     return searchCriteria
};

function addSearchHistory(searchData) {
    var obj = {};
    obj.artist = searchCriteria.artist;
    obj.venue = searchCriteria.venue;
    obj.resultLimit = searchCriteria.resultLimit;
    obj.startDate = searchCriteria.startDate;
    obj.endDate = searchCriteria.endDate;

    searchHistory.push(obj);
    console.log("Search History: ");
    console.log(searchHistory);
}

function loadPageWithData() {
    event.preventDefault();
    console.log("in submit criteria handler");

    // retrieve the criteria values
    var artist = $("#input-artist").val().trim();
    var venue = document.getElementById('input-venue').value;
    var startDate = document.getElementById("input-startdate").value;
    var endDate = document.getElementById("input-enddate").value;
    var resultLimit = 10;

    console.log("artist: " + artist + "\n" +
        "venue: " + venue + "\n" +
        "start date: " + startDate + "\n" +
        "end date: " + endDate + "\n" +
        "results limit: " + resultLimit
    );

    // make sure user provides atleast one criteria
    if (isEmpty(artist) && isEmpty(venue) && isEmpty(startDate) && isEmpty(endDate)) {
        return false;
    } 
    
    // prepare to reset the search criteria object
    searchCriteria.init();

    /////////////////////////////////////////////////////////////
    // add the search criteria to the search criteria object
    /////////////////////////////////////////////////////////////
    //add the artist
    if (!isEmpty(artist)) {
        artist = ProperCase(artist);
        searchCriteria.artist = artist;
    }

    // add the venue to the search criteria object
    if (!isEmpty(venue)) {
        venue = ProperCase(venue);
        searchCriteria.venue = venue;
    }

    // add the start date to the search criteria object
    if (!isEmpty(startDate)) { searchCriteria.startDate = startDate; }

    // add the end date to the search criteria object
    if (!isEmpty(endDate)) { searchCriteria.endDate = endDate; }

    // add the results limit
    searchCriteria.resultLimit = resultLimit;

    console.log("Criteria stored in searchCriteria object:");
    console.log(searchCriteria);

    // add criteria to the search history
    addSearchHistory(searchCriteria);

    //clear search fields
    $("#input-artist").val("");
    $("#input-venue").val("");
    $("#input-startdate").val("");
    $("#input-enddate").val("");

    //////////////////////////////
    // LOAD page data
    //////////////////////////////
    loadTicketMasterEvents();
    //geopoint, lat, long
    loadTicketMasterVenues('','33.776376','-84.389587');
}

///////////////////////////////////////////
// JQuery
///////////////////////////////////////////
$(document).ready (function() {

    //////////////////////////////////
    // Add Search Criteria and Load
    //////////////////////////////////
    $("#btn-submit-criteria").on("click", loadPageWithData.bind(window));

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
        if (!isEmpty(contactEmail)) { contactRequest.contactEmail = contactEmail; }

        //add the contact name
        if (!isEmpty(contactMessage)) { contactRequest.contactMessage = contactMessage; }
        
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


