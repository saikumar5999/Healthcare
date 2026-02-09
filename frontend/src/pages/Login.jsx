import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formValues, setFormValues] = useState({
    name: "",
    role: "office",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (field) => (event) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formValues.name || !formValues.email) {
      setError("Please enter your name and email.");
      return;
    }

    login({ name: formValues.name, role: formValues.role });
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          Healthcare Management
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">
          Sign in to continue
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Choose Office or Customer access to load the right experience.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500">Name</label>
            <input
              value={formValues.name}
              onChange={handleChange("name")}
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">
              Email
            </label>
            <input
              value={formValues.email}
              onChange={handleChange("email")}
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              placeholder="name@hospital.com"
              type="email"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">
              Password
            </label>
            <input
              value={formValues.password}
              onChange={handleChange("password")}
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              placeholder="••••••••"
              type="password"
            />
            <p className="mt-1 text-xs text-slate-400">
              Placeholder only. Connect real auth later.
            </p>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">
              Access Type
            </label>
            <select
              value={formValues.role}
              onChange={handleChange("role")}
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="office">Office Use</option>
              <option value="customer">Customer Use</option>
            </select>
          </div>
          {error ? <p className="text-xs text-rose-600">{error}</p> : null}
          <button
            type="submit"
            className="w-full rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
