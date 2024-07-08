// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "./styles.css"; // Ensure the CSS file is correctly linked

// function capitalizeFirstLetter(string) {
//   if (!string) return "";
//   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
// }

// function capitalizeFirstLetterOfWords(string) {
//   if (!string) return "";
//   return string.replace(/\b\w/g, (char) => char.toUpperCase());
// }

// function PatientProfile() {
//   const { id } = useParams();
//   const [patient, setPatient] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5005/patients/${id}`
//         );
//         setPatient(response.data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching patient data:", error);
//         setError("Failed to fetch patient data");
//         setIsLoading(false);
//       }
//     };

//     fetchPatientData();
//   }, [id]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!patient) {
//     return <div>No patient data available.</div>;
//   }
//   const sideNames = {
//     V: "Vestibular",
//     M: "Mesial",
//     D: "Distal",
//     L: "Lingual",
//     P: "Palatina",
//     O: "Oclusal",
//   };

//   return (
//     <div>
//       <h1>Perfil do Paciente - Informações Detalhadas</h1>
//       {patient.profilePhoto && (
//         <div>
//           <h2>Foto de Perfil</h2>
//           <img
//             src={`http://localhost:5005/${patient.profilePhoto.path}`}
//             alt="Profile"
//           />
//         </div>
//       )}
//       <div>
//         <h2>Detalhes Gerais</h2>
//         <p>Nome: {capitalizeFirstLetterOfWords(patient.nome)}</p>
//         <p>Data da Consulta: {capitalizeFirstLetter(patient.dataConsulta)}</p>
//         <p>CPF: {capitalizeFirstLetter(patient.cpf)}</p>
//         <p>
//           Data de Nascimento: {capitalizeFirstLetter(patient.dataNascimento)}
//         </p>
//         <p>Gênero: {capitalizeFirstLetter(patient.genero)}</p>
//         <p>Raça/Cor: {capitalizeFirstLetter(patient.racaCor)}</p>
//         <p>Estado Civil: {capitalizeFirstLetter(patient.estadoCivil)}</p>
//         <p>Plano: {capitalizeFirstLetter(patient.plano)}</p>
//         <p>Profissão/Ocupação: {capitalizeFirstLetter(patient.profissao)}</p>
//         <p>Escolaridade: {capitalizeFirstLetter(patient.escolaridade)}</p>
//       </div>
//       <div>
//         <h2>Informações de Contato</h2>
//         <p>Rua: {capitalizeFirstLetter(patient.endereco?.rua)}</p>
//         <p>Número: {capitalizeFirstLetter(patient.endereco?.numero)}</p>
//         <p>Bairro: {capitalizeFirstLetter(patient.endereco?.bairro)}</p>
//         <p>Cidade: {capitalizeFirstLetter(patient.endereco?.cidade)}</p>
//         <p>Estado: {capitalizeFirstLetter(patient.endereco?.estado)}</p>
//         <p>WhatsApp: {capitalizeFirstLetter(patient.contato?.whatsapp)}</p>
//         <p>Instagram: {patient.contato?.instagram}</p>
//         <p>Telefone: {capitalizeFirstLetter(patient.contato?.telefone)}</p>
//         <p>Email: {patient.contato?.email}</p>
//       </div>
//       <div>
//         <h2>Histórico Bucal</h2>
//         <p>
//           Frequência que vai ao dentista:{" "}
//           {capitalizeFirstLetter(patient.historicoBucal?.frequenciaDentista)}
//         </p>
//         <p>
//           Mastiga dos dois lados:{" "}
//           {patient.historicoBucal?.mastigaLados === "true"
//             ? "Sim"
//             : patient.historicoBucal?.mastigaLados === "false"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Frequência de escovação dos dentes:{" "}
//           {capitalizeFirstLetter(
//             patient.historicoBucal?.escovaDentesFrequencia
//           )}
//         </p>
//         <p>
//           Costuma ranger os dentes:{" "}
//           {patient.historicoBucal?.rangeDentes === "true"
//             ? "Sim"
//             : patient.historicoBucal?.rangeDentes === "false"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Fica apreensivo durante tratamento odontológico:{" "}
//           {patient.historicoBucal?.apreensivoTratamento === "true"
//             ? "Sim"
//             : patient.historicoBucal?.apreensivoTratamento === "false"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Sua gengiva sangra:{" "}
//           {patient.historicoBucal?.gengivaSangra === "true"
//             ? "Sim"
//             : patient.historicoBucal?.gengivaSangra === "false"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Tive algum problema com tratamento odontológico:{" "}
//           {patient.historicoBucal?.problemaTratamentoOdontologico === "true"
//             ? "Sim"
//             : patient.historicoBucal?.problemaTratamentoOdontologico === "false"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.historicoBucal?.problemaTratamentoOdontologico === "true" && (
//           <p>
//             Detalhes do problema:{" "}
//             {capitalizeFirstLetter(
//               patient.historicoBucal?.problemaTratamentoOdontologicoDetails
//             )}
//           </p>
//         )}
//         <p>
//           Usa fio dental:{" "}
//           {capitalizeFirstLetter(patient.historicoBucal?.usaFioDental)}
//         </p>
//         <p>
//           Dentes sensíveis:{" "}
//           {capitalizeFirstLetter(patient.historicoBucal?.dentesSensiveis)}
//         </p>
//         <p>
//           Usa método auxiliar:{" "}
//           {patient.historicoBucal?.metodoAuxiliar === "true"
//             ? "Sim"
//             : patient.historicoBucal?.metodoAuxiliar === "false"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Costuma morder a língua, lábio ou bochecha:{" "}
//           {capitalizeFirstLetter(
//             patient.historicoBucal?.mordeLinguaLabioBochecha
//           )}
//         </p>
//         <p>
//           Sente dor ao mastigar:{" "}
//           {capitalizeFirstLetter(patient.historicoBucal?.dorMastigar)}
//         </p>
//         <p>
//           Usa prótese ou implante:{" "}
//           {patient.historicoBucal?.usaProteseImplante === "true"
//             ? "Sim"
//             : patient.historicoBucal?.usaProteseImplante === "false"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.historicoBucal?.usaProteseImplante === "true" && (
//           <p>
//             Detalhes da prótese/implante:{" "}
//             {capitalizeFirstLetter(
//               patient.historicoBucal?.usaProteseImplanteDetails
//             )}
//           </p>
//         )}
//         <p>
//           Tem alguma ferida na boca:{" "}
//           {patient.historicoBucal?.feridaBoca === "true"
//             ? "Sim"
//             : patient.historicoBucal?.feridaBoca === "false"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.historicoBucal?.feridaBoca === "true" && (
//           <p>
//             Detalhes da ferida:{" "}
//             {capitalizeFirstLetter(patient.historicoBucal?.feridaBocaDetails)}
//           </p>
//         )}
//         <p>
//           Os dentes afetam a saúde:{" "}
//           {patient.historicoBucal?.dentesAfetamSaude === "true"
//             ? "Sim"
//             : patient.historicoBucal?.dentesAfetamSaude === "false"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Costuma respirar pela boca:{" "}
//           {capitalizeFirstLetter(patient.historicoBucal?.respiraPelaBoca)}
//         </p>
//       </div>
//       <div>
//         <h2>Informações Gerais</h2>
//         <p>
//           Está sob tratamento médico:{" "}
//           {patient.informacoesGerais?.tratamentoMedico === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.tratamentoMedico === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.tratamentoMedico === "sim" && (
//           <p>
//             Detalhes do tratamento médico:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.tratamentoMedicoDetails
//             )}
//           </p>
//         )}
//         <p>
//           Já apresentou alguma alergia medicamentosa:{" "}
//           {patient.informacoesGerais?.alergiaMedicamentosa === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.alergiaMedicamentosa === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.alergiaMedicamentosa === "sim" && (
//           <p>
//             Detalhes da alergia medicamentosa:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.alergiaMedicamentosaDetails
//             )}
//           </p>
//         )}
//         <p>
//           Considera-se nervoso(a):{" "}
//           {patient.informacoesGerais?.consideraNervoso === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.consideraNervoso === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Já apresentou alguma alergia a algum outro agente:{" "}
//           {patient.informacoesGerais?.alergiaOutros === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.alergiaOutros === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.alergiaOutros === "sim" && (
//           <p>
//             Detalhes da alergia a outros agentes:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.alergiaOutrosDetails
//             )}
//           </p>
//         )}
//         <p>
//           Considera-se ansioso(a):{" "}
//           {patient.informacoesGerais?.consideraAnsioso === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.consideraAnsioso === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Foi hospitalizado? Cirurgia:{" "}
//           {patient.informacoesGerais?.hospitalizadoCirurgia === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.hospitalizadoCirurgia === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.hospitalizadoCirurgia === "sim" && (
//           <p>
//             Detalhes da hospitalização/cirurgia:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.hospitalizadoCirurgiaDetails
//             )}
//           </p>
//         )}
//         <p>
//           Vomita frequentemente:{" "}
//           {patient.informacoesGerais?.vomitaFrequentemente === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.vomitaFrequentemente === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Está grávida:{" "}
//           {patient.informacoesGerais?.gravida === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.gravida === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.gravida === "sim" && (
//           <p>
//             Detalhes da gravidez:{" "}
//             {capitalizeFirstLetter(patient.informacoesGerais?.gravidaDetails)}
//           </p>
//         )}
//         <p>
//           Está amamentando:{" "}
//           {patient.informacoesGerais?.amamentando === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.amamentando === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Sente falta de ar ou cansaço a esforços leves:{" "}
//           {patient.informacoesGerais?.faltaArCansaco === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.faltaArCansaco === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.faltaArCansaco === "sim" && (
//           <p>
//             Detalhes da falta de ar ou cansaço:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.faltaArCansacoDetails
//             )}
//           </p>
//         )}
//         <p>
//           Sente dores no peito:{" "}
//           {patient.informacoesGerais?.doresPeito === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.doresPeito === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Alteração de pressão arterial:{" "}
//           {patient.informacoesGerais?.alteracaoPressao === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.alteracaoPressao === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Histórico de infarto:{" "}
//           {patient.informacoesGerais?.historicoInfarto === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.historicoInfarto === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.historicoInfarto === "sim" && (
//           <p>
//             Detalhes do infarto:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.historicoInfartoDetails
//             )}
//           </p>
//         )}
//         <p>
//           Histórico de AVC:{" "}
//           {patient.informacoesGerais?.historicoAVC === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.historicoAVC === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.historicoAVC === "sim" && (
//           <p>
//             Detalhes do AVC:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.historicoAVCDetails
//             )}
//           </p>
//         )}
//         <p>
//           Histórico de asma:{" "}
//           {patient.informacoesGerais?.historicoAsma === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.historicoAsma === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.historicoAsma === "sim" && (
//           <p>
//             Detalhes da asma:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.historicoAsmaDetails
//             )}
//           </p>
//         )}
//         <p>
//           Histórico de diabetes:{" "}
//           {patient.informacoesGerais?.historicoDiabetes === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.historicoDiabetes === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.historicoDiabetes === "sim" && (
//           <p>
//             Detalhes do diabetes:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.historicoDiabetesDetails
//             )}
//           </p>
//         )}
//         <p>
//           Tuberculose:{" "}
//           {patient.informacoesGerais?.tuberculose === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.tuberculose === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.tuberculose === "sim" && (
//           <p>
//             Detalhes da tuberculose:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.tuberculoseDetails
//             )}
//           </p>
//         )}
//         <p>
//           Sente-se com sede a maior parte do tempo:{" "}
//           {patient.informacoesGerais?.sedeConstante === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.sedeConstante === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Urina mais de 6 vezes por noite:{" "}
//           {patient.informacoesGerais?.urinaNoite === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.urinaNoite === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Possui alteração hormonal:{" "}
//           {patient.informacoesGerais?.alteracaoHormonal === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.alteracaoHormonal === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.alteracaoHormonal === "sim" && (
//           <p>
//             Detalhes da alteração hormonal:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.alteracaoHormonalDetails
//             )}
//           </p>
//         )}
//         <p>
//           Desmaio, distrimia:{" "}
//           {patient.informacoesGerais?.desmaioDistrimia === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.desmaioDistrimia === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.desmaioDistrimia === "sim" && (
//           <p>
//             Detalhes de desmaio ou distrimia:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.desmaioDistrimiaDetails
//             )}
//           </p>
//         )}
//         <p>
//           Possui hipotireoidismo ou hipertireoidismo:{" "}
//           {patient.informacoesGerais?.hipotireoidismoHipertireoidismo === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.hipotireoidismoHipertireoidismo ===
//               "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.hipotireoidismoHipertireoidismo ===
//           "sim" && (
//           <p>
//             Detalhes do hipotireoidismo ou hipertireoidismo:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.hipotireoidismoHipertireoidismoDetails
//             )}
//           </p>
//         )}
//         <p>
//           Tem dificuldade de mastigar:{" "}
//           {patient.informacoesGerais?.dificuldadeMastigar === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.dificuldadeMastigar === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           TPM? Menopausa:{" "}
//           {patient.informacoesGerais?.tpmMenopausa === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.tpmMenopausa === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.tpmMenopausa === "sim" && (
//           <p>
//             Detalhes de TPM ou Menopausa:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.tpmMenopausaDetails
//             )}
//           </p>
//         )}
//         <p>
//           Cálculo ou insuficiência renal:{" "}
//           {patient.informacoesGerais?.calculoRenal === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.calculoRenal === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.calculoRenal === "sim" && (
//           <p>
//             Detalhes de cálculo ou insuficiência renal:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.calculoRenalDetails
//             )}
//           </p>
//         )}
//         <p>
//           Reposição hormonal:{" "}
//           {patient.informacoesGerais?.reposicaoHormonal === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.reposicaoHormonal === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Osteoporose:{" "}
//           {patient.informacoesGerais?.osteoporose === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.osteoporose === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Anemia:{" "}
//           {patient.informacoesGerais?.anemia === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.anemia === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Leucemia:{" "}
//           {patient.informacoesGerais?.leucemia === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.leucemia === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Hemofilia:{" "}
//           {patient.informacoesGerais?.hemofilia === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.hemofilia === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Ingere bebida alcoólica:{" "}
//           {patient.informacoesGerais?.ingestaoAlcoolica === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.ingestaoAlcoolica === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Tabagista:{" "}
//           {patient.informacoesGerais?.tabagista === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.tabagista === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Gastrite:{" "}
//           {patient.informacoesGerais?.gastrite === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.gastrite === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Úlcera:{" "}
//           {patient.informacoesGerais?.ulceras === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.ulceras === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Hepatite:{" "}
//           {patient.informacoesGerais?.hepatite === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.hepatite === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Sangramento pós trauma ou cirurgia:{" "}
//           {patient.informacoesGerais?.sangramentoPosTraumaCirurgia === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.sangramentoPosTraumaCirurgia === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.sangramentoPosTraumaCirurgia === "sim" && (
//           <p>
//             Detalhes do sangramento:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.sangramentoPosTraumaCirurgiaDetails
//             )}
//           </p>
//         )}
//         <p>
//           Outras doenças:{" "}
//           {capitalizeFirstLetter(patient.informacoesGerais?.outrasDoencas)}
//         </p>
//       </div>

