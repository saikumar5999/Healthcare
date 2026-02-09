import { useEffect } from "react";

const Modal = ({ open, onClose, title, children, footer }) => {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    if (open) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-3 py-1 text-sm text-slate-500 hover:bg-slate-100"
          >
            Close
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
        {footer ? (
          <div className="border-t border-slate-100 px-6 py-4">{footer}</div>
        ) : null}
      </div>
    </div>
  );
};

export default Modal;
