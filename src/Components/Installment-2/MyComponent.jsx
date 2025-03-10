// import React, { useState } from "react";

// const InstallmentForm2 = () => {
//   const [amount, setAmount] = useState("");
//   const [installmentCount, setInstallmentCount] = useState(0);
//   const [installmentsData, setInstallmentsData] = useState([]);

//   const updateInstallmentsData = (newAmount, newCount) => {
//     if (newCount > 0) {
//       const parsedAmount = parseFloat(newAmount);
//       const installmentAmount =
//         newCount > 0 ? (isNaN(parsedAmount) ? 0 : parsedAmount / newCount) : 0;
//       const newData = Array.from({ length: newCount }, (_, index) => ({
//         id: index + 1,
//         checked: false,
//         installmentNum: index + 1,
//         dueDate: "",
//         amount: installmentAmount,
//         show: true,
//       }));
//       setInstallmentsData(newData);
//     } else {
//       setInstallmentsData([]);
//     }
//   };

//   const handleAmountChange = (e) => {
//     const newAmount = e.target.value;
//     setAmount(newAmount);
//     updateInstallmentsData(newAmount, installmentCount);
//   };

//   const handleInstallmentCountChange = (e) => {
//     const newCount = parseInt(e.target.value, 10);
//     setInstallmentCount(newCount);
//     updateInstallmentsData(amount, newCount);
//   };

//   const handleCheckboxChange = (id, checkedValue) => {
//     setInstallmentsData((prevData) =>
//       prevData.map((item) =>
//         item.id === id ? { ...item, checked: checkedValue } : item
//       )
//     );
//   };

//   const handleDueDateChange = (id, newDueDate) => {
//     setInstallmentsData((prevData) =>
//       prevData.map((item) =>
//         item.id === id ? { ...item, dueDate: newDueDate } : item
//       )
//     );
//   };

//   const mergeCheckedInstallments = () => {
//     const checkedItems = installmentsData.filter(
//       (item) => item.checked && item.show
//     );

//     if (checkedItems.length < 2) {
//       alert("Please select at least two installments to merge.");
//       return;
//     }

//     const firstCheckedIndex = installmentsData.findIndex(
//       (item) => item.checked && item.show
//     );

//     const mergedInstallmentNum = checkedItems
//       .map((item) => item.installmentNum)
//       .join("+");

//     const mergedAmount = checkedItems.reduce(
//       (sum, item) => sum + item.amount,
//       0
//     );

//     const mergedDueDate = "";

//     const currentMaxId = Math.max(...installmentsData.map((item) => item.id));
//     const newMergedId = currentMaxId + 1;

//     const mergedInstallment = {
//       id: newMergedId,
//       checked: false,
//       installmentNum: mergedInstallmentNum,
//       dueDate: mergedDueDate,
//       amount: mergedAmount,
//       show: true,
//       mergedIds: checkedItems.map((item) => item.id), // store original ids
//     };

//     const updatedData = installmentsData.map((item) =>
//       item.checked && item.show ? { ...item, show: false } : item
//     );

//     const newData = [
//       ...updatedData.slice(0, firstCheckedIndex),
//       mergedInstallment,
//       ...updatedData.slice(firstCheckedIndex),
//     ];

//     setInstallmentsData(newData);
//   };

//   const handleUnmerge = (mergedId) => {
//     const mergedInst = installmentsData.find((item) => item.id === mergedId);
//     if (!mergedInst || !mergedInst.mergedIds) {
//       alert("No merged installment found for unmerging.");
//       return;
//     }
//     const withoutMerged = installmentsData.filter(
//       (item) => item.id !== mergedId
//     );
//     const updatedData = withoutMerged.map((item) =>
//       mergedInst.mergedIds.includes(item.id) ? { ...item, show: true } : item
//     );
//     setInstallmentsData(updatedData);
//   };

//   const handleSplitSelected = () => {
//     const selectedItems = installmentsData.filter(
//       (item) => item.checked && item.show
//     );

//     if (selectedItems.length !== 1) {
//       alert("Please select exactly one installment to split.");
//       return;
//     }

//     const installmentToSplit = selectedItems[0];

//     if (installmentToSplit.installmentNum.toString().includes(".")) {
//       alert("This installment is already split.");
//       return;
//     }

//     const currentMaxId = Math.max(...installmentsData.map((item) => item.id));
//     const newId1 = currentMaxId + 1;
//     const newId2 = currentMaxId + 2;
//     const splitAmount = installmentToSplit.amount / 2;

