import React from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import App from './App';

// Create a root element for React 18
const container = document.getElementById('root');
const root = createRoot(container); // createRoot for React 18
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
