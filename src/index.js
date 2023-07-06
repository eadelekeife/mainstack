import "./assets/css/index.css";

import React from "react";
import ReactDOM from 'react-dom/client';

import AppData from "./pages/index.js";

const App = () => {
    return (
        <div>
            <AppData />
        </div>
    )
}
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);