import React from "react";

const InstallmentRow = ({
  installment,
  onCheckboxChange,
  onDueDateChange,
  onUnmerge,
  onRevertSplit,
}) => {
  const showUnmerge =
    typeof installment.installmentNum === "string" &&
    installment.installmentNum.includes("+");
  const showRevert =
    installment.splitFrom &&
    installment.installmentNum.toString().endsWith(".1");

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={installment.checked}
          onChange={(e) => onCheckboxChange(installment.id, e.target.checked)}
        />
      </td>
      <td>{installment.installmentNum}</td>
      <td>{installment.amount}</td>
      <td>
        <input
          type="date"
          value={installment.dueDate}
          onChange={(e) => onDueDateChange(installment.id, e.target.value)}
          className="form-control"
        />
      </td>
      <td>
        {showUnmerge && (
          <button
            className="btn btn-warning btn-sm me-1"
            onClick={() => onUnmerge(installment.id)}
          >
            Unmerge
          </button>
        )}
        {showRevert && (
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onRevertSplit(installment.splitFrom)}
          >
            Revert
          </button>
        )}
      </td>
    </tr>
  );
};

export default InstallmentRow;
