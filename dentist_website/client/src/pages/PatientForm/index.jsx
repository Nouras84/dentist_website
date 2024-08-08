// // works perfectly before styling
// import React, { useState } from "react";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
// import FormularioDoPaciente from "./FormularioDoPaciente";
// import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
// import HistoricoBucal from "./HistoricoBucal";
// import InformacoesGerais from "./InformacoesGerais";
// import Procedimentos from "./Procedimentos";
// import TratamentoExecutado from "./TratamentoExecutado";
// import Fotografias from "./Fotografias";
// import { usePatientInfo } from "../../context/PatientContext";
// import "./styles.css";

// function PatientFormPage() {
//   const { patientId } = useParams();
//   const navigate = useNavigate(); // Initialize useNavigate
//   const {
//     // afterClickingTheAddPatientButton,
//     setAfterClickingTheAddPatientButton,
//     patientInfo,
//     setPatientInfo,
//     savePatientData,
//     saveHistoricoBucalData,
//     saveInformacoesGeraisData,
//     saveProceduresData,
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
//       }
//       setSelectedIndex(index);
//     } catch (error) {
//       console.error("Failed to save data", error);
//       alert(error.message);
//       return;
//     }
//   };

//   const initialState = {
//     patientId: "",
//     nome: "",
//     dataConsulta: "",
//     cpf: "",
//     dataNascimento: "",
//     genero: "",
//     racaCor: "",
//     estadoCivil: "",
//     plano: "",
//     profissao: "",
//     escolaridade: "",
//     endereco: {
//       rua: "",
//       numero: "",
//       bairro: "",
//       cidade: "",
//       estado: "",
//     },
//     contato: {
//       whatsapp: "",
//       instagram: "",
//       telefone: "",
//       email: "",
//     },
//     interesse: [],
//     musicas: [],
//     profilePhoto: null,
//     historicoBucal: {
//       frequenciaDentista: "",
//       mastigaLados: "",
//       escovaDentesFrequencia: "",
//       rangeDentes: "",
//       apreensivoTratamento: "",
//       gengivaSangra: "",
//       problemaTratamentoOdontologico: "",
//       problemaTratamentoOdontologicoDetails: "",
//       usaFioDental: "",
//       dentesSensiveis: "",
//       metodoAuxiliar: "",
//       mordeLinguaLabioBochecha: "",
//       dorMastigar: "",
//       usaProteseImplante: "",
//       usaProteseImplanteDetails: "",
//       feridaBoca: "",
//       feridaBocaDetails: "",
//       dentesAfetamSaude: "",
//       respiraPelaBoca: "",
//     },
//     informacoesGerais: {
//       tratamentoMedico: "",
//       tratamentoMedicoDetails: "",
//       alergiaMedicamentosa: "",
//       alergiaMedicamentosaDetails: "",
//       consideraNervoso: "",
//       alergiaOutros: "",
//       alergiaOutrosDetails: "",
//       consideraAnsioso: "",
//       hospitalizadoCirurgia: "",
//       hospitalizadoCirurgiaDetails: "",
//       vomitaFrequentemente: "",
//       gravida: "",
//       gravidaDetails: "",
//       amamentando: "",
//       faltaArCansaco: "",
//       faltaArCansacoDetails: "",
//       doresPeito: "",
//       alteracaoPressao: "",
//       historicoInfarto: "",
//       historicoInfartoDetails: "",
//       historicoAVC: "",
//       historicoAVCDetails: "",
//       historicoAsma: "",
//       historicoAsmaDetails: "",
//       historicoDiabetes: "",
//       historicoDiabetesDetails: "",
//       tuberculose: "",
//       tuberculoseDetails: "",
//       sedeConstante: "",
//       urinaNoite: "",
//       alteracaoHormonal: "",
//       alteracaoHormonalDetails: "",
//       desmaioDistrimia: "",
//       desmaioDistrimiaDetails: "",
//       hipotireoidismoHipertireoidismo: "",
//       hipotireoidismoHipertireoidismoDetails: "",
//       dificuldadeMastigar: "",
//       tpmMenopausa: "",
//       tpmMenopausaDetails: "",
//       calculoRenal: "",
//       calculoRenalDetails: "",
//       reposicaoHormonal: "",
//       osteoporose: "",
//       anemia: "",
//       leucemia: "",
//       hemofilia: "",
//       ingestaoAlcoolica: "",
//       tabagista: "",
//       gastrite: "",
//       ulceras: "",
//       hepatite: "",
//       sangramentoPosTraumaCirurgia: "",
//       sangramentoPosTraumaCirurgiaDetails: "",
//       outrasDoencas: "",
//     },
//     tratamentoExecutadoForm: {
//       data: "",
//       procedimento: "",
//       dentista: "",
//       valor: "",
//       notaFiscal: "",
//       formaDePagamento: "",
//     },
//     tratamentosExecutados: [],
//     savedTreatments: [],
//     savedFotografias: [],
//     procedimentos: [],
//   };

