$(document).ready(function () {

  // Google maps
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
  
  
  // Get user lat long and call calcRoute();
  function getUserLocation(){
    navigator.geolocation.getCurrentPosition(function (position) {
      var userLat = position.coords.latitude;
      var userLon = position.coords.longitude;
      calcRoute(userLat, userLon);
    }, function (error) {
      console.log(error);
    }); 
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

  function calcRoute(startPos, endPos) {
    var start = startPos.toString() + " " + endPos.toString();
    var end = "55.952337 -3.199986";
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });
  }
  
  $('#show-map').click(function (e) {
    e.preventDefault();
    $('.hero').css('display', 'none');
    $('#map-canvas').css('display', 'block');
    initialize();
    getUserLocation(); 
  })
});

