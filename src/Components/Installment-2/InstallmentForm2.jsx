import React from "react";

const InstallmentForm2 = ({
  amount,
  installmentCount,
  onAmountChange,
  onInstallmentCountChange,
}) => (
  <div className="card shadow p-4">
    <h1 className="mb-4">Installment Payment</h1>
    <div className="mb-3">
      <label htmlFor="amount" className="form-label">
        Amount
      </label>
      <input
        type="text"
        id="amount"
        value={amount}
        onChange={onAmountChange}
        className="form-control"
        placeholder="Enter Amount"
      />
    </div>
    <div className="mb-3">
      <label htmlFor="installment-count" className="form-label">
        Installment Count
      </label>
      <select
        name="installment-count"
        value={installmentCount}
        onChange={onInstallmentCountChange}
        id="installment-count"
        className="form-select"
      >
        <option value="0">Select</option>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default InstallmentForm2;
