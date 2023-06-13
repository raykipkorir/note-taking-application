import axios from "axios";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import ErrorPage from "./components/ErrorPage";
import Dashboard from "./layouts/Dashboard";
import RootLayout from "./layouts/RootLayout";
import AddNotePage from "./pages/AddNotePage";
import AllNotesPage from "./pages/AllNotesPage";
import DraftNotesPage from "./pages/DraftNotesPage";
import LoginPage from "./pages/LoginPage";
import NotesDetailPage from "./pages/NotesDetailPage";
import PinnedNotesPage from "./pages/PinnedNotesPage";
import SignupPage from "./pages/SignupPage";
import TrashNotesPage from "./pages/TrashNotesPage";
import authService from "./services/auth.services";
import LoginRedirect from "./utils/LoginRedirect";
import PrivateRoute from "./utils/PrivateRoute";

// const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem("user") || "{}");

const interceptor = axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response.status === 401 &&
      error.response.data.code === "token_not_valid"
    ) {
      const refresh = async () => {
        try {
          const response = await authService.refreshToken();
          user["access"] = response.data.access;
          localStorage.setItem("user", JSON.stringify(user));
          error.config.headers[
            "Authorization"
          ] = `Bearer ${response.data.access}`;
          window.location.reload();
          return axios.request(error.config);
        } catch (error) {
          // navigate("/logout");
          return Promise.reject(error);
        }
      };
      refresh();
    }
    return Promise.reject(error);
  }
);
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <LoginRedirect>
            <LoginPage />
          </LoginRedirect>
        ),
      },
      {
        path: "/signup",
        element: (
          <LoginRedirect>
            <SignupPage />
          </LoginRedirect>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "",
            element: <AllNotesPage />,
          },
          {
            path: ":id",
            element: <NotesDetailPage />,
          },
          {
            path: "new",
            element: <AddNotePage />,
          },
          {
            path: "pinned",
            element: <PinnedNotesPage />,
          },
          {
            path: "draft",
            element: <DraftNotesPage />,
          },
          {
            path: "trash",
            element: <TrashNotesPage />,
          },
        ],
      },
    ],
  },
]);

// const theme = createTheme({
//   typography: {
//     fontFamily: "Maven Pro Caveat",
//   },
// });

function App() {
  return (
    // <ThemeProvider theme={theme}>
    <RouterProvider router={router} />

    // </ThemeProvider>
  );
}

export default App;
