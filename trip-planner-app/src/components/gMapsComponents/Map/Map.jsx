/* global google */
import React, { useEffect, useState } from "react";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "react-google-maps";
import "./Map.scss"

const Map = withGoogleMap(({ stops }) => {
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (stops.length < 2) return;

    const waypoints = stops.map((el) => {
      return { location: { lat: el.lat, lng: el.lng } };
    });
    const origin = waypoints.shift();
    const destination = waypoints.pop();

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, [stops]);

  return (
    <GoogleMap
      defaultZoom={3}
      defaultCenter={{ lat: 42, lng: -97 }}
      options={{ disableDefaultUI: true }}
    >
      <Marker position={stops[0]} />
      {stops.length >= 2
        ? directions && <DirectionsRenderer directions={directions} />
        : ""}
    </GoogleMap>
  );
});

export default Map;
