const Topbar = ({
  onNotificationsClick,
  notificationCount,
  onLogout,
  user
}) => {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white px-6 py-4 shadow-sm">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          Healthcare Management
        </p>
        <h2 className="text-xl font-semibold text-slate-900">
          {user?.role === "customer"
            ? "Welcome to Your Care Portal"
            : "Patient Operations Overview"}
        </h2>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
          {user?.role === "customer" ? "Customer Access" : "Shift: Morning"}
        </div>
        {user?.role === "office" ? (
          <button
            type="button"
            onClick={onNotificationsClick}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Notifications
            {notificationCount > 0 ? (
              <span className="ml-2 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-700">
                {notificationCount}
              </span>
            ) : null}
          </button>
        ) : null}
        <button
          type="button"
          onClick={onLogout}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          Sign out
        </button>
      </div>
    </header>
  );
};

export default Topbar;
