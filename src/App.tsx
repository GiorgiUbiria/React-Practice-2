import React, { useState } from "react";
import "./App.css";

import fetchSynonyms from "./api/fetchSynonyms";

type TSynonyms = {
  word: string;
  score: number;
};

function App() {
  const [word, setWord] = useState("");
  const [synonyms, setSynonyms] = useState<TSynonyms[]>([]);

  const handleFetchNewSynonyms = async (word: string) => {
    const fetchedSynonyms = await fetchSynonyms(word);
    setSynonyms(fetchedSynonyms);
    setWord(word);
  };

  const handleFindSynonyms = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const fetchedSynonyms = await fetchSynonyms(word);
      setSynonyms(fetchedSynonyms);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {word}
      <form onClick={handleFindSynonyms}>
        <label htmlFor="finder">Type a word: </label>
        <input
          id="finder"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button> Submit </button>
      </form>
      <ul>
        {synonyms.map((synonym, idx) => (
          <li key={idx} onClick={() => handleFetchNewSynonyms(synonym.word)}>
            {" "}
            {synonym.word}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
