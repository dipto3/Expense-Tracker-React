import { useState } from "react";
import Button from "../Button";
import AmountFilterSvg from "../svg/AmountFilterSvg";
import DeleteSvg from "../svg/DeleteSvg";
import EditSvg from "../svg/EditSvg";
import IncomeSvg from "../svg/IncomeSvg";
import SettingSvg from "../svg/SettingSvg";

export default function Income({ transactions, onDelete, onEdit }) {
  // console.log(amountSort);
  const [activeFilter, setActiveFilter] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState(false);
  const [sortType, setSortType] = useState("lowToHigh");
  function handleClickAmountFilter() {
    setActiveFilter(!activeFilter);
    // console.log(activeFilter);
  }
  function handleClickCategoryFilter() {
    setActiveCategoryFilter(!activeCategoryFilter);
  }
  function handleDelete(id) {
    onDelete(id);
  }

  function handleSort(sortType) {
    setSortType(sortType);
  }
  const sortedIncomeValues = [...transactions].sort((a, b) => {
    //  console.log(sortType);
    if (sortType === "lowToHigh") {
      return a.amount - b.amount;
    } else if (sortType === "highToLow") {
      return b.amount - a.amount;
    }
    return 0;
  });

  const incomes = sortedIncomeValues.map((transaction) => (
    <div
      className="flex justify-between items-center py-2 relative group cursor-pointer"
      key={transaction.id}
    >
      <div>
        {/* <h5>{transaction.id}</h5> */}
        <h3 className="text-base font-medium leading-7 text-gray-600">
          {transaction.category}
        </h3>

        <p className="text-xs text-gray-600">
          {new Date(transaction.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-base font-semibold text-gray-600 transaction-all group-hover:-translate-x-14">
          BDT {transaction.amount}
        </p>

        <div className="translate-x-5 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 absolute right-0 top-1/2 -translate-y-1/2 transaction-all">
          <button
            className="hover:text-teal-600"
            role="button"
            title="Edit Button"
            onClick={() => onEdit(transaction)}
          >
            <EditSvg />
          </button>

          <Button
            type="submit"
            className="hover:text-red-600"
            role="button"
            title="Delete"
            onSmash={() => handleDelete(transaction.id)}
          >
            <DeleteSvg />
          </Button>
        </div>
      </div>
    </div>
  ));
  return (
    <>
      <div className="border rounded-md relative">
        <div className="flex items-center justify-between gap-2 bg-[#F9FAFB] py-4 px-4 rounded-md">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-teal-600 text-white rounded-md text-center object-center place-content-center text-base">
              <IncomeSvg />
            </div>

            <div>
              <h3 className="text-xl font-semibold leading-7 text-gray-800">
                Income
              </h3>
            </div>
          </div>
          <div>
            <div className="relative inline-block text-left">
              <div>
                <Button
                  onSmash={handleClickAmountFilter}
                  type="submit"
                  className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <AmountFilterSvg />
                </Button>
              </div>

              {activeFilter && (
                <div
                  className="absolute z-10 mt-2 left-5 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                >
                  <div className="py-1" role="none">
                    <Button
                      onSmash={() => handleSort("lowToHigh")}
                      type="submit"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transaction-all"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                    >
                      Low to High
                    </Button>
                    <Button
                      onSmash={() => handleSort("highToLow")}
                      type="submit"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transaction-all"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                    >
                      High to Low
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative inline-block text-left">
              <div>
                <Button
                  onSmash={handleClickCategoryFilter}
                  type="submit"
                  className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <SettingSvg />
                </Button>
              </div>

              {activeCategoryFilter && (
                <div
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="filter-button"
                  tabIndex="-1"
                  id="filter-dropdown"
                >
                  <div className="py-1" role="none">
                    <label className="inline-flex items-center px-4 py-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 rounded-md text-gray-600"
                        id="filter-option-1"
                      />
                      <span className="ml-2">Salary</span>
                    </label>
                    <label className="inline-flex items-center px-4 py-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 rounded-md text-gray-600"
                        id="filter-option-2"
                      />
                      <span className="ml-2">Outsourcing</span>
                    </label>
                    <label className="inline-flex items-center px-4 py-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 rounded-md text-gray-600"
                        id="filter-option-3"
                      />
                      <span className="ml-2">Bond</span>
                    </label>

                    <label className="inline-flex items-center px-4 py-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 rounded-md text-gray-600"
                        id="filter-option-3"
                      />
                      <span className="ml-2">Dividend</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 divide-y">{incomes}</div>
      </div>
    </>
  );
}
