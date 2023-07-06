// library import
import { toast } from "react-toastify";

// rrd imports
import { useLoaderData } from "react-router-dom";

// helpers
import { deleteItem, fetchData } from "../helpers"


// loader funciton
export async function expensesLoader() {
    const expenses = fetchData("expenses");
    return { expenses }
}

// action
export async function expensesAction({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data)

    if (_action === "deleteExpense") {
        try {
          deleteItem({
            key: "expenses",
            id: values.expenseId,
          });
          return toast.success("Expense deleted!");
        } catch (e) {
          throw new Error("There was a problem deleting your expense.");
        }
      }
}

// components 
import Table from "../components/Table";




const ExpensesPage = () => {
    const { expenses } = useLoaderData();

  return (
    <div className="grid-lg">
        <h1>Expenses</h1>
        {
            expenses && expenses.length > 0 ? (
                <div className="grid-md">
                    <h2>Recent Expenses <small>({expenses.length} total)</small></h2>
                    <Table
                    expenses={expenses} /> 
                </div>
            )
            : <p>No expenses to show</p>
        }
    </div>
  )
}

export default ExpensesPage