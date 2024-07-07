import React, { useEffect, useCallback } from "react";
import axios from "axios";
import { usePatientInfo } from "../../../context/PatientContext"; // Adjust the path as necessary
import { useParams } from "react-router-dom";
import "./styles.css"; // Ensure you have proper CSS for styling the form

function HistoricoBucal() {
  const { patientId } = useParams();
  const { patientInfo, setPatientInfo } = usePatientInfo(); // Use the context to manage state

  const saveData = useCallback(
    async (data) => {
      try {
        await axios.patch(
          `http://localhost:5005/patients/${patientId}/dental-history`,
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

    saveData(relevantInfo);
  }, [patientInfo.historicoBucal, saveData]);

  // Effect for autosaving at intervals
  // useEffect(() => {
  //   const autosaveInterval = setInterval(autosaveForm, 30000); // Autosave every 30 seconds
  //   return () => clearInterval(autosaveInterval); // Cleanup on unmount
  // }, [autosaveForm]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setPatientInfo((prev) => ({
      ...prev,
      historicoBucal: {
        ...prev.historicoBucal,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  return (
    <form className="historico-bucal-form">
      <div>
        <label>Frequência que vai no dentista:</label>
        <select
          name="frequenciaDentista"
          value={patientInfo.historicoBucal?.frequenciaDentista || ""}
          onChange={handleChange}
        >
          <option value="">Select...</option>
          <option value="semanalmente">Semanalmente</option>
          <option value="mensalmente">Mensalmente</option>
          <option value="anualmente">Anualmente</option>
          <option value="nunca vou">Nunca vou</option>
        </select>
      </div>

      <div>
        <label>Mastiga dos dois lados:</label>
        <input
          type="radio"
          name="mastigaLados"
          value="true" // Set the value to the string "true"
          checked={patientInfo.historicoBucal?.mastigaLados === "true"} // Compare against the string "true"
          onChange={() =>
            setPatientInfo((prev) => ({
              ...prev,
              historicoBucal: {
                ...prev.historicoBucal,
                mastigaLados: "true", // Set the state to the string "true"
              },
            }))
          }
        />{" "}
        Sim
        <input
          type="radio"
          name="mastigaLados"
          value="false" // Set the value to the string "false"
          checked={patientInfo.historicoBucal?.mastigaLados === "false"} // Compare against the string "false"
          onChange={() =>
            setPatientInfo((prev) => ({
              ...prev,
              historicoBucal: {
                ...prev.historicoBucal,
                mastigaLados: "false", // Set the state to the string "false"
              },
            }))
          }
        />{" "}
        Não
      </div>

      <div>
        <label>Costuma escovar os dentes quantas vezes?</label>
        <select
          name="escovaDentesFrequencia"
          value={patientInfo.historicoBucal?.escovaDentesFrequencia || ""}
          onChange={handleChange}
        >
          <option value="">Select...</option>
          <option value="1x">1x</option>
          <option value="2x">2x</option>
          <option value="3x">3x</option>
          <option value="4x">4x</option>
          <option value="nunca">Nunca</option>
        </select>
      </div>

      <div>
        <label>Costuma ranger os dentes:</label>
        <input
          type="radio"
          name="rangeDentes"
          value="true" // Set the value to the string "true"
          checked={patientInfo.historicoBucal?.rangeDentes === "true"} // Compare against the string "true"
          onChange={() =>
            setPatientInfo((prev) => ({
              ...prev,
              historicoBucal: {
                ...prev.historicoBucal,
                rangeDentes: "true", // Set the state to the string "true"
              },
            }))
          }
        />{" "}
        Sim
        <input
          type="radio"
          name="rangeDentes"
          value="false" // Set the value to the string "false"
          checked={patientInfo.historicoBucal?.rangeDentes === "false"} // Compare against the string "false"
          onChange={() =>
            setPatientInfo((prev) => ({
              ...prev,
              historicoBucal: {
                ...prev.historicoBucal,
                rangeDentes: "false", // Set the state to the string "false"
              },
            }))
          }
        />{" "}
        Não
      </div>

      <div>
        <label>Fica apreensivo durante tratamento odontológico:</label>
        <input
          type="radio"
          name="apreensivoTratamento"
          value="true" // Using string "true" as the value
          checked={patientInfo.historicoBucal?.apreensivoTratamento === "true"} // Compare against the string "true"
          onChange={() =>
            setPatientInfo((prev) => ({
              ...prev,
              historicoBucal: {
                ...prev.historicoBucal,
                apreensivoTratamento: "true", // Set the state to the string "true"
              },
            }))
          }
        />{" "}
        Sim
        <input
          type="radio"
          name="apreensivoTratamento"
          value="false" // Using string "false" as the value
          checked={patientInfo.historicoBucal?.apreensivoTratamento === "false"} // Compare against the string "false"
          onChange={() =>
            setPatientInfo((prev) => ({
              ...prev,
              historicoBucal: {
                ...prev.historicoBucal,
                apreensivoTratamento: "false", // Set the state to the string "false"
              },
            }))
          }
        />{" "}
        Não
      </div>

      <div>
        <label>Sua gengiva sangra:</label>
        <input
          type="radio"
          name="gengivaSangra"
          value="true" // Use string values directly
          checked={patientInfo.historicoBucal?.gengivaSangra === "true"} // Compare against the string "true"
          onChange={() =>
            setPatientInfo((prev) => ({
              ...prev,
              historicoBucal: {
                ...prev.historicoBucal,
                gengivaSangra: "true", // Set the state to the string "true"
              },
            }))
          }
        />{" "}
        Sim
        <input
          type="radio"
          name="gengivaSangra"
          value="false" // Use string values directly
          checked={patientInfo.historicoBucal?.gengivaSangra === "false"} // Compare against the string "false"
          onChange={() =>
            setPatientInfo((prev) => ({
              ...prev,
              historicoBucal: {
                ...prev.historicoBucal,
                gengivaSangra: "false", // Set the state to the string "false"
              },
            }))
          }
        />{" "}
        Não
      </div>

      <div>
        <label>Tive algum problema com tratamento odontológico:</label>
        <input
          type="radio"
          name="problemaTratamentoOdontologico"
          value="true" // Treat the value as a string
          checked={
            patientInfo.historicoBucal?.problemaTratamentoOdontologico ===
            "true"
          } // Check against the string "true"
          onChange={() =>
            setPatientInfo((prev) => ({
              ...prev,
              historicoBucal: {
                ...prev.historicoBucal,
                problemaTratamentoOdontologico: "true", // Set the state to the string "true"
              },
            }))
          }
        />{" "}
        Sim
        <input
          type="radio"
          name="problemaTratamentoOdontologico"
          value="false" // Treat the value as a string
          checked={
            patientInfo.historicoBucal?.problemaTratamentoOdontologico ===
            "false"
          } // Check against the string "false"
          onChange={() =>
            setPatientInfo((prev) => ({
              ...prev,
              historicoBucal: {
                ...prev.historicoBucal,
                problemaTratamentoOdontologico: "false", // Set the state to the string "false"
              },
            }))
          }
        />{" "}
        Não
        {patientInfo.historicoBucal?.problemaTratamentoOdontologico ===
          "true" && (
          <input
            type="text"
            name="problemaTratamentoOdontologicoDetails"
            placeholder="Detalhes do problema"
            value={
              patientInfo.historicoBucal
                ?.problemaTratamentoOdontologicoDetails || ""
            }
            onChange={handleChange}
          />
        )}
      </div>

      <div>
        <label>Usa fio dental:</label>
        <select
          name="usaFioDental"
          value={patientInfo.historicoBucal?.usaFioDental || ""}
          onChange={handleChange}
        >
          <option value="">Select...</option>
          <option value="sim">Sim</option>
          <option value="não">Não</option>
          <option value="as vezes">Às vezes</option>
        </select>
      </div>
      <div>
        <label>Seus dentes são sensíveis à mudança de temperatura:</label>
        <select
          name="dentesSensiveis"
          value={patientInfo.historicoBucal?.dentesSensiveis || ""}
          onChange={handleChange}
        >
          <option value="">Select...</option>
          <option value="sim">Sim</option>
          <option value="não">Não</option>
          <option value="as vezes">Às vezes</option>
        </select>
      </div>

      <div>
        <label>Usa algum método auxiliar:</label>
        <input
          type="radio"
          name="metodoAuxiliar"
          value="true" // Treat the value as a string
          checked={patientInfo.historicoBucal?.metodoAuxiliar === "true"} // Check against string "true"
          onChange={() =>
            setPatientInfo((prev) => ({
              ...prev,
              historicoBucal: {
                ...prev.historicoBucal,
                metodoAuxiliar: "true", // Set as string "true"
              },
            }))
          }
        />{" "}
        Sim
        <input
          type="radio"
          name="metodoAuxiliar"
          value="false" // Treat the value as a string
          checked={patientInfo.historicoBucal?.metodoAuxiliar === "false"} // Check against string "false"
          onChange={() =>
            setPatientInfo((prev) => ({
              ...prev,
              historicoBucal: {
                ...prev.historicoBucal,
                metodoAuxiliar: "false", // Set as string "false"
              },
            }))
          }
        />{" "}
        Não
      </div>

      <div>
        <label>Costuma morder a língua, lábio ou bochecha:</label>
        <select
          name="mordeLinguaLabioBochecha"
          value={patientInfo.historicoBucal?.mordeLinguaLabioBochecha || ""}
          onChange={handleChange}
        >
          <option value="">Select...</option>
          <option value="sim">Sim</option>
          <option value="não">Não</option>
          <option value="as vezes">Às vezes</option>
        </select>
      </div>
      <div>
        <label>Sente dor ao mastigar:</label>
        <select
          name="dorMastigar"
          value={patientInfo.historicoBucal?.dorMastigar || ""}
          onChange={handleChange}
        >
          <option value="">Select...</option>
          <option value="sim">Sim</option>
          <option value="não">Não</option>
          <option value="as vezes">Às vezes</option>
        </select>
      </div>

      <div>
        <label>Usa algum tipo de prótese ou implante:</label>
        <input
          type="radio"
          name="usaProteseImplante"
          value="true" // Value is "true" as a string
          checked={patientInfo.historicoBucal?.usaProteseImplante === "true"} // Compare with string "true"
          onChange={() =>
            setPatientInfo((prev) => ({
              ...prev,
              historicoBucal: {
                ...prev.historicoBucal,
                usaProteseImplante: "true", // Set as string "true"
              },
            }))
          }
        />{" "}
        Sim
        <input
          type="radio"
          name="usaProteseImplante"
          value="false" // Value is "false" as a string
          checked={patientInfo.historicoBucal?.usaProteseImplante === "false"} // Compare with string "false"
          onChange={() =>
            setPatientInfo((prev) => ({
              ...prev,
              historicoBucal: {
                ...prev.historicoBucal,
                usaProteseImplante: "false", // Set as string "false"
              },
            }))
          }
        />{" "}
        Não
      </div>

      <div>
        <label>Tem alguma ferida na boca:</label>
        <input
          type="radio"
          name="feridaBoca"
          value="true" // Set as string "true"
          checked={patientInfo.historicoBucal?.feridaBoca === "true"} // Compare with string "true"
          onChange={(e) =>
            setPatientInfo((prev) => ({
              ...prev,
              historicoBucal: {
                ...prev.historicoBucal,
                feridaBoca: e.target.value, // Set directly from event
              },
            }))
          }
        />{" "}
        Sim
        <input
          type="radio"
          name="feridaBoca"
          value="false" // Set as string "false"
          checked={patientInfo.historicoBucal?.feridaBoca === "false"} // Compare with string "false"
          onChange={(e) =>
            setPatientInfo((prev) => ({
              ...prev,
              historicoBucal: {
                ...prev.historicoBucal,
                feridaBoca: e.target.value, // Set directly from event
              },
            }))
          }
        />{" "}
        Não
        {patientInfo.historicoBucal?.feridaBoca === "true" && ( // Only show if "true"
          <input
            type="text"
            name="feridaBocaDetails"
            placeholder="Detalhes da ferida"
            value={patientInfo.historicoBucal?.feridaBocaDetails || ""}
            onChange={handleChange} // Ensure handleChange can handle this field appropriately
          />
        )}
      </div>

      <div>
        <label>Acha que seus dentes podem afetar sua saúde:</label>
        <input
          type="radio"
          name="dentesAfetamSaude"
          value="true"
          checked={patientInfo.historicoBucal?.dentesAfetamSaude === "true"}
          onChange={(e) =>
            setPatientInfo((prev) => ({
              ...prev,
              historicoBucal: {
                ...prev.historicoBucal,
                dentesAfetamSaude: e.target.value,
              },
            }))
          }
        />{" "}
        Sim
        <input
          type="radio"
          name="dentesAfetamSaude"
          value="false"
          checked={patientInfo.historicoBucal?.dentesAfetamSaude === "false"}
          onChange={(e) =>
            setPatientInfo((prev) => ({
              ...prev,
              historicoBucal: {
                ...prev.historicoBucal,
                dentesAfetamSaude: e.target.value,
              },
            }))
          }
        />{" "}
        Não
      </div>

      <div>
        <label>Costuma respirar pela boca:</label>
        <select
          name="respiraPelaBoca"
          value={patientInfo.historicoBucal?.respiraPelaBoca || ""}
          onChange={handleChange}
        >
          <option value="">Select...</option>
          <option value="sim">Sim</option>
          <option value="não">Não</option>
          <option value="as vezes">Às vezes</option>
        </select>
      </div>
    </form>
  );
}

export default HistoricoBucal;
