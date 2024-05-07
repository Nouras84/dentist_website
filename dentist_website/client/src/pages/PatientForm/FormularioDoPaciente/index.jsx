// Importing necessary hooks and context
import React from "react";
import axios from "axios";
import { usePatientInfo } from "../../../context/PatientContext"; // Import the context hook
import "./styles.css";

function FormularioDoPaciente() {
  // Using the context to manage the patient info state
  const { patientInfo, setPatientInfo, setPatientId } = usePatientInfo();

  const handleChange = (event) => {
    const { name, value } = event.target;
    const keys = name.split(".");
    if (keys.length === 2) {
      setPatientInfo((prevState) => ({
        ...prevState,
        [keys[0]]: {
          ...prevState[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setPatientInfo((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setPatientInfo((prevState) => ({
        ...prevState,
        profilePhoto: file,
      }));
    }
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (!patientInfo.nome) {
  //     alert("Por favor, insira um nome."); // Ensuring the name field is not empty
  //     return;
  //   }

  //   // Check if patient name already exists
  //   try {
  //     const nameCheckResponse = await axios.get(
  //       `http://localhost:5005/patients/check-name?name=${encodeURIComponent(
  //         patientInfo.nome
  //       )}`
  //     );
  //     if (nameCheckResponse.data.exists) {
  //       alert(
  //         "O nome do paciente já existe. Por favor, use um nome diferente."
  //       );
  //       return;
  //     }
  //   } catch (error) {
  //     console.error("Erro ao verificar o nome do paciente", error);
  //     alert("Erro ao verificar o nome do paciente.");
  //     return;
  //   }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!patientInfo.nome) {
      alert("Por favor, insira um nome."); // Ensuring the name field is not empty
      return;
    }

    // Check if patient name already exists
    try {
      const nameCheckResponse = await axios.get(
        `http://localhost:5005/patients/check-name?name=${encodeURIComponent(
          patientInfo.nome
        )}`
      );
      if (nameCheckResponse.data.exists) {
        alert(
          "O nome do paciente já existe. Por favor, use um nome diferente."
        );
        return;
      }
    } catch (error) {
      console.error("Erro ao verificar o nome do paciente", error);
      alert("Erro ao verificar o nome do paciente.");
      return;
    }

    //   // Proceed with submitting form data if name does not exist
    //   const formData = new FormData();
    //   Object.keys(patientInfo).forEach((key) => {
    //     if (key === "profilePhoto" && patientInfo[key]) {
    //       formData.append(key, patientInfo[key]);
    //     } else if (
    //       typeof patientInfo[key] === "object" &&
    //       patientInfo[key] !== null
    //     ) {
    //       Object.keys(patientInfo[key]).forEach((subKey) => {
    //         formData.append(`${key}.${subKey}`, patientInfo[key][subKey]);
    //       });
    //     } else {
    //       formData.append(key, patientInfo[key]);
    //     }
    //   });

    //   try {
    //     const response = await axios.post(
    //       "http://localhost:5005/patients/add-patient",
    //       formData,
    //       {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       }
    //     );
    //     alert("Paciente adicionado com sucesso!");
    //     console.log("Response Data:", response.data);
    //     // Optionally reset form or redirect user
    //   } catch (error) {
    //     console.error("Falha ao adicionar novo paciente", error);
    //     alert("Falha ao adicionar novo paciente!");
    //   }
    // };
    // Proceed with submitting form data if name does not exist
    const formData = new FormData();
    Object.keys(patientInfo).forEach((key) => {
      if (key === "profilePhoto" && patientInfo[key]) {
        formData.append(key, patientInfo[key]);
      } else if (
        typeof patientInfo[key] === "object" &&
        patientInfo[key] !== null
      ) {
        Object.keys(patientInfo[key]).forEach((subKey) => {
          formData.append(`${key}.${subKey}`, patientInfo[key][subKey]);
        });
      } else {
        formData.append(key, patientInfo[key]);
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:5005/patients/add-patient",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data && response.data.patientId) {
        setPatientId(response.data.patientId);
        console.log("Patient ID received and set:", response.data.patientId);
      } else {
        console.log("Patient ID not received in response");
      }
      alert("Paciente adicionado com sucesso!");
      console.log("Response Data:", response.data);
      // Optionally reset form or redirect user
    } catch (error) {
      console.error("Falha ao adicionar novo paciente", error);
      alert("Falha ao adicionar novo paciente!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="patient-form">
      <fieldset>
        <legend>Detalhes do Paciente</legend>

        <div>
          <label>Carregar imagem do paciente:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            placeholder="
            Digite o nome"
            value={patientInfo.nome}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Data de Consulta:</label>
          <input
            type="date"
            name="dataConsulta"
            value={patientInfo.dataConsulta}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Idade:</label>
          <input
            type="number"
            name="idade"
            placeholder="Enter age"
            value={patientInfo.idade}
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
            value={patientInfo.dataNascimento}
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
            value={patientInfo.endereco.rua}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Número:</label>
          <input
            type="text"
            name="endereco.numero"
            placeholder="Enter number"
            value={patientInfo.endereco.numero}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Bairro:</label>
          <input
            type="text"
            name="endereco.bairro"
            placeholder="Enter neighborhood"
            value={patientInfo.endereco.bairro}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Cidade:</label>
          <input
            type="text"
            name="endereco.cidade"
            placeholder="Enter city"
            value={patientInfo.endereco.cidade}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Estado:</label>
          <input
            type="text"
            name="endereco.estado"
            placeholder="Enter state"
            value={patientInfo.endereco.estado}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>WhatsApp:</label>
          <input
            type="text"
            name="contato.whatsapp"
            placeholder="Enter WhatsApp number"
            value={patientInfo.contato.whatsapp}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Instagram:</label>
          <input
            type="text"
            name="contato.instagram"
            placeholder="Enter Instagram handle"
            value={patientInfo.contato.instagram}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Telefone:</label>
          <input
            type="text"
            name="contato.telefone"
            placeholder="Enter phone number"
            value={patientInfo.contato.telefone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="contato.email"
            placeholder="Enter email"
            value={patientInfo.contato.email}
            onChange={handleChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <legend>Preferências do Paciente </legend>

        <div>
          <label>Interesse(s):</label>
          <input
            type="text"
            name="interesse"
            placeholder="Enter interests"
            value={patientInfo.interesse}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Musicas:</label>
          <input
            type="text"
            name="musicas"
            placeholder="Enter favorite music"
            value={patientInfo.musicas}
            onChange={handleChange}
          />
        </div>
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  );
}

export default FormularioDoPaciente;
