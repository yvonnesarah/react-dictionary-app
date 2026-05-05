import { useEffect, useState, useCallback } from "react";

/**
 * Static list of vocabulary words used for the "Word of the Day" feature.
 * Each entry includes:
 * - word: the vocabulary term
 * - meaning: definition of the word
 * - partOfSpeech: grammatical category
 * - example: sample usage sentence
 */
const WORDS = [
  { word: "serendipity", meaning: "finding something good without looking for it", partOfSpeech: "noun", example: "Meeting her was pure serendipity." },
  { word: "eloquence", meaning: "fluent and persuasive speaking or writing", partOfSpeech: "noun", example: "His eloquence captivated the audience." },
  { word: "resilience", meaning: "ability to recover quickly from difficulties", partOfSpeech: "noun", example: "Her resilience helped her rebuild her life." },
  { word: "meticulous", meaning: "showing great attention to detail", partOfSpeech: "adjective", example: "He was meticulous in planning every step." },
  { word: "wanderlust", meaning: "strong desire to travel", partOfSpeech: "noun", example: "Her wanderlust took her across the world." },
  { word: "ephemeral", meaning: "lasting for a very short time", partOfSpeech: "adjective", example: "The beauty of the rainbow was ephemeral." },
  { word: "lucid", meaning: "clear and easy to understand", partOfSpeech: "adjective", example: "She gave a lucid explanation." },
  { word: "tenacity", meaning: "persistence and determination", partOfSpeech: "noun", example: "His tenacity led to success." },
  { word: "ubiquitous", meaning: "present everywhere", partOfSpeech: "adjective", example: "Coffee shops are ubiquitous in the city." },
  { word: "ineffable", meaning: "too great to be expressed in words", partOfSpeech: "adjective", example: "The experience was ineffable." },
  { word: "nostalgia", meaning: "sentimental longing for the past", partOfSpeech: "noun", example: "The photo filled her with nostalgia." },
  { word: "paradox", meaning: "a statement that contradicts itself but may be true", partOfSpeech: "noun", example: "It’s a paradox that less is more." },
  { word: "zenith", meaning: "the highest point", partOfSpeech: "noun", example: "His career reached its zenith." },
  { word: "quintessential", meaning: "the most perfect example of something", partOfSpeech: "adjective", example: "She is the quintessential leader." },
  { word: "tranquility", meaning: "a state of peace and calm", partOfSpeech: "noun", example: "He enjoyed the tranquility of nature." },
  { word: "cascade", meaning: "a small waterfall or series of falls", partOfSpeech: "noun", example: "Water flowed down the cascade." },
  { word: "labyrinth", meaning: "a complicated maze or network", partOfSpeech: "noun", example: "The city streets felt like a labyrinth." },
  { word: "mellifluous", meaning: "pleasant to hear; smooth sounding", partOfSpeech: "adjective", example: "Her voice was mellifluous." },
  { word: "aesthetic", meaning: "concerned with beauty or appearance", partOfSpeech: "adjective", example: "The room had an aesthetic appeal." },
  { word: "catalyst", meaning: "something that causes change or action", partOfSpeech: "noun", example: "The event was a catalyst for reform." },
  { word: "resonance", meaning: "deep, full, or meaningful quality", partOfSpeech: "noun", example: "The speech had emotional resonance." },
  { word: "fracture", meaning: "a break or crack", partOfSpeech: "noun", example: "The bone fracture healed slowly." },
  { word: "harmony", meaning: "agreement or balance", partOfSpeech: "noun", example: "They lived in harmony." },
  { word: "vivid", meaning: "bright, intense, or clear", partOfSpeech: "adjective", example: "She had vivid memories of childhood." },
  { word: "oblivion", meaning: "the state of being forgotten", partOfSpeech: "noun", example: "The ruins faded into oblivion." },
  { word: "radiance", meaning: "light or glow", partOfSpeech: "noun", example: "Her face had a natural radiance." },
  { word: "serenity", meaning: "calmness and peacefulness", partOfSpeech: "noun", example: "The lake brought serenity." },
  { word: "whimsical", meaning: "playfully unusual or imaginative", partOfSpeech: "adjective", example: "The design was whimsical." },
  { word: "dissonance", meaning: "lack of harmony", partOfSpeech: "noun", example: "There was dissonance in the music." },
  { word: "alchemy", meaning: "a magical process of transformation", partOfSpeech: "noun", example: "Cooking felt like alchemy." },
  { word: "momentum", meaning: "force gained by motion", partOfSpeech: "noun", example: "The project gained momentum." },
  { word: "solstice", meaning: "longest or shortest day of the year", partOfSpeech: "noun", example: "They celebrated the winter solstice." },
  { word: "euphoria", meaning: "a feeling of intense happiness", partOfSpeech: "noun", example: "Winning brought euphoria." },
  { word: "fragment", meaning: "a small part broken off", partOfSpeech: "noun", example: "A fragment of glass remained." },
  { word: "kinetic", meaning: "relating to motion", partOfSpeech: "adjective", example: "The sculpture was kinetic." },
  { word: "orbit", meaning: "the curved path of an object", partOfSpeech: "noun", example: "The satellite entered orbit." },
  { word: "pulse", meaning: "a rhythmic beat", partOfSpeech: "noun", example: "He felt his pulse race." },
  { word: "rift", meaning: "a break or split", partOfSpeech: "noun", example: "A rift formed between them." },
  { word: "spark", meaning: "a small flash or inspiration", partOfSpeech: "noun", example: "The idea was a spark of genius." },
  { word: "twilight", meaning: "soft light after sunset", partOfSpeech: "noun", example: "They walked at twilight." },
  { word: "voyage", meaning: "a long journey", partOfSpeech: "noun", example: "They set out on a voyage." },
  { word: "echo", meaning: "a reflected sound", partOfSpeech: "noun", example: "His voice echoed in the hall." },
  { word: "flux", meaning: "continuous change", partOfSpeech: "noun", example: "The market is in flux." },
  { word: "glimmer", meaning: "a faint light", partOfSpeech: "noun", example: "There was a glimmer of hope." },
  { word: "horizon", meaning: "line where earth meets sky", partOfSpeech: "noun", example: "The sun dipped below the horizon." },
  { word: "illusion", meaning: "a false perception", partOfSpeech: "noun", example: "It was just an illusion." },
  { word: "jubilant", meaning: "feeling great happiness", partOfSpeech: "adjective", example: "The crowd was jubilant." },
  { word: "kaleidoscope", meaning: "constantly changing pattern", partOfSpeech: "noun", example: "The city was a kaleidoscope of colors." },
  { word: "luminous", meaning: "giving off light", partOfSpeech: "adjective", example: "The stars were luminous." },
  { word: "mirage", meaning: "an optical illusion", partOfSpeech: "noun", example: "The oasis was a mirage." },
  { word: "nirvana", meaning: "state of perfect peace", partOfSpeech: "noun", example: "He reached a state of nirvana." },
  { word: "omen", meaning: "a sign of the future", partOfSpeech: "noun", example: "It was seen as a bad omen." },
  { word: "pinnacle", meaning: "highest point", partOfSpeech: "noun", example: "She reached the pinnacle of success." },
  { word: "quest", meaning: "a long search", partOfSpeech: "noun", example: "Their quest lasted years." },
  { word: "stardust", meaning: "cosmic particles", partOfSpeech: "noun", example: "We are made of stardust." },
  { word: "tide", meaning: "rise and fall of the sea", partOfSpeech: "noun", example: "The tide came in quickly." },
  { word: "utopia", meaning: "a perfect place", partOfSpeech: "noun", example: "They dreamed of a utopia." },
  { word: "velocity", meaning: "speed in a direction", partOfSpeech: "noun", example: "The rocket gained velocity." },
  { word: "whisper", meaning: "to speak softly", partOfSpeech: "verb", example: "She whispered quietly." },
  { word: "xenon", meaning: "a chemical element", partOfSpeech: "noun", example: "Xenon is used in lighting." },
  { word: "yearning", meaning: "deep longing", partOfSpeech: "noun", example: "He felt a yearning for home." },
  { word: "zen", meaning: "state of calm mindfulness", partOfSpeech: "noun", example: "Meditation helped her find zen." }
];

