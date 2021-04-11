import { SvgIcon } from "@material-ui/core";
import { CardTravel, ExpandMore } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { motion, Variants } from "framer-motion";

const SidebarDrawerRoot = styled.div`
  width: 100%;
  overflow: hidden;
  height: auto;
  padding-top: 10px;
  padding-bottom: 0px;
  color: #fff;
  background-color: #082742;
  border-radius: 0px;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.383);
  font-size: 12px;
`;

const SidebarDrawerHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const SidebarDrawerHeaderIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SidebarDrawerHeaderLabel = styled.div`
  text-align: center;
  flex-grow: 1;
`;

const SidebarDrawerHeaderCollapse = styled(motion.div)`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SidebarDrawerBody = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background-color: #082742;
  color: #333;
`;

const expandButtonVariant: Variants = {
  initial: {
    scale: 1,
    transition: { duration: 0.3 },
  },
  hover: { scale: 1.3 },
  pressed: { scale: 0.9 },
  expanded: {
    rotate: 180,
    transition: { duration: 0.3 },
  },
};

const categorySelectBodyVariants: Variants = {
  initial: {
    height: "0px",
    overflow: "hidden",
  },
  expanded: {
    height: "auto",
    overflow: "visible",
    transition: {
      type: "keyframes",
    },
  },
};

interface SidebarDrawerProps {
  children: React.ReactNode;
}

export const SidebarDrawer = ({ children }: SidebarDrawerProps) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const toggleOpen = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <SidebarDrawerRoot>
      <SidebarDrawerHeaderContainer>
        <SidebarDrawerHeaderIcon>
          <SvgIcon
            style={{ width: "0.9em", height: "0.9em" }}
            component={CardTravel}
          />
        </SidebarDrawerHeaderIcon>
        <SidebarDrawerHeaderLabel>{"Coleções"}</SidebarDrawerHeaderLabel>
        <SidebarDrawerHeaderCollapse
          onClick={toggleOpen}
          variants={expandButtonVariant}
          whileHover="hover"
          whileTap="pressed"
          animate={open ? "expanded" : "initial"}
        >
          <SvgIcon component={ExpandMore} />
        </SidebarDrawerHeaderCollapse>
      </SidebarDrawerHeaderContainer>
      <SidebarDrawerBody
        initial="initial"
        variants={categorySelectBodyVariants}
        animate={open ? "expanded" : "initial"}
      >
        {children}
      </SidebarDrawerBody>
    </SidebarDrawerRoot>
  );
};
