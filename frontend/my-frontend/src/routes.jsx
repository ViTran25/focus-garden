import App from "./App.jsx";
import DefaultProfile from "./pages/DefaultProfile.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Task from "./pages/Tasks.jsx";
import Pomodoro from "./pages/Pomodoro.jsx";
import ProtectedRoutes from "./pages/ProtectedRoutes.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <DefaultProfile /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      {
        element: <ProtectedRoutes />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "tasks", element: <Task /> },
          { path: "pomodoro", element: <Pomodoro /> },
        ],
      },
    ],
  },
];

export default routes;
