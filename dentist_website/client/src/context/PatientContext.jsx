// import React, { createContext, useContext, useState } from "react";

// const PatientContext = createContext();

// export const usePatientInfo = () => useContext(PatientContext);
// export const PatientProvider = ({ children }) => {
//   const [patientInfo, setPatientInfo] = useState({
//     patientId: "",
//     nome: "",
//     dataConsulta: "",
//     idade: "",
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
//   });

//   // // Use useEffect to log the patientId whenever it changes
//   // useEffect(() => {
//   //   console.log("Patient ID from context:", patientInfo.patientId);
//   // }, [patientInfo.patientId]); // Dependency array with patientId

//   // Function to update patient ID separately if needed
//   const setPatientId = (id) => {
//     console.log("Setting patientId:", id);
//     setPatientInfo((prev) => ({ ...prev, patientId: id }));
//   };

//   return (
//     <PatientContext.Provider
//       value={{ patientInfo, setPatientInfo, setPatientId }}
//     >
//       {children}
//     </PatientContext.Provider>
//   );
// };

// export default PatientProvider;

import React, { createContext, useContext, useState } from "react";

const PatientContext = createContext();

export const usePatientInfo = () => useContext(PatientContext);

export const PatientProvider = ({ children }) => {
  const [patientInfo, setPatientInfo] = useState({
    patientId: "",
    nome: "",
    dataConsulta: "",
    idade: "",
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
    procedimentos: [],
  });

  const setPatientId = (id) => {
    console.log("Setting patientId:", id);
    setPatientInfo((prev) => ({ ...prev, patientId: id }));
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
    console.log("Before update:", patientInfo);
    setPatientInfo((prev) => ({
      ...prev,
      ...updates,
      tratamentoExecutadoForm: {
        ...prev.tratamentoExecutadoForm,
        ...updates.tratamentoExecutadoForm,
      },
    }));
    console.log("After update:", patientInfo);
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
        // Resetting the form data after adding treatment
        data: "",
        procedimento: "",
        dentista: "",
        valor: "",
        notaFiscal: "",
        formaDePagamento: "",
      },
    }));
  };

  return (
    <PatientContext.Provider
      value={{
        patientInfo,
        setPatientInfo,
        setPatientId,
        addProcedure,
        updateProcedure,
        addTreatment,
        updatePatientInfo,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export default PatientProvider;
