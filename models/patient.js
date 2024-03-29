const mongoose = require("mongoose");

const treatmentSchema = new mongoose.Schema({
  data: Date,
  procedimento: String,
  dentista: String,
  valor: mongoose.Schema.Types.Decimal128, // or Number, depending on how you handle currency
  notaFiscal: String,
  formaDePagamento: String,
});

const procedureSchema = new mongoose.Schema({
  dente: String,
  face: String,
  situacao: String,
  mes: String,
});

const patientSchema = new mongoose.Schema({
  nome: String,
  dataConsulta: Date,
  idade: Number,
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
  interesse: [String],
  musicas: [String],
  historicoBucal: {
    historicoDoencaAtual: String,
    alergias: [String],
    medicacoesUsoContinuo: [String],
    frequenciaDentista: String,
    mastigaLados: String,
    escovaDentesFrequencia: String,
    rangeDentes: Boolean,
    apreensivoTratamento: Boolean,
    gengivaSangra: Boolean,
    problemaTratamentoOdontologico: Boolean,
    usaFioDental: Boolean,
    dentesSensiveis: Boolean,
    metodoAuxiliar: String,
    mordeLinguaLabioBochecha: Boolean,
    dorMastigar: Boolean,
    usaProteseImplante: Boolean,
    feridaBoca: Boolean,
    dentesAfetamSaude: Boolean,
    respiraPelaBoca: Boolean,
  },
  informacoesGerais: {
    tratamentoMedico: Boolean,
    medicamento: String,
    alergiaMedicamentosa: Boolean,
    consideraNervoso: Boolean,
    alergiaOutros: Boolean,
    consideraAnsioso: Boolean,
    hospitalizadoCirurgia: Boolean,
    vomitaFrequentemente: Boolean,
    gravida: Boolean,
    amamentando: Boolean,
    faltaArCansaco: Boolean,
    doresPeito: Boolean,
    alteracaoPressao: Boolean,
    historicoInfarto: Boolean,
    historicoAVC: Boolean,
    historicoAsma: Boolean,
    historicoDiabetes: Boolean,
    tuberculose: Boolean,
    sedeConstante: Boolean,
    urinaNoite: Boolean,
    alteracaoHormonal: Boolean,
    desmaioDistrimia: Boolean,
    hipotireoidismoHipertireoidismo: Boolean,
    dificuldadeMastigar: Boolean,
    tpmMenopausa: Boolean,
    calculoRenal: Boolean,
    reposicaoHormonal: Boolean,
    osteoporose: Boolean,
    anemia: Boolean,
    leucemia: Boolean,
    hemofilia: Boolean,
    ingestaoAlcoolica: Boolean,
    tabagista: Boolean,
    gastriteUlceras: Boolean,
    outrasDoencas: String,
  },
  procedimentos: [procedureSchema], // Added procedure section
  tratamentosExecutados: [treatmentSchema],
  observacoes: String,
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
