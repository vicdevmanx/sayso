import { createBrowserRouter } from "react-router-dom";
import App from "../../App.jsx";
import CreatePost from "../../pages/createPost/createPost.jsx";
import Home from "../../pages/home/home.jsx";
import Profile from "../../pages/profile/profile.jsx";
import Fullblog from "@/pages/fullblog/fullblog.jsx";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element:<Home />,
            },
            {
                path: "/createPost",
                element:<CreatePost />,
            },
            {
                path: "/profile",
                element:<Profile />,
            }
        ]
    },
    {
        path: "/post/:id",
        element:<Fullblog />,
    }

])