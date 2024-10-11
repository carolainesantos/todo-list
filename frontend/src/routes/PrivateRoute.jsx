import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../auth/Context";

const PrivateRoute = () => {
  const { token } = useContext(AuthContext);

  if (token === null) {
    return <Navigate to="/" />;
  }

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
