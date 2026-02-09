import { useEffect, useState } from "react";
import LoadingState from "../components/ui/LoadingState";
import EmptyState from "../components/ui/EmptyState";
import Modal from "../components/ui/Modal";
import StatusBadge from "../components/ui/StatusBadge";
import { fetchBilling, payBill } from "../api/healthcareApi";

const Billing = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvc: ""
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    fetchBilling().then((data) => {
      if (active) {
        setBills(data);
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const handleOpen = (bill) => {
    setSelectedBill(bill);
    setErrors({});
    setModalOpen(true);
  };

  const handleChange = (field) => (event) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const validatePayment = () => {
    const nextErrors = {};
    if (!formValues.name) nextErrors.name = "Cardholder name is required.";
    if (!formValues.cardNumber)
      nextErrors.cardNumber = "Card number is required.";
    if (!formValues.expiry) nextErrors.expiry = "Expiry date is required.";
    if (!formValues.cvc) nextErrors.cvc = "CVC is required.";
    return nextErrors;
  };

  const handlePay = async () => {
    const validationErrors = validatePayment();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    await payBill({ billId: selectedBill.id, ...formValues });
    setSubmitting(false);

    setBills((prev) =>
      prev.map((bill) =>
        bill.id === selectedBill.id ? { ...bill, status: "Paid" } : bill
      )
    );
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">Billing</h3>
        <p className="text-sm text-slate-500">
          Review invoices and make secure payments.
        </p>
      </div>

      {loading ? (
        <LoadingState label="Loading billing data..." />
      ) : bills.length === 0 ? (
        <EmptyState
          title="No bills available"
          description="All invoices are settled."
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill) => (
                  <tr key={bill.id} className="border-t border-slate-100">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-700">
                        {bill.service}
                      </p>
                      <p className="text-xs text-slate-500">{bill.id}</p>
                    </td>
                    <td className="px-4 py-3">{bill.date}</td>
                    <td className="px-4 py-3">${bill.amount}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={bill.status} />
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleOpen(bill)}
                        disabled={bill.status === "Paid"}
                        className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {bill.status === "Paid" ? "Paid" : "Pay Now"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Pay Bill"
        footer={
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handlePay}
              disabled={submitting}
              className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 disabled:opacity-60"
            >
              {submitting ? "Processing..." : "Submit Payment"}
            </button>
          </div>
        }
      >
        {selectedBill ? (
          <div className="space-y-4">
            <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
              {selectedBill.service} · ${selectedBill.amount}
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">
                Cardholder Name
              </label>
              <input
                value={formValues.name}
                onChange={handleChange("name")}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
              {errors.name ? (
                <p className="mt-1 text-xs text-rose-600">{errors.name}</p>
              ) : null}
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">
                Card Number
              </label>
              <input
                value={formValues.cardNumber}
                onChange={handleChange("cardNumber")}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                placeholder="1234 5678 9012 3456"
              />
              {errors.cardNumber ? (
                <p className="mt-1 text-xs text-rose-600">
                  {errors.cardNumber}
                </p>
              ) : null}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-slate-500">
                  Expiry
                </label>
                <input
                  value={formValues.expiry}
                  onChange={handleChange("expiry")}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  placeholder="MM/YY"
                />
                {errors.expiry ? (
                  <p className="mt-1 text-xs text-rose-600">{errors.expiry}</p>
                ) : null}
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">
                  CVC
                </label>
                <input
                  value={formValues.cvc}
                  onChange={handleChange("cvc")}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  placeholder="123"
                />
                {errors.cvc ? (
                  <p className="mt-1 text-xs text-rose-600">{errors.cvc}</p>
                ) : null}
              </div>
            </div>
            <p className="text-xs text-slate-400">
              Payment processing is a placeholder until gateway integration.
            </p>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default Billing;
