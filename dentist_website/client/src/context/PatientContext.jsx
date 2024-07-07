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

  const [
    afterClickingTheAddPatientButton,
    setAfterClickingTheAddPatientButton,
  ] = useState(null);
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
    // Check if the treatment already exists (by _id)
    const exists = patientInfo.tratamentosExecutados.some(
      (t) => t._id === treatment._id
    );

    // Only add the treatment if it doesn't exist
    if (!exists) {
      setPatientInfo((prev) => ({
        ...prev,
        tratamentosExecutados: [...prev.tratamentosExecutados, treatment],
        tratamentoExecutadoForm: {
          data: "",
          procedimento: "",
          dentista: "",
          valor: "",
          notaFiscal: "",
          formaDePagamento: "",
        },
      }));
    }
  };

  const updateTreatment = (index, updatedTreatment) => {
    const updatedTreatments = [...patientInfo.tratamentosExecutados];
    updatedTreatments[index] = updatedTreatment;
    setPatientInfo((prev) => ({
      ...prev,
      tratamentosExecutados: updatedTreatments,
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
        `http://localhost:5005/patients/${
          patientInfo.patientId || patientInfo._id
        }/update-patient`,
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

  const saveHistoricoBucalData = useCallback(async () => {
    const relevantInfo = {
      frequenciaDentista: patientInfo.historicoBucal?.frequenciaDentista,
      mastigaLados: patientInfo.historicoBucal?.mastigaLados,
      escovaDentesFrequencia:
        patientInfo.historicoBucal?.escovaDentesFrequencia,
      rangeDentes: patientInfo.historicoBucal?.rangeDentes,
      apreensivoTratamento: patientInfo.historicoBucal?.apreensivoTratamento,
      gengivaSangra: patientInfo.historicoBucal?.gengivaSangra,
      problemaTratamentoOdontologico:
        patientInfo.historicoBucal?.problemaTratamentoOdontologico,
      problemaTratamentoOdontologicoDetails:
        patientInfo.historicoBucal?.problemaTratamentoOdontologicoDetails,
      usaFioDental: patientInfo.historicoBucal?.usaFioDental,
      dentesSensiveis: patientInfo.historicoBucal?.dentesSensiveis,
      metodoAuxiliar: patientInfo.historicoBucal?.metodoAuxiliar,
      mordeLinguaLabioBochecha:
        patientInfo.historicoBucal?.mordeLinguaLabioBochecha,
      dorMastigar: patientInfo.historicoBucal?.dorMastigar,
      usaProteseImplante: patientInfo.historicoBucal?.usaProteseImplante,
      usaProteseImplanteDetails:
        patientInfo.historicoBucal?.usaProteseImplanteDetails,
      feridaBoca: patientInfo.historicoBucal?.feridaBoca,
      feridaBocaDetails: patientInfo.historicoBucal?.feridaBocaDetails,
      dentesAfetamSaude: patientInfo.historicoBucal?.dentesAfetamSaude,
      respiraPelaBoca: patientInfo.historicoBucal?.respiraPelaBoca,
    };

    try {
      await axios.patch(
        `http://localhost:5005/patients/${
          patientInfo.patientId || patientInfo._id
        }/dental-history`,
        relevantInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Histórico bucal atualizado com sucesso!");
    } catch (error) {
      console.error("Failed to update dental history", error);
      throw new Error("Failed to update dental history.");
    }
  }, [patientInfo]);

  const saveInformacoesGeraisData = useCallback(async () => {
    const relevantInfo = {
      tratamentoMedico: patientInfo.informacoesGerais?.tratamentoMedico,
      tratamentoMedicoDetails:
        patientInfo.informacoesGerais?.tratamentoMedicoDetails,
      alergiaMedicamentosa: patientInfo.informacoesGerais?.alergiaMedicamentosa,
      alergiaMedicamentosaDetails:
        patientInfo.informacoesGerais?.alergiaMedicamentosaDetails,
      consideraNervoso: patientInfo.informacoesGerais?.consideraNervoso,
      alergiaOutros: patientInfo.informacoesGerais?.alergiaOutros,
      alergiaOutrosDetails: patientInfo.informacoesGerais?.alergiaOutrosDetails,
      consideraAnsioso: patientInfo.informacoesGerais?.consideraAnsioso,
      hospitalizadoCirurgia:
        patientInfo.informacoesGerais?.hospitalizadoCirurgia,
      hospitalizadoCirurgiaDetails:
        patientInfo.informacoesGerais?.hospitalizadoCirurgiaDetails,
      vomitaFrequentemente: patientInfo.informacoesGerais?.vomitaFrequentemente,
      gravida: patientInfo.informacoesGerais?.gravida,
      gravidaDetails: patientInfo.informacoesGerais?.gravidaDetails,
      amamentando: patientInfo.informacoesGerais?.amamentando,
      faltaArCansaco: patientInfo.informacoesGerais?.faltaArCansaco,
      faltaArCansacoDetails:
        patientInfo.informacoesGerais?.faltaArCansacoDetails,
      doresPeito: patientInfo.informacoesGerais?.doresPeito,
      alteracaoPressao: patientInfo.informacoesGerais?.alteracaoPressao,
      historicoInfarto: patientInfo.informacoesGerais?.historicoInfarto,
      historicoInfartoDetails:
        patientInfo.informacoesGerais?.historicoInfartoDetails,
      historicoAVC: patientInfo.informacoesGerais?.historicoAVC,
      historicoAVCDetails: patientInfo.informacoesGerais?.historicoAVCDetails,
      historicoAsma: patientInfo.informacoesGerais?.historicoAsma,
      historicoAsmaDetails: patientInfo.informacoesGerais?.historicoAsmaDetails,
      historicoDiabetes: patientInfo.informacoesGerais?.historicoDiabetes,
      historicoDiabetesDetails:
        patientInfo.informacoesGerais?.historicoDiabetesDetails,
      tuberculose: patientInfo.informacoesGerais?.tuberculose,
      tuberculoseDetails: patientInfo.informacoesGerais?.tuberculoseDetails,
      sedeConstante: patientInfo.informacoesGerais?.sedeConstante,
      urinaNoite: patientInfo.informacoesGerais?.urinaNoite,
      alteracaoHormonal: patientInfo.informacoesGerais?.alteracaoHormonal,
      alteracaoHormonalDetails:
        patientInfo.informacoesGerais?.alteracaoHormonalDetails,
      desmaioDistrimia: patientInfo.informacoesGerais?.desmaioDistrimia,
      desmaioDistrimiaDetails:
        patientInfo.informacoesGerais?.desmaioDistrimiaDetails,
      hipotireoidismoHipertireoidismo:
        patientInfo.informacoesGerais?.hipotireoidismoHipertireoidismo,
      hipotireoidismoHipertireoidismoDetails:
        patientInfo.informacoesGerais?.hipotireoidismoHipertireoidismoDetails,
      dificuldadeMastigar: patientInfo.informacoesGerais?.dificuldadeMastigar,
      tpmMenopausa: patientInfo.informacoesGerais?.tpmMenopausa,
      tpmMenopausaDetails: patientInfo.informacoesGerais?.tpmMenopausaDetails,
      calculoRenal: patientInfo.informacoesGerais?.calculoRenal,
      calculoRenalDetails: patientInfo.informacoesGerais?.calculoRenalDetails,
      reposicaoHormonal: patientInfo.informacoesGerais?.reposicaoHormonal,
      osteoporose: patientInfo.informacoesGerais?.osteoporose,
      anemia: patientInfo.informacoesGerais?.anemia,
      leucemia: patientInfo.informacoesGerais?.leucemia,
      hemofilia: patientInfo.informacoesGerais?.hemofilia,
      ingestaoAlcoolica: patientInfo.informacoesGerais?.ingestaoAlcoolica,
      tabagista: patientInfo.informacoesGerais?.tabagista,
      gastrite: patientInfo.informacoesGerais?.gastrite,
      ulceras: patientInfo.informacoesGerais?.ulceras,
      hepatite: patientInfo.informacoesGerais?.hepatite,
      sangramentoPosTraumaCirurgia:
        patientInfo.informacoesGerais?.sangramentoPosTraumaCirurgia,
      sangramentoPosTraumaCirurgiaDetails:
        patientInfo.informacoesGerais?.sangramentoPosTraumaCirurgiaDetails,
      outrasDoencas: patientInfo.informacoesGerais?.outrasDoencas,
    };

    try {
      await axios.patch(
        `http://localhost:5005/patients/${
          patientInfo.patientId || patientInfo._id
        }/general-info`,
        relevantInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("General information saved successfully");
    } catch (error) {
      console.error("Failed to save general information", error);
      throw new Error("Failed to save general information");
    }
  }, [patientInfo]);

  const saveProceduresData = useCallback(async () => {
    const relevantProcedures = {
      procedimentos: patientInfo.procedimentos,
    };

    try {
      await axios.patch(
        `http://localhost:5005/patients/${
          patientInfo.patientId || patientInfo._id
        }/procedimento`,
        relevantProcedures,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Procedures saved successfully");
    } catch (error) {
      console.error("Failed to save procedures", error);
      throw new Error("Failed to save procedures. Please try again.");
    }
  }, [patientInfo.patientId, patientInfo.procedimentos]);

  const saveTreatmentsData = useCallback(async () => {
    const relevantTreatments = {
      tratamentosExecutados: patientInfo?.savedTreatments, // Use savedTreatments from context
    };

    try {
      await axios.patch(
        `http://localhost:5005/patients/${
          patientInfo.patientId || patientInfo._id
        }/tratamento-executado`,
        relevantTreatments,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Tratamentos salvos com sucesso");
    } catch (error) {
      console.error("Falha ao salvar tratamentos", error);
      throw new Error("Falha ao salvar tratamentos. Tente novamente.");
    }
  }, [patientInfo.savedTreatments, patientInfo.patientId]); // Ensure dependencies are correct

  return (
    <PatientContext.Provider
      value={{
        afterClickingTheAddPatientButton,
        setAfterClickingTheAddPatientButton,
        patientInfo,
        setPatientInfo,
        createEmptyPatient,
        clearPatientInfo,
        addProcedure,
        updateProcedure,
        addTreatment,
        updateTreatment,
        updatePatientInfo,
        setSavedTreatments,
        setSavedFotografias,
        savePatientData,
        saveHistoricoBucalData,
        saveInformacoesGeraisData,
        saveProceduresData,
        saveTreatmentsData,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export default PatientProvider;
