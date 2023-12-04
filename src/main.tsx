import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactFlowProvider } from 'reactflow';
import "reactflow/dist/style.css";
import App from './App.tsx';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactFlowProvider>
      <div style={{ width: "100vw", height: "100vh" }}>
        <App />
      </div>
    </ReactFlowProvider>
  </React.StrictMode>,
)

