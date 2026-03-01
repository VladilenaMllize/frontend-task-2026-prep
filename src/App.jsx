import { Navigate, Route, Routes } from "react-router-dom";
import JobsListPage from "./pages/JobsListPage.jsx";
import JobFormPage from "./pages/JobFormPage.jsx";
import JobDetailsPage from "./pages/JobDetailsPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<JobsListPage />} />
      <Route path="/jobs/new" element={<JobFormPage mode="create" />} />
      <Route path="/jobs/:id" element={<JobDetailsPage />} />
      <Route path="/jobs/:id/edit" element={<JobFormPage mode="edit" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}