//       <div>
//         <h2>Procedimentos Dentários</h2>
//         {patient.procedimentos.length > 0 ? (
//           patient.procedimentos.map((proc, index) => (
//             <div key={index}>
//               <p>Dente: {proc.dente}</p>
//               <p>
//                 Lados:{" "}
//                 {proc.sides
//                   .map((side) => sideNames[side.side] || side.side)
//                   .join(", ")}
//               </p>
//               <p>Procedimento: {proc.procedimento}</p>
//               <p>Operação: {proc.operation}</p>
//               <p>Situação: {proc.situacao}</p>
//             </div>
//           ))
//         ) : (
//           <p>Nenhum procedimento registrado.</p>
//         )}
//       </div>

//       <div>
//         <h2>Tratamentos Executados</h2>
//         {patient.tratamentosExecutados.length > 0 ? (
//           patient.tratamentosExecutados.map((treatment, index) => (
//             <div key={index}>
//               <p>
//                 Data:{" "}
//                 {new Date(treatment.data).toLocaleDateString("pt-BR", {
//                   timeZone: "UTC",
//                 })}
//               </p>
//               <p>Procedimento: {treatment.procedimento}</p>
//               <p>Dentista: {treatment.dentista}</p>
//               <p>Valor: {treatment.valor?.$numberDecimal || treatment.valor}</p>
//               <p>Nota Fiscal: {treatment.notaFiscal}</p>
//               <p>Forma de Pagamento: {treatment.formaDePagamento}</p>
//             </div>
//           ))
//         ) : (
//           <p>Nenhum tratamento registrado.</p>
//         )}
//       </div>

