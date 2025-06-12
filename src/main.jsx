import React from "react"; // <<< GARANTA QUE ESTÁ COM 'React'
import ReactDOM from "react-dom/client"; // <<< GARANTA QUE ESTÁ COM 'ReactDOM'
import App from "./App.jsx"; // Importa seu componente App
import "./index.css"; // Importa o arquivo CSS do Tailwind

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
