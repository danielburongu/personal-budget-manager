import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import IncomeForm from './components/IncomeForm';
import Login from './components/Login'; // If login is needed
import './styles.css'; // Import the styles

function App() {
    const [expenses, setExpenses] = useState(() => {
        const savedExpenses = localStorage.getItem('expenses');
        return savedExpenses ? JSON.parse(savedExpenses) : [];
    });

    const [budgets, setBudgets] = useState(() => {
        const savedBudgets = localStorage.getItem('budgets');
        return savedBudgets ? JSON.parse(savedBudgets) : {};
    });

    const [income, setIncome] = useState(() => {
        const savedIncome = localStorage.getItem('income');
        return savedIncome ? JSON.parse(savedIncome) : 0;
    });

    const [username, setUsername] = useState(() => {
        const savedUsername = localStorage.getItem('username');
        return savedUsername || '';
    });

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
        localStorage.setItem('budgets', JSON.stringify(budgets));
        localStorage.setItem('income', JSON.stringify(income));
        if (username) {
            localStorage.setItem('username', username);
        }
    }, [expenses, budgets, income, username]);

    const addExpense = (expense) => setExpenses([...expenses, expense]);

    const setBudget = (category, amount) => {
        setBudgets({
            ...budgets,
            [category]: amount, // Store the budget for each category
        });
    };

    const deleteExpense = (index) => setExpenses(expenses.filter((_, i) => i !== index));

    const editExpense = (index, updatedExpense) =>
        setExpenses(expenses.map((expense, i) => (i === index ? { ...expense, ...updatedExpense } : expense)));

    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    const calculateCategoryTotal = (category) => {
        return expenses
            .filter((expense) => expense.category === category)
            .reduce((sum, expense) => sum + expense.amount, 0);
    };

    const checkBudgetStatus = (category) => {
        const totalSpent = calculateCategoryTotal(category);
        const budgetLimit = budgets[category];

        if (budgetLimit && totalSpent > budgetLimit) {
            return `You have exceeded the budget for ${category}.`;
        } else if (budgetLimit && totalSpent > budgetLimit * 0.9) {
            return `You are nearing the budget limit for ${category}.`;
        }
        return null;
    };

    const exportToCSV = () => {
        const csvRows = [
            ['Date', 'Category', 'Amount'],
            ...expenses.map((expense) => [expense.date, expense.category, expense.amount]),
        ];

        const csvContent =
            'data:text/csv;charset=utf-8,' +
            csvRows.map((row) => row.join(',')).join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'expenses.csv');
        document.body.appendChild(link);
        link.click();
    };

    if (!username) {
        return <Login onLogin={setUsername} />;
    }

    return (
        <div className="container">
            <div className="header">
                <div className="username-display">Your are Most Welcome, {username}!</div>
                <button
                    className="btn logout-btn"
                    onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                    }}
                >
                    Logout
                </button>
            </div>

            <IncomeForm onSetIncome={setIncome} />

            <div className="card">
                <ExpenseForm onAddExpense={addExpense} onSetBudget={setBudget} />
            </div>

            <div className="chart-container">
                <ExpenseSummary expenses={expenses} />
            </div>

            <div className="card">
                <h2>Total Income: ${income.toFixed(2)}</h2>
                <h2>Total Expenses: ${totalExpenses.toFixed(2)}</h2>
                <h2>Remaining Balance: ${(income - totalExpenses).toFixed(2)}</h2>
            </div>

            <div className="card">
                <h2>Budgets</h2>
                <ul>
                    {Object.keys(budgets).map((category) => {
                        const budgetStatus = checkBudgetStatus(category);
                        return (
                            <li key={category}>
                                {category}: Budget - ${budgets[category].toFixed(2)}
                                {budgetStatus && (
                                    <span className={budgetStatus.includes('exceeded') ? 'budget-alert' : 'near-budget-alert'}>
                                        {budgetStatus}
                                    </span>
                                )}
                            </li>
                        );
                    })}
                </ul>
                <button onClick={exportToCSV} className="btn export-btn">Export to CSV</button>
            </div>

            <ExpenseList
                expenses={expenses}
                onDeleteExpense={deleteExpense}
                onEditExpense={editExpense}
            />
        </div>
    );
}

export default App;
