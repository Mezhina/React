import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css'; // Assuming you have index.css

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement); // Type assertion for root

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);