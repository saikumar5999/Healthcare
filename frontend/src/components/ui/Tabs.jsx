const Tabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2 border-b border-slate-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`rounded-t-xl px-4 py-2 text-sm font-semibold transition ${
            activeTab === tab.id
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
