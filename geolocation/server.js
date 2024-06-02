function getLocationAndDisplayHospitals() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(findNearbyHospitals, showError);
  } else {
      alert("Geolocation is not supported by this browser.");
  }
}

// Function to handle successful retrieval of user's location
function findNearbyHospitals(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  fetchCityName(latitude, longitude)
      .then(cityName => {
          alert("City: " + cityName);

          // Display map with user's location and nearby hospitals
          displayMap(latitude, longitude);
      })
      .catch(error => {
          console.error('Error:', error);
          alert("Error occurred while fetching city name.");
      });
}

// Function to fetch the city name based on latitude and longitude
function fetchCityName(latitude, longitude) {
  return fetch('https://nominatim.openstreetmap.org/reverse?lat=' + latitude + '&lon=' + longitude + '&format=json')
      .then(response => response.json())
      .then(data => {
          var cityName = data.address.city;
          if (!cityName) {
              cityName = data.address.town || data.address.village || data.address.hamlet || data.address.locality;
          }
          return cityName;
      });
}

// Function to display the map with user's location and nearby hospitals within 40 km
function displayMap(latitude, longitude) {
  // Create map centered at user's location
  var map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: latitude, lng: longitude },
      zoom: 12
  });

  // Add marker for user's location
  var userMarker = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: map,
      title: 'Your Location'
  });

  // Fetch nearby hospitals from CSV file within 40 km radius
  fetch('HospitalsInIndia.csv') // Change 'HospitalsInIndia.csv' to your CSV file path
      .then(response => response.text())
      .then(data => {
          var hospitals = CSVToArray(data); // Custom function to parse CSV to array
          hospitals.forEach(hospital => {
              var hospitalLatLng = { lat: parseFloat(hospital[1]), lng: parseFloat(hospital[2]) };
              var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(latitude, longitude), new google.maps.LatLng(hospitalLatLng.lat, hospitalLatLng.lng));
              var distanceInKm = distance / 1000;
              if (distanceInKm <= 40) { // Display hospitals within 40 km radius
                  var marker = new google.maps.Marker({
                      position: hospitalLatLng,
                      map: map,
                      title: hospital[0] // Assuming hospital name is in first column
                  });
              }
          });
      })
      .catch(error => {
          console.error('Error:', error);
          alert("Error occurred while fetching hospital data.");
      });
}

// Function to handle geolocation errors
function showError(error) {
  switch (error.code) {
      case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.");
          break;
      case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
      case error.TIMEOUT:
          alert("The request to get user location timed out.");
          break;
      case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.");
          break;
  }
}

// Function to parse CSV data to array
function CSVToArray(strData, strDelimiter) {
  // Check to see if the delimiter is defined. If not, default to comma.
  strDelimiter = strDelimiter || ',';
  // Create a regular expression to parse the CSV values.
  var objPattern = new RegExp(
      '(\\' +
      strDelimiter +
      '|\\r?\\n|\\r|^)' +
      '(?:"([^"](?:""[^"])*)"|' +
      '([^"\\' +
      strDelimiter +
      '\\r\\n]*))',
      'gi'
  );
  // Create an array to hold our data. Give the array a default empty first row.
  var arrData = [[]];
  // Create an array to hold our individual pattern matching groups.
  var arrMatches = null;
  // Keep looping over the regular expression matches until we can no longer find a match.
  while ((arrMatches = objPattern.exec(strData))) {
      // Get the delimiter that was found.
      var strMatchedDelimiter = arrMatches[1];
      // Check to see if the given delimiter has a length (is not the start of string) and if it matches field delimiter. If so, add another row to our data array.
      if (
          strMatchedDelimiter.length &&
          strMatchedDelimiter !== strDelimiter
      ) {
          arrData.push([]);
      }
      var strMatchedValue;
      // Now that we have our delimiter out of the way, let's check to see which kind of value we captured (quoted or unquoted).
      if (arrMatches[2]) {
          // We found a quoted value. When we capture this value, unescape any double quotes.
          strMatchedValue = arrMatches[2].replace(new RegExp('""', 'g'), '"');
      } else {
          // We found a non-quoted value.
          strMatchedValue = arrMatches[3];
      }
      // Now that we have our value string, let's add it to the data array.
      arrData[arrData.length - 1].push(strMatchedValue);
  }
  // Return the parsed data.
  return arrData;
}