//       <div>
//         <h2>Fotografias</h2>
//         {patient.fotografias && patient.fotografias.length > 0 ? (
//           patient.fotografias.map((foto, index) => (
//             <div key={index}>
//               <img
//                 src={`http://localhost:5005/${foto.path}`}
//                 alt={`Foto ${index + 1}`}
//               />
//               <p>Descrição: {foto.description}</p>
//             </div>
//           ))
//         ) : (
//           <p>Nenhuma fotografia registrada.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default PatientProfile; (the code work perfectly without edit button)

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./styles.css"; // Ensure the CSS file is correctly linked

// function capitalizeFirstLetter(string) {
//   if (!string) return "";
//   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
// }

// function capitalizeFirstLetterOfWords(string) {
//   if (!string) return "";
//   return string.replace(/\b\w/g, (char) => char.toUpperCase());
// }

// function PatientProfile() {
//   const { id } = useParams();
//   const navigate = useNavigate(); // Initialize useNavigate
//   const [patient, setPatient] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5005/patients/${id}`
//         );
//         setPatient(response.data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching patient data:", error);
//         setError("Failed to fetch patient data");
//         setIsLoading(false);
//       }
//     };

//     fetchPatientData();
//   }, [id]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!patient) {
//     return <div>No patient data available.</div>;
//   }
//   const sideNames = {
//     V: "Vestibular",
//     M: "Mesial",
//     D: "Distal",
//     L: "Lingual",
//     P: "Palatina",
//     O: "Oclusal",
//   };

//   const handleEdit = () => {
//     navigate(`/add-patient/${id}`); // Navigate to the patient form page for editing
//   };

