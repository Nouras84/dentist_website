// import React, { useState } from "react";
// import axios from "axios";
// import Modal from "react-modal";
// import Select from "react-select";

// // Define your color options and side names
// const colorOptions = [
//   { value: "00B057", label: "CARIE", color: "#00B057" },
//   { value: "0070BD", label: "TEM CANAL", color: "#0070BD" },
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

// // Assuming these are set somewhere in your component or context
// const patientId = "some_patient_id"; // This should be dynamically set based on selected patient

// function DentalChart() {
//   const [selectedTooth, setSelectedTooth] = useState(null);
//   const [selectedSides, setSelectedSides] = useState([]);
//   const [isSideModalOpen, setIsSideModalOpen] = useState(false);
//   const [isFormModalOpen, setIsFormModalOpen] = useState(false);
//   const [procedureData, setProcedureData] = useState({
//     procedimento: "",
//     operation: "",
//     situacao: "",
//     data: "",
//   });

//   const handleToothClick = (tooth) => {
//     setSelectedTooth(tooth);
//     setSelectedSides([]);
//     setIsSideModalOpen(true);
//   };

//   const handleSideSelect = (side) => {
//     setSelectedSides((prev) => [...prev, side]);
//   };

//   const handleSideSubmit = () => {
//     setIsSideModalOpen(false);
//     setIsFormModalOpen(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProcedureData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSelectChange = (selectedOption) => {
//     setProcedureData((prev) => ({
//       ...prev,
//       procedimento: selectedOption.label,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Prepare the data for the API based on your state and form
//     const dataToSend = {
//       dente: selectedTooth,
//       sides: selectedSides.map((side) => ({
//         side,
//         situacao: procedureData.situacao, // Example of how you might structure this
//         data: procedureData.data,
//       })),
//       procedimento: procedureData.procedimento,
//     };

//     axios
//       .patch(
//         `http://localhost:5005/patients/${patientId}/procedimento`,
//         dataToSend
//       )
//       .then((response) => {
//         console.log("Procedure added successfully", response.data);
//         setIsFormModalOpen(false); // Close the form modal on success
//       })
//       .catch((error) => {
//         console.error("Error adding procedure", error);
//       });
//   };

//   return (
//     <div>
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
//             onChange={handleChange}
//             name="procedimento"
//           />
//           <label>Operation:</label>
//           <Select
//             options={colorOptions}
//             onChange={handleSelectChange}
//             getOptionLabel={(option) => option.label}
//             getOptionValue={(option) => option.value}
//           />
//           <label>Situação:</label>
//           <input
//             type="text"
//             name="situacao"
//             placeholder="Situação"
//             onChange={handleChange}
//           />
//           <label>Data:</label>
//           <input type="date" name="data" onChange={handleChange} />
//           <button type="submit">Save</button>
//         </form>
//       </Modal>
//     </div>
//   );
// }

// export default DentalChart;

// import React, { useState } from "react";
// import axios from "axios";
// import Modal from "react-modal";
// import Select from "react-select";

// const colorOptions = [
//   { value: "00B057", label: "CARIE", color: "#00B057" },
//   { value: "0070BD", label: "TEM CANAL", color: "#0070BD" },
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
//   const [selectedTooth, setSelectedTooth] = useState(null);
//   const [selectedSides, setSelectedSides] = useState([]);
//   const [procedures, setProcedures] = useState([]); // Store all procedures
//   const [isSideModalOpen, setIsSideModalOpen] = useState(false);
//   const [isFormModalOpen, setIsFormModalOpen] = useState(false);
//   const [procedureData, setProcedureData] = useState({
//     procedimento: "",
//     operation: "",
//     situacao: "",
//     data: "",
//   });

//   const handleToothClick = (tooth) => {
//     setSelectedTooth(tooth);
//     setSelectedSides([]);
//     setIsSideModalOpen(true);
//   };

//   const handleSideSelect = (side) => {
//     setSelectedSides((prev) => [...prev, side]);
//   };

