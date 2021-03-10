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

        // iFrame document
        var iframeDocument = element.ownerDocument;
        
        // Create a container element to display data
        var container = element.appendChild(iframeDocument.createElement("div"));
        container.setAttribute('id','mapbox');
        container.setAttribute("style","width:100%;height:100%");
        element.appendChild(container);
        

        mapboxgl.accessToken = 'pk.eyJ1IjoiamNhc2NpbzEyMjYiLCJhIjoiY2tpcm4wMXp0MGFyNDJ5cWp0ZTRlNXRodSJ9.8m__aV7LIjs-etMUuOrO9g';
        var mapbox = new mapboxgl.Map({
            container: 'mapbox', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [-74.5, 40], // starting position [lng, lat]
            zoom: 9 // starting zoom
        });

        
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
//         document.getElementById('container').innerHTML = JSON.stringify(stuffToShow,null,2);


        // Throw some errors and exit if the shape of the data isn't what this chart needs
        if (queryResponse.fields.dimensions.length === 0) {
            this.addError({ title: "No Dimensions", message: "This chart requires dimensions." });
            return;
        }
        done()
    }
});
