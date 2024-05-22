// import React from "react";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
// import FormularioDoPaciente from "./FormularioDoPaciente";
// import { useParams } from "react-router-dom";

// import HistoricoBucal from "./HistoricoBucal";
// import InformacoesGerais from "./InformacoesGerais";
// import Procedimentos from "./Procedimentos";
// import TratamentoExecutado from "./TratamentoExecutado";
// import Fotografias from "./Fotografias";
// import "./styles.css";

// function PatientFormPage() {
//   const { patientId } = useParams();
//   return (
//     <Tabs>
//       <TabList>
//         <Tab>Formulário do Paciente</Tab>
//         <Tab>Histórico Buco-Dentária</Tab>
//         <Tab>Informações Gerais</Tab>
//         <Tab>Procedimentos</Tab>
//         <Tab>Tratamento Executado</Tab>
//         <Tab>Fotografias</Tab>
//       </TabList>

//       <TabPanel>
//         <FormularioDoPaciente patientId={patientId} />
//       </TabPanel>
//       <TabPanel>
//         <HistoricoBucal patientId={patientId} />
//       </TabPanel>
//       <TabPanel>
//         <InformacoesGerais patientId={patientId} />
//       </TabPanel>
//       <TabPanel>
//         <Procedimentos patientId={patientId} />
//       </TabPanel>
//       <TabPanel>
//         <TratamentoExecutado patientId={patientId} />
//       </TabPanel>
//       <TabPanel>
//         <Fotografias patientId={patientId} />
//       </TabPanel>
//     </Tabs>
//   );
// }

// export default PatientFormPage;

import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FormularioDoPaciente from "./FormularioDoPaciente";
import { useParams } from "react-router-dom";

import HistoricoBucal from "./HistoricoBucal";
import InformacoesGerais from "./InformacoesGerais";
import Procedimentos from "./Procedimentos";
import TratamentoExecutado from "./TratamentoExecutado";
import Fotografias from "./Fotografias";
import { usePatientInfo } from "../../context/PatientContext";
import "./styles.css";

function PatientFormPage() {
  const { patientId } = useParams();
  const { patientInfo, savePatientData } = usePatientInfo(); // Access patientInfo and savePatientData from context
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleTabSelect = async (index) => {
    if (selectedIndex === 0 && index !== 0) {
      // Only save if switching away from the first tab (FormularioDoPaciente)
      if (!patientInfo.nome || patientInfo.nome.trim() === "") {
        alert("The name field is required.");
        return; // Prevent tab switch if name is not filled
      } else {
        try {
          await savePatientData(); // Save patient data before switching tabs
        } catch (error) {
          console.error("Failed to save data", error);
          alert(error.message); // Show the error message to the user
          return; // Prevent tab switch if save fails
        }
      }
    }
    setSelectedIndex(index); // Allow tab switch if conditions are met
  };

  return (
    <Tabs selectedIndex={selectedIndex} onSelect={handleTabSelect}>
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
