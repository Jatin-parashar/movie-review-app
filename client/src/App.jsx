import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import React from "react";
import ShowPage from "./pages/ShowPage";
import ErrorPage from "./pages/ErrorPage";
// import ProtectedRoute from "./pages/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import Display from "./pages/Display";
import { UserAuthContextProvider } from "./store/UserAuthContextProvider";

function App() {
  const router = createBrowserRouter([
    // {
    //   path: "/home",
    //   element: (
    //     <ProtectedRoute>
    //       <Display />
    //     </ProtectedRoute>
    //   ),
    // },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        // {
        //   path: "/movie",
        //   element: <Home />,
        // },
        // {
        //   path: "/tv",
        //   element: <Home />,
        // },
        {
          path: "/:type/:id",
          element: <ShowPage />,
        },
        {
          path: "/profile/:userProfileId",
          element: <Profile />,
        },
      ],
    },
  ]);

  return (
          <UserAuthContextProvider>
            <RouterProvider router={router} />
          </UserAuthContextProvider>
        
  );
}

export default App;
