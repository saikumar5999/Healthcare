import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-6 py-6">
          <Topbar />
          <div className="mt-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
