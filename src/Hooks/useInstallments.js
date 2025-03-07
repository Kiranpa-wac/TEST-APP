import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export const useInstallments = (totalAmount, installmentsCount) => {
  const [installmentsData, setInstallmentsData] = useState([]);

  
  useEffect(() => {
    if (totalAmount > 0 && installmentsCount > 0) {
      const installmentAmount = (parseFloat(totalAmount) / installmentsCount).toFixed(2);
      const newData = Array.from({ length: installmentsCount }, (_, i) => {
        const date = new Date();

        date.setMonth(date.getMonth() + i);
        const prefillDate = date.toISOString().slice(0, 10);
        return {
          id: i + 1,
          number: i + 1, 
          amount: parseFloat(installmentAmount),
          dueDate: "", 
          selected: false,
          merged: false,
          split: false,
        };
      });
      setInstallmentsData(newData);
    } else {
      setInstallmentsData([]);
    }
  }, [totalAmount, installmentsCount]);
  // console.log(installmentsData)
  
  const handleCheckboxChange = (id) => {
    setInstallmentsData((prev) =>
      prev.map((inst) =>
        inst.id === id ? { ...inst, selected: !inst.selected } : inst
      )
    );
  };

  // Update due date for a given installment
  const handleDueDateChange = (id, value) => {
    setInstallmentsData((prev) => {
      // Update the dueDate for the selected installment.
      const updatedData = prev.map((inst) =>
        inst.id === id ? { ...inst, dueDate: value } : inst
      );
  
      // If the updated installment is the first one, pre-fill the subsequent dates.
      if (id === prev[0].id && value !== "") {
        let currentDate = new Date(value);
        // Iterate over the remaining installments and set each date one month apart.
        for (let i = 1; i < updatedData.length; i++) {
          currentDate.setMonth(currentDate.getMonth() + 1);
          updatedData[i] = {
            ...updatedData[i],
            dueDate: currentDate.toISOString().slice(0, 10),
          };
        }
      }
      return updatedData;
    });
  };
  
  

  // Merge selected installments into one.
  const mergeInstallments = () => {
    const selectedIndices = installmentsData
      .map((inst, index) => (inst.selected ? index : -1))
      .filter((index) => index !== -1);
    if (selectedIndices.length < 2) {
      toast.error("Please select at least 2 installments to merge.");
      return;
    }
    const firstSelectedIndex = Math.min(...selectedIndices);
    const selectedInstallments = installmentsData.filter((inst) => inst.selected);
    const mergedAmount = selectedInstallments.reduce((sum, inst) => sum + inst.amount, 0);
    let mergedDueDate = "";
    const dueDates = selectedInstallments.map((inst) => inst.dueDate).filter((date) => date);
    if (dueDates.length) {
      mergedDueDate = dueDates.sort()[0];
    }

    const mergedNumber = selectedInstallments
      .map((inst) => inst.number)
      .join("+");

    const mergedInstallment = {
      ...installmentsData[firstSelectedIndex],
      amount: mergedAmount,
      dueDate: mergedDueDate,
      selected: false,
      merged: true,
      originalData: selectedInstallments, // store original rows for unmerge
      number: mergedNumber,
    };

    // Filter out all selected installments except the one at firstSelectedIndex.
    const newInstallmentsData = installmentsData.filter((inst, index) => {
      return !(inst.selected && index !== firstSelectedIndex);
    });

    newInstallmentsData[firstSelectedIndex] = mergedInstallment;

    setInstallmentsData(newInstallmentsData);
  };

  // Unmerge a merged installment to restore its original rows.
  const unmergeInstallment = (index) => {
    const mergedInst = installmentsData[index];
    if (!mergedInst.merged) return;
    let newInstallments;
    if (mergedInst.originalData) {
      newInstallments = mergedInst.originalData.map((inst, i) => ({
        ...inst,
        id: Date.now() + i,
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
    setInstallmentsData(newData);
  };

  // Split a selected installment into two equal parts.
  const splitInstallment = () => {
    const selectedForSplit = installmentsData.filter(
      (inst) => inst.selected && !inst.merged
    );
    if (selectedForSplit.length !== 1) {
      toast.error("Please select exactly one installment to split.");
      return;
    }
    const index = installmentsData.findIndex(
      (inst) => inst.selected && !inst.merged
    );
    const installmentToSplit = installmentsData[index];
    const halfAmount = parseFloat((installmentToSplit.amount / 2).toFixed(2));
    const originalNumber = installmentToSplit.number;
    const newInstallment1 = {
      id: Date.now(),
      number: `${originalNumber}.1`,
      amount: halfAmount,
      dueDate: "", // reset due date to default
      selected: false,
      merged: false,
      split: true,
      splitGroupId: installmentToSplit.id, // group id for this split
      originalData: installmentToSplit, // store original installment for revert
    };
    const newInstallment2 = {
      id: Date.now() + 1,
      number: `${originalNumber}.2`,
      amount: halfAmount,
      dueDate: "", // reset due date to default
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

  // Revert a split group back to the original installment.
  const revertSplit = (index) => {
    const splitInst = installmentsData[index];
    if (!splitInst.split) return;
    const groupId = splitInst.splitGroupId;
    const groupIndices = installmentsData.reduce((acc, inst, i) => {
      if (inst.split && inst.splitGroupId === groupId) {
        acc.push(i);
      }
      return acc;
    }, []);
    if (groupIndices.length === 0) return;
    const firstIndex = groupIndices[0];
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
    setInstallmentsData(newData);
  };

  return {
    installmentsData,
    handleCheckboxChange,
    handleDueDateChange,
    mergeInstallments,
    unmergeInstallment,
    splitInstallment,
    revertSplit,
  };
};
