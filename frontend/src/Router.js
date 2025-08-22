import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Detailspage from "./Components/DetailsPage";

const router = createBrowserRouter([
    { path: "/", element: <App/> },
    { path: "/books/:id", element: <Detailspage/> },

]);

export default router;