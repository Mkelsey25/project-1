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