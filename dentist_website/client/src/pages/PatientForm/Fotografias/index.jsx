import React from "react";
import { usePatientInfo } from "../../../context/PatientContext"; // Adjust this path as necessary
import "./styles.css";

function Fotografias() {
  const { patientInfo, updatePatientInfo } = usePatientInfo();

  const handleAddPhoto = () => {
    const newPhoto = { path: "", description: "", file: null };
    const updatedFotografias = [...patientInfo.fotografias, newPhoto];
    updatePatientInfo({ fotografias: updatedFotografias });
  };

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedFotografias = [...patientInfo.fotografias];
      updatedFotografias[index] = {
        ...updatedFotografias[index],
        path: reader.result,
        file: file, // Saving the file for upload
      };
      updatePatientInfo({ fotografias: updatedFotografias });
    };
    reader.readAsDataURL(file);
  };

  const handleDescriptionChange = (event, index) => {
    const updatedFotografias = [...patientInfo.fotografias];
    updatedFotografias[index] = {
      ...updatedFotografias[index],
      description: event.target.value,
    };
    updatePatientInfo({ fotografias: updatedFotografias });
  };

  return (
    <div className="fotografias-form">
      <h2>Fotografias</h2>
      {patientInfo.fotografias.map((photo, index) => (
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
    </div>
  );
}

export default Fotografias;
