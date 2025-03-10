import React from "react";
import InstallmentRow from "./InstallmentRow";

const InstallmentsTable = ({
  installments,
  onCheckboxChange,
  onDueDateChange,
  onUnmerge,
  onRevertSplit,
}) => (
  <table className="table">
    <thead>
      <tr>
        <th>Select</th>
        <th>Installment #</th>
        <th>Amount</th>
        <th>Due Date</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {installments
        .filter((item) => item.show)
        .map((item) => (
          <InstallmentRow
            key={item.id}
            installment={item}
            onCheckboxChange={onCheckboxChange}
            onDueDateChange={onDueDateChange}
            onUnmerge={onUnmerge}
            onRevertSplit={onRevertSplit}
          />
        ))}
    </tbody>
  </table>
);

export default InstallmentsTable;
