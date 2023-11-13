import { jwtDecode } from "jwt-decode";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { axiosInstance } from "./api/axios";
import authService from "./api/services/auth.services";
import "./App.css";
import ErrorPage from "./components/ErrorPage";
import useAuth from "./hooks/useAuth";
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
import UpdateNotePage from "./pages/UpdateNotePage";
import LoginRedirect from "./utils/LoginRedirect";
import PrivateRoute from "./utils/PrivateRoute";

// export const interceptor = axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (
//       error.response.status === 401 &&
//       error.response.data.code === "token_not_valid"
//     ) {
//       const refresh = async () => {
//         try {
//           const response = await authService.refreshToken();
//           user["access"] = response.data.access;
//           localStorage.setItem("user", JSON.stringify(user));
//           error.config.headers[
//             "Authorization"
//           ] = `Bearer ${response.data.access}`;
//           window.location.reload();
//           return axios.request(error.config);
//         } catch (error) {
//           // navigate("/logout");
//           return Promise.reject(error);
//         }
//       };
//       refresh();
//     }
//     return Promise.reject(error);
//   }
// );
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
            path: ":id/update",
            element: <UpdateNotePage />,
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

function App() {
  const user = useAuth();

  axiosInstance.interceptors.request.use(
    (config) => {
      // check for expiry to request for refresh token
      if (user?.token) {
        const { exp } = jwtDecode(user?.token?.access);
        if (exp) {
          const isAccessTokenExpired = Date.now() / 1000 > exp;
          if (isAccessTokenExpired) {
            const newAccessToken = async () => {
              const response = await authService.refreshToken(
                user?.token?.refresh
              );
              if (response.status === 200) {
                // changes to be made
                localStorage.setItem("token", JSON.stringify(response.data));
                // user.setAuthToken(response.data);
                window.location.reload();
              }
            };
            newAccessToken();
          } else {
            config.headers["Authorization"] = `Bearer ${user?.token.access}`;
          }
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return <RouterProvider router={router} />;
}

export default App;
