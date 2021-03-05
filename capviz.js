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

        var gMapsScript = document.createElement('script');
        gMapsScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC6Mf10FdDbt4vhwLQAh7r1Ia56i1fu2g8&callback=initMap&libraries=&v=weekly";
        gMapsScript.defer = true;
        console.log('before append script');
        document.getElementsByTagName('head')[0].appendChild(gMapsScript);
        console.log('after append script');


        // Create a container element to display data
        var container = element.appendChild(document.createElement("div"));
        container.setAttribute('id','map');
        container.setAttribute("style","width:100%;height:100%");

        function initMap() {
            map = new google.maps.Map(container, {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
            });
        }
        
        
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
