// // work perfectly but the sides of the tooth need to be adjusted
// import React, { useState, useEffect, useCallback, useRef } from "react";
// import axios from "axios";
// import Modal from "react-modal";
// import Select from "react-select";
// import { usePatientInfo } from "../../../context/PatientContext"; // Ensure the path is correct

// Modal.setAppElement("#root");

// const colorOptions = [
//   { value: "00B057", label: "CARIE", color: "#00B057" },
//   { value: "0070BD", label: "ENDO CONCLUIDA", color: "#0070BD" },
//   { value: "FF0000", label: "AUSENTE", color: "#FF0000" },
//   { value: "AEAAAA", label: "EXODONTIA", color: "#AEAAAA" },
//   { value: "C08F1C", label: "CANAL", color: "#C08F1C" },
//   { value: "FFFF3A", label: "COROA", color: "#FFFF3A" },
//   { value: "CD66FB", label: "IMPLANTE", color: "#CD66FB" },
//   { value: "365627", label: "PINO", color: "#365627" },
//   { value: "70309D", label: "RX", color: "#70309D" },
//   { value: "C75919", label: "RESTAURAÇÃO", color: "#C75919" },
//   { value: "00B0EE", label: "OUTROS", color: "#00B0EE" },
// ];

// const sideNames = {
//   V: "Vestibular",
//   M: "Mesial",
//   D: "Distal",
//   L: "Lingual",
//   P: "Palatina",
//   O: "Oclusal",
// };

// function DentalChart() {
//   const { patientInfo, setPatientInfo } = usePatientInfo();
//   const [selectedTooth, setSelectedTooth] = useState(null);
//   const [selectedSides, setSelectedSides] = useState([]);
//   const [isSideModalOpen, setIsSideModalOpen] = useState(false);
//   const [isFormModalOpen, setIsFormModalOpen] = useState(false);
//   const [procedureData, setProcedureData] = useState({
//     procedimento: "",
//     operation: "",
//     situacao: "",
//   });
//   const [lastSavedProcedures, setLastSavedProcedures] = useState([]);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);
//   const [deleteIndex, setDeleteIndex] = useState(null);

//   const initialRender = useRef(true);

//   useEffect(() => {
//     Modal.setAppElement("#root");
//   }, []);

//   const handleToothClick = (tooth) => {
//     setSelectedTooth(Number(tooth));
//     setSelectedSides([]);
//     setIsSideModalOpen(true);
//     setIsEditMode(false);
//   };

//   const handleSideSelect = (side) => {
//     setSelectedSides((prev) => {
//       if (prev.includes(side)) {
//         return prev;
//       }
//       return [...prev, side];
//     });
//   };

//   const handleSideSubmit = () => {
//     setIsSideModalOpen(false);
//     setIsFormModalOpen(true);
//   };

