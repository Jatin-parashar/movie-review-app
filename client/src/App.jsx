import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import Root from "./pages/Root";
import MoviePage from "./pages/MoviePage";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <h1>Error has occured</h1>,
      children: [
        {
          path: "/" || "/movies" || "tv",
          element: <Home />,
        },
        {
          path: "/movie/:id",
          element: <MoviePage />,
        },
        {
          path: "/profile/userProfileId",
          element: <Profile />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
