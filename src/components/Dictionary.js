import { useState, useEffect } from "react";
import "../styles/Dictionary.css";
import axios from "axios";

// Component imports
import Results from "./Results";
import Photos from "./Photos";
import RecentlySearched from "./RecentlySearched";
import Favourites from "./Favourites";

export default function Dictionary(props) {
  // ---------------------------
  // STATE MANAGEMENT
  // ---------------------------

  // Current search keyword (controlled input)
  let [keyword, setKeyword] = useState(props.defaultKeyword);

  // API results (dictionary + images)
  let [results, setResults] = useState(null);
  let [photos, setPhotos] = useState(null);

  // User history & saved words
  let [recent, setRecent] = useState([]);
  let [favourites, setFavourites] = useState([]);

  // UI states
  let [loading, setLoading] = useState(false);
  let [toast, setToast] = useState(null);

  // Related word data (from Datamuse API)
  let [relatedWords, setRelatedWords] = useState({
    antonyms: [],
    similar: [],
    family: []
  });

  // ---------------------------
  // INITIAL DATA LOAD (ON MOUNT)
  // ---------------------------
  useEffect(() => {
    // Load stored recent searches and favourites from localStorage
    const storedRecent = JSON.parse(localStorage.getItem("recentWords")) || [];
    const storedFavs = JSON.parse(localStorage.getItem("favourites")) || [];

    setRecent(storedRecent);
    setFavourites(storedFavs);

    // Perform initial search using default keyword
    search(props.defaultKeyword);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------------------------
  // RECENT SEARCHES HANDLING
  // ---------------------------
  function saveToRecent(word) {
    // Add new word at top, remove duplicates, limit to 10 items
    let updated = [word, ...recent.filter((w) => w !== word)];
    updated = updated.slice(0, 10);

    setRecent(updated);
    localStorage.setItem("recentWords", JSON.stringify(updated));
  }

  function clearRecent() {
    // Clear recent searches completely
    setRecent([]);
    localStorage.removeItem("recentWords");
  }

  // ---------------------------
  // FAVOURITES HANDLING
  // ---------------------------
  function toggleFavourite(word) {
    let updated;

    // Add or remove word from favourites
    if (favourites.includes(word)) {
      updated = favourites.filter((item) => item !== word);
    } else {
      updated = [word, ...favourites];
    }

    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  }

  // ---------------------------
  // MAIN SEARCH FUNCTION
  // ---------------------------
  async function search(word = keyword) {
    setLoading(true);
    setToast(null);

    // API keys and endpoints
    const apiKey = "8bcecf2b930c0252ec9aa584f9do621t";

    const dictUrl = `https://api.shecodes.io/dictionary/v1/define?word=${word}&key=${apiKey}`;
    const imagesUrl = `https://api.shecodes.io/images/v1/search?query=${word}&key=${apiKey}`;

    // Datamuse related word APIs
    const antonymsUrl = `https://api.datamuse.com/words?rel_ant=${word}`;
    const similarUrl = `https://api.datamuse.com/words?ml=${word}`;
    const familyUrl = `https://api.datamuse.com/words?rel_spc=${word}`;

    try {
      // Run all API requests in parallel
      const [dictRes, imagesRes, antRes, simRes, famRes] =
        await Promise.all([
          axios.get(dictUrl),
          axios.get(imagesUrl),
          axios.get(antonymsUrl),
          axios.get(similarUrl),
          axios.get(familyUrl)
        ]);

      // ---------------------------
      // HANDLE "WORD NOT FOUND"
      // ---------------------------
      if (!dictRes.data || !dictRes.data.word || !dictRes.data.meanings) {
        setResults(null);
        setPhotos(null);
        setRelatedWords({ antonyms: [], similar: [], family: [] });

        setToast(`⚠️ No results found for "${word}"`);
        setLoading(false);
        return;
      }

      // ---------------------------
      // SUCCESSFUL RESPONSE
      // ---------------------------
      setResults(dictRes.data);
      setPhotos(imagesRes.data.photos || []);

      // Map related words into simple arrays
      setRelatedWords({
        antonyms: antRes.data.map((item) => item.word),
        similar: simRes.data.map((item) => item.word),
        family: famRes.data.map((item) => item.word)
      });

      // Save successful search to recent list
      saveToRecent(word);

    } catch (err) {
      // Handle API/network errors
      setResults(null);
      setPhotos(null);
      setToast("⚠️ Something went wrong. Please try again.");
    } finally {
      // Always stop loading state
      setLoading(false);
    }
  }

  // ---------------------------
  // FORM SUBMIT HANDLER
  // ---------------------------
  function handleSubmit(e) {
    e.preventDefault();
    search(keyword);
  }

  // ---------------------------
  // CLICK HANDLERS (RECENT & FAVS)
  // ---------------------------
  function handleRecentClick(word) {
    setKeyword(word);
    search(word);
  }

  function handleFavouriteClick(word) {
    setKeyword(word);
    search(word);
  }

  // ---------------------------
  // UI RENDER
  // ---------------------------
  return (
    <div>

      {/* SEARCH INPUT */}
      <div className="Dictionary">
        <section>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search for a word"
              />
              <button className="btn" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
        </section>
      </div>

      {/* TOAST MESSAGE */}
      {toast && <div className="toast-message">{toast}</div>}

      {/* LOADING INDICATOR */}
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Searching dictionary...</p>
        </div>
      )}

      {/* DICTIONARY RESULTS */}
      {!loading && results && (
        <Results
          results={results}
          relatedWords={relatedWords}
          onFavourite={toggleFavourite}
        />
      )}

      {/* IMAGE RESULTS */}
      {!loading && photos && (
        <Photos photos={photos} />
      )}

      {/* RECENT SEARCHES */}
      <RecentlySearched
        items={recent}
        onClick={handleRecentClick}
        onClear={clearRecent}
      />

      {/* FAVOURITES LIST */}
      <Favourites
        items={favourites}
        onClick={handleFavouriteClick}
      />

    </div>
  );
}