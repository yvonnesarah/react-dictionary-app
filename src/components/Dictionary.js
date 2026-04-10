import { useState, useEffect } from "react";
import "../styles/Dictionary.css";
import axios from "axios";
import Results from "./Results";
import Photos from "./Photos";

export default function Dictionary(props) {
  let [keyword, setKeyword] = useState(props.defaultKeyword);
  let [results, setResults] = useState(null);
  let [photos, setPhotos] = useState(null);
 

  function handleDictionaryResponse(response) {
    setResults(response.data);
  }

   function handleImagesResponse(response) {
     setPhotos(response.data.photos);
   }



  function search() {
    // documentation: https://www.shecodes.io/learn/apis/dictionary
    let apiKey = "8bcecf2b930c0252ec9aa584f9do621t";
    let apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${keyword}&key=${apiKey}`;
    axios.get(apiUrl).then(handleDictionaryResponse);

    // documentation: https://www.shecodes.io/learn/apis/images
    let imagesApiKey = "8bcecf2b930c0252ec9aa584f9do621t";
    let imagesApiUrl = `https://api.shecodes.io/images/v1/search?query=${keyword}&key=${imagesApiKey}`;
    axios.get(imagesApiUrl).then(handleImagesResponse);
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  useEffect(() => {
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="Dictionary">
        <section>
          <form className="form-inline" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="search"
                className="form-control"
                value={keyword}
                onChange={handleKeywordChange}
                placeholder="Search for a word"
              />
              <button
                className="input-group-text btn"
                type="submit"
                id="button-addon1"
              >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
        </section>
      </div>
      <Results results={results} />
      <Photos photos={photos} />
    </div>
  );
}





