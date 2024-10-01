import React, { useState } from 'react';

const predefinedCategories = ['Food', 'Transport', 'Entertainment', 'Rent', 'Utilities', 'Other'];

function ExpenseForm({ onAddExpense, onSetBudget }) {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState(predefinedCategories[0]);
    const [customCategory, setCustomCategory] = useState('');
    const [date, setDate] = useState('');
    const [budget, setBudget] = useState(''); // New state for setting budget

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalCategory = category === 'Other' && customCategory ? customCategory : category;
        if (amount && finalCategory && date) {
            onAddExpense({ amount: parseFloat(amount), category: finalCategory, date });
            setAmount('');
            setCategory(predefinedCategories[0]);
            setCustomCategory('');
            setDate('');
        }
    };

    const handleSetBudget = () => {
        const finalCategory = category === 'Other' && customCategory ? customCategory : category;
        if (budget && finalCategory) {
            onSetBudget(finalCategory, parseFloat(budget)); // Passing the category and budget to the parent component
            setBudget('');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="expense-form">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    {predefinedCategories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                {category === 'Other' && (
                    <input
                        type="text"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="Custom Category"
                    />
                )}
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <button type="submit">Add Expense</button>
            </form>

            {/* Budget Form */}
            <div className="budget-form">
                <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="Set Budget for Category"
                />
                <button type="button" onClick={handleSetBudget}>
                    Set Budget
                </button>
            </div>
        </div>
    );
}

export default ExpenseForm;
