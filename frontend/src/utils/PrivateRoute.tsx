import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps) {
  const user = useAuth();

  if (user?.token?.access) {
    return children;
  }
  return <Navigate to="/" replace={true} />;
}

export default PrivateRoute;
