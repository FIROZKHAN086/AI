import React from 'react'; // ✅ Add this
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import APiProvid from './Pages/APiProvid.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>    <APiProvid>
    <App />
    </APiProvid>
    </BrowserRouter>
  </React.StrictMode>
);
