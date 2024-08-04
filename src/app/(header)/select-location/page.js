'use client';

import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api';

const SelectLocation = () => {
  const [googleMaps, setGoogleMaps] = useState(null);
  const [locations, setLocations] = useState([]);
  const [mapCenter, setMapCenter] = useState(null);
  const [mapZoom, setMapZoom] = useState(12);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google && window.google.maps) {
      setGoogleMaps(window.google.maps);
    }

    // Fetch locations from API
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:5156/api/Consultory');
        const data = await response.json();
        setLocations(data.Data);

        if (googleMaps) {
          // Calculate map center based on fetched locations
          const bounds = new googleMaps.LatLngBounds();
          data.Data.forEach(location => {
            bounds.extend(new googleMaps.LatLng(location.Latitude, location.Longitude));
          });
          // Center map based on bounds or default to user location
          setMapCenter(userLocation || bounds.getCenter());
          setMapZoom(12); // Adjust zoom level if necessary
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, [googleMaps, userLocation]);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        error => {
          console.error('Error getting user location:', error);
          // Set a default location if user location cannot be fetched
          setUserLocation({ lat: 20.940057, lng: -89.562082 }); // Default to a specific location
        }
      );
    } else {
      // Set a default location if geolocation is not supported
      setUserLocation({ lat: 20.940057, lng: -89.562082 }); // Default to a specific location
    }
  }, []);

  // Map configuration
  const mapContainerStyle = {
    height: '100%', // Full height of the container
    width: '100%'   // Full width of the container
  };

  const options = {
    disableDefaultUI: true, // Disable default map controls
    zoomControl: true // Enable zoom control
  };

  // Custom marker icon
  const markerIcon = 'data:image/svg+xml;base64,' + btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FF6347" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2C6.48 2 2 6.48 2 12s10 12 10 12 10-5.48 10-12S17.52 2 12 2zm0 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" fill="#FF6347"/>
    </svg>`
  );

  return (
    <div className="h-screen flex">
      {/* Lista de Consultorios */}
      <div className="w-1/2 h-full bg-white p-4 border-r border-gray-300 overflow-y-auto">
        <header className="bg-blue-600 text-white py-4 px-6 shadow-md">
          <h1 className="text-2xl font-bold text-center">Consultorios Médicos</h1>
          <p className="text-center mt-2 text-lg">
            Selecciona un consultorio para ver más detalles y ubícalo en el mapa.
          </p>
        </header>
        <main className="flex-1">
          <ul>
            {locations.map(location => (
              <li key={location.Id} className="mb-4 p-2 border-b border-gray-200">
                <h3 className="text-lg font-medium">{location.Name}</h3>
                <p>{location.Address1}, {location.Address2}</p>
                <p>{location.Phone}</p>
              </li>
            ))}
          </ul>
        </main>
      </div>
      {/* Mapa */}
      <div className="w-1/2 h-full p-4">
        <LoadScriptNext googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          {mapCenter && googleMaps && (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={mapZoom} // Adjust zoom to fit all consultorios
              options={options}
            >
              {locations.map(location => (
                <Marker 
                  key={location.Id}
                  position={{ lat: location.Latitude, lng: location.Longitude }} 
                  icon={{
                    url: markerIcon,
                    scaledSize: new googleMaps.Size(40, 40) // Icon size
                  }}
                  title={location.Name}
                />
              ))}
            </GoogleMap>
          )}
        </LoadScriptNext>
      </div>
    </div>
  );
};

export default SelectLocation;