//   const handleSideSubmit = () => {
//     setIsSideModalOpen(false);
//     setIsFormModalOpen(true);
//   };

//   const handleSelectChange = (selectedOption) => {
//     setProcedureData((prev) => ({
//       ...prev,
//       operation: selectedOption.label, // Save the label from the dropdown as the operation
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
//       tooth: selectedTooth,
//       sides: selectedSides,
//       details: { ...procedureData }, // Includes the operation as well
//     };

//     setProcedures((prevProcedures) => [...prevProcedures, newProcedure]);
//     setIsFormModalOpen(false); // Close the modal after saving
//   };

//   const handleFinalSubmit = () => {
//     axios
//       .post("http://localhost:5005/patients/procedures", procedures)
//       .then((response) => {
//         console.log("All procedures submitted successfully", response.data);
//       })
//       .catch((error) => {
//         console.error("Error submitting procedures", error);
//       });
//   };

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
//         {procedures.map((proc, index) => (
//           <div key={index}>
//             Tooth {proc.tooth} - Sides: {proc.sides.join(", ")} - Procedure:{" "}
//             {proc.details.procedimento} - Operation: {proc.details.operation} -
//             Situation: {proc.details.situacao} - Date: {proc.details.data}
//           </div>
//         ))}
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
//           <label>Data:</label>
//           <input
//             type="date"
//             name="data"
//             value={procedureData.data}
//             onChange={handleChange}
//           />
//           <button type="submit">Save</button>
//           <button type="button" onClick={handleFinalSubmit}>
//             Submit All Procedures
//           </button>
//         </form>
//       </Modal>
//     </div>
//   );
// }

// export default DentalChart;

// import React, { useState } from "react";
// import axios from "axios";
// import Modal from "react-modal";
// import Select from "react-select";
// import { usePatientInfo } from "../../../context/PatientContext"; // Ensure the path is correct

// const colorOptions = [
//   { value: "00B057", label: "CARIE", color: "#00B057" },
//   { value: "0070BD", label: "TEM CANAL", color: "#0070BD" },
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
//   const { patientInfo, addProcedure } = usePatientInfo();
//   const [selectedTooth, setSelectedTooth] = useState(null);
//   const [selectedSides, setSelectedSides] = useState([]);
//   const [isSideModalOpen, setIsSideModalOpen] = useState(false);
//   const [isFormModalOpen, setIsFormModalOpen] = useState(false);
//   const [procedureData, setProcedureData] = useState({
//     procedimento: "",
//     operation: "",
//     situacao: "",
//     data: "",
//   });

//   const handleToothClick = (tooth) => {
//     setSelectedTooth(tooth);
//     setSelectedSides([]);
//     setIsSideModalOpen(true);
//   };

