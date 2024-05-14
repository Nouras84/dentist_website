import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FormularioDoPaciente from "./FormularioDoPaciente";
import { useParams } from "react-router-dom";

import HistoricoBucal from "./HistoricoBucal";
import InformacoesGerais from "./InformacoesGerais";
import Procedimentos from "./Procedimentos";
import TratamentoExecutado from "./TratamentoExecutado";
import Fotografias from "./Fotografias";
import "./styles.css";

function PatientFormPage() {
  const { patientId } = useParams();
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
        <FormularioDoPaciente patientId={patientId} />
      </TabPanel>
      <TabPanel>
        <HistoricoBucal patientId={patientId} />
      </TabPanel>
      <TabPanel>
        <InformacoesGerais patientId={patientId} />
      </TabPanel>
      <TabPanel>
        <Procedimentos patientId={patientId} />
      </TabPanel>
      <TabPanel>
        <TratamentoExecutado patientId={patientId} />
      </TabPanel>
      <TabPanel>
        <Fotografias patientId={patientId} />
      </TabPanel>
    </Tabs>
  );
}

export default PatientFormPage;
