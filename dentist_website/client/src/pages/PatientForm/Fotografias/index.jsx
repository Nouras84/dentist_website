import React, { useState, useEffect } from "react";
import { usePatientInfo } from "../../../context/PatientContext";
import imageCompression from "browser-image-compression";
import axios from "axios";
import "./styles.css";

function Fotografias() {
  const { patientInfo, setPatientInfo } = usePatientInfo();
  const [newPhoto, setNewPhoto] = useState({
    path: "",
    description: "",
    file: null,
    fileName: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState(null);
  const [showPhoto, setShowPhoto] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(false);

  const fetchPatient = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5005/patients/${patientInfo?._id}`,
        {},
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setPatientInfo(result.data);
    } catch (error) {
      console.error("Failed to save data", error);
    }
  };

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
      await axios.patch(
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
      setNewPhoto((prev) => ({
        ...prev,
        path: "",
        description: "",
        file: null,
        fileName: "",
      }));

      fetchPatient();
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

      setNewPhoto((prev) => ({
        ...prev,
        path: "",
        description: "",
        file: null,
        fileName: "",
      }));

      setShowModal(false);
      setPhotoToDelete(null);
      fetchPatient();
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

  console.log("patient info fotografias section:", patientInfo);

  return (
    <>
      {/* foto show modal */}

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
          <div>
            rutas de archivo seleccionadas:
            {patientInfo?.fotografias?.length && (
              <div>
                {patientInfo.fotografias.map((eachPhoto, index) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        gap: "24px",
                        marginTop: "12px",
                      }}
                    >
                      <div>Fotografía {index + 1}</div>
                      <div>Descrição: {eachPhoto.description}</div>
                      <div
                        onClick={() => {
                          setClickedIndex(index);
                          setShowPhoto(!showPhoto);
                        }}
                        style={{
                          padding: "0px 25px",
                          border:
                            showPhoto && clickedIndex === index
                              ? "1px solid crimson"
                              : "1px solid green",
                          cursor: "pointer",
                          maxHeight: "20px",
                        }}
                      >
                        {showPhoto && clickedIndex === index
                          ? "Cerrar la foto"
                          : "Haz clic para ver"}
                      </div>
                      <div
                        onClick={() => handleShowModal(eachPhoto._id)}
                        style={{
                          padding: "0px 25px",
                          border: "1px solid crimson",
                          cursor: "pointer",
                          maxHeight: "20px",
                        }}
                      >
                        Excluir
                      </div>
                      <img
                        width={200}
                        height={200}
                        style={{
                          display:
                            showPhoto && clickedIndex === index ? "" : "none",
                        }}
                        src={`http://localhost:5005/${eachPhoto.path}`}
                        alt=""
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <p>Tem certeza de que deseja excluir esta foto?</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "12px",
                }}
              >
                <button className="delete-button" onClick={handleDelete}>
                  Excluir
                </button>
                <button className="cancel-button" onClick={handleCloseModal}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Fotografias;
