import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';
import './ExpenseSummary.css'; // Import your CSS file

// Register necessary Chart.js elements
Chart.register(BarElement, CategoryScale, LinearScale);

function ExpenseSummary({ expenses }) {
    const categories = [...new Set(expenses.map((exp) => exp.category))];
    const categoryTotals = categories.map((category) =>
        expenses.filter((exp) => exp.category === category).reduce((sum, exp) => sum + exp.amount, 0)
    );

    // Data for Bar Chart
    const barData = {
        labels: categories,
        datasets: [
            {
                label: 'Expenses by Category',
                data: categoryTotals,
                backgroundColor: '#12cc8e',
            },
        ],
    };

    // Options for the Bar Chart (optional)
    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="expense-summary">
            <h2>Expense Summary</h2>

            <div className="summary-cards">
                {categories.map((category, index) => (
                    <div key={index} className="summary-card">
                        <h3>{category}</h3>
                        <p>Total: ${categoryTotals[index].toFixed(2)}</p>
                    </div>
                ))}
            </div>

            <div className="chart-container">
                <Bar data={barData} options={options} />
            </div>
        </div>
    );
}

export default ExpenseSummary;
