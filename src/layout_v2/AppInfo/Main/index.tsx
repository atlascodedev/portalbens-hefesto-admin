import React from "react";
import AtlasBackdrop from "../../../components/Util/AtlasBackdrop";
import { AppInfoLayout } from "../../styles";
import Roadmap from "../Roadmap";
import { RoadmapItemType } from "../RoadmapItem";

interface Props {
  isOpen: boolean;
  handleCloseFn: (open: boolean) => void;
}

const roadmapItems: RoadmapItemType[] = [
  { complete: true, label: "Criação de cartas contempladas" },
  { complete: true, label: "Sistema de blog" },
  { complete: true, label: "Criação de depoimentos" },
  { complete: true, label: "Criação de itens na seção de parceiros" },
  { complete: true, label: "Sistema de otimização de imagens" },
  { complete: true, label: "Armazenamento de imagens em nuvem" },
  {
    complete: true,
    label:
      "Modificação na estrutura do banco de dados para criação de cartas compostas",
  },
  {
    complete: true,
    label: "Criação de componente de seleção de datas requisitado pelo cliente",
  },
  {
    complete: true,
    label:
      "Desenvolvimento de componente personalizado para adicionar número indeterminado de campos compostos (parcelas x valor)",
  },
  {
    complete: true,
    label:
      "Serialização de valores inseridos no momento da criação para serem processados pela aplicação pública",
  },
  {
    complete: true,
    label:
      "Interface de função para executar sincronização de dados com a aplicação pública",
  },

  {
    complete: true,
    label:
      "Sistema de autenticação para proteger dados do painel através de um LOGIN",
  },

  {
    complete: false,
    label:
      "Automação de saldos e datas de cartas contempladas (falar com cliente a respeito para definir)",
  },
  {
    complete: false,
    label:
      "Seção para visualização de conversões feitas pela aplicação pública",
  },
  {
    complete: false,
    label: "Seção de configurações (opcional)",
  },

  {
    complete: false,
    label: "Modo noturno para facilitar trabalho noturno (opcional)",
  },

  {
    complete: false,
    label: "Habilidade de atualizar perfil do usuário",
  },
];

const AppInfo = ({ handleCloseFn, isOpen }: Props) => {
  return (
    <AtlasBackdrop
      closeFn={handleCloseFn}
      onClose={handleCloseFn}
      open={isOpen}
    >
      <AppInfoLayout>
        <Roadmap items={roadmapItems} />
      </AppInfoLayout>
    </AtlasBackdrop>
  );
};

export default AppInfo;
