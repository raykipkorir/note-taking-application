import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

type LoginRedirectProps = {
  children: JSX.Element;
};

function LoginRedirect({ children }: LoginRedirectProps) {
  const user = useAuth();

  if (user?.token?.access) {
    return <Navigate to="/dashboard" replace={true} />;
  }
  return children;
}

export default LoginRedirect;
