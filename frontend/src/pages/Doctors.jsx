import { useEffect, useState } from "react";
import LoadingState from "../components/ui/LoadingState";
import EmptyState from "../components/ui/EmptyState";
import StatusBadge from "../components/ui/StatusBadge";
import Modal from "../components/ui/Modal";
import { createDoctor, fetchDoctors, updateDoctor } from "../api/healthcareApi";
import { validateDoctor } from "../utils/validators";

const initialFormState = {
  name: "",
  specialization: "",
  availability: "Available"
};

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formValues, setFormValues] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [editValues, setEditValues] = useState(initialFormState);
  const [editErrors, setEditErrors] = useState({});

  useEffect(() => {
    let active = true;

    fetchDoctors().then((data) => {
      if (active) {
        setDoctors(data);
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const handleChange = (field) => (event) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateDoctor(formValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    await createDoctor(formValues);
    setSubmitting(false);

    setDoctors((prev) => [
      ...prev,
      { id: `D-${Date.now()}`, ...formValues }
    ]);
    setFormValues(initialFormState);
    setModalOpen(false);
  };

  const handleEditOpen = (doctor) => {
    setEditTarget(doctor);
    setEditValues({
      name: doctor.name,
      specialization: doctor.specialization,
      availability: doctor.availability
    });
    setEditErrors({});
    setEditOpen(true);
  };

  const handleEditChange = (field) => (event) => {
    setEditValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleEditSave = async () => {
    if (!editTarget) return;

    const validationErrors = validateDoctor(editValues);
    setEditErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    await updateDoctor(editTarget.id, editValues);

    setDoctors((prev) =>
      prev.map((doctor) =>
        doctor.id === editTarget.id ? { ...doctor, ...editValues } : doctor
      )
    );
    setEditOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Doctor Management
          </h3>
          <p className="text-sm text-slate-500">
            Track specialization coverage and availability.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
        >
          Add Doctor
        </button>
      </div>

      {loading ? (
        <LoadingState label="Loading doctor roster..." />
      ) : doctors.length === 0 ? (
        <EmptyState
          title="No doctors available"
          description="Add a doctor to begin scheduling."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {doctor.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {doctor.specialization}
                  </p>
                </div>
                <StatusBadge status={doctor.availability} />
              </div>
              <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-500">
                Next opening: 2:30 PM
              </div>
              <button
                type="button"
                onClick={() => handleEditOpen(doctor)}
                className="mt-4 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Edit Doctor
              </button>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Doctor"
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
              form="doctor-form"
              disabled={submitting}
              className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 disabled:opacity-60"
            >
              {submitting ? "Saving..." : "Save Doctor"}
            </button>
          </div>
        }
      >
        <form id="doctor-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-slate-500">
                Doctor Name
              </label>
              <input
                value={formValues.name}
                onChange={handleChange("name")}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                placeholder="Dr. First Last"
              />
              {errors.name ? (
                <p className="mt-1 text-xs text-rose-600">{errors.name}</p>
              ) : null}
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">
                Specialization
              </label>
              <input
                value={formValues.specialization}
                onChange={handleChange("specialization")}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                placeholder="Cardiology"
              />
              {errors.specialization ? (
                <p className="mt-1 text-xs text-rose-600">
                  {errors.specialization}
                </p>
              ) : null}
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">
                Availability
              </label>
              <select
                value={formValues.availability}
                onChange={handleChange("availability")}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              >
                <option>Available</option>
                <option>Busy</option>
              </select>
              {errors.availability ? (
                <p className="mt-1 text-xs text-rose-600">
                  {errors.availability}
                </p>
              ) : null}
            </div>
          </div>
        </form>
      </Modal>

      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Doctor"
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
              onClick={handleEditSave}
              className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
            >
              Save Changes
            </button>
          </div>
        }
      >
        {editTarget ? (
          <div className="space-y-4">
            <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
              {editTarget.name} · {editTarget.id}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-slate-500">
                  Doctor Name
                </label>
                <input
                  value={editValues.name}
                  onChange={handleEditChange("name")}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                />
                {editErrors.name ? (
                  <p className="mt-1 text-xs text-rose-600">
                    {editErrors.name}
                  </p>
                ) : null}
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">
                  Specialization
                </label>
                <input
                  value={editValues.specialization}
                  onChange={handleEditChange("specialization")}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                />
                {editErrors.specialization ? (
                  <p className="mt-1 text-xs text-rose-600">
                    {editErrors.specialization}
                  </p>
                ) : null}
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">
                  Availability
                </label>
                <select
                  value={editValues.availability}
                  onChange={handleEditChange("availability")}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                >
                  <option>Available</option>
                  <option>Busy</option>
                </select>
                {editErrors.availability ? (
                  <p className="mt-1 text-xs text-rose-600">
                    {editErrors.availability}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default Doctors;
