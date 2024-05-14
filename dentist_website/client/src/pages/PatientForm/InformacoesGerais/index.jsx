// import React, { useEffect } from "react";
// import axios from "axios";
// import { usePatientInfo } from "../../../context/PatientContext"; // Ensure the path is correct

// function InformacoesGerais() {
//   const { patientInfo, setPatientInfo } = usePatientInfo();

//   // Check patientId when component mounts
//   useEffect(() => {
//     if (!patientInfo.patientId) {
//       console.log("No patientId found, please ensure it's being set correctly");
//       // Optionally, redirect or disable form
//     } else {
//       console.log("Using patientId:", patientInfo.patientId);
//       // If you need to load patient data:
//       // loadPatientData(patientInfo.patientId);
//     }
//   }, [patientInfo.patientId]); // Ensure dependency is correct

//   const handleChange = (event) => {
//     const { name, value, type, checked } = event.target;
//     const keys = name.split(".");

//     const updateState = (prevState, keys, value) => {
//       const key = keys[0];
//       if (keys.length === 1) {
//         return { ...prevState, [key]: value };
//       }
//       return {
//         ...prevState,
//         [key]: updateState(prevState[key], keys.slice(1), value),
//       };
//     };

//     setPatientInfo((prevState) =>
//       updateState(prevState, keys, type === "checkbox" ? checked : value)
//     );
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log("Submitting data for patientId:", patientInfo.patientId);

//     if (!patientInfo.patientId) {
//       alert("No Patient ID provided. Please ensure it is set correctly.");
//       return;
//     }

//     try {
//       const response = await axios.patch(
//         `http://localhost:5005/patients/${patientInfo.patientId}/general-info`,
//         patientInfo.informacoesGerais // Only send the 'informacoesGerais' part of the state
//       );
//       alert("Informações gerais atualizadas com sucesso!");
//       console.log("Response Data:", response.data);
//     } catch (error) {
//       console.error("Failed to update general information", error);
//       alert("Falha ao atualizar as informações gerais!");
//     }
//   };

import React, { useEffect, useCallback } from "react";
import axios from "axios";
import { usePatientInfo } from "../../../context/PatientContext"; // Ensure the path is correct
import { useParams } from "react-router-dom";

