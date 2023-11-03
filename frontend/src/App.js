import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Create from "./pages/Create.js";
import LoginScreen from "./pages/LoginScreen.js";
import Landing from "./pages/Landing.js";
import CreateProject from "./pages/CreateProject.js";
import JoinProject from "./pages/JoinProject.js";
const App = () => {
  
  //add new pages here
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginScreen />,
    },
    {
      path: "create-user",
      element: <Create />,
    },
    {
      path: "landing",
      element: <Landing />,
    },
    {
      path: "create-project",
      element: <CreateProject />,
    },
    {
      path: "join-project",
      element: <JoinProject />,
    },
  ])
  return (

    <RouterProvider router={router} />
  );
};

export default App;
