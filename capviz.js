looker.plugins.visualizations.add({
    // Dump Options
    options: {
       show_data: {
           section: "Include",
           type: "boolean",
           label: "Data Object",
           order: 1,
           default: true
       },
       show_queryResponse: {
           section: "Include",
           type: "boolean",
           label: "Query Response",
           order: 2,
           default: false
       },
       show_details: {
           section: "Include",
           type: "boolean",
           label: "Details Object",
           order: 3,
           default: false
       },
       show_config: {
           section: "Include",
           type: "boolean",
           label: "Config Object",
           order: 4,
           default: false
       }
    },
    
    
    // Set up the initial state of the visualization
    create: function (element, config) {

        // Define map
        var map;
        
        // iFrame document
        var iframeDocument = element.ownerDocument;
        
        // Create a container element to display data
        var container = element.appendChild(iframeDocument.createElement("div"));
        container.setAttribute('id','map');
        container.setAttribute("style","width:100%;height:100%");
        element.appendChild(container);
        
//         console.log('container');
//         console.log(container);
//         console.log('select map element');
//         console.log(iframeDocument.getElementById('map'));
        
        
        // Define the initMap function
        var initMapScriptEl = iframeDocument.createElement('script');
        initMapScriptEl.textContent = `
            function initMap() {

// These work
//                 console.log('dump document from initMap');
//                 console.log(document);
//                 console.log('document was dumped from initMap');
//                 console.log('attempt to get map div');
//                 console.log(document.getElementById('map'));

// Seems to have a problem here
                map = new google.maps.Map(iframeDocument.getElementById('map'), {
                    center: { lat: -34.397, lng: 150.644 },
                    zoom: 8,
                });
            }
        `;
        
// These work
//         console.log('dump document to see what it is - before adding initMap');
//         console.log(document)
//         console.log('dumped');      
//         console.log('adding initMap');
        
        iframeDocument.head.appendChild(initMapScriptEl);
        
// These work
//         console.log('initMap added');
//         console.log(initMap);

        
        
        // Define the sideload of google maps js library
//        var gMapsScriptEl = iframeDocument.createElement('script');
//        gMapsScriptEl.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyC6Mf10FdDbt4vhwLQAh7r1Ia56i1fu2g8&callback=initMap&libraries=&v=weekly";
//        gMapsScriptEl.defer = true;
        
//         console.log('before append sideload google maps script'); // works
//        iframeDocument.head.appendChild(gMapsScriptEl);
//         console.log('after append google maps script'); // works
        
//         console.log(iframeDocument.head); // works
 
        
    },
    // Render in response to the data or settings changing
    updateAsync: function (data, element, config, queryResponse, details, done) {
        // Clear any errors from previous updates
        this.clearErrors();

        const stuffToShow = {};
        stuffToShow.data = config.show_data ? data : null;
        stuffToShow.queryResponse = config.show_queryResponse ? queryResponse : null;
        stuffToShow.details = config.show_details ? details : null;
        stuffToShow.config = config.show_config ? config : null;

        console.log(config.show_data);
        console.log(config.show_queryResponse);
        console.log(config.show_details);
        console.log(config.show_config);
        console.log(stuffToShow);
        document.getElementById('container').innerHTML = JSON.stringify(stuffToShow,null,2);


        // Throw some errors and exit if the shape of the data isn't what this chart needs
        if (queryResponse.fields.dimensions.length === 0) {
            this.addError({ title: "No Dimensions", message: "This chart requires dimensions." });
            return;
        }
        done()
    }
});
