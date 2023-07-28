import { createBrowserRouter } from "react-router-dom";
import Dashboard from "pages/dashboard";

export const ROOT = "/";

export const router = createBrowserRouter([
  { path: ROOT, element: <Dashboard /> },
]);
