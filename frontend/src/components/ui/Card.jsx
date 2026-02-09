const Card = ({ title, value, accent = "bg-white", subtitle }) => {
  return (
    <div className={`rounded-2xl border border-slate-200 ${accent} p-5 shadow-sm`}>
      <p className="text-xs uppercase tracking-wide text-slate-500">{title}</p>
      <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
      {subtitle ? (
        <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
      ) : null}
    </div>
  );
};

export default Card;
