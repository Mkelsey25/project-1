
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