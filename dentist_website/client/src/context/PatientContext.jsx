// import React, { createContext, useContext, useState } from "react";
// import axios from "axios";

// const PatientContext = createContext();

// export const usePatientInfo = () => useContext(PatientContext);

// export const PatientProvider = ({ children }) => {
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

//   const [patientInfo, setPatientInfo] = useState(initialState);

//   const clearPatientInfo = () => {
//     setPatientInfo(initialState);
//   };

//   const createEmptyPatient = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5005/patients/create-empty-patient"
//       );
//       setPatientInfo((prev) => ({
//         ...prev,
//         patientId: response.data.patientId,
//       }));
//       return response.data.patientId;
//     } catch (error) {
//       console.error("Failed to create empty patient:", error);
//       throw error;
//     }
//   };

//   const addProcedure = (procedure) => {
//     setPatientInfo((prev) => ({
//       ...prev,
//       procedimentos: [...prev.procedimentos, procedure],
//     }));
//   };

//   const updateProcedure = (index, updatedProcedure) => {
//     const updatedProcedures = [...patientInfo.procedimentos];
//     updatedProcedures[index] = updatedProcedure;
//     setPatientInfo((prev) => ({
//       ...prev,
//       procedimentos: updatedProcedures,
//     }));
//   };

//   const updatePatientInfo = (updates) => {
//     setPatientInfo((prev) => ({
//       ...prev,
//       ...updates,
//       tratamentoExecutadoForm: {
//         ...prev.tratamentoExecutadoForm,
//         ...updates.tratamentoExecutadoForm,
//       },
//     }));
//   };

//   const addTreatment = (treatment) => {
//     const newTreatment = {
//       ...patientInfo.tratamentoExecutadoForm,
//       ...treatment,
//     };

//     setPatientInfo((prev) => ({
//       ...prev,
//       tratamentosExecutados: [...prev.tratamentosExecutados, newTreatment],
//       tratamentoExecutadoForm: {
//         data: "",
//         procedimento: "",
//         dentista: "",
//         valor: "",
//         notaFiscal: "",
//         formaDePagamento: "",
//       },
//     }));
//   };

//   const setSavedTreatments = (treatments) => {
//     setPatientInfo((prev) => ({
//       ...prev,
//       savedTreatments: treatments,
//     }));
//   };

//   const setSavedFotografias = (fotografias) => {
//     setPatientInfo((prev) => ({
//       ...prev,
//       savedFotografias: fotografias,
//     }));
//   };

//   return (
//     <PatientContext.Provider
//       value={{
//         patientInfo,
//         setPatientInfo,
//         createEmptyPatient,
//         clearPatientInfo,
//         addProcedure,
//         updateProcedure,
//         addTreatment,
//         updatePatientInfo,
//         setSavedTreatments,
//         setSavedFotografias,
//       }}
//     >
//       {children}
//     </PatientContext.Provider>
//   );
// };

// export default PatientProvider;
import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const PatientContext = createContext();

export const usePatientInfo = () => useContext(PatientContext);

export const PatientProvider = ({ children }) => {
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

  const [patientInfo, setPatientInfo] = useState(initialState);

  const clearPatientInfo = () => {
    setPatientInfo(initialState);
  };

  const createEmptyPatient = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5005/patients/create-empty-patient"
      );
      setPatientInfo((prev) => ({
        ...prev,
        patientId: response.data.patientId,
      }));
      return response.data.patientId;
    } catch (error) {
      console.error("Failed to create empty patient:", error);
      throw error;
    }
  };

  const addProcedure = (procedure) => {
    setPatientInfo((prev) => ({
      ...prev,
      procedimentos: [...prev.procedimentos, procedure],
    }));
  };

  const updateProcedure = (index, updatedProcedure) => {
    const updatedProcedures = [...patientInfo.procedimentos];
    updatedProcedures[index] = updatedProcedure;
    setPatientInfo((prev) => ({
      ...prev,
      procedimentos: updatedProcedures,
    }));
  };

  const updatePatientInfo = (updates) => {
    setPatientInfo((prev) => ({
      ...prev,
      ...updates,
      tratamentoExecutadoForm: {
        ...prev.tratamentoExecutadoForm,
        ...updates.tratamentoExecutadoForm,
      },
    }));
  };

  const addTreatment = (treatment) => {
    const newTreatment = {
      ...patientInfo.tratamentoExecutadoForm,
      ...treatment,
    };

    setPatientInfo((prev) => ({
      ...prev,
      tratamentosExecutados: [...prev.tratamentosExecutados, newTreatment],
      tratamentoExecutadoForm: {
        data: "",
        procedimento: "",
        dentista: "",
        valor: "",
        notaFiscal: "",
        formaDePagamento: "",
      },
    }));
  };

  const setSavedTreatments = (treatments) => {
    setPatientInfo((prev) => ({
      ...prev,
      savedTreatments: treatments,
    }));
  };

  const setSavedFotografias = (fotografias) => {
    setPatientInfo((prev) => ({
      ...prev,
      savedFotografias: fotografias,
    }));
  };

  const savePatientData = useCallback(async () => {
    const formData = new FormData();
    const relevantFields = [
      "nome",
      "dataConsulta",
      "cpf",
      "dataNascimento",
      "genero",
      "racaCor",
      "estadoCivil",
      "plano",
      "profissao",
      "escolaridade",
      "endereco.rua",
      "endereco.numero",
      "endereco.bairro",
      "endereco.cidade",
      "endereco.estado",
      "contato.whatsapp",
      "contato.instagram",
      "contato.telefone",
      "contato.email",
    ];

    relevantFields.forEach((field) => {
      const value = field.split(".").reduce((o, key) => o[key], patientInfo); // Access nested properties
      if (value != null) {
        formData.append(field, value);
      }
    });

    if (patientInfo.profilePhoto) {
      formData.append("profilePhoto", patientInfo.profilePhoto);
    }

    try {
      await axios.patch(
        `http://localhost:5005/patients/${patientInfo.patientId}/update-patient`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Data saved successfully");
    } catch (error) {
      console.error("Failed to save data", error);
      if (error.response && error.response.status === 409) {
        throw new Error("Name already exists in the database.");
      } else {
        throw new Error("Failed to save data. Please try again.");
      }
    }
  }, [patientInfo]);

  return (
    <PatientContext.Provider
      value={{
        patientInfo,
        setPatientInfo,
        createEmptyPatient,
        clearPatientInfo,
        addProcedure,
        updateProcedure,
        addTreatment,
        updatePatientInfo,
        setSavedTreatments,
        setSavedFotografias,
        savePatientData,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export default PatientProvider;
