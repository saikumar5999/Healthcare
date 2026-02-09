import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Modal from "../ui/Modal";
import LoadingState from "../ui/LoadingState";
import EmptyState from "../ui/EmptyState";
import { fetchNotifications } from "../../api/healthcareApi";

const AppLayout = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationsLoading, setNotificationsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetchNotifications().then((data) => {
      if (active) {
        setNotifications(data);
        setNotificationsLoading(false);
      }
    });

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
        <Sidebar />
        <main className="flex-1 px-6 py-6">
          <Topbar
            onNotificationsClick={() => setNotificationsOpen(true)}
            notificationCount={notifications.length}
          />
          <div className="mt-6">
            <Outlet />
          </div>
        </main>
      </div>
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
                  <span className="text-xs text-slate-400">{item.time}</span>
                </div>
                <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
                <span className="mt-2 inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AppLayout;
