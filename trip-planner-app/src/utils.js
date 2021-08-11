// Find the distance between two latlng points as the crow flies
// Adapted from multiple similar examples online
export function haversineDistance(
  { lat: lat1, lng: lng1 },
  { lat: lat2, lng: lng2 }
) {
  var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = lat1 * (Math.PI / 180); // Convert degrees to radians
  var rlat2 = lat2 * (Math.PI / 180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (lng2 - lng1) * (Math.PI / 180); // Radian difference (longitudes)

  var d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );
  return d;
}
