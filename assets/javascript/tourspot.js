
///////////////////////////////////////////
// Variables
///////////////////////////////////////////
var artists = [];
var cities = [];
var venues = [];

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

    $("#section-1").on("click",function() {
        event.preventDefault();
        
        //TODO: determine if anything happens and/or revise id of selector


    })

    // $("#main-tour-spot").delegate("button.search-button","click", function() {

    //     // prevent the page from reloading
    //     event.preventDefault();

    //     // set up query string for SPOTIFY
    //     var client_id = 'beeec1203a66453e99e3119ef75c13e6';                  // Your client id
    //     var client_secret = '72ac98e2d30a4d74814452b00c6e333c';              // Your secret
    //     var redirect_uri = 'http://www.google.com';                          // Your redirect uri
    //     var scopes = "\'user-read-private user-read-email\'";


    //     $.ajax({
    //         dataType: 'json',
    //         url: url,
    //         data: data,
    //         success: success
    //       });


    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //     }).then(function(response) {
    //         console.log(response);
    
    //         var results = response.data;                    
    
    //         for (var i = 0; i < results.length; i++) {

    //             // TODO: construct the HTML that will be added

    //             // add/modify elements in the DOM
    
    //         };
    
    //     });

    // });

});


