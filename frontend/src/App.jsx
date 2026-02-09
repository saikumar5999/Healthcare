import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import Doctors from "./pages/Doctors";
import PatientDetails from "./pages/PatientDetails";

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/:id" element={<PatientDetails />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