function InformacoesGerais() {
  const { patientId } = useParams();
  const { patientInfo, setPatientInfo } = usePatientInfo();

  // Check patientId when component mounts
  useEffect(() => {
    if (!patientInfo.patientId) {
      console.log("No patientId found, please ensure it's being set correctly");
      // Optionally, redirect or disable form
    } else {
      console.log("Using patientId:", patientInfo.patientId);
      // If you need to load patient data:
      // loadPatientData(patientInfo.patientId);
    }
  }, [patientInfo.patientId]); // Ensure dependency is correct

  const saveData = useCallback(
    async (data) => {
      try {
        await axios.patch(
          `http://localhost:5005/patients/${patientId}/general-info`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Data saved successfully");
      } catch (error) {
        console.error("Failed to save data", error);
      }
    },
    [patientId]
  );

  const autosaveForm = useCallback(() => {
    console.log("Autosaving data...");
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

    saveData(relevantInfo);
  }, [patientInfo.informacoesGerais, saveData]);

  // Effect for autosaving at intervals
  useEffect(() => {
    const autosaveInterval = setInterval(autosaveForm, 30000); // Autosave every 30 seconds
    return () => clearInterval(autosaveInterval); // Cleanup on unmount
  }, [autosaveForm]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const keys = name.split(".");

    const updateState = (prevState, keys, value) => {
      const key = keys[0];
      if (keys.length === 1) {
        return { ...prevState, [key]: value };
      }
      return {
        ...prevState,
        [key]: updateState(prevState[key], keys.slice(1), value),
      };
    };

    setPatientInfo((prevState) =>
      updateState(prevState, keys, type === "checkbox" ? checked : value)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting data for patientId:", patientInfo.patientId);

    if (!patientInfo.patientId) {
      alert("No Patient ID provided. Please ensure it is set correctly.");
      return;
    }

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
      const response = await axios.patch(
        `http://localhost:5005/patients/${patientInfo.patientId}/general-info`,
        relevantInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Informações gerais atualizadas com sucesso!");
      console.log("Response Data:", response.data);
    } catch (error) {
      console.error("Failed to update general information", error);
      alert("Falha ao atualizar as informações gerais!");
    }
  };

  return (
    <form className="informacoes-gerais-form" onSubmit={handleSubmit}>
      <div>
        <label>Está sob tratamento médico?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.tratamentoMedico"
            value="sim"
            checked={patientInfo.informacoesGerais.tratamentoMedico === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.tratamentoMedico"
            value="não"
            checked={patientInfo.informacoesGerais.tratamentoMedico === "não"}
            onChange={handleChange}
          />
          Não
        </div>
        {patientInfo.informacoesGerais.tratamentoMedico === "sim" && (
          <input
            type="text"
            name="informacoesGerais.tratamentoMedicoDetails"
            placeholder="Detalhes do tratamento médico"
            value={patientInfo.informacoesGerais.tratamentoMedicoDetails || ""}
            onChange={handleChange}
          />
        )}
      </div>
      <div>
        <label>Já apresentou alguma alergia medicamentosa?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.alergiaMedicamentosa"
            value="sim"
            checked={
              patientInfo.informacoesGerais.alergiaMedicamentosa === "sim"
            }
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.alergiaMedicamentosa"
            value="não"
            checked={
              patientInfo.informacoesGerais.alergiaMedicamentosa === "não"
            }
            onChange={handleChange}
          />
          Não
        </div>
        {patientInfo.informacoesGerais.alergiaMedicamentosa === "sim" && (
          <input
            type="text"
            name="informacoesGerais.alergiaMedicamentosaDetails"
            placeholder="Detalhes da alergia medicamentosa"
            value={
              patientInfo.informacoesGerais.alergiaMedicamentosaDetails || ""
            }
            onChange={handleChange}
          />
        )}
      </div>

      {/* 3 - Considera-se nervoso? */}
      <div>
        <label>Considera-se nervoso(a)?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.consideraNervoso"
            value="sim"
            checked={patientInfo.informacoesGerais.consideraNervoso === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.consideraNervoso"
            value="não"
            checked={patientInfo.informacoesGerais.consideraNervoso === "não"}
            onChange={handleChange}
          />
          Não
        </div>
      </div>
      {/* 4 - Já apresentou alguma alergia a algum outro agente? */}
      <div>
        <label>Já apresentou alguma alergia a algum outro agente?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.alergiaOutros"
            value="sim"
            checked={patientInfo.informacoesGerais.alergiaOutros === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.alergiaOutros"
            value="não"
            checked={patientInfo.informacoesGerais.alergiaOutros === "não"}
            onChange={handleChange}
          />
          Não
        </div>
        {patientInfo.informacoesGerais.alergiaOutros === "sim" && (
          <input
            type="text"
            name="informacoesGerais.alergiaOutrosDetails"
            placeholder="Detalhes da alergia a outros agentes"
            value={patientInfo.informacoesGerais.alergiaOutrosDetails || ""}
            onChange={handleChange}
          />
        )}
      </div>

      {/* 5 - Considera-se ansioso? */}
      <div>
        <label>Considera-se ansioso(a)?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.consideraAnsioso"
            value="sim"
            checked={patientInfo.informacoesGerais.consideraAnsioso === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.consideraAnsioso"
            value="não"
            checked={patientInfo.informacoesGerais.consideraAnsioso === "não"}
            onChange={handleChange}
          />
          Não
        </div>
      </div>
      {/* 6 - Foi hospitalizado? Cirurgia? */}
      <div>
        <label>Foi hospitalizado? Cirurgia?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.hospitalizadoCirurgia"
            value="sim"
            checked={
              patientInfo.informacoesGerais.hospitalizadoCirurgia === "sim"
            }
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.hospitalizadoCirurgia"
            value="não"
            checked={
              patientInfo.informacoesGerais.hospitalizadoCirurgia === "não"
            }
            onChange={handleChange}
          />
          Não
        </div>
        {patientInfo.informacoesGerais.hospitalizadoCirurgia === "sim" && (
          <input
            type="text"
            name="informacoesGerais.hospitalizadoCirurgiaDetails"
            placeholder="Detalhes da hospitalização/cirurgia"
            value={
              patientInfo.informacoesGerais.hospitalizadoCirurgiaDetails || ""
            }
            onChange={handleChange}
          />
        )}
      </div>
      {/* 7 - Vomita Frequentemente? */}
      <div>
        <label>Vomita frequentemente?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.vomitaFrequentemente"
            value="sim"
            checked={
              patientInfo.informacoesGerais.vomitaFrequentemente === "sim"
            }
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.vomitaFrequentemente"
            value="não"
            checked={
              patientInfo.informacoesGerais.vomitaFrequentemente === "não"
            }
            onChange={handleChange}
          />
          Não
        </div>
      </div>
      {/* 8 - Está Grávida? */}
      <div>
        <label>Está grávida?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.gravida"
            value="sim"
            checked={patientInfo.informacoesGerais.gravida === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.gravida"
            value="não"
            checked={patientInfo.informacoesGerais.gravida === "não"}
            onChange={handleChange}
          />
          Não
        </div>
        {patientInfo.informacoesGerais.gravida === "sim" && (
          <input
            type="text"
            name="informacoesGerais.gravidaDetails"
            placeholder="Detalhes da gravidez"
            value={patientInfo.informacoesGerais.gravidaDetails || ""}
            onChange={handleChange}
          />
        )}
      </div>

      {/* 9 - Está Amamentando? */}
      <div>
        <label>Está amamentando?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.amamentando"
            value="sim"
            checked={patientInfo.informacoesGerais.amamentando === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.amamentando"
            value="não"
            checked={patientInfo.informacoesGerais.amamentando === "não"}
            onChange={handleChange}
          />
          Não
        </div>
      </div>
      {/* 10 - Sente Falta de Ar ou Cansaço a Esforços Leves? */}
      <div>
        <label>Sente falta de ar ou cansaço a esforços leves?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.faltaArCansaco"
            value="sim"
            checked={patientInfo.informacoesGerais.faltaArCansaco === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.faltaArCansaco"
            value="não"
            checked={patientInfo.informacoesGerais.faltaArCansaco === "não"}
            onChange={handleChange}
          />
          Não
        </div>
        {patientInfo.informacoesGerais.faltaArCansaco === "sim" && (
          <input
            type="text"
            name="informacoesGerais.faltaArCansacoDetails"
            placeholder="Detalhes da falta de ar ou cansaço"
            value={patientInfo.informacoesGerais.faltaArCansacoDetails || ""}
            onChange={handleChange}
          />
        )}
      </div>
      <div>
        <label>Sente dores no peito?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.doresPeito"
            value="sim"
            checked={patientInfo.informacoesGerais.doresPeito === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.doresPeito"
            value="não"
            checked={patientInfo.informacoesGerais.doresPeito === "não"}
            onChange={handleChange}
          />
          Não
        </div>
      </div>

      <div>
        <label>Alteração de pressão arterial?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.alteracaoPressao"
            value="sim"
            checked={patientInfo.informacoesGerais.alteracaoPressao === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.alteracaoPressao"
            value="não"
            checked={patientInfo.informacoesGerais.alteracaoPressao === "não"}
            onChange={handleChange}
          />
          Não
        </div>
      </div>
      {/* 13 - Histórico de Infarto */}
      <div>
        <label>Histórico de infarto?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.historicoInfarto"
            value="sim"
            checked={patientInfo.informacoesGerais.historicoInfarto === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.historicoInfarto"
            value="não"
            checked={patientInfo.informacoesGerais.historicoInfarto === "não"}
            onChange={handleChange}
          />
          Não
        </div>
        {patientInfo.informacoesGerais.historicoInfarto === "sim" && (
          <input
            type="text"
            name="informacoesGerais.historicoInfartoDetails"
            placeholder="Detalhes do infarto"
            value={patientInfo.informacoesGerais.historicoInfartoDetails || ""}
            onChange={handleChange}
          />
        )}
      </div>
      <div>
        <label>Histórico de AVC?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.historicoAVC"
            value="sim"
            checked={patientInfo.informacoesGerais.historicoAVC === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.historicoAVC"
            value="não"
            checked={patientInfo.informacoesGerais.historicoAVC === "não"}
            onChange={handleChange}
          />
          Não
        </div>
        {patientInfo.informacoesGerais.historicoAVC === "sim" && (
          <input
            type="text"
            name="informacoesGerais.historicoAVCDetails"
            placeholder="Detalhes do AVC"
            value={patientInfo.informacoesGerais.historicoAVCDetails || ""}
            onChange={handleChange}
          />
        )}
      </div>
      <div>
        <label>Histórico de asma?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.historicoAsma"
            value="sim"
            checked={patientInfo.informacoesGerais.historicoAsma === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.historicoAsma"
            value="não"
            checked={patientInfo.informacoesGerais.historicoAsma === "não"}
            onChange={handleChange}
          />
          Não
        </div>
        {patientInfo.informacoesGerais.historicoAsma === "sim" && (
          <input
            type="text"
            name="informacoesGerais.historicoAsmaDetails"
            placeholder="Detalhes da asma"
            value={patientInfo.informacoesGerais.historicoAsmaDetails || ""}
            onChange={handleChange}
          />
        )}
      </div>
      <div>
        <label>Histórico de diabetes?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.historicoDiabetes"
            value="sim"
            checked={patientInfo.informacoesGerais.historicoDiabetes === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.historicoDiabetes"
            value="não"
            checked={patientInfo.informacoesGerais.historicoDiabetes === "não"}
            onChange={handleChange}
          />
          Não
        </div>
        {patientInfo.informacoesGerais.historicoDiabetes === "sim" && (
          <input
            type="text"
            name="informacoesGerais.historicoDiabetesDetails"
            placeholder="Detalhes do diabetes"
            value={patientInfo.informacoesGerais.historicoDiabetesDetails || ""}
            onChange={handleChange}
          />
        )}
      </div>

      <div>
        <label>Tuberculose?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.tuberculose"
            value="sim"
            checked={patientInfo.informacoesGerais.tuberculose === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.tuberculose"
            value="não"
            checked={patientInfo.informacoesGerais.tuberculose === "não"}
            onChange={handleChange}
          />
          Não
        </div>
        {patientInfo.informacoesGerais.tuberculose === "sim" && (
          <input
            type="text"
            name="informacoesGerais.tuberculoseDetails"
            placeholder="Detalhes da tuberculose"
            value={patientInfo.informacoesGerais.tuberculoseDetails || ""}
            onChange={handleChange}
          />
        )}
      </div>

      <div>
        <label>Sente-se com sede a maior parte do tempo?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.sedeConstante"
            value="sim"
            checked={patientInfo.informacoesGerais.sedeConstante === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.sedeConstante"
            value="não"
            checked={patientInfo.informacoesGerais.sedeConstante === "não"}
            onChange={handleChange}
          />
          Não
        </div>
      </div>

      <div>
        <label>Urina mais de 6 vezes por noite?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.urinaNoite"
            value="sim"
            checked={patientInfo.informacoesGerais.urinaNoite === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.urinaNoite"
            value="não"
            checked={patientInfo.informacoesGerais.urinaNoite === "não"}
            onChange={handleChange}
          />
          Não
        </div>
      </div>

      <div>
        <label>Possui alteração hormonal?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.alteracaoHormonal"
            value="sim"
            checked={patientInfo.informacoesGerais.alteracaoHormonal === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.alteracaoHormonal"
            value="não"
            checked={patientInfo.informacoesGerais.alteracaoHormonal === "não"}
            onChange={handleChange}
          />
          Não
        </div>
        {patientInfo.informacoesGerais.alteracaoHormonal === "sim" && (
          <input
            type="text"
            name="informacoesGerais.alteracaoHormonalDetails"
            placeholder="Detalhes da alteração hormonal"
            value={patientInfo.informacoesGerais.alteracaoHormonalDetails || ""}
            onChange={handleChange}
          />
        )}
      </div>

      <div>
        <label>Desmaio, distrimia?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.desmaioDistrimia"
            value="sim"
            checked={patientInfo.informacoesGerais.desmaioDistrimia === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.desmaioDistrimia"
            value="não"
            checked={patientInfo.informacoesGerais.desmaioDistrimia === "não"}
            onChange={handleChange}
          />
          Não
        </div>
        {patientInfo.informacoesGerais.desmaioDistrimia === "sim" && (
          <input
            type="text"
            name="informacoesGerais.desmaioDistrimiaDetails"
            placeholder="Detalhes de desmaio ou distrimia"
            value={patientInfo.informacoesGerais.desmaioDistrimiaDetails || ""}
            onChange={handleChange}
          />
        )}
      </div>

      <div>
        <label>Possui hipotireoidismo ou hipertireoidismo?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.hipotireoidismoHipertireoidismo"
            value="sim"
            checked={
              patientInfo.informacoesGerais.hipotireoidismoHipertireoidismo ===
              "sim"
            }
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.hipotireoidismoHipertireoidismo"
            value="não"
            checked={
              patientInfo.informacoesGerais.hipotireoidismoHipertireoidismo ===
              "não"
            }
            onChange={handleChange}
          />
          Não
        </div>
        {patientInfo.informacoesGerais.hipotireoidismoHipertireoidismo ===
          "sim" && (
          <input
            type="text"
            name="informacoesGerais.hipotireoidismoHipertireoidismoDetails"
            placeholder="Detalhes do hipotireoidismo ou hipertireoidismo"
            value={
              patientInfo.informacoesGerais
                .hipotireoidismoHipertireoidismoDetails || ""
            }
            onChange={handleChange}
          />
        )}
      </div>

      <div>
        <label>Tem dificuldade de mastigar?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.dificuldadeMastigar"
            value="sim"
            checked={
              patientInfo.informacoesGerais.dificuldadeMastigar === "sim"
            }
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.dificuldadeMastigar"
            value="não"
            checked={
              patientInfo.informacoesGerais.dificuldadeMastigar === "não"
            }
            onChange={handleChange}
          />
          Não
        </div>
      </div>

      {/* 24 - TPM? Menopausa? */}
      <div>
        <label>TPM? Menopausa?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.tpmMenopausa"
            value="sim"
            checked={patientInfo.informacoesGerais.tpmMenopausa === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.tpmMenopausa"
            value="não"
            checked={patientInfo.informacoesGerais.tpmMenopausa === "não"}
            onChange={handleChange}
          />
          Não
        </div>
        {patientInfo.informacoesGerais.tpmMenopausa === "sim" && (
          <input
            type="text"
            name="informacoesGerais.tpmMenopausaDetails"
            placeholder="Detalhes de TPM ou Menopausa"
            value={patientInfo.informacoesGerais.tpmMenopausaDetails || ""}
            onChange={handleChange}
          />
        )}
      </div>
      {/* 25 - Cálculo ou insuficiência renal? */}
      <div>
        <label>Cálculo ou insuficiência renal?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.calculoRenal"
            value="sim"
            checked={patientInfo.informacoesGerais.calculoRenal === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.calculoRenal"
            value="não"
            checked={patientInfo.informacoesGerais.calculoRenal === "não"}
            onChange={handleChange}
          />
          Não
        </div>
        {patientInfo.informacoesGerais.calculoRenal === "sim" && (
          <input
            type="text"
            name="informacoesGerais.calculoRenalDetails"
            placeholder="Detalhes de cálculo ou insuficiência renal"
            value={patientInfo.informacoesGerais.calculoRenalDetails || ""}
            onChange={handleChange}
          />
        )}
      </div>
      {/* 26 - Reposição hormonal? */}
      <div>
        <label>Reposição hormonal?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.reposicaoHormonal"
            value="sim"
            checked={patientInfo.informacoesGerais.reposicaoHormonal === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.reposicaoHormonal"
            value="não"
            checked={patientInfo.informacoesGerais.reposicaoHormonal === "não"}
            onChange={handleChange}
          />
          Não
        </div>
      </div>
      {/* 27 - Osteoporose */}
      <div>
        <label>Osteoporose?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.osteoporose"
            value="sim"
            checked={patientInfo.informacoesGerais.osteoporose === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.osteoporose"
            value="não"
            checked={patientInfo.informacoesGerais.osteoporose === "não"}
            onChange={handleChange}
          />
          Não
        </div>
      </div>

      {/* 28 - Anemia */}
      <div>
        <label>Anemia?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.anemia"
            value="sim"
            checked={patientInfo.informacoesGerais.anemia === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.anemia"
            value="não"
            checked={patientInfo.informacoesGerais.anemia === "não"}
            onChange={handleChange}
          />
          Não
        </div>
      </div>
      {/* 29 - Leucemia */}
      <div>
        <label>Leucemia?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.leucemia"
            value="sim"
            checked={patientInfo.informacoesGerais.leucemia === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.leucemia"
            value="não"
            checked={patientInfo.informacoesGerais.leucemia === "não"}
            onChange={handleChange}
          />
          Não
        </div>
      </div>
      {/* 30 - Hemofilia */}
      <div>
        <label>Hemofilia?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.hemofilia"
            value="sim"
            checked={patientInfo.informacoesGerais.hemofilia === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.hemofilia"
            value="não"
            checked={patientInfo.informacoesGerais.hemofilia === "não"}
            onChange={handleChange}
          />
          Não
        </div>
      </div>
      {/* 31 - Ingere bebida alcoólica */}
      <div>
        <label>Ingere bebida alcoólica?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.ingestaoAlcoolica"
            value="sim"
            checked={patientInfo.informacoesGerais.ingestaoAlcoolica === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.ingestaoAlcoolica"
            value="não"
            checked={patientInfo.informacoesGerais.ingestaoAlcoolica === "não"}
            onChange={handleChange}
          />
          Não
        </div>
      </div>
      {/* 32 - Tabagista */}
      <div>
        <label>Tabagista?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.tabagista"
            value="sim"
            checked={patientInfo.informacoesGerais.tabagista === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.tabagista"
            value="não"
            checked={patientInfo.informacoesGerais.tabagista === "não"}
            onChange={handleChange}
          />
          Não
        </div>
      </div>

      {/* 33 - Gastrite */}
      <div>
        <label>Gastrite?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.gastrite"
            value="sim"
            checked={patientInfo.informacoesGerais.gastrite === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.gastrite"
            value="não"
            checked={patientInfo.informacoesGerais.gastrite === "não"}
            onChange={handleChange}
          />
          Não
        </div>
      </div>
      {/* 34 - Úlcera */}
      <div>
        <label>Úlcera?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.ulceras"
            value="sim"
            checked={patientInfo.informacoesGerais.ulceras === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.ulceras"
            value="não"
            checked={patientInfo.informacoesGerais.ulceras === "não"}
            onChange={handleChange}
          />
          Não
        </div>
      </div>
      {/* 35 - Hepatite */}
      <div>
        <label>Hepatite?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.hepatite"
            value="sim"
            checked={patientInfo.informacoesGerais.hepatite === "sim"}
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.hepatite"
            value="não"
            checked={patientInfo.informacoesGerais.hepatite === "não"}
            onChange={handleChange}
          />
          Não
        </div>
      </div>
      {/* 36 - Sangramento pós trauma ou cirurgia */}
      <div>
        <label>Sangramento pós trauma ou cirurgia?</label>
        <div>
          <input
            type="radio"
            name="informacoesGerais.sangramentoPosTraumaCirurgia"
            value="sim"
            checked={
              patientInfo.informacoesGerais.sangramentoPosTraumaCirurgia ===
              "sim"
            }
            onChange={handleChange}
          />
          Sim
          <input
            type="radio"
            name="informacoesGerais.sangramentoPosTraumaCirurgia"
            value="não"
            checked={
              patientInfo.informacoesGerais.sangramentoPosTraumaCirurgia ===
              "não"
            }
            onChange={handleChange}
          />
          Não
        </div>
        {patientInfo.informacoesGerais.sangramentoPosTraumaCirurgia ===
          "sim" && (
          <input
            type="text"
            name="informacoesGerais.sangramentoPosTraumaCirurgiaDetails"
            placeholder="Detalhes do sangramento"
            value={
              patientInfo.informacoesGerais
                .sangramentoPosTraumaCirurgiaDetails || ""
            }
            onChange={handleChange}
          />
        )}
      </div>
      {/* 37 - Outras doenças */}
      <div>
        <label>Outras doenças:</label>
        <input
          type="text"
          name="informacoesGerais.outrasDoencas"
          placeholder="Detalhes de outras doenças"
          value={patientInfo.informacoesGerais.outrasDoencas || ""}
          onChange={handleChange}
        />
      </div>

      {/* Continue similarly for all remaining questions, making sure to include the conditional rendering for additional details when "sim" is selected. This ensures users can provide more information where necessary. */}
      <button type="submit">Submit</button>
    </form>
  );
}

export default InformacoesGerais;
