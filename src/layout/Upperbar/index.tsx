import { Box, Fade } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../hooks/useAppSelector";
import UserProfileButton from "./UserProfileButton";

const UpperbarRoot = styled.div`
  width: 100%;
  height: calc(100vh * 0.09);

  background-color: #eaeff2;
`;

const UpperbarInnerContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  margin-right: 15px;
  /* margin-left: 15px; */
  /* border-bottom: 1px solid #c3cfdd; */
`;

const UpperbarTitleContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #363740;
  font-weight: 800;
  text-transform: capitalize;
  padding-top: 10px;
  font-size: 24px;
  padding-left: calc(12px + 15px);

  @media (min-width: 1024px) {
    font-size: 26px;
  }
`;

interface Props {
  any?: string;
}

const Upperbar = ({}: Props) => {
  const selectSidebarLabel = useAppSelector(
    (state) => state.activeCollection.sidebarLabel
  );

  return (
    <UpperbarRoot>
      <UpperbarInnerContainer>
        <Box flexGrow={1} display="flex" justifyContent="flex-start">
          <UpperbarTitleContainer>
            <Fade in={true} timeout={{ enter: 500, exit: 500 }}>
              <div>{selectSidebarLabel}</div>
            </Fade>
          </UpperbarTitleContainer>
        </Box>

        <Box
          marginRight={{ xs: "0px", sm: "30px" }}
          flexGrow={1}
          justifyContent="flex-end"
          display="flex"
        >
          <UserProfileButton />
        </Box>
      </UpperbarInnerContainer>
    </UpperbarRoot>
  );
};

export default Upperbar;
