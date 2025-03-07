# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const InstallmentForm = () => {
  const [totalAmount, setTotalAmount] = useState("");
  const [installmentsCount, setInstallmentsCount] = useState(0);
  const [installmentsData, setInstallmentsData] = useState([]);

  // Generate the installment data whenever totalAmount or installmentsCount changes
  useEffect(() => {
    if (totalAmount > 0 && installmentsCount > 0) {
      const installmentAmount = (parseFloat(totalAmount) / installmentsCount).toFixed(2);
      const newData = Array.from({ length: installmentsCount }, (_, i) => ({
        id: i + 1,
        number: i + 1, // original installment number
        amount: parseFloat(installmentAmount),
        dueDate: "",
        selected: false,
        merged: false, // indicates a merged row
        split: false,  // indicates a split row
      }));
      setInstallmentsData(newData);
    } else {
      setInstallmentsData([]);
    }
  }, [totalAmount, installmentsCount]);

  const handleAmountChange = (e) => {
    setTotalAmount(e.target.value);
  };

  const handleInstallmentCountChange = (e) => {
    setInstallmentsCount(parseInt(e.target.value));
  };

  // Toggle checkbox selection for an installment
  const handleCheckboxChange = (id) => {
    const updatedData = installmentsData.map((inst) =>
      inst.id === id ? { ...inst, selected: !inst.selected } : inst
    );
    setInstallmentsData(updatedData);
  };

  // Update due date for an installment
  const handleDueDateChange = (id, value) => {
    const updatedData = installmentsData.map((inst) =>
      inst.id === id ? { ...inst, dueDate: value } : inst
    );
    setInstallmentsData(updatedData);
  };

  // Merge selected installments into one at the position of the first selected installment
  const mergeInstallments = () => {
    const selectedIndices = installmentsData
      .map((inst, index) => (inst.selected ? index : -1))
      .filter((index) => index !== -1);
    if (selectedIndices.length < 2) {
      alert("Please select at least 2 installments to merge.");
      return;
    }
    const firstSelectedIndex = Math.min(...selectedIndices);
    const selectedInstallments = installmentsData.filter(inst => inst.selected);
    const mergedAmount = selectedInstallments.reduce((sum, inst) => sum + inst.amount, 0);
    let mergedDueDate = "";
    const dueDates = selectedInstallments.map(inst => inst.dueDate).filter(date => date);
    if (dueDates.length) {
      mergedDueDate = dueDates.sort()[0];
    }
    const mergedInstallment = {
      ...installmentsData[firstSelectedIndex],
      amount: mergedAmount,
      dueDate: mergedDueDate,
      selected: false,
      merged: true,
      originalData: selectedInstallments, // store original rows including due dates
    };
    const newInstallmentsData = installmentsData.filter((inst, index) => {
      return !(inst.selected && index !== firstSelectedIndex);
    });
    newInstallmentsData[firstSelectedIndex] = mergedInstallment;
    const finalData = newInstallmentsData.map((inst, index) => ({
      ...inst,
      number: index + 1,
    }));
    setInstallmentsData(finalData);
  };

  // Unmerge a merged installment back into its original installments (restoring original due dates)
  const unmergeInstallment = (index) => {
    const mergedInst = installmentsData[index];
    if (!mergedInst.merged) return;
    let newInstallments;
    if (mergedInst.originalData) {
      newInstallments = mergedInst.originalData.map((inst, i) => ({
        ...inst,
        id: Date.now() + i, // new unique id
        selected: false,
        merged: false,
        split: false,
      }));
    } else {
      const count = 2;
      const splitAmount = parseFloat((mergedInst.amount / count).toFixed(2));
      newInstallments = Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i,
        number: null,
        amount: splitAmount,
        dueDate: mergedInst.dueDate,
        selected: false,
        merged: false,
        split: false,
      }));
    }
    const newData = [
      ...installmentsData.slice(0, index),
      ...newInstallments,
      ...installmentsData.slice(index + 1),
    ];
    const finalData = newData.map((inst, idx) => ({
      ...inst,
      number: idx + 1,
    }));
    setInstallmentsData(finalData);
  };

  // Split a selected installment into two equal parts.
  // Only one installment can be split at a time.
  // The new split installment numbers will be in the format "X.1" and "X.2"
  // Also, the due dates for the split installments will be reset to default (i.e., empty)
  const splitInstallment = () => {
    const selectedForSplit = installmentsData.filter(inst => inst.selected && !inst.merged);
    if (selectedForSplit.length !== 1) {
      alert("Please select exactly one installment to split.");
      return;
    }
    const index = installmentsData.findIndex(inst => inst.selected && !inst.merged);
    const installmentToSplit = installmentsData[index];
    const halfAmount = parseFloat((installmentToSplit.amount / 2).toFixed(2));
    const originalNumber = installmentToSplit.number;
    // Create two new installments with dueDate set to default (empty string)
    const newInstallment1 = {
      id: Date.now(),
      number: `${originalNumber}.1`,
      amount: halfAmount,
      dueDate: "", // default due date
      selected: false,
      merged: false,
      split: true,
      splitGroupId: installmentToSplit.id, // grouping id from original installment
      originalData: installmentToSplit, // store original data for revert
    };
    const newInstallment2 = {
      id: Date.now() + 1,
      number: `${originalNumber}.2`,
      amount: halfAmount,
      dueDate: "", // default due date
      selected: false,
      merged: false,
      split: true,
      splitGroupId: installmentToSplit.id,
      originalData: installmentToSplit,
    };
    const newInstallmentsData = [
      ...installmentsData.slice(0, index),
      newInstallment1,
      newInstallment2,
      ...installmentsData.slice(index + 1),
    ];
    setInstallmentsData(newInstallmentsData);
  };

  // Revert a split installment group back to its original single installment.
  // The revert button appears only on the first split row (e.g., number ending with ".1")
  const revertSplit = (index) => {
    const splitInst = installmentsData[index];
    if (!splitInst.split) return;
    const groupId = splitInst.splitGroupId;
    // Find the indices of all installments in this split group.
    const groupIndices = installmentsData.reduce((acc, inst, i) => {
      if (inst.split && inst.splitGroupId === groupId) {
        acc.push(i);
      }
      return acc;
    }, []);
    if (groupIndices.length === 0) return;
    const firstIndex = groupIndices[0];
    // Restore the original installment using the stored original data.
    const restoredInstallment = {
      ...splitInst.originalData,
      id: Date.now(),
      selected: false,
      merged: false,
      split: false,
    };
    const newData = [
      ...installmentsData.slice(0, firstIndex),
      restoredInstallment,
      ...installmentsData.slice(groupIndices[groupIndices.length - 1] + 1),
    ];
    const finalData = newData.map((inst, idx) => ({
      ...inst,
      number: idx + 1,
    }));
    setInstallmentsData(finalData);
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
          <div className="mt-4">
            <table className="table table-bordered">
              <thead className="table-light text-center">
                <tr>
                  <th>Select</th>
                  <th>Install No</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {installmentsData.map((inst, index) => (
                  <tr key={inst.id}>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={inst.selected}
                        onChange={() => handleCheckboxChange(inst.id)}
                        disabled={inst.merged} // disable checkbox if merged
                      />
                    </td>
                    <td className="text-center">
                      {inst.number}
                      {inst.merged && (
                        <button
                          className="btn btn-sm btn-link text-decoration-none ms-2"
                          onClick={() => unmergeInstallment(index)}
                          title="Unmerge"
                        >
                          Unmerge
                        </button>
                      )}
                      {inst.split && inst.number.toString().endsWith(".1") && (
                        <button
                          className="btn btn-sm btn-link text-decoration-none ms-2"
                          onClick={() => revertSplit(index)}
                          title="Revert Split"
                        >
                          Revert
                        </button>
                      )}
                    </td>
                    <td className="text-center fw-bold">₹{inst.amount.toFixed(2)}</td>
                    <td>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Select due date"
                        value={inst.dueDate}
                        onChange={(e) => handleDueDateChange(inst.id, e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
    </div>
  );
};

export default InstallmentForm;
# TEST-APP
