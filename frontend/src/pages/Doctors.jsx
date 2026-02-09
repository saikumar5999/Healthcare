import { useEffect, useState } from "react";
import LoadingState from "../components/ui/LoadingState";
import EmptyState from "../components/ui/EmptyState";
import StatusBadge from "../components/ui/StatusBadge";
import { fetchDoctors } from "../api/healthcareApi";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          Doctor Management
        </h3>
        <p className="text-sm text-slate-500">
          Track specialization coverage and availability.
        </p>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Doctors;
