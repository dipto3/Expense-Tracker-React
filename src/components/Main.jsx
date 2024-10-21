import { useState } from "react";
import AmountSummary from "./AmountSummary";
import Expense from "./expenseSummary.jsx/Expense";
import Income from "./expenseSummary.jsx/Income";
import InputForm from "./InputForm";

export default function Main() {
  const [transactions, setTransaction] = useState([]);
  const [editTransaction, setEditTransaction] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  function submitValue(value, isEdit) {
    if (isEdit) {
      setTransaction(
        transactions.map((transaction) =>
          transaction.id === value.id ? value : transaction
        )
      );
    } else {
      setTransaction([...transactions, value]);
    }

    setEditTransaction(null);
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
  function handleEdit(transaction) {
    setEditTransaction(transaction);
  }
  function handleCancel() {
    setEditTransaction(null);
  }

  return (
    <>
      <main className="relative mx-auto mt-10 w-full max-w-7xl">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <InputForm
            onSubmitValue={submitValue}
            editTransaction={editTransaction}
            onCancel={handleCancel}
          />

          <div className="lg:col-span-2">
            <AmountSummary transactions={transactions} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
              <Income
                transactions={incomeValues}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
              <Expense
                transactions={expenseValues}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
