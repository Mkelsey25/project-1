# Tour Spot (Group Project-1)

Tour Spot is a data-driven concert spot discovery and recommendation engine built with the vast data collected by Spotify, Ticketmaster, and Mapbox.

- Follow your favorite artists on Spotify to bolster their fan base and improve tour probability in a location nearby
- Gain insights on where your favorite artists may appear next

Concert Promoters
- Recommend touring locations that maximize earnings and grow the fan base
- Track ticketing history to identify the best candidates for returning events
- Find artists that are in demand by geographic location

Artists and Bands
- Meet your fanbase where they are
- Plan tours and events that optimize travel routes
- Boost ticket sales

**Problem it solves:** \
Allows for discovery of optimal concert spot locations based on Spotify followers, venue history and bookings and geographic location.\
**How solved:** \
Search for Spotify followers and TickerMaster history by keywords, artist, venue or date ranges.  Visualize touring locations on a map, artist details, venue details and artists Spotify followers.\
**Technical approach:** Leverage the TicketMaster API to search for data about venues and event bookings (both prior and upcoming).  Leverage the Spotify API to identify followers for an artist and their genre.  Combine the data sources to visualize at a glance.

## Getting Started

This project uses the Spotify, Ticketmaster, and Mapbox APIs to pinpoint ideal concert tour locations by showing data visualizations of past and potential tours.

### Prerequisites

:warning: You must have API keys to: Spotify, Ticketmaster and Mapbox.

### Installing

To get a development environment up and running, clone the repository locally.  You will need to update to use an API key to Spotify and TicketMaster.

## Running tests

No testing libraries have been utilized as of yet.

## Deployment

The project is deployed at https://mkelsey25.github.io/project-1/

## Built With

The project is written in HTML5, CSS3, JavaScript/jQuery on the Bootstrap 4.1 framework. It uses leaflet for visualizations of venue location. Additional tour information is available in a table format.  The project uses Lightbox 2.0 for image galleries.

**Technologies**\
HTML5, CSS3, JavaScript/JQuery, Bootstrap 4.1, Leaflet, Bootswatch, and Font Awesome

**API's**\
Spotify, Ticketmaster, Mapbox

## Contributing

N/A

## Versioning

This is version 1.0

## Authors

* **Bokyoung** - *Initial work*
* **Jenni** - Ticketmaster and Spotify API, Lightbox, UI/UX elements and integration of components.
* **Juhi** - *Initial work*
* **Morgan** - Worked on initial logic and api research for Ticketmaster. Researched QGIS, Datamaps, and Leaflet for datavisualization. Implemented leaflet to display potential venue locations.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- Leverages parts of a client-side Spotify Web API JS wrapper hosted on github @ <https://github.com/JMPerez/spotify-web-api-js>

- Utilizes Lightbox 2.0 from Lokesh Dhakar (<https://twitter.com/lokesh>) which is hosted on github at <https://github.com/lokesh/lightbox2/>
