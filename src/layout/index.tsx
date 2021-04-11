import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Upperbar from "./Upperbar";

const HadesLayoutRoot = styled.div`
  display: flex;
  background-color: #eaeff2;
  overflow-y: hidden;
`;
export const HadesContentContainer = styled.div`
  width: 87%;
`;

interface Props {
  children: React.ReactNode;
}

const HadesLayout = ({ children }: Props) => {
  return (
    <HadesLayoutRoot>
      <Sidebar />
      <HadesContentContainer id="contentContainer">
        <Upperbar />
        {children}
      </HadesContentContainer>
    </HadesLayoutRoot>
  );
};

export default HadesLayout;
