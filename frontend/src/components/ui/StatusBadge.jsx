const statusStyles = {
  Available: "bg-emerald-100 text-emerald-700",
  Busy: "bg-amber-100 text-amber-700",
  Active: "bg-emerald-100 text-emerald-700",
  Critical: "bg-rose-100 text-rose-700",
  Discharged: "bg-slate-100 text-slate-600",
  Confirmed: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Completed: "bg-sky-100 text-sky-700",
  Paid: "bg-emerald-100 text-emerald-700",
  Due: "bg-amber-100 text-amber-700",
  Overdue: "bg-rose-100 text-rose-700",
  Reviewed: "bg-slate-100 text-slate-600",
  Available: "bg-sky-100 text-sky-700"
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        statusStyles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
