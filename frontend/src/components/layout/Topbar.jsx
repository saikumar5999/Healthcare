const Topbar = () => {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white px-6 py-4 shadow-sm">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          Healthcare Management
        </p>
        <h2 className="text-xl font-semibold text-slate-900">
          Patient Operations Overview
        </h2>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
          Shift: Morning
        </div>
        <button
          type="button"
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          Notifications
        </button>
      </div>
    </header>
  );
};

export default Topbar;
