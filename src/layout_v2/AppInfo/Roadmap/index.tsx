import React from "react";
import Timeline from "@material-ui/lab/Timeline";
import RoadmapItem, { RoadmapItemType } from "../RoadmapItem";
import { RoadmapWrapper } from "./styles";

interface RoadMapProps {
  items: RoadmapItemType[];
}

const Roadmap = ({ items = [] }: RoadMapProps) => {
  return (
    <RoadmapWrapper>
      <Timeline align="alternate">
        {items.map((value, index) => {
          if (index == items.length - 1) {
            return (
              <RoadmapItem
                key={index}
                complete={value.complete}
                label={value.label}
                last={true}
              />
            );
          } else {
            return (
              <RoadmapItem
                key={index}
                complete={value.complete}
                label={value.label}
                last={false}
              />
            );
          }
        })}
      </Timeline>
    </RoadmapWrapper>
  );
};

export default Roadmap;
