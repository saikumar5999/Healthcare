const LoadingState = ({ label = "Loading data..." }) => {
  return (
    <div className="flex min-h-[180px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white">
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
};

export default LoadingState;
