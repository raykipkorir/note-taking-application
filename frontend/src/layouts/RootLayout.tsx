import { Outlet } from "react-router";
// import Footer from "../components/Footer";
import Header from "../components/Header";

function RootLayout() {
  return (
    <div>
      {/* <Header /> */}
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}

export default RootLayout;
