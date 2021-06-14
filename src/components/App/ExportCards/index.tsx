import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { db } from "../../../firebase/index";
import { RootState } from "../../../redux";
import AtlasBackdrop from "../../Util/AtlasBackdrop";

interface IExportCardsProps extends ExportCardsReduxProps {}

const ExportCards = (props: IExportCardsProps) => {
  return (
    <AtlasBackdrop open={true} closeFn={() => console.log("Close me ")}>
      <div>pan pan</div>
    </AtlasBackdrop>
  );
};

const mapStateToProps = (state: RootState) => ({
  activeCollection: state.activeCollection,
});

const mapDispatchToProps = {};

const exportCardsConnector = connect(mapStateToProps, mapDispatchToProps);

type ExportCardsReduxProps = ConnectedProps<typeof exportCardsConnector>;

export default exportCardsConnector(ExportCards);
