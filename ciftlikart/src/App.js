import "./App.css";
import React, { useEffect, useState } from "react";
import Game from "./Components/Game";
import ScoreList from "./Components/ScoreList";

function App() {
  const [startGame, setStartGame] = useState(true);
  const [scores, setScore] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {}, [startGame, show]);

  return (
    <div className="App">
      {startGame ? (
        <Game NewAgain={setStartGame} setScore={setScore} />
      ) : (
        <div className="underto">
          <div className="buttons">
            <button onClick={() => setStartGame(true)}>Yeniden Oyna!</button>
            <button onClick={() => setShow(prev=>!prev)}>Sonuçlarım</button>
          </div>

          {show && <ScoreList scores={scores} />}
        </div>
      )}
    </div>
  );
}

export default App;
