$(document).ready(function () {
  //Cache Image height to set map height
  var elHeight = document.getElementById('item-image').clientHeight.toString();

  // Google maps globals
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  var map;
  
  // Store Data 
  var store = {
    name: $("h2").data("store-name"),
    city: $("h3").data("store-city"),
    lat: $("h3").data("lat"),
    lng: $("h3").data("lng")
  }
  
  console.log(store);
  
  var user = {
    lat: null,
    lng: null
  }
  
  // Initialize a map 
  function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var edinburgh = new google.maps.LatLng(store.lat, store.lng);
    var mapOptions = {
      zoom:9,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      draggable: false,
      center: edinburgh
    }
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);
  }
  
  // Calculate route from user to store
  function calcRoute(uLat, uLng) {
    var start =  new google.maps.LatLng(uLat, uLng);
    var end = store.name + ", " + store.city;
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.DirectionsTravelMode.WALKING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });
  };
        
  // Get user lat long and call calcRoute();
  function getUserLocation(){
    navigator.geolocation.getCurrentPosition( function (position) {
      user.lat = position.coords.latitude;
      user.lng = position.coords.longitude;
      calcRoute(user.lat, user.lng);
      var queryString = generateMapsQuery(user.lat, user.lng, store.lat, store.lng);
      generateMapsUi(queryString);
    }, function (error) {
      console.log(error);
    }); 
  }; 
  
  // Builds a url query to open directions in maps.
  // (num/string, num/string, num/string, num/string)
  // -> string
  function generateMapsQuery(slat,slng, dlat, dlng){
    var base = "https://maps.google.com/?"
    var source = 'saddr=' + slat + ',' + slng;
    var dest = 'daddr=' + dlat + ',' + dlng;
    var query = base + source + '&' + dest;
    return query;
  };
  
  //Takes a query and injects ui mark-up into the dom
  function generateMapsUi(query){
    var mapsQuery = query;
    $('#map-canvas').prepend('<div class="maps-ui"><div class="maps-directions"><a href="' + mapsQuery + '">Open in googlemaps</a></div><div class="close-map"></div></div>');
    //Bind event for injected ui
    $('.close-map').bind({
      click: function () {
        $('#map-canvas').css('display', 'none');
        $('.hero').css('display', 'block'); 
      }
    });
  }
  
  //Click event.
  $('#show-map').click(function (e) {
    e.preventDefault();
    $('.hero').css('display', 'none');
    $('#map-canvas').css({
      display: 'block',
      height: elHeight
    });
    initialize(); 
    getUserLocation();
  });  
});

