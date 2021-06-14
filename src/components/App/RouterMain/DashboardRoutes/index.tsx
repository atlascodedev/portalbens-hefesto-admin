import { RouteComponentProps, Router, useNavigate } from "@reach/router";
import React from "react";
import HadesLayout from "../../../../layout";
import AdminRoute from "../AdminRoute";
import {
  collections,
  DataCreationItem,
} from "../../../../config/collections.config";
import AdonisGallery from "../../AdonisGallery";
import Toolbox from "../../Toolbox";
import ColorPicker from "../../ColorPicker";
import CategoryDialog from "../../CategoryDialog";
import EntryCreation from "../../../DataCreation/DraftEntry";
import EntryView from "../../../DataCreation/EntryView";
import AppLayout from "../../../../layout_v2/Main";
import ProtectedRoute from "../../../Util/ProtectedRoute";
import MaterialTableCustom from "../../../Util/MaterialTable";
import ExportCards from "../../ExportCards";

interface Props extends RouteComponentProps {}

const DashboardRoutes = ({ location, navigate, path, uri }: Props) => {
  return (
    <div>
      <AdonisGallery />
      <Toolbox />
      <ColorPicker />
      <ExportCards />
      <CategoryDialog />
      <EntryCreation />
      <EntryView />
      <AppLayout>
        <Router id="dashboardContent">
          {collections.map(
            (dataCreationItem: DataCreationItem, index: number) => {
              return (
                <AdminRoute
                  key={index}
                  dashboardItemID={dataCreationItem.itemID}
                  dashboardItemType={dataCreationItem.itemCategory}
                  path={dataCreationItem.routerPath}
                />
              );
            }
          )}
          <ProtectedRoute
            component={
              <div style={{ padding: "3%", paddingTop: "7%" }}>
                <MaterialTableCustom
                  collectionName="Registro"
                  collectionRef="log"
                  columns={[
                    { field: "user", title: "Usuário" },
                    { field: "collection", title: "Recurso" },
                    { field: "uuid", title: "ID do recurso" },
                    { field: "actionType", title: "Tipo de ação" },
                  ]}
                />
              </div>
            }
            path={"log"}
          ></ProtectedRoute>
          <ProtectedRoute
            component={
              <div style={{ padding: "3%", paddingTop: "7%" }}>
                <MaterialTableCustom
                  collectionName="Mensagem"
                  collectionRef="messages"
                  columns={[
                    { field: "email", title: "E-mail" },
                    { field: "name", title: "Nome" },
                    { field: "uuid", title: "ID do recurso", hidden: true },
                    { field: "message", title: "Mensagem" },
                  ]}
                />
              </div>
            }
            path={"mensagens"}
          ></ProtectedRoute>
        </Router>
      </AppLayout>
    </div>
  );
};

export default DashboardRoutes;
