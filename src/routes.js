import BulkUploadFiles from "./pages/BulkUploadFiles";
import Dashboard from "./pages/Dashboard";

export const routes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/bulk-upload-files",
    element: <BulkUploadFiles />,
  },
];
