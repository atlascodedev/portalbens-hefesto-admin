import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { db } from "../../../firebase/index";
import { RootState } from "../../../redux";
import { exportCardClose } from "../../../redux/special/exportCards/actions";
import AtlasBackdrop from "../../Util/AtlasBackdrop";
import styled from "styled-components";
import { motion } from "framer-motion";
import { SvgIcon } from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";

interface IExportCardsProps extends ExportCardsReduxProps {}

const cardCollectionRef = db
  .collection("collections")
  .doc("cartas")
  .collection("entries");

const ExportCards = ({ isOpen, closeDialog }: IExportCardsProps) => {
  return (
    <AtlasBackdrop open={isOpen} closeFn={closeDialog}>
      <Root>
        <ExportCardsHeader action={closeDialog} />
      </Root>
    </AtlasBackdrop>
  );
};

const mapStateToProps = (state: RootState) => ({
  isOpen: state.exportCard.open,
});

const mapDispatchToProps = {
  closeDialog: exportCardClose,
};

const exportCardsConnector = connect(mapStateToProps, mapDispatchToProps);

type ExportCardsReduxProps = ConnectedProps<typeof exportCardsConnector>;

export default exportCardsConnector(ExportCards);

const ExportCardsHeader = ({
  action,
}: {
  action: (...args: any[]) => void;
}) => {
  return (
    <Header>
      <HeaderTitle>Exportar cartas contempladas</HeaderTitle>
      <CloseButton
        onClick={action}
        initial={{ rotateY: 180 }}
        variants={{
          tap: { scale: 0.9 },
          hover: { scale: 1.1 },
        }}
        whileHover="hover"
        whileTap="tap"
      >
        <SvgIcon component={ArrowForward} />
      </CloseButton>
    </Header>
  );
};

const Root = styled.div`
  background-color: #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  height: 90%;
  width: 90%;
`;

const Header = styled.div`
  width: 100%;
  border-bottom: 1px solid #b8b8b8;
  padding: 20px 30px;
  display: flex;
`;

const HeaderTitle = styled.div`
  color: #333;
  font-size: 20px;
  flex-grow: 1;

  @media (min-width: 1024px) {
    font-size: 24px;
  }
`;

const CloseButton = styled(motion.div)`
  width: 35px;
  position: relative;
  height: 35px;
  border-radius: 50%;
  background-color: #333;
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;

  .MuiSvgIcon-root {
    color: #fff;
  }
`;