/**
 * WordOfTheDay Component
 * Displays a randomly selected word once per day and persists it in localStorage.
 */
export default function WordOfTheDay() {
    // State to store the currently displayed word entry
  const [entry, setEntry] = useState(null);

   /**
   * Selects a random word from WORDS,
   * attaches today's date, stores it in localStorage,
   * and updates state.
   */
  const fetchWord = useCallback(() => {
      // Pick a random word entry
    const randomEntry = WORDS[Math.floor(Math.random() * WORDS.length)];

    // Attach today's date so we can persist daily word
    const data = {
      ...randomEntry,
      date: new Date().toDateString()
    };

     // Save to localStorage for persistence across refreshes
    try {
      localStorage.setItem("wotd", JSON.stringify(data));
    } catch (err) {
      console.warn("Failed to save word:", err);
    }

     // Update component state (note: we store raw word, not date here)
    setEntry(randomEntry);
  }, []);

  /**
   * On component mount:
   * - Check if today's word already exists in localStorage
   * - If yes, use it
   * - If not, generate a new one
   */
  useEffect(() => {
    const today = new Date().toDateString();

    try {
      const saved = JSON.parse(localStorage.getItem("wotd"));

      // If saved word exists and is from today, reuse it
      if (saved?.date === today) {
        setEntry(saved);
      } else {
        fetchWord();
      }
    } catch {
         // If anything fails (corrupt storage, etc.), fallback
      fetchWord();
    }
  }, [fetchWord]);

  // Show loading state until word is ready
  if (!entry) return <div className="wotd-loading">Loading word...</div>;

   // Render the word details UI
  return (
    <div className="word-of-day">
      <h3>📚 Word of the Day</h3>

      <p className="word"><strong>Word:</strong> {entry.word}</p>
      <p className="pos"><strong>Part of Speech:</strong> <em>{entry.partOfSpeech}</em></p>
      <p className="meaning"><strong>Meaning:</strong> {entry.meaning}</p>
      <p className="example"><strong>Example:</strong> “{entry.example}”</p>
    </div>
  );
}