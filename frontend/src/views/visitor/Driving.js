import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';

const mapContainerStyle = {
  height: '600px',
  width: '100%'
};

const center = { lat: 11.054203, lng: -63.816326 };

const bounds = {
  north: 11.08971,
  south: 10.98723,
  east: -63.76916,
  west: -63.91368,
};

const options = {
  bounds,
  disableDefaultUI: true,
  scrollwheel: false,
  mapTypeId: "satellite",
  zoomOnClick: false,
  zoom: 17,
  places: true,
  labels: true,
  styles: [
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [{ color: "#444444" }],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [{ color: "#f2f2f2" }],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [{ saturation: -100 }, { lightness: 45 }],
    },
    {
      featureType: "road.highway",
      elementType: "all",
      stylers: [{ visibility: "simplified" }],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [{ color: "#4299e1" }, { visibility: "on" }],
    },
  ],
};

const API_KEY = 'AIzaSyBdgrG8rCQtlH_q1RmaSN0h1SYRft1X1vA';

export default function Driving() {
  const libraries = ["places", "drawing"];

  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = useState(center);
  const [destination, setDestination] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);

  const handleClick = (event) => {
    const destination = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route({
      origin,
      destination,
      travelMode: window.google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirections(result);
        setDestination(result.routes[0].legs[0].end_location);
        setDestinationLocation(result.routes[0].legs[0].end_address);
      } else {
        console.error(`Error fetching directions: ${status}`);
      }
    });
  }

  return (
      <>
        <LoadScript
          googleMapsApiKey={API_KEY}
          libraries={libraries}
        >
          <h1>Click on the Map to get your Driving Instructions</h1>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            options={options}
            onClick={handleClick}
          >
            <Marker position={origin}>
              <InfoWindow position={origin}>
                <div>{'Terrazas de Guacuco'}</div>
              </InfoWindow>
            </Marker>
            {destination &&
            <Marker position={destination}>
              <InfoWindow position={destination}>
                <div>{destinationLocation}</div>
              </InfoWindow>
            </Marker>}
            {directions && <DirectionsRenderer directions={directions} options={{
                suppressMarkers: true,
                preserveViewport: true,
              }}/>}
          </GoogleMap>
        </LoadScript>
        {directions && (
          <div
            style={{
              position: "relative",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "#fff",
              padding: "10px",
              zIndex: 1,
            }}
          >
            <span className="text-xl"><b>Driving Instructions :</b></span>
            {directions.routes[0].legs[0].steps.map((step, index) => (
              <div key={index}>
                <div
                  dangerouslySetInnerHTML={{__html: `${index + 1}. ${step.instructions}`}}
                  style={{textTransform: 'capitalize'}}
                >
                </div>
              </div>
            ))}
            </div>
          )}
      </>
  );
}
