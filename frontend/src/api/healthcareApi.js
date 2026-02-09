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

export const fetchNotifications = async () => {
  return simulateRequest(sampleData.notifications || []);
};

export const fetchClinicStatus = async () => {
  return simulateRequest(sampleData.clinicStatus);
};

export const createAppointment = async (payload) => {
  // Placeholder: swap with POST /api/appointments.
  return simulateRequest({ success: true, payload });
};

export const updateAppointmentStatus = async (id, status) => {
  // Placeholder: swap with PATCH /api/appointments/:id.
  return simulateRequest({ success: true, id, status });
};

export const updatePatient = async (id, payload) => {
  // Placeholder: swap with PATCH /api/patients/:id.
  return simulateRequest({ success: true, id, payload });
};

export const fetchPortalReports = async () => {
  return simulateRequest(sampleData.portalReports || []);
};

export const fetchBilling = async () => {
  return simulateRequest(sampleData.billing || []);
};

export const payBill = async (payload) => {
  // Placeholder: swap with POST /api/billing/pay.
  return simulateRequest({ success: true, payload });
};

export const createDoctor = async (payload) => {
  // Placeholder: swap with POST /api/doctors.
  return simulateRequest({ success: true, payload });
};

export const updateDoctor = async (id, payload) => {
  // Placeholder: swap with PATCH /api/doctors/:id.
  return simulateRequest({ success: true, id, payload });
};
