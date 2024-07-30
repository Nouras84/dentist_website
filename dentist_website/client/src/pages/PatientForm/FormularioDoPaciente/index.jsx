// Aykut version withyellow underlines
// import React, { useCallback, useEffect, useState } from "react";
// import axios from "axios";
// import { usePatientInfo } from "../../../context/PatientContext";
// import { useParams } from "react-router-dom";
// import "./styles.css";

// function FormularioDoPaciente() {
//   const { patientId } = useParams();
//   const {
//     patientInfo,
//     setPatientInfo,
//     afterClickingTheAddPatientButton,
//     setAfterClickingTheAddPatientButton,
//   } = usePatientInfo();

//   console.log("patientId:", patientId);
//   console.log(
//     "we are coming from add patient button:",
//     afterClickingTheAddPatientButton
//   );
//   console.log("patient info:", patientInfo);
//   const fetchPatient = async () => {
//     try {
//       const result = await axios.get(
//         `http://localhost:5005/patients/${patientId || patientInfo._id}`,
//         {},
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       if (!afterClickingTheAddPatientButton) {
//         setPatientInfo(result.data);
//       }
//     } catch (error) {
//       console.error("Failed to save data", error);
//     }
//   };

//   useEffect(() => {
//     if (patientId) {
//       fetchPatient();
//     }
//   }, [patientId]);

//   const saveData = useCallback(
//     async (data) => {
//       const formData = new FormData();
//       const relevantFields = [
//         "nome",
//         "dataConsulta",
//         "cpf",
//         "dataNascimento",
//         "genero",
//         "racaCor",
//         "estadoCivil",
//         "plano",
//         "profissao",
//         "escolaridade",
//         "endereco.rua",
//         "endereco.numero",
//         "endereco.bairro",
//         "endereco.cidade",
//         "endereco.estado",
//         "contato.whatsapp",
//         "contato.instagram",
//         "contato.telefone",
//         "contato.email",
//       ];

//       relevantFields.forEach((field) => {
//         const value = field.split(".").reduce((o, key) => o[key], data); // Access nested properties
//         if (value != null) {
//           formData.append(field, value);
//         }
//       });

//       if (data.profilePhoto) {
//         formData.append("profilePhoto", data.profilePhoto);
//       }

//       try {
//         const result = await axios.patch(
//           `http://localhost:5005/patients/${
//             patientId || patientInfo._id
//           }/update-patient`,
//           formData,
//           { headers: { "Content-Type": "multipart/form-data" } }
//         );
//         console.log("result for edit user:", result);
//       } catch (error) {
//         console.error("Failed to save data", error);
//       }
//     },
//     [patientId]
//   );

//   const autosaveForm = useCallback(() => {
//     console.log("Autosaving data...");
//     const relevantInfo = {
//       nome: patientInfo?.nome,
//       cpf: patientInfo?.cpf,
//       dataNascimento: patientInfo?.dataNascimento,
//       genero: patientInfo?.genero,
//       racaCor: patientInfo?.racaCor,
//       estadoCivil: patientInfo?.estadoCivil,
//       plano: patientInfo?.plano,
//       profissao: patientInfo?.profissao,
//       escolaridade: patientInfo?.escolaridade,
//       dataConsulta: patientInfo?.dataConsulta,
//       endereco: {
//         rua: patientInfo?.endereco?.rua,
//         numero: patientInfo?.endereco?.numero,
//         bairro: patientInfo?.endereco?.bairro,
//         cidade: patientInfo?.endereco?.cidade,
//         estado: patientInfo?.endereco?.estado,
//       },
//       contato: {
//         whatsapp: patientInfo?.contato?.whatsapp,
//         instagram: patientInfo?.contato?.instagram,
//         telefone: patientInfo?.contato?.telefone,
//         email: patientInfo?.contato?.email,
//       },
//       profilePhoto: patientInfo?.profilePhoto,
//     };

//     saveData(relevantInfo);
//   }, [patientInfo, saveData]);

//   // // Effect for autosaving at intervals
//   // useEffect(() => {
//   //   const autosaveInterval = setInterval(autosaveForm, 30000); // Autosave every 30 seconds
//   //   return () => clearInterval(autosaveInterval); // Cleanup on unmount
//   // }, [autosaveForm]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     const keys = name.split(".");
//     if (keys.length > 1) {
//       // Handle nested objects such as "endereco.rua"
//       setPatientInfo((prevState) => ({
//         ...prevState,
//         [keys[0]]: {
//           ...prevState[keys[0]],
//           [keys[1]]: value,
//         },
//       }));
//     } else {
//       // Handle top-level properties like "nome"
//       setPatientInfo((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     }
//   };

//   const handleFileChange = async (event) => {
//     if (event.target.files.length > 0) {
//       const file = event.target.files[0];
//       const formData = new FormData();
//       formData.append("profilePhoto", file);

//       try {
//         const result = await axios.post(
//           `http://localhost:5005/patients/${
//             patientInfo.patientId || patientInfo._id
//           }/upload-profile-picture`,
//           formData,
//           { headers: { "Content-Type": "multipart/form-data" } }
//         );

//         console.log("result:", result);
//         if (result.status === 200) {
//           setPatientInfo((prev) => ({
//             ...prev,
//             profilePhoto: result.data.patient.profilePhoto,
//           }));
//         }
//       } catch (error) {
//         console.error("Failed to save data", error);

//         throw new Error("Failed to save data. Please try again.");
//       }
//     }
//   };

//   console.log("patient info after changing the profile pic:", patientInfo);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Check if the name field is empty
//     if (!patientInfo.nome || patientInfo.nome.trim() === "") {
//       alert("The name field is required.");
//       return; // Stop the form submission
//     }
//     autosaveForm(); // Trigger autosave on submit
//   };

//   console.log("patient info:", patientInfo);

//   return (
//     <form onSubmit={handleSubmit} className="patient-form">
//       <fieldset>
//         <legend>Detalhes do Paciente</legend>

//         <div>
//           <label>Carregar imagem do paciente:</label>
//           <input type="file" name="profilePhoto" onChange={handleFileChange} />
//           <div
//             style={{
//               fontSize: "13px",
//               lineHeight: "16px",
//             }}
//           >
//             {patientInfo?.profilePhoto?.path && (
//               <div>
//                 Hay un archivo seleccionado :
//                 <img
//                   width={50}
//                   height={50}
//                   src={`http://localhost:5005/${patientInfo?.profilePhoto?.path}`}
//                   alt=""
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//         <div>
//           <label>Nome*:</label>
//           <input
//             type="text"
//             name="nome"
//             placeholder="Digite o nome"
//             value={patientInfo.nome}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Data de Consulta:</label>
//           <input
//             type="date"
//             name="dataConsulta"
//             value={patientInfo.dataConsulta}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>CPF:</label>
//           <input
//             type="text"
//             name="cpf"
//             placeholder="Enter CPF"
//             value={patientInfo.cpf}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Data de Nascimento:</label>
//           <input
//             type="date"
//             name="dataNascimento"
//             value={patientInfo.dataNascimento}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Gênero:</label>
//           <select
//             name="genero"
//             value={patientInfo.genero}
//             onChange={handleChange}
//           >
//             <option value="">Select...</option>
//             {/* Add all options for gender */}
//             <option value="masculino">Masculino</option>
//             <option value="feminino">Feminino</option>
//             <option value="transgênero">Transgênero</option>
//             <option value="gênero neutro">Gênero Neutro</option>
//             <option value="não-binário">Não-binário</option>
//             <option value="agênero">Agênero</option>
//             <option value="pangênero">Pangênero</option>
//             <option value="genderqueer">Genderqueer</option>
//             <option value="two-spirit">Two-spirit</option>
//             <option value="terceiro gênero">Terceiro Gênero</option>
//             <option value="cisgênero">Cisgênero</option>
//             <option value="fluido">Fluido</option>
//             <option value="bigênero">Bigênero</option>
//             <option value="transexual">Transexual</option>
//             <option value="poligênero">Poligênero</option>
//           </select>
//         </div>
//         <div>
//           <label>Raça/Cor:</label>
//           <input
//             type="text"
//             name="racaCor"
//             placeholder="Enter race/color"
//             value={patientInfo.racaCor}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Estado Civil:</label>
//           <select
//             name="estadoCivil"
//             value={patientInfo.estadoCivil}
//             onChange={handleChange}
//           >
//             <option value="">Select...</option>
//             <option value="solteiro">Solteiro</option>
//             <option value="casado">Casado</option>
//             <option value="separado">Separado</option>
//             <option value="divorciado">Divorciado</option>
//             <option value="viúvo">Viúvo</option>
//           </select>
//         </div>
//         <div>
//           <label>Plano:</label>
//           <input
//             type="text"
//             name="plano"
//             placeholder="Enter plan"
//             value={patientInfo.plano}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Profissão/Ocupação:</label>
//           <input
//             type="text"
//             name="profissao"
//             placeholder="Enter profession/occupation"
//             value={patientInfo.profissao}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Escolaridade:</label>
//           <select
//             name="escolaridade"
//             value={patientInfo.escolaridade}
//             onChange={handleChange}
//           >
//             <option value="">Select...</option>
//             <option value="educação infantil">Educação Infantil</option>
//             <option value="fundamental">Fundamental</option>
//             <option value="médio">Médio</option>
//             <option value="superior">Superior (Graduação)</option>
//             <option value="pós-graduação">Pós-Graduação</option>
//             <option value="mestrado">Mestrado</option>
//             <option value="doutorado">Doutorado</option>
//           </select>
//         </div>
//       </fieldset>

//       <fieldset>
//         <legend>Contato do Paciente</legend>

//         <div>
//           <label>Rua:</label>
//           <input
//             type="text"
//             name="endereco.rua"
//             placeholder="Enter street"
//             value={patientInfo?.endereco?.rua}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label>Número:</label>
//           <input
//             type="text"
//             name="endereco.numero"
//             placeholder="Enter number"
//             value={patientInfo?.endereco?.numero}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Bairro:</label>
//           <input
//             type="text"
//             name="endereco.bairro"
//             placeholder="Enter neighborhood"
//             value={patientInfo?.endereco?.bairro}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Cidade:</label>
//           <input
//             type="text"
//             name="endereco.cidade"
//             placeholder="Enter city"
//             value={patientInfo?.endereco?.cidade}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Estado:</label>
//           <input
//             type="text"
//             name="endereco.estado"
//             placeholder="Enter state"
//             value={patientInfo?.endereco?.estado}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>WhatsApp:</label>
//           <input
//             type="text"
//             name="contato.whatsapp"
//             placeholder="Enter WhatsApp number"
//             value={patientInfo?.contato?.whatsapp}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Instagram:</label>
//           <input
//             type="text"
//             name="contato.instagram"
//             placeholder="Enter Instagram handle"
//             value={patientInfo?.contato?.instagram}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Telefone:</label>
//           <input
//             type="text"
//             name="contato.telefone"
//             placeholder="Enter phone number"
//             value={patientInfo?.contato?.telefone}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="contato.email"
//             placeholder="Enter email"
//             value={patientInfo?.contato?.email}
//             onChange={handleChange}
//           />
//         </div>
//       </fieldset>
//       {/* <button type="submit">Submit</button> */}
//     </form>
//   );
// }

// export default FormularioDoPaciente;

import React, { useCallback, useEffect } from "react";
import axios from "axios";
import { usePatientInfo } from "../../../context/PatientContext";
import { useParams } from "react-router-dom";
import "./styles.css";

// Helper function to format date strings to yyyy-MM-dd format
function formatDateForInput(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
}

function FormularioDoPaciente() {
  const { patientId } = useParams();
  const { patientInfo, setPatientInfo, afterClickingTheAddPatientButton } =
    usePatientInfo();

  console.log("patientId:", patientId);
  console.log(
    "we are coming from add patient button:",
    afterClickingTheAddPatientButton
  );
  console.log("patient info:", patientInfo);

  const fetchPatient = useCallback(async () => {
    try {
      const result = await axios.get(
        `http://localhost:5005/patients/${patientId || patientInfo._id}`,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (!afterClickingTheAddPatientButton) {
        setPatientInfo(result.data);
      }
    } catch (error) {
      console.error("Failed to save data", error);
    }
  }, [
    afterClickingTheAddPatientButton,
    patientId,
    patientInfo._id,
    setPatientInfo,
  ]);

  useEffect(() => {
    if (patientId) {
      fetchPatient();
    }
  }, [fetchPatient, patientId]);

  const saveData = useCallback(
    async (data) => {
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
        const value = field.split(".").reduce((o, key) => o[key], data); // Access nested properties
        if (value != null) {
          formData.append(field, value);
        }
      });

      if (data.profilePhoto) {
        formData.append("profilePhoto", data.profilePhoto);
      }

      try {
        const result = await axios.patch(
          `http://localhost:5005/patients/${
            patientId || patientInfo._id
          }/update-patient`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("result for edit user:", result);
      } catch (error) {
        console.error("Failed to save data", error);
      }
    },
    [patientId, patientInfo._id]
  );

  const autosaveForm = useCallback(() => {
    console.log("Autosaving data...");
    const relevantInfo = {
      nome: patientInfo?.nome,
      cpf: patientInfo?.cpf,
      dataNascimento: patientInfo?.dataNascimento,
      genero: patientInfo?.genero,
      racaCor: patientInfo?.racaCor,
      estadoCivil: patientInfo?.estadoCivil,
      plano: patientInfo?.plano,
      profissao: patientInfo?.profissao,
      escolaridade: patientInfo?.escolaridade,
      dataConsulta: patientInfo?.dataConsulta,
      endereco: {
        rua: patientInfo?.endereco?.rua,
        numero: patientInfo?.endereco?.numero,
        bairro: patientInfo?.endereco?.bairro,
        cidade: patientInfo?.endereco?.cidade,
        estado: patientInfo?.endereco?.estado,
      },
      contato: {
        whatsapp: patientInfo?.contato?.whatsapp,
        instagram: patientInfo?.contato?.instagram,
        telefone: patientInfo?.contato?.telefone,
        email: patientInfo?.contato?.email,
      },
      profilePhoto: patientInfo?.profilePhoto,
    };

    saveData(relevantInfo);
  }, [patientInfo, saveData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const keys = name.split(".");
    if (keys.length > 1) {
      // Handle nested objects such as "endereco.rua"
      setPatientInfo((prevState) => ({
        ...prevState,
        [keys[0]]: {
          ...prevState[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      // Handle top-level properties like "nome"
      setPatientInfo((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFileChange = async (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("profilePhoto", file);

      try {
        const result = await axios.post(
          `http://localhost:5005/patients/${
            patientInfo.patientId || patientInfo._id
          }/upload-profile-picture`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        console.log("result:", result);
        if (result.status === 200) {
          setPatientInfo((prev) => ({
            ...prev,
            profilePhoto: result.data.patient.profilePhoto,
          }));
        }
      } catch (error) {
        console.error("Failed to save data", error);

        throw new Error("Failed to save data. Please try again.");
      }
    }
  };

  console.log("patient info after changing the profile pic:", patientInfo);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if the name field is empty
    if (!patientInfo.nome || patientInfo.nome.trim() === "") {
      alert("The name field is required.");
      return; // Stop the form submission
    }
    autosaveForm(); // Trigger autosave on submit
  };

  console.log("patient info:", patientInfo);

  return (
    <form onSubmit={handleSubmit} className="patient-form">
      <fieldset>
        <legend>Detalhes do Paciente</legend>

        <div>
          <label>Carregar imagem do paciente:</label>
          <input type="file" name="profilePhoto" onChange={handleFileChange} />
          <div
            style={{
              fontSize: "13px",
              lineHeight: "16px",
            }}
          >
            {patientInfo?.profilePhoto?.path && (
              <div>
                Hay un archivo seleccionado :
                <img
                  width={50}
                  height={50}
                  src={`http://localhost:5005/${patientInfo?.profilePhoto?.path}`}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
        <div>
          <label>Nome*:</label>
          <input
            type="text"
            name="nome"
            placeholder="Digite o nome"
            value={patientInfo.nome}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Data de Consulta:</label>
          <input
            type="date"
            name="dataConsulta"
            value={formatDateForInput(patientInfo.dataConsulta)}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>CPF:</label>
          <input
            type="text"
            name="cpf"
            placeholder="Enter CPF"
            value={patientInfo.cpf}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Data de Nascimento:</label>
          <input
            type="date"
            name="dataNascimento"
            value={formatDateForInput(patientInfo.dataNascimento)}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Gênero:</label>
          <select
            name="genero"
            value={patientInfo.genero}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            {/* Add all options for gender */}
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="transgênero">Transgênero</option>
            <option value="gênero neutro">Gênero Neutro</option>
            <option value="não-binário">Não-binário</option>
            <option value="agênero">Agênero</option>
            <option value="pangênero">Pangênero</option>
            <option value="genderqueer">Genderqueer</option>
            <option value="two-spirit">Two-spirit</option>
            <option value="terceiro gênero">Terceiro Gênero</option>
            <option value="cisgênero">Cisgênero</option>
            <option value="fluido">Fluido</option>
            <option value="bigênero">Bigênero</option>
            <option value="transexual">Transexual</option>
            <option value="poligênero">Poligênero</option>
          </select>
        </div>
        <div>
          <label>Raça/Cor:</label>
          <input
            type="text"
            name="racaCor"
            placeholder="Enter race/color"
            value={patientInfo.racaCor}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Estado Civil:</label>
          <select
            name="estadoCivil"
            value={patientInfo.estadoCivil}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            <option value="solteiro">Solteiro</option>
            <option value="casado">Casado</option>
            <option value="separado">Separado</option>
            <option value="divorciado">Divorciado</option>
            <option value="viúvo">Viúvo</option>
          </select>
        </div>
        <div>
          <label>Plano:</label>
          <input
            type="text"
            name="plano"
            placeholder="Enter plan"
            value={patientInfo.plano}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Profissão/Ocupação:</label>
          <input
            type="text"
            name="profissao"
            placeholder="Enter profession/occupation"
            value={patientInfo.profissao}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Escolaridade:</label>
          <select
            name="escolaridade"
            value={patientInfo.escolaridade}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            <option value="educação infantil">Educação Infantil</option>
            <option value="fundamental">Fundamental</option>
            <option value="médio">Médio</option>
            <option value="superior">Superior (Graduação)</option>
            <option value="pós-graduação">Pós-Graduação</option>
            <option value="mestrado">Mestrado</option>
            <option value="doutorado">Doutorado</option>
          </select>
        </div>
      </fieldset>

      <fieldset>
        <legend>Contato do Paciente</legend>

        <div>
          <label>Rua:</label>
          <input
            type="text"
            name="endereco.rua"
            placeholder="Enter street"
            value={patientInfo?.endereco?.rua}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Número:</label>
          <input
            type="text"
            name="endereco.numero"
            placeholder="Enter number"
            value={patientInfo?.endereco?.numero}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Bairro:</label>
          <input
            type="text"
            name="endereco.bairro"
            placeholder="Enter neighborhood"
            value={patientInfo?.endereco?.bairro}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Cidade:</label>
          <input
            type="text"
            name="endereco.cidade"
            placeholder="Enter city"
            value={patientInfo?.endereco?.cidade}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Estado:</label>
          <input
            type="text"
            name="endereco.estado"
            placeholder="Enter state"
            value={patientInfo?.endereco?.estado}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>WhatsApp:</label>
          <input
            type="text"
            name="contato.whatsapp"
            placeholder="Enter WhatsApp number"
            value={patientInfo?.contato?.whatsapp}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Instagram:</label>
          <input
            type="text"
            name="contato.instagram"
            placeholder="Enter Instagram handle"
            value={patientInfo?.contato?.instagram}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Telefone:</label>
          <input
            type="text"
            name="contato.telefone"
            placeholder="Enter phone number"
            value={patientInfo?.contato?.telefone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="contato.email"
            placeholder="Enter email"
            value={patientInfo?.contato?.email}
            onChange={handleChange}
          />
        </div>
      </fieldset>
      {/* <button type="submit">Submit</button> */}
    </form>
  );
}

export default FormularioDoPaciente;
