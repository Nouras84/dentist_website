// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { usePatientInfo } from "../../../context/PatientContext";
// import "./styles.css"; // Assuming you've set up some basic styles

// function TratamentoExecutado() {
//   const { patientInfo, updatePatientInfo, addTreatment, setSavedTreatments } =
//     usePatientInfo();
//   const [savedTreatments, setLocalSavedTreatments] = useState([]);

//   useEffect(() => {
//     // Load saved treatments from context when component mounts
//     const sortedTreatments = patientInfo.savedTreatments
//       .slice()
//       .sort((a, b) => new Date(b.data) - new Date(a.data));
//     setLocalSavedTreatments(sortedTreatments);
//   }, [patientInfo.savedTreatments]);

//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     updatePatientInfo({
//       tratamentoExecutadoForm: {
//         ...patientInfo.tratamentoExecutadoForm,
//         [name]: value,
//       },
//     });
//   };

//   const handleSave = (event) => {
//     event.preventDefault();
//     let updatedTreatments;
//     if (isEditMode && editIndex !== null) {
//       updatedTreatments = [...savedTreatments];
//       updatedTreatments[editIndex] = { ...patientInfo.tratamentoExecutadoForm };
//       setLocalSavedTreatments(updatedTreatments);
//       setIsEditMode(false);
//       setEditIndex(null);
//     } else {
//       updatedTreatments = [
//         ...savedTreatments,
//         { ...patientInfo.tratamentoExecutadoForm },
//       ];
//       setLocalSavedTreatments(updatedTreatments);
//     }

//     // Add treatment to context
//     addTreatment({ ...patientInfo.tratamentoExecutadoForm });

//     // Save to context
//     setSavedTreatments(updatedTreatments);

//     // Reset the form after saving
//     updatePatientInfo({
//       tratamentoExecutadoForm: {
//         data: "",
//         procedimento: "",
//         dentista: "",
//         valor: "",
//         notaFiscal: "",
//         formaDePagamento: "",
//       },
//     });
//   };

//   const handleEdit = (index) => {
//     updatePatientInfo({
//       tratamentoExecutadoForm: { ...savedTreatments[index] },
//     });
//     setIsEditMode(true);
//     setEditIndex(index);
//   };

//   const handleDelete = (index) => {
//     const updatedTreatments = savedTreatments.filter((_, i) => i !== index);
//     setLocalSavedTreatments(updatedTreatments);
//     setSavedTreatments(updatedTreatments);
//   };

//   const handleFinalSubmit = async () => {
//     const patientId = patientInfo.patientId;

//     try {
//       await axios.patch(
//         `http://localhost:5005/patients/${patientId}/tratamento-executado`,
//         { tratamentosExecutados: savedTreatments }
//       );
//       alert("Tratamentos enviados com sucesso!");
//     } catch (error) {
//       console.error(
//         "Failed to submit treatments:",
//         error.response ? error.response.data : error
//       );
//       alert("Falha ao enviar os tratamentos!");
//     }
//   };

//   const autoSave = useCallback(async () => {
//     const patientId = patientInfo.patientId;

//     try {
//       await axios.patch(
//         `http://localhost:5005/patients/${patientId}/tratamento-executado`,
//         { tratamentosExecutados: savedTreatments }
//       );
//       console.log("Tratamentos auto-salvos com sucesso!");
//     } catch (error) {
//       console.error(
//         "Failed to auto-save treatments:",
//         error.response ? error.response.data : error
//       );
//     }
//   }, [savedTreatments, patientInfo.patientId]);

//   useEffect(() => {
//     const intervalId = setInterval(autoSave, 30000); // Auto-save every 30 seconds

//     return () => clearInterval(intervalId); // Clear interval on component unmount
//   }, [autoSave]);

//   return (
//     <div>
//       <form onSubmit={handleSave} className="tratamento-executado-form">
//         <h2>Tratamento Executado</h2>
//         <label htmlFor="data">Data:</label>
//         <input
//           type="date"
//           id="data"
//           name="data"
//           value={patientInfo.tratamentoExecutadoForm.data}
//           onChange={handleChange}
//         />

