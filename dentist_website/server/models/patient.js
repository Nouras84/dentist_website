const mongoose = require("mongoose");

const treatmentSchema = new mongoose.Schema({
  data: Date,
  procedimento: String,
  dentista: String,
  valor: mongoose.Schema.Types.Decimal128, // or Number, depending on how you handle currency
  notaFiscal: String,
  formaDePagamento: String,
});

// Schema for documenting details about each side of a tooth
const sideDetailsSchema = new mongoose.Schema(
  {
    side: {
      type: String,
      enum: ["V", "M", "D", "L", "P", "O"],
      required: true,
    },
  },
  { _id: false }
);

// const sideDetailsSchema = new mongoose.Schema({
//   side: {
//     type: String,
//     enum: ["V", "M", "D", "L", "P", "O"], // Enum to ensure data integrity for tooth sides
//     required: true,
//   },
//   situacao: String, // Condition or status of this side
//   data: Date, // Date when the procedure or observation was made
// });

// Schema for procedures including multiple sides and details for each
const procedureSchema = new mongoose.Schema({
  dente: {
    type: Number,
    required: true,
  },
  sides: [sideDetailsSchema], // Only the side information
  situacao: String, // Condition or status of the tooth
  data: Date, // Date of the procedure
  procedimento: String, // Description of the procedure
  operation: String,
});

// const procedureSchema = new mongoose.Schema({
//   dente: {
//     type: Number, // Tooth number based on dental numbering system
//     required: true,
//   },
//   sides: [sideDetailsSchema], // Allows multiple sides per tooth
//   procedimento: String, // Description of the procedure
//   operation: String,
// });

// New sub-schema for fotografias
const photoSchema = new mongoose.Schema({
  path: String,
  description: String,
});

const patientSchema = new mongoose.Schema({
  profilePhoto: {
    path: String,
    description: String,
  },
  nome: String,
  dataConsulta: Date,

  cpf: String,
  dataNascimento: Date,
  genero: String,
  racaCor: String,
  estadoCivil: String,
  plano: String,
  profissao: String,
  escolaridade: String,
  endereco: {
    rua: String,
    numero: String,
    bairro: String,
    cidade: String,
    estado: String,
  },
  contato: {
    whatsapp: String,
    instagram: String,
    telefone: String,
    email: String,
  },
  // interesse: [String],
  // musicas: [String],
  historicoBucal: {
    historicoDoencaAtual: String,
    alergias: [String],
    medicacoesUsoContinuo: [String],
    frequenciaDentista: String,
    mastigaLados: String,
    escovaDentesFrequencia: String,
    rangeDentes: String,
    apreensivoTratamento: String,
    gengivaSangra: String,
    problemaTratamentoOdontologico: String,
    problemaTratamentoOdontologicoDetails: String,
    usaFioDental: String,
    dentesSensiveis: String,
    metodoAuxiliar: String,
    mordeLinguaLabioBochecha: String,
    dorMastigar: String,
    usaProteseImplante: String,
    usaProteseImplanteDetails: String,
    feridaBoca: String, // Changed from Boolean to String

    feridaBocaDetails: String,
    dentesAfetamSaude: String, // Changed from Boolean to String
    respiraPelaBoca: String,
  },
  informacoesGerais: {
    tratamentoMedico: String,
    tratamentoMedicoDetails: String,

    alergiaMedicamentosa: String,
    alergiaMedicamentosaDetails: String,
    consideraNervoso: String,
    alergiaOutros: String,
    alergiaOutrosDetails: String,
    consideraAnsioso: String,
    hospitalizadoCirurgia: String,
    hospitalizadoCirurgiaDetails: String,
    vomitaFrequentemente: String,
    gravida: String,
    gravidaDetails: String,
    amamentando: String,
    faltaArCansaco: String,
    faltaArCansacoDetails: String,
    doresPeito: String,
    alteracaoPressao: String,
    historicoInfarto: String,
    historicoInfartoDetails: String,
    historicoAVC: String,
    historicoAVCDetails: String,
    historicoAsma: String,
    historicoAsmaDetails: String,
    historicoDiabetes: String,
    historicoDiabetesDetails: String,
    tuberculose: String,
    tuberculoseDetails: String,
    sedeConstante: String,
    urinaNoite: String,
    alteracaoHormonal: String,
    alteracaoHormonalDetails: String,
    desmaioDistrimia: String,
    desmaioDistrimiaDetails: String,
    hipotireoidismoHipertireoidismo: String,
    hipotireoidismoHipertireoidismoDetails: String,
    dificuldadeMastigar: String,
    tpmMenopausa: String,
    tpmMenopausaDetails: String,
    calculoRenal: String,
    calculoRenalDetails: String,
    reposicaoHormonal: String,

    osteoporose: String,
    anemia: String,
    leucemia: String,
    hemofilia: String,
    ingestaoAlcoolica: String,
    tabagista: String,
    gastrite: String,
    ulceras: String,
    hepatite: String,
    sangramentoPosTraumaCirurgia: String,
    sangramentoPosTraumaCirurgiaDetails: String,
    outrasDoencas: String,
  },
  procedimentos: [procedureSchema], // Added procedure section
  tratamentosExecutados: [treatmentSchema],
  fotografias: [photoSchema], // Updated to use the new photoSchema
  observacoes: String,
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
