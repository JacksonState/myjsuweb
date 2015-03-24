// Polyfill EMCAScript6 Array.prototype.find method
      if (!Array.prototype.find) {
        Array.prototype.find = function(predicate) {
          if (this == null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
          }
          if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
          }
          var list = Object(this);
          var length = list.length >>> 0;
          var thisArg = arguments[1];
          var value;

          for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
              return value;
            }
          }
          return undefined;
        };
      }

      var JacksonState = new google.maps.LatLng(32.2969758, -90.207019);
      var currentLocation;
      var directionsDisplay;
      var directionsService = new google.maps.DirectionsService();
      var map;

      function toggleDisplay(elID) {
        document.getElementById(elID).classList.toggle('hide');
      }

      function selectDestination(e) {
        if (e.target !== e.currentTarget) {
          var clickedItem = e.target.id;
          toggleDisplay('locListContainer');

          // Get chosen Location
          var entries = LOC_DATA.locations || [];
          clickedLoc = entries.find(function(element, index, array){
            if(element.id !== clickedItem){
              return false;
            }
            return element;
          });

          var end = new google.maps.LatLng(clickedLoc.latitude, clickedLoc.longitude);
          var dirRequest = {
            origin: currentLocation,
            destination: end,
            travelMode: google.maps.TravelMode.WALKING
          };
          directionsService.route(dirRequest, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(result);
            }
          });

          // Set nav text to chosen location
          document.getElementById("navText").innerHTML = clickedLoc.name || "Select Destination...";
        }
        e.stopPropagation();
      }

      // Create a list of Locations
      function listLocations() {
        var entries = LOC_DATA.locations || [];
        var html = ['<ul id="locList" onclick="selectDestination(event)">'];

        for (var i = 0; i < entries.length; ++i) {
          var entry = entries[i];
          var locId = entry.id;
          var locName = entry.name;
          // var buildUrl = baseMapUrl + entry.latitude + ',' + entry.longitude;
          // var start = (entry['gd$when']) ? entry['gd$when'][0].startTime : ""; 
          html.push('<li id=', locId,' class="locListItem">', locName, '</li>');
        }
        html.push('</ul>');
        document.getElementById("locListText").innerHTML = html.join("");
      }

      function getCurrentLocation() {
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var marker = new google.maps.Marker({
              position: currentLocation,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 7,
                fillColor: 'Gray',
                fillOpacity: 1,
                strokeColor: 'Blue',
                strokeOpacity: 0.3,
                strokeWeight: 10
              },
              map: map
            });
            var marker = new google.maps.Marker({
              position: currentLocation,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 5.5,
                fillColor: 'RoyalBlue',
                fillOpacity: 1,
                strokeColor: 'white',
                strokeWeight: 1
              },
              map: map
            });
            
            map.setCenter(currentLocation);
          }, function() {
            document.getElementById("navText").innerHTML = "Can not get current position!";
            document.getElementById("navMenuBox").onclick = null;
            return;
          });
        } else {
          document.getElementById("navText").innerHTML = "Can not get current position!";
          document.getElementById("navMenuBox").onclick = null;
          return;
        }
      }

      function initialize() {
        directionsDisplay = new google.maps.DirectionsRenderer();
        var mapOptions = {
          zoom: 14,
          center: JacksonState,
          disableDefaultUI: true,
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        directionsDisplay.setMap(map);
        listLocations();
        getCurrentLocation();
      }

      google.maps.event.addDomListener(window, 'load', initialize);

      // add fastclick bindings
      window.addEventListener('load', function() { FastClick.attach(document.body); }, false);