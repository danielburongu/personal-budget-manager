import React, { useState } from 'react';
import './ExpenseList.css';

/**
 * ExpenseList component displays the list of all expenses with options to edit or delete them.
 * It also allows filtering by category and date, and sorting by date, category, or amount.
 */
function ExpenseList({ expenses, onDeleteExpense, onEditExpense }) {
    const [filterCategory, setFilterCategory] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [sortField, setSortField] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editAmount, setEditAmount] = useState('');
    const [editCategory, setEditCategory] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const handleEditClick = (index, expense) => {
        setEditIndex(index);
        setEditAmount(expense.amount);
        setEditCategory(expense.category);
    };

    const handleEditSubmit = async (index) => {
        setLoading(true); // Set loading to true
        await onEditExpense(index, { amount: parseFloat(editAmount), category: editCategory });
        setEditIndex(null); // Exit edit mode
        setLoading(false); // Reset loading state
    };

    const handleDeleteClick = async (index) => {
        setLoading(true); // Set loading to true
        await onDeleteExpense(index);
        setLoading(false); // Reset loading state
    };

    // Filter expenses based on selected category and date
    let filteredExpenses = expenses.filter(expense => {
        return (
            (!filterCategory || expense.category.toLowerCase().includes(filterCategory.toLowerCase())) &&
            (!filterDate || expense.date === filterDate)
        );
    });

    // Sort expenses based on selected field
    if (sortField) {
        filteredExpenses = filteredExpenses.sort((a, b) => {
            if (sortField === 'amount') {
                return b.amount - a.amount;
            } else {
                return a[sortField].localeCompare(b[sortField]);
            }
        });
    }

    return (
        <div className="expense-list">
            <h2>Expenses</h2>

            {/* Filter Controls */}
            <div className="filters">
                <input
                    type="text"
                    placeholder="Filter by Category"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="input"
                />
                <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="input"
                />
            </div>

            {/* Sorting Controls */}
            <div className="sort-options">
                <button onClick={() => setSortField('date')}>Sort by Date</button>
                <button onClick={() => setSortField('category')}>Sort by Category</button>
                <button onClick={() => setSortField('amount')}>Sort by Amount</button>
            </div>

            <div className="expenses-grid">
                {filteredExpenses.map((expense, index) => (
                    <div key={index} className={`expense-card card-color-${(index % 4) + 1}`}>
                        {editIndex === index ? (
                            <div className="edit-expense">
                                <input
                                    type="number"
                                    value={editAmount}
                                    onChange={(e) => setEditAmount(e.target.value)}
                                    className="edit-input"
                                />
                                <input
                                    type="text"
                                    value={editCategory}
                                    onChange={(e) => setEditCategory(e.target.value)}
                                    className="edit-input"
                                />
                                <button onClick={() => handleEditSubmit(index)} className="btn">
                                    {loading ? 'Saving...' : 'Save'}
                                </button>
                                <button onClick={() => setEditIndex(null)} className="btn">Cancel</button>
                            </div>
                        ) : (
                            <div className="expense-details">
                                <p>{expense.date}: {expense.category} - ${expense.amount.toFixed(2)}</p>
                                <button onClick={() => handleEditClick(index, expense)} className="btn">Edit</button>
                                <button onClick={() => handleDeleteClick(index)} className="btn">
                                    {loading ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Loading Indicator */}
            {loading && <div className="loading-indicator">Loading...</div>}
        </div>
    );
}

export default ExpenseList;
