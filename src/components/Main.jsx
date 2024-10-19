import { useState } from "react";
import AmountSummary from "./AmountSummary";
import Expense from "./expenseSummary.jsx/Expense";
import Income from "./expenseSummary.jsx/Income";
import InputForm from "./InputForm";

export default function Main() {
  const [transactions, setTransaction] = useState([]);
  function submitValue(value) {
    // console.log(value,"data");
    setTransaction([...transactions, value]);
  }
  const incomeValues = transactions.filter(
    (transaction) => transaction.type === "Income"
  );
  const expenseValues = transactions.filter(
    (transaction) => transaction.type === "Expense"
  );
  function handleDelete(id) {
    setTransaction((transactions) =>
      transactions.filter((transaction) => transaction.id !== id)
    );
  }
  return (
    <>
      <main className="relative mx-auto mt-10 w-full max-w-7xl">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <InputForm onSubmitValue={submitValue} />

          <div className="lg:col-span-2">
            <AmountSummary />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
              <Income transactions={incomeValues} onDelete={handleDelete} />
              <Expense transactions={expenseValues} onDelete={handleDelete} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
