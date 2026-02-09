import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Modal from "../ui/Modal";
import LoadingState from "../ui/LoadingState";
import EmptyState from "../ui/EmptyState";
import { useNavigate } from "react-router-dom";
import { fetchClinicStatus, fetchNotifications } from "../../api/healthcareApi";
import { useAuth } from "../../auth/AuthContext";

const AppLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [clinicStatusOpen, setClinicStatusOpen] = useState(false);
  const [clinicStatus, setClinicStatus] = useState(null);
  const [clinicStatusLoading, setClinicStatusLoading] = useState(true);

  useEffect(() => {
    let active = true;

    if (user?.role === "office") {
      fetchNotifications().then((data) => {
        if (active) {
          setNotifications(data);
          setNotificationsLoading(false);
        }
      });
    } else {
      setNotificationsLoading(false);
      setNotifications([]);
    }

    if (user?.role === "office") {
      fetchClinicStatus().then((data) => {
        if (active) {
          setClinicStatus(data);
          setClinicStatusLoading(false);
        }
      });
    } else {
      setClinicStatusLoading(false);
      setClinicStatus(null);
    }

    return () => {
      active = false;
    };
  }, []);

  const handleMarkAllRead = () => {
    // Placeholder: replace with API call to mark notifications read.
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="flex">
        <Sidebar
          role={user?.role}
          onClinicStatusClick={() => setClinicStatusOpen(true)}
        />
        <main className="flex-1 px-6 py-6">
          <Topbar
            onNotificationsClick={() => setNotificationsOpen(true)}
            notificationCount={notifications.length}
            onLogout={() => {
              logout();
              navigate("/login", { replace: true });
            }}
            user={user}
          />
          <div className="mt-6">
            <Outlet />
          </div>
        </main>
      </div>
      {user?.role === "office" ? (
        <>
          <Modal
            open={notificationsOpen}
            onClose={() => setNotificationsOpen(false)}
            title="Notifications"
            footer={
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setNotificationsOpen(false)}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleMarkAllRead}
                  className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
                >
                  Mark all read
                </button>
              </div>
            }
          >
            {notificationsLoading ? (
              <LoadingState label="Loading notifications..." />
            ) : notifications.length === 0 ? (
              <EmptyState
                title="All caught up"
                description="No new notifications at the moment."
              />
            ) : (
              <div className="space-y-3">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-700">
                        {item.title}
                      </p>
                      <span className="text-xs text-slate-400">
                        {item.time}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      {item.detail}
                    </p>
                    <span className="mt-2 inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                      {item.type}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Modal>
          <Modal
            open={clinicStatusOpen}
            onClose={() => setClinicStatusOpen(false)}
            title="Clinic Status"
            footer={
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setClinicStatusOpen(false)}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            }
          >
            {clinicStatusLoading ? (
              <LoadingState label="Loading clinic status..." />
            ) : clinicStatus ? (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Departments Active
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-800">
                      {clinicStatus.departmentsActive}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Beds Available
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-800">
                      {clinicStatus.bedsAvailable}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      ICU Availability
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-800">
                      {clinicStatus.icuAvailability}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">Alerts</p>
                  <div className="mt-3 space-y-2">
                    {clinicStatus.alerts.map((alert) => (
                      <div
                        key={alert}
                        className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600"
                      >
                        {alert}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <EmptyState
                title="No status data"
                description="Clinic status is not available right now."
              />
            )}
          </Modal>
        </>
      ) : null}
    </div>
  );
};

export default AppLayout;
