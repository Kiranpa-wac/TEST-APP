import React, { useState } from "react";

const InstallmentForm2 = () => {
  const [amount, setAmount] = useState("");
  const [installmentCount, setInstallmentCount] = useState(0);

  const [installmentsData, setInstallmentsData] = useState([
    {
        id: '',
        checked: false,
        installmentNum : '',
        dueDate: '',
        amount: '',
        show : true,
    }
  ]);
 
  console.log(installmentsData)
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handleInstallmentCountChange = (e) => {
    setInstallmentCount(parseInt(e.target.value));
  };
  return (
    <div className="container mt-4">
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
            onChange={handleAmountChange}
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
            onChange={handleInstallmentCountChange}
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
    </div>
  );
};

export default InstallmentForm2;
