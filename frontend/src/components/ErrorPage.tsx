import { Link, useRouteError } from "react-router-dom";
import Navbar from "./Navbar";

function ErrorPage() {
  const error: any = useRouteError();

  return (
    <>
      <Navbar />
      <h1>Oops!</h1>
      <p>An unexpected error occurred</p>
      <p>{error.statusText || error.message}</p>
      <p>
        Go to <Link to={"/"}>Homepage</Link>
      </p>
    </>
  );
}

export default ErrorPage;
