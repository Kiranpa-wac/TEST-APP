import React from "react";

const InstallmentTable = ({
  installmentsData,
  handleCheckboxChange,
  handleDueDateChange,
  unmergeInstallment,
  revertSplit,
}) => {

  const today = new Date().toISOString().slice(0, 10);

  
  const getMinDate = (prevDateString) => {
    if (!prevDateString) return today;
    const date = new Date(prevDateString);
    date.setDate(date.getDate() + 1);
    return date.toISOString().slice(0, 10);
  };

  return (
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
                  // For the first installment, the minimum date is today.
                  // For subsequent installments, the minimum date is set to the day after the previous installment's due date.
                  min={
                    index === 0
                      ? today
                      : getMinDate(installmentsData[index - 1].dueDate)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstallmentTable;