//   const handleSideSelect = (side) => {
//     setSelectedSides((prev) => [...prev, side]);
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

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   const newProcedure = {
//   //     dente: selectedTooth,
//   //     sides: selectedSides.map((side) => ({
//   //       side: side,
//   //       situacao: procedureData.situacao,
//   //       data: procedureData.data,
//   //     })),
//   //     procedimento: procedureData.procedimento,
//   //   };

//   //   addProcedure(newProcedure); // Add procedure to context
//   //   setIsFormModalOpen(false); // Close the modal after saving
//   // };

//   // const handleFinalSubmit = () => {
//   //   axios
//   //     .post(
//   //       "http://localhost:5005/patients/procedures",
//   //       patientInfo.procedimentos
//   //     )
//   //     .then((response) =>
//   //       console.log("All procedures submitted successfully", response.data)
//   //     )
//   //     .catch((error) => console.error("Error submitting procedures", error));
//   // };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newProcedure = {
//       dente: selectedTooth, // Changed from 'tooth' to 'dente' to match schema
//       sides: selectedSides.map((side) => ({
//         side: side,
//         situacao: procedureData.situacao, // Ensure these are provided by user input
//         data: procedureData.data, // Make sure data is correctly formatted (e.g., ISO string)
//       })), // Directly map each side with situacao and data
//       procedimento: procedureData.operation, // Moved here from 'details'
//     };
//     addProcedure(newProcedure);
//     setIsFormModalOpen(false); // Close the modal after saving
//   };

//   const handleFinalSubmit = () => {
//     axios
//       .post("http://localhost:5005/patients/procedures", {
//         procedures: patientInfo.procedimentos,
//       })
//       .then((response) =>
//         console.log("All procedures submitted successfully", response.data)
//       )
//       .catch((error) => console.error("Error submitting procedures", error));
//   };

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
//         {patientInfo.procedimentos.map((proc, index) => (
//           <div key={index}>
//             Tooth {proc.tooth} - Sides: {proc.sides.join(", ")} - Procedure:{" "}
//             {proc.details.procedimento} - Operation: {proc.details.operation} -
//             Situation: {proc.details.situacao} - Date: {proc.details.data}
//           </div>
//         ))}
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
//           <label>Data:</label>
//           <input
//             type="date"
//             name="data"
//             value={procedureData.data}
//             onChange={handleChange}
//           />
//           <button type="submit">Save</button>
//           <button type="button" onClick={handleFinalSubmit}>
//             Submit All Procedures
//           </button>
//         </form>
//       </Modal>
//     </div>
//   );
// }

// export default DentalChart;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Select from "react-select";
import { usePatientInfo } from "../../../context/PatientContext"; // Ensure the path is correct

// Set the app element for react-modal
Modal.setAppElement("#root"); // Ensure this selector matches the ID of your root element

const colorOptions = [
  { value: "00B057", label: "CARIE", color: "#00B057" },
  { value: "0070BD", label: "TEM CANAL", color: "#0070BD" },
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
  const { patientInfo, addProcedure } = usePatientInfo();
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [selectedSides, setSelectedSides] = useState([]);
  const [isSideModalOpen, setIsSideModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [procedureData, setProcedureData] = useState({
    procedimento: "",
    operation: "",
    situacao: "",
    data: "",
  });
  // Set the app element for react-modal
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const handleToothClick = (tooth) => {
    setSelectedTooth(Number(tooth));
    setSelectedSides([]);
    setIsSideModalOpen(true);
  };

  const handleSideSelect = (side) => {
    setSelectedSides((prev) => [...prev, side]);
  };

  const handleSideSubmit = () => {
    setIsSideModalOpen(false);
    setIsFormModalOpen(true);
  };

  const handleSelectChange = (selectedOption) => {
    setProcedureData((prev) => ({
      ...prev,
      operation: selectedOption.label,
    }));
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setProcedureData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProcedureData((prev) => {
      const updatedData = { ...prev, [name]: value };
      console.log("Updated Procedure Data:", updatedData);
      return updatedData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProcedure = {
      dente: Number(selectedTooth), // Ensure it's treated as a Number
      sides: selectedSides.map((side) => ({
        side: side.toString(), // Convert to string to match schema expectations
        situacao: procedureData.situacao,
        data: new Date(procedureData.data), // Convert string to Date object
      })),
      procedimento: procedureData.procedimento,
      operation: procedureData.operation,
    };

    console.log("Submitting procedure:", JSON.stringify(newProcedure, null, 2)); // Log the newProcedure object to verify data structure

    addProcedure(newProcedure);
    setIsFormModalOpen(false);
  };

  // const handleFinalSubmit = () => {
  //   console.log("Submitting procedures:", patientInfo.procedimentos);
  //   axios
  //     .post("http://localhost:5005/patients/procedures", {
  //       procedures: patientInfo.procedimentos,
  //     })
  //     .then((response) =>
  //       console.log("All procedures submitted successfully", response.data)
  //     )
  //     .catch((error) => console.error("Error submitting procedures", error));
  // };
  const handleFinalSubmit = () => {
    const patientId = patientInfo.patientId; // Ensure you have this info in your state/context

    console.log("Final payload before sending:", patientInfo.procedimentos);

    // Assuming that you want to send all procedures as an array to be appended
    // This assumes your API handles an array of procedures under the `procedimentos` field directly
    axios
      .patch(
        `http://localhost:5005/patients/${patientId}/procedimento`,
        {
          procedimentos: patientInfo.procedimentos, // Assuming this is an array of procedure objects
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("All procedures submitted successfully", response.data);
        // Optionally clear the procedures after successful submission or handle other UI updates
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Error submitting procedures:", error.response.data);
          console.error("Status code:", error.response.status);
          console.error("Headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up request:", error.message);
        }
      });
  };

  // const handleFinalSubmit = () => {
  //   console.log("Final payload before sending:", patientInfo.procedimentos);
  //   axios
  //     .patch(
  //       `http://localhost:5005/patients/${patientInfo.patientId}/procedimento`,
  //       {
  //         procedimentos: patientInfo.procedimentos,
  //       }
  //     )
  //     .then((response) => {
  //       console.log("Response from server:", response.data);
  //     })
  //     .catch((error) => {
  //       console.error(
  //         "Error during submission:",
  //         error.response ? error.response.data : error.message
  //       );
  //     });
  // };

  return (
    <div>
      {/* Upper teeth arranged from 11 to 28 */}
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        {Array.from({ length: 8 }, (_, i) => 11 + i)
          .reverse()
          .concat(Array.from({ length: 8 }, (_, i) => 21 + i))
          .map((tooth) => (
            <button key={tooth} onClick={() => handleToothClick(tooth)}>
              Tooth {tooth}
            </button>
          ))}
      </div>
      {/* Lower teeth arranged from 41 to 48 and 31 to 38 */}
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        {Array.from({ length: 8 }, (_, i) => 41 + i)
          .reverse()
          .concat(Array.from({ length: 8 }, (_, i) => 31 + i))
          .map((tooth) => (
            <button key={tooth} onClick={() => handleToothClick(tooth)}>
              Tooth {tooth}
            </button>
          ))}
      </div>
      {/* Render saved procedures */}
      <div>
        {patientInfo.procedimentos.map((proc, index) => (
          <div key={index}>
            Tooth {proc.dente} - Sides:{" "}
            {proc.sides.map((side) => side.side).join(", ")} - Procedure:{" "}
            {proc.procedimento} - Operation: {proc.operation || "N/A"} -{" "}
            {/* Check if operation exists */}
            Situation: {proc.situacao || "N/A"} -{" "}
            {/* Provide default if undefined */}
            Date: {proc.data
              ? new Date(proc.data).toLocaleDateString()
              : "N/A"}{" "}
            {/* Format date or show 'N/A' */}
          </div>
        ))}
      </div>

      {/* Modals for side selection and procedure details */}
      <Modal
        isOpen={isSideModalOpen}
        onRequestClose={() => setIsSideModalOpen(false)}
      >
        <h2>Select sides for Tooth {selectedTooth}</h2>
        {Object.keys(sideNames).map((side) => (
          <button key={side} onClick={() => handleSideSelect(side)}>
            {sideNames[side]}
          </button>
        ))}
        <button onClick={handleSideSubmit}>OK</button>
      </Modal>

      <Modal
        isOpen={isFormModalOpen}
        onRequestClose={() => setIsFormModalOpen(false)}
      >
        <h2>
          Details for Tooth {selectedTooth} / Sides{" "}
          {selectedSides.map((side) => sideNames[side]).join(", ")}
        </h2>
        <form onSubmit={handleSubmit}>
          <label>Procedimento:</label>
          <input
            type="text"
            placeholder="Procedimento"
            value={procedureData.procedimento}
            onChange={handleChange}
            name="procedimento"
          />
          <label>Operation:</label>
          <Select
            options={colorOptions}
            onChange={handleSelectChange}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            placeholder="Select an operation"
          />
          <label>Situação:</label>
          <input
            type="text"
            name="situacao"
            placeholder="Situação"
            value={procedureData.situacao}
            onChange={handleChange}
          />
          <label>Data:</label>
          <input
            type="date"
            name="data"
            value={procedureData.data}
            onChange={handleChange}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={handleFinalSubmit}>
            Submit All Procedures
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default DentalChart;
