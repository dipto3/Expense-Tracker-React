import { useState } from "react";
import Button from "./Button";
export default function InputForm() {
  const [activeTab, setActiveTab] = useState("Expense");
  const [category, setCategory] = useState("");
  const [inputValue, setInputValue] = useState({
    id: 1,
    amount: "",
    category: "choose",
    date: "",
  });
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
    // console.log(value);
    setActiveTab(value);
  }
  function handleChange(e) {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  }
  function handleAdd() {
    console.log("Adding...", inputValue);
  }
  const categories =
    activeTab === "Expense" ? expenseCategories : incomeCategories;

  const categoryList = categories.map((category) => (
    <option key={category} value={inputValue}>
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
              className="cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 active"
              onClick={() => handleTabClick("Expense")}
            >
              Expense
            </div>
            <div
              className="cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900"
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
                value={inputValue.category}
                id="category"
                name="category"
                autoComplete="category-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              >
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
            Save
          </Button>
        </form>
      </div>
    </>
  );
}
