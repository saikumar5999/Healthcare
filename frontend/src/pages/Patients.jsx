import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SearchInput from "../components/ui/SearchInput";
import StatusBadge from "../components/ui/StatusBadge";
import LoadingState from "../components/ui/LoadingState";
import EmptyState from "../components/ui/EmptyState";
import Modal from "../components/ui/Modal";
import { fetchPatients, updatePatient } from "../api/healthcareApi";
import { validatePatientUpdate } from "../utils/validators";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editOpen, setEditOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [editValues, setEditValues] = useState({ contact: "", status: "" });
  const [editErrors, setEditErrors] = useState({});

  useEffect(() => {
    let active = true;

    fetchPatients().then((data) => {
      if (active) {
        setPatients(data);
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesName = patient.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || patient.status === statusFilter;
      return matchesName && matchesStatus;
    });
  }, [patients, search, statusFilter]);

  const handleEditOpen = (patient) => {
    setEditTarget(patient);
    setEditValues({ contact: patient.contact, status: patient.status });
    setEditErrors({});
    setEditOpen(true);
  };

  const handleEditChange = (field) => (event) => {
    setEditValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleEditSave = async () => {
    if (!editTarget) return;

    const validationErrors = validatePatientUpdate(editValues);
    setEditErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    await updatePatient(editTarget.id, editValues);

    setPatients((prev) =>
      prev.map((patient) =>
        patient.id === editTarget.id
          ? { ...patient, ...editValues }
          : patient
      )
    );
    setEditOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Patient Management
          </h3>
          <p className="text-sm text-slate-500">
            Search and manage patient profiles.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by patient name"
          />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm"
          >
            <option>All</option>
            <option>Active</option>
            <option>Critical</option>
            <option>Discharged</option>
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingState label="Loading patient list..." />
      ) : filteredPatients.length === 0 ? (
        <EmptyState
          title="No patients found"
          description="Try adjusting search or filters to see more results."
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Patient ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Age</th>
                  <th className="px-4 py-3">Gender</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="border-t border-slate-100"
                  >
                    <td className="px-4 py-3 font-semibold text-slate-700">
                      {patient.id}
                    </td>
                    <td className="px-4 py-3">{patient.name}</td>
                    <td className="px-4 py-3">{patient.age}</td>
                    <td className="px-4 py-3">{patient.gender}</td>
                    <td className="px-4 py-3">{patient.contact}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={patient.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/patients/${patient.id}`}
                          className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700"
                        >
                          View
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleEditOpen(patient)}
                          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Patient"
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
            <div>
              <label className="text-xs font-semibold text-slate-500">
                Contact
              </label>
              <input
                value={editValues.contact}
                onChange={handleEditChange("contact")}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                placeholder="Phone or email"
              />
              {editErrors.contact ? (
                <p className="mt-1 text-xs text-rose-600">
                  {editErrors.contact}
                </p>
              ) : null}
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">
                Status
              </label>
              <select
                value={editValues.status}
                onChange={handleEditChange("status")}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              >
                <option>Active</option>
                <option>Critical</option>
                <option>Discharged</option>
              </select>
              {editErrors.status ? (
                <p className="mt-1 text-xs text-rose-600">
                  {editErrors.status}
                </p>
              ) : null}
            </div>
            <p className="text-xs text-slate-400">
              Patient updates will sync once the backend is connected.
            </p>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default Patients;