//     const newInstallment1 = {
//       id: newId1,
//       checked: false,
//       installmentNum: installmentToSplit.installmentNum + ".1",
//       dueDate: installmentToSplit.dueDate,
//       amount: splitAmount,
//       show: true,
//       splitFrom: installmentToSplit.id, // reference to original
//     };

//     const newInstallment2 = {
//       id: newId2,
//       checked: false,
//       installmentNum: installmentToSplit.installmentNum + ".2",
//       dueDate: installmentToSplit.dueDate,
//       amount: splitAmount,
//       show: true,
//       splitFrom: installmentToSplit.id,
//     };

//     const index = installmentsData.findIndex(
//       (item) => item.id === installmentToSplit.id
//     );

//     const updatedOriginal = { ...installmentToSplit, show: false };

//     // Insert the two new split installments immediately after the original.
//     const newData = [
//       ...installmentsData.slice(0, index),
//       updatedOriginal,
//       newInstallment1,
//       newInstallment2,
//       ...installmentsData.slice(index + 1),
//     ];

//     setInstallmentsData(newData);
//   };

//   const handleRevertSplit = (originalId) => {
//     const withoutSplitChildren = installmentsData.filter(
//       (item) => item.splitFrom !== originalId
//     );

//     const updatedData = withoutSplitChildren.map((item) =>
//       item.id === originalId ? { ...item, show: true } : item
//     );
//     setInstallmentsData(updatedData);
//   };
//   console.log(installmentsData);
//   return (
//     <div className="container mt-4">
//       <div className="card shadow p-4">
//         <h1 className="mb-4">Installment Payment</h1>
//         <div className="mb-3">
//           <label htmlFor="amount" className="form-label">
//             Amount
//           </label>
//           <input
//             type="text"
//             id="amount"
//             value={amount}
//             onChange={handleAmountChange}
//             className="form-control"
//             placeholder="Enter Amount"
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="installment-count" className="form-label">
//             Installment Count
//           </label>
//           <select
//             name="installment-count"
//             value={installmentCount}
//             onChange={handleInstallmentCountChange}
//             id="installment-count"
//             className="form-select"
//           >
//             <option value="0">Select</option>
//             {Array.from({ length: 12 }, (_, i) => (
//               <option key={i + 1} value={i + 1}>
//                 {i + 1}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       {installmentsData.length > 0 && (
//         <div className="mt-4">
//           <h2>Installments Data</h2>
//           <div className="mb-3">
//             <button
//               className="btn btn-primary me-2"
//               onClick={mergeCheckedInstallments}
//             >
//               Merge Checked Installments
//             </button>
//             <button className="btn btn-info me-2" onClick={handleSplitSelected}>
//               Split Selected Installment
//             </button>
//           </div>
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Select</th>
//                 <th>Installment #</th>
//                 <th>Amount</th>
//                 <th>Due Date</th>
//                 <th>Show</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {installmentsData
//                 .filter((item) => item.show)
//                 .map((item) => (
//                   <tr key={item.id}>
//                     <td>
//                       <input
//                         type="checkbox"
//                         checked={item.checked}
//                         onChange={(e) =>
//                           handleCheckboxChange(item.id, e.target.checked)
//                         }
//                       />
//                     </td>
//                     <td>{item.installmentNum}</td>
//                     <td>{item.amount}</td>
//                     <td>
//                       <input
//                         type="date"
//                         value={item.dueDate}
//                         onChange={(e) =>
//                           handleDueDateChange(item.id, e.target.value)
//                         }
//                         className="form-control"
//                       />
//                     </td>
//                     <td>{item.show ? "Yes" : "No"}</td>
//                     <td>
//                       {typeof item.installmentNum === "string" &&
//                       item.installmentNum.includes("+") ? (
//                         <button
//                           className="btn btn-warning btn-sm me-1"
//                           onClick={() => handleUnmerge(item.id)}
//                         >
//                           Unmerge
//                         </button>
//                       ) : null}

//                       {item.splitFrom &&
//                       item.installmentNum.toString().endsWith(".1") ? (
//                         <button
//                           className="btn btn-secondary btn-sm"
//                           onClick={() => handleRevertSplit(item.splitFrom)}
//                         >
//                           Revert
//                         </button>
//                       ) : null}
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InstallmentForm2;
