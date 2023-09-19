import "./App.css";
import React, { useEffect, useState } from "react";
import Game from "./Components/Game";

function App() {
  const [startGame, setStartGame] = useState(true);

  useEffect(() => {}, [startGame]);

  return (
    <div className="App">
      {startGame ? (
        <Game NewAgain={setStartGame} />
      ) : (
        <div className="buttons">
          <button onClick={()=>setStartGame(true)}>Yeniden Oyna!</button>
          <button>Sonuçlarım</button>
        </div>
      )}
    </div>
  );
}

export default App;
