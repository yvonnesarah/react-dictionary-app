import "../src/styles/App.css";

import Dictionary from "../src/components/Dictionary";

function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="App-header text-center">
          <h1>React Dictionary App</h1>
        </header>
        <h2>What word do you want to look up?</h2>
        <main>
          <Dictionary defaultKeyword="love" />
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
            href="https://yvonnesarah.github.io/react-dictonary-app/"
            target="_blank"
            rel="noreferrer"
          >
            hosted on GitHub Pages
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;

