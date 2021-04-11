import { Link, useLocation } from "@reach/router";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import styled from "styled-components";
import IconComponent from "../../../components/Util/IconComponent";
import { basePath, dashboardPath } from "../../../config/routes.config";
import { IconTypes } from "../../../dictionaries/types";
import getCurrentPath from "../../../helper/currentPath";
import { RootState } from "../../../redux";

interface SidebarItemContainerProps {
  active?: boolean;
}

const SidebarItemContainer = styled.div<SidebarItemContainerProps>`
  display: flex;
  width: 100%;
  height: calc(100vh * 0.07);
  color: #e4e5ed;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.active ? "rgba(216, 217, 222, 0.2)" : "initial"};

  transition: all 0.2s linear;
  cursor: pointer;
  /* 
  :hover {
    background-color: rgba(216, 217, 222, 0.1);
  } */

  .menuName {
    font-size: 10px;
    margin-left: 15px;
    margin-right: 15px;
    display: none;
  }

  @media (min-width: 1024px) {
    .menuName {
      font-size: 12px;
      display: block;
    }

    .MuiSvgIcon-root {
      width: 0.8em !important;
      height: 0.8em !important;
    }
  }
`;

interface Props extends SidebarItemReduxProps {
  path: string;
  icon: IconTypes;
  label: string;
}

const SidebarItemMain = ({
  path,
  icon = "AccountBalance",
  label = "Default label",
  activeCollection,
}: Props) => {
  const [currentPathActive, setCurrentPathActive] = React.useState<boolean>(
    false
  );

  React.useEffect(() => {
    const currentLocation = getCurrentPath();

    if (path == currentLocation) {
      setCurrentPathActive(true);
    } else {
      setCurrentPathActive(false);
    }
  }, [activeCollection]);

  return (
    <React.Fragment>
      <Link to={`/${basePath}/${dashboardPath}/${path}`}>
        <SidebarItemContainer active={currentPathActive}>
          <div className="icon">
            <IconComponent clickable iconType={icon} />
          </div>

          <div className="menuName">{label}</div>
        </SidebarItemContainer>
      </Link>
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  activeCollection: state.activeCollection.itemID,
});

const mapDispatchToProps = {};

const sidebarItemConnector = connect(mapStateToProps, mapDispatchToProps);

type SidebarItemReduxProps = ConnectedProps<typeof sidebarItemConnector>;

export default sidebarItemConnector(SidebarItemMain);
