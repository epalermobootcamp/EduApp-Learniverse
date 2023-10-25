
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css"
import './style/general.css';

import App from './App.jsx';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
// import Language from './pages/Language';
import Math from './pages/Math';
import Animal from './pages/Animal';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/Profile",
        element: <Profile />,
      },
      // {
      //   path: '/spellGame',
      //   element: <Language />
      // },
      {
        path: "/diceGame",
        element: <Math />,
      },
      {
        path: "/concentrationGame",
        element: <Animal />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
