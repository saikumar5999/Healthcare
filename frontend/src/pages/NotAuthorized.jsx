import { Link } from "react-router-dom";

const NotAuthorized = () => {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          Access Restricted
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">
          You do not have access to this area.
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          Please return to the portal or contact the office team for help.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotAuthorized;
