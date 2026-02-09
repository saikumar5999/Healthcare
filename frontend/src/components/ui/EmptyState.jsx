const EmptyState = ({ title, description }) => {
  return (
    <div className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 text-center">
      <p className="text-base font-semibold text-slate-700">{title}</p>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  );
};

export default EmptyState;
