// src/pages/PatientForm/Fotografias/index.jsx

import React, { useState } from "react";
import "./styles.css"; // Assuming you have some basic styling

function Fotografias() {
  const [photos, setPhotos] = useState([]);

  const handleAddPhoto = () => {
    setPhotos([...photos, { path: "", description: "" }]);
  };

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedPhotos = [...photos];
      updatedPhotos[index].path = reader.result; // Saving the base64 encoded image
      setPhotos(updatedPhotos);
    };
    reader.readAsDataURL(file);
  };

  const handleDescriptionChange = (event, index) => {
    const updatedPhotos = [...photos];
    updatedPhotos[index].description = event.target.value;
    setPhotos(updatedPhotos);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Photos Data:", photos);
    // Here you might handle the submission, e.g., sending data to the backend
  };

  return (
    <form onSubmit={handleSubmit} className="fotografias-form">
      <h2>Fotografias</h2>
      {photos.map((photo, index) => (
        <div key={index} className="photo-entry">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, index)}
          />
          <input
            type="text"
            placeholder="Descrição da foto"
            value={photo.description}
            onChange={(e) => handleDescriptionChange(e, index)}
          />
        </div>
      ))}
      <button type="button" onClick={handleAddPhoto}>
        + Adicionar Foto
      </button>
      <button type="submit">Salvar</button>
    </form>
  );
}

export default Fotografias;
