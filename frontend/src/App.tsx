import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ErrorPage from "./components/ErrorPage";
import Dashboard from "./layouts/Dashboard";
import RootLayout from "./layouts/RootLayout";
import AddNotePage from "./pages/AddNotePage";
import AllNotesPage from "./pages/AllNotesPage";
import DraftNotesPage from "./pages/DraftNotesPage";
import LoginPage from "./pages/LoginPage";
import PinnedNotesPage from "./pages/PinnedNotesPage";
import SignupPage from "./pages/SignupPage";
import TrashNotesPage from "./pages/TrashNotesPage";
import LoginRedirect from "./utils/LoginRedirect";
import PrivateRoute from "./utils/PrivateRoute";
import NotesDetailPage from "./pages/NotesDetailPage";
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
