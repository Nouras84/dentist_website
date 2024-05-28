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
//     saveTreatmentsData, // Ensure the new save function from context is accessed
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

// export default PatientFormPage;(works perfectly without exit button)

// import React, { useState } from "react";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import { useParams, useNavigate } from "react-router-dom";
// import "react-tabs/style/react-tabs.css";
// import FormularioDoPaciente from "./FormularioDoPaciente";
// import HistoricoBucal from "./HistoricoBucal";
// import InformacoesGerais from "./InformacoesGerais";
// import Procedimentos from "./Procedimentos";
// import TratamentoExecutado from "./TratamentoExecutado";
// import Fotografias from "./Fotografias";
// import { usePatientInfo } from "../../context/PatientContext";
// import "./styles.css";

// function PatientFormPage() {
//   const { patientId } = useParams();
//   const navigate = useNavigate();
//   const {
//     patientInfo,
//     savePatientData,
//     saveHistoricoBucalData,
//     saveInformacoesGeraisData,
//     saveProceduresData,
//     saveTreatmentsData,
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

//   const handleExitForm = async () => {
//     try {
//       if (selectedIndex === 0) {
//         await savePatientData();
//       } else if (selectedIndex === 1) {
//         await saveHistoricoBucalData();
//       } else if (selectedIndex === 2) {
//         await saveInformacoesGeraisData();
//       } else if (selectedIndex === 3) {
//         await saveProceduresData();
//       } else if (selectedIndex === 4) {
//         await saveTreatmentsData();
//       }
//       navigate(`/patients/${patientId}`); // Navigate to the patient's profile page
//     } catch (error) {
//       console.error("Failed to save data", error);
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="patient-form-page">
//       <Tabs selectedIndex={selectedIndex} onSelect={handleTabSelect}>
//         <TabList>
//           <Tab>Formulário do Paciente</Tab>
//           <Tab>Histórico Buco-Dentária</Tab>
//           <Tab>Informações Gerais</Tab>
//           <Tab>Procedimentos</Tab>
//           <Tab>Tratamento Executado</Tab>
//           <Tab>Fotografias</Tab>
//         </TabList>

//         <TabPanel>
//           <FormularioDoPaciente patientId={patientId} />
//         </TabPanel>
//         <TabPanel>
//           <HistoricoBucal patientId={patientId} />
//         </TabPanel>
//         <TabPanel>
//           <InformacoesGerais patientId={patientId} />
//         </TabPanel>
//         <TabPanel>
//           <Procedimentos patientId={patientId} />
//         </TabPanel>
//         <TabPanel>
//           <TratamentoExecutado patientId={patientId} />
//         </TabPanel>
//         <TabPanel>
//           <Fotografias patientId={patientId} />
//         </TabPanel>
//       </Tabs>
//       <div className="fixed-footer">
//         <button onClick={handleExitForm} className="exit-form-button">
//           Exit Form
//         </button>
//       </div>
//     </div>
//   );
// }

// export default PatientFormPage;(work perfectly with button but doesnot navigate to the profile)

import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FormularioDoPaciente from "./FormularioDoPaciente";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import HistoricoBucal from "./HistoricoBucal";
import InformacoesGerais from "./InformacoesGerais";
import Procedimentos from "./Procedimentos";
import TratamentoExecutado from "./TratamentoExecutado";
import Fotografias from "./Fotografias";
import { usePatientInfo } from "../../context/PatientContext";
import "./styles.css";

function PatientFormPage() {
  const { patientId } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
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

  const handleExit = async () => {
    try {
      if (selectedIndex === 0) {
        await savePatientData();
      } else if (selectedIndex === 1) {
        await saveHistoricoBucalData();
      } else if (selectedIndex === 2) {
        await saveInformacoesGeraisData();
      } else if (selectedIndex === 3) {
        await saveProceduresData();
      } else if (selectedIndex === 4) {
        await saveTreatmentsData();
      }
      navigate(`/patient-profile/${patientId}`); // Navigate to the patient profile page
    } catch (error) {
      console.error("Failed to save data before exiting", error);
      alert(error.message);
    }
  };

  return (
    <div>
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

      <div className="button-container">
        <button onClick={handleExit} className="exit-form-button">
          Exit Form
        </button>
      </div>
    </div>
  );
}

export default PatientFormPage;
