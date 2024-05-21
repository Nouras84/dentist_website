// import React, { useState, useEffect } from "react";
// import { usePatientInfo } from "../../../context/PatientContext";
// import imageCompression from "browser-image-compression";
// import axios from "axios";
// import "./styles.css";

// function Fotografias() {
//   const { patientInfo, setSavedFotografias } = usePatientInfo();
//   const [savedFotografias, setLocalSavedFotografias] = useState([]);
//   const [newPhoto, setNewPhoto] = useState({
//     path: "",
//     description: "",
//     file: null,
//   });

//   useEffect(() => {
//     setLocalSavedFotografias(patientInfo.savedFotografias);
//   }, [patientInfo.savedFotografias]);

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     const options = {
//       maxSizeMB: 1,
//       maxWidthOrHeight: 800,
//       useWebWorker: true,
//     };
//     try {
//       const compressedFile = await imageCompression(file, options);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setNewPhoto((prev) => ({
//           ...prev,
//           path: reader.result,
//           file: compressedFile,
//         }));
//       };
//       reader.readAsDataURL(compressedFile);
//     } catch (error) {
//       console.error("Error compressing file:", error);
//     }
//   };

//   const handleDescriptionChange = (event) => {
//     setNewPhoto((prev) => ({
//       ...prev,
//       description: event.target.value,
//     }));
//   };

//   const handleAddPhoto = async () => {
//     if (!newPhoto.file) {
//       alert("Please select a new image.");
//       return;
//     }

//     const patientId = patientInfo.patientId;
//     const formData = new FormData();
//     formData.append("photograph", newPhoto.file);
//     formData.append("description", newPhoto.description);

//     try {
//       const response = await axios.patch(
//         `http://localhost:5005/patients/${patientId}/fotografias`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       const updatedFotografias = [...savedFotografias, response.data.photo];
//       setLocalSavedFotografias(updatedFotografias);
//       setSavedFotografias(updatedFotografias); // Save to context

//       setNewPhoto({ path: "", description: "", file: null }); // Reset the new photo input
//     } catch (error) {
//       console.error("Failed to add photo:", error);
//       alert("Failed to add the photo!");
//     }
//   };

//   const handleDelete = async (photoId) => {
//     const patientId = patientInfo.patientId;
//     try {
//       console.log("Deleting photo with ID:", photoId);
//       await axios.delete(
//         `http://localhost:5005/patients/${patientId}/fotografias/${photoId}`
//       );
//       const updatedFotografias = savedFotografias.filter(
//         (photo) => photo._id !== photoId
//       );
//       setLocalSavedFotografias(updatedFotografias);
//       setSavedFotografias(updatedFotografias); // Save to context
//       console.log("Photo deleted successfully");
//     } catch (error) {
//       console.error("Failed to delete photo:", error);
//       alert("Failed to delete the photo!");
//     }
//   };

//   return (
//     <div className="fotografias-form">
//       <h2>Fotografias</h2>
//       <div className="new-photo-entry">
//         <input type="file" accept="image/*" onChange={handleFileChange} />
//         <input
//           type="text"
//           placeholder="Descrição da foto"
//           value={newPhoto.description}
//           onChange={handleDescriptionChange}
//         />
//         <button
//           type="button"
//           onClick={handleAddPhoto}
//           disabled={!newPhoto.file}
//         >
//           Adicionar Foto
//         </button>
//       </div>
//       <div className="saved-photos">
//         {savedFotografias.map((photo) => (
//           <div key={photo._id} className="photo-entry">
//             <p>Nome: {photo.fileName}</p>
//             <p>Descrição: {photo.description}</p>
//             <button onClick={() => handleDelete(photo._id)}>Excluir</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Fotografias;

// import React, { useState, useEffect } from "react";
// import { usePatientInfo } from "../../../context/PatientContext";
// import imageCompression from "browser-image-compression";
// import axios from "axios";
// import "./styles.css";

// function Fotografias() {
//   const { patientInfo, setSavedFotografias } = usePatientInfo();
//   const [savedFotografias, setLocalSavedFotografias] = useState([]);
//   const [newPhoto, setNewPhoto] = useState({
//     path: "",
//     description: "",
//     file: null,
//     fileName: "", // Add fileName to the state
//   });

//   useEffect(() => {
//     setLocalSavedFotografias(patientInfo.savedFotografias);
//   }, [patientInfo.savedFotografias]);

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     const options = {
//       maxSizeMB: 1,
//       maxWidthOrHeight: 800,
//       useWebWorker: true,
//     };
//     try {
//       const compressedFile = await imageCompression(file, options);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setNewPhoto((prev) => ({
//           ...prev,
//           path: reader.result,
//           file: compressedFile,
//           fileName: file.name, // Save the file name
//         }));
//       };
//       reader.readAsDataURL(compressedFile);
//     } catch (error) {
//       console.error("Error compressing file:", error);
//     }
//   };

//   const handleDescriptionChange = (event) => {
//     setNewPhoto((prev) => ({
//       ...prev,
//       description: event.target.value,
//     }));
//   };

//   const handleAddPhoto = async () => {
//     if (!newPhoto.file) {
//       alert("Please select a new image.");
//       return;
//     }

//     const patientId = patientInfo.patientId;
//     const formData = new FormData();
//     formData.append("photograph", newPhoto.file);
//     formData.append("description", newPhoto.description);
//     formData.append("fileName", newPhoto.fileName); // Append file name to formData

//     try {
//       const response = await axios.patch(
//         `http://localhost:5005/patients/${patientId}/fotografias`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       const updatedFotografias = [...savedFotografias, response.data.photo];
//       setLocalSavedFotografias(updatedFotografias);
//       setSavedFotografias(updatedFotografias); // Save to context

//       setNewPhoto({ path: "", description: "", file: null, fileName: "" }); // Reset the new photo input
//     } catch (error) {
//       console.error("Failed to add photo:", error);
//       alert("Failed to add the photo!");
//     }
//   };

//   const handleDelete = async (photoId) => {
//     const patientId = patientInfo.patientId;
//     try {
//       console.log("Deleting photo with ID:", photoId);
//       await axios.delete(
//         `http://localhost:5005/patients/${patientId}/fotografias/${photoId}`
//       );
//       const updatedFotografias = savedFotografias.filter(
//         (photo) => photo._id !== photoId
//       );
//       setLocalSavedFotografias(updatedFotografias);
//       setSavedFotografias(updatedFotografias); // Save to context
//       console.log("Photo deleted successfully");
//     } catch (error) {
//       console.error("Failed to delete photo:", error);
//       alert("Failed to delete the photo!");
//     }
//   };

//   return (
//     <div className="fotografias-form">
//       <h2>Fotografias</h2>
//       <div className="new-photo-entry">
//         <input type="file" accept="image/*" onChange={handleFileChange} />
//         <input
//           type="text"
//           placeholder="Descrição da foto"
//           value={newPhoto.description}
//           onChange={handleDescriptionChange}
//         />
//         <button
//           type="button"
//           onClick={handleAddPhoto}
//           disabled={!newPhoto.file}
//         >
//           Adicionar Foto
//         </button>
//       </div>
//       <div className="saved-photos">
//         {savedFotografias.map((photo) => (
//           <div key={photo._id} className="photo-entry">
//             <p>Nome: {photo.fileName}</p>
//             <p>Descrição: {photo.description}</p>
//             <button onClick={() => handleDelete(photo._id)}>Excluir</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Fotografias;

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
        `http://localhost:5005/patients/${patientId}/fotografias`,
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

  const handleDelete = async (photoId) => {
    const patientId = patientInfo.patientId;
    try {
      console.log("Deleting photo with ID:", photoId);
      await axios.delete(
        `http://localhost:5005/patients/${patientId}/fotografias/${photoId}`
      );
      const updatedFotografias = savedFotografias.filter(
        (photo) => photo._id !== photoId
      );
      setLocalSavedFotografias(updatedFotografias);
      setSavedFotografias(updatedFotografias); // Save to context
      console.log("Photo deleted successfully");
    } catch (error) {
      console.error("Failed to delete photo:", error);
      alert("Failed to delete the photo!");
    }
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
        {savedFotografias.map((photo) => (
          <div key={photo._id} className="photo-entry">
            <p>Nome: {photo.nome}</p>
            <p>Descrição: {photo.description}</p>
            <button onClick={() => handleDelete(photo._id)}>Excluir</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Fotografias;
