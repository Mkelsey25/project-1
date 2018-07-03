    ///////////////////////
    // TEST Spotify
    ///////////////////////
    $("#section-test-spotify").delegate("button#btn-test-spotify","click", function() {

        // prevent the page from reloading
        event.preventDefault();
        console.log("in Spotify handler");

        // get the criteria for the search
        var inputData = getSearchCriteria();
        console.log("Retrieved Artist: " + inputData.artist);

        // SPOTIFY api
        var client_id = 'beeec1203a66453e99e3119ef75c13e6';                  // Your client id
        var client_secret = '72ac98e2d30a4d74814452b00c6e333c';              // Your secret
        var redirect_uri = 'http://www.google.com';                          // Your redirect uri
        var scopes = "\'user-library-read user-follow-read user-read-birthdate playlist-read-private user-read-currently-playing user-read-recently-played\'";

        ///////////////////////////////////////////////////////
        ///////////////////////////
        // TODO example snippet
        ///////////////////////////
        // var SpotifyWebApi = require('spotify-web-api-node');

        // var spotifyApi = new SpotifyWebApi({
        //     clientId : client_id,
        //     clientSecret : client_secret,
        // });
        ///////////////////////////////////////////////////////

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

        ///////////////////////////////////////////////////////
        // Get Elvis' albums
        // LOOK INTO getArtistTopTracks(artistId, countryId, options, ...
        // spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
        // .then(function(data) {
        //     console.log('Artist albums', data.headers);
        // }, function(err) {
        //     console.error(err);
        // });
        ///////////////////////////////////////////////////////

        // $.ajax({
        //     url: queryURL,
        //     method: "GET"
        // }).then(function(response) {
        //     console.log(response);
    
        //     var results = response.data;                    
    
        //     for (var i = 0; i < results.length; i++) {

        //         // TODO: construct the HTML that will be added

        //         // add/modify elements in the DOM
    
        //     };
    
        // });

    });
