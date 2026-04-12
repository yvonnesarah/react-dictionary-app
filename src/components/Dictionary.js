import { useState, useEffect } from "react";
import "../styles/Dictionary.css";
import axios from "axios";
import Results from "./Results";
import Photos from "./Photos";
import RecentlySearched from "./RecentlySearched";

export default function Dictionary(props) {
  let [keyword, setKeyword] = useState(props.defaultKeyword);
  let [results, setResults] = useState(null);
  let [photos, setPhotos] = useState(null);
  let [recent, setRecent] = useState([]);

  let [relatedWords, setRelatedWords] = useState({
  antonyms: [],
  similar: [],
  family: []
});

  // Load recent searches from localStorage on first render
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentWords")) || [];
    setRecent(stored);
    search(props.defaultKeyword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function saveToRecent(word) {
    if (!word) return;

    let updated = [word, ...recent.filter((w) => w !== word)];
    updated = updated.slice(0, 10); // keep last 10

    setRecent(updated);
    localStorage.setItem("recentWords", JSON.stringify(updated));
  }

  function handleDictionaryResponse(response) {
    setResults(response.data);
  }

  function handleImagesResponse(response) {
    setPhotos(response.data.photos);
  }

  function handleAntonyms(response) {
  setRelatedWords((prev) => ({
    ...prev,
    antonyms: response.data.map((item) => item.word)
  }));
}

function handleSimilar(response) {
  setRelatedWords((prev) => ({
    ...prev,
    similar: response.data.map((item) => item.word)
  }));
}

function handleFamily(response) {
  setRelatedWords((prev) => ({
    ...prev,
    family: response.data.map((item) => item.word)
  }));
}

  function search(word = keyword) {
    let apiKey = "8bcecf2b930c0252ec9aa584f9do621t";
    let apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${word}&key=${apiKey}`;
    axios.get(apiUrl).then(handleDictionaryResponse);

    let imagesApiUrl = `https://api.shecodes.io/images/v1/search?query=${word}&key=${apiKey}`;
    axios.get(imagesApiUrl).then(handleImagesResponse);

    // 📚 Datamuse API calls
let antonymsUrl = `https://api.datamuse.com/words?rel_ant=${keyword}`;
let similarUrl = `https://api.datamuse.com/words?ml=${keyword}`;
let familyUrl = `https://api.datamuse.com/words?rel_spc=${keyword}`;

axios.get(antonymsUrl).then(handleAntonyms);
axios.get(similarUrl).then(handleSimilar);
axios.get(familyUrl).then(handleFamily);

    saveToRecent(word);  
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search(keyword);
  }

  function handleRecentClick(word) {
    setKeyword(word);
    search(word);
  }

  return (
  <div>
    <div className="Dictionary">
      <section>
        <form className="form-inline" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="search"
              value={keyword}
              onChange={handleKeywordChange}
              placeholder="Search for a word"
            />
            <button className="btn" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </form>
      </section>
    </div>

    {/* Results first */}
    <Results results={results} relatedWords={relatedWords} />

    {/* Images second */}
    <Photos photos={photos} />

    {/* 📌 Recently Searched  */}
    <RecentlySearched items={recent} onClick={handleRecentClick} />
  </div>
);
}