//   const handleSelectChange = (selectedOption) => {
//     setProcedureData((prev) => ({
//       ...prev,
//       operation: selectedOption.label,
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProcedureData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newProcedure = {
//       dente: Number(selectedTooth),
//       sides: selectedSides.map((side) => ({
//         side: side.toString(),
//       })),
//       situacao: procedureData.situacao,
//       procedimento: procedureData.procedimento,
//       operation: procedureData.operation,
//     };

//     const updatedProcedures = [...patientInfo.procedimentos];

//     if (isEditMode && editIndex !== null) {
//       updatedProcedures[editIndex] = newProcedure;
//     } else {
//       updatedProcedures.push(newProcedure);
//     }

//     updatedProcedures.sort((a, b) => a.dente - b.dente);

//     setPatientInfo((prev) => ({
//       ...prev,
//       procedimentos: updatedProcedures,
//     }));

//     setIsEditMode(false);
//     setIsFormModalOpen(false);
//   };

//   const handleEdit = (index) => {
//     const proc = patientInfo.procedimentos[index];
//     setSelectedTooth(proc.dente);
//     setSelectedSides([]);
//     setProcedureData({
//       procedimento: proc.procedimento,
//       operation: proc.operation,
//       situacao: proc.situacao,
//     });
//     setEditIndex(index);
//     setIsEditMode(true);
//     setIsSideModalOpen(true);
//   };

//   const handleDeleteClick = (index) => {
//     setDeleteIndex(index);
//     setShowConfirmationModal(true);
//   };

//   const handleDelete = () => {
//     const updatedProcedures = patientInfo.procedimentos.filter(
//       (_, i) => i !== deleteIndex
//     );
//     setPatientInfo((prev) => ({
//       ...prev,
//       procedimentos: updatedProcedures,
//     }));
//     setShowConfirmationModal(false);
//   };

//   const saveData = useCallback(
//     async (data) => {
//       try {
//         await axios.patch(
//           `http://localhost:5005/patients/${
//             patientInfo.patientId || patientInfo._id
//           }/procedimento`,
//           { procedimentos: data },
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         setLastSavedProcedures(data);
//       } catch (error) {
//         console.error("Failed to save data", error);
//       }
//     },
//     [patientInfo]
//   );

//   const autosaveProcedures = useCallback(() => {
//     if (
//       JSON.stringify(lastSavedProcedures) !==
//       JSON.stringify(patientInfo.procedimentos)
//     ) {
//       saveData(patientInfo.procedimentos);
//     }
//   }, [patientInfo.procedimentos, lastSavedProcedures, saveData]);

//   useEffect(() => {
//     if (!initialRender.current) {
//       if (patientInfo.procedimentos.length > 0) {
//         const autosaveInterval = setInterval(autosaveProcedures, 30000);
//         return () => clearInterval(autosaveInterval);
//       }
//     } else {
//       initialRender.current = false;
//     }
//   }, [patientInfo.procedimentos, autosaveProcedures]);

//   return (
//     <div>
//       {/* Upper teeth arranged from 11 to 28 */}
//       <div
//         style={{ display: "flex", justifyContent: "center", margin: "20px" }}
//       >
//         {Array.from({ length: 8 }, (_, i) => 11 + i)
//           .reverse()
//           .concat(Array.from({ length: 8 }, (_, i) => 21 + i))
//           .map((tooth) => (
//             <button key={tooth} onClick={() => handleToothClick(tooth)}>
//               Tooth {tooth}
//             </button>
//           ))}
//       </div>
//       {/* Lower teeth arranged from 41 to 48 and 31 to 38 */}
//       <div
//         style={{ display: "flex", justifyContent: "center", margin: "20px" }}
//       >
//         {Array.from({ length: 8 }, (_, i) => 41 + i)
//           .reverse()
//           .concat(Array.from({ length: 8 }, (_, i) => 31 + i))
//           .map((tooth) => (
//             <button key={tooth} onClick={() => handleToothClick(tooth)}>
//               Tooth {tooth}
//             </button>
//           ))}
//       </div>
//       {/* Render saved procedures */}
//       <div>
//         {patientInfo.procedimentos
//           .slice()
//           .sort((a, b) => a.dente - b.dente)
//           .map((proc, index) => (
//             <div key={index}>
//               Tooth {proc.dente} - Sides:{" "}
//               {proc.sides
//                 .map((side) => sideNames[side.side] || side.side)
//                 .join(", ")}{" "}
//               - Procedure: {proc.procedimento} - Operation:{" "}
//               {proc.operation || "N/A"} - Situation: {proc.situacao || "N/A"}
//               <button onClick={() => handleEdit(index)}>Edit</button>
//               <button onClick={() => handleDeleteClick(index)}>Delete</button>
//             </div>
//           ))}
//       </div>

//       {/* Modals for side selection and procedure details */}
//       <Modal
//         isOpen={isSideModalOpen}
//         onRequestClose={() => setIsSideModalOpen(false)}
//       >
//         <h2>Select sides for Tooth {selectedTooth}</h2>
//         {Object.keys(sideNames).map((side) => (
//           <button key={side} onClick={() => handleSideSelect(side)}>
//             {sideNames[side]}
//           </button>
//         ))}
//         <button onClick={handleSideSubmit}>OK</button>
//       </Modal>

//       <Modal
//         isOpen={isFormModalOpen}
//         onRequestClose={() => setIsFormModalOpen(false)}
//       >
//         <h2>
//           Details for Tooth {selectedTooth} / Sides{" "}
//           {selectedSides.map((side) => sideNames[side]).join(", ")}
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <label>Procedimento:</label>
//           <input
//             type="text"
//             placeholder="Procedimento"
//             value={procedureData.procedimento}
//             onChange={handleChange}
//             name="procedimento"
//           />
//           <label>Operation:</label>
//           <Select
//             options={colorOptions}
//             onChange={handleSelectChange}
//             getOptionLabel={(option) => option.label}
//             getOptionValue={(option) => option.value}
//             placeholder="Select an operation"
//           />
//           <label>Situação:</label>
//           <input
//             type="text"
//             name="situacao"
//             placeholder="Situação"
//             value={procedureData.situacao}
//             onChange={handleChange}
//           />
//           <button type="submit">Save</button>
//         </form>
//       </Modal>

//       {/* Confirmation modal for deleting */}
//       <Modal
//         isOpen={showConfirmationModal}
//         onRequestClose={() => setShowConfirmationModal(false)}
//         className="confirmation-modal"
//         overlayClassName="confirmation-modal-overlay"
//       >
//         <div className="modal-content">
//           <p>Tem certeza de que deseja excluir este procedimento?</p>
//           <button className="delete-button" onClick={handleDelete}>
//             Excluir
//           </button>
//           <button
//             className="cancel-button"
//             onClick={() => setShowConfirmationModal(false)}
//           >
//             Cancelar
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// }

// export default DentalChart;

// work perfectly before styling
// import React, { useState, useEffect, useCallback, useRef } from "react";
// import axios from "axios";
// import Modal from "react-modal";
// import Select from "react-select";
// import { usePatientInfo } from "../../../context/PatientContext"; // Ensure the path is correct
// import "./styles.css";

// Modal.setAppElement("#root");

// const colorOptions = [
//   { value: "00B057", label: "CARIE", color: "#00B057" },
//   { value: "0070BD", label: "ENDO CONCLUIDA", color: "#0070BD" },
//   { value: "FF0000", label: "AUSENTE", color: "#FF0000" },
//   { value: "AEAAAA", label: "EXODONTIA", color: "#AEAAAA" },
//   { value: "C08F1C", label: "CANAL", color: "#C08F1C" },
//   { value: "FFFF3A", label: "COROA", color: "#FFFF3A" },
//   { value: "CD66FB", label: "IMPLANTE", color: "#CD66FB" },
//   { value: "365627", label: "PINO", color: "#365627" },
//   { value: "70309D", label: "RX", color: "#70309D" },
//   { value: "C75919", label: "RESTAURAÇÃO", color: "#C75919" },
//   { value: "00B0EE", label: "OUTROS", color: "#00B0EE" },
// ];

// const sideNames = {
//   V: "Vestibular",
//   M: "Mesial",
//   D: "Distal",
//   L: "Lingual",
//   P: "Palatina",
//   O: "Oclusal",
// };

// function DentalChart() {
//   const { patientInfo, setPatientInfo } = usePatientInfo();
//   const [selectedTooth, setSelectedTooth] = useState(null);
//   const [selectedSides, setSelectedSides] = useState([]);
//   const [isSideModalOpen, setIsSideModalOpen] = useState(false);
//   const [isFormModalOpen, setIsFormModalOpen] = useState(false);
//   const [procedureData, setProcedureData] = useState({
//     procedimento: "",
//     operation: "",
//     situacao: "",
//   });
//   const [lastSavedProcedures, setLastSavedProcedures] = useState([]);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);
//   const [deleteIndex, setDeleteIndex] = useState(null);
//   const [availableSides, setAvailableSides] = useState([]);

//   const initialRender = useRef(true);

//   useEffect(() => {
//     Modal.setAppElement("#root");
//   }, []);

//   const handleToothClick = (tooth) => {
//     setSelectedTooth(Number(tooth));
//     setSelectedSides([]);
//     setIsSideModalOpen(true);
//     setIsEditMode(false);

//     if ((tooth >= 11 && tooth <= 18) || (tooth >= 21 && tooth <= 28)) {
//       setAvailableSides(["V", "D", "O", "M", "P"]);
//     } else if ((tooth >= 41 && tooth <= 48) || (tooth >= 31 && tooth <= 38)) {
//       setAvailableSides(["L", "M", "O", "D", "V"]);
//     }
//   };

//   const handleSideSelect = (side) => {
//     setSelectedSides((prev) => {
//       if (prev.includes(side)) {
//         return prev;
//       }
//       return [...prev, side];
//     });
//   };

//   const handleSideSubmit = () => {
//     setIsSideModalOpen(false);
//     setIsFormModalOpen(true);
//   };

//   const handleSelectChange = (selectedOption) => {
//     setProcedureData((prev) => ({
//       ...prev,
//       operation: selectedOption.label,
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProcedureData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newProcedure = {
//       dente: Number(selectedTooth),
//       sides: selectedSides.map((side) => ({
//         side: side.toString(),
//       })),
//       situacao: procedureData.situacao,
//       procedimento: procedureData.procedimento,
//       operation: procedureData.operation,
//     };

//     const updatedProcedures = [...patientInfo.procedimentos];

//     if (isEditMode && editIndex !== null) {
//       updatedProcedures[editIndex] = newProcedure;
//     } else {
//       updatedProcedures.push(newProcedure);
//     }

//     updatedProcedures.sort((a, b) => a.dente - b.dente);

//     setPatientInfo((prev) => ({
//       ...prev,
//       procedimentos: updatedProcedures,
//     }));

//     setIsEditMode(false);
//     setIsFormModalOpen(false);
//   };

//   const handleEdit = (index) => {
//     const proc = patientInfo.procedimentos[index];
//     setSelectedTooth(proc.dente);
//     setSelectedSides([]);
//     setProcedureData({
//       procedimento: proc.procedimento,
//       operation: proc.operation,
//       situacao: proc.situacao,
//     });

//     // Set available sides based on the selected tooth
//     if (
//       (proc.dente >= 11 && proc.dente <= 18) ||
//       (proc.dente >= 21 && proc.dente <= 28)
//     ) {
//       setAvailableSides(["V", "D", "O", "M", "P"]);
//     } else if (
//       (proc.dente >= 41 && proc.dente <= 48) ||
//       (proc.dente >= 31 && proc.dente <= 38)
//     ) {
//       setAvailableSides(["L", "M", "O", "D", "V"]);
//     }

//     setEditIndex(index);
//     setIsEditMode(true);
//     setIsSideModalOpen(true);
//   };

//   const handleDeleteClick = (index) => {
//     setDeleteIndex(index);
//     setShowConfirmationModal(true);
//   };

//   const handleDelete = () => {
//     console.log("Delete index:", deleteIndex); // Debug log
//     const updatedProcedures = patientInfo.procedimentos.filter(
//       (_, i) => i !== deleteIndex
//     );
//     console.log("Updated procedures:", updatedProcedures); // Debug log
//     setPatientInfo((prev) => ({
//       ...prev,
//       procedimentos: updatedProcedures,
//     }));
//     setShowConfirmationModal(false);
//   };

//   const saveData = useCallback(
//     async (data) => {
//       try {
//         await axios.patch(
//           `http://localhost:5005/patients/${
//             patientInfo.patientId || patientInfo._id
//           }/procedimento`,
//           { procedimentos: data },
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         setLastSavedProcedures(data);
//       } catch (error) {
//         console.error("Failed to save data", error);
//       }
//     },
//     [patientInfo]
//   );

//   const autosaveProcedures = useCallback(() => {
//     if (
//       JSON.stringify(lastSavedProcedures) !==
//       JSON.stringify(patientInfo.procedimentos)
//     ) {
//       saveData(patientInfo.procedimentos);
//     }
//   }, [patientInfo.procedimentos, lastSavedProcedures, saveData]);

//   useEffect(() => {
//     if (!initialRender.current) {
//       if (patientInfo.procedimentos.length > 0) {
//         const autosaveInterval = setInterval(autosaveProcedures, 30000);
//         return () => clearInterval(autosaveInterval);
//       }
//     } else {
//       initialRender.current = false;
//     }
//   }, [patientInfo.procedimentos, autosaveProcedures]);

//   return (
//     <div>
//       {/* Upper teeth arranged from 11 to 28 */}
//       <div
//         style={{ display: "flex", justifyContent: "center", margin: "20px" }}
//       >
//         {Array.from({ length: 8 }, (_, i) => 11 + i)
//           .reverse()
//           .concat(Array.from({ length: 8 }, (_, i) => 21 + i))
//           .map((tooth) => (
//             <button key={tooth} onClick={() => handleToothClick(tooth)}>
//               Tooth {tooth}
//             </button>
//           ))}
//       </div>
//       {/* Lower teeth arranged from 41 to 48 and 31 to 38 */}
//       <div
//         style={{ display: "flex", justifyContent: "center", margin: "20px" }}
//       >
//         {Array.from({ length: 8 }, (_, i) => 41 + i)
//           .reverse()
//           .concat(Array.from({ length: 8 }, (_, i) => 31 + i))
//           .map((tooth) => (
//             <button key={tooth} onClick={() => handleToothClick(tooth)}>
//               Tooth {tooth}
//             </button>
//           ))}
//       </div>
//       {/* Render saved procedures */}
//       <div>
//         {patientInfo.procedimentos
//           .slice()
//           .sort((a, b) => a.dente - b.dente)
//           .map((proc, index) => (
//             <div key={index}>
//               Tooth {proc.dente} - Sides:{" "}
//               {proc.sides
//                 .map((side) => sideNames[side.side] || side.side)
//                 .join(", ")}{" "}
//               - Procedure: {proc.procedimento} - Operation:{" "}
//               {proc.operation || "N/A"} - Situation: {proc.situacao || "N/A"}
//               <button onClick={() => handleEdit(index)}>Edit</button>
//               <button onClick={() => handleDeleteClick(index)}>Delete</button>
//             </div>
//           ))}
//       </div>

//       {/* Modals for side selection and procedure details */}
//       <Modal
//         isOpen={isSideModalOpen}
//         onRequestClose={() => setIsSideModalOpen(false)}
//       >
//         <h2>Select sides for Tooth {selectedTooth}</h2>
//         {availableSides.map((side) => (
//           <button key={side} onClick={() => handleSideSelect(side)}>
//             {sideNames[side]}
//           </button>
//         ))}
//         <button onClick={handleSideSubmit}>OK</button>
//       </Modal>

//       <Modal
//         isOpen={isFormModalOpen}
//         onRequestClose={() => setIsFormModalOpen(false)}
//       >
//         <h2>
//           Details for Tooth {selectedTooth} / Sides{" "}
//           {selectedSides.map((side) => sideNames[side]).join(", ")}
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <label>Procedimento:</label>
//           <input
//             type="text"
//             placeholder="Procedimento"
//             value={procedureData.procedimento}
//             onChange={handleChange}
//             name="procedimento"
//           />
//           <label>Operation:</label>
//           <Select
//             options={colorOptions}
//             onChange={handleSelectChange}
//             getOptionLabel={(option) => option.label}
//             getOptionValue={(option) => option.value}
//             placeholder="Select an operation"
//           />
//           <label>Situação:</label>
//           <input
//             type="text"
//             name="situacao"
//             placeholder="Situação"
//             value={procedureData.situacao}
//             onChange={handleChange}
//           />
//           <button type="submit">Save</button>
//         </form>
//       </Modal>

//       {/* Confirmation modal for deleting */}
//       <Modal
//         isOpen={showConfirmationModal}
//         onRequestClose={() => setShowConfirmationModal(false)}
//         className="confirmation-modal"
//         overlayClassName="confirmation-modal-overlay"
//       >
//         <div className="modal-content">
//           <p>Tem certeza de que deseja excluir este procedimento?</p>
//           <button className="delete-button" onClick={handleDelete}>
//             Excluir
//           </button>
//           <button
//             className="cancel-button"
//             onClick={() => setShowConfirmationModal(false)}
//           >
//             Cancelar
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// }

// export default DentalChart;

// // works perfectly with nice buttons
// import React, { useState, useEffect, useCallback, useRef } from "react";
// import axios from "axios";
// import Modal from "react-modal";
// import Select from "react-select";
// import { usePatientInfo } from "../../../context/PatientContext"; // Ensure the path is correct
// import "./styles.css"; // Ensure the CSS file is imported

// Modal.setAppElement("#root");

// const colorOptions = [
//   { value: "00B057", label: "CARIE", color: "#00B057" },
//   { value: "0070BD", label: "ENDO CONCLUIDA", color: "#0070BD" },
//   { value: "FF0000", label: "AUSENTE", color: "#FF0000" },
//   { value: "AEAAAA", label: "EXODONTIA", color: "#AEAAAA" },
//   { value: "C08F1C", label: "CANAL", color: "#C08F1C" },
//   { value: "FFFF3A", label: "COROA", color: "#FFFF3A" },
//   { value: "CD66FB", label: "IMPLANTE", color: "#CD66FB" },
//   { value: "365627", label: "PINO", color: "#365627" },
//   { value: "70309D", label: "RX", color: "#70309D" },
//   { value: "C75919", label: "RESTAURAÇÃO", color: "#C75919" },
//   { value: "00B0EE", label: "OUTROS", color: "#00B0EE" },
// ];

// const sideNames = {
//   V: "Vestibular",
//   M: "Mesial",
//   D: "Distal",
//   L: "Lingual",
//   P: "Palatina",
//   O: "Oclusal",
// };

// function DentalChart() {
//   const { patientInfo, setPatientInfo } = usePatientInfo();
//   const [selectedTooth, setSelectedTooth] = useState(null);
//   const [selectedSides, setSelectedSides] = useState([]);
//   const [isSideModalOpen, setIsSideModalOpen] = useState(false);
//   const [isFormModalOpen, setIsFormModalOpen] = useState(false);
//   const [procedureData, setProcedureData] = useState({
//     procedimento: "",
//     operation: "",
//     situacao: "",
//   });
//   const [lastSavedProcedures, setLastSavedProcedures] = useState([]);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);
//   const [deleteIndex, setDeleteIndex] = useState(null);
//   const [availableSides, setAvailableSides] = useState([]);

//   const initialRender = useRef(true);

//   useEffect(() => {
//     Modal.setAppElement("#root");
//   }, []);

//   const handleToothClick = (tooth) => {
//     setSelectedTooth(Number(tooth));
//     setSelectedSides([]);
//     setIsSideModalOpen(true);
//     setIsEditMode(false);

//     if ((tooth >= 11 && tooth <= 18) || (tooth >= 21 && tooth <= 28)) {
//       setAvailableSides(["V", "D", "O", "M", "P"]);
//     } else if ((tooth >= 41 && tooth <= 48) || (tooth >= 31 && tooth <= 38)) {
//       setAvailableSides(["L", "M", "O", "D", "V"]);
//     }
//   };

//   const handleSideSelect = (side) => {
//     setSelectedSides((prev) => {
//       if (prev.includes(side)) {
//         return prev;
//       }
//       return [...prev, side];
//     });
//   };

//   const handleSideSubmit = () => {
//     setIsSideModalOpen(false);
//     setIsFormModalOpen(true);
//   };

//   const handleSelectChange = (selectedOption) => {
//     setProcedureData((prev) => ({
//       ...prev,
//       operation: selectedOption.label,
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProcedureData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newProcedure = {
//       dente: Number(selectedTooth),
//       sides: selectedSides.map((side) => ({
//         side: side.toString(),
//       })),
//       situacao: procedureData.situacao,
//       procedimento: procedureData.procedimento,
//       operation: procedureData.operation,
//     };

//     const updatedProcedures = [...patientInfo.procedimentos];

//     if (isEditMode && editIndex !== null) {
//       updatedProcedures[editIndex] = newProcedure;
//     } else {
//       updatedProcedures.push(newProcedure);
//     }

//     updatedProcedures.sort((a, b) => a.dente - b.dente);

//     setPatientInfo((prev) => ({
//       ...prev,
//       procedimentos: updatedProcedures,
//     }));

//     setIsEditMode(false);
//     setIsFormModalOpen(false);
//   };

//   const handleEdit = (index) => {
//     const proc = patientInfo.procedimentos[index];
//     setSelectedTooth(proc.dente);
//     setSelectedSides([]);
//     setProcedureData({
//       procedimento: proc.procedimento,
//       operation: proc.operation,
//       situacao: proc.situacao,
//     });

//     // Set available sides based on the selected tooth
//     if (
//       (proc.dente >= 11 && proc.dente <= 18) ||
//       (proc.dente >= 21 && proc.dente <= 28)
//     ) {
//       setAvailableSides(["V", "D", "O", "M", "P"]);
//     } else if (
//       (proc.dente >= 41 && proc.dente <= 48) ||
//       (proc.dente >= 31 && proc.dente <= 38)
//     ) {
//       setAvailableSides(["L", "M", "O", "D", "V"]);
//     }

//     setEditIndex(index);
//     setIsEditMode(true);
//     setIsSideModalOpen(true);
//   };

//   const handleDeleteClick = (index) => {
//     setDeleteIndex(index);
//     setShowConfirmationModal(true);
//   };

//   const handleDelete = () => {
//     console.log("Delete index:", deleteIndex); // Debug log
//     const updatedProcedures = patientInfo.procedimentos.filter(
//       (_, i) => i !== deleteIndex
//     );
//     console.log("Updated procedures:", updatedProcedures); // Debug log
//     setPatientInfo((prev) => ({
//       ...prev,
//       procedimentos: updatedProcedures,
//     }));
//     setShowConfirmationModal(false);
//   };

//   const saveData = useCallback(
//     async (data) => {
//       try {
//         await axios.patch(
//           `http://localhost:5005/patients/${
//             patientInfo.patientId || patientInfo._id
//           }/procedimento`,
//           { procedimentos: data },
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         setLastSavedProcedures(data);
//       } catch (error) {
//         console.error("Failed to save data", error);
//       }
//     },
//     [patientInfo]
//   );

//   const autosaveProcedures = useCallback(() => {
//     if (
//       JSON.stringify(lastSavedProcedures) !==
//       JSON.stringify(patientInfo.procedimentos)
//     ) {
//       saveData(patientInfo.procedimentos);
//     }
//   }, [patientInfo.procedimentos, lastSavedProcedures, saveData]);

//   useEffect(() => {
//     if (!initialRender.current) {
//       if (patientInfo.procedimentos.length > 0) {
//         const autosaveInterval = setInterval(autosaveProcedures, 30000);
//         return () => clearInterval(autosaveInterval);
//       }
//     } else {
//       initialRender.current = false;
//     }
//   }, [patientInfo.procedimentos, autosaveProcedures]);

//   return (
//     <div className="dental-chart">
//       {/* Upper teeth arranged from 11 to 28 */}
//       <div className="dental-chart__scroll-container">
//         <div className="dental-chart__upper-teeth">
//           {Array.from({ length: 8 }, (_, i) => 11 + i)
//             .reverse()
//             .map((tooth) => (
//               <button
//                 key={tooth}
//                 onClick={() => handleToothClick(tooth)}
//                 className="dental-chart__tooth-button"
//               >
//                 {tooth}
//               </button>
//             ))}
//           <div className="dental-chart__gap"></div>
//           {Array.from({ length: 8 }, (_, i) => 21 + i).map((tooth) => (
//             <button
//               key={tooth}
//               onClick={() => handleToothClick(tooth)}
//               className="dental-chart__tooth-button"
//             >
//               {tooth}
//             </button>
//           ))}
//         </div>
//       </div>
//       {/* Lower teeth arranged from 41 to 48 and 31 to 38 */}
//       <div className="dental-chart__scroll-container">
//         <div className="dental-chart__lower-teeth">
//           {Array.from({ length: 8 }, (_, i) => 41 + i)
//             .reverse()
//             .map((tooth) => (
//               <button
//                 key={tooth}
//                 onClick={() => handleToothClick(tooth)}
//                 className="dental-chart__tooth-button"
//               >
//                 {tooth}
//               </button>
//             ))}
//           <div className="dental-chart__gap"></div>
//           {Array.from({ length: 8 }, (_, i) => 31 + i).map((tooth) => (
//             <button
//               key={tooth}
//               onClick={() => handleToothClick(tooth)}
//               className="dental-chart__tooth-button"
//             >
//               {tooth}
//             </button>
//           ))}
//         </div>
//       </div>
//       {/* Render saved procedures */}
//       <div>
//         {patientInfo.procedimentos
//           .slice()
//           .sort((a, b) => a.dente - b.dente)
//           .map((proc, index) => (
//             <div key={index}>
//               Tooth {proc.dente} - Sides:{" "}
//               {proc.sides
//                 .map((side) => sideNames[side.side] || side.side)
//                 .join(", ")}{" "}
//               - Procedure: {proc.procedimento} - Operation:{" "}
//               {proc.operation || "N/A"} - Situation: {proc.situacao || "N/A"}
//               <button onClick={() => handleEdit(index)}>Edit</button>
//               <button onClick={() => handleDeleteClick(index)}>Delete</button>
//             </div>
//           ))}
//       </div>

//       {/* Modals for side selection and procedure details */}
//       <Modal
//         isOpen={isSideModalOpen}
//         onRequestClose={() => setIsSideModalOpen(false)}
//       >
//         <h2>Select sides for Tooth {selectedTooth}</h2>
//         {availableSides.map((side) => (
//           <button key={side} onClick={() => handleSideSelect(side)}>
//             {sideNames[side]}
//           </button>
//         ))}
//         <button onClick={handleSideSubmit}>OK</button>
//       </Modal>

//       <Modal
//         isOpen={isFormModalOpen}
//         onRequestClose={() => setIsFormModalOpen(false)}
//       >
//         <h2>
//           Details for Tooth {selectedTooth} / Sides{" "}
//           {selectedSides.map((side) => sideNames[side]).join(", ")}
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <label>Procedimento:</label>
//           <input
//             type="text"
//             placeholder="Procedimento"
//             value={procedureData.procedimento}
//             onChange={handleChange}
//             name="procedimento"
//           />
//           <label>Operation:</label>
//           <Select
//             options={colorOptions}
//             onChange={handleSelectChange}
//             getOptionLabel={(option) => option.label}
//             getOptionValue={(option) => option.value}
//             placeholder="Select an operation"
//           />
//           <label>Situação:</label>
//           <input
//             type="text"
//             name="situacao"
//             placeholder="Situação"
//             value={procedureData.situacao}
//             onChange={handleChange}
//           />
//           <button type="submit">Save</button>
//         </form>
//       </Modal>

//       {/* Confirmation modal for deleting */}
//       <Modal
//         isOpen={showConfirmationModal}
//         onRequestClose={() => setShowConfirmationModal(false)}
//         className="confirmation-modal"
//         overlayClassName="confirmation-modal-overlay"
//       >
//         <div className="modal-content">
//           <p>Tem certeza de que deseja excluir este procedimento?</p>
//           <button className="delete-button" onClick={handleDelete}>
//             Excluir
//           </button>
//           <button
//             className="cancel-button"
//             onClick={() => setShowConfirmationModal(false)}
//           >
//             Cancelar
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// }

// export default DentalChart;

// import React, { useState, useEffect, useCallback, useRef } from "react";
// import axios from "axios";
// import Modal from "react-modal";
// import Select from "react-select";
// import { usePatientInfo } from "../../../context/PatientContext"; // Ensure the path is correct
// import "./styles.css"; // Ensure the CSS file is imported

// Modal.setAppElement("#root");

// const colorOptions = [
//   { value: "00B057", label: "CARIE", color: "#00B057" },
//   { value: "0070BD", label: "ENDO CONCLUIDA", color: "#0070BD" },
//   { value: "FF0000", label: "AUSENTE", color: "#FF0000" },
//   { value: "AEAAAA", label: "EXODONTIA", color: "#AEAAAA" },
//   { value: "C08F1C", label: "CANAL", color: "#C08F1C" },
//   { value: "FFFF3A", label: "COROA", color: "#FFFF3A" },
//   { value: "CD66FB", label: "IMPLANTE", color: "#CD66FB" },
//   { value: "365627", label: "PINO", color: "#365627" },
//   { value: "70309D", label: "RX", color: "#70309D" },
//   { value: "C75919", label: "RESTAURAÇÃO", color: "#C75919" },
//   { value: "00B0EE", label: "OUTROS", color: "#00B0EE" },
// ];

// const sideNames = {
//   V: "Vestibular",
//   M: "Mesial",
//   D: "Distal",
//   L: "Lingual",
//   P: "Palatina",
//   O: "Oclusal",
// };

// function DentalChart() {
//   const { patientInfo, setPatientInfo } = usePatientInfo();
//   const [selectedTooth, setSelectedTooth] = useState(null);
//   const [selectedSides, setSelectedSides] = useState([]);
//   const [isSideModalOpen, setIsSideModalOpen] = useState(false);
//   const [isFormModalOpen, setIsFormModalOpen] = useState(false);
//   const [procedureData, setProcedureData] = useState({
//     procedimento: "",
//     operation: "",
//     situacao: "",
//   });
//   const [lastSavedProcedures, setLastSavedProcedures] = useState([]);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);
//   const [deleteIndex, setDeleteIndex] = useState(null);
//   const [availableSides, setAvailableSides] = useState([]);

//   const initialRender = useRef(true);

//   useEffect(() => {
//     Modal.setAppElement("#root");
//   }, []);

//   const handleToothClick = (tooth) => {
//     setSelectedTooth(Number(tooth));
//     setSelectedSides([]);
//     setIsSideModalOpen(true);
//     setIsEditMode(false);

//     if ((tooth >= 11 && tooth <= 18) || (tooth >= 21 && tooth <= 28)) {
//       setAvailableSides(["V", "D", "O", "M", "P"]);
//     } else if ((tooth >= 41 && tooth <= 48) || (tooth >= 31 && tooth <= 38)) {
//       setAvailableSides(["L", "M", "O", "D", "V"]);
//     }
//   };

//   const handleSideSelect = (side) => {
//     setSelectedSides((prev) => {
//       if (prev.includes(side)) {
//         return prev;
//       }
//       return [...prev, side];
//     });
//   };

//   const handleSideSubmit = () => {
//     setIsSideModalOpen(false);
//     setIsFormModalOpen(true);
//   };

//   const handleSelectChange = (selectedOption) => {
//     setProcedureData((prev) => ({
//       ...prev,
//       operation: selectedOption.label,
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProcedureData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newProcedure = {
//       dente: Number(selectedTooth),
//       sides: selectedSides.map((side) => ({
//         side: side.toString(),
//       })),
//       situacao: procedureData.situacao,
//       procedimento: procedureData.procedimento,
//       operation: procedureData.operation,
//     };

//     const updatedProcedures = [...patientInfo.procedimentos];

//     if (isEditMode && editIndex !== null) {
//       updatedProcedures[editIndex] = newProcedure;
//     } else {
//       updatedProcedures.push(newProcedure);
//     }

//     updatedProcedures.sort((a, b) => a.dente - b.dente);

//     setPatientInfo((prev) => ({
//       ...prev,
//       procedimentos: updatedProcedures,
//     }));

//     setIsEditMode(false);
//     setIsFormModalOpen(false);
//   };

//   const handleEdit = (index) => {
//     const proc = patientInfo.procedimentos[index];
//     setSelectedTooth(proc.dente);
//     setSelectedSides([]);
//     setProcedureData({
//       procedimento: proc.procedimento,
//       operation: proc.operation,
//       situacao: proc.situacao,
//     });

//     // Set available sides based on the selected tooth
//     if (
//       (proc.dente >= 11 && proc.dente <= 18) ||
//       (proc.dente >= 21 && proc.dente <= 28)
//     ) {
//       setAvailableSides(["V", "D", "O", "M", "P"]);
//     } else if (
//       (proc.dente >= 41 && proc.dente <= 48) ||
//       (proc.dente >= 31 && proc.dente <= 38)
//     ) {
//       setAvailableSides(["L", "M", "O", "D", "V"]);
//     }

//     setEditIndex(index);
//     setIsEditMode(true);
//     setIsSideModalOpen(true);
//   };

//   const handleDeleteClick = (index) => {
//     setDeleteIndex(index);
//     setShowConfirmationModal(true);
//   };

//   const handleDelete = () => {
//     const updatedProcedures = patientInfo.procedimentos.filter(
//       (_, i) => i !== deleteIndex
//     );
//     setPatientInfo((prev) => ({
//       ...prev,
//       procedimentos: updatedProcedures,
//     }));
//     setShowConfirmationModal(false);
//   };

//   const saveData = useCallback(
//     async (data) => {
//       try {
//         await axios.patch(
//           `http://localhost:5005/patients/${
//             patientInfo.patientId || patientInfo._id
//           }/procedimento`,
//           { procedimentos: data },
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         setLastSavedProcedures(data);
//       } catch (error) {
//         console.error("Failed to save data", error);
//       }
//     },
//     [patientInfo]
//   );

//   // here adding the update till line 1240
//   const getToothRangeClass = (tooth) => {
//     if (tooth >= 11 && tooth <= 18) {
//       return "tooth-11-18";
//     } else if (tooth >= 21 && tooth <= 28) {
//       return "tooth-21-28";
//     } else if (tooth >= 41 && tooth <= 48) {
//       return "tooth-41-48";
//     } else if (tooth >= 31 && tooth <= 38) {
//       return "tooth-31-38";
//     }
//     return "";
//   };

//   const autosaveProcedures = useCallback(() => {
//     if (
//       JSON.stringify(lastSavedProcedures) !==
//       JSON.stringify(patientInfo.procedimentos)
//     ) {
//       saveData(patientInfo.procedimentos);
//     }
//   }, [patientInfo.procedimentos, lastSavedProcedures, saveData]);

//   useEffect(() => {
//     if (!initialRender.current) {
//       if (patientInfo.procedimentos.length > 0) {
//         const autosaveInterval = setInterval(autosaveProcedures, 30000);
//         return () => clearInterval(autosaveInterval);
//       }
//     } else {
//       initialRender.current = false;
//     }
//   }, [patientInfo.procedimentos, autosaveProcedures]);

//   return (
//     <div className="dental-chart">
//       {/* Upper teeth arranged from 11 to 28 */}
//       <div className="dental-chart__scroll-container">
//         <div className="dental-chart__upper-teeth">
//           {Array.from({ length: 8 }, (_, i) => 11 + i)
//             .reverse()
//             .map((tooth) => (
//               <button
//                 key={tooth}
//                 onClick={() => handleToothClick(tooth)}
//                 className="dental-chart__tooth-button"
//               >
//                 {tooth}
//               </button>
//             ))}
//           <div className="dental-chart__gap"></div>
//           {Array.from({ length: 8 }, (_, i) => 21 + i).map((tooth) => (
//             <button
//               key={tooth}
//               onClick={() => handleToothClick(tooth)}
//               className="dental-chart__tooth-button"
//             >
//               {tooth}
//             </button>
//           ))}
//         </div>
//       </div>
//       {/* Lower teeth arranged from 41 to 48 and 31 to 38 */}
//       <div className="dental-chart__scroll-container">
//         <div className="dental-chart__lower-teeth">
//           {Array.from({ length: 8 }, (_, i) => 41 + i)
//             .reverse()
//             .map((tooth) => (
//               <button
//                 key={tooth}
//                 onClick={() => handleToothClick(tooth)}
//                 className="dental-chart__tooth-button"
//               >
//                 {tooth}
//               </button>
//             ))}
//           <div className="dental-chart__gap"></div>
//           {Array.from({ length: 8 }, (_, i) => 31 + i).map((tooth) => (
//             <button
//               key={tooth}
//               onClick={() => handleToothClick(tooth)}
//               className="dental-chart__tooth-button"
//             >
//               {tooth}
//             </button>
//           ))}
//         </div>
//       </div>
//       {/* Render saved procedures */}
//       <div>
//         {patientInfo.procedimentos
//           .slice()
//           .sort((a, b) => a.dente - b.dente)
//           .map((proc, index) => (
//             <div key={index}>
//               Tooth {proc.dente} - Sides:{" "}
//               {proc.sides
//                 .map((side) => sideNames[side.side] || side.side)
//                 .join(", ")}{" "}
//               - Procedure: {proc.procedimento} - Operation:{" "}
//               {proc.operation || "N/A"} - Situation: {proc.situacao || "N/A"}
//               <button onClick={() => handleEdit(index)}>Edit</button>
//               <button onClick={() => handleDeleteClick(index)}>Delete</button>
//             </div>
//           ))}
//       </div>

//       {/* Modals for side selection and procedure details
//       <Modal
//         isOpen={isSideModalOpen}
//         onRequestClose={() => setIsSideModalOpen(false)}
//         className="side-selection-modal"
//         overlayClassName="side-selection-modal-overlay"
//       >
//         <h2>Select sides for Tooth {selectedTooth}</h2>
//         <div
//           className={`side-selection-container side-selection-container--${selectedTooth}`}
//         >
//           {availableSides.map((side) => (
//             <button
//               key={side}
//               onClick={() => handleSideSelect(side)}
//               className="tooth-side-button"
//             >
//               {side}
//             </button>
//           ))}
//         </div>
//         <button onClick={handleSideSubmit} className="tooth-side-ok-button">
//           OK
//         </button>
//       </Modal> */}

//       {/* <Modal
//         isOpen={isSideModalOpen}
//         onRequestClose={() => setIsSideModalOpen(false)}
//       >
//         <h2>Select sides for Tooth {selectedTooth}</h2>
//         <div className="dental-chart__side-modal">
//           {availableSides.map((side) => (
//             <button
//               key={side}
//               className={side}
//               onClick={() => handleSideSelect(side)}
//             >
//               {side}
//             </button>
//           ))}
//         </div>
//         <button className="dental-chart__ok-button" onClick={handleSideSubmit}>
//           OK
//         </button>
//       </Modal> */}
//       <Modal
//         isOpen={isSideModalOpen}
//         onRequestClose={() => setIsSideModalOpen(false)}
//         className="side-selection-modal"
//       >
//         <h2 className="modal-title">Selecionar lados do {selectedTooth}</h2>
//         <div
//           className={`dental-chart__side-modal ${getToothRangeClass(
//             selectedTooth
//           )}`}
//         >
//           {availableSides.map((side) => (
//             <button
//               key={side}
//               className={side}
//               onClick={() => handleSideSelect(side)}
//             >
//               {side}
//             </button>
//           ))}
//         </div>
//         <button className="dental-chart__ok-button" onClick={handleSideSubmit}>
//           OK
//         </button>
//       </Modal>

//       <Modal
//         isOpen={isFormModalOpen}
//         onRequestClose={() => setIsFormModalOpen(false)}
//       >
//         <h2>
//           Details for Tooth {selectedTooth} / Sides{" "}
//           {selectedSides.map((side) => sideNames[side]).join(", ")}
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <label>Procedimento:</label>
//           <input
//             type="text"
//             placeholder="Procedimento"
//             value={procedureData.procedimento}
//             onChange={handleChange}
//             name="procedimento"
//           />
//           <label>Operation:</label>
//           <Select
//             options={colorOptions}
//             onChange={handleSelectChange}
//             getOptionLabel={(option) => option.label}
//             getOptionValue={(option) => option.value}
//             placeholder="Select an operation"
//           />
//           <label>Situação:</label>
//           <input
//             type="text"
//             name="situacao"
//             placeholder="Situação"
//             value={procedureData.situacao}
//             onChange={handleChange}
//           />
//           <button type="submit">Save</button>
//         </form>
//       </Modal>

//       {/* Confirmation modal for deleting */}
//       <Modal
//         isOpen={showConfirmationModal}
//         onRequestClose={() => setShowConfirmationModal(false)}
//         className="confirmation-modal"
//         overlayClassName="confirmation-modal-overlay"
//       >
//         <div className="modal-content">
//           <p>Tem certeza de que deseja excluir este procedimento?</p>
//           <button className="delete-button" onClick={handleDelete}>
//             Excluir
//           </button>
//           <button
//             className="cancel-button"
//             onClick={() => setShowConfirmationModal(false)}
//           >
//             Cancelar
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// }

// export default DentalChart;

import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import Modal from "react-modal";
import Select from "react-select";
import { usePatientInfo } from "../../../context/PatientContext"; // Ensure the path is correct
import "./styles.css"; // Ensure the CSS file is imported

Modal.setAppElement("#root");

const colorOptions = [
  { value: "00B057", label: "CARIE", color: "#00B057" },
  { value: "0070BD", label: "ENDO CONCLUIDA", color: "#0070BD" },
  { value: "FF0000", label: "AUSENTE", color: "#FF0000" },
  { value: "AEAAAA", label: "EXODONTIA", color: "#AEAAAA" },
  { value: "C08F1C", label: "CANAL", color: "#C08F1C" },
  { value: "FFFF3A", label: "COROA", color: "#FFFF3A" },
  { value: "CD66FB", label: "IMPLANTE", color: "#CD66FB" },
  { value: "365627", label: "PINO", color: "#365627" },
  { value: "70309D", label: "RX", color: "#70309D" },
  { value: "C75919", label: "RESTAURAÇÃO", color: "#C75919" },
  { value: "00B0EE", label: "OUTROS", color: "#00B0EE" },
];

const sideNames = {
  V: "Vestibular",
  M: "Mesial",
  D: "Distal",
  L: "Lingual",
  P: "Palatina",
  O: "Oclusal",
};

function DentalChart() {
  const { patientInfo, setPatientInfo } = usePatientInfo();
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [selectedSides, setSelectedSides] = useState([]);
  const [isSideModalOpen, setIsSideModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [procedureData, setProcedureData] = useState({
    procedimento: "",
    operation: "",
    situacao: "",
  });
  const [lastSavedProcedures, setLastSavedProcedures] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [availableSides, setAvailableSides] = useState([]);

  const initialRender = useRef(true);

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const handleToothClick = (tooth) => {
    setSelectedTooth(Number(tooth));
    setSelectedSides([]);
    setIsSideModalOpen(true);
    setIsEditMode(false);

    if ((tooth >= 11 && tooth <= 18) || (tooth >= 21 && tooth <= 28)) {
      setAvailableSides(["V", "D", "O", "M", "P"]);
    } else if ((tooth >= 41 && tooth <= 48) || (tooth >= 31 && tooth <= 38)) {
      setAvailableSides(["L", "M", "O", "D", "V"]);
    }
  };

  const handleSideSelect = (side) => {
    const sideButton = document.querySelector(`.${side}`);
    if (sideButton.classList.contains("selected")) {
      sideButton.classList.remove("selected");
      setSelectedSides((prev) => prev.filter((s) => s !== side));
    } else {
      sideButton.classList.add("selected");
      setSelectedSides((prev) => [...prev, side]);
    }
  };

  const handleSideSubmit = () => {
    setIsSideModalOpen(false);
    setIsFormModalOpen(true);

    // Reset the selected state of the buttons
    document.querySelectorAll(".selected").forEach((button) => {
      button.classList.remove("selected");
    });
  };

  const handleSelectChange = (selectedOption) => {
    setProcedureData((prev) => ({
      ...prev,
      operation: selectedOption.label,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProcedureData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProcedure = {
      dente: Number(selectedTooth),
      sides: selectedSides.map((side) => ({
        side: side.toString(),
      })),
      situacao: procedureData.situacao,
      procedimento: procedureData.procedimento,
      operation: procedureData.operation,
    };

    const updatedProcedures = [...patientInfo.procedimentos];

    if (isEditMode && editIndex !== null) {
      updatedProcedures[editIndex] = newProcedure;
    } else {
      updatedProcedures.push(newProcedure);
    }

    updatedProcedures.sort((a, b) => a.dente - b.dente);

    setPatientInfo((prev) => ({
      ...prev,
      procedimentos: updatedProcedures,
    }));

    setIsEditMode(false);
    setIsFormModalOpen(false);
  };

  const handleEdit = (index) => {
    const proc = patientInfo.procedimentos[index];
    setSelectedTooth(proc.dente);
    setSelectedSides([]);
    setProcedureData({
      procedimento: proc.procedimento,
      operation: proc.operation,
      situacao: proc.situacao,
    });

    // Set available sides based on the selected tooth
    if (
      (proc.dente >= 11 && proc.dente <= 18) ||
      (proc.dente >= 21 && proc.dente <= 28)
    ) {
      setAvailableSides(["V", "D", "O", "M", "P"]);
    } else if (
      (proc.dente >= 41 && proc.dente <= 48) ||
      (proc.dente >= 31 && proc.dente <= 38)
    ) {
      setAvailableSides(["L", "M", "O", "D", "V"]);
    }

    setEditIndex(index);
    setIsEditMode(true);
    setIsSideModalOpen(true);
  };

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setShowConfirmationModal(true);
  };

  const handleDelete = () => {
    const updatedProcedures = patientInfo.procedimentos.filter(
      (_, i) => i !== deleteIndex
    );
    setPatientInfo((prev) => ({
      ...prev,
      procedimentos: updatedProcedures,
    }));
    setShowConfirmationModal(false);
  };

  const saveData = useCallback(
    async (data) => {
      try {
        await axios.patch(
          `http://localhost:5005/patients/${
            patientInfo.patientId || patientInfo._id
          }/procedimento`,
          { procedimentos: data },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setLastSavedProcedures(data);
      } catch (error) {
        console.error("Failed to save data", error);
      }
    },
    [patientInfo]
  );

  // here adding the update till line 1240
  const getToothRangeClass = (tooth) => {
    if (tooth >= 11 && tooth <= 18) {
      return "tooth-11-18";
    } else if (tooth >= 21 && tooth <= 28) {
      return "tooth-21-28";
    } else if (tooth >= 41 && tooth <= 48) {
      return "tooth-41-48";
    } else if (tooth >= 31 && tooth <= 38) {
      return "tooth-31-38";
    }
    return "";
  };

  const autosaveProcedures = useCallback(() => {
    if (
      JSON.stringify(lastSavedProcedures) !==
      JSON.stringify(patientInfo.procedimentos)
    ) {
      saveData(patientInfo.procedimentos);
    }
  }, [patientInfo.procedimentos, lastSavedProcedures, saveData]);

  useEffect(() => {
    if (!initialRender.current) {
      if (patientInfo.procedimentos.length > 0) {
        const autosaveInterval = setInterval(autosaveProcedures, 30000);
        return () => clearInterval(autosaveInterval);
      }
    } else {
      initialRender.current = false;
    }
  }, [patientInfo.procedimentos, autosaveProcedures]);

  return (
    <div className="dental-chart">
      {/* Upper teeth arranged from 11 to 28 */}
      <div className="dental-chart__scroll-container">
        <div className="dental-chart__upper-teeth">
          {Array.from({ length: 8 }, (_, i) => 11 + i)
            .reverse()
            .map((tooth) => (
              <button
                key={tooth}
                onClick={() => handleToothClick(tooth)}
                className="dental-chart__tooth-button"
              >
                {tooth}
              </button>
            ))}
          <div className="dental-chart__gap"></div>
          {Array.from({ length: 8 }, (_, i) => 21 + i).map((tooth) => (
            <button
              key={tooth}
              onClick={() => handleToothClick(tooth)}
              className="dental-chart__tooth-button"
            >
              {tooth}
            </button>
          ))}
        </div>
      </div>
      {/* Lower teeth arranged from 41 to 48 and 31 to 38 */}
      <div className="dental-chart__scroll-container">
        <div className="dental-chart__lower-teeth">
          {Array.from({ length: 8 }, (_, i) => 41 + i)
            .reverse()
            .map((tooth) => (
              <button
                key={tooth}
                onClick={() => handleToothClick(tooth)}
                className="dental-chart__tooth-button"
              >
                {tooth}
              </button>
            ))}
          <div className="dental-chart__gap"></div>
          {Array.from({ length: 8 }, (_, i) => 31 + i).map((tooth) => (
            <button
              key={tooth}
              onClick={() => handleToothClick(tooth)}
              className="dental-chart__tooth-button"
            >
              {tooth}
            </button>
          ))}
        </div>
      </div>
      {/* Render saved procedures */}
      {/* <div>
        {patientInfo.procedimentos
          .slice()
          .sort((a, b) => a.dente - b.dente)
          .map((proc, index) => (
            <div key={index}>
              Tooth {proc.dente} - Sides:{" "}
              {proc.sides
                .map((side) => sideNames[side.side] || side.side)
                .join(", ")}{" "}
              - Procedure: {proc.procedimento} - Operation:{" "}
              {proc.operation || "N/A"} - Situation: {proc.situacao || "N/A"}
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDeleteClick(index)}>Delete</button>
            </div>
          ))}
      </div> */}
      {/* <div className="procedure-list">
        {patientInfo.procedimentos
          .slice()
          .sort((a, b) => a.dente - b.dente)
          .map((proc, index) => (
            <div key={index} className="procedure-item">
              <div className="procedure-details">
                <span className="tooth-sides">
                  Dente {proc.dente} - Lados:{" "}
                  {proc.sides
                    .map((side) => sideNames[side.side] || side.side)
                    .join(", ")}
                </span>
                <span className="procedure-detail">
                  Procedure: {proc.procedimento}
                </span>
                <span className="procedure-detail">
                  Operation: {proc.operation || "N/A"}
                </span>
                <span className="procedure-detail">
                  Situation: {proc.situacao || "N/A"}
                </span>
              </div>
              <div className="procedure-buttons">
                <button
                  className="edit-procedure"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="delete-procedure"
                  onClick={() => handleDeleteClick(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div> */}
      <div className="procedure-list">
        {patientInfo.procedimentos
          .slice()
          .sort((a, b) => a.dente - b.dente)
          .map((proc, index) => (
            <div key={index} className="procedure-item">
              <div className="procedure-details">
                <span className="tooth-sides">
                  <b>Dente {proc.dente} - Lados:</b>{" "}
                  {proc.sides
                    .map((side) => sideNames[side.side] || side.side)
                    .join(", ")}
                </span>
                <span className="procedure-detail-title">
                  <b>Procedure:</b> {proc.procedimento}
                </span>
                <span className="procedure-detail-title">
                  <b>Operation:</b> {proc.operation || "N/A"}
                </span>
                <span className="procedure-detail-title">
                  <b>Situation:</b> {proc.situacao || "N/A"}
                </span>
              </div>
              <div className="procedure-buttons">
                <button
                  className="edit-procedure"
                  onClick={() => handleEdit(index)}
                >
                  Editar
                </button>
                <button
                  className="delete-procedure"
                  onClick={() => handleDeleteClick(index)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
      </div>

      <Modal
        isOpen={isSideModalOpen}
        onRequestClose={() => setIsSideModalOpen(false)}
        className="side-selection-modal"
      >
        <h2 className="modal-title">Selecionar lados do {selectedTooth}</h2>
        <div
          className={`dental-chart__side-modal ${getToothRangeClass(
            selectedTooth
          )}`}
        >
          {availableSides.map((side) => (
            <button
              key={side}
              className={`tooth-side-button ${side}`}
              onClick={() => handleSideSelect(side)}
            >
              {side}
            </button>
          ))}
        </div>
        <button className="dental-chart__ok-button" onClick={handleSideSubmit}>
          OK
        </button>
      </Modal>

      <Modal
        isOpen={isFormModalOpen}
        onRequestClose={() => setIsFormModalOpen(false)}
      >
        <h2>
          Detalhes do dente {selectedTooth} / Lados:{" "}
          {selectedSides.map((side) => sideNames[side]).join(", ")}
        </h2>
        <form onSubmit={handleSubmit} className="procedure-form">
          <div className="form-group">
            <label>Procedimento:</label>
            <input
              type="text"
              placeholder="Procedimento"
              value={procedureData.procedimento}
              onChange={handleChange}
              name="procedimento"
            />
          </div>
          <div className="form-group">
            <label>Operation:</label>
            <Select
              options={colorOptions}
              onChange={handleSelectChange}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
              placeholder="Select an operation"
            />
          </div>
          <div className="form-group">
            <label>Situação:</label>
            <input
              type="text"
              name="situacao"
              placeholder="Situação"
              value={procedureData.situacao}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="saving-sides">
            Save
          </button>
        </form>
      </Modal>

      {/* Confirmation modal for deleting
      <Modal
        isOpen={showConfirmationModal}
        onRequestClose={() => setShowConfirmationModal(false)}
        className="confirmation-modal"
        overlayClassName="confirmation-modal-overlay"
      >
        <div className="modal-content">
          <p>Tem certeza de que deseja excluir este procedimento?</p>
          <button className="delete-button" onClick={handleDelete}>
            Excluir
          </button>
          <button
            className="cancel-button"
            onClick={() => setShowConfirmationModal(false)}
          >
            Cancelar
          </button>
        </div>
      </Modal> */}
      {/* Confirmation modal for deleting */}
      <Modal
        isOpen={showConfirmationModal}
        onRequestClose={() => setShowConfirmationModal(false)}
        className="notification-procedure-delete"
        overlayClassName="confirmation-modal-overlay"
      >
        <div className="modal-content">
          <p>Tem certeza de que deseja excluir este procedimento?</p>
          <button
            className="notification-procedure-deleteb"
            onClick={handleDelete}
          >
            Excluir
          </button>
          <button
            className="notification-procedure-cancelb"
            onClick={() => setShowConfirmationModal(false)}
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default DentalChart;
