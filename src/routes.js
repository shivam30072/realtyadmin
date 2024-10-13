import BulkUploadFiles from "./pages/BulkUploadFiles";
import Dashboard from "./pages/Dashboard";
import GetProperties from "./pages/GetProperties";

export const routes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/bulk-upload-files",
    element: <BulkUploadFiles />,
  },
  {
    path: "/all-properties",
    element: <GetProperties />,
  },
];
