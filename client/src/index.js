import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import './index.css';

export const Context = React.createContext(null)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <Context.Provider value={{
        user: new UserStore()
    }}>
        <App />
    </Context.Provider>
);