//wrap in IIFE
(function () {

    ///////////////////////
    // TEST Spotify
    ///////////////////////
   
    $("#section-test-spotify").delegate("button#btn-test-spotify","click", function() {
    // $("#btn-submit-criteria").on("click", function() {

        // prevent the page from reloading
        event.preventDefault();
        console.log("in Spotify handler");

        // get the criteria for the search
        var inputData = getSearchCriteria();
        console.log("Get Search Data: ");
        console.log(inputData.artist);

        // // 1. have your application request authorization
        // //  GET https://accounts.spotify.com/authorize
        // // ?client_id=
        // // &response_type=token
        // // &redirect_uri=

        // // endpoint query parameters
        // var endpoint = "https://accounts.spotify.com/authorize";
        // var clientId = 'beeec1203a66453e99e3119ef75c13e6';            // the unique identifier for my application (public)
        // var responseType ='token';
        // var redirectUri = 'https://jmcoleman.github.io';              // Your redirect uri
        

        //////////////////////////////
        // Get the access hash
        //////////////////////////////
        const hash = window.location.hash
            .substring(1)
            .split('&')
            .reduce(function (initial, item) {
                if (item) {
                    var parts = item.split('=');
                    initial[parts[0]] = decodeURIComponent(parts[1]);
                }
                return initial;
            }, {});
        window.location.hash = '';

        // Set token
        let _token = hash.access_token;

        /////////////////////////////
        // auth call
        /////////////////////////////
        const authEndpoint = 'https://accounts.spotify.com/authorize';
        const clientId = 'beeec1203a66453e99e3119ef75c13e6';
        const responseType ='token';
        // const redirectUri = 'https://jmcoleman.github.io';
        const redirectUri = 'https://mkelsey25.github.io/project-1/';
        const scopes = [
            'user-read-birthdate',
            'user-read-email',
            'user-read-private'
        ];

        // hard coded the token for now
        // TODO this needs to go back to a different redirect url... update the spotify app and my variable above for this
        // _token='BQB0Cf4QGzQU3ugM1ViDVtWdEYmFC096Xows0qVppM7rUHSlDQQN87eFiHTzIQwcLqIPsqr2ymgssnHPJvX8YKtdmBX-efP9y5Y_wWi6JD_P7BnhG5BzytYp1-08dkL2ab51VhtdCVDY5IhUME-5RoLystzpLORi5kSClSG2EIl9P-iXnw';
        _token='BQBefk-jspWl-PCFCNEvj6pGwn-Dz_nqR1L5LNbMRr6lc3zFxgQNg-w1-WMRh5wHMacNP-mV0LN1UsA0eXcQxexKO3-5DRm6F4LW5A6Bj0HDk6gr2k-RPIB-HLbhy38Jt0wHzpy4TgTNED1FwtSLdkAxPTO6p_oJqTo7Khk_1Nq508K6KA';

        // If there is no token, redirect to Spotify authorization
        if (!_token) {
            window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token`;
        }


        /////////////////////////////////////////////////////////////////////////////////////
   //https://mkelsey25.github.io/project-1/#access_token=BQBefk-jspWl-PCFCNEvj6pGwn-Dz_nqR1L5LNbMRr6lc3zFxgQNg-w1-WMRh5wHMacNP-mV0LN1UsA0eXcQxexKO3-5DRm6F4LW5A6Bj0HDk6gr2k-RPIB-HLbhy38Jt0wHzpy4TgTNED1FwtSLdkAxPTO6p_oJqTo7Khk_1Nq508K6KA&token_type=Bearer&expires_in=3600

        // getMySpotify(_token);
        searchSpotify(_token);

        // $.ajax({
        //     url: 'https://api.spotify.com/v1/me',
        //     headers: {
        //         'Authorization': 'Bearer ' + _token
        //     },
        //     success: function(response) {
        //         console.log(response);
        //     }
        // });

        // function callSpotify(url, data) {
        //     return $.ajax(url, {
        //         dataType: 'json',
        //         data: data,
        //         headers: {
        //             'Authorization': 'Bearer ' + credentials.token
        //         }
        //     });
        // }


        // ///////////////////////////////////////
        // // Run the query
        // ///////////////////////////////////////
        // var query = 'Party in the USA';
        // var type = 'track';
        // var market = '';
        // var limit = 3;
        // var offset = 0;
        // //var oToken = '';

        // //"https://api.spotify.com/v1/search?q=Muse&type=track%2Cartist&market=US&limit=10&offset=5" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer ..."
        // var queryURL = endpoint 
        //                 + '/search?' 
        //                 + "query=" + query 
        //                 + "&type=" + type 
        //                 + "&market=" + market 
        //                 + "&limit=" + limit 
        //                 + "&offset=" 
        //                 + offset;

    });

    ///////////////////////////////////////////////////////
    // retrievews the signed in users Spotify info
    ///////////////////////////////////////////////////////
    function getMySpotify(token) {
        
        $.ajax({
            url: 'https://api.spotify.com/v1/me',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function(response) {
                //creepy, all my info...
                console.log(response);
            }
        });

   };

    //////////////////////
    // Spotify search
    //////////////////////
   function searchSpotify(token){

        var endpoint = "https://api.spotify.com/v1/search";
        var q = searchCriteria.artist;
        var type = 'artist';
        var market = '';
        var limit = 3;
        var offset = 0;

        //"https://api.spotify.com/v1/search?q=Muse&type=track%2Cartist&market=US&limit=10&offset=5" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer ..."
        var queryURL = endpoint + '?' +
                        "q=" + q +
                        "&type=" + type +
                        // "&market=" + market +
                        "&limit=" + limit +
                        "&offset=" + offset;

        $.ajax({
            url: queryURL,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function(response) {
                //search results
                console.log("Spotify Search Results");
                console.log(response);

                var artists = response.artists;                                            // data returned from Giphy app
    
                for (var i = 0; i < artists.items.length; i++) {
    
                    // construct the HTML that will be added
                    var cardDiv = $("<div>");
                    cardDiv.addClass("card");
    
                    var ImageElem = $("<img>");
                    var doneImg = false;
                    if (!isEmpty(artists.items && artists.items[i])) {
                         for (j=0; j<artists.items.length && !doneImg;j++) {
                            if (!isEmpty(artists.items[i].images && artists.items[i].images[j])) {
                                if (artists.items[i].images[j].height < 401) {
                                    ImageElem.attr("src",artists.items[i].images[j].url);
                                    doneImg = true;
                                }
                            }
                        }
                    }

                    if (!isEmpty(artists.items[i].name)) {
                        ImageElem.attr("alt", artists.items[i].name.trim());
                    } else {
                        ImageElem.attr("alt", "Artist Name");
                    };
                                 
    
                    var cardBodyDiv = $("<div>");
                    cardBodyDiv.addClass("card-body");
    
                    var titleElem =  $("<h5>");
                    if (!isEmpty(artists.items[i].name)) {
                        titleElem.text(ProperCase(artists.items[i].name.trim()));             // Capitalize the first letter of every word
                    } else {
                        titleElem.text("NONE");
                    };
    
                    var contentElem =  $("<p>");
                    contentElem.addClass("mb-0");
                    if (!isEmpty(artists.items[i])) {
                        contentElem.text("Followers " + artists.items[i].followers.total);
                    } else {
                        contentElem.text("Not Available");
                    };
    
                    cardBodyDiv.append(titleElem);
                    cardBodyDiv.append(contentElem);
                    cardDiv.append(ImageElem);
                    cardDiv.append(cardBodyDiv);
    
                    // add the elements to the DOM
                    $("#artists").prepend(cardDiv);
        
                };
    
            }
        });
   }

//end IIFE
}());
