import { useState } from "react";
import Button from "./Button";
let newId = 1;

export default function InputForm({
  onSubmitValue,
  editTransaction,
  onCancel,
}) {
  const [activeTab, setActiveTab] = useState("Expense");
  const [category, setCategory] = useState("");

  const [inputValue, setInputValue] = useState(
    editTransaction || {
      amount: "",
      category: "choose",
      date: "",
      type: "Expense",
    }
  );

  // const [isAdd, setIsAdd] = useState(editTransaction === null);
  const [isEdit, setIsEdit] = useState(false);

  if (editTransaction && !isEdit) {
    // console.log(editTransaction,"check");
    setInputValue(editTransaction);
    setActiveTab(editTransaction.type);
    setIsEdit(true);
  }

  const expenseCategories = [
    "Education",
    "Food",
    "Health",
    "Bill",
    "Insurance",
    "Tax",
    "Transport",
    "Telephone",
  ];
  const incomeCategories = ["Salary", "Dividend", "Interest", "Royalty"];

  function handleTabClick(value) {
    setInputValue((prevValue) => ({
      ...prevValue,
      type: value,
    }));
    setActiveTab(value);
  }

  function handleChange(e) {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  }


  function handleAdd() {
    if (isEdit) {
      onSubmitValue(inputValue, true);
    } else {
      const incrementId = { ...inputValue, id: newId++ };
      setInputValue({
        amount: "",
        category: "choose",
        date: "",
        type: "Expense",
      });
      onSubmitValue(incrementId, false);
    }
    // Reset form
    handleCancel();
  }
  function handleCancel() {
    setInputValue({
      amount: "",
      category: "choose",
      date: "",
      type: "Expense",
    });
    setIsEdit(false);
    if (onCancel) {
      onCancel();
    }
  }

  const categories =
    activeTab === "Expense" ? expenseCategories : incomeCategories;

  const categoryList = categories.map((category) => (
    <option key={category} value={category}>
      {category}
    </option>
  ));

  return (
    <>
      <div className="p-6 py-8 bg-[#F9FAFB] border rounded-md">
        <h2 className="text-3xl font-semibold leading-7 text-gray-800 text-center">
          Expense Tracker
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 mt-6">
            <div
              className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${
                inputValue.type === "Expense"
                  ? "bg-teal-500 text-white hover:bg-teal-700 hover:text-white"
                  : ""
              }`}
              onClick={() => handleTabClick("Expense")}
            >
              Expense
            </div>
            <div
              className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${
                inputValue.type === "Income"
                  ? "bg-teal-500 text-white hover:bg-teal-700 hover:text-white"
                  : ""
              }`}
              onClick={() => handleTabClick("Income")}
            >
              Income
            </div>
          </div>

          <div className="mt-3">
            <label
              htmlFor="category"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Category
            </label>
            <div className="mt-2">
              <select
                id="category"
                name="category"
                value={inputValue.category}
                onChange={handleChange}
                autoComplete="category-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              >
                <option value="choose" disabled>
                  Select Category
                </option>
                {categoryList}
              </select>
            </div>
          </div>

          <div className="mt-3">
            <label
              htmlFor="amount"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Amount
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="amount"
                value={inputValue.amount}
                onChange={handleChange}
                id="amount"
                autoComplete="off"
                placeholder="12931"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="mt-3">
            <label
              htmlFor="date"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Date
            </label>
            <div className="mt-2">
              <input
                type="date"
                name="date"
                value={inputValue.date}
                onChange={handleChange}
                id="date"
                autoComplete="off"
                placeholder="12931"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <Button
            onSmash={handleAdd}
            type="submit"
            className="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
          >
            {isEdit ? "Update" : "Save"}
          </Button>
          {isEdit && (
            <Button
              type="submit"
              onSmash={handleCancel}
              className="mt-6 rounded-md bg-red-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
            >
              Cancel
            </Button>
          )}
        </form>
      </div>
    </>
  );
}
