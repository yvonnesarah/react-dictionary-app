import { useState, useEffect } from "react";
import "../src/styles/App.css";
import Dictionary from "../src/components/Dictionary";
import WordOfTheDay from "../src/components/WordOfTheDay";
import AnalyticsDashboard from "../src/components/AnalyticsDashboard";

function App() {
  const [theme, setTheme] = useState("light");
  const [page, setPage] = useState("home");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <div className={`App ${theme}`}>
      <div className="container">
        <header className="App-header text-center">
          <h1>React Dictionary App</h1>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
          <br></br>
          <button onClick={() => setPage("home")}>🏠 Home</button>
          <button onClick={() => setPage("analytics")}>📊 Dashboard</button>
        </header>


        <main>
  {page === "home" && (
    <>
      <WordOfTheDay />
      <br></br>
        <h2>What word do you want to look up?</h2>
      <Dictionary defaultKeyword="love" />
    </>
  )}

  {page === "analytics" && <AnalyticsDashboard />}
</main>

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

export default App;

