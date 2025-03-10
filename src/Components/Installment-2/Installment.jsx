import React from "react";
import { ToastContainer } from "react-toastify";
import InstallmentForm2 from "./InstallmentForm2";
import InstallmentsTable from "./InstallmentTable";
import useInstallments from "./useInstallment";

const Installment = () => {
  const {
    amount,
    installmentCount,
    installmentsData,
    handleAmountChange,
    handleInstallmentCountChange,
    handleCheckboxChange,
    handleDueDateChange,
    mergeCheckedInstallments,
    handleUnmerge,
    handleSplitSelected,
    handleRevertSplit,
  } = useInstallments();

  return (
    <div className="container mt-4">
      <InstallmentForm2
        amount={amount}
        installmentCount={installmentCount}
        onAmountChange={handleAmountChange}
        onInstallmentCountChange={handleInstallmentCountChange}
      />
      <div className="mb-3 mt-4">
        <button
          className="btn btn-primary me-2"
          onClick={mergeCheckedInstallments}
        >
          Merge Checked Installments
        </button>
        <button className="btn btn-info me-2" onClick={handleSplitSelected}>
          Split Selected Installment
        </button>
      </div>
      {installmentsData.length > 0 && (
        <div className="mt-4">
          <h2>Installments Data</h2>
          <InstallmentsTable
            installments={installmentsData}
            onCheckboxChange={handleCheckboxChange}
            onDueDateChange={handleDueDateChange}
            onUnmerge={handleUnmerge}
            onRevertSplit={handleRevertSplit}
          />
        </div>
      )}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Installment;
