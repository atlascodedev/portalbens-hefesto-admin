import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { DashboardItem } from "../../config/collections.config";
import IconComponent from "../../components/Util/IconComponent";
import { IconTypes } from "../../dictionaries/types";
import { Fade, SvgIcon, SvgIconTypeMap, Tooltip } from "@material-ui/core";
import {
  Autorenew,
  BugReport,
  Help,
  MenuBook,
  MenuRounded,
  Notifications,
  Person,
  Phone,
  Settings,
  Update,
} from "@material-ui/icons";
import LayoutDrawer from "../Drawer";
import getCurrentPath from "../../helper/currentPath";
import { Link, useNavigate } from "@reach/router";
import { basePath, dashboardPath } from "../../config/routes.config";
import UserProfile from "../Profile";
import NotificationList from "../NotificationList";
import AppInfo from "../AppInfo/Main";
import hefestoLogo from "../../images/hefesto-logo.svg";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import useEnhancedDialog from "../../hooks/useEnhancedDialog";
import axios from "axios";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  globalNotificationCustom,
  setLoadingFalse,
  setLoadingTrue,
} from "../../redux/globalUI/actions";
import { checkAndUpdateExpiredCards } from "../../redux/special/cards/actions";
import { useAppSelector } from "../../hooks/useAppSelector";

export const AppLayoutSidebarContainer = styled(motion.div)`
  min-width: 15%;
  max-width: 15%;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  color: #5d6d7c;
  display: none;

  @media (min-width: 1024px) {
    padding-left: 20px;
    display: block;
  }
`;

export const AppLayoutSidebarContainerAnchor = styled(motion.div)`
  display: relative;
  top: 0;
  left: 0;
  height: 100%;
  min-width: 15%;
  max-width: 15%;
  display: none;

  @media (min-width: 1024px) {
    display: block;
  }
`;

const AppLayoutRootContainer = styled.div`
  display: flex;
  background-color: #f1f6fa;
  max-width: 100vw;
  min-width: 100vw;
  max-height: 100vh;
  min-height: 100vh;
`;

const AppLayoutMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  align-items: center;
`;

const AppSidebarBrandingContainer = styled.div`
  height: 15%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const AppSidebarBrandingLogoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media (min-width: 1024px) {
    margin-bottom: 25px;
  }
`;

const AppSidebarBrandingImage = styled.img`
  object-fit: contain;
  width: 75%;
  width: 75%;
`;

const AppLayoutUpperbar = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
`;

const AppLayoutUpperbarLabelContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
  margin-left: 5px;
  color: #5d6d7c;
  font-weight: 650;
  font-size: 15px;

  @media (min-width: 1024px) {
    font-size: 25px;
    margin-left: 35px;
    justify-content: flex-start;
  }
`;

const AppLayoutUpperbarIconContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;

  .MuiSvgIcon-root {
    fill: #5d6d7c;
    margin-left: 7px;
    margin-right: 7px;
    cursor: pointer;
  }

  @media (min-width: 1024px) {
    :last-child {
      margin-right: 2%;
    }

    .MuiSvgIcon-root {
      margin-left: 15px;
      margin-right: 15px;
    }
  }
`;

const AppLayoutBurguerContainer = styled.div`
  cursor: pointer;
  display: block;

  .MuiSvgIcon-root {
    fill: #5d6d7c;
    margin-left: 14px;
    margin-right: 7px;
  }

  display: flex;
  align-items: center;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const AppLayoutContent = styled.div`
  margin: 25px;
  width: 95%;
  height: 100%;
  background-color: #fff;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.25);
  overflow-y: scroll;
`;

interface AppSidebarItemRootProps {
  disabled?: boolean;
}

const AppSidebarItemRoot = styled.div<AppSidebarItemRootProps>`
  transition: all 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  margin-top: 30px;
  margin-bottom: 30px;
  color: ${(props) => (props.disabled ? "rgba(0, 0, 0, 0.4)" : "inherit")};
  @media (min-width: 1024px) {
    justify-content: flex-start;
  }
`;

interface AppsidebarItemActiveProps {
  active: boolean;
}

const AppSidebarItemIconContainer = styled.div<AppsidebarItemActiveProps>`
  transition: all 0.3s ease-in-out;

  .MuiSvgIcon-root {
    /* fill: ${(props) => (props.active ? "#F15D3C" : "initial")}; */
  }
`;

const AppSidebarItemLabelContainer = styled.div<AppsidebarItemActiveProps>`
  margin-left: 10px;
  display: none;

  transition: all 0.3s ease-in-out;
  color: ${(props) => (props.active ? "#F15D3C" : "initial")};

  @media (min-width: 1024px) {
    display: block;
  }
`;

const SidebarItemIconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SidebarItemLabelContainer = styled.div<{ active: boolean }>`
  margin-left: 10px;

  transition: all 0.3s ease-in-out;
  color: ${(props) => (props.active ? "#F15D3C" : "initial")};

  @media (min-width: 1024px) {
    display: block;
  }
