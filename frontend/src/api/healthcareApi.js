import sampleData from "../data/sampleData";

const simulateRequest = (payload) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(payload), 600);
  });

export const fetchDashboardSummary = async () => {
  // Placeholder: replace with real API call, e.g. fetch("/api/dashboard").
  return simulateRequest(sampleData.dashboard);
};

export const fetchPatients = async () => {
  return simulateRequest(sampleData.patients);
};

export const fetchAppointments = async () => {
  return simulateRequest(sampleData.appointments);
};

export const fetchDoctors = async () => {
  return simulateRequest(sampleData.doctors);
};

export const fetchPatientDetails = async (id) => {
  // Placeholder: use id when wiring up backend filters.
  return simulateRequest({ ...sampleData.patientDetails, id });
};

export const createAppointment = async (payload) => {
  // Placeholder: swap with POST /api/appointments.
  return simulateRequest({ success: true, payload });
};
