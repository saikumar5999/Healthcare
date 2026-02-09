import { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import LoadingState from "../components/ui/LoadingState";
import { fetchDashboardSummary } from "../api/healthcareApi";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetchDashboardSummary().then((data) => {
      if (active) {
        setSummary(data);
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <LoadingState label="Loading dashboard insights..." />;
  }

  if (!summary) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
        <p className="text-sm text-slate-500">No dashboard data available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <Card
          title="Total Patients"
          value={summary.totalPatients}
          subtitle="Across all active departments"
          accent="bg-white"
        />
        <Card
          title="Today's Appointments"
          value={summary.todaysAppointments}
          subtitle="Scheduled visits"
          accent="bg-white"
        />
        <Card
          title="Doctors On Duty"
          value={summary.doctorsOnDuty}
          subtitle="Available for consultations"
          accent="bg-white"
        />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-700">
              Patient Visits
            </p>
            <p className="text-xs text-slate-500">
              Weekly footfall trend (placeholder)
            </p>
          </div>
          <div className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
            Last 5 days
          </div>
        </div>
        <div className="mt-6 grid grid-cols-5 gap-4">
          {summary.visitTrends.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2">
              <div className="flex h-32 w-8 items-end justify-center rounded-full bg-slate-100">
                <div
                  className="w-full rounded-full bg-sky-400"
                  style={{ height: `${item.value / 2}px` }}
                />
              </div>
              <span className="text-xs font-semibold text-slate-500">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
