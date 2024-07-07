import React, { useState, useEffect } from "react";
import { usePatientInfo } from "../../../context/PatientContext";
import imageCompression from "browser-image-compression";
import axios from "axios";
import "./styles.css";

function Fotografias() {
  const { patientInfo, setSavedFotografias } = usePatientInfo();
  const [savedFotografias, setLocalSavedFotografias] = useState([]);
  const [newPhoto, setNewPhoto] = useState({
    path: "",
    description: "",
    file: null,
    fileName: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState(null);

  useEffect(() => {
    setLocalSavedFotografias(patientInfo.savedFotografias);
  }, [patientInfo.savedFotografias]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhoto((prev) => ({
          ...prev,
          path: reader.result,
          file: compressedFile,
          fileName: file.name, // Ensure the file name is set here
        }));
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Error compressing file:", error);
    }
  };

  const handleDescriptionChange = (event) => {
    setNewPhoto((prev) => ({
      ...prev,
      description: event.target.value,
    }));
  };

  const handleAddPhoto = async () => {
    if (!newPhoto.file) {
      alert("Please select a new image.");
      return;
    }

    const patientId = patientInfo.patientId;
    const formData = new FormData();
    formData.append("photograph", newPhoto.file);
    formData.append("description", newPhoto.description);
    formData.append("fileName", newPhoto.fileName); // Include the file name

    console.log("Adding photo with file name:", newPhoto.fileName); // Debugging line

    try {
      const response = await axios.patch(
        `http://localhost:5005/patients/${
          patientId || patientInfo._id
        }/fotografias`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const updatedFotografias = [...savedFotografias, response.data.photo];
      setLocalSavedFotografias(updatedFotografias);
      setSavedFotografias(updatedFotografias); // Save to context

      setNewPhoto({ path: "", description: "", file: null, fileName: "" }); // Reset the new photo input
    } catch (error) {
      console.error("Failed to add photo:", error);
      alert("Failed to add the photo!");
    }
  };

  const handleDelete = async () => {
    const patientId = patientInfo.patientId;
    try {
      console.log("Deleting photo with ID:", photoToDelete);
      await axios.delete(
        `http://localhost:5005/patients/${
          patientId || patientInfo._id
        }/fotografias/${photoToDelete}`
      );
      const updatedFotografias = savedFotografias.filter(
        (photo) => photo._id !== photoToDelete
      );
      setLocalSavedFotografias(updatedFotografias);
      setSavedFotografias(updatedFotografias); // Save to context
      setShowModal(false); // Close the modal after deleting
      setPhotoToDelete(null); // Reset the photo to delete
      console.log("Photo deleted successfully");
    } catch (error) {
      console.error("Failed to delete photo:", error);
      alert("Failed to delete the photo!");
    }
  };

  const handleShowModal = (photoId) => {
    setPhotoToDelete(photoId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPhotoToDelete(null);
  };

  return (
    <div className="fotografias-form">
      <h2>Fotografias</h2>
      <div className="new-photo-entry">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <input
          type="text"
          placeholder="Descrição da foto"
          value={newPhoto.description}
          onChange={handleDescriptionChange}
        />
        <button
          type="button"
          onClick={handleAddPhoto}
          disabled={!newPhoto.file}
        >
          Adicionar Foto
        </button>
      </div>
      <div className="saved-photos">
        {savedFotografias?.map((photo) => (
          <div key={photo._id} className="photo-entry">
            <p>Nome: {photo.nome}</p>
            <p>Descrição: {photo.description}</p>
            <button onClick={() => handleShowModal(photo._id)}>Excluir</button>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Tem certeza de que deseja excluir esta foto?</p>
            <button className="delete-button" onClick={handleDelete}>
              Excluir
            </button>
            <button className="cancel-button" onClick={handleCloseModal}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Fotografias;
