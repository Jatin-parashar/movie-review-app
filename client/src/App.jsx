import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import Root from "./pages/Root";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import React from "react";
import ShowPage from "./pages/ShowPage";
import ErrorPage from "./pages/ErrorPage";
function App() {
  const router = createBrowserRouter([
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

  return <RouterProvider router={router} />;
}

export default App;
