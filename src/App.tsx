import React, { useEffect, useState } from "react";
import useSWR from "swr";
import "./App.css";

import fetchSynonyms from "./api/fetchSynonyms";

type TSynonyms = {
  word: string;
  score: number;
};

function App() {
  const [word, setWord] = useState("");
  const { data: synonyms, error } = useSWR(word, fetchSynonyms);

  const handleFetchNewSynonyms = async (word: string) => {
    setWord(word);
  };

  console.log(synonyms);

  if (error) return <div>Failed to load synonyms</div>;

  return (
    <div>
      {word}
      <form>
        <label htmlFor="finder">Type a word: </label>
        <input
          id="finder"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button> Submit </button>
      </form>
      <ul>
        {synonyms?.map((synonym: TSynonyms, idx: number) => (
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
