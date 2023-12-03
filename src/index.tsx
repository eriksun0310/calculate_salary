import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/style.css';
import './style/antdRewrite.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-simple-keyboard/build/css/index.css";

const rootElement = document.getElementById('root');

if(rootElement){
    const root  = ReactDOM.createRoot(rootElement)

    root.render(
        <>
            <App />
        </>
    
    );
}




