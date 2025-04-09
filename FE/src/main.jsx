import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MessageProvider } from "./Context/MessageContext.jsx";
import { LoadingProvider } from "./Context/LoadingContext.jsx";

createRoot(document.getElementById("root")).render(
  <MessageProvider>
    <LoadingProvider>
      <App />
    </LoadingProvider>
  </MessageProvider>
);
