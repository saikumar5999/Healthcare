export const validateAppointment = (formValues) => {
  const errors = {};

  // Placeholder: replace with schema validation (Yup/Zod) when available.
  if (!formValues.patient) errors.patient = "Patient name is required.";
  if (!formValues.doctor) errors.doctor = "Doctor name is required.";
  if (!formValues.date) errors.date = "Date is required.";
  if (!formValues.time) errors.time = "Time is required.";

  return errors;
};