//   const handleExit = async () => {
//     console.log("patient info:", patientInfo);
//     setAfterClickingTheAddPatientButton(false);
//     setPatientInfo(initialState);
//     try {
//       if (selectedIndex === 0) {
//         await savePatientData();
//       } else if (selectedIndex === 1) {
//         await saveHistoricoBucalData();
//       } else if (selectedIndex === 2) {
//         await saveInformacoesGeraisData();
//       } else if (selectedIndex === 3) {
//         await saveProceduresData();
//       }
//       navigate(`/patient-profile/${patientId}`); // Navigate to the patient profile page
//     } catch (error) {
//       console.error("Failed to save data before exiting", error);
//       alert(error.message);
//     }
//   };

//   return (
//     <div>
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

//       <div className="button-container">
//         <button onClick={handleExit} className="exit-form-button">
//           Exit Form
//         </button>
//       </div>
//     </div>
//   );
// }

// export default PatientFormPage;

import React, { useState } from "react";
import { Dropdown, Container, Row, Col, Button, Nav } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import FormularioDoPaciente from "./FormularioDoPaciente";
import HistoricoBucal from "./HistoricoBucal";
import InformacoesGerais from "./InformacoesGerais";
import Procedimentos from "./Procedimentos";
import TratamentoExecutado from "./TratamentoExecutado";
import Fotografias from "./Fotografias";
import { usePatientInfo } from "../../context/PatientContext";
import "./styles.css";

