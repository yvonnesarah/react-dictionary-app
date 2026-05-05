import { useEffect, useState } from "react";

export default function WordOfTheDay() {
  const [word, setWord] = useState(null);

  useEffect(() => {
    const today = new Date().toDateString();
    const saved = JSON.parse(localStorage.getItem("wotd"));

    if (saved && saved.date === today) {
      setWord(saved.word);
    } else {
      fetchWord();
    }
  }, []);

  function fetchWord() {
    const words = [
      "serendipity",
      "eloquence",
      "resilience",
      "meticulous",
      "wanderlust"
    ];

    const random = words[Math.floor(Math.random() * words.length)];

    const data = {
      word: random,
      date: new Date().toDateString()
    };

    localStorage.setItem("wotd", JSON.stringify(data));
    setWord(random);
  }

  if (!word) return <div className="wotd-loading">Loading word...</div>;

  return (
    <div className="word-of-day">
      <h3>📚 Word of the Day</h3>
      <p>{word}</p>
    </div>
  );
}