$(document).ready(function () {
  
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  var map;
  var getDirections = document.getElementById("show-map");

  var userLat;
  var userLon;

  navigator.geolocation.getCurrentPosition(function (position) {
    userLat = position.coords.latitude;
    userLon = position.coords.longitude;
  }, function (error) {
    console.log(error);
  });

 
 
  
  
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
    console.log(userLat + " " + userLon);
    initialize();
    calcRoute(userLat, userLon);   
  })
});