function PatientFormPage() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const {
    setAfterClickingTheAddPatientButton,
    patientInfo,
    setPatientInfo,
    savePatientData,
    saveHistoricoBucalData,
    saveInformacoesGeraisData,
    saveProceduresData,
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
      }
      setSelectedIndex(index);
    } catch (error) {
      console.error("Failed to save data", error);
      alert(error.message);
      return;
    }
  };

  const initialState = {
    patientId: "",
    nome: "",
    dataConsulta: "",
    cpf: "",
    dataNascimento: "",
    genero: "",
    racaCor: "",
    estadoCivil: "",
    plano: "",
    profissao: "",
    escolaridade: "",
    endereco: {
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
    contato: {
      whatsapp: "",
      instagram: "",
      telefone: "",
      email: "",
    },
    interesse: [],
    musicas: [],
    profilePhoto: null,
    historicoBucal: {
      frequenciaDentista: "",
      mastigaLados: "",
      escovaDentesFrequencia: "",
      rangeDentes: "",
      apreensivoTratamento: "",
      gengivaSangra: "",
      problemaTratamentoOdontologico: "",
      problemaTratamentoOdontologicoDetails: "",
      usaFioDental: "",
      dentesSensiveis: "",
      metodoAuxiliar: "",
      mordeLinguaLabioBochecha: "",
      dorMastigar: "",
      usaProteseImplante: "",
      usaProteseImplanteDetails: "",
      feridaBoca: "",
      feridaBocaDetails: "",
      dentesAfetamSaude: "",
      respiraPelaBoca: "",
    },
    informacoesGerais: {
      tratamentoMedico: "",
      tratamentoMedicoDetails: "",
      alergiaMedicamentosa: "",
      alergiaMedicamentosaDetails: "",
      consideraNervoso: "",
      alergiaOutros: "",
      alergiaOutrosDetails: "",
      consideraAnsioso: "",
      hospitalizadoCirurgia: "",
      hospitalizadoCirurgiaDetails: "",
      vomitaFrequentemente: "",
      gravida: "",
      gravidaDetails: "",
      amamentando: "",
      faltaArCansaco: "",
      faltaArCansacoDetails: "",
      doresPeito: "",
      alteracaoPressao: "",
      historicoInfarto: "",
      historicoInfartoDetails: "",
      historicoAVC: "",
      historicoAVCDetails: "",
      historicoAsma: "",
      historicoAsmaDetails: "",
      historicoDiabetes: "",
      historicoDiabetesDetails: "",
      tuberculose: "",
      tuberculoseDetails: "",
      sedeConstante: "",
      urinaNoite: "",
      alteracaoHormonal: "",
      alteracaoHormonalDetails: "",
      desmaioDistrimia: "",
      desmaioDistrimiaDetails: "",
      hipotireoidismoHipertireoidismo: "",
      hipotireoidismoHipertireoidismoDetails: "",
      dificuldadeMastigar: "",
      tpmMenopausa: "",
      tpmMenopausaDetails: "",
      calculoRenal: "",
      calculoRenalDetails: "",
      reposicaoHormonal: "",
      osteoporose: "",
      anemia: "",
      leucemia: "",
      hemofilia: "",
      ingestaoAlcoolica: "",
      tabagista: "",
      gastrite: "",
      ulceras: "",
      hepatite: "",
      sangramentoPosTraumaCirurgia: "",
      sangramentoPosTraumaCirurgiaDetails: "",
      outrasDoencas: "",
    },
    tratamentoExecutadoForm: {
      data: "",
      procedimento: "",
      dentista: "",
      valor: "",
      notaFiscal: "",
      formaDePagamento: "",
    },
    tratamentosExecutados: [],
    savedTreatments: [],
    savedFotografias: [],
    procedimentos: [],
  };

  const handleExit = async () => {
    console.log("patient info:", patientInfo);
    setAfterClickingTheAddPatientButton(false);
    setPatientInfo(initialState);
    try {
      if (selectedIndex === 0) {
        await savePatientData();
      } else if (selectedIndex === 1) {
        await saveHistoricoBucalData();
      } else if (selectedIndex === 2) {
        await saveInformacoesGeraisData();
      } else if (selectedIndex === 3) {
        await saveProceduresData();
      }
      navigate(`/patient-profile/${patientId}`);
    } catch (error) {
      console.error("Failed to save data before exiting", error);
      alert(error.message);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <div className="dropdown-container">
            <Dropdown onSelect={(e) => handleTabSelect(Number(e))}>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {
                  [
                    "Formulário do Paciente",
                    "Histórico Buco-Dentária",
                    "Informações Gerais",
                    "Procedimentos",
                    "Tratamento Executado",
                    "Fotografias",
                  ][selectedIndex]
                }
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="0">
                  Formulário do Paciente
                </Dropdown.Item>
                <Dropdown.Item eventKey="1">
                  Histórico Buco-Dentária
                </Dropdown.Item>
                <Dropdown.Item eventKey="2">Informações Gerais</Dropdown.Item>
                <Dropdown.Item eventKey="3">Procedimentos</Dropdown.Item>
                <Dropdown.Item eventKey="4">Tratamento Executado</Dropdown.Item>
                <Dropdown.Item eventKey="5">Fotografias</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <Nav variant="tabs" activeKey={selectedIndex} className="nav-tabs">
            <Nav.Item>
              <Nav.Link eventKey="0" onClick={() => handleTabSelect(0)}>
                Formulário do Paciente
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="1" onClick={() => handleTabSelect(1)}>
                Histórico Buco-Dentária
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="2" onClick={() => handleTabSelect(2)}>
                Informações Gerais
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="3" onClick={() => handleTabSelect(3)}>
                Procedimentos
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="4" onClick={() => handleTabSelect(4)}>
                Tratamento Executado
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="5" onClick={() => handleTabSelect(5)}>
                Fotografias
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {selectedIndex === 0 && (
            <FormularioDoPaciente patientId={patientId} />
          )}
          {selectedIndex === 1 && <HistoricoBucal patientId={patientId} />}
          {selectedIndex === 2 && <InformacoesGerais patientId={patientId} />}
          {selectedIndex === 3 && <Procedimentos patientId={patientId} />}
          {selectedIndex === 4 && <TratamentoExecutado patientId={patientId} />}
          {selectedIndex === 5 && <Fotografias patientId={patientId} />}

          <div className="button-container">
            <Button onClick={handleExit} className="exit-form-button">
              Exit Form
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PatientFormPage;
