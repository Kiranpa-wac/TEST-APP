import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useInstallments } from "../Hooks/useInstallments";
import InstallmentTable from "./InstallmentTable";

const InstallmentForm = () => {
  const [totalAmount, setTotalAmount] = useState("");
  const [installmentsCount, setInstallmentsCount] = useState(0);
  const {
    installmentsData,
    handleCheckboxChange,
    handleDueDateChange,
    mergeInstallments,
    unmergeInstallment,
    splitInstallment,
    revertSplit,
  } = useInstallments(totalAmount, installmentsCount);

  const handleAmountChange = (e) => {
    setTotalAmount(e.target.value);
  };

  const handleInstallmentCountChange = (e) => {
    setInstallmentsCount(parseInt(e.target.value));
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h4 className="mb-3 fw-bold">Installment Payment</h4>
        {/* Total Amount Input */}
        <div className="mb-3">
          <label className="fw-bold">Recommended Amount</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter amount"
            value={totalAmount}
            onChange={handleAmountChange}
            min="1"
          />
        </div>
        {/* Installment Count */}
        <div className="mb-3">
          <label className="fw-bold">Installment Count</label>
          <select
            className="form-control"
            value={installmentsCount}
            onChange={handleInstallmentCountChange}
            disabled={!totalAmount}
          >
            <option value="0">Select</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        {/* Installment Table */}
        {installmentsData.length > 0 && (
          <InstallmentTable
            installmentsData={installmentsData}
            handleCheckboxChange={handleCheckboxChange}
            handleDueDateChange={handleDueDateChange}
            unmergeInstallment={unmergeInstallment}
            revertSplit={revertSplit}
          />
        )}
        {/* Action Buttons */}
        <div className="d-flex gap-3 mt-3">
          <button
            className="btn btn-outline-secondary d-flex align-items-center"
            onClick={mergeInstallments}
          >
            Merge <i className="ms-2 bi bi-arrows-collapse"></i>
          </button>
          <button
            className="btn btn-outline-secondary d-flex align-items-center"
            onClick={splitInstallment}
          >
            Split <i className="ms-2 bi bi-arrows-expand"></i>
          </button>
        </div>
      </div>
     
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default InstallmentForm;
