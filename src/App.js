// Import React hooks for state management and side effects
import { useState, useEffect } from "react";

// Import styles for the app
import "../src/styles/App.css";

// Import components used in the app
import Dictionary from "../src/components/Dictionary";
import WordOfTheDay from "../src/components/WordOfTheDay";
import AnalyticsDashboard from "../src/components/AnalyticsDashboard";

function App() {
  // State to manage light/dark theme
  const [theme, setTheme] = useState("light");

  // State to control which page is displayed (home or analytics)
  const [page, setPage] = useState("home");

  // Apply the current theme to the entire document body whenever it changes
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Toggle between light and dark mode
  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <div className={`App ${theme}`}>
      <div className="container">

        {/* Header section with title and navigation controls */}
        <header className="App-header text-center">
          <h1>React Dictionary App</h1>

          {/* Button to toggle between light and dark mode */}
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>

          <br />

          {/* Navigation buttons to switch pages */}
          <button onClick={() => setPage("home")}>🏠 Home</button>
          <button onClick={() => setPage("analytics")}>📊 Dashboard</button>
        </header>

        {/* Main content area - conditionally renders pages */}
        <main>

          {/* Home page content */}
          {page === "home" && (
            <>
              {/* Displays word of the day component */}
              <WordOfTheDay />
              <br />

              {/* Prompt for dictionary search */}
              <h2>What word do you want to look up?</h2>

              {/* Dictionary component with default search keyword */}
              <Dictionary defaultKeyword="love" />
            </>
          )}

          {/* Analytics dashboard page */}
          {page === "analytics" && <AnalyticsDashboard />}
        </main>

        {/* Footer with credits and external links */}
        <footer className="text-center">
          This project was coded by{" "}
          <a
            href="https://github.com/yvonnesarah"
            target="_blank"
            rel="noreferrer"
          >
            Yvonne Adedeji
          </a>{" "}
          and it is{" "}
          <a
            href="https://github.com/yvonnesarah/react-dictionary-app"
            target="_blank"
            rel="noreferrer"
          >
            open-sourced on GitHub
          </a>{" "}
          and{" "}
          <a
            href="https://ya-react-dictionary-app.netlify.app/"
            target="_blank"
            rel="noreferrer"
          >
            hosted on Netlify
          </a>
        </footer>

      </div>
    </div>
  );
}

// Export App component so it can be used in the entry point of the project
export default App;

