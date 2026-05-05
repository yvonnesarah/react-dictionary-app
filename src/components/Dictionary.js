import { useState, useEffect } from "react";
import "../styles/Dictionary.css";
import axios from "axios";

import Results from "./Results";
import Photos from "./Photos";
import RecentlySearched from "./RecentlySearched";
import Favourites from "./Favourites";

export default function Dictionary(props) {
  let [keyword, setKeyword] = useState(props.defaultKeyword);
  let [results, setResults] = useState(null);
  let [photos, setPhotos] = useState(null);

  let [recent, setRecent] = useState([]);
  let [favourites, setFavourites] = useState([]);

  let [loading, setLoading] = useState(false);
  let [toast, setToast] = useState(null);

  let [relatedWords, setRelatedWords] = useState({
    antonyms: [],
    similar: [],
    family: []
  });

  // LOAD DATA
  useEffect(() => {
    const storedRecent = JSON.parse(localStorage.getItem("recentWords")) || [];
    const storedFavs = JSON.parse(localStorage.getItem("favourites")) || [];

    setRecent(storedRecent);
    setFavourites(storedFavs);

    search(props.defaultKeyword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // RECENT SEARCHES
  function saveToRecent(word) {
    let updated = [word, ...recent.filter((w) => w !== word)];
    updated = updated.slice(0, 10);

    setRecent(updated);
    localStorage.setItem("recentWords", JSON.stringify(updated));
  }

  // ⭐ FAVOURITES (FIXED)
  function toggleFavourite(word) {
    let updated;

    if (favourites.includes(word)) {
      updated = favourites.filter((item) => item !== word);
    } else {
      updated = [word, ...favourites];
    }

    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  }


  function clearRecent() {
  setRecent([]);
  localStorage.removeItem("recentWords");
}

  // SEARCH FUNCTION
  async function search(word = keyword) {
    setLoading(true);
    setToast(null);

    const apiKey = "8bcecf2b930c0252ec9aa584f9do621t";

    const dictUrl = `https://api.shecodes.io/dictionary/v1/define?word=${word}&key=${apiKey}`;
    const imagesUrl = `https://api.shecodes.io/images/v1/search?query=${word}&key=${apiKey}`;

    const antonymsUrl = `https://api.datamuse.com/words?rel_ant=${word}`;
    const similarUrl = `https://api.datamuse.com/words?ml=${word}`;
    const familyUrl = `https://api.datamuse.com/words?rel_spc=${word}`;

    try {
      const [dictRes, imagesRes, antRes, simRes, famRes] =
        await Promise.all([
          axios.get(dictUrl),
          axios.get(imagesUrl),
          axios.get(antonymsUrl),
          axios.get(similarUrl),
          axios.get(familyUrl)
        ]);

      // ❌ WORD NOT FOUND
      if (!dictRes.data || !dictRes.data.word || !dictRes.data.meanings) {
        setResults(null);
        setPhotos(null);
        setRelatedWords({ antonyms: [], similar: [], family: [] });

        setToast(`⚠️ No results found for "${word}"`);
        setLoading(false);
        return;
      }

      // ✅ SUCCESS
      setResults(dictRes.data);
      setPhotos(imagesRes.data.photos || []);

      setRelatedWords({
        antonyms: antRes.data.map((item) => item.word),
        similar: simRes.data.map((item) => item.word),
        family: famRes.data.map((item) => item.word)
      });

      saveToRecent(word);

    } catch (err) {
      setResults(null);
      setPhotos(null);
      setToast("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    search(keyword);
  }

  function handleRecentClick(word) {
    setKeyword(word);
    search(word);
  }

  function handleFavouriteClick(word) {
    setKeyword(word);
    search(word);
  }

  return (
    <div>

      {/* SEARCH */}
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

      {/* 🍞 TOAST */}
      {toast && <div className="toast-message">{toast}</div>}

      {/* 🔄 LOADING */}
      {loading && (
        <div className="loading">
          🔄 Loading results...
        </div>
      )}

      {/* RESULTS */}
      {!loading && results && (
        <Results
          results={results}
          relatedWords={relatedWords}
          onFavourite={toggleFavourite}   // ⭐ IMPORTANT FIX
        />
      )}

      {/* PHOTOS */}
      {!loading && photos && (
        <Photos photos={photos} />
      )}

      {/* RECENT */}
    <RecentlySearched
       items={recent}
       onClick={handleRecentClick}
      onClear={clearRecent}
     />
      {/* ⭐ FAVOURITES (NOW WORKS) */}
      <Favourites
        items={favourites}
        onClick={handleFavouriteClick}
      />

    </div>
  );
}