//         <label htmlFor="procedimento">Procedimento:</label>
//         <input
//           type="text"
//           id="procedimento"
//           name="procedimento"
//           placeholder="Descrição do procedimento"
//           value={patientInfo.tratamentoExecutadoForm.procedimento}
//           onChange={handleChange}
//         />

//         <label htmlFor="dentista">Dentista:</label>
//         <input
//           type="text"
//           id="dentista"
//           name="dentista"
//           placeholder="Nome do dentista"
//           value={patientInfo.tratamentoExecutadoForm.dentista}
//           onChange={handleChange}
//         />

//         <label htmlFor="valor">Valor:</label>
//         <input
//           type="text"
//           id="valor"
//           name="valor"
//           placeholder="Valor cobrado"
//           value={patientInfo.tratamentoExecutadoForm.valor}
//           onChange={handleChange}
//         />

//         <label htmlFor="notaFiscal">Nota Fiscal:</label>
//         <input
//           type="text"
//           id="notaFiscal"
//           name="notaFiscal"
//           placeholder="Número da nota fiscal"
//           value={patientInfo.tratamentoExecutadoForm.notaFiscal}
//           onChange={handleChange}
//         />

//         <label htmlFor="formaDePagamento">Forma de Pagamento:</label>
//         <input
//           type="text"
//           id="formaDePagamento"
//           name="formaDePagamento"
//           placeholder="Forma de pagamento"
//           value={patientInfo.tratamentoExecutadoForm.formaDePagamento}
//           onChange={handleChange}
//         />

//         <button type="submit">{isEditMode ? "Atualizar" : "Salvar"}</button>
//       </form>

//       <div className="saved-treatments">
//         {savedTreatments
//           .slice()
//           .sort((a, b) => new Date(b.data) - new Date(a.data))
//           .map((treatment, index) => (
//             <div key={index} className="treatment-entry">
//               <p>
//                 Data: {treatment.data} - Procedimento: {treatment.procedimento}{" "}
//                 - Dentista: {treatment.dentista} - Valor: {treatment.valor} -
//                 Nota Fiscal: {treatment.notaFiscal} - Forma de Pagamento:{" "}
//                 {treatment.formaDePagamento}
//               </p>
//               <button onClick={() => handleEdit(index)}>Editar</button>
//               <button onClick={() => handleDelete(index)}>Excluir</button>
//             </div>
//           ))}
//       </div>

//       <button onClick={handleFinalSubmit} className="final-submit">
//         Enviar Tratamentos
//       </button>
//     </div>
//   );
// }

// export default TratamentoExecutado;

// import React, { useState, useEffect } from "react";
// import { usePatientInfo } from "../../../context/PatientContext";
// import "./styles.css"; // Assuming you've set up some basic styles

// function TratamentoExecutado() {
//   const {
//     patientInfo,
//     updatePatientInfo,
//     addTreatment,
//     updateTreatment, // Import updateTreatment function from the context
//     setSavedTreatments,
//     saveTreatmentsData, // Import the saveTreatmentsData function from the context
//   } = usePatientInfo();
//   const [savedTreatments, setLocalSavedTreatments] = useState([]);

//   useEffect(() => {
//     // Load saved treatments from context when component mounts
//     const sortedTreatments = patientInfo.savedTreatments
//       .slice()
//       .sort((a, b) => new Date(b.data) - new Date(a.data));
//     setLocalSavedTreatments(sortedTreatments);
//   }, [patientInfo.savedTreatments]);

//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     updatePatientInfo({
//       tratamentoExecutadoForm: {
//         ...patientInfo.tratamentoExecutadoForm,
//         [name]: value,
//       },
//     });
//   };

