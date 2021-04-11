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
  { complete: true, label: "Teste" },
  { complete: true, label: "Teste1" },
  { complete: false, label: "Teste2" },
  { complete: false, label: "Teste3" },
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
