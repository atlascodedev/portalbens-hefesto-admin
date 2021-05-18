import { Redirect, RouteComponentProps } from "@reach/router";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { loginRedirect } from "../../../config/routes.config";
import { RootState } from "../../../redux";

interface Props extends ProtectedRouteProps, RouteComponentProps {
  onMount?: (...args: any[]) => void;
  Component: React.FC<any> | JSX.Element;
}

const ProtectedRoute: React.FC<Props> = ({ onMount, children, auth }) => {
  React.useEffect(() => {
    if (onMount) {
      onMount();
    }
  }, [onMount]);

  return (
    <React.Fragment>
      {auth ? { children } : <Redirect noThrow to={`/${loginRedirect}`} />}
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth.isAuth,
});

const mapDispatchToProps = {};

const protectedRouteConnector = connect(mapStateToProps, mapDispatchToProps);

type ProtectedRouteProps = ConnectedProps<typeof protectedRouteConnector>;

export default protectedRouteConnector(ProtectedRoute);
