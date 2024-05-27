// import React, { useState } from "react";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
// import FormularioDoPaciente from "./FormularioDoPaciente";
// import { useParams } from "react-router-dom";

// import HistoricoBucal from "./HistoricoBucal";
// import InformacoesGerais from "./InformacoesGerais";
// import Procedimentos from "./Procedimentos";
// import TratamentoExecutado from "./TratamentoExecutado";
// import Fotografias from "./Fotografias";
// import { usePatientInfo } from "../../context/PatientContext";
// import "./styles.css";

// function PatientFormPage() {
//   const { patientId } = useParams();
//   const { patientInfo, savePatientData } = usePatientInfo(); // Access patientInfo and savePatientData from context
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   const handleTabSelect = async (index) => {
//     if (selectedIndex === 0 && index !== 0) {
//       // Only save if switching away from the first tab (FormularioDoPaciente)
//       if (!patientInfo.nome || patientInfo.nome.trim() === "") {
//         alert("The name field is required.");
//         return; // Prevent tab switch if name is not filled
//       } else {
//         try {
//           await savePatientData(); // Save patient data before switching tabs
//         } catch (error) {
//           console.error("Failed to save data", error);
//           alert(error.message); // Show the error message to the user
//           return; // Prevent tab switch if save fails
//         }
//       }
//     }
//     setSelectedIndex(index); // Allow tab switch if conditions are met
//   };

//   return (
//     <Tabs selectedIndex={selectedIndex} onSelect={handleTabSelect}>
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

// import React, { useState } from "react";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
// import FormularioDoPaciente from "./FormularioDoPaciente";
// import { useParams } from "react-router-dom";

// import HistoricoBucal from "./HistoricoBucal";
// import InformacoesGerais from "./InformacoesGerais";
// import Procedimentos from "./Procedimentos";
// import TratamentoExecutado from "./TratamentoExecutado";
// import Fotografias from "./Fotografias";
// import { usePatientInfo } from "../../context/PatientContext";
// import "./styles.css";

// function PatientFormPage() {
//   const { patientId } = useParams();
//   const { patientInfo, savePatientData, saveHistoricoBucalData } =
//     usePatientInfo(); // Access patientInfo and save functions from context
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   const handleTabSelect = async (index) => {
//     if (selectedIndex === 0 && index !== 0) {
//       // Only save if switching away from the first tab (FormularioDoPaciente)
//       if (!patientInfo.nome || patientInfo.nome.trim() === "") {
//         alert("The name field is required.");
//         return; // Prevent tab switch if name is not filled
//       } else {
//         try {
//           await savePatientData(); // Save patient data before switching tabs
//         } catch (error) {
//           console.error("Failed to save data", error);
//           alert(error.message); // Show the error message to the user
//           return; // Prevent tab switch if save fails
//         }
//       }
//     } else if (selectedIndex === 1 && index !== 1) {
//       // Save when switching away from the second tab (HistoricoBucal)
//       try {
//         await saveHistoricoBucalData();
//       } catch (error) {
//         console.error("Failed to save data", error);
//         alert(error.message); // Show the error message to the user
//         return; // Prevent tab switch if save fails
//       }
//     }
//     setSelectedIndex(index); // Allow tab switch if conditions are met
//   };

//   return (
//     <Tabs selectedIndex={selectedIndex} onSelect={handleTabSelect}>
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

// import React, { useState } from "react";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
// import FormularioDoPaciente from "./FormularioDoPaciente";
// import { useParams } from "react-router-dom";

// import HistoricoBucal from "./HistoricoBucal";
// import InformacoesGerais from "./InformacoesGerais";
// import Procedimentos from "./Procedimentos";
// import TratamentoExecutado from "./TratamentoExecutado";
// import Fotografias from "./Fotografias";
// import { usePatientInfo } from "../../context/PatientContext";
// import "./styles.css";

// function PatientFormPage() {
//   const { patientId } = useParams();
//   const {
//     patientInfo,
//     savePatientData,
//     saveHistoricoBucalData,
//     saveInformacoesGeraisData,
//   } = usePatientInfo(); // Access patientInfo and save functions from context
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   const handleTabSelect = async (index) => {
//     if (selectedIndex === 0 && index !== 0) {
//       // Only save if switching away from the first tab (FormularioDoPaciente)
//       if (!patientInfo.nome || patientInfo.nome.trim() === "") {
//         alert("The name field is required.");
//         return; // Prevent tab switch if name is not filled
//       } else {
//         try {
//           await savePatientData(); // Save patient data before switching tabs
//         } catch (error) {
//           console.error("Failed to save data", error);
//           alert(error.message); // Show the error message to the user
//           return; // Prevent tab switch if save fails
//         }
//       }
//     } else if (selectedIndex === 1 && index !== 1) {
//       // Save when switching away from the second tab (HistoricoBucal)
//       try {
//         await saveHistoricoBucalData();
//       } catch (error) {
//         console.error("Failed to save data", error);
//         alert(error.message); // Show the error message to the user
//         return; // Prevent tab switch if save fails
//       }
//     } else if (selectedIndex === 2 && index !== 2) {
//       // Save when switching away from the third tab (InformacoesGerais)
//       try {
//         await saveInformacoesGeraisData();
//       } catch (error) {
//         console.error("Failed to save data", error);
//         alert(error.message); // Show the error message to the user
//         return; // Prevent tab switch if save fails
//       }
//     }
//     setSelectedIndex(index); // Allow tab switch if conditions are met
//   };

//   return (
//     <Tabs selectedIndex={selectedIndex} onSelect={handleTabSelect}>
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

// import React, { useState } from "react";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
// import FormularioDoPaciente from "./FormularioDoPaciente";
// import { useParams } from "react-router-dom";

// import HistoricoBucal from "./HistoricoBucal";
// import InformacoesGerais from "./InformacoesGerais";
// import Procedimentos from "./Procedimentos";
// import TratamentoExecutado from "./TratamentoExecutado";
// import Fotografias from "./Fotografias";
// import { usePatientInfo } from "../../context/PatientContext";
// import "./styles.css";

// function PatientFormPage() {
//   const { patientId } = useParams();
//   const {
//     patientInfo,
//     savePatientData,
//     saveHistoricoBucalData,
//     saveInformacoesGeraisData,
//     saveProceduresData,
//   } = usePatientInfo(); // Access all necessary save functions from context
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   const handleTabSelect = async (index) => {
//     try {
//       if (selectedIndex === 0 && index !== 0) {
//         if (!patientInfo.nome || patientInfo.nome.trim() === "") {
//           alert("The name field is required.");
//           return;
//         }
//         await savePatientData();
//       } else if (selectedIndex === 1 && index !== 1) {
//         await saveHistoricoBucalData();
//       } else if (selectedIndex === 2 && index !== 2) {
//         await saveInformacoesGeraisData();
//       } else if (selectedIndex === 3 && index !== 3) {
//         await saveProceduresData();
//       }
//       setSelectedIndex(index);
//     } catch (error) {
//       console.error("Failed to save data", error);
//       alert(error.message);
//       return;
//     }
//   };

//   return (
//     <Tabs selectedIndex={selectedIndex} onSelect={handleTabSelect}>
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

// import React, { useState } from "react";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
// import FormularioDoPaciente from "./FormularioDoPaciente";
// import { useParams } from "react-router-dom";

// import HistoricoBucal from "./HistoricoBucal";
// import InformacoesGerais from "./InformacoesGerais";
// import Procedimentos from "./Procedimentos";
// import TratamentoExecutado from "./TratamentoExecutado";
// import Fotografias from "./Fotografias";
// import { usePatientInfo } from "../../context/PatientContext";
// import "./styles.css";

// function PatientFormPage() {
//   const { patientId } = useParams();
//   const {
//     patientInfo,
//     savePatientData,
//     saveHistoricoBucalData,
//     saveInformacoesGeraisData,
//     saveProceduresData,
//     saveTreatmentsData, // Access the new save function from context
//   } = usePatientInfo();
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   const handleTabSelect = async (index) => {
//     try {
//       if (selectedIndex === 0 && index !== 0) {
//         if (!patientInfo.nome || patientInfo.nome.trim() === "") {
//           alert("The name field is required.");
//           return;
//         }
//         await savePatientData();
//       } else if (selectedIndex === 1 && index !== 1) {
//         await saveHistoricoBucalData();
//       } else if (selectedIndex === 2 && index !== 2) {
//         await saveInformacoesGeraisData();
//       } else if (selectedIndex === 3 && index !== 3) {
//         await saveProceduresData();
//       } else if (selectedIndex === 4 && index !== 4) {
//         await saveTreatmentsData();
//       }
//       setSelectedIndex(index);
//     } catch (error) {
//       console.error("Failed to save data", error);
//       alert(error.message);
//       return;
//     }
//   };

//   return (
//     <Tabs selectedIndex={selectedIndex} onSelect={handleTabSelect}>
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
  const {
    patientInfo,
    savePatientData,
    saveHistoricoBucalData,
    saveInformacoesGeraisData,
    saveProceduresData,
    saveTreatmentsData, // Ensure the new save function from context is accessed
  } = usePatientInfo();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleTabSelect = async (index) => {
    try {
      if (selectedIndex === 0 && index !== 0) {
        if (!patientInfo.nome || patientInfo.nome.trim() === "") {
          alert("The name field is required.");
          return;
        }
        await savePatientData();
      } else if (selectedIndex === 1 && index !== 1) {
        await saveHistoricoBucalData();
      } else if (selectedIndex === 2 && index !== 2) {
        await saveInformacoesGeraisData();
      } else if (selectedIndex === 3 && index !== 3) {
        await saveProceduresData();
      } else if (selectedIndex === 4 && index !== 4) {
        await saveTreatmentsData();
      }
      setSelectedIndex(index);
    } catch (error) {
      console.error("Failed to save data", error);
      alert(error.message);
      return;
    }
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
