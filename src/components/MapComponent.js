import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';

// Fix Leaflet's default icon issues with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapComponent = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Charger les propriétés à partir de l'API
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/api/properties');
        setProperties(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des propriétés', error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <MapContainer center={[14.6928, -17.4467]} zoom={13} style={{ height: '600px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {properties.map(property => (
        <Marker
          key={property.id}
          position={[property.latitude, property.longitude]} // Assure-toi que tu as des champs latitude et longitude dans ta base de données
        >
          <Popup>
            <div>
              <h4>{property.title}</h4>
              <p>{property.description}</p>
              <p>Prix : {property.price} FCFA</p>
              <button>Réserver ou Louer</button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
