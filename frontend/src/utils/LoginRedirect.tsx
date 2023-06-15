import { Navigate } from "react-router-dom";

type LoginRedirectProps = {
  children: JSX.Element;
};

function LoginRedirect({ children }: LoginRedirectProps) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user.access) {
    return <Navigate to="/dashboard" replace={true} />;
  }
  return children;
}

export default LoginRedirect;