//   const handleSave = (event) => {
//     event.preventDefault();
//     let updatedTreatments;
//     if (isEditMode && editIndex !== null) {
//       updatedTreatments = [...savedTreatments];
//       updatedTreatments[editIndex] = { ...patientInfo.tratamentoExecutadoForm };
//       setLocalSavedTreatments(updatedTreatments);
//       updateTreatment(editIndex, { ...patientInfo.tratamentoExecutadoForm }); // Update treatment in context
//       setIsEditMode(false);
//       setEditIndex(null);
//     } else {
//       updatedTreatments = [
//         ...savedTreatments,
//         { ...patientInfo.tratamentoExecutadoForm },
//       ];
//       setLocalSavedTreatments(updatedTreatments);
//       addTreatment({ ...patientInfo.tratamentoExecutadoForm }); // Add treatment to context
//     }

//     // Save to context
//     setSavedTreatments(updatedTreatments);

//     // Reset the form after saving
//     updatePatientInfo({
//       tratamentoExecutadoForm: {
//         data: "",
//         procedimento: "",
//         dentista: "",
//         valor: "",
//         notaFiscal: "",
//         formaDePagamento: "",
//       },
//     });

//     // Save updated treatments to the backend
//     saveTreatmentsData(updatedTreatments);
//   };

//   const handleEdit = (index) => {
//     updatePatientInfo({
//       tratamentoExecutadoForm: { ...savedTreatments[index] },
//     });
//     setIsEditMode(true);
//     setEditIndex(index);
//   };

//   const handleDelete = (index) => {
//     const updatedTreatments = savedTreatments.filter((_, i) => i !== index);
//     setLocalSavedTreatments(updatedTreatments);
//     setSavedTreatments(updatedTreatments);

//     // Save updated treatments to the backend
//     saveTreatmentsData(updatedTreatments);
//   };

//   useEffect(() => {
//     const intervalId = setInterval(
//       () => saveTreatmentsData(savedTreatments),
//       30000
//     ); // Auto-save every 30 seconds

//     return () => clearInterval(intervalId); // Clear interval on component unmount
//   }, [savedTreatments, saveTreatmentsData]);

//   return (
//     <div>
//       <form onSubmit={handleSave} className="tratamento-executado-form">
//         <h2>Tratamento Executado</h2>
//         <label htmlFor="data">Data:</label>
//         <input
//           type="date"
//           id="data"
//           name="data"
//           value={patientInfo.tratamentoExecutadoForm.data}
//           onChange={handleChange}
//         />

//         <label htmlFor="procedimento">Procedimento:</label>
//         <input
//           type="text"
//           id="procedimento"
//           name="procedimento"
//           placeholder="Descrição do procedimento"
//           value={patientInfo.tratamentoExecutadoForm.procedimento}
//           onChange={handleChange}
//         />

//         <label htmlFor="dentista">Dentista:</label>
//         <input
//           type="text"
//           id="dentista"
//           name="dentista"
//           placeholder="Nome do dentista"
//           value={patientInfo.tratamentoExecutadoForm.dentista}
//           onChange={handleChange}
//         />

//         <label htmlFor="valor">Valor:</label>
//         <input
//           type="text"
//           id="valor"
//           name="valor"
//           placeholder="Valor cobrado"
//           value={patientInfo.tratamentoExecutadoForm.valor}
//           onChange={handleChange}
//         />

//         <label htmlFor="notaFiscal">Nota Fiscal:</label>
//         <input
//           type="text"
//           id="notaFiscal"
//           name="notaFiscal"
//           placeholder="Número da nota fiscal"
//           value={patientInfo.tratamentoExecutadoForm.notaFiscal}
//           onChange={handleChange}
//         />

//         <label htmlFor="formaDePagamento">Forma de Pagamento:</label>
//         <input
//           type="text"
//           id="formaDePagamento"
//           name="formaDePagamento"
//           placeholder="Forma de pagamento"
//           value={patientInfo.tratamentoExecutadoForm.formaDePagamento}
//           onChange={handleChange}
//         />

//         <button type="submit">{isEditMode ? "Atualizar" : "Salvar"}</button>
//       </form>

//       <div className="saved-treatments">
//         {savedTreatments
//           .slice()
//           .sort((a, b) => new Date(b.data) - new Date(a.data))
//           .map((treatment, index) => (
//             <div key={index} className="treatment-entry">
//               <p>
//                 Data: {treatment.data} - Procedimento: {treatment.procedimento}{" "}
//                 - Dentista: {treatment.dentista} - Valor: {treatment.valor} -
//                 Nota Fiscal: {treatment.notaFiscal} - Forma de Pagamento:{" "}
//                 {treatment.formaDePagamento}
//               </p>
//               <button onClick={() => handleEdit(index)}>Editar</button>
//               <button onClick={() => handleDelete(index)}>Excluir</button>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }

// export default TratamentoExecutado;

// import React, { useState, useEffect } from "react";
// import { usePatientInfo } from "../../../context/PatientContext";
// import "./styles.css"; // Assuming you've set up some basic styles

// function TratamentoExecutado() {
//   const {
//     patientInfo,
//     updatePatientInfo,
//     setSavedTreatments,
//     saveTreatmentsData,
//   } = usePatientInfo();
//   const [savedTreatments, setLocalSavedTreatments] = useState([]);

//   useEffect(() => {
//     setLocalSavedTreatments(patientInfo.savedTreatments);
//   }, [patientInfo.savedTreatments]);

//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     updatePatientInfo({
//       tratamentoExecutadoForm: {
//         ...patientInfo.tratamentoExecutadoForm,
//         [name]: value,
//       },
//     });
//   };

//   const handleSave = (event) => {
//     event.preventDefault();
//     let updatedTreatments;
//     if (isEditMode && editIndex !== null) {
//       updatedTreatments = [...savedTreatments];
//       updatedTreatments[editIndex] = { ...patientInfo.tratamentoExecutadoForm };
//       setLocalSavedTreatments(updatedTreatments);
//       setIsEditMode(false);
//       setEditIndex(null);
//     } else {
//       updatedTreatments = [
//         ...savedTreatments,
//         { ...patientInfo.tratamentoExecutadoForm },
//       ];
//       setLocalSavedTreatments(updatedTreatments);
//     }

//     setSavedTreatments(updatedTreatments);

//     updatePatientInfo({
//       tratamentoExecutadoForm: {
//         data: "",
//         procedimento: "",
//         dentista: "",
//         valor: "",
//         notaFiscal: "",
//         formaDePagamento: "",
//       },
//     });
//   };

//   const handleEdit = (index) => {
//     updatePatientInfo({
//       tratamentoExecutadoForm: { ...savedTreatments[index] },
//     });
//     setIsEditMode(true);
//     setEditIndex(index);
//   };

//   const handleDelete = (index) => {
//     const updatedTreatments = savedTreatments.filter((_, i) => i !== index);
//     setLocalSavedTreatments(updatedTreatments);
//     setSavedTreatments(updatedTreatments);
//   };

//   useEffect(() => {
//     const handleTabSwitch = async () => {
//       await saveTreatmentsData();
//     };

//     window.addEventListener("beforeunload", handleTabSwitch);
//     return () => window.removeEventListener("beforeunload", handleTabSwitch);
//   }, [saveTreatmentsData]);

//   return (
//     <div>
//       <form onSubmit={handleSave} className="tratamento-executado-form">
//         <h2>Tratamento Executado</h2>
//         <label htmlFor="data">Data:</label>
//         <input
//           type="date"
//           id="data"
//           name="data"
//           value={patientInfo.tratamentoExecutadoForm.data}
//           onChange={handleChange}
//         />

//         <label htmlFor="procedimento">Procedimento:</label>
//         <input
//           type="text"
//           id="procedimento"
//           name="procedimento"
//           placeholder="Descrição do procedimento"
//           value={patientInfo.tratamentoExecutadoForm.procedimento}
//           onChange={handleChange}
//         />

//         <label htmlFor="dentista">Dentista:</label>
//         <input
//           type="text"
//           id="dentista"
//           name="dentista"
//           placeholder="Nome do dentista"
//           value={patientInfo.tratamentoExecutadoForm.dentista}
//           onChange={handleChange}
//         />

//         <label htmlFor="valor">Valor:</label>
//         <input
//           type="text"
//           id="valor"
//           name="valor"
//           placeholder="Valor cobrado"
//           value={patientInfo.tratamentoExecutadoForm.valor}
//           onChange={handleChange}
//         />

//         <label htmlFor="notaFiscal">Nota Fiscal:</label>
//         <input
//           type="text"
//           id="notaFiscal"
//           name="notaFiscal"
//           placeholder="Número da nota fiscal"
//           value={patientInfo.tratamentoExecutadoForm.notaFiscal}
//           onChange={handleChange}
//         />

//         <label htmlFor="formaDePagamento">Forma de Pagamento:</label>
//         <input
//           type="text"
//           id="formaDePagamento"
//           name="formaDePagamento"
//           placeholder="Forma de pagamento"
//           value={patientInfo.tratamentoExecutadoForm.formaDePagamento}
//           onChange={handleChange}
//         />

//         <button type="submit">{isEditMode ? "Atualizar" : "Salvar"}</button>
//       </form>

//       <div className="saved-treatments">
//         {savedTreatments.map((treatment, index) => (
//           <div key={index} className="treatment-entry">
//             <p>
//               Data: {treatment.data} - Procedimento: {treatment.procedimento} -
//               Dentista: {treatment.dentista} - Valor: {treatment.valor} - Nota
//               Fiscal: {treatment.notaFiscal} - Forma de Pagamento:{" "}
//               {treatment.formaDePagamento}
//             </p>
//             <button onClick={() => handleEdit(index)}>Editar</button>
//             <button onClick={() => handleDelete(index)}>Excluir</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default TratamentoExecutado;

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { usePatientInfo } from "../../../context/PatientContext";
import "./styles.css"; // Assuming you've set up some basic styles

function TratamentoExecutado() {
  const { patientInfo, updatePatientInfo, addTreatment, setSavedTreatments } =
    usePatientInfo();
  const [savedTreatments, setLocalSavedTreatments] = useState([]);

  useEffect(() => {
    // Load saved treatments from context when component mounts
    const sortedTreatments = patientInfo.savedTreatments
      .slice()
      .sort((a, b) => new Date(b.data) - new Date(a.data));
    setLocalSavedTreatments(sortedTreatments);
  }, [patientInfo.savedTreatments]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    updatePatientInfo({
      tratamentoExecutadoForm: {
        ...patientInfo.tratamentoExecutadoForm,
        [name]: value,
      },
    });
  };

  const handleSave = (event) => {
    event.preventDefault();
    let updatedTreatments;
    if (isEditMode && editIndex !== null) {
      updatedTreatments = [...savedTreatments];
      updatedTreatments[editIndex] = { ...patientInfo.tratamentoExecutadoForm };
      setLocalSavedTreatments(updatedTreatments);
      setIsEditMode(false);
      setEditIndex(null);
    } else {
      updatedTreatments = [
        ...savedTreatments,
        { ...patientInfo.tratamentoExecutadoForm },
      ];
      setLocalSavedTreatments(updatedTreatments);
    }

    // Add treatment to context
    addTreatment({ ...patientInfo.tratamentoExecutadoForm });

    // Save to context
    setSavedTreatments(updatedTreatments);

    // Reset the form after saving
    updatePatientInfo({
      tratamentoExecutadoForm: {
        data: "",
        procedimento: "",
        dentista: "",
        valor: "",
        notaFiscal: "",
        formaDePagamento: "",
      },
    });
  };

  const handleEdit = (index) => {
    updatePatientInfo({
      tratamentoExecutadoForm: { ...savedTreatments[index] },
    });
    setIsEditMode(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedTreatments = savedTreatments.filter((_, i) => i !== index);
    setLocalSavedTreatments(updatedTreatments);
    setSavedTreatments(updatedTreatments);
  };

  const handleFinalSubmit = async () => {
    const patientId = patientInfo.patientId;

    try {
      await axios.patch(
        `http://localhost:5005/patients/${patientId}/tratamento-executado`,
        { tratamentosExecutados: savedTreatments }
      );
      alert("Tratamentos enviados com sucesso!");
    } catch (error) {
      console.error(
        "Failed to submit treatments:",
        error.response ? error.response.data : error
      );
      alert("Falha ao enviar os tratamentos!");
    }
  };

  const autoSave = useCallback(async () => {
    const patientId = patientInfo.patientId;

    try {
      await axios.patch(
        `http://localhost:5005/patients/${patientId}/tratamento-executado`,
        { tratamentosExecutados: savedTreatments }
      );
      console.log("Tratamentos auto-salvos com sucesso!");
    } catch (error) {
      console.error(
        "Failed to auto-save treatments:",
        error.response ? error.response.data : error
      );
    }
  }, [savedTreatments, patientInfo.patientId]);

  useEffect(() => {
    const intervalId = setInterval(autoSave, 30000); // Auto-save every 30 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [autoSave]);

  return (
    <div>
      <form onSubmit={handleSave} className="tratamento-executado-form">
        <h2>Tratamento Executado</h2>
        <label htmlFor="data">Data:</label>
        <input
          type="date"
          id="data"
          name="data"
          value={patientInfo.tratamentoExecutadoForm.data}
          onChange={handleChange}
        />

        <label htmlFor="procedimento">Procedimento:</label>
        <input
          type="text"
          id="procedimento"
          name="procedimento"
          placeholder="Descrição do procedimento"
          value={patientInfo.tratamentoExecutadoForm.procedimento}
          onChange={handleChange}
        />

        <label htmlFor="dentista">Dentista:</label>
        <input
          type="text"
          id="dentista"
          name="dentista"
          placeholder="Nome do dentista"
          value={patientInfo.tratamentoExecutadoForm.dentista}
          onChange={handleChange}
        />

        <label htmlFor="valor">Valor:</label>
        <input
          type="text"
          id="valor"
          name="valor"
          placeholder="Valor cobrado"
          value={patientInfo.tratamentoExecutadoForm.valor}
          onChange={handleChange}
        />

        <label htmlFor="notaFiscal">Nota Fiscal:</label>
        <input
          type="text"
          id="notaFiscal"
          name="notaFiscal"
          placeholder="Número da nota fiscal"
          value={patientInfo.tratamentoExecutadoForm.notaFiscal}
          onChange={handleChange}
        />

        <label htmlFor="formaDePagamento">Forma de Pagamento:</label>
        <input
          type="text"
          id="formaDePagamento"
          name="formaDePagamento"
          placeholder="Forma de pagamento"
          value={patientInfo.tratamentoExecutadoForm.formaDePagamento}
          onChange={handleChange}
        />

        <button type="submit">{isEditMode ? "Atualizar" : "Salvar"}</button>
      </form>

      <div className="saved-treatments">
        {savedTreatments
          .slice()
          .sort((a, b) => new Date(b.data) - new Date(a.data))
          .map((treatment, index) => (
            <div key={index} className="treatment-entry">
              <p>
                Data: {treatment.data} - Procedimento: {treatment.procedimento}{" "}
                - Dentista: {treatment.dentista} - Valor: {treatment.valor} -
                Nota Fiscal: {treatment.notaFiscal} - Forma de Pagamento:{" "}
                {treatment.formaDePagamento}
              </p>
              <button onClick={() => handleEdit(index)}>Editar</button>
              <button onClick={() => handleDelete(index)}>Excluir</button>
            </div>
          ))}
      </div>

      <button onClick={handleFinalSubmit} className="final-submit">
        Enviar Tratamentos
      </button>
    </div>
  );
}

export default TratamentoExecutado;
