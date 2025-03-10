import { useState } from "react";
import { toast } from "react-toastify";

const useInstallment = () => {
  const [amount, setAmount] = useState("");
  const [installmentCount, setInstallmentCount] = useState(0);
  const [installmentsData, setInstallmentsData] = useState([]);

  const updateInstallmentsData = (newAmount, newCount) => {
    if (newCount > 0) {
      const parsedAmount = parseFloat(newAmount);
      const installmentAmount =
        newCount > 0 ? (isNaN(parsedAmount) ? 0 : parsedAmount / newCount) : 0;
      let isCounter = 1;
      const newData = Array.from({ length: newCount }, (_, index) => ({
        id: isCounter++,
        checked: false,
        installmentNum: index + 1,
        dueDate: "",
        amount: installmentAmount,
        show: true,
      }));
      setInstallmentsData(newData);
    } else {
      setInstallmentsData([]);
    }
  };
  console.log(installmentCount);
  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    setAmount(newAmount);
    updateInstallmentsData(newAmount, installmentCount);
  };

  const handleInstallmentCountChange = (e) => {
    const newCount = parseInt(e.target.value, 10);
    setInstallmentCount(newCount);
    updateInstallmentsData(amount, newCount);
  };

  const handleCheckboxChange = (id, checkedValue) => {
    setInstallmentsData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, checked: checkedValue } : item
      )
    );
  };

  const handleDueDateChange = (id, newDueDate) => {
    setInstallmentsData((prevData) => {
      let updatedData = prevData.map((item) =>
        item.id === id ? { ...item, dueDate: newDueDate } : item
      );

      const firstInstallment = updatedData.find(
        (item) => item.installmentNum === 1
      );
      if (firstInstallment && firstInstallment.id === id && newDueDate) {
        updatedData = updatedData.map((item) => {
          if (item.installmentNum > 1) {
            const baseDate = new Date(newDueDate);

            baseDate.setMonth(baseDate.getMonth() + (item.installmentNum - 1));

            const year = baseDate.getFullYear();
            const month = String(baseDate.getMonth() + 1).padStart(2, "0");
            const day = String(baseDate.getDate()).padStart(2, "0");
            const computedDate = `${year}-${month}-${day}`;
            return { ...item, dueDate: computedDate };
          }
          return item;
        });
      }
      return updatedData;
    });
  };

  const mergeCheckedInstallments = () => {
    const checkedItems = installmentsData.filter(
      (item) => item.checked && item.show
    );

    if (checkedItems.length < 2) {
      toast.error("Please select at least two installments to merge.");
      return;
    }

    const firstCheckedIndex = installmentsData.findIndex(
      (item) => item.checked && item.show
    );

    const mergedInstallmentNum = checkedItems
      .map((item) => item.installmentNum)
      .join("+");

    const mergedAmount = checkedItems.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const dueDates = checkedItems
      .map((item) => item.dueDate)
      .filter((date) => date);
    const mergedDueDate =
      dueDates.length > 0
        ? dueDates.reduce((earliest, current) =>
            new Date(current) < new Date(earliest) ? current : earliest
          )
        : "";

    const currentMaxId = Math.max(...installmentsData.map((item) => item.id));
    const newMergedId = currentMaxId + 1;

    const mergedInstallment = {
      id: newMergedId,
      checked: false,
      installmentNum: mergedInstallmentNum,
      dueDate: mergedDueDate,
      amount: mergedAmount,
      show: true,
      mergedIds: checkedItems.map((item) => item.id),
    };

    const updatedData = installmentsData.map((item) =>
      item.checked && item.show ? { ...item, show: false } : item
    );

    const newData = [
      ...updatedData.slice(0, firstCheckedIndex),
      mergedInstallment,
      ...updatedData.slice(firstCheckedIndex),
    ];

    setInstallmentsData(newData);
  };

  const handleUnmerge = (mergedId) => {
    const mergedInst = installmentsData.find((item) => item.id === mergedId);
    if (!mergedInst || !mergedInst.mergedIds) {
      toast.error("No merged installment found for unmerging.");
      return;
    }

    const withoutMerged = installmentsData.filter(
      (item) => item.id !== mergedId
    );
    const updatedData = withoutMerged.map((item) =>
      mergedInst.mergedIds.includes(item.id) ? { ...item, show: true } : item
    );
    setInstallmentsData(updatedData);
  };

  const handleSplitSelected = () => {
    const selectedItems = installmentsData.filter(
      (item) => item.checked && item.show
    );

    if (selectedItems.length !== 1) {
      toast.error("Please select exactly one installment to split.");
      return;
    }

    const installmentToSplit = selectedItems[0];

    if (
      installmentToSplit.installmentNum.toString().includes(".") ||
      installmentToSplit.installmentNum.toString().includes("+")
    ) {
      toast.error("This installment is already split.");
      return;
    }

    const currentMaxId = Math.max(...installmentsData.map((item) => item.id));
    const newId1 = currentMaxId + 1;
    const newId2 = currentMaxId + 2;
    const splitAmount = installmentToSplit.amount / 2;

    const newInstallment1 = {
      id: newId1,
      checked: false,
      installmentNum: installmentToSplit.installmentNum + ".1",
      dueDate: installmentToSplit.dueDate,
      amount: splitAmount,
      show: true,
      splitFrom: installmentToSplit.id, // reference to original
    };

    const newInstallment2 = {
      id: newId2,
      checked: false,
      installmentNum: installmentToSplit.installmentNum + ".2",
      dueDate: "",
      amount: splitAmount,
      show: true,
      splitFrom: installmentToSplit.id,
    };

    const index = installmentsData.findIndex(
      (item) => item.id === installmentToSplit.id
    );

    const updatedOriginal = { ...installmentToSplit, show: false };

    const newData = [
      ...installmentsData.slice(0, index),
      updatedOriginal,
      newInstallment1,
      newInstallment2,
      ...installmentsData.slice(index + 1),
    ];

    setInstallmentsData(newData);
  };

  const handleRevertSplit = (originalId) => {
    const withoutSplitChildren = installmentsData.filter(
      (item) => item.splitFrom !== originalId
    );
    const updatedData = withoutSplitChildren.map((item) =>
      item.id === originalId ? { ...item, show: true } : item
    );
    setInstallmentsData(updatedData);
  };

  console.log(installmentsData);
  return {
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
  };
};

export default useInstallment;