//   return (
//     <div>
//       <h1>Perfil do Paciente - Informações Detalhadas</h1>
//       <button onClick={handleEdit} className="edit-button">
//         Editar
//       </button>
//       {patient.profilePhoto && (
//         <div>
//           <h2>Foto de Perfil</h2>
//           <img
//             src={`http://localhost:5005/${patient.profilePhoto.path}`}
//             alt="Profile"
//           />
//         </div>
//       )}
//       <div>
//         <h2>Detalhes Gerais</h2>
//         <p>Nome: {capitalizeFirstLetterOfWords(patient.nome)}</p>
//         <p>Data da Consulta: {capitalizeFirstLetter(patient.dataConsulta)}</p>
//         <p>CPF: {capitalizeFirstLetter(patient.cpf)}</p>
//         <p>
//           Data de Nascimento: {capitalizeFirstLetter(patient.dataNascimento)}
//         </p>
//         <p>Gênero: {capitalizeFirstLetter(patient.genero)}</p>
//         <p>Raça/Cor: {capitalizeFirstLetter(patient.racaCor)}</p>
//         <p>Estado Civil: {capitalizeFirstLetter(patient.estadoCivil)}</p>
//         <p>Plano: {capitalizeFirstLetter(patient.plano)}</p>
//         <p>Profissão/Ocupação: {capitalizeFirstLetter(patient.profissao)}</p>
//         <p>Escolaridade: {capitalizeFirstLetter(patient.escolaridade)}</p>
//       </div>
//       <div>
//         <h2>Informações de Contato</h2>
//         <p>Rua: {capitalizeFirstLetter(patient.endereco?.rua)}</p>
//         <p>Número: {capitalizeFirstLetter(patient.endereco?.numero)}</p>
//         <p>Bairro: {capitalizeFirstLetter(patient.endereco?.bairro)}</p>
//         <p>Cidade: {capitalizeFirstLetter(patient.endereco?.cidade)}</p>
//         <p>Estado: {capitalizeFirstLetter(patient.endereco?.estado)}</p>
//         <p>WhatsApp: {capitalizeFirstLetter(patient.contato?.whatsapp)}</p>
//         <p>Instagram: {patient.contato?.instagram}</p>
//         <p>Telefone: {capitalizeFirstLetter(patient.contato?.telefone)}</p>
//         <p>Email: {patient.contato?.email}</p>
//       </div>
//       <div>
//         <h2>Histórico Bucal</h2>
//         <p>
//           Frequência que vai ao dentista:{" "}
//           {capitalizeFirstLetter(patient.historicoBucal?.frequenciaDentista)}
//         </p>
//         <p>
//           Mastiga dos dois lados:{" "}
//           {patient.historicoBucal?.mastigaLados === "true"
//             ? "Sim"
//             : patient.historicoBucal?.mastigaLados === "false"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Frequência de escovação dos dentes:{" "}
//           {capitalizeFirstLetter(
//             patient.historicoBucal?.escovaDentesFrequencia
//           )}
//         </p>
//         <p>
//           Costuma ranger os dentes:{" "}
//           {patient.historicoBucal?.rangeDentes === "true"
//             ? "Sim"
//             : patient.historicoBucal?.rangeDentes === "false"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Fica apreensivo durante tratamento odontológico:{" "}
//           {patient.historicoBucal?.apreensivoTratamento === "true"
//             ? "Sim"
//             : patient.historicoBucal?.apreensivoTratamento === "false"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Sua gengiva sangra:{" "}
//           {patient.historicoBucal?.gengivaSangra === "true"
//             ? "Sim"
//             : patient.historicoBucal?.gengivaSangra === "false"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Tive algum problema com tratamento odontológico:{" "}
//           {patient.historicoBucal?.problemaTratamentoOdontologico === "true"
//             ? "Sim"
//             : patient.historicoBucal?.problemaTratamentoOdontologico === "false"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.historicoBucal?.problemaTratamentoOdontologico === "true" && (
//           <p>
//             Detalhes do problema:{" "}
//             {capitalizeFirstLetter(
//               patient.historicoBucal?.problemaTratamentoOdontologicoDetails
//             )}
//           </p>
//         )}
//         <p>
//           Usa fio dental:{" "}
//           {capitalizeFirstLetter(patient.historicoBucal?.usaFioDental)}
//         </p>
//         <p>
//           Dentes sensíveis:{" "}
//           {capitalizeFirstLetter(patient.historicoBucal?.dentesSensiveis)}
//         </p>
//         <p>
//           Usa método auxiliar:{" "}
//           {patient.historicoBucal?.metodoAuxiliar === "true"
//             ? "Sim"
//             : patient.historicoBucal?.metodoAuxiliar === "false"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Costuma morder a língua, lábio ou bochecha:{" "}
//           {capitalizeFirstLetter(
//             patient.historicoBucal?.mordeLinguaLabioBochecha
//           )}
//         </p>
//         <p>
//           Sente dor ao mastigar:{" "}
//           {capitalizeFirstLetter(patient.historicoBucal?.dorMastigar)}
//         </p>
//         <p>
//           Usa prótese ou implante:{" "}
//           {patient.historicoBucal?.usaProteseImplante === "true"
//             ? "Sim"
//             : patient.historicoBucal?.usaProteseImplante === "false"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.historicoBucal?.usaProteseImplante === "true" && (
//           <p>
//             Detalhes da prótese/implante:{" "}
//             {capitalizeFirstLetter(
//               patient.historicoBucal?.usaProteseImplanteDetails
//             )}
//           </p>
//         )}
//         <p>
//           Tem alguma ferida na boca:{" "}
//           {patient.historicoBucal?.feridaBoca === "true"
//             ? "Sim"
//             : patient.historicoBucal?.feridaBoca === "false"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.historicoBucal?.feridaBoca === "true" && (
//           <p>
//             Detalhes da ferida:{" "}
//             {capitalizeFirstLetter(patient.historicoBucal?.feridaBocaDetails)}
//           </p>
//         )}
//         <p>
//           Os dentes afetam a saúde:{" "}
//           {patient.historicoBucal?.dentesAfetamSaude === "true"
//             ? "Sim"
//             : patient.historicoBucal?.dentesAfetamSaude === "false"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Costuma respirar pela boca:{" "}
//           {capitalizeFirstLetter(patient.historicoBucal?.respiraPelaBoca)}
//         </p>
//       </div>
//       <div>
//         <h2>Informações Gerais</h2>
//         <p>
//           Está sob tratamento médico:{" "}
//           {patient.informacoesGerais?.tratamentoMedico === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.tratamentoMedico === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.tratamentoMedico === "sim" && (
//           <p>
//             Detalhes do tratamento médico:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.tratamentoMedicoDetails
//             )}
//           </p>
//         )}
//         <p>
//           Já apresentou alguma alergia medicamentosa:{" "}
//           {patient.informacoesGerais?.alergiaMedicamentosa === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.alergiaMedicamentosa === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.alergiaMedicamentosa === "sim" && (
//           <p>
//             Detalhes da alergia medicamentosa:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.alergiaMedicamentosaDetails
//             )}
//           </p>
//         )}
//         <p>
//           Considera-se nervoso(a):{" "}
//           {patient.informacoesGerais?.consideraNervoso === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.consideraNervoso === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Já apresentou alguma alergia a algum outro agente:{" "}
//           {patient.informacoesGerais?.alergiaOutros === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.alergiaOutros === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.alergiaOutros === "sim" && (
//           <p>
//             Detalhes da alergia a outros agentes:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.alergiaOutrosDetails
//             )}
//           </p>
//         )}
//         <p>
//           Considera-se ansioso(a):{" "}
//           {patient.informacoesGerais?.consideraAnsioso === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.consideraAnsioso === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Foi hospitalizado? Cirurgia:{" "}
//           {patient.informacoesGerais?.hospitalizadoCirurgia === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.hospitalizadoCirurgia === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.hospitalizadoCirurgia === "sim" && (
//           <p>
//             Detalhes da hospitalização/cirurgia:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.hospitalizadoCirurgiaDetails
//             )}
//           </p>
//         )}
//         <p>
//           Vomita frequentemente:{" "}
//           {patient.informacoesGerais?.vomitaFrequentemente === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.vomitaFrequentemente === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Está grávida:{" "}
//           {patient.informacoesGerais?.gravida === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.gravida === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.gravida === "sim" && (
//           <p>
//             Detalhes da gravidez:{" "}
//             {capitalizeFirstLetter(patient.informacoesGerais?.gravidaDetails)}
//           </p>
//         )}
//         <p>
//           Está amamentando:{" "}
//           {patient.informacoesGerais?.amamentando === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.amamentando === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Sente falta de ar ou cansaço a esforços leves:{" "}
//           {patient.informacoesGerais?.faltaArCansaco === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.faltaArCansaco === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.faltaArCansaco === "sim" && (
//           <p>
//             Detalhes da falta de ar ou cansaço:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.faltaArCansacoDetails
//             )}
//           </p>
//         )}
//         <p>
//           Sente dores no peito:{" "}
//           {patient.informacoesGerais?.doresPeito === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.doresPeito === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Alteração de pressão arterial:{" "}
//           {patient.informacoesGerais?.alteracaoPressao === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.alteracaoPressao === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Histórico de infarto:{" "}
//           {patient.informacoesGerais?.historicoInfarto === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.historicoInfarto === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.historicoInfarto === "sim" && (
//           <p>
//             Detalhes do infarto:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.historicoInfartoDetails
//             )}
//           </p>
//         )}
//         <p>
//           Histórico de AVC:{" "}
//           {patient.informacoesGerais?.historicoAVC === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.historicoAVC === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.historicoAVC === "sim" && (
//           <p>
//             Detalhes do AVC:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.historicoAVCDetails
//             )}
//           </p>
//         )}
//         <p>
//           Histórico de asma:{" "}
//           {patient.informacoesGerais?.historicoAsma === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.historicoAsma === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.historicoAsma === "sim" && (
//           <p>
//             Detalhes da asma:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.historicoAsmaDetails
//             )}
//           </p>
//         )}
//         <p>
//           Histórico de diabetes:{" "}
//           {patient.informacoesGerais?.historicoDiabetes === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.historicoDiabetes === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.historicoDiabetes === "sim" && (
//           <p>
//             Detalhes do diabetes:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.historicoDiabetesDetails
//             )}
//           </p>
//         )}
//         <p>
//           Tuberculose:{" "}
//           {patient.informacoesGerais?.tuberculose === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.tuberculose === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.tuberculose === "sim" && (
//           <p>
//             Detalhes da tuberculose:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.tuberculoseDetails
//             )}
//           </p>
//         )}
//         <p>
//           Sente-se com sede a maior parte do tempo:{" "}
//           {patient.informacoesGerais?.sedeConstante === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.sedeConstante === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Urina mais de 6 vezes por noite:{" "}
//           {patient.informacoesGerais?.urinaNoite === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.urinaNoite === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Possui alteração hormonal:{" "}
//           {patient.informacoesGerais?.alteracaoHormonal === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.alteracaoHormonal === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.alteracaoHormonal === "sim" && (
//           <p>
//             Detalhes da alteração hormonal:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.alteracaoHormonalDetails
//             )}
//           </p>
//         )}
//         <p>
//           Desmaio, distrimia:{" "}
//           {patient.informacoesGerais?.desmaioDistrimia === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.desmaioDistrimia === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.desmaioDistrimia === "sim" && (
//           <p>
//             Detalhes de desmaio ou distrimia:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.desmaioDistrimiaDetails
//             )}
//           </p>
//         )}
//         <p>
//           Possui hipotireoidismo ou hipertireoidismo:{" "}
//           {patient.informacoesGerais?.hipotireoidismoHipertireoidismo === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.hipotireoidismoHipertireoidismo ===
//               "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.hipotireoidismoHipertireoidismo ===
//           "sim" && (
//           <p>
//             Detalhes do hipotireoidismo ou hipertireoidismo:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.hipotireoidismoHipertireoidismoDetails
//             )}
//           </p>
//         )}
//         <p>
//           Tem dificuldade de mastigar:{" "}
//           {patient.informacoesGerais?.dificuldadeMastigar === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.dificuldadeMastigar === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           TPM? Menopausa:{" "}
//           {patient.informacoesGerais?.tpmMenopausa === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.tpmMenopausa === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.tpmMenopausa === "sim" && (
//           <p>
//             Detalhes de TPM ou Menopausa:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.tpmMenopausaDetails
//             )}
//           </p>
//         )}
//         <p>
//           Cálculo ou insuficiência renal:{" "}
//           {patient.informacoesGerais?.calculoRenal === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.calculoRenal === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.calculoRenal === "sim" && (
//           <p>
//             Detalhes de cálculo ou insuficiência renal:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.calculoRenalDetails
//             )}
//           </p>
//         )}
//         <p>
//           Reposição hormonal:{" "}
//           {patient.informacoesGerais?.reposicaoHormonal === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.reposicaoHormonal === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Osteoporose:{" "}
//           {patient.informacoesGerais?.osteoporose === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.osteoporose === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Anemia:{" "}
//           {patient.informacoesGerais?.anemia === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.anemia === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Leucemia:{" "}
//           {patient.informacoesGerais?.leucemia === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.leucemia === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Hemofilia:{" "}
//           {patient.informacoesGerais?.hemofilia === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.hemofilia === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Ingere bebida alcoólica:{" "}
//           {patient.informacoesGerais?.ingestaoAlcoolica === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.ingestaoAlcoolica === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Tabagista:{" "}
//           {patient.informacoesGerais?.tabagista === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.tabagista === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Gastrite:{" "}
//           {patient.informacoesGerais?.gastrite === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.gastrite === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Úlcera:{" "}
//           {patient.informacoesGerais?.ulceras === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.ulceras === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Hepatite:{" "}
//           {patient.informacoesGerais?.hepatite === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.hepatite === "não"
//             ? "Não"
//             : ""}
//         </p>
//         <p>
//           Sangramento pós trauma ou cirurgia:{" "}
//           {patient.informacoesGerais?.sangramentoPosTraumaCirurgia === "sim"
//             ? "Sim"
//             : patient.informacoesGerais?.sangramentoPosTraumaCirurgia === "não"
//             ? "Não"
//             : ""}
//         </p>
//         {patient.informacoesGerais?.sangramentoPosTraumaCirurgia === "sim" && (
//           <p>
//             Detalhes do sangramento:{" "}
//             {capitalizeFirstLetter(
//               patient.informacoesGerais?.sangramentoPosTraumaCirurgiaDetails
//             )}
//           </p>
//         )}
//         <p>
//           Outras doenças:{" "}
//           {capitalizeFirstLetter(patient.informacoesGerais?.outrasDoencas)}
//         </p>
//       </div>

