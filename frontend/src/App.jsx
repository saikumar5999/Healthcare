import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import Doctors from "./pages/Doctors";
import PatientDetails from "./pages/PatientDetails";
import PatientPortal from "./pages/PatientPortal";
import Billing from "./pages/Billing";
import Login from "./pages/Login";
import NotAuthorized from "./pages/NotAuthorized";
import ProtectedRoute from "./auth/ProtectedRoute";
import { useAuth } from "./auth/AuthContext";

const App = () => {
  const HomeRedirect = () => {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" replace />;
    return (
      <Navigate
        to={user.role === "customer" ? "/portal" : "/dashboard"}
        replace
      />
    );
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<NotAuthorized />} />
      <Route element={<ProtectedRoute allowedRoles={["office", "customer"]} />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomeRedirect />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["office"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients"
            element={
              <ProtectedRoute allowedRoles={["office"]}>
                <Patients />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients/:id"
            element={
              <ProtectedRoute allowedRoles={["office"]}>
                <PatientDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute allowedRoles={["office"]}>
                <Appointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctors"
            element={
              <ProtectedRoute allowedRoles={["office"]}>
                <Doctors />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portal"
            element={
              <ProtectedRoute allowedRoles={["office", "customer"]}>
                <PatientPortal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/billing"
            element={
              <ProtectedRoute allowedRoles={["office", "customer"]}>
                <Billing />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
