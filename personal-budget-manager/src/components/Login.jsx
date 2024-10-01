import React, { useState } from 'react';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            onLogin(username);
        }
    };

    return (
        <div className="welcome-container">
            {/* Header with Logo */}
            <header className="header">
                <div className="logo">
                    <span>💰</span> My Budget, My Goal
                </div>
            </header>

            {/* Hero Section with Title, Description, and Form */}
            <div className="hero">
                <h1>Manage <span>Your Finances</span></h1>
                <p>Budgeting is key to a Healthier Life. Start your journey Now.</p>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="What is your name?"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button type="submit">
                        Create Account <span className="icon">👥</span>
                    </button>
                </form>
            </div>

            {/* Wave Background at the bottom */}
            <div className="wave-background"></div>

             {/* Footer Section */}
             <footer className="footer">
                <p>&copy; 2024 My Budget. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Login;
