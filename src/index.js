// Import React (required for JSX and component structure)
import React from "react";

// Import ReactDOM for rendering the React app into the DOM
import ReactDOM from "react-dom/client";

// Import the main App component
import App from "./App";

// Create a root React DOM container by targeting the HTML element with id="root"
// This is where the entire React application will be mounted
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the React application into the root container
root.render(
  // StrictMode is a development tool that highlights potential problems in an app
  // It does not affect production builds
  <React.StrictMode>
    {/* Main application component */}
    <App />
  </React.StrictMode>
);