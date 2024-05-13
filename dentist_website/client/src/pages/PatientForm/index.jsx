import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FormularioDoPaciente from "./FormularioDoPaciente";
import { useParams } from "react-router-dom";

import HistoricoBucal from "./HistoricoBucal";
import InformacoesGerais from "./InformacoesGerais";
import Procedimentos from "./Procedimentos";
import TratamentoExecutado from "./TratamentoExecutado";
import Fotografias from "./Fotografias";
import "./styles.css";

function PatientFormPage() {
  const { patientId } = useParams();
  return (
    <Tabs>
      <TabList>
        <Tab>Formulário do Paciente</Tab>
        <Tab>Histórico Buco-Dentária</Tab>
        <Tab>Informações Gerais</Tab>
        <Tab>Procedimentos</Tab>
        <Tab>Tratamento Executado</Tab>
        <Tab>Fotografias</Tab>
      </TabList>

      <TabPanel>
        <FormularioDoPaciente patientId={patientId} />
      </TabPanel>
      <TabPanel>
        <HistoricoBucal patientId={patientId} />
      </TabPanel>
      <TabPanel>
        <InformacoesGerais patientId={patientId} />
      </TabPanel>
      <TabPanel>
        <Procedimentos patientId={patientId} />
      </TabPanel>
      <TabPanel>
        <TratamentoExecutado patientId={patientId} />
      </TabPanel>
      <TabPanel>
        <Fotografias patientId={patientId} />
      </TabPanel>
    </Tabs>
  );
}

export default PatientFormPage;
// import React, { useEffect } from "react";
// import axios from "axios";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
// import { usePatientInfo } from "../../context/PatientContext";

// import FormularioDoPaciente from "./FormularioDoPaciente";
// import HistoricoBucal from "./HistoricoBucal";
// import InformacoesGerais from "./InformacoesGerais";
// import Procedimentos from "./Procedimentos";
// import TratamentoExecutado from "./TratamentoExecutado";
// import Fotografias from "./Fotografias";

// function PatientFormPage() {
//   const { patientInfo } = usePatientInfo();

//   // Function to handle form submission and autosave
//   const saveData = async (autoSave = false) => {
//     try {
//       const response = await axios.patch(
//         `http://localhost:5005/patients/update-all/${patientInfo.patientId}`,
//         patientInfo
//       );
//       console.log(
//         autoSave ? "Autosaved successfully" : "Data submitted successfully",
//         response.data
//       );
//       if (!autoSave) {
//         alert("All data submitted successfully!");
//       }
//     } catch (error) {
//       console.error("Failed to save data", error);
//       if (!autoSave) {
//         alert("Submission failed!");
//       }
//     }
//   };

//   const handleSubmitAll = () => {
//     saveData();
//   };

//   useEffect(() => {
//     const autosaveInterval = setInterval(() => {
//       console.log("Autosaving all patient data...");
//       saveData(true);
//     }, 30000); // Autosave every 30 seconds

//     return () => clearInterval(autosaveInterval);
//   }, [patientInfo]);

//   return (
//     <div>
//       <Tabs>
//         <TabList>
//           <Tab>Formulário do Paciente</Tab>
//           <Tab>Histórico Buco-Dentária</Tab>
//           <Tab>Informações Gerais</Tab>
//           <Tab>Procedimentos</Tab>
//           <Tab>Tratamento Executado</Tab>
//           <Tab>Fotografias</Tab>
//         </TabList>

//         <TabPanel>
//           <FormularioDoPaciente />
//         </TabPanel>
//         <TabPanel>
//           <HistoricoBucal />
//         </TabPanel>
//         <TabPanel>
//           <InformacoesGerais />
//         </TabPanel>
//         <TabPanel>
//           <Procedimentos />
//         </TabPanel>
//         <TabPanel>
//           <TratamentoExecutado />
//         </TabPanel>
//         <TabPanel>
//           <Fotografias />
//         </TabPanel>
//       </Tabs>
//       <button onClick={handleSubmitAll} className="submit-all-button">
//         Submit All Data
//       </button>
//     </div>
//   );
// }

// export default PatientFormPage;