//       <div>
//         <h2>Procedimentos Dentários</h2>
//         {patient.procedimentos.length > 0 ? (
//           patient.procedimentos.map((proc, index) => (
//             <div key={index}>
//               <p>Dente: {proc.dente}</p>
//               <p>
//                 Lados:{" "}
//                 {proc.sides
//                   .map((side) => sideNames[side.side] || side.side)
//                   .join(", ")}
//               </p>
//               <p>Procedimento: {proc.procedimento}</p>
//               <p>Operação: {proc.operation}</p>
//               <p>Situação: {proc.situacao}</p>
//             </div>
//           ))
//         ) : (
//           <p>Nenhum procedimento registrado.</p>
//         )}
//       </div>

//       <div>
//         <h2>Tratamentos Executados</h2>
//         {patient.tratamentosExecutados.length > 0 ? (
//           patient.tratamentosExecutados.map((treatment, index) => (
//             <div key={index}>
//               <p>
//                 Data:{" "}
//                 {new Date(treatment.data).toLocaleDateString("pt-BR", {
//                   timeZone: "UTC",
//                 })}
//               </p>
//               <p>Procedimento: {treatment.procedimento}</p>
//               <p>Dentista: {treatment.dentista}</p>
//               <p>Valor: {treatment.valor?.$numberDecimal || treatment.valor}</p>
//               <p>Nota Fiscal: {treatment.notaFiscal}</p>
//               <p>Forma de Pagamento: {treatment.formaDePagamento}</p>
//             </div>
//           ))
//         ) : (
//           <p>Nenhum tratamento registrado.</p>
//         )}
//       </div>

//       <div>
//         <h2>Fotografias</h2>
//         {patient.fotografias && patient.fotografias.length > 0 ? (
//           patient.fotografias.map((foto, index) => (
//             <div key={index}>
//               <img
//                 src={`http://localhost:5005/${foto.path}`}
//                 alt={`Foto ${index + 1}`}
//               />
//               <p>Descrição: {foto.description}</p>
//             </div>
//           ))
//         ) : (
//           <p>Nenhuma fotografia registrada.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default PatientProfile;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css"; // Ensure the CSS file is correctly linked
import { usePatientInfo } from "../../context/PatientContext";

