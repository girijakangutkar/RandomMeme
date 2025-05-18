import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [randomMeme, setRandomMeme] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMeme();
  }, []);

  async function fetchMeme() {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://official-joke-api.appspot.com/random_joke"
      );

      setRandomMeme(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="card">
        {randomMeme && (
          <>
            <h2>
              {randomMeme.setup} - {randomMeme.punchline}
            </h2>
            <p>(type: {randomMeme.type})</p>
          </>
        )}
        <hr />
        <button id="nextbtn" onClick={fetchMeme} disabled={loading}>
          {loading ? "loading..." : "Get Another Joke"}
        </button>
      </div>
    </>
  );
}

export default App;
