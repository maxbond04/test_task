import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

interface MarkerInfo {
  id: number;
  position: google.maps.LatLngLiteral;
  label: string;
}

const GoogleMapComponent: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerInfo[]>([]);
  const [markerId, setMarkerId] = useState<number>(1);

  const onMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newMarker: MarkerInfo = {
        id: markerId,
        position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
        label: markerId.toString(),
      };
      setMarkers([...markers, newMarker]);
      setMarkerId(markerId + 1);
    }
  };

  const deleteMarker = (id: number) => {
    setMarkers(markers.filter(marker => marker.id !== id));
  };

  const deleteAllMarkers = () => {
    setMarkers([]);
    setMarkerId(1);
  };

  const onMarkerDragEnd = (event: google.maps.MapMouseEvent, id: number) => {
    if (event.latLng) {
      const updatedMarkers = markers.map(marker => {
        if (marker.id === id) {
          return {
            ...marker,
            position: {
                lat: event.latLng?.lat() || 0,
                lng: event.latLng?.lng() || 0
              }
          };
        }
        return marker;
      });
      setMarkers(updatedMarkers);
    }
  };

  return (
    <LoadScript googleMapsApiKey="">
      <div>
        <button onClick={deleteAllMarkers}>Delete All Markers</button>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={onMapClick}
      >
        {markers.map(marker => (
          <Marker
            key={marker.id}
            position={marker.position}
            label={marker.label}
            draggable={true}
            onDragEnd={(event) => onMarkerDragEnd(event, marker.id)}
            onClick={() => deleteMarker(marker.id)}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
