// src/pages/PatientForm/TratamentoExecutado/index.jsx

import axios from "axios";
import { usePatientInfo } from "../../../context/PatientContext";
import "./styles.css"; // Assuming you've set up some basic styles

function TratamentoExecutado() {
  const { patientInfo, updatePatientInfo, addTreatment } = usePatientInfo();

  const handleChange = (event) => {
    const { name, value } = event.target;
    updatePatientInfo({
      tratamentoExecutadoForm: {
        ...patientInfo.tratamentoExecutadoForm,
        [name]: value,
      },
    });
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const patientId = patientInfo.patientId; // Ensure you have the patient ID from your context

  //   if (!patientId) {
  //     alert(
  //       "ID do paciente não encontrado. Por favor, selecione um paciente válido."
  //     );
  //     return;
  //   }

  //   axios
  //     .patch(
  //       `http://localhost:5005/patients/${patientId}/tratamento-executado`,
  //       {
  //         ...patientInfo.tratamentoExecutadoForm, // Assuming you're sending an updated form
  //       }
  //     )
  //     .then((response) => {
  //       console.log("Treatment updated successfully:", response.data);
  //       alert("Tratamento atualizado com sucesso!");
  //       addTreatment(patientInfo.tratamentoExecutadoForm); // If you're managing treatments in context, update there as well
  //     })
  //     .catch((error) => {
  //       console.error(
  //         "Failed to update treatment:",
  //         error.response ? error.response.data : error
  //       );
  //       alert("Falha ao atualizar o tratamento!");
  //     });
  // };
  const handleSubmit = (event) => {
    event.preventDefault();
    const patientId = patientInfo.patientId;

    console.log(
      "Sending this data to the server:",
      patientInfo.tratamentoExecutadoForm
    );

    axios
      .patch(
        `http://localhost:5005/patients/${patientId}/tratamento-executado`,
        patientInfo.tratamentoExecutadoForm
      )
      .then((response) => {
        console.log("Treatment updated successfully:", response.data);
        alert("Tratamento atualizado com sucesso!");
        addTreatment(patientInfo.tratamentoExecutadoForm);
      })
      .catch((error) => {
        console.error(
          "Failed to update treatment:",
          error.response ? error.response.data : error
        );
        alert("Falha ao atualizar o tratamento!");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="tratamento-executado-form">
      <h2>Tratamento Executado</h2>
      <label htmlFor="data">Data:</label>
      <input
        type="date"
        id="data"
        name="data"
        value={patientInfo.tratamentoExecutadoForm.data}
        onChange={handleChange}
      />

      <label htmlFor="procedimento">Procedimento:</label>
      <input
        type="text"
        id="procedimento"
        name="procedimento"
        placeholder="Descrição do procedimento"
        value={patientInfo.tratamentoExecutadoForm.procedimento}
        onChange={handleChange}
      />

      <label htmlFor="dentista">Dentista:</label>
      <input
        type="text"
        id="dentista"
        name="dentista"
        placeholder="Nome do dentista"
        value={patientInfo.tratamentoExecutadoForm.dentista}
        onChange={handleChange}
      />

      <label htmlFor="valor">Valor:</label>
      <input
        type="text"
        id="valor"
        name="valor"
        placeholder="Valor cobrado"
        value={patientInfo.tratamentoExecutadoForm.valor}
        onChange={handleChange}
      />

      <label htmlFor="notaFiscal">Nota Fiscal:</label>
      <input
        type="text"
        id="notaFiscal"
        name="notaFiscal"
        placeholder="Número da nota fiscal"
        value={patientInfo.tratamentoExecutadoForm.notaFiscal}
        onChange={handleChange}
      />

      <label htmlFor="formaDePagamento">Forma de Pagamento:</label>
      <input
        type="text"
        id="formaDePagamento"
        name="formaDePagamento"
        placeholder="Forma de pagamento"
        value={patientInfo.tratamentoExecutadoForm.formaDePagamento}
        onChange={handleChange}
      />

      <button type="submit">Salvar</button>
    </form>
  );
}

export default TratamentoExecutado;
