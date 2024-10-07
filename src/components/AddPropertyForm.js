/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';

const AddPropertyForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState(''); // Example: "14.6928,-17.4467"
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const propertyData = {
      title,
      description,
      price,
      location,
    };

    try {
      // Envoie les données à l'API Laravel
      const response = await axios.post('http://127.0.0.1:8000/api/properties', propertyData);
      setMessage('Propriété ajoutée avec succès!');
      // Réinitialise le formulaire
      setTitle('');
      setDescription('');
      setPrice('');
      setLocation('');
    } catch (error) {
      setMessage('Erreur lors de l’ajout de la propriété.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Titre</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Description</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required
        />
      </div>
      <div>
        <label>Prix (FCFA)</label>
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Emplacement (Coordonnées GPS)</label>
        <input 
          type="text" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          placeholder="Exemple: 14.6928,-17.4467" 
          required 
        />
      </div>
      <button type="submit">Ajouter la propriété</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default AddPropertyForm;
