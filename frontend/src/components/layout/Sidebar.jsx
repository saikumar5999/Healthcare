import { NavLink } from "react-router-dom";

const officeNavItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Patients", to: "/patients" },
  { label: "Appointments", to: "/appointments" },
  { label: "Doctors", to: "/doctors" },
  { label: "Patient Portal", to: "/portal" }
];

const customerNavItems = [
  { label: "Patient Portal", to: "/portal" },
  { label: "Billing", to: "/billing" }
];

const Sidebar = ({ onClinicStatusClick, role }) => {
  const navItems = role === "customer" ? customerNavItems : officeNavItems;
  return (
    <aside className="hidden w-64 flex-col border-r border-slate-100 bg-white p-6 md:flex">
      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          CareFlow
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">
          Health System
        </h1>
      </div>
      <nav className="mt-10 flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-sky-50 text-sky-700"
                  : "text-slate-500 hover:bg-slate-100"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      {role === "office" ? (
        <button
          type="button"
          onClick={onClinicStatusClick}
          className="mt-auto rounded-2xl bg-sky-50 p-4 text-left transition hover:bg-sky-100"
        >
          <p className="text-sm font-semibold text-sky-800">Clinic Status</p>
          <p className="mt-1 text-xs text-slate-500">Tap to view details</p>
        </button>
      ) : (
        <div className="mt-auto rounded-2xl bg-sky-50 p-4">
          <p className="text-sm font-semibold text-sky-800">Support</p>
          <p className="mt-1 text-xs text-slate-500">
            Contact us at (555) 010-9090
          </p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
