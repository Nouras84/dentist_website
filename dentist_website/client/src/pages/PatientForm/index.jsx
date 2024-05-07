import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FormularioDoPaciente from "./FormularioDoPaciente";
import HistoricoBucal from "./HistoricoBucal";
import InformacoesGerais from "./InformacoesGerais";
import Procedimentos from "./Procedimentos";
import TratamentoExecutado from "./TratamentoExecutado";
import Fotografias from "./Fotografias";
import "./styles.css";

function PatientFormPage() {
  return (
    <Tabs>
      <TabList>
        <Tab>Formulário do Paciente</Tab>
        <Tab>Histórico Buco-Dentária</Tab>
        <Tab>Informações Gerais</Tab>
        <Tab>Procedimentos</Tab>
        <Tab>Tratamento Executado</Tab>
        <Tab>Fotografias</Tab>
      </TabList>

      <TabPanel>
        <FormularioDoPaciente />
      </TabPanel>
      <TabPanel>
        <HistoricoBucal />
      </TabPanel>
      <TabPanel>
        <InformacoesGerais />
      </TabPanel>
      <TabPanel>
        <Procedimentos />
      </TabPanel>
      <TabPanel>
        <TratamentoExecutado />
      </TabPanel>
      <TabPanel>
        <Fotografias />
      </TabPanel>
    </Tabs>
  );
}

export default PatientFormPage;
