import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { usePatientInfo } from "../../../context/PatientContext";
import { Modal } from "@mui/material";
import "./styles.css"; // Assuming you've set up some basic styles

const API_URL = "http://localhost:5005";

function TratamentoExecutado() {
  const { patientInfo, updatePatientInfo } = usePatientInfo();
  const [fetchedTreatmentsFromDataBase, setFetchedTreatmentsFromDataBase] =
    useState([]);
  const [tratamentoExecutadoData, setTratamentoExecutado] = useState({
    data: "",
    procedimento: "",
    dentista: "",
    valor: "",
    notaFiscal: "",
    formaDePagamento: "",
  });
  const [patientDataOnEdit, setPatientDataOnEdit] = useState({
    data: "",
    procedimento: "",
    dentista: "",
    valor: "",
    notaFiscal: "",
    formaDePagamento: "",
  });
  const [editOn, setEditOn] = useState(null);
  const [patientIdOnEdit, setPatientIdOnEdit] = useState(null);
  const [treatmentIdOnEdit, setTreatmentIdOnEdit] = useState(null);
  const showEditModal = (patientId, tratamentoId) => {
    setTreatmentIdOnEdit(tratamentoId);
    setPatientIdOnEdit(patientId);
    setEditOn(true);
  };
  const closeEditModal = () => {
    setPatientDataOnEdit({
      data: "",
      procedimento: "",
      dentista: "",
      valor: "",
      notaFiscal: "",
      formaDePagamento: "",
    });
    setEditOn(false);
  };
  const handleChangepatientDataOnEdit = (e) => {
    const { name, value } = e.target;
    setPatientDataOnEdit({
      ...patientDataOnEdit,
      [name]: value,
    });
    console.log("name:", name);
    console.log("value:", value);
  };
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // handle change input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTratamentoExecutado({
      ...tratamentoExecutadoData,
      [name]: value,
    });
    console.log("name:", name);
    console.log("value:", value);
  };

  // fetch treatments
  const fetchTreatments = async () => {
    try {
      const result = await axios.get(
        `${API_URL}/patients/${
          patientInfo.patientId || patientInfo._id
        }/treatments`
      );

      console.log("result:", result);
      if (result.status === 200) {
        setFetchedTreatmentsFromDataBase(result.data.tratamentoExecutado);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  // render treatments
  const addTreatments = async (e) => {
    e.preventDefault();

    if (
      tratamentoExecutadoData.data &&
      tratamentoExecutadoData.dentista &&
      tratamentoExecutadoData.formaDePagamento &&
      tratamentoExecutadoData.notaFiscal &&
      tratamentoExecutadoData.procedimento &&
      tratamentoExecutadoData.valor
    ) {
      try {
        const result = await axios.post(
          `${API_URL}/patients/${
            patientInfo.patientId || patientInfo._id
          }/treatments`,
          {
            tratamentoExecutadoData,
          }
        );

        console.log("result:", result);
        fetchTreatments();
      } catch (error) {
        console.error("error:", error);
      }
    } else {
      window.alert("Todos os campos são obrigatórios.");
    }
  };
  // edit treatments
  const editTratamento = async (e) => {
    e.preventDefault();
    if (
      patientDataOnEdit.data &&
      patientDataOnEdit.dentista &&
      patientDataOnEdit.formaDePagamento &&
      patientDataOnEdit.notaFiscal &&
      patientDataOnEdit.procedimento &&
      patientDataOnEdit.valor
    ) {
      try {
        const result = await axios.patch(
          `${API_URL}/patients/${
            patientInfo.patientId || patientInfo._id
          }/${treatmentIdOnEdit}/tratamento-executado`,
          {
            patientDataOnEdit,
          }
        );

        console.log("result after patient update:", result);
        if (result.status === 200) {
          fetchTreatments();
          setUpdateSuccess(true);
        }
      } catch (error) {
        console.error("error:", error);
      }
    } else {
      window.alert("Todos os campos são obrigatórios.");
    }
  };
  useEffect(() => {
    let timeout;
    if (updateSuccess) {
      timeout = setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [updateSuccess]);

  // delete treatments
  const eliminarTratamento = async (treatmentIdOnDelete) => {
    try {
      const result = await axios.delete(
        `${API_URL}/patients/${
          patientInfo.patientId || patientInfo._id
        }/${treatmentIdOnDelete}/tratamento-executado`
      );
      console.log("result after patient update:", result);
      if (result.status === 200) {
        fetchTreatments();
        setDeleteSuccess(true);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };
  useEffect(() => {
    let timeout;
    if (deleteSuccess) {
      timeout = setTimeout(() => {
        setDeleteSuccess(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [deleteSuccess]);

  // submit treatments

  // prettier date render
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  const formatter = new Intl.DateTimeFormat("es-ES", options);

  return (
    <>
      <>
        <>
          <Modal
            className="z-9999 p-0 m-0"
            open={editOn}
            onClose={closeEditModal}
            sx={{
              "& > .MuiBackdrop-root": {
                opacity: "0.2 !important",
              },
            }}
          >
            <div
              className=""
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 600,
                maxHeight: "95vh",
                backgroundColor: "white",
                outlineStyle: "none",
                overflowY: "auto",
                padding: "40px",
              }}
            >
              <button
                onClick={closeEditModal}
                style={{
                  position: "absolute",
                  right: "0",
                  top: "0",
                  width: "58px",
                  height: "58px",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "20px",
                }}
              >
                <svg
                  width={18}
                  height={18}
                  style={{
                    inset: "0px",
                    width: "100%",
                    height: "100%",
                    fontSize: "16px",
                  }}
                  viewBox="0 0 18 18"
                  fill="rgb(0,0,0)"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.88006 9.00001L14.4401 13.56L13.5601 14.44L9.00006 9.88001L4.44006 14.44L3.56006 13.56L8.12006 9.00001L3.56006 4.44001L4.44006 3.56001L9.00006 8.12001L13.5601 3.56001L14.4401 4.44001L9.88006 9.00001Z"
                  ></path>
                </svg>
              </button>{" "}
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
                onSubmit={(e) => {
                  editTratamento(e);
                }}
                className="tratamento-executado-form"
              >
                <p>Paciente: {patientInfo.nome}</p>
                <p>Tratamento Id: {treatmentIdOnEdit}</p>

                <h2>Tratamento Executado</h2>
                <label htmlFor="data">Data:</label>
                <input
                  style={{
                    pointerEvents: updateSuccess && "none",
                  }}
                  type="date"
                  id="data"
                  name="data"
                  value={patientDataOnEdit?.data}
                  onChange={handleChangepatientDataOnEdit}
                />

                <label htmlFor="procedimento">Procedimento:</label>
                <input
                  type="text"
                  id="procedimento"
                  name="procedimento"
                  placeholder="Descrição do procedimento"
                  value={patientDataOnEdit?.procedimento}
                  onChange={handleChangepatientDataOnEdit}
                />

                <label htmlFor="dentista">Dentista:</label>
                <input
                  type="text"
                  id="dentista"
                  name="dentista"
                  placeholder="Nome do dentista"
                  value={patientDataOnEdit?.dentista}
                  onChange={handleChangepatientDataOnEdit}
                />

                <label htmlFor="valor">Valor:</label>
                <input
                  type="text"
                  id="valor"
                  name="valor"
                  placeholder="Valor cobrado"
                  value={patientDataOnEdit?.valor}
                  onChange={handleChangepatientDataOnEdit}
                />

                <label htmlFor="notaFiscal">Nota Fiscal:</label>
                <input
                  type="text"
                  id="notaFiscal"
                  name="notaFiscal"
                  placeholder="Número da nota fiscal"
                  value={patientDataOnEdit?.notaFiscal}
                  onChange={handleChangepatientDataOnEdit}
                />

                <label htmlFor="formaDePagamento">Forma de Pagamento:</label>
                <input
                  type="text"
                  id="formaDePagamento"
                  name="formaDePagamento"
                  placeholder="Forma de pagamento"
                  value={patientDataOnEdit?.formaDePagamento}
                  onChange={handleChangepatientDataOnEdit}
                />

                <button
                  style={{
                    pointerEvents: updateSuccess && "none",
                  }}
                  type="submit"
                  className="pointer"
                >
                  Edit
                </button>
              </form>
            </div>
          </Modal>
        </>
      </>
      <div>
        <form onSubmit={addTreatments} className="tratamento-executado-form">
          <h2>Tratamento Executado</h2>
          <label htmlFor="data">Data:</label>
          <input
            type="date"
            id="data"
            name="data"
            value={tratamentoExecutadoData?.data}
            onChange={handleChange}
          />

          <label htmlFor="procedimento">Procedimento:</label>
          <input
            type="text"
            id="procedimento"
            name="procedimento"
            placeholder="Descrição do procedimento"
            value={tratamentoExecutadoData?.procedimento}
            onChange={handleChange}
          />

          <label htmlFor="dentista">Dentista:</label>
          <input
            type="text"
            id="dentista"
            name="dentista"
            placeholder="Nome do dentista"
            value={tratamentoExecutadoData?.dentista}
            onChange={handleChange}
          />

          <label htmlFor="valor">Valor:</label>
          <input
            type="text"
            id="valor"
            name="valor"
            placeholder="Valor cobrado"
            value={tratamentoExecutadoData?.valor}
            onChange={handleChange}
          />

          <label htmlFor="notaFiscal">Nota Fiscal:</label>
          <input
            type="text"
            id="notaFiscal"
            name="notaFiscal"
            placeholder="Número da nota fiscal"
            value={tratamentoExecutadoData?.notaFiscal}
            onChange={handleChange}
          />

          <label htmlFor="formaDePagamento">Forma de Pagamento:</label>
          <input
            type="text"
            id="formaDePagamento"
            name="formaDePagamento"
            placeholder="Forma de pagamento"
            value={tratamentoExecutadoData?.formaDePagamento}
            onChange={handleChange}
          />

          <button type="submit">Salvar</button>
        </form>
        <div className="saved-treatments">
          {fetchedTreatmentsFromDataBase?.length === 0 ? (
            <p>¡El paciente aún no tiene registros de tratamiento!</p>
          ) : (
            fetchedTreatmentsFromDataBase
              .slice()
              .sort((a, b) => new Date(b.data) - new Date(a.data))
              .map((treatment, index) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                  key={index}
                  className="treatment-entry"
                >
                  <p>Paciente Nome: {patientInfo.nome}</p>
                  <p>Paciente Id: {patientInfo._id || patientInfo.patientId}</p>
                  <p>Tratamento Id: {treatment._id}</p>
                  <p>
                    Data: {formatter.format(new Date(treatment.data))} -
                    Procedimiento: {treatment.procedimiento} - Dentista:{" "}
                    {treatment.dentista} - Valor: {treatment.valor} - Nota
                    Fiscal: {treatment.notaFiscal} - Forma de Pago:{" "}
                    {treatment.formaDePagamento}
                  </p>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      showEditModal(
                        patientInfo._id || patientInfo.patientId,
                        treatment._id
                      );
                    }}
                  >
                    Editar
                  </button>
                  <button
                    style={{
                      margin: "0px 8px",
                    }}
                    className="eliminar-btn"
                    onClick={() => {
                      eliminarTratamento(treatment._id);
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              ))
          )}
        </div>
        {updateSuccess && (
          <div className="update-success-alert">
            <p>¡Información del paciente actualizada!</p>
          </div>
        )}
        {deleteSuccess && (
          <div className="delete-success-alert">
            <p>¡El tratamiento ha sido eliminado exitosamente!</p>
          </div>
        )}
      </div>
    </>
  );
}

export default TratamentoExecutado;
