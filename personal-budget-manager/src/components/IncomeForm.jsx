import React, { useState } from 'react';

function IncomeForm({ onSetIncome }) {
    const [income, setIncome] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (income) {
            onSetIncome(parseFloat(income));
            setIncome('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="income-form">
            <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="Set Income"
                className="input"
            />
            <button type="submit" className="btn">Set Income</button>
        </form>
    );
}

export default IncomeForm;
