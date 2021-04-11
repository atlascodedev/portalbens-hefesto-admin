import { navigate, RouteComponentProps, useNavigate } from "@reach/router";
import React from "react";
import { loginRedirect, startingPath } from "../../../config/routes.config";

interface Props extends RouteComponentProps {}

const NotFoundRoute = ({}: Props) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigate(`/${loginRedirect}`, { state: {}, replace: false });
    }, 5000);
  }, []);

  return (
    <div>
      This route does not exists, route not found. You will be redirect in 5
      seconds
    </div>
  );
};

export default NotFoundRoute;