`;

interface SidebarItemLayoutProps {
  route?: string;
  actionFn?: (...args: any[]) => void;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  label?: string;
  disabled?: boolean;
}

export const SidebarItemLayout = ({
  actionFn = () => console.log("no function was passed as props"),
  icon = Autorenew,
  label = "Placeholder label",
  disabled = false,
  route,
}: SidebarItemLayoutProps) => {
  return (
    <Tooltip title={disabled ? "Opção desabilitada" : ""}>
      <AppSidebarItemRoot disabled={disabled} onClick={actionFn}>
        <SidebarItemIconContainer>
          <SvgIcon component={icon} />
        </SidebarItemIconContainer>
        <SidebarItemLabelContainer
          active={
            route &&
            route ===
              window.location.pathname.split("/")[
                window.location.pathname.split("/").length - 1
              ]
              ? true
              : false
          }
        >
          {label}
        </SidebarItemLabelContainer>
      </AppSidebarItemRoot>
    </Tooltip>
  );
};

const AppInfoContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 1px 4px 5px rgba(0, 0, 0, 0.25);
`;

const AppInfoInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const AppInfoRoot = styled.div`
  font-family: "Vollkorn SC", serif;
  color: #5d6d7c;
  width: 80%;
  height: 90%;
`;

const AppInfoHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid #9aa3ac;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 1024px) {
    height: 15%;
  }
`;

const AppInfoHeaderLogoContainer = styled.div`
  width: auto;
  height: auto;

  @media (min-width: 1024px) {
    height: 100%;
  }
`;

const AppInfoHeaderLogoImage = styled.img`
  height: 100%;
  padding: 15px;
`;

const AppInfoHeaderLabelContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 15px 15px 15px 15px;

  @media (min-width: 1024px) {
    margin-left: 15px;
  }
`;

const AppInfoContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const AppInfoRoadmapLabel = styled.div`
  margin-top: 3%;
  margin-bottom: 3%;
  width: 100%;
  text-align: center;
`;

const AppInfoRoadMapContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
  display: flex;
  justify-content: center;
`;

interface AppInfoLayoutProps {
  version?: string;
  branch?: string;
  children: React.ReactNode;
}

export const AppInfoLayout = ({
  branch = "Main",
  version = "v3.1.0-a - alpha release",
  children,
}: AppInfoLayoutProps) => {
  return (
    <AppInfoRoot>
      <AppInfoContainer>
        <AppInfoInnerContainer>
          <AppInfoHeader>
            <AppInfoHeaderLogoContainer>
              <AppInfoHeaderLogoImage src={hefestoLogo} />
            </AppInfoHeaderLogoContainer>
            <AppInfoHeaderLabelContainer>{`Painel administrativo - Atlas Code Dev Hefesto - Version - ${version} - ${branch} Branch`}</AppInfoHeaderLabelContainer>
          </AppInfoHeader>
          <AppInfoContent>
            <AppInfoRoadmapLabel>Mapa de implementações</AppInfoRoadmapLabel>

            <AppInfoRoadMapContainer>{children}</AppInfoRoadMapContainer>
          </AppInfoContent>
        </AppInfoInnerContainer>
      </AppInfoContainer>
    </AppInfoRoot>
  );
};

interface AppsidebarItemProps {
  iconType: IconTypes;
  label: string;
  currentPath: string;
}

export const AppSidebarItem = ({
  iconType,
  label,
  currentPath,
}: AppsidebarItemProps) => {
  const [currentPathActive, setCurrentPathActive] =
    React.useState<boolean>(false);

  const path = getCurrentPath();

  React.useEffect(() => {
    currentPath == path
      ? setCurrentPathActive(true)
      : setCurrentPathActive(false);
  }, [path]);

  return (
    <Link
      style={{ textDecoration: "none", color: "inherit" }}
      to={`/${basePath}/${dashboardPath}/${currentPath}`}
    >
      <AppSidebarItemRoot>
        <AppSidebarItemIconContainer active={currentPathActive}>
          <IconComponent iconType={iconType} clickable />
        </AppSidebarItemIconContainer>
        <AppSidebarItemLabelContainer active={currentPathActive}>
          {label}
        </AppSidebarItemLabelContainer>
      </AppSidebarItemRoot>
    </Link>
  );
};

interface AppLayoutRootProps {
  sidebarItems: DashboardItem[];
  logo: string;
  children: React.ReactNode;
  label: string;
  logoutFn: (...args: any[]) => void;
}

export const AppLayoutRoot = ({
  sidebarItems = [],
  logo,
  children,
  label,
  logoutFn,
}: AppLayoutRootProps) => {
  const [drawerState, setDrawerState] = React.useState<boolean>(false);
  const [profileDialogState, setProfileDialogState] =
    React.useState<boolean>(false);
  const [notificationsAnchorElement, setNotificationsAnchorElement] =
    React.useState<HTMLElement | null>(null);

  const [appInfoState, setAppInfoState] = React.useState<boolean>(false);

  const appInfoToggle = (open: boolean) => {
    setAppInfoState(open);
  };

  const profileToggle = (open: boolean) => {
    setProfileDialogState(open);
  };

  const drawerToggle = (open: boolean) => {
    setDrawerState(open);
  };

  const getNotificationAnchorRef = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchorElement(event.currentTarget);
  };

  const removeNotificationAnchorRef = () => {
    setNotificationsAnchorElement(null);
  };

  const { EnhancedDialog, setCallback, setVisibility } = useEnhancedDialog(
    "Esta ação irá sincronizar os dados presentes em seu banco de dados com sua aplicação/website. Esta ação leva em média 2-3 minutos.",
    "Sincronização de dados",
    "info"
  );

  const dispatch = useAppDispatch();

  const handleForge = () => {
    dispatch(setLoadingTrue());

    axios
      .post(
        "https://us-central1-portalbens-nextjs-hefesto.cloudfunctions.net/api/build/forge"
      )
      .then(() => {
        dispatch(setLoadingFalse());
        dispatch(
          globalNotificationCustom(
            "Processo de sincronização iniciado com sucesso!",
            "success"
          )
        );
      });
  };

  const handleRepositoryDispatchDialog = () => {
    setCallback(() => handleForge());
    setVisibility(true);
  };

  const navigate = useNavigate();

  return (
    <AppLayoutRootContainer>
      <EnhancedDialog />
      <LayoutDrawer
        sidebarItems={sidebarItems}
        logo={logo}
        open={drawerState}
        toggleDrawer={drawerToggle}
      />
      <AppLayoutSidebarContainer>
        <AppSidebarBrandingContainer>
          <AppSidebarBrandingLogoContainer>
            <AppSidebarBrandingImage src={logo} />
          </AppSidebarBrandingLogoContainer>
        </AppSidebarBrandingContainer>

        {sidebarItems.map((item, index: number) => {
          return (
            <AppSidebarItem
              currentPath={item.routerPath}
              iconType={item.sidebarIcon}
              label={item.sidebarLabel}
              key={index}
            />
          );
        })}
        <SidebarItemLayout
          actionFn={() => navigate(`/${basePath}/${dashboardPath}/log`)}
          label="Log administrativo"
          icon={MenuBook}
          route="log"
        />

        <SidebarItemLayout
          actionFn={() => navigate(`/${basePath}/${dashboardPath}/mensagens`)}
          label="Mensagens"
          icon={Phone}
          route="mensagens"
        />

        <div
          style={{
            height: "100%",
          }}
        >
          <div style={{ position: "absolute", bottom: "5%" }}>
            <SidebarItemLayout
              actionFn={() => dispatch(checkAndUpdateExpiredCards() as any)}
              icon={Update}
              label="Checar cartas vencidas"
            />

            <SidebarItemLayout
              actionFn={handleRepositoryDispatchDialog}
              icon={Autorenew}
              label="Atualizar website"
            />
            <SidebarItemLayout disabled icon={Settings} label="Configurações" />

            <SidebarItemLayout
              disabled
              icon={BugReport}
              label="Reportar um bug"
            />
          </div>
        </div>
      </AppLayoutSidebarContainer>
      <AppLayoutSidebarContainerAnchor></AppLayoutSidebarContainerAnchor>

      <AppLayoutMainContainer>
        <AppLayoutUpperbar>
          <AppLayoutBurguerContainer onClick={() => drawerToggle(true)}>
            <SvgIcon component={MenuRounded} />
          </AppLayoutBurguerContainer>

          <Fade in={true} timeout={{ enter: 500, exit: 500 }}>
            <AppLayoutUpperbarLabelContainer id="layout-label">
              {label}
            </AppLayoutUpperbarLabelContainer>
          </Fade>

          <AppLayoutUpperbarIconContainer>
            <div
              style={{ display: "flex" }}
              onClick={(e: React.MouseEvent<HTMLElement>) =>
                getNotificationAnchorRef(e)
              }
            >
              <SvgIcon component={Notifications} />
            </div>
            <SvgIcon onClick={() => appInfoToggle(true)} component={Help} />
            <SvgIcon onClick={() => profileToggle(true)} component={Person} />
          </AppLayoutUpperbarIconContainer>
        </AppLayoutUpperbar>

        <AppLayoutContent>{children}</AppLayoutContent>
      </AppLayoutMainContainer>
      <UserProfile
        logout={logoutFn}
        dialogOpen={profileDialogState}
        toggleDialog={profileToggle}
      />
      <NotificationList
        anchorRef={notificationsAnchorElement}
        handleClose={removeNotificationAnchorRef}
      />
      <AppInfo
        handleCloseFn={() => appInfoToggle(false)}
        isOpen={appInfoState}
      />
    </AppLayoutRootContainer>
  );
};
