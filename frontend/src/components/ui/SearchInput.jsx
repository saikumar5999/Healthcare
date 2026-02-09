const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
      <span className="text-slate-400">Search</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
      />
    </div>
  );
};

export default SearchInput;