function capitalizeFirstLetter(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function capitalizeFirstLetterOfWords(string) {
  if (!string) return "";
  return string.replace(/\b\w/g, (char) => char.toUpperCase());
}

function PatientProfile() {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // State for modal
  const { patientInfo } = usePatientInfo();

  console.log("after exit patientInfo state:", patientInfo);
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5005/patients/${id || patientInfo._id}`
        );
        setPatient(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching patient data:", error);
        setError("Failed to fetch patient data");
        setIsLoading(false);
      }
    };

    fetchPatientData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5005/patients/${id}`);

      navigate("/"); // Navigate to patients list after deletion
    } catch (error) {
      console.error("Failed to delete patient:", error);
      setError("Failed to delete patient");
    }
  };

  const handleEdit = () => {
    navigate(`/add-patient/${id}`); // Navigate to the patient form page for editing
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!patient) {
    return <div>No patient data available.</div>;
  }

  const sideNames = {
    V: "Vestibular",
    M: "Mesial",
    D: "Distal",
    L: "Lingual",
    P: "Palatina",
    O: "Oclusal",
  };

  return (
    <div>
      <h1>Perfil do Paciente - Informações Detalhadas</h1>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this patient?</p>
            <button onClick={handleDelete} className="delete-button">
              Delete
            </button>
            <button onClick={handleCloseModal} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      )}
      {patient.profilePhoto && (
        <div>
          <h2>Foto de Perfil</h2>
          <img
            width={150}
            height={150}
            src={`http://localhost:5005/${patient.profilePhoto.path}`}
            alt="Profile"
          />
        </div>
      )}
      <div>
        <h2>Detalhes Gerais</h2>
        <p>Nome: {capitalizeFirstLetterOfWords(patient.nome)}</p>
        <p>Data da Consulta: {capitalizeFirstLetter(patient.dataConsulta)}</p>
        <p>CPF: {capitalizeFirstLetter(patient.cpf)}</p>
        <p>
          Data de Nascimento: {capitalizeFirstLetter(patient.dataNascimento)}
        </p>
        <p>Gênero: {capitalizeFirstLetter(patient.genero)}</p>
        <p>Raça/Cor: {capitalizeFirstLetter(patient.racaCor)}</p>
        <p>Estado Civil: {capitalizeFirstLetter(patient.estadoCivil)}</p>
        <p>Plano: {capitalizeFirstLetter(patient.plano)}</p>
        <p>Profissão/Ocupação: {capitalizeFirstLetter(patient.profissao)}</p>
        <p>Escolaridade: {capitalizeFirstLetter(patient.escolaridade)}</p>
      </div>
      <div>
        <h2>Informações de Contato</h2>
        <p>Rua: {capitalizeFirstLetter(patient.endereco?.rua)}</p>
        <p>Número: {capitalizeFirstLetter(patient.endereco?.numero)}</p>
        <p>Bairro: {capitalizeFirstLetter(patient.endereco?.bairro)}</p>
        <p>Cidade: {capitalizeFirstLetter(patient.endereco?.cidade)}</p>
        <p>Estado: {capitalizeFirstLetter(patient.endereco?.estado)}</p>
        <p>WhatsApp: {capitalizeFirstLetter(patient.contato?.whatsapp)}</p>
        <p>Instagram: {patient.contato?.instagram}</p>
        <p>Telefone: {capitalizeFirstLetter(patient.contato?.telefone)}</p>
        <p>Email: {patient.contato?.email}</p>
      </div>
      <div>
        <h2>Histórico Bucal</h2>
        <p>
          Frequência que vai ao dentista:{" "}
          {capitalizeFirstLetter(patient.historicoBucal?.frequenciaDentista)}
        </p>
        <p>
          Mastiga dos dois lados:{" "}
          {patient.historicoBucal?.mastigaLados === "true"
            ? "Sim"
            : patient.historicoBucal?.mastigaLados === "false"
            ? "Não"
            : ""}
        </p>
        <p>
          Frequência de escovação dos dentes:{" "}
          {capitalizeFirstLetter(
            patient.historicoBucal?.escovaDentesFrequencia
          )}
        </p>
        <p>
          Costuma ranger os dentes:{" "}
          {patient.historicoBucal?.rangeDentes === "true"
            ? "Sim"
            : patient.historicoBucal?.rangeDentes === "false"
            ? "Não"
            : ""}
        </p>
        <p>
          Fica apreensivo durante tratamento odontológico:{" "}
          {patient.historicoBucal?.apreensivoTratamento === "true"
            ? "Sim"
            : patient.historicoBucal?.apreensivoTratamento === "false"
            ? "Não"
            : ""}
        </p>
        <p>
          Sua gengiva sangra:{" "}
          {patient.historicoBucal?.gengivaSangra === "true"
            ? "Sim"
            : patient.historicoBucal?.gengivaSangra === "false"
            ? "Não"
            : ""}
        </p>
        <p>
          Tive algum problema com tratamento odontológico:{" "}
          {patient.historicoBucal?.problemaTratamentoOdontologico === "true"
            ? "Sim"
            : patient.historicoBucal?.problemaTratamentoOdontologico === "false"
            ? "Não"
            : ""}
        </p>
        {patient.historicoBucal?.problemaTratamentoOdontologico === "true" && (
          <p>
            Detalhes do problema:{" "}
            {capitalizeFirstLetter(
              patient.historicoBucal?.problemaTratamentoOdontologicoDetails
            )}
          </p>
        )}
        <p>
          Usa fio dental:{" "}
          {capitalizeFirstLetter(patient.historicoBucal?.usaFioDental)}
        </p>
        <p>
          Dentes sensíveis:{" "}
          {capitalizeFirstLetter(patient.historicoBucal?.dentesSensiveis)}
        </p>
        <p>
          Usa método auxiliar:{" "}
          {patient.historicoBucal?.metodoAuxiliar === "true"
            ? "Sim"
            : patient.historicoBucal?.metodoAuxiliar === "false"
            ? "Não"
            : ""}
        </p>
        <p>
          Costuma morder a língua, lábio ou bochecha:{" "}
          {capitalizeFirstLetter(
            patient.historicoBucal?.mordeLinguaLabioBochecha
          )}
        </p>
        <p>
          Sente dor ao mastigar:{" "}
          {capitalizeFirstLetter(patient.historicoBucal?.dorMastigar)}
        </p>
        <p>
          Usa prótese ou implante:{" "}
          {patient.historicoBucal?.usaProteseImplante === "true"
            ? "Sim"
            : patient.historicoBucal?.usaProteseImplante === "false"
            ? "Não"
            : ""}
        </p>
        {patient.historicoBucal?.usaProteseImplante === "true" && (
          <p>
            Detalhes da prótese/implante:{" "}
            {capitalizeFirstLetter(
              patient.historicoBucal?.usaProteseImplanteDetails
            )}
          </p>
        )}
        <p>
          Tem alguma ferida na boca:{" "}
          {patient.historicoBucal?.feridaBoca === "true"
            ? "Sim"
            : patient.historicoBucal?.feridaBoca === "false"
            ? "Não"
            : ""}
        </p>
        {patient.historicoBucal?.feridaBoca === "true" && (
          <p>
            Detalhes da ferida:{" "}
            {capitalizeFirstLetter(patient.historicoBucal?.feridaBocaDetails)}
          </p>
        )}
        <p>
          Os dentes afetam a saúde:{" "}
          {patient.historicoBucal?.dentesAfetamSaude === "true"
            ? "Sim"
            : patient.historicoBucal?.dentesAfetamSaude === "false"
            ? "Não"
            : ""}
        </p>
        <p>
          Costuma respirar pela boca:{" "}
          {capitalizeFirstLetter(patient.historicoBucal?.respiraPelaBoca)}
        </p>
      </div>
      <div>
        <h2>Informações Gerais</h2>
        <p>
          Está sob tratamento médico:{" "}
          {patient.informacoesGerais?.tratamentoMedico === "sim"
            ? "Sim"
            : patient.informacoesGerais?.tratamentoMedico === "não"
            ? "Não"
            : ""}
        </p>
        {patient.informacoesGerais?.tratamentoMedico === "sim" && (
          <p>
            Detalhes do tratamento médico:{" "}
            {capitalizeFirstLetter(
              patient.informacoesGerais?.tratamentoMedicoDetails
            )}
          </p>
        )}
        <p>
          Já apresentou alguma alergia medicamentosa:{" "}
          {patient.informacoesGerais?.alergiaMedicamentosa === "sim"
            ? "Sim"
            : patient.informacoesGerais?.alergiaMedicamentosa === "não"
            ? "Não"
            : ""}
        </p>
        {patient.informacoesGerais?.alergiaMedicamentosa === "sim" && (
          <p>
            Detalhes da alergia medicamentosa:{" "}
            {capitalizeFirstLetter(
              patient.informacoesGerais?.alergiaMedicamentosaDetails
            )}
          </p>
        )}
        <p>
          Considera-se nervoso(a):{" "}
          {patient.informacoesGerais?.consideraNervoso === "sim"
            ? "Sim"
            : patient.informacoesGerais?.consideraNervoso === "não"
            ? "Não"
            : ""}
        </p>
        <p>
          Já apresentou alguma alergia a algum outro agente:{" "}
          {patient.informacoesGerais?.alergiaOutros === "sim"
            ? "Sim"
            : patient.informacoesGerais?.alergiaOutros === "não"
            ? "Não"
            : ""}
        </p>
        {patient.informacoesGerais?.alergiaOutros === "sim" && (
          <p>
            Detalhes da alergia a outros agentes:{" "}
            {capitalizeFirstLetter(
              patient.informacoesGerais?.alergiaOutrosDetails
            )}
          </p>
        )}
        <p>
          Considera-se ansioso(a):{" "}
          {patient.informacoesGerais?.consideraAnsioso === "sim"
            ? "Sim"
            : patient.informacoesGerais?.consideraAnsioso === "não"
            ? "Não"
            : ""}
        </p>
        <p>
          Foi hospitalizado? Cirurgia:{" "}
          {patient.informacoesGerais?.hospitalizadoCirurgia === "sim"
            ? "Sim"
            : patient.informacoesGerais?.hospitalizadoCirurgia === "não"
            ? "Não"
            : ""}
        </p>
        {patient.informacoesGerais?.hospitalizadoCirurgia === "sim" && (
          <p>
            Detalhes da hospitalização/cirurgia:{" "}
            {capitalizeFirstLetter(
              patient.informacoesGerais?.hospitalizadoCirurgiaDetails
            )}
          </p>
        )}
        <p>
          Vomita frequentemente:{" "}
          {patient.informacoesGerais?.vomitaFrequentemente === "sim"
            ? "Sim"
            : patient.informacoesGerais?.vomitaFrequentemente === "não"
            ? "Não"
            : ""}
        </p>
        <p>
          Está grávida:{" "}
          {patient.informacoesGerais?.gravida === "sim"
            ? "Sim"
            : patient.informacoesGerais?.gravida === "não"
            ? "Não"
            : ""}
        </p>
        {patient.informacoesGerais?.gravida === "sim" && (
          <p>
            Detalhes da gravidez:{" "}
            {capitalizeFirstLetter(patient.informacoesGerais?.gravidaDetails)}
          </p>
        )}
        <p>
          Está amamentando:{" "}
          {patient.informacoesGerais?.amamentando === "sim"
            ? "Sim"
            : patient.informacoesGerais?.amamentando === "não"
            ? "Não"
            : ""}
        </p>
        <p>
          Sente falta de ar ou cansaço a esforços leves:{" "}
          {patient.informacoesGerais?.faltaArCansaco === "sim"
            ? "Sim"
            : patient.informacoesGerais?.faltaArCansaco === "não"
            ? "Não"
            : ""}
        </p>
        {patient.informacoesGerais?.faltaArCansaco === "sim" && (
          <p>
            Detalhes da falta de ar ou cansaço:{" "}
            {capitalizeFirstLetter(
              patient.informacoesGerais?.faltaArCansacoDetails
            )}
          </p>
        )}
        <p>
          Sente dores no peito:{" "}
          {patient.informacoesGerais?.doresPeito === "sim"
            ? "Sim"
            : patient.informacoesGerais?.doresPeito === "não"
            ? "Não"
            : ""}
        </p>
        <p>
          Alteração de pressão arterial:{" "}
          {patient.informacoesGerais?.alteracaoPressao === "sim"
            ? "Sim"
            : patient.informacoesGerais?.alteracaoPressao === "não"
            ? "Não"
            : ""}
        </p>
        <p>
          Histórico de infarto:{" "}
          {patient.informacoesGerais?.historicoInfarto === "sim"
            ? "Sim"
            : patient.informacoesGerais?.historicoInfarto === "não"
            ? "Não"
            : ""}
        </p>
        {patient.informacoesGerais?.historicoInfarto === "sim" && (
          <p>
            Detalhes do infarto:{" "}
            {capitalizeFirstLetter(
              patient.informacoesGerais?.historicoInfartoDetails
            )}
          </p>
        )}
        <p>
          Histórico de AVC:{" "}
          {patient.informacoesGerais?.historicoAVC === "sim"
            ? "Sim"
            : patient.informacoesGerais?.historicoAVC === "não"
            ? "Não"
            : ""}
        </p>
        {patient.informacoesGerais?.historicoAVC === "sim" && (
          <p>
            Detalhes do AVC:{" "}
            {capitalizeFirstLetter(
              patient.informacoesGerais?.historicoAVCDetails
            )}
          </p>
        )}
        <p>
          Histórico de asma:{" "}
          {patient.informacoesGerais?.historicoAsma === "sim"
            ? "Sim"
            : patient.informacoesGerais?.historicoAsma === "não"
            ? "Não"
            : ""}
        </p>
        {patient.informacoesGerais?.historicoAsma === "sim" && (
          <p>
            Detalhes da asma:{" "}
            {capitalizeFirstLetter(
              patient.informacoesGerais?.historicoAsmaDetails
            )}
          </p>
        )}
        <p>
          Histórico de diabetes:{" "}
          {patient.informacoesGerais?.historicoDiabetes === "sim"
            ? "Sim"
            : patient.informacoesGerais?.historicoDiabetes === "não"
            ? "Não"
            : ""}
        </p>
        {patient.informacoesGerais?.historicoDiabetes === "sim" && (
          <p>
            Detalhes do diabetes:{" "}
            {capitalizeFirstLetter(
              patient.informacoesGerais?.historicoDiabetesDetails
            )}
          </p>
        )}
        <p>
          Tuberculose:{" "}
          {patient.informacoesGerais?.tuberculose === "sim"
            ? "Sim"
            : patient.informacoesGerais?.tuberculose === "não"
            ? "Não"
            : ""}
        </p>
        {patient.informacoesGerais?.tuberculose === "sim" && (
          <p>
            Detalhes da tuberculose:{" "}
            {capitalizeFirstLetter(
              patient.informacoesGerais?.tuberculoseDetails
            )}
          </p>
        )}
        <p>
          Sente-se com sede a maior parte do tempo:{" "}
          {patient.informacoesGerais?.sedeConstante === "sim"
            ? "Sim"
            : patient.informacoesGerais?.sedeConstante === "não"
            ? "Não"
            : ""}
        </p>
        <p>
          Urina mais de 6 vezes por noite:{" "}
          {patient.informacoesGerais?.urinaNoite === "sim"
            ? "Sim"
            : patient.informacoesGerais?.urinaNoite === "não"
            ? "Não"
            : ""}
        </p>
        <p>
          Possui alteração hormonal:{" "}
          {patient.informacoesGerais?.alteracaoHormonal === "sim"
            ? "Sim"
            : patient.informacoesGerais?.alteracaoHormonal === "não"
            ? "Não"
            : ""}
        </p>
        {patient.informacoesGerais?.alteracaoHormonal === "sim" && (
          <p>
            Detalhes da alteração hormonal:{" "}
            {capitalizeFirstLetter(
              patient.informacoesGerais?.alteracaoHormonalDetails
            )}
          </p>
        )}
        <p>
          Desmaio, distrimia:{" "}
          {patient.informacoesGerais?.desmaioDistrimia === "sim"
            ? "Sim"
            : patient.informacoesGerais?.desmaioDistrimia === "não"
            ? "Não"
            : ""}
        </p>
        {patient.informacoesGerais?.desmaioDistrimia === "sim" && (
          <p>
            Detalhes de desmaio ou distrimia:{" "}
            {capitalizeFirstLetter(
              patient.informacoesGerais?.desmaioDistrimiaDetails
            )}
          </p>
        )}
        <p>
          Possui hipotireoidismo ou hipertireoidismo:{" "}
          {patient.informacoesGerais?.hipotireoidismoHipertireoidismo === "sim"
            ? "Sim"
            : patient.informacoesGerais?.hipotireoidismoHipertireoidismo ===
              "não"
            ? "Não"
            : ""}
        </p>
        {patient.informacoesGerais?.hipotireoidismoHipertireoidismo ===
          "sim" && (
          <p>
            Detalhes do hipotireoidismo ou hipertireoidismo:{" "}
            {capitalizeFirstLetter(
              patient.informacoesGerais?.hipotireoidismoHipertireoidismoDetails
            )}
          </p>
        )}
        <p>
          Tem dificuldade de mastigar:{" "}
          {patient.informacoesGerais?.dificuldadeMastigar === "sim"
            ? "Sim"
            : patient.informacoesGerais?.dificuldadeMastigar === "não"
            ? "Não"
            : ""}
        </p>
        <p>
          TPM? Menopausa:{" "}
          {patient.informacoesGerais?.tpmMenopausa === "sim"
            ? "Sim"
            : patient.informacoesGerais?.tpmMenopausa === "não"
            ? "Não"
            : ""}
        </p>
        {patient.informacoesGerais?.tpmMenopausa === "sim" && (
          <p>
            Detalhes de TPM ou Menopausa:{" "}
            {capitalizeFirstLetter(
              patient.informacoesGerais?.tpmMenopausaDetails
            )}
          </p>
        )}
        <p>
          Cálculo ou insuficiência renal:{" "}
          {patient.informacoesGerais?.calculoRenal === "sim"
            ? "Sim"
            : patient.informacoesGerais?.calculoRenal === "não"
            ? "Não"
            : ""}
        </p>
        {patient.informacoesGerais?.calculoRenal === "sim" && (
          <p>
            Detalhes de cálculo ou insuficiência renal:{" "}
            {capitalizeFirstLetter(
              patient.informacoesGerais?.calculoRenalDetails
            )}
          </p>
        )}
        <p>
          Reposição hormonal:{" "}
          {patient.informacoesGerais?.reposicaoHormonal === "sim"
            ? "Sim"
            : patient.informacoesGerais?.reposicaoHormonal === "não"
            ? "Não"
            : ""}
        </p>
        <p>
          Osteoporose:{" "}
          {patient.informacoesGerais?.osteoporose === "sim"
            ? "Sim"
            : patient.informacoesGerais?.osteoporose === "não"
            ? "Não"
            : ""}
        </p>
        <p>
          Anemia:{" "}
          {patient.informacoesGerais?.anemia === "sim"
            ? "Sim"
            : patient.informacoesGerais?.anemia === "não"
            ? "Não"
            : ""}
        </p>
        <p>
          Leucemia:{" "}
          {patient.informacoesGerais?.leucemia === "sim"
            ? "Sim"
            : patient.informacoesGerais?.leucemia === "não"
            ? "Não"
            : ""}
        </p>
        <p>
          Hemofilia:{" "}
          {patient.informacoesGerais?.hemofilia === "sim"
            ? "Sim"
            : patient.informacoesGerais?.hemofilia === "não"
            ? "Não"
            : ""}
        </p>
        <p>
          Ingere bebida alcoólica:{" "}
          {patient.informacoesGerais?.ingestaoAlcoolica === "sim"
            ? "Sim"
            : patient.informacoesGerais?.ingestaoAlcoolica === "não"
            ? "Não"
            : ""}
        </p>
        <p>
          Tabagista:{" "}
          {patient.informacoesGerais?.tabagista === "sim"
            ? "Sim"
            : patient.informacoesGerais?.tabagista === "não"
            ? "Não"
            : ""}
        </p>
        <p>
          Gastrite:{" "}
          {patient.informacoesGerais?.gastrite === "sim"
            ? "Sim"
            : patient.informacoesGerais?.gastrite === "não"
            ? "Não"
            : ""}
        </p>
        <p>
          Úlcera:{" "}
          {patient.informacoesGerais?.ulceras === "sim"
            ? "Sim"
            : patient.informacoesGerais?.ulceras === "não"
            ? "Não"
            : ""}
        </p>
        <p>
          Hepatite:{" "}
          {patient.informacoesGerais?.hepatite === "sim"
            ? "Sim"
            : patient.informacoesGerais?.hepatite === "não"
            ? "Não"
            : ""}
        </p>
        <p>
          Sangramento pós trauma ou cirurgia:{" "}
          {patient.informacoesGerais?.sangramentoPosTraumaCirurgia === "sim"
            ? "Sim"
            : patient.informacoesGerais?.sangramentoPosTraumaCirurgia === "não"
            ? "Não"
            : ""}
        </p>
        {patient.informacoesGerais?.sangramentoPosTraumaCirurgia === "sim" && (
          <p>
            Detalhes do sangramento:{" "}
            {capitalizeFirstLetter(
              patient.informacoesGerais?.sangramentoPosTraumaCirurgiaDetails
            )}
          </p>
        )}
        <p>
          Outras doenças:{" "}
          {capitalizeFirstLetter(patient.informacoesGerais?.outrasDoencas)}
        </p>
      </div>

      <div>
        <h2>Procedimentos Dentários</h2>
        {patient.procedimentos.length > 0 ? (
          patient.procedimentos.map((proc, index) => (
            <div key={index}>
              <p>Dente: {proc.dente}</p>
              <p>
                Lados:{" "}
                {proc.sides
                  .map((side) => sideNames[side.side] || side.side)
                  .join(", ")}
              </p>
              <p>Procedimento: {proc.procedimento}</p>
              <p>Operação: {proc.operation}</p>
              <p>Situação: {proc.situacao}</p>
            </div>
          ))
        ) : (
          <p>Nenhum procedimento registrado.</p>
        )}
      </div>

      <div>
        <h2>Tratamentos Executados</h2>
        {patient.tratamentosExecutados.length > 0 ? (
          patient.tratamentosExecutados.map((treatment, index) => (
            <div key={index}>
              <p>
                Data:{" "}
                {new Date(treatment.data).toLocaleDateString("pt-BR", {
                  timeZone: "UTC",
                })}
              </p>
              <p>Procedimento: {treatment.procedimento}</p>
              <p>Dentista: {treatment.dentista}</p>
              <p>Valor: {treatment.valor?.$numberDecimal || treatment.valor}</p>
              <p>Nota Fiscal: {treatment.notaFiscal}</p>
              <p>Forma de Pagamento: {treatment.formaDePagamento}</p>
            </div>
          ))
        ) : (
          <p>Nenhum tratamento registrado.</p>
        )}
      </div>

      <div>
        <h2>Fotografias</h2>
        {patient.fotografias && patient.fotografias.length > 0 ? (
          patient.fotografias.map((foto, index) => (
            <div key={index}>
              <img
                width={200}
                height={200}
                src={`http://localhost:5005/${foto.path}`}
                alt={`Foto ${index + 1}`}
              />
              <p>Descrição: {foto.description}</p>
            </div>
          ))
        ) : (
          <p>Nenhuma fotografia registrada.</p>
        )}
      </div>

      <div className="action-buttons">
        <button onClick={handleEdit} className="edit-button">
          Editar
        </button>
        <button onClick={handleShowModal} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
}

export default PatientProfile;
