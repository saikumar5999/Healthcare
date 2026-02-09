import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SearchInput from "../components/ui/SearchInput";
import StatusBadge from "../components/ui/StatusBadge";
import LoadingState from "../components/ui/LoadingState";
import EmptyState from "../components/ui/EmptyState";
import { fetchPatients } from "../api/healthcareApi";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

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
    </div>
  );
};

export default Patients;
