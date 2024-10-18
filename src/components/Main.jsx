import { useState } from "react";
import AmountSummary from "./AmountSummary";
import Expense from "./expenseSummary.jsx/Expense";
import Income from "./expenseSummary.jsx/Income";
import InputForm from "./InputForm";

export default function Main() {
  const [transitions, setTransitions] = useState([]);
  function submitValue(value) {
    // console.log(value,"data");
    setTransitions([...transitions, value]);
  }
  const incomeValues = transitions.filter(
    (transition) => transition.type === "Income"
  );
  const expenseValues = transitions.filter(
    (transition) => transition.type === "Expense"
  );
  return (
    <>
      <main className="relative mx-auto mt-10 w-full max-w-7xl">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <InputForm onSubmitValue={submitValue} />

          <div className="lg:col-span-2">
            <AmountSummary />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
              <Income transitions={incomeValues}/>
              <Expense transitions={expenseValues}/>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
