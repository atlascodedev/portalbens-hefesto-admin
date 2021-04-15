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
  { complete: false, label: "Sistema de chat integrado com serviço Tawk.to" },
  {
    complete: false,
    label:
      "Automação de saldos e datas de cartas contempladas (falar com cliente a respeito para definir)",
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
