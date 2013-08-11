$(document).ready(function () {

  // Google maps
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  var map;
  
  // User Location varibles
  var userLat;
  var userLon;
  
  // Varible for initialising the city
  var storeCity;

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
    var edinburgh = new google.maps.LatLng(55.953252, -3.188266999999996000);
    var mapOptions = {
      zoom:7,
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
    var end = "John Lewis, Edinburgh";
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

