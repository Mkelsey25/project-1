
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
    $("#btn-test-d3").on("click", function(){
       var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    var format = d3.format(",d");

    var color = d3.scaleOrdinal(d3.schemeCategory20c);

    var pack = d3.pack()
        .size([width, height])
        .padding(1.5);

    d3.csv("flare.csv", function(d) {
    d.value = +d.value;
    if (d.value) return d;
    }, function(error, classes) {
    if (error) throw error;

     var root = d3.hierarchy({children: classes})
        .sum(function(d) { return d.value; })
        .each(function(d) {
            if (id = d.data.id) {
            var id, i = id.lastIndexOf(".");
            d.id = id;
            d.package = id.slice(0, i);
            d.class = id.slice(i + 1);
            }
        });

    var node = svg.selectAll(".node")
        .data(pack(root).leaves())
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    node.append("circle")
        .attr("id", function(d) { return d.id; })
        .attr("r", function(d) { return d.r; })
        .style("fill", function(d) { return color(d.package); });

  node.append("clipPath")
      .attr("id", function(d) { return "clip-" + d.id; })
    .append("use")
      .attr("xlink:href", function(d) { return "#" + d.id; });

  node.append("text")
      .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
    .selectAll("tspan")
    .data(function(d) { return d.class.split(/(?=[A-Z][^A-Z])/g); })
    .enter().append("tspan")
      .attr("x", 0)
      .attr("y", function(d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10; })
      .text(function(d) { return d; });

  node.append("title")
      .text(function(d) { return d.id + "\n" + format(d.value); });
});
     
    });
    


});


