import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user.access) {
    return children;
  }
  return <Navigate to="/" replace={true} />;
}

export default PrivateRoute;
