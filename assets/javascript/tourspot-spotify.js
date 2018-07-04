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
        
         /////////////////////////////////////////////////////////////////////////////////////
        // Get the hash of the url
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

        const authEndpoint = 'https://accounts.spotify.com/authorize';

        // Replace with your app's client ID, redirect URI and desired scopes
        const clientId = 'beeec1203a66453e99e3119ef75c13e6';
        // const redirectUri = 'https://jmcoleman.github.io';
        const redirectUri = 'https://mkelsey25.github.io/project-1/';
        const scopes = [
            'user-read-birthdate',
            'user-read-email',
            'user-read-private'
        ];

        // TODO this needs to go back to a different redirect url... update the spotify app and my variable above for this
        _token='BQB0Cf4QGzQU3ugM1ViDVtWdEYmFC096Xows0qVppM7rUHSlDQQN87eFiHTzIQwcLqIPsqr2ymgssnHPJvX8YKtdmBX-efP9y5Y_wWi6JD_P7BnhG5BzytYp1-08dkL2ab51VhtdCVDY5IhUME-5RoLystzpLORi5kSClSG2EIl9P-iXnw';

        // If there is no token, redirect to Spotify authorization
        if (!_token) {
            window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token`;
        }
        /////////////////////////////////////////////////////////////////////////////////////
   
        getMySpotify();
        getTrack();

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

        function getMySpotify() {
            $.ajax({
                url: 'https://api.spotify.com/v1/me',
                headers: {
                    'Authorization': 'Bearer ' + _token
                },
                success: function(response) {
                    console.log(response);


                }
            });
    
       };

    });
