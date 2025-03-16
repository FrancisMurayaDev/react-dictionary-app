// import { Fragment } from "react";
// import { useState } from "react";
import { Fragment, useState } from "react";
import "./App.css";

function App() {
  const [userWord, setUserWord] = useState("");
  const [output, setOutput] = useState(null);

  const handleWordSearch = async () => {
    if (!userWord) return;

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${userWord}`,
      );
      const data = await response.json();
      setOutput(data[0]);
    } catch (error) {
      console.error("Error getting data:", error);
    }
  };

  return (
    <Fragment>
      <div className="container">
        <h1>Francis Dictionary App</h1>

        <input
          type="text"
          className="inputElement"
          placeholder="Enter word to search"
          value={userWord}
          onChange={(e) => setUserWord(e.target.value)}
        />

        <button className="btn" onClick={handleWordSearch}>
          Search
        </button>
      </div>

      {output && (
        <div className="output">
          <h2>{output.word}</h2>
          <p>
            Word Phonetic: {output.phonetic || "Phonetic word not available"}
          </p>
          <h3>Meanings:</h3>
          {output.meanings.map((meaning, index) => (
            <div key={index}>
              <strong>{meaning.partOfSpeech}</strong>
              <ul>
                {meaning.definitions.map((definition, i) => (
                  <li key={i}>{definition.definition}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
}

export default App;
