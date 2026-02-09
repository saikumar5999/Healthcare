import { useEffect, useMemo, useState } from "react";
import LoadingState from "../components/ui/LoadingState";
import EmptyState from "../components/ui/EmptyState";
import Modal from "../components/ui/Modal";
import StatusBadge from "../components/ui/StatusBadge";
import SearchInput from "../components/ui/SearchInput";
import {
  createAppointment,
  fetchAppointments,
  fetchPortalReports,
  updateAppointmentStatus
} from "../api/healthcareApi";
import {
  validateAppointment,
  validateAppointmentStatus
} from "../utils/validators";

const initialFormState = {
  patient: "",
  doctor: "",
  date: "",
  time: "",
  status: "Pending"
};

const PatientPortal = () => {
  const [appointments, setAppointments] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [formValues, setFormValues] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [editErrors, setEditErrors] = useState({});

  useEffect(() => {
    let active = true;

    fetchAppointments().then((data) => {
      if (active) {
        setAppointments(data);
        setLoading(false);
      }
    });

    fetchPortalReports().then((data) => {
      if (active) {
        setReports(data);
        setReportsLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) =>
      appointment.patient.toLowerCase().includes(search.toLowerCase())
    );
  }, [appointments, search]);

  const handleChange = (field) => (event) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateAppointment(formValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    await createAppointment(formValues);
    setSubmitting(false);

    setAppointments((prev) => [
      ...prev,
      { id: `A-${Date.now()}`, ...formValues }
    ]);
    setFormValues(initialFormState);
    setModalOpen(false);
  };

  const handleEditOpen = (appointment) => {
    setEditTarget(appointment);
    setEditStatus(appointment.status);
    setEditErrors({});
    setEditOpen(true);
  };

  const handleStatusSave = async () => {
    if (!editTarget) return;

    const validationErrors = validateAppointmentStatus(editStatus);
    setEditErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    await updateAppointmentStatus(editTarget.id, editStatus);

    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === editTarget.id
          ? { ...appointment, status: editStatus }
          : appointment
      )
    );
    setEditOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Patient Portal
          </h3>
          <p className="text-sm text-slate-500">
            Schedule, view, and manage your appointments and reports.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
        >
          Schedule Appointment
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-700">
              Upcoming Appointments
            </p>
            <p className="text-xs text-slate-500">
              Search by patient name to filter results.
            </p>
          </div>
          <div className="w-full md:w-72">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search appointments"
            />
          </div>
        </div>

        <div className="mt-5">
          {loading ? (
            <LoadingState label="Loading appointments..." />
          ) : filteredAppointments.length === 0 ? (
            <EmptyState
              title="No appointments found"
              description="Schedule your first appointment."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Doctor</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment) => (
                    <tr
                      key={appointment.id}
                      className="border-t border-slate-100"
                    >
                      <td className="px-4 py-3">{appointment.date}</td>
                      <td className="px-4 py-3">{appointment.time}</td>
                      <td className="px-4 py-3">{appointment.doctor}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={appointment.status} />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => handleEditOpen(appointment)}
                          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                        >
                          Change Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <p className="text-sm font-semibold text-slate-700">Lab Reports</p>
          <p className="text-xs text-slate-500">
            Access your most recent reports.
          </p>
        </div>
        <div className="mt-4 space-y-3">
          {reportsLoading ? (
            <LoadingState label="Loading reports..." />
          ) : reports.length === 0 ? (
            <EmptyState
              title="No reports available"
              description="New reports will appear here once ready."
            />
          ) : (
            reports.map((report) => (
              <div
                key={report.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    {report.title}
                  </p>
                  <p className="text-xs text-slate-500">
                    {report.date} · {report.id}
                  </p>
                </div>
                <StatusBadge status={report.status} />
              </div>
            ))
          )}
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Schedule Appointment"
        footer={
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="portal-appointment-form"
              disabled={submitting}
              className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 disabled:opacity-60"
            >
              {submitting ? "Saving..." : "Schedule"}
            </button>
          </div>
        }
      >
        <form
          id="portal-appointment-form"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-slate-500">
                Patient Name
              </label>
              <input
                value={formValues.patient}
                onChange={handleChange("patient")}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                placeholder="Enter patient name"
              />
              {errors.patient ? (
                <p className="mt-1 text-xs text-rose-600">{errors.patient}</p>
              ) : null}
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">
                Doctor
              </label>
              <input
                value={formValues.doctor}
                onChange={handleChange("doctor")}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                placeholder="Preferred doctor"
              />
              {errors.doctor ? (
                <p className="mt-1 text-xs text-rose-600">{errors.doctor}</p>
              ) : null}
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">
                Date
              </label>
              <input
                type="date"
                value={formValues.date}
                onChange={handleChange("date")}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
              {errors.date ? (
                <p className="mt-1 text-xs text-rose-600">{errors.date}</p>
              ) : null}
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">
                Time
              </label>
              <input
                type="time"
                value={formValues.time}
                onChange={handleChange("time")}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
              {errors.time ? (
                <p className="mt-1 text-xs text-rose-600">{errors.time}</p>
              ) : null}
            </div>
          </div>
        </form>
      </Modal>

      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Change Appointment Status"
        footer={
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditOpen(false)}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleStatusSave}
              className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
            >
              Save Status
            </button>
          </div>
        }
      >
        {editTarget ? (
          <div className="space-y-4">
            <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
              {editTarget.doctor} · {editTarget.date} at {editTarget.time}
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">
                Status
              </label>
              <select
                value={editStatus}
                onChange={(event) => setEditStatus(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              >
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Completed</option>
              </select>
              {editErrors.status ? (
                <p className="mt-1 text-xs text-rose-600">
                  {editErrors.status}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default PatientPortal;
