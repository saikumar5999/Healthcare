package org.studyeasy.healthcare.service;

import org.springframework.stereotype.Service;
import org.studyeasy.healthcare.dto.AppointmentRequest;
import org.studyeasy.healthcare.dto.DoctorRequest;
import org.studyeasy.healthcare.dto.PatientUpdateRequest;
import org.studyeasy.healthcare.model.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class InMemoryDataService {
    private final List<Patient> patients = new ArrayList<>();
    private final List<Appointment> appointments = new ArrayList<>();
    private final List<Doctor> doctors = new ArrayList<>();
    private final List<NotificationItem> notifications = new ArrayList<>();
    private final List<ReportItem> reports = new ArrayList<>();
    private final List<BillingItem> billingItems = new ArrayList<>();
    private PatientDetails patientDetails;
    private ClinicStatus clinicStatus;
    private DashboardSummary dashboardSummary;

    public InMemoryDataService() {
        patients.add(new Patient("P-1001", "Avery Coleman", 35, "Female", "(555) 014-2211", "Active"));
        patients.add(new Patient("P-1002", "Noah Bennett", 42, "Male", "(555) 014-7782", "Critical"));
        patients.add(new Patient("P-1003", "Layla Khan", 29, "Female", "(555) 019-3021", "Discharged"));
        patients.add(new Patient("P-1004", "Caleb Tran", 51, "Male", "(555) 010-4491", "Active"));

        appointments.add(new Appointment("A-9001", "2026-02-10", "09:00", "Avery Coleman", "Dr. Reyna Ortiz", "Confirmed"));
        appointments.add(new Appointment("A-9002", "2026-02-10", "10:30", "Noah Bennett", "Dr. Liam Park", "Pending"));
        appointments.add(new Appointment("A-9003", "2026-02-10", "13:15", "Layla Khan", "Dr. Anika Shah", "Completed"));

        doctors.add(new Doctor("D-501", "Dr. Reyna Ortiz", "Cardiology", "Available"));
        doctors.add(new Doctor("D-502", "Dr. Liam Park", "Internal Medicine", "Busy"));
        doctors.add(new Doctor("D-503", "Dr. Anika Shah", "Pediatrics", "Available"));

        notifications.add(new NotificationItem("N-301", "Lab results ready",
                "CBC results available for Avery Coleman.", "10 mins ago", "Lab"));
        notifications.add(new NotificationItem("N-302", "Appointment confirmed",
                "Noah Bennett confirmed 10:30 AM slot.", "45 mins ago", "Appointments"));
        notifications.add(new NotificationItem("N-303", "Doctor on duty",
                "Dr. Anika Shah checked in.", "1 hour ago", "Staff"));

        reports.add(new ReportItem("R-2101", "CBC Panel", "2026-01-12", "Available"));
        reports.add(new ReportItem("R-2102", "X-Ray Chest", "2026-01-08", "Reviewed"));

        billingItems.add(new BillingItem("B-4401", "Cardiology Consultation", 220, "2026-01-05", "Due"));
        billingItems.add(new BillingItem("B-4402", "Lab Work - CBC", 80, "2026-01-12", "Paid"));
        billingItems.add(new BillingItem("B-4403", "Radiology - X-Ray", 140, "2026-01-20", "Overdue"));

        patientDetails = new PatientDetails(
                "P-1001",
                "Avery Coleman",
                35,
                "Female",
                "(555) 014-2211",
                "O+",
                "Penicillin",
                List.of("2019: Hypertension - ongoing monitoring", "2022: Minor surgery - appendectomy"),
                List.of("Lisinopril 10mg - daily", "Vitamin D 1000 IU - daily"),
                List.of("2025-12-18: CBC - normal", "2026-01-12: Lipid panel - borderline")
        );

        clinicStatus = new ClinicStatus(
                6,
                42,
                "Moderate",
                List.of("Radiology queue at 12 patients", "Two critical cases in ER", "Pediatrics coverage extended to 9 PM")
        );

        dashboardSummary = new DashboardSummary(
                2480,
                84,
                36,
                List.of(
                        new VisitTrend("Mon", 120),
                        new VisitTrend("Tue", 98),
                        new VisitTrend("Wed", 150),
                        new VisitTrend("Thu", 140),
                        new VisitTrend("Fri", 170)
                )
        );
    }

    public DashboardSummary getDashboardSummary() {
        return dashboardSummary;
    }

    public List<Patient> getPatients() {
        return patients;
    }

    public Optional<PatientDetails> getPatientDetails(String id) {
        if (patientDetails != null && patientDetails.getId().equals(id)) {
            return Optional.of(patientDetails);
        }
        return Optional.empty();
    }

    public Optional<Patient> updatePatient(String id, PatientUpdateRequest request) {
        for (Patient patient : patients) {
            if (patient.getId().equals(id)) {
                patient.setContact(request.getContact());
                patient.setStatus(request.getStatus());
                return Optional.of(patient);
            }
        }
        return Optional.empty();
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public Appointment createAppointment(AppointmentRequest request) {
        String id = "A-" + UUID.randomUUID().toString().substring(0, 6);
        Appointment appointment = new Appointment(
                id,
                request.getDate(),
                request.getTime(),
                request.getPatient(),
                request.getDoctor(),
                request.getStatus()
        );
        appointments.add(appointment);
        return appointment;
    }

    public Optional<Appointment> updateAppointmentStatus(String id, String status) {
        for (Appointment appointment : appointments) {
            if (appointment.getId().equals(id)) {
                appointment.setStatus(status);
                return Optional.of(appointment);
            }
        }
        return Optional.empty();
    }

    public List<Doctor> getDoctors() {
        return doctors;
    }

    public Doctor createDoctor(DoctorRequest request) {
        String id = "D-" + UUID.randomUUID().toString().substring(0, 6);
        Doctor doctor = new Doctor(id, request.getName(), request.getSpecialization(), request.getAvailability());
        doctors.add(doctor);
        return doctor;
    }

    public Optional<Doctor> updateDoctor(String id, DoctorRequest request) {
        for (Doctor doctor : doctors) {
            if (doctor.getId().equals(id)) {
                doctor.setName(request.getName());
                doctor.setSpecialization(request.getSpecialization());
                doctor.setAvailability(request.getAvailability());
                return Optional.of(doctor);
            }
        }
        return Optional.empty();
    }

    public List<NotificationItem> getNotifications() {
        return notifications;
    }

    public ClinicStatus getClinicStatus() {
        return clinicStatus;
    }

    public List<ReportItem> getReports() {
        return reports;
    }

    public List<BillingItem> getBillingItems() {
        return billingItems;
    }

    public Optional<BillingItem> payBill(String billId) {
        for (BillingItem item : billingItems) {
            if (item.getId().equals(billId)) {
                item.setStatus("Paid");
                return Optional.of(item);
            }
        }
        return Optional.empty();
    }
}
