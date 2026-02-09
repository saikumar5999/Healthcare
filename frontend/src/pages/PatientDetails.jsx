import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tabs from "../components/ui/Tabs";
import LoadingState from "../components/ui/LoadingState";
import EmptyState from "../components/ui/EmptyState";
import StatusBadge from "../components/ui/StatusBadge";
import { fetchPatientDetails } from "../api/healthcareApi";

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("history");

  useEffect(() => {
    let active = true;

    fetchPatientDetails(id).then((data) => {
      if (active) {
        setPatient(data);
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return <LoadingState label="Loading patient profile..." />;
  }

  if (!patient) {
    return (
      <EmptyState
        title="Patient not found"
        description="The requested record could not be located."
      />
    );
  }

  const tabs = [
    { id: "history", label: "Medical History" },
    { id: "prescriptions", label: "Prescriptions" },
    { id: "labs", label: "Lab Reports" }
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Patient Profile
            </p>
            <h3 className="text-2xl font-semibold text-slate-900">
              {patient.name}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              ID: {patient.id} · {patient.gender}, {patient.age} yrs
            </p>
          </div>
          <StatusBadge status="Active" />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-500">Contact</p>
            <p className="mt-2 text-sm text-slate-700">{patient.contact}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-500">Blood Type</p>
            <p className="mt-2 text-sm text-slate-700">{patient.bloodType}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-500">Allergies</p>
            <p className="mt-2 text-sm text-slate-700">{patient.allergies}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        <div className="mt-6 space-y-3">
          {activeTab === "history" &&
            patient.medicalHistory.map((entry) => (
              <div
                key={entry}
                className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600"
              >
                {entry}
              </div>
            ))}
          {activeTab === "prescriptions" &&
            patient.prescriptions.map((entry) => (
              <div
                key={entry}
                className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600"
              >
                {entry}
              </div>
            ))}
          {activeTab === "labs" &&
            patient.labReports.map((entry) => (
              <div
                key={entry}
                className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600"
              >
                {entry